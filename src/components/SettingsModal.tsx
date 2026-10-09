import React, { useState } from 'react';
import { Settings, User, Building, MapPin, Volume2, VolumeX, RotateCcw, X, Smartphone, Award, ShieldCheck, Heart } from 'lucide-react';
import { ProjectProfile } from '../utils/storage';
import { soundFx } from '../utils/audio';
import { VrcLogo } from './VrcLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProjectProfile;
  onSaveProfile: (profile: ProjectProfile) => void;
  onResetData: () => void;
  onOpenApkGuide: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetData,
  onOpenApkGuide,
}) => {
  const [inspectorName, setInspectorName] = useState(profile.inspectorName);
  const [siteProjectName, setSiteProjectName] = useState(profile.siteProjectName);
  const [contractorName, setContractorName] = useState(profile.contractorName);
  const [selectedLanguage, setSelectedLanguage] = useState(profile.language);
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      inspectorName,
      siteProjectName,
      contractorName,
      language: selectedLanguage,
    });
    onClose();
  };

  const toggleSound = () => {
    const next = !isMuted;
    soundFx.setMuted(next);
    setIsMuted(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              VRC MACHINERIES Settings
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* Official Mandatory Project Acknowledgement Card */}
          <div className="rounded-2xl bg-gradient-to-br from-red-600/15 via-slate-950 to-slate-950 border-2 border-red-600/50 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <Award className="w-5 h-5" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Project Information &amp; Credits
                </h4>
              </div>
              <VrcLogo size="sm" />
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed pt-1">
              <p>
                <strong className="text-white">App Name:</strong> <span className="text-red-400 font-bold">VRC MACHINERIES</span>
              </p>
              <p>
                <strong className="text-white">Company:</strong> <span className="text-white font-bold">VRC Construction India Ltd</span>
              </p>
              <p>
                <strong className="text-white">Developed by:</strong> <span className="text-emerald-400 font-bold">Prince Pandey</span>
              </p>
              <p>
                <strong className="text-white">Instructed by:</strong> <span className="text-sky-300 font-bold">Mr. Anuj Kumar</span>
              </p>
              <p>
                <strong className="text-white">Under the guidance of:</strong> <span className="text-amber-300 font-bold">Hon. Mr. Dhruv Gupta and Mr. Kanishq Bansal</span>
              </p>
              <p>
                <strong className="text-white">Target Platform:</strong> Android APK / WebAPK (&lt; 30MB)
              </p>
              <p>
                <strong className="text-white">Cost:</strong> <span className="text-emerald-400 font-bold">100% Free, zero paid APIs or subscriptions</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Default Inspector Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={inspectorName}
                  onChange={e => setInspectorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Default Project / Site Location *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={siteProjectName}
                  onChange={e => setSiteProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Company / Organization Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={contractorName}
                  onChange={e => setContractorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                App Language / भाषा (Simple for Operators)
              </label>
              <select
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="en">English (Simple Terms)</option>
                <option value="hi">हिन्दी (Hindi - ऑपरेटर और हेल्पर)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>

            {/* Quick Sound Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2">
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                <div>
                  <p className="text-xs font-bold text-white">Audio &amp; Vibration Feedback</p>
                  <p className="text-[10px] text-slate-400">Beeps on OK, alarm siren on NOT OK</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  !isMuted ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {!isMuted ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Android APK install trigger */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">Android APK Installation</p>
                  <p className="text-[10px] text-slate-400">Install app or scan on phone</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenApkGuide();
                }}
                className="px-3 py-1 text-xs font-bold text-amber-400 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
              >
                Get APK
              </button>
            </div>

            {/* Reset Factory Demo Data */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset fleet and inspection data to VRC factory demo state?')) {
                    onResetData();
                    onClose();
                  }
                }}
                className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Sample Demo Data
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow transition"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
