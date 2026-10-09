import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, Copy, Check, ExternalLink, QrCode, Shield, HardHat, FileCode, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkInstallGuideModal: React.FC<ApkInstallGuideModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS, isAndroid } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'instant' | 'build_apk' | 'mobile_qr'>('instant');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const manifestJsonDownload = () => {
    const manifestObj = {
      name: "VRC MACHINERIES - Daily Machine Inspection",
      short_name: "VRC Machine",
      description: "Daily Machine Inspection App for Vehicles, HMP Plant, RMC Plant, WMM Plant, Heavy Machinery. Developed by Prince Pandey.",
      start_url: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: "#ffffff",
      theme_color: "#dc2626",
      icons: [
        { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" }
      ]
    };
    const blob = new Blob([JSON.stringify(manifestObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vrc-machineries-android-manifest.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Install Machinery APK / WebAPK
              </h3>
              <p className="text-[11px] text-slate-400">Offline Field Inspection App for Android & Rugged Devices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('instant')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'instant'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            1-Click Android WebAPK
          </button>
          <button
            onClick={() => setActiveTab('mobile_qr')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'mobile_qr'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            Scan on Phone
          </button>
          <button
            onClick={() => setActiveTab('build_apk')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'build_apk'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Build Native APK
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'instant' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 flex items-start gap-3">
                <HardHat className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200 space-y-1">
                  <p className="font-semibold text-white">Native Android WebAPK Support</p>
                  <p className="text-amber-300/80 leading-relaxed">
                    Google Chrome on Android automatically compiles PWAs into a real Android APK installed into your system app drawer with its own app icon, hardware camera access, and offline data storage.
                  </p>
                </div>
              </div>

              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center space-y-1">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">VRC MACHINERIES is Installed!</p>
                  <p className="text-xs text-emerald-300">
                    Running in standalone app mode with complete offline jobsite caching.
                  </p>
                </div>
              ) : isInstallable ? (
                <div className="space-y-2">
                  <button
                    onClick={install}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition"
                  >
                    <Download className="w-4 h-4" />
                    Install App on this Device (WebAPK)
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    Creates native home-screen launcher & unlocks full-screen operator view.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    How to install on Android Chrome / Samsung Internet:
                  </h4>
                  <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Open this URL in <strong>Google Chrome</strong> on your Android phone or rugged tablet.</li>
                    <li>Tap the <strong>three dots menu (⋮)</strong> in the top-right corner.</li>
                    <li>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                    <li>Android will package it as an APK and place the <strong>VRC MACHINERIES</strong> icon on your phone!</li>
                  </ol>
                </div>
              )}

              {/* Offline highlight */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <p className="text-xs font-bold text-white">100% Offline</p>
                  <p className="text-[10px] text-slate-400">Inspect without cell reception</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <p className="text-xs font-bold text-white">Zero Storage Bloat</p>
                  <p className="text-[10px] text-slate-400">Under 5MB lightweight APK</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mobile_qr' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-300">
                Scan this QR code with any Android phone or tablet camera on the jobsite:
              </p>

              {/* QR Code Canvas Representation */}
              <div className="mx-auto w-48 h-48 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}&bgcolor=ffffff&color=090d16`}
                  alt="Inspection App Mobile Link"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent text-xs text-slate-300 font-mono px-2 truncate focus:outline-none"
                />
                <button
                  onClick={handleCopyUrl}
                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1 transition"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedUrl ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'build_apk' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                Want to build a standalone signed Android <code>.apk</code> or <code>.aab</code> for Google Play or enterprise MDM sideloading?
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Method 1: Bubblewrap CLI (Google Official)</span>
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-900 text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800">
{`npm i -g @bubblewrap/cli
bubblewrap init --manifest="${currentUrl}/manifest.webmanifest"
bubblewrap build`}
                </pre>
                <p className="text-[10px] text-slate-400">
                  Outputs <code>app-release-signed.apk</code> ready for direct install on any rugged Android tablet (CAT, Zebra, Samsung Active).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400">Method 2: PWABuilder / Capacitor</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter this application URL at <strong>PWABuilder.com</strong> to download a pre-packaged Android Studio project and signed APK.
                </p>
                <button
                  onClick={manifestJsonDownload}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Configured Android Manifest.json
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            OSHA 1926.600 & ISO 45001 Ready
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
