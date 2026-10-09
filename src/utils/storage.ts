import { 
  Machine, 
  ChecklistItem, 
  InspectionRecord, 
  DefectRecord, 
  DashboardStats, 
  MachineCategory,
  DefectPriority,
  RepairStatus,
  LanguageCode
} from '../types/inspection';
import { INITIAL_MACHINES, DEFAULT_CHECKLIST_ITEMS } from '../data/machineryData';

const STORAGE_KEYS = {
  FLEET: 'vrc_fleet_pm_master_105_v4',
  CHECKLIST_ITEMS: 'vrc_checklist_items_v4',
  INSPECTIONS: 'vrc_inspections_v4',
  DEFECTS: 'vrc_defects_v4',
  PROFILE: 'vrc_profile_v4',
  LANG: 'vrc_language_v4',
};

export interface ProjectProfile {
  inspectorName: string;
  siteProjectName: string;
  contractorName: string;
  language: LanguageCode;
}

const DEFAULT_PROFILE: ProjectProfile = {
  inspectorName: 'Prince Pandey',
  siteProjectName: 'VRC Highway Expressway Project (Pkg-4)',
  contractorName: 'VRC CONSTRUCTION INDIA LTD',
  language: 'en',
};

// 1. FLEET STORAGE
export function loadFleet(): Machine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FLEET);
    if (!raw) {
      saveFleet(INITIAL_MACHINES);
      return INITIAL_MACHINES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 50) {
      saveFleet(INITIAL_MACHINES);
      return INITIAL_MACHINES;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load fleet', err);
    return INITIAL_MACHINES;
  }
}

export function saveFleet(fleet: Machine[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.FLEET, JSON.stringify(fleet));
  } catch (err) {
    console.error('Failed to save fleet', err);
  }
}

export function resetTo105MasterFleet(): Machine[] {
  saveFleet(INITIAL_MACHINES);
  return INITIAL_MACHINES;
}

export function addMachine(machine: Omit<Machine, 'id' | 'qrCodeValue' | 'status'> & { status?: Machine['status'] }): Machine {
  const fleet = loadFleet();
  const id = `m-${Date.now()}`;
  const newMachine: Machine = {
    ...machine,
    id,
    masterNumber: machine.masterNumber || fleet.length + 1,
    status: machine.status || 'WORKING',
    qrCodeValue: `VRC-${machine.category}-${machine.identificationNumber.replace(/\s+/g, '-').toUpperCase()}`,
    photoUrl: machine.photoUrl || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    maintenanceHistory: machine.maintenanceHistory || [],
    breakdownHistory: machine.breakdownHistory || [],
    sparePartsHistory: machine.sparePartsHistory || [],
  };
  const updated = [newMachine, ...fleet];
  saveFleet(updated);
  return newMachine;
}

export function updateMachine(updatedMachine: Machine) {
  const fleet = loadFleet();
  const idx = fleet.findIndex(m => m.id === updatedMachine.id);
  if (idx >= 0) {
    fleet[idx] = updatedMachine;
    saveFleet(fleet);
  }
}

export function deleteMachine(machineId: string) {
  const fleet = loadFleet().filter(m => m.id !== machineId);
  saveFleet(fleet);
}

// 2. CHECKLIST ITEMS STORAGE
export function loadChecklistItems(): ChecklistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLIST_ITEMS);
    if (!raw) {
      saveChecklistItems(DEFAULT_CHECKLIST_ITEMS);
      return DEFAULT_CHECKLIST_ITEMS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load checklist items', err);
    return DEFAULT_CHECKLIST_ITEMS;
  }
}

export function saveChecklistItems(items: ChecklistItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CHECKLIST_ITEMS, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save checklist items', err);
  }
}

export function addChecklistItem(item: Omit<ChecklistItem, 'id'>): ChecklistItem {
  const items = loadChecklistItems();
  const newItem: ChecklistItem = {
    ...item,
    id: `chk-custom-${Date.now()}`,
    isCustom: true,
  };
  const updated = [...items, newItem];
  saveChecklistItems(updated);
  return newItem;
}

export function updateChecklistItem(item: ChecklistItem) {
  const items = loadChecklistItems();
  const idx = items.findIndex(i => i.id === item.id);
  if (idx >= 0) {
    items[idx] = item;
    saveChecklistItems(items);
  }
}

export function deleteChecklistItem(itemId: string) {
  const items = loadChecklistItems().filter(i => i.id !== itemId);
  saveChecklistItems(items);
}

// 3. INSPECTION RECORDS
export function loadInspections(): InspectionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load inspections', err);
    return [];
  }
}

export function saveInspections(records: InspectionRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save inspections', err);
  }
}

export function recordInspection(record: InspectionRecord): InspectionRecord[] {
  const current = loadInspections();
  const updated = [record, ...current];
  saveInspections(updated);

  // Update Machine status in fleet
  const fleet = loadFleet();
  const mIndex = fleet.findIndex(m => m.id === record.machineId);
  if (mIndex >= 0) {
    const m = { ...fleet[mIndex] };
    m.lastInspectionDate = new Date().toISOString();
    m.lastInspectionId = record.id;
    if (record.operatingHoursOrKm) {
      m.currentHoursOdometer = record.operatingHoursOrKm;
    }
    if (record.finalStatus === 'FAIL') {
      m.status = 'BREAKDOWN';
    } else if (record.finalStatus === 'NEEDS_ATTENTION') {
      m.status = 'NEEDS_ATTENTION';
    } else {
      m.status = 'WORKING';
    }
    fleet[mIndex] = m;
    saveFleet(fleet);
  }

  // Also record defects into Maintenance table
  if (record.defects.length > 0) {
    const currentDefects = loadDefects();
    const updatedDefects = [...record.defects, ...currentDefects];
    saveDefects(updatedDefects);
  }

  return updated;
}

// 4.1 Machine History Management (Breakdown, Maintenance Service, Spare Parts)
export function addMachineBreakdownRecord(
  machineId: string,
  record: { issue: string; rootCause?: string; actionTaken: string; mechanicName: string; downtimeHours?: number }
) {
  const fleet = loadFleet();
  const idx = fleet.findIndex(m => m.id === machineId);
  if (idx >= 0) {
    const m = fleet[idx];
    const newRecord = {
      id: `brk-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'UNDER_REPAIR' as const,
      ...record,
    };
    m.breakdownHistory = [newRecord, ...(m.breakdownHistory || [])];
    m.status = 'BREAKDOWN';
    fleet[idx] = m;
    saveFleet(fleet);
  }
}

export function addMachineServiceRecord(
  machineId: string,
  record: {
    serviceType: 'ROUTINE_PREVENTIVE' | 'SCHEDULED_SERVICE' | '500_HRS' | '1000_HRS' | 'EMERGENCY_REPAIR';
    hourMeterOrKm: number;
    performedBy: string;
    remarks?: string;
  }
) {
  const fleet = loadFleet();
  const idx = fleet.findIndex(m => m.id === machineId);
  if (idx >= 0) {
    const m = fleet[idx];
    const newRecord = {
      id: `srv-${Date.now()}`,
      serviceDate: new Date().toISOString(),
      ...record,
    };
    m.maintenanceHistory = [newRecord, ...(m.maintenanceHistory || [])];
    fleet[idx] = m;
    saveFleet(fleet);
  }
}

export function addMachineSparePartRecord(
  machineId: string,
  record: { partName: string; partNumber?: string; quantity: number; mechanicName: string; remarks?: string }
) {
  const fleet = loadFleet();
  const idx = fleet.findIndex(m => m.id === machineId);
  if (idx >= 0) {
    const m = fleet[idx];
    const newRecord = {
      id: `sp-${Date.now()}`,
      dateReplaced: new Date().toISOString(),
      ...record,
    };
    m.sparePartsHistory = [newRecord, ...(m.sparePartsHistory || [])];
    fleet[idx] = m;
    saveFleet(fleet);
  }
}

// 4. MAINTENANCE & DEFECT RECORDS
export function loadDefects(): DefectRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DEFECTS);
    if (!raw) {
      // Default initial defect matching Caterpillar Excavator
      const initialDefects: DefectRecord[] = [
        {
          id: 'def-init-01',
          inspectionId: 'insp-sample-01',
          machineId: 'm-exc-01',
          machineName: 'Caterpillar CAT 320D2 Hydraulic Excavator',
          identificationNumber: 'EXC-VRC-12',
          category: 'LOADERS_EXCAVATORS',
          siteProjectName: 'VRC Quarry Deep Cut Area',
          checkItemLabel: 'Hydraulic hoses, cylinders & leakage',
          isCritical: true,
          priority: 'CRITICAL',
          problemDescription: 'Main boom hoist cylinder high-pressure hose weeping hydraulic oil heavily near crimp coupling.',
          photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
          reportingPerson: 'Manoj Singh (Operator)',
          dateReported: new Date().toISOString(),
          assignedMechanic: 'Satish Sharma (Hydraulic Fitter)',
          repairStatus: 'PENDING',
          sparePartsRequired: '1x OEM 4-Wire Spiral Hydraulic Hose Assembly (1.5m, 350 bar)',
          repairRemarks: 'Machine shut down immediately. Waiting for hydraulic hose from Central Store.',
        },
        {
          id: 'def-init-02',
          inspectionId: 'insp-sample-02',
          machineId: 'm-rmc-01',
          machineName: 'Schwing Stetter M1.25 Ready Mix Concrete Plant (60m³/h)',
          identificationNumber: 'RMC-VRC-UNIT-01',
          category: 'RMC_PLANTS',
          siteProjectName: 'VRC Elevated Highway Pier Yard',
          checkItemLabel: 'Weighing conveyors & belt tension',
          isCritical: false,
          priority: 'MEDIUM',
          problemDescription: 'Aggregate weigh belt scraper rubber worn out causing fine sand carryback.',
          reportingPerson: 'Deepak Mishra',
          dateReported: new Date(Date.now() - 86400000).toISOString(),
          assignedMechanic: 'Suresh Verma',
          repairStatus: 'IN_PROGRESS',
          sparePartsRequired: '800mm conveyor rubber scraper blade',
          repairRemarks: 'Scraper unbolted, replacement blade being fitted during evening wash-out.',
        },
      ];
      saveDefects(initialDefects);
      return initialDefects;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveDefects(defects: DefectRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.DEFECTS, JSON.stringify(defects));
  } catch (err) {
    console.error('Failed to save defects', err);
  }
}

export function updateDefectRecord(
  defectId: string,
  updates: Partial<DefectRecord>
) {
  const defects = loadDefects();
  const idx = defects.findIndex(d => d.id === defectId);
  if (idx >= 0) {
    defects[idx] = { ...defects[idx], ...updates };
    saveDefects(defects);

    // If defect marked COMPLETED, check if machine status can be updated
    if (updates.repairStatus === 'COMPLETED') {
      const defect = defects[idx];
      const remainingCritical = defects.filter(
        d => d.machineId === defect.machineId && d.isCritical && d.repairStatus !== 'COMPLETED'
      );
      if (remainingCritical.length === 0) {
        const fleet = loadFleet();
        const mIdx = fleet.findIndex(m => m.id === defect.machineId);
        if (mIdx >= 0 && fleet[mIdx].status === 'FAILED_STOP') {
          fleet[mIdx].status = 'PENDING'; // Ready for re-inspection
          saveFleet(fleet);
        }
      }
    }
  }
}

export function updateDefectStatus(
  defectId: string,
  status: RepairStatus,
  mechanic?: string,
  notes?: string
) {
  updateDefectRecord(defectId, {
    repairStatus: status,
    assignedMechanic: mechanic,
    repairRemarks: notes,
    ...(status === 'COMPLETED' ? { completionDate: new Date().toISOString() } : {}),
  });
}

// 5. PROFILE & LANGUAGE STORAGE
export function loadProjectProfile(): ProjectProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProjectProfile(profile: ProjectProfile) {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

// 6. DASHBOARD STATISTICS CALCULATION
export function calculateDashboardStats(): DashboardStats {
  const fleet = loadFleet();
  const inspections = loadInspections();
  const defects = loadDefects();

  const todayStr = new Date().toISOString().split('T')[0];
  const inspectionsCompleted = inspections.filter(i => i.date === todayStr).length;
  const inspectionsPending = fleet.filter(m => m.status === 'PENDING').length;

  const machinesWithDefects = fleet.filter(
    m => m.status === 'BREAKDOWN' || m.status === 'FAILED_STOP' || m.status === 'NEEDS_ATTENTION' || m.status === 'UNDER_MAINTENANCE'
  ).length;

  const machinesPassed = fleet.filter(m => m.status === 'WORKING' || m.status === 'PASSED').length;
  const machinesFailed = fleet.filter(m => m.status === 'BREAKDOWN' || m.status === 'FAILED_STOP').length;

  const criticalDefects = defects.filter(
    d => (d.isCritical || d.priority === 'CRITICAL') && d.repairStatus !== 'COMPLETED'
  ).length;

  const defectsRequiringRepair = defects.filter(d => d.repairStatus !== 'COMPLETED').length;
  const repairsPending = defects.filter(d => d.repairStatus === 'PENDING').length;
  const repairsCompleted = defects.filter(d => d.repairStatus === 'COMPLETED').length;

  return {
    totalMachines: fleet.length,
    inspectionsCompleted,
    inspectionsPending,
    machinesPassed,
    machinesFailed,
    machinesWithDefects,
    criticalDefects,
    defectsRequiringRepair,
    repairsPending,
    repairsCompleted,
  };
}

// 7. EXPORT EXCEL-COMPATIBLE CSV (Includes UTF-8 BOM \uFEFF for seamless Excel opening)
export function exportInspectionsToCsv(inspections: InspectionRecord[]): string {
  const BOM = '\uFEFF';
  const headers = [
    'Inspection ID',
    'Date & Time',
    'Site / Project Name',
    'Machine Category',
    'Machine Name',
    'Machine Number',
    'Shift',
    'Driver / Operator Name',
    'Mechanic Name',
    'Hour-meter / Km',
    'Final Status',
    'Critical Defect',
    'Problem Description',
    'Action Taken',
    'Remarks',
    'Inspector Name',
    'Supervisor Verification',
  ];

  const rows = inspections.map(i => [
    `"${i.id}"`,
    `"${i.dateTimeDisplay}"`,
    `"${(i.siteProjectName || '').replace(/"/g, '""')}"`,
    `"${i.category}"`,
    `"${(i.machineName || '').replace(/"/g, '""')}"`,
    `"${(i.identificationNumber || '').replace(/"/g, '""')}"`,
    `"${i.shift}"`,
    `"${(i.driverOperatorName || '').replace(/"/g, '""')}"`,
    `"${(i.mechanicName || '').replace(/"/g, '""')}"`,
    i.operatingHoursOrKm || 0,
    `"${i.finalStatus}"`,
    i.hasCriticalDefect ? 'YES (CRITICAL)' : 'NO',
    `"${(i.problemDescription || '').replace(/"/g, '""')}"`,
    `"${(i.actionTaken || '').replace(/"/g, '""')}"`,
    `"${(i.remarks || '').replace(/"/g, '""')}"`,
    `"${(i.inspectorName || '').replace(/"/g, '""')}"`,
    `"${(i.supervisorName || '').replace(/"/g, '""')}"`,
  ]);

  return BOM + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
}

export function exportMaintenanceToCsv(defects: DefectRecord[]): string {
  const BOM = '\uFEFF';
  const headers = [
    'Defect ID',
    'Machine Number',
    'Machine Name',
    'Category',
    'Site Name',
    'Component Checked',
    'Priority',
    'Problem Description',
    'Repair Status',
    'Assigned Mechanic',
    'Spare Parts Required',
    'Repair Remarks',
    'Reporting Person',
    'Date Reported',
    'Completion Date',
    'Supervisor Verification',
  ];

  const rows = defects.map(d => [
    `"${d.id}"`,
    `"${(d.identificationNumber || '').replace(/"/g, '""')}"`,
    `"${(d.machineName || '').replace(/"/g, '""')}"`,
    `"${d.category}"`,
    `"${(d.siteProjectName || '').replace(/"/g, '""')}"`,
    `"${(d.checkItemLabel || '').replace(/"/g, '""')}"`,
    `"${d.priority}"`,
    `"${(d.problemDescription || '').replace(/"/g, '""')}"`,
    `"${d.repairStatus}"`,
    `"${(d.assignedMechanic || '').replace(/"/g, '""')}"`,
    `"${(d.sparePartsRequired || '').replace(/"/g, '""')}"`,
    `"${(d.repairRemarks || '').replace(/"/g, '""')}"`,
    `"${(d.reportingPerson || '').replace(/"/g, '""')}"`,
    `"${d.dateReported}"`,
    `"${d.completionDate || ''}"`,
    `"${(d.supervisorVerification || '').replace(/"/g, '""')}"`,
  ]);

  return BOM + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
}

// 8. BACKUP & RESTORE UTILITIES
export function exportFullBackupJson(): string {
  const backup = {
    app: 'VRC MACHINERIES',
    version: '3.0.0',
    exportDate: new Date().toISOString(),
    fleet: loadFleet(),
    checklistItems: loadChecklistItems(),
    inspections: loadInspections(),
    defects: loadDefects(),
    profile: loadProjectProfile(),
  };
  return JSON.stringify(backup, null, 2);
}

export function importFullBackupJson(jsonString: string): boolean {
  try {
    const backup = JSON.parse(jsonString);
    if (backup.fleet && Array.isArray(backup.fleet)) {
      saveFleet(backup.fleet);
    }
    if (backup.checklistItems && Array.isArray(backup.checklistItems)) {
      saveChecklistItems(backup.checklistItems);
    }
    if (backup.inspections && Array.isArray(backup.inspections)) {
      saveInspections(backup.inspections);
    }
    if (backup.defects && Array.isArray(backup.defects)) {
      saveDefects(backup.defects);
    }
    if (backup.profile) {
      saveProjectProfile(backup.profile);
    }
    return true;
  } catch (err) {
    console.error('Failed to restore backup', err);
    return false;
  }
}

export function resetAllData() {
  localStorage.removeItem(STORAGE_KEYS.FLEET);
  localStorage.removeItem(STORAGE_KEYS.CHECKLIST_ITEMS);
  localStorage.removeItem(STORAGE_KEYS.INSPECTIONS);
  localStorage.removeItem(STORAGE_KEYS.DEFECTS);
  return {
    fleet: loadFleet(),
    checklist: loadChecklistItems(),
    inspections: loadInspections(),
    defects: loadDefects(),
  };
}
