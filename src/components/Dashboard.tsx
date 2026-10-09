import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Wrench, 
  Layers, 
  ArrowRight, 
  Flame, 
  Building2, 
  Factory, 
  Zap, 
  Plus, 
  ShieldAlert, 
  CheckSquare, 
  QrCode,
  Award,
  Sparkles,
  Droplets,
  HardHat
} from 'lucide-react';
import { DashboardStats, MachineCategory, LanguageCode } from '../types/inspection';
import { t } from '../utils/translations';
import { VrcLogo } from './VrcLogo';

interface DashboardProps {
  stats: DashboardStats;
  language: LanguageCode;
  onSelectCategory: (category: MachineCategory) => void;
  onNavigateTab: (tab: 'fleet' | 'defects' | 'history' | 'admin_checklist') => void;
  onStartQuickInspection: () => void;
  onAddNewMachine: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  language,
  onSelectCategory,
  onNavigateTab,
  onStartQuickInspection,
  onAddNewMachine,
}) => {
  const categoriesList: Array<{ key: MachineCategory; icon: React.ReactNode; desc: string; countLabel: string }> = [
    {
      key: 'EARTHMOVING',
      icon: <HardHat className="w-5 h-5 text-amber-400" />,
      desc: 'Excavators, JCB 3DX, Wheel Loaders, Dozers, Graders & Rollers.',
      countLabel: '10 Machines (#1-10)',
    },
    {
      key: 'VEHICLES_TRANSPORT',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      desc: 'Transit Mixers, Tippers, Tankers, Bulkers, Pumps & Trailers.',
      countLabel: '14 Machines (#11-24)',
    },
    {
      key: 'LIFTING_HANDLING',
      icon: <Wrench className="w-5 h-5 text-emerald-400" />,
      desc: 'Hydra Cranes (9-25T), Mobile/Crawler/Tower Cranes & Forklifts.',
      countLabel: '8 Machines (#25-32)',
    },
    {
      key: 'BOOM_LIFTS_ACCESS',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      desc: 'Boom Lifts (30-135 ft), Articulating, Scissor & Spider Lifts.',
      countLabel: '6 Machines (#33-38)',
    },
    {
      key: 'DG_POWER',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      desc: 'DG Sets (7.5 to 500 kVA), Air Compressors, Welders & Lights.',
      countLabel: '21 Machines (#39-59)',
    },
    {
      key: 'MAIN_PLANTS',
      icon: <Factory className="w-5 h-5 text-rose-400" />,
      desc: 'RMC, WMM, HMP Plants, Stone Crushers, Chiller & Block Plants.',
      countLabel: '8 Plants (#60-67)',
    },
    {
      key: 'CONCRETE_ROAD',
      icon: <Building2 className="w-5 h-5 text-teal-400" />,
      desc: 'Concrete/Asphalt Pavers, Mixers, Bitumen Distributors & Sweepers.',
      countLabel: '13 Machines (#68-80)',
    },
    {
      key: 'WORKSHOP_FABRICATION',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      desc: 'ARC/MIG/TIG Welders, Ovens, Saws, Grinders & Hydraulic Presses.',
      countLabel: '10 Machines (#81-90)',
    },
    {
      key: 'PUMPS_UTILITY',
      icon: <Droplets className="w-5 h-5 text-blue-400" />,
      desc: 'Diesel/Electric/Submersible Pumps, Slurry Pumps & Washers.',
      countLabel: '8 Machines (#91-98)',
    },
    {
      key: 'MATERIAL_REINFORCEMENT',
      icon: <CheckSquare className="w-5 h-5 text-lime-400" />,
      desc: 'Bar Bending, Cutting, Rebar Threaders, Jacks & Cement Silos.',
      countLabel: '7 Machines (#99-105)',
    },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Official Project Banner with Mandatory Credits & White/Red VRC Logo */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 border-2 border-red-600/40 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        {/* Red & Amber Safety Header Stripe */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                P&amp;M DEPARTMENT • 100% FREE APK
              </span>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                105 Machines Master Register
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* VRC CONSTRUCTION INDIA LTD LOGO: WHITE BACKGROUND & RED FONT */}
              <div className="h-11 px-3.5 bg-white text-red-600 border-2 border-red-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-red-600/20 shrink-0">
                <span className="text-xl font-black tracking-widest text-red-600">VRC</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                  VRC MACHINERIES
                </h1>
                <p className="text-[11px] text-slate-300 font-medium">
                  Plant &amp; Machinery (P&amp;M) Daily Pre-Shift Inspection &amp; Maintenance APK
                </p>
              </div>
            </div>

            {/* Official Guidance Credits */}
            <div className="pt-2 border-t border-slate-800/90 text-[11px] text-slate-300 space-y-0.5">
              <p>
                <strong className="text-red-400">Developed by:</strong> Prince Pandey
                <span className="mx-2 text-slate-600">•</span>
                <strong className="text-amber-400">Instructed by:</strong> Mr. Anuj Kumar
              </p>
              <p>
                <strong className="text-red-400">Under the guidance of:</strong> Hon. Mr. Dhruv Gupta and Kanishq Bansal
              </p>
            </div>
          </div>

          {/* Quick Big CTA Buttons for unskilled labour / operators */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={onStartQuickInspection}
              className="py-3.5 px-6 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-98 transition border border-red-500"
            >
              <CheckSquare className="w-5 h-5 stroke-[2.5]" />
              Start Machine Inspection
            </button>
            <button
              onClick={() => onNavigateTab('fleet')}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Browse 105 Machines List</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid (6 specific KPI counts requested by spec) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        
        {/* 1. Inspections Completed */}
        <div 
          onClick={() => onNavigateTab('history')}
          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow hover:border-slate-700 cursor-pointer transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('kpiCompleted', language)}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2 font-mono">
            {stats.inspectionsCompleted}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Today&apos;s shift logs</span>
        </div>

        {/* 2. Inspections Pending */}
        <div 
          onClick={() => onNavigateTab('fleet')}
          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow hover:border-slate-700 cursor-pointer transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('kpiPending', language)}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-2 font-mono">
            {stats.inspectionsPending}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Awaiting pre-shift check</span>
        </div>

        {/* 3. Machines with Defects */}
        <div 
          onClick={() => onNavigateTab('defects')}
          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow hover:border-slate-700 cursor-pointer transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('kpiWithDefects', language)}</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-2 font-mono">
            {stats.machinesWithDefects}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Fleet items flagged</span>
        </div>

        {/* 4. Critical Defects (Safety Warning) */}
        <div 
          onClick={() => onNavigateTab('defects')}
          className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/80 shadow hover:border-rose-600 cursor-pointer transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('kpiCritical', language)}</span>
            <XCircle className="w-4 h-4 animate-pulse" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-400 mt-2 font-mono">
            {stats.criticalDefects}
          </p>
          <span className="text-[10px] text-rose-300 font-bold mt-1">STOP MACHINE</span>
        </div>

        {/* 5. Repairs Pending */}
        <div 
          onClick={() => onNavigateTab('defects')}
          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow hover:border-slate-700 cursor-pointer transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('kpiRepairsPending', language)}</span>
            <Wrench className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-sky-300 mt-2 font-mono">
            {stats.repairsPending}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Awaiting mechanics</span>
        </div>

        {/* 6. Repairs Completed */}
        <div 
          onClick={() => onNavigateTab('defects')}
          className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 shadow hover:border-emerald-700 cursor-pointer transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('kpiRepairsDone', language)}</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-300 mt-2 font-mono">
            {stats.repairsCompleted}
          </p>
          <span className="text-[10px] text-emerald-400/80 mt-1">Certified fit for duty</span>
        </div>
      </div>

      {/* Critical Stop Warning Banner if critical defect present */}
      {stats.criticalDefects > 0 && (
        <div className="rounded-2xl bg-rose-950/90 border-2 border-rose-600 p-4 shadow-xl flex items-start gap-3.5 animate-in slide-in-from-top-2">
          <ShieldAlert className="w-7 h-7 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              {t('criticalWarning', language)}
            </h3>
            <p className="text-xs text-rose-200 leading-relaxed font-medium">
              Machines with critical defects must remain STOPPED. Do not turn on the ignition or start batching until an authorized engineer or plant manager confirms all safety defects are resolved.
            </p>
          </div>
        </div>
      )}

      {/* 10 Required Machine Categories Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Machine Categories &amp; Inspection Sections (10 Plant Groups)
            </h2>
            <p className="text-xs text-slate-400">
              Select any machinery category to inspect or manage plant equipment.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('admin_checklist')}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl transition"
          >
            {t('navAdmin', language)}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
          {categoriesList.map(item => (
            <div
              key={item.key}
              onClick={() => onSelectCategory(item.key)}
              className="group p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/80 shadow-md cursor-pointer transition active:scale-99 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition mt-2.5 leading-snug">
                  {t(item.key, language)}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400 font-bold">
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official VRC Machineries About & Credits Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <VrcLogo size="sm" />
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                VRC MACHINERIES • P&amp;M Department
              </h3>
              <p className="text-[11px] text-slate-400">
                Plant &amp; Machinery Head Office Monitoring System • VRC Construction India Ltd
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-red-950/80 text-red-400 border border-red-800/80 px-2 py-0.5 rounded-md">
              APK &lt; 30MB
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded-md">
              100% Free / Offline Ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Developed by
            </span>
            <p className="text-sm font-black text-emerald-400 mt-0.5">
              Prince Pandey
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Engineer, P&amp;M Department</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Instructed by
            </span>
            <p className="text-sm font-black text-sky-400 mt-0.5">
              Mr. Anuj Kumar
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Plant &amp; Machinery Incharge</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Under the guidance of
            </span>
            <p className="text-sm font-black text-amber-300 mt-0.5">
              Hon. Mr. Dhruv Gupta and Mr. Kanishq Bansal
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">VRC Construction India Ltd</p>
          </div>
        </div>
      </div>
    </div>
  );
};
