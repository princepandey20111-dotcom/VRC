/**
 * VRC MACHINERIES - Type Definitions
 * Developed by: Prince Pandey
 * Instructed by: Mr. Anuj Kumar
 * Under the guidance of: Hon. Mr. Dhruv Gupta and Mr. Kanishq Bansal
 */

export type MachineCategory =
  | 'EARTHMOVING'            // 1. Earthmoving Machinery
  | 'VEHICLES_TRANSPORT'     // 2. Vehicles and Transportation
  | 'LIFTING_HANDLING'       // 3. Lifting and Material Handling
  | 'BOOM_LIFTS_ACCESS'      // 4. Boom Lifts and Access Equipment
  | 'DG_POWER'               // 5. DG Sets and Power Equipment
  | 'MAIN_PLANTS'            // 6. Main Construction Plants
  | 'CONCRETE_ROAD'          // 7. Concrete and Road Construction Equipment
  | 'WORKSHOP_FABRICATION'   // 8. Workshop and Fabrication Machinery
  | 'PUMPS_UTILITY'          // 9. Pumps and Utility Equipment
  | 'MATERIAL_REINFORCEMENT' // 10. Material and Reinforcement Equipment
  // Legacy aliases for backward compatibility:
  | 'VEHICLES_TIPPERS'
  | 'JCB_BACKHOE'
  | 'LOADERS_EXCAVATORS'
  | 'HYDRA_CRANES'
  | 'COMPACTORS_ROLLERS'
  | 'DG_SETS'
  | 'HMP_PLANTS'
  | 'RMC_PLANTS'
  | 'WMM_PLANTS'
  | 'PUMPS_OTHER';

export const CATEGORY_LABELS: Record<MachineCategory, string> = {
  EARTHMOVING: '1. Earthmoving Machinery',
  VEHICLES_TRANSPORT: '2. Vehicles & Transportation',
  LIFTING_HANDLING: '3. Lifting & Material Handling',
  BOOM_LIFTS_ACCESS: '4. Boom Lifts & Access Equipment',
  DG_POWER: '5. DG Sets & Power Equipment',
  MAIN_PLANTS: '6. Main Construction Plants',
  CONCRETE_ROAD: '7. Concrete & Road Equipment',
  WORKSHOP_FABRICATION: '8. Workshop & Fabrication Machinery',
  PUMPS_UTILITY: '9. Pumps & Utility Equipment',
  MATERIAL_REINFORCEMENT: '10. Material & Reinforcement Equipment',
  // Legacy mappings:
  VEHICLES_TIPPERS: '2. Vehicles & Transportation',
  JCB_BACKHOE: '1. Earthmoving Machinery',
  LOADERS_EXCAVATORS: '1. Earthmoving Machinery',
  HYDRA_CRANES: '3. Lifting & Material Handling',
  COMPACTORS_ROLLERS: '1. Earthmoving Machinery',
  DG_SETS: '5. DG Sets & Power Equipment',
  HMP_PLANTS: '6. Main Construction Plants',
  RMC_PLANTS: '6. Main Construction Plants',
  WMM_PLANTS: '6. Main Construction Plants',
  PUMPS_OTHER: '9. Pumps & Utility Equipment',
};

export type LanguageCode = 'en' | 'hi' | 'pa';

export type MachineOperationalStatus =
  | 'WORKING'            // Working / Fit and safe for operation
  | 'BREAKDOWN'          // Breakdown / Critical stop
  | 'UNDER_MAINTENANCE'  // Under Maintenance / Workshop repair
  | 'PENDING'            // Pending daily pre-shift inspection
  // Aliases:
  | 'PASSED'
  | 'FAILED_STOP'
  | 'NEEDS_ATTENTION';

export interface SparePartRecord {
  id: string;
  partName: string;
  partNumber?: string;
  quantity: number;
  dateReplaced: string;
  mechanicName: string;
  costEstimate?: string;
  remarks?: string;
}

export interface BreakdownRecord {
  id: string;
  date: string;
  issue: string;
  rootCause?: string;
  actionTaken: string;
  mechanicName: string;
  downtimeHours?: number;
  status: 'RESOLVED' | 'UNDER_REPAIR' | 'AWAITING_PARTS';
}

export interface MaintenanceServiceRecord {
  id: string;
  serviceType: 'ROUTINE_PREVENTIVE' | 'SCHEDULED_SERVICE' | '500_HRS' | '1000_HRS' | 'EMERGENCY_REPAIR';
  serviceDate: string;
  hourMeterOrKm: number;
  performedBy: string;
  oilFilterChanged?: boolean;
  fuelFilterChanged?: boolean;
  hydraulicOilChecked?: boolean;
  greasingDone?: boolean;
  remarks?: string;
}

export interface Machine {
  id: string;
  masterNumber?: number;         // 1 to 105 in P&M master list
  name: string;                  // e.g. "Hydra Crane - 14 Ton", "DG Set - 125 kVA"
  identificationNumber: string;  // Machine ID / Vehicle No / Reg No (e.g. "EXC-VRC-01" or "HR 55 AH 4421")
  category: MachineCategory;
  modelMake?: string;            // e.g. "Tata Hitachi EX200", "Action Construction ACE"
  capacityRating?: string;       // Capacity / tonnage / kVA / boom height
  siteProjectName: string;       // e.g. "VRC Highway Expressway Yard - Pier 14"
  driverOperatorName?: string;
  mechanicName?: string;
  currentHoursOdometer?: number; // Hour-meter or Kilometre
  fuelOilStatus?: string;        // Fuel and oil checks summary
  status: MachineOperationalStatus;
  lastInspectionDate?: string;
  lastInspectionId?: string;
  photoUrl?: string;
  qrCodeValue: string;
  // History & Tracking:
  maintenanceHistory?: MaintenanceServiceRecord[];
  breakdownHistory?: BreakdownRecord[];
  sparePartsHistory?: SparePartRecord[];
  customChecklistItems?: ChecklistItem[];
}

export type CheckOption = 'OK' | 'NOT_OK' | 'NA';

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  isCritical: boolean; // If NOT OK, triggers FAIL & STOP MACHINE
  categories: MachineCategory[];
  isCustom?: boolean;
}

export interface InspectionItemResult {
  itemId: string;
  status: CheckOption | null; // Null initially because "Never mark an inspection item as OK automatically"
  notes?: string;
}

export type FinalInspectionStatus = 'PASS' | 'FAIL' | 'NEEDS_ATTENTION';

export type DefectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type RepairStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface DefectRecord {
  id: string;
  inspectionId: string;
  machineId: string;
  machineName: string;
  identificationNumber: string;
  category: MachineCategory;
  siteProjectName: string;
  checkItemLabel: string;
  isCritical: boolean;
  priority: DefectPriority;
  problemDescription: string;
  photoUrl?: string;
  reportingPerson: string;
  dateReported: string;
  assignedMechanic?: string;
  repairStatus: RepairStatus;
  sparePartsRequired?: string;
  repairRemarks?: string;
  completionDate?: string;
  supervisorVerification?: string;
}

export type ShiftType = 'DAY_SHIFT' | 'NIGHT_SHIFT' | 'GENERAL_SHIFT';

export interface InspectionRecord {
  id: string;
  date: string;              // YYYY-MM-DD
  dateTimeDisplay: string;    // Formatted date and time
  timestamp: number;
  siteProjectName: string;
  category: MachineCategory;
  machineId: string;
  machineName: string;
  identificationNumber: string;
  driverOperatorName: string;
  mechanicName?: string;
  inspectorName: string;
  shift: ShiftType;
  operatingHoursOrKm: number; // Hour-meter or Kilometre reading
  checklistResults: Record<string, InspectionItemResult>;
  problemDescription?: string;
  photoOfProblem?: string;
  defectPhotoUrl?: string; // Optional alias
  actionTaken?: string;
  repairActionRequired?: string; // Optional alias
  remarks?: string;
  operatorSignature: string; // Base64 signature image
  inspectorSignature?: string; // Optional alias
  supervisorSignature?: string;
  supervisorName?: string;
  finalStatus: FinalInspectionStatus;
  hasCriticalDefect: boolean;
  warningNotice?: string;
  defects: DefectRecord[];
}

export interface DashboardStats {
  totalMachines: number;
  inspectionsCompleted: number;
  inspectionsPending: number;
  machinesPassed: number;
  machinesFailed: number;
  machinesWithDefects: number;
  criticalDefects: number;
  defectsRequiringRepair: number;
  repairsPending: number;
  repairsCompleted: number;
}
