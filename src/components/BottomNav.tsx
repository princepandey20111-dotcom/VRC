import React from 'react';
import { LayoutDashboard, Truck, CheckSquare, Wrench, FileText } from 'lucide-react';

export type AppNavTab = 'dashboard' | 'fleet' | 'defects' | 'history' | 'admin_checklist';

interface BottomNavProps {
  currentTab: AppNavTab;
  onTabChange: (tab: AppNavTab) => void;
  openDefectsCount: number;
  onQuickInspect: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  openDefectsCount,
  onQuickInspect,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 pb-safe sm:hidden">
      <div className="grid grid-cols-5 items-center h-14">
        
        {/* Tab 1: Dashboard */}
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center justify-center h-full transition ${
            currentTab === 'dashboard' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Tab 2: Fleet / Machines */}
        <button
          onClick={() => onTabChange('fleet')}
          className={`flex flex-col items-center justify-center h-full transition ${
            currentTab === 'fleet' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Machines</span>
        </button>

        {/* Center: Quick Inspect Button */}
        <div className="flex items-center justify-center -mt-4">
          <button
            onClick={onQuickInspect}
            className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-slate-950 active:scale-95 transition"
            title="Start Daily Inspection"
          >
            <CheckSquare className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 4: Defects */}
        <button
          onClick={() => onTabChange('defects')}
          className={`flex flex-col items-center justify-center h-full relative transition ${
            currentTab === 'defects' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Wrench className="w-4 h-4" />
            {openDefectsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-600 text-white font-black text-[9px] rounded-full flex items-center justify-center animate-pulse">
                {openDefectsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Defects</span>
        </button>

        {/* Tab 5: Reports / History */}
        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center h-full transition ${
            currentTab === 'history' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Reports</span>
        </button>
      </div>
    </nav>
  );
};
