import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ApkInstallGuideModal } from './ApkInstallGuideModal';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If already installed, show small badge or APK info button
  if (isInstalled) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800 rounded-lg hover:bg-emerald-900/60 transition"
          title="App installed - click for APK details"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          APK Active
        </button>
        <ApkInstallGuideModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <>
      {isInstallable ? (
        <button
          onClick={install}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-500/20 active:scale-95 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install APK</span>
        </button>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg active:scale-95 transition"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Get APK</span>
        </button>
      )}

      <ApkInstallGuideModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
