import React from 'react';
import { Truck, HardHat, QrCode, Settings, Wifi, WifiOff, ShieldAlert, Globe } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { LanguageCode } from '../types/inspection';
import { VrcLogo } from './VrcLogo';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenQrScanner: () => void;
  onOpenSettings: () => void;
  onGoToDashboard: () => void;
  failedMachinesCount: number;
  totalFleetCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenQrScanner,
  onOpenSettings,
  onGoToDashboard,
  failedMachinesCount,
  totalFleetCount,
}) => {
  const isOnline = useOnlineStatus();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      {/* Industrial Safety Yellow Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        
        {/* Brand */}
        <div 
          onClick={onGoToDashboard}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Official VRC Construction India Ltd Logo: White Background, Red Oval & Serif VRC */}
          <VrcLogo size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-black text-white tracking-wider uppercase group-hover:text-red-400 transition">
                VRC MACHINERIES
              </h1>
              <span className="text-[10px] font-mono font-bold bg-red-950/80 text-red-400 border border-red-800/80 px-1.5 py-0.2 rounded">
                P&amp;M APK
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Plant &amp; Machinery Dept • Dev: Prince Pandey
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Multilingual Selector (English / हिंदी / ਪੰਜਾਬੀ) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg transition ${
                currentLanguage === 'en'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded-lg transition ${
                currentLanguage === 'hi'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="हिंदी (Hindi)"
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pa')}
              className={`px-2 py-1 rounded-lg transition ${
                currentLanguage === 'pa'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="ਪੰਜਾਬੀ (Punjabi)"
            >
              ਪੰਜਾਬੀ
            </button>
          </div>

          {/* STOP Warning Pill if any machine failed */}
          {failedMachinesCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-black text-white bg-rose-600 rounded-lg shadow animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{failedMachinesCount} STOPPED</span>
            </div>
          )}

          {/* Scan QR */}
          <button
            onClick={onOpenQrScanner}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-bold text-amber-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg flex items-center gap-1.5 transition active:scale-95"
            title="Scan Machine QR Code"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">QR Scan</span>
          </button>

          {/* Install APK / WebAPK */}
          <PWAInstallButton />

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-800 transition"
            title="Settings & Credits"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
