import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 left-4 z-40 flex items-center gap-2 rounded-xl bg-amber-500 text-slate-950 font-bold px-3 py-1.5 text-xs shadow-xl border border-amber-300 animate-in slide-in-from-bottom-2 duration-200">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Jobsite Offline Mode Active (Local Cached)</span>
    </div>
  );
};
