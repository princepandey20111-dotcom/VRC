/**
 * VRC MACHINERIES - Daily Machine Inspection Application
 *
 * Developed by: Prince Pandey
 * Instructed by: Mr. Anuj Kumar
 * Under the guidance of: Hon. Mr. Dhruv Gupta and Kanishq Bansal
 * Platform: Android
 * Cost: 100% free, with no paid APIs, subscriptions, or services.
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Truck, 
  Wrench, 
  FileText, 
  CheckSquare, 
  Plus, 
  Settings, 
  Smartphone,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

import { 
  Machine, 
  ChecklistItem, 
  InspectionRecord, 
  DefectRecord, 
  MachineCategory, 
  RepairStatus,
  DashboardStats 
} from './types/inspection';

import { 
  loadFleet, 
  saveFleet, 
  addMachine, 
  deleteMachine,
  loadChecklistItems, 
  saveChecklistItems, 
  addChecklistItem, 
  updateChecklistItem, 
  deleteChecklistItem, 
  loadInspections, 
  recordInspection, 
  loadDefects, 
  updateDefectRecord,
  updateDefectStatus,
  loadProjectProfile, 
  saveProjectProfile, 
  calculateDashboardStats, 
  resetAllData,
  ProjectProfile
} from './utils/storage';

import { setupPWA } from './pwa';
import { soundFx } from './utils/audio';

// Components
import { Header } from './components/Header';
import { BottomNav, AppNavTab } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { FleetList } from './components/FleetList';
import { InspectionForm } from './components/InspectionForm';
import { DefectTracker } from './components/DefectTracker';
import { InspectionHistory } from './components/InspectionHistory';
import { AdminChecklistEditor } from './components/AdminChecklistEditor';
import { InspectionReportView } from './components/InspectionReportView';
import { QrScannerModal } from './components/QrScannerModal';
import { AssetQrBadgeModal } from './components/AssetQrBadgeModal';
import { SettingsModal } from './components/SettingsModal';
import { ApkInstallGuideModal } from './components/ApkInstallGuideModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DEFAULT_CHECKLIST_ITEMS } from './data/machineryData';

export default function App() {
  const [fleet, setFleet] = useState<Machine[]>([]);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const [defects, setDefects] = useState<DefectRecord[]>([]);
  const [profile, setProfile] = useState<ProjectProfile>(loadProjectProfile());
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(calculateDashboardStats());

  // Navigation State
  const [currentTab, setCurrentTab] = useState<AppNavTab>('dashboard');
  const [fleetCategoryFilter, setFleetCategoryFilter] = useState<MachineCategory | 'ALL'>('ALL');
  const [inspectingMachine, setInspectingMachine] = useState<Machine | null>(null);

  // Modals State
  const [viewingReport, setViewingReport] = useState<InspectionRecord | null>(null);
  const [viewingQrBadge, setViewingQrBadge] = useState<Machine | null>(null);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isApkGuideOpen, setIsApkGuideOpen] = useState(false);

  // Toast Alerts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' | 'warning' } | null>(null);

  useEffect(() => {
    // Setup PWA registration for Android WebAPK
    setupPWA(
      () => console.log('VRC Machineries update ready'),
      () => console.log('VRC Machineries is cached for offline field usage.')
    );

    // Initial storage hydrate
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    setFleet(loadFleet());
    setChecklistItems(loadChecklistItems());
    setInspections(loadInspections());
    setDefects(loadDefects());
    setProfile(loadProjectProfile());
    setDashboardStats(calculateDashboardStats());
  };

  const showToast = (message: string, type: 'success' | 'danger' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Start an inspection on a machine
  const handleStartInspection = (machine: Machine) => {
    soundFx.click();
    setInspectingMachine(machine);
  };

  // Submit Inspection Workflow
  const handleSubmitInspection = (record: InspectionRecord) => {
    recordInspection(record);
    refreshAllData();
    setInspectingMachine(null);

    if (record.finalStatus === 'FAIL') {
      soundFx.dangerAlarm();
      showToast(`CRITICAL STOP: ${record.identificationNumber} failed safety check! Machine stopped.`, 'danger');
    } else if (record.finalStatus === 'NEEDS_ATTENTION') {
      soundFx.warn();
      showToast(`Inspection submitted: ${record.identificationNumber} needs routine maintenance.`, 'warning');
    } else {
      soundFx.pass();
      showToast(`Inspection PASSED! ${record.identificationNumber} certified safe for duty.`);
    }

    // Automatically display the certified printable report slip
    setViewingReport(record);
  };

  // Add Machine
  const handleAddNewMachine = (machineData: Omit<Machine, 'id' | 'qrCodeValue' | 'status'>) => {
    addMachine(machineData);
    refreshAllData();
    soundFx.pass();
    showToast(`Registered ${machineData.identificationNumber} (${machineData.name}) in fleet.`);
  };

  // Delete Machine
  const handleDeleteMachine = (machineId: string) => {
    deleteMachine(machineId);
    refreshAllData();
    showToast('Machine removed from fleet register.');
  };

  // Update Defect Status
  const handleUpdateDefect = (
    defectId: string,
    updates: Partial<DefectRecord>
  ) => {
    updateDefectRecord(defectId, updates);
    refreshAllData();
    soundFx.pass();
    showToast(`Maintenance status updated.`);
  };

  // Admin Checklist Actions
  const handleAddCheckItem = (item: Omit<ChecklistItem, 'id'>) => {
    addChecklistItem(item);
    refreshAllData();
    soundFx.pass();
    showToast(`Added checkpoint "${item.label}".`);
  };

  const handleUpdateCheckItem = (item: ChecklistItem) => {
    updateChecklistItem(item);
    refreshAllData();
    soundFx.pass();
    showToast(`Updated checkpoint "${item.label}".`);
  };

  const handleDeleteCheckItem = (itemId: string) => {
    deleteChecklistItem(itemId);
    refreshAllData();
    showToast('Checklist item deleted.');
  };

  const handleResetCheckDefaults = () => {
    saveChecklistItems(DEFAULT_CHECKLIST_ITEMS);
    refreshAllData();
    soundFx.pass();
    showToast('Checklist items reset to VRC factory defaults.');
  };

  // Save Settings
  const handleSaveProfile = (newProfile: ProjectProfile) => {
    saveProjectProfile(newProfile);
    setProfile(newProfile);
    showToast('Project settings saved.');
  };

  // Reset Demo Fleet
  const handleResetDemoData = () => {
    resetAllData();
    refreshAllData();
    soundFx.pass();
    showToast('VRC demo fleet and records reloaded.');
  };

  // Fast Category Navigation from Dashboard
  const handleSelectCategoryFromDashboard = (cat: MachineCategory) => {
    setFleetCategoryFilter(cat);
    setCurrentTab('fleet');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 pb-20 sm:pb-8">
      
      {/* Top Application Header */}
      <Header
        currentLanguage={profile.language}
        onLanguageChange={lang => {
          const upd = { ...profile, language: lang };
          saveProjectProfile(upd);
          setProfile(upd);
        }}
        onOpenQrScanner={() => setIsQrScannerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoToDashboard={() => {
          setInspectingMachine(null);
          setCurrentTab('dashboard');
        }}
        failedMachinesCount={dashboardStats.machinesFailed}
        totalFleetCount={dashboardStats.totalMachines}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-4 space-y-4">
        
        {/* Floating Toast Notification */}
        {toast && (
          <div
            className={`fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-2xl border text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3 duration-200 max-w-md text-center ${
              toast.type === 'danger'
                ? 'bg-rose-600 text-white border-rose-400'
                : toast.type === 'warning'
                ? 'bg-amber-500 text-slate-950 border-amber-300'
                : 'bg-emerald-500 text-slate-950 border-emerald-300'
            }`}
          >
            {toast.type === 'danger' ? (
              <ShieldAlert className="w-4 h-4 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* If User is Actively Inspecting a Machine */}
        {inspectingMachine ? (
          <InspectionForm
            machine={inspectingMachine}
            checklistItems={checklistItems}
            defaultInspectorName={profile.inspectorName}
            defaultSiteProjectName={profile.siteProjectName}
            language={profile.language}
            onBack={() => setInspectingMachine(null)}
            onSubmitInspection={handleSubmitInspection}
          />
        ) : (
          <>
            {/* Desktop Navigation Tabs Bar */}
            <div className="hidden sm:flex items-center justify-between bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow">
              <div className="flex items-center gap-1 text-xs font-bold">
                
                {/* 1. Dashboard */}
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                    currentTab === 'dashboard'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                {/* 2. Machinery Fleet */}
                <button
                  onClick={() => {
                    setFleetCategoryFilter('ALL');
                    setCurrentTab('fleet');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                    currentTab === 'fleet'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Machines ({fleet.length})</span>
                </button>

                {/* 3. Defects & Maintenance */}
                <button
                  onClick={() => setCurrentTab('defects')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                    currentTab === 'defects'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  <span>Defects ({dashboardStats.defectsRequiringRepair})</span>
                </button>

                {/* 4. Shift Logs & Reports */}
                <button
                  onClick={() => setCurrentTab('history')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                    currentTab === 'history'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Reports ({inspections.length})</span>
                </button>

                {/* 5. Admin Checklist Editor */}
                <button
                  onClick={() => setCurrentTab('admin_checklist')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                    currentTab === 'admin_checklist'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Edit Checklists</span>
                </button>
              </div>

              {/* Quick Android APK Guide link */}
              <button
                onClick={() => setIsApkGuideOpen(true)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold px-3 py-1.5 rounded-xl hover:bg-slate-800 transition"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android APK Guide</span>
              </button>
            </div>

            {/* View: Dashboard */}
            {currentTab === 'dashboard' && (
              <Dashboard
                stats={dashboardStats}
                language={profile.language}
                onSelectCategory={handleSelectCategoryFromDashboard}
                onNavigateTab={tab => setCurrentTab(tab)}
                onStartQuickInspection={() => setIsQrScannerOpen(true)}
                onAddNewMachine={() => {
                  setCurrentTab('fleet');
                }}
              />
            )}

            {/* View: Machinery Fleet */}
            {currentTab === 'fleet' && (
              <FleetList
                fleet={fleet}
                initialCategory={fleetCategoryFilter}
                language={profile.language}
                onSelectForInspection={handleStartInspection}
                onOpenQrScanner={() => setIsQrScannerOpen(true)}
                onViewQrBadge={m => setViewingQrBadge(m)}
                onAddNewMachine={handleAddNewMachine}
                onDeleteMachine={handleDeleteMachine}
              />
            )}

            {/* View: Defects & Maintenance */}
            {currentTab === 'defects' && (
              <DefectTracker
                defects={defects}
                language={profile.language}
                onUpdateDefect={handleUpdateDefect}
              />
            )}

            {/* View: Shift Logs & Historical Reports */}
            {currentTab === 'history' && (
              <InspectionHistory
                inspections={inspections}
                language={profile.language}
                onOpenReport={r => setViewingReport(r)}
              />
            )}

            {/* View: Admin Checklist Editor */}
            {currentTab === 'admin_checklist' && (
              <AdminChecklistEditor
                items={checklistItems}
                onAddItem={handleAddCheckItem}
                onUpdateItem={handleUpdateCheckItem}
                onDeleteItem={handleDeleteCheckItem}
                onResetDefaults={handleResetCheckDefaults}
                onBack={() => setCurrentTab('dashboard')}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation (Visible on phones & small tablets) */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={tab => {
          soundFx.click();
          setInspectingMachine(null);
          setCurrentTab(tab);
        }}
        openDefectsCount={dashboardStats.defectsRequiringRepair}
        onQuickInspect={() => setIsQrScannerOpen(true)}
      />

      {/* Offline Status Pill */}
      <OfflineIndicator />

      {/* Modal: Certified Inspection Certificate Slip */}
      {viewingReport && (
        <InspectionReportView
          inspection={viewingReport}
          onClose={() => setViewingReport(null)}
        />
      )}

      {/* Modal: Machine Asset QR Tag Badge */}
      {viewingQrBadge && (
        <AssetQrBadgeModal
          machine={viewingQrBadge}
          onClose={() => setViewingQrBadge(null)}
        />
      )}

      {/* Modal: QR Asset Scanner */}
      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        fleet={fleet}
        onMachineSelected={m => {
          setIsQrScannerOpen(false);
          handleStartInspection(m);
        }}
      />

      {/* Modal: Settings & Acknowledgements */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetData={handleResetDemoData}
        onOpenApkGuide={() => setIsApkGuideOpen(true)}
      />

      {/* Modal: APK Installation & Build Guide */}
      <ApkInstallGuideModal
        isOpen={isApkGuideOpen}
        onClose={() => setIsApkGuideOpen(false)}
      />
    </div>
  );
}
