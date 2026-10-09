import React, { useState } from 'react';
import { QrCode, X, Check, Search, Truck, Zap, HardHat, Camera } from 'lucide-react';
import { Machine } from '../types/inspection';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMachineSelected: (machine: Machine) => void;
  fleet: Machine[];
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onMachineSelected,
  fleet,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanningSim, setIsScanningSim] = useState(true);

  if (!isOpen) return null;

  const filteredFleet = fleet.filter(
    m =>
      m.identificationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.siteProjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (machine: Machine) => {
    onMachineSelected(machine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Asset QR / Barcode Scanner</h3>
              <p className="text-[11px] text-slate-400">Scan physical asset tag or select equipment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Simulated Scanner Viewfinder */}
          {isScanningSim ? (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-dashed border-amber-500/50 p-6 flex flex-col items-center justify-center min-h-[190px] text-center">
                {/* Scanning Laser Animation */}
                <div className="absolute inset-x-8 top-10 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] animate-pulse" />

                <div className="w-32 h-32 border-2 border-amber-400 rounded-xl relative flex items-center justify-center bg-slate-900/60 p-2">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-300" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-300" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-300" />
                  <QrCode className="w-20 h-20 text-slate-400/80 animate-pulse" />
                </div>

                <p className="mt-3 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  Point Phone Camera at Equipment Asset Plate
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Or tap any equipment from the fleet list below to simulate instant QR scan:
                </p>
              </div>
            </div>
          ) : null}

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search vehicle number (e.g. HR-55), machine, or site..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Fleet Scannables */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Plant & Machinery ({filteredFleet.length})
            </p>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredFleet.map(machine => (
                <div
                  key={machine.id}
                  onClick={() => handleSelect(machine)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-800/60 hover:bg-slate-800 hover:border-amber-400 cursor-pointer transition active:scale-99"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-xs text-amber-400">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-amber-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {machine.identificationNumber}
                        </span>
                        <span className="text-xs font-semibold text-white truncate max-w-[170px]">
                          {machine.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{machine.siteProjectName}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-amber-400 font-semibold px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20">
                    Inspect →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
