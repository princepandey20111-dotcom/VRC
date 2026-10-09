import React, { useState } from 'react';
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Search, 
  ShieldAlert, 
  User, 
  Download,
  Calendar,
  Check,
  PackageCheck
} from 'lucide-react';
import { DefectRecord, DefectPriority, RepairStatus, LanguageCode } from '../types/inspection';
import { exportMaintenanceToCsv } from '../utils/storage';
import { t } from '../utils/translations';

interface DefectTrackerProps {
  defects: DefectRecord[];
  language: LanguageCode;
  onUpdateDefect: (defectId: string, updates: Partial<DefectRecord>) => void;
}

export const DefectTracker: React.FC<DefectTrackerProps> = ({
  defects,
  language,
  onUpdateDefect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RepairStatus | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<DefectPriority | 'ALL'>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Active Maintenance Edit Drawer
  const [activeDefect, setActiveDefect] = useState<DefectRecord | null>(null);
  const [mechanicName, setMechanicName] = useState('');
  const [repairStatus, setRepairStatus] = useState<RepairStatus>('PENDING');
  const [spareParts, setSpareParts] = useState('');
  const [repairRemarks, setRepairRemarks] = useState('');
  const [supervisorVerification, setSupervisorVerification] = useState('');

  const filteredDefects = defects.filter(d => {
    const matchesSearch =
      d.identificationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.checkItemLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.problemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.assignedMechanic && d.assignedMechanic.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || d.repairStatus === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || d.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleOpenEdit = (defect: DefectRecord) => {
    setActiveDefect(defect);
    setMechanicName(defect.assignedMechanic || 'Satish Sharma');
    setRepairStatus(defect.repairStatus);
    setSpareParts(defect.sparePartsRequired || '');
    setRepairRemarks(defect.repairRemarks || '');
    setSupervisorVerification(defect.supervisorVerification || 'Verified by Anuj Kumar');
  };

  const handleSaveMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDefect) return;

    onUpdateDefect(activeDefect.id, {
      assignedMechanic: mechanicName.trim() || undefined,
      repairStatus,
      sparePartsRequired: spareParts.trim() || undefined,
      repairRemarks: repairRemarks.trim() || undefined,
      completionDate: repairStatus === 'COMPLETED' ? new Date().toISOString() : undefined,
      supervisorVerification: supervisorVerification.trim() || undefined,
    });

    setActiveDefect(null);
  };

  const handleExportCsv = () => {
    const csv = exportMaintenanceToCsv(filteredDefects);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VRC_Maintenance_Log_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPriorityBadge = (priority: DefectPriority) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="text-[10px] font-black text-white bg-rose-600 px-2.5 py-0.5 rounded-full shadow animate-pulse">
            CRITICAL STOP
          </span>
        );
      case 'HIGH':
        return (
          <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-700">
            HIGH PRIORITY
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="text-[10px] font-semibold text-yellow-300 bg-yellow-950 px-2 py-0.5 rounded-full border border-yellow-800">
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="text-[10px] font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
            LOW
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3.5 shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              Maintenance &amp; Defect Management ({defects.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Track reported defects, spare parts, mechanic assignments, and supervisor sign-offs.
            </p>
          </div>

          <button
            onClick={handleExportCsv}
            disabled={filteredDefects.length === 0}
            className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            {t('btnExportExcel', language)}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search defect by machine number, vehicle reg, defect name, or mechanic..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase mr-1">Status:</span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-xl transition ${
                statusFilter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              All ({defects.length})
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-2.5 py-1 rounded-xl transition ${
                statusFilter === 'PENDING' ? 'bg-rose-600 text-white shadow' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Pending ({defects.filter(d => d.repairStatus === 'PENDING').length})
            </button>
            <button
              onClick={() => setStatusFilter('IN_PROGRESS')}
              className={`px-2.5 py-1 rounded-xl transition ${
                statusFilter === 'IN_PROGRESS' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              In Progress ({defects.filter(d => d.repairStatus === 'IN_PROGRESS').length})
            </button>
            <button
              onClick={() => setStatusFilter('COMPLETED')}
              className={`px-2.5 py-1 rounded-xl transition ${
                statusFilter === 'COMPLETED' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Completed ({defects.filter(d => d.repairStatus === 'COMPLETED').length})
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase mr-1">Priority:</span>
            <button
              onClick={() => setPriorityFilter('ALL')}
              className={`px-2 py-1 rounded-lg text-[11px] transition ${
                priorityFilter === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriorityFilter('CRITICAL')}
              className={`px-2 py-1 rounded-lg text-[11px] transition ${
                priorityFilter === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-slate-950 text-rose-400'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setPriorityFilter('HIGH')}
              className={`px-2 py-1 rounded-lg text-[11px] transition ${
                priorityFilter === 'HIGH' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-amber-400'
              }`}
            >
              High
            </button>
          </div>
        </div>
      </div>

      {/* Defects Cards */}
      <div className="space-y-3">
        {filteredDefects.length === 0 ? (
          <div className="text-center p-12 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">No Defects Matching Filters</p>
            <p className="text-xs text-slate-400">All machinery in working condition.</p>
          </div>
        ) : (
          filteredDefects.map(defect => {
            const isCritical = defect.priority === 'CRITICAL' || defect.isCritical;
            const isCompleted = defect.repairStatus === 'COMPLETED';
            const isInProgress = defect.repairStatus === 'IN_PROGRESS';

            return (
              <div
                key={defect.id}
                className={`p-4 rounded-2xl border shadow-lg space-y-3 transition ${
                  isCompleted
                    ? 'bg-slate-900/60 border-slate-800'
                    : isCritical
                    ? 'bg-rose-950/20 border-rose-700'
                    : 'bg-amber-950/20 border-amber-800'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-700">
                      {defect.identificationNumber}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {defect.machineName}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase bg-slate-800 px-1.5 py-0.5 rounded">
                      Site: {defect.siteProjectName}
                    </span>
                    {getPriorityBadge(defect.priority)}
                  </div>

                  <div>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-xl border border-emerald-800">
                        <Check className="w-3.5 h-3.5" /> REPAIR COMPLETED
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-xl border border-amber-800">
                        <Wrench className="w-3.5 h-3.5 animate-spin" /> IN PROGRESS
                      </span>
                    )}
                    {!isCompleted && !isInProgress && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300 bg-rose-950 px-2.5 py-1 rounded-xl border border-rose-800 animate-pulse">
                        <Clock className="w-3.5 h-3.5" /> REPAIR PENDING
                      </span>
                    )}
                  </div>
                </div>

                {/* Critical safety warning for this machine */}
                {isCritical && !isCompleted && (
                  <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-800 text-xs text-rose-200 font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>EQUIPMENT GROUNDED: Do not operate this machine until cleared by an authorized supervisor.</span>
                  </div>
                )}

                {/* Problem & Repair Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Failed Check &amp; Problem:
                    </span>
                    <p className="font-bold text-rose-300">{defect.checkItemLabel}</p>
                    <p className="text-slate-200">{defect.problemDescription}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Maintenance &amp; Spare Parts:
                    </span>
                    {defect.sparePartsRequired ? (
                      <p className="text-amber-300 font-medium">
                        <strong>Parts:</strong> {defect.sparePartsRequired}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">No spare parts listed yet.</p>
                    )}
                    {defect.repairRemarks && (
                      <p className="text-slate-300 mt-1">
                        <strong>Remarks:</strong> {defect.repairRemarks}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer metadata & Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>
                      Reported by: <strong className="text-slate-200">{defect.reportingPerson}</strong> ({new Date(defect.dateReported).toLocaleDateString()})
                    </span>
                    {defect.assignedMechanic && (
                      <span>
                        Mechanic: <strong className="text-slate-200">{defect.assignedMechanic}</strong>
                      </span>
                    )}
                    {defect.photoUrl && (
                      <button
                        onClick={() => setSelectedPhoto(defect.photoUrl || null)}
                        className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Camera className="w-3.5 h-3.5" /> View Photo
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenEdit(defect)}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition"
                  >
                    Update Maintenance / Parts
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Maintenance Edit Drawer Modal */}
      {activeDefect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Update Maintenance ({activeDefect.identificationNumber})
              </h3>
              <button
                onClick={() => setActiveDefect(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMaintenance} className="p-5 space-y-3.5 max-h-[82vh] overflow-y-auto">
              <div>
                <label className="text-xs text-slate-300 font-bold uppercase block mb-1">
                  Repair Status *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRepairStatus('PENDING')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      repairStatus === 'PENDING' ? 'bg-rose-600 text-white border-rose-500 shadow' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => setRepairStatus('IN_PROGRESS')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      repairStatus === 'IN_PROGRESS' ? 'bg-amber-500 text-slate-950 border-amber-400 shadow' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => setRepairStatus('COMPLETED')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      repairStatus === 'COMPLETED' ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold uppercase block mb-1">
                  Assigned Mechanic / Fitter
                </label>
                <input
                  type="text"
                  placeholder="e.g. Satish Sharma (Lead Mechanic)"
                  value={mechanicName}
                  onChange={e => setMechanicName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold uppercase block mb-1">
                  Spare Parts Required
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 1x Hydraulic hose 3/4 inch, 2x O-ring seal 40mm, 20L Tellus 68 Hydraulic Oil..."
                  value={spareParts}
                  onChange={e => setSpareParts(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold uppercase block mb-1">
                  Repair Remarks &amp; Actions Taken
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Hose replaced, flushed hydraulic filter, tested under full working load, no leaks."
                  value={repairRemarks}
                  onChange={e => setRepairRemarks(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold uppercase block mb-1">
                  Supervisor Verification Sign-off
                </label>
                <input
                  type="text"
                  placeholder="e.g. Verified and approved safe by Anuj Kumar (Site Engineer)"
                  value={supervisorVerification}
                  onChange={e => setSupervisorVerification(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveDefect(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow"
                >
                  Save Maintenance Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Photo */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
        >
          <div className="relative max-w-lg max-h-[85vh] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <img src={selectedPhoto} alt="Defect Large" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};
