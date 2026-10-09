import React from 'react';
import { QrCode, Printer, X, HardHat, ShieldCheck, Download } from 'lucide-react';
import { Machine } from '../types/inspection';

interface AssetQrBadgeModalProps {
  machine: Machine | null;
  onClose: () => void;
}

export const AssetQrBadgeModal: React.FC<AssetQrBadgeModalProps> = ({ machine, onClose }) => {
  if (!machine) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    machine.qrCodeValue
  )}&bgcolor=ffffff&color=090d16`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm print:p-0 print:bg-white print:fixed-none">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Controls (Hidden during print) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Machinery Asset Tag Sticker
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Printable Metal Plate / Tag */}
        <div className="p-6 text-center space-y-4 bg-slate-950 print:bg-white print:p-4">
          
          {/* Official VRC Tag Header */}
          <div className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 py-1.5 px-3 rounded-xl print:border-black">
            <div className="h-6 px-2 bg-white text-red-600 border border-red-600 rounded font-black text-xs flex items-center justify-center">
              VRC
            </div>
            <span className="text-xs font-black text-white print:text-black uppercase tracking-wider">
              MACHINERIES • P&amp;M ASSET TAG
            </span>
          </div>

          {/* Machine Header */}
          <div className="space-y-0.5">
            <h2 className="font-mono text-2xl font-black text-white tracking-widest print:text-black">
              {machine.identificationNumber}
            </h2>
            <p className="text-xs font-bold text-amber-400 print:text-gray-800">
              {machine.name}
            </p>
            <p className="text-[10px] text-slate-400 print:text-gray-600">
              {machine.modelMake || machine.category} • Site: {machine.siteProjectName}
            </p>
          </div>

          {/* QR Code */}
          <div className="mx-auto w-44 h-44 bg-white p-3 rounded-2xl border-2 border-amber-400/80 shadow-md flex items-center justify-center">
            <img src={qrImageUrl} alt={machine.identificationNumber} className="w-full h-full object-contain" />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-300 print:border-gray-300 print:bg-gray-50 print:text-gray-700 leading-tight space-y-1">
            <p className="font-bold text-amber-400 print:text-black uppercase">
              SCAN WITH VRC MACHINERIES APK BEFORE OPERATION
            </p>
            <p>
              Daily machine inspection is mandatory. Developed by Prince Pandey.
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Tag Sticker
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
