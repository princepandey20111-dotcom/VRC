import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  User, 
  Gauge,
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { InspectionRecord, FinalInspectionStatus, MachineCategory, LanguageCode } from '../types/inspection';
import { exportInspectionsToCsv } from '../utils/storage';
import { t } from '../utils/translations';

interface InspectionHistoryProps {
  inspections: InspectionRecord[];
  language: LanguageCode;
  onOpenReport: (inspection: InspectionRecord) => void;
}

export const InspectionHistory: React.FC<InspectionHistoryProps> = ({
  inspections,
  language,
  onOpenReport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<'ALL' | 'TODAY' | 'WEEKLY' | 'MONTHLY'>('ALL');
  const [statusFilter, setStatusFilter] = useState<FinalInspectionStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<MachineCategory | 'ALL'>('ALL');

  const now = Date.now();
  const oneDayMs = 86400000;
  const sevenDaysMs = oneDayMs * 7;
  const thirtyDaysMs = oneDayMs * 30;

  const categoriesList: MachineCategory[] = [
    'EARTHMOVING',
    'VEHICLES_TRANSPORT',
    'LIFTING_HANDLING',
    'BOOM_LIFTS_ACCESS',
    'DG_POWER',
    'MAIN_PLANTS',
    'CONCRETE_ROAD',
    'WORKSHOP_FABRICATION',
    'PUMPS_UTILITY',
    'MATERIAL_REINFORCEMENT',
  ];

  const filteredInspections = inspections.filter(insp => {
    // Search
    const matchesSearch =
      insp.identificationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insp.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insp.driverOperatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insp.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insp.siteProjectName.toLowerCase().includes(searchTerm.toLowerCase());

    // Status
    const matchesStatus = statusFilter === 'ALL' || insp.finalStatus === statusFilter;

    // Category
    const matchesCategory = categoryFilter === 'ALL' || insp.category === categoryFilter;

    // Time Range (Daily, Weekly, Monthly)
    let matchesTime = true;
    if (timeRange === 'TODAY') {
      const todayStr = new Date().toISOString().split('T')[0];
      matchesTime = insp.date === todayStr;
    } else if (timeRange === 'WEEKLY') {
      matchesTime = now - insp.timestamp <= sevenDaysMs;
    } else if (timeRange === 'MONTHLY') {
      matchesTime = now - insp.timestamp <= thirtyDaysMs;
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesTime;
  });

  const handleExportExcelCsv = () => {
    const csv = exportInspectionsToCsv(filteredInspections);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VRC_MACHINERIES_Daily_Inspection_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Header & Controls */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3.5 shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Inspection Shift Logs &amp; Historical Reports ({filteredInspections.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily, weekly and monthly machinery records with Excel CSV export and PDF certification.
            </p>
          </div>

          {/* PRIORITY: Excel Export Button */}
          <button
            onClick={handleExportExcelCsv}
            disabled={filteredInspections.length === 0}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            {t('btnExportExcel', language)}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by machine number, vehicle reg, driver, or project site..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Period Filters: Daily, Weekly, Monthly */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          
          <div className="flex items-center gap-1 text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase mr-1">Period:</span>
            <button
              onClick={() => setTimeRange('ALL')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeRange('TODAY')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === 'TODAY' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Daily (Today)
            </button>
            <button
              onClick={() => setTimeRange('WEEKLY')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === 'WEEKLY' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Weekly (7 Days)
            </button>
            <button
              onClick={() => setTimeRange('MONTHLY')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === 'MONTHLY' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Monthly (30 Days)
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase mr-1">Status:</span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('PASS')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'PASS' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-emerald-400'
              }`}
            >
              PASS
            </button>
            <button
              onClick={() => setStatusFilter('NEEDS_ATTENTION')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'NEEDS_ATTENTION' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-amber-400'
              }`}
            >
              ATTENTION
            </button>
            <button
              onClick={() => setStatusFilter('FAIL')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'FAIL' ? 'bg-rose-600 text-white' : 'bg-slate-950 text-rose-400'
              }`}
            >
              FAIL (STOP)
            </button>
          </div>
        </div>

        {/* 10 Category Quick Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none pt-1">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition ${
              categoryFilter === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400'
            }`}
          >
            All Categories
          </button>
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition ${
                categoryFilter === cat ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400'
              }`}
            >
              {t(cat, language)}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-2.5">
        {filteredInspections.length === 0 ? (
          <div className="text-center p-12 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-white">No Inspection Records Found</p>
            <p className="text-xs text-slate-400">Perform inspections from the Dashboard or Machines tab.</p>
          </div>
        ) : (
          filteredInspections.map(insp => {
            const isFailed = insp.finalStatus === 'FAIL';
            const isAttention = insp.finalStatus === 'NEEDS_ATTENTION';
            const isPass = insp.finalStatus === 'PASS';

            return (
              <div
                key={insp.id}
                onClick={() => onOpenReport(insp)}
                className={`p-4 rounded-2xl border bg-slate-900/90 hover:border-amber-400 cursor-pointer shadow transition active:scale-99 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isFailed ? 'border-rose-600/80 bg-rose-950/10' : isAttention ? 'border-amber-700/60' : 'border-slate-800'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-700">
                      {insp.identificationNumber}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {insp.machineName}
                    </h3>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded uppercase">
                      {t(insp.category, language)}
                    </span>
                    <span className="text-[10px] text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded">
                      {insp.shift.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {insp.dateTimeDisplay}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      Driver: <strong className="text-slate-200">{insp.driverOperatorName}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      Inspector: <strong className="text-slate-200">{insp.inspectorName}</strong>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-slate-300">
                      <Gauge className="w-3.5 h-3.5 text-amber-400" />
                      {insp.operatingHoursOrKm} hrs/km
                    </span>
                  </div>
                </div>

                {/* Status Badge & Report Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {isPass && (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-300 bg-emerald-950 border border-emerald-700 px-2.5 py-1 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> PASS (SAFE)
                    </span>
                  )}
                  {isAttention && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950 border border-amber-700 px-2.5 py-1 rounded-xl">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> ATTENTION ({insp.defects.length})
                    </span>
                  )}
                  {isFailed && (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-white bg-rose-600 px-2.5 py-1 rounded-xl shadow animate-pulse">
                      <XCircle className="w-3.5 h-3.5" /> FAILED (STOP)
                    </span>
                  )}

                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1 hover:underline">
                    View PDF / Certificate <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
