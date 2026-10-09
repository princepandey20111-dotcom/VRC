import React from 'react';
import { 
  Printer, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Gauge, 
  User, 
  Wrench, 
  ShieldAlert,
  Award
} from 'lucide-react';
import { InspectionRecord, CATEGORY_LABELS } from '../types/inspection';
import { DEFAULT_CHECKLIST_ITEMS } from '../data/machineryData';
import { VrcLogo } from './VrcLogo';

interface InspectionReportViewProps {
  inspection: InspectionRecord;
  onClose: () => void;
}

export const InspectionReportView: React.FC<InspectionReportViewProps> = ({ inspection, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const isFailed = inspection.finalStatus === 'FAIL';
  const isAttention = inspection.finalStatus === 'NEEDS_ATTENTION';
  const isPass = inspection.finalStatus === 'PASS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-sm print:p-0 print:bg-white print:fixed-none">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Controls Bar (Hidden during printing) */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-black text-amber-400 text-xs uppercase tracking-wider">
              VRC MACHINERIES • Certified Daily Inspection Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Print-optimized) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 bg-slate-900 print:bg-white print:text-black print:p-4">
          
          {/* Header & Logo */}
          <div className="border-b-2 border-slate-700 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:border-black">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <VrcLogo size="sm" />
                <h1 className="text-xl font-black tracking-wider uppercase text-white print:text-black">
                  VRC MACHINERIES
                </h1>
              </div>
              <p className="text-xs text-slate-300 print:text-gray-700 font-semibold">
                DAILY MACHINE, VEHICLE & PLANT INSPECTION CERTIFICATE
              </p>
              <p className="text-[10px] text-slate-400 print:text-gray-600">
                Developed by Prince Pandey • Instructed by Mr. Anuj Kumar • Guidance: Hon. Mr. Dhruv Gupta &amp; Mr. Kanishq Bansal
              </p>
            </div>

            {/* Official Status Stamp */}
            <div className={`border-2 rounded-xl px-4 py-2 text-center uppercase tracking-widest font-black transform rotate-1 shadow-sm ${
              isPass
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40 print:border-emerald-700 print:text-emerald-700'
                : isAttention
                ? 'border-amber-500 text-amber-400 bg-amber-950/40 print:border-amber-700 print:text-amber-700'
                : 'border-rose-600 text-rose-500 bg-rose-950/40 print:border-red-700 print:text-red-700'
            }`}>
              <div className="text-[10px] tracking-normal font-sans text-slate-400 print:text-gray-500">
                FINAL STATUS
              </div>
              <div className="text-sm sm:text-base font-black">
                {isPass && 'PASS: SAFE FOR OPERATION'}
                {isAttention && 'NEEDS ATTENTION'}
                {isFailed && 'FAIL: STOP MACHINE!'}
              </div>
            </div>
          </div>

          {/* Machine & Site Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 print:border-gray-300 print:bg-gray-50 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">ID / Vehicle Number</span>
              <p className="font-mono font-bold text-sm text-amber-400 print:text-black">{inspection.identificationNumber}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Machine Name</span>
              <p className="font-bold text-white print:text-black truncate">{inspection.machineName}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Category</span>
              <p className="font-semibold text-white print:text-black">{CATEGORY_LABELS[inspection.category]}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Site / Project</span>
              <p className="font-medium text-slate-200 print:text-black truncate">{inspection.siteProjectName}</p>
            </div>
          </div>

          {/* Inspection Metadata Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-y border-slate-800 py-2.5 print:border-gray-300">
            <div>
              <span className="text-slate-400 print:text-gray-500">Date &amp; Time:</span>
              <p className="font-medium text-white print:text-black">{inspection.dateTimeDisplay}</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500">Driver / Operator:</span>
              <p className="font-medium text-white print:text-black">{inspection.driverOperatorName}</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500">Mechanic Name:</span>
              <p className="font-medium text-white print:text-black">{inspection.mechanicName || 'N/A'}</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500">Hours / Odometer:</span>
              <p className="font-medium text-white print:text-black">
                {inspection.operatingHoursOrKm !== undefined ? `${inspection.operatingHoursOrKm} hrs/km` : 'N/A'}
              </p>
            </div>
          </div>

          {/* CRITICAL STOP WARNING (if failed) */}
          {isFailed && (
            <div className="p-3 rounded-xl bg-rose-950/80 border-2 border-rose-600 text-rose-200 text-xs font-bold space-y-1 print:border-red-600 print:text-red-700">
              <div className="flex items-center gap-2 text-rose-300 print:text-red-700 uppercase">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>SAFETY DIRECTIVE: MACHINE IS GROUNDED &amp; STOPPED</span>
              </div>
              <p className="leading-relaxed">
                A critical safety check has failed. Under no circumstances may this machine be operated. Do not restart until a certified mechanic and project manager physically verify repairs and clear the machine.
              </p>
            </div>
          )}

          {/* Defect Description & Required Action (if any) */}
          {(inspection.problemDescription || inspection.defects.length > 0) && (
            <div className="p-4 rounded-xl border border-rose-900 bg-rose-950/20 print:border-gray-400 print:bg-gray-50 space-y-2 text-xs">
              <h3 className="font-bold text-rose-400 print:text-red-700 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Reported Defect &amp; Maintenance Action Required
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold">
                    Problem Description:
                  </span>
                  <p className="text-slate-200 print:text-black mt-0.5">
                    {inspection.problemDescription || 'Defects detected during pre-shift visual walkaround.'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 print:text-gray-600 uppercase font-bold">
                    Repair Action Required:
                  </span>
                  <p className="text-amber-300 print:text-black mt-0.5">
                    {inspection.repairActionRequired || inspection.actionTaken || 'Mechanic maintenance inspection and part replacement.'}
                  </p>
                </div>
              </div>

              {/* Photo Evidence (if attached) */}
              {(inspection.defectPhotoUrl || inspection.photoOfProblem) && (
                <div className="pt-2">
                  <p className="text-[10px] text-slate-400 print:text-gray-600 mb-1 font-bold">Defect Photo Documentation:</p>
                  <img
                    src={inspection.defectPhotoUrl || inspection.photoOfProblem}
                    alt="Defect"
                    className="h-36 rounded-lg object-cover border border-slate-700 print:border-gray-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Checklist Items Breakdown Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-black">
              Detailed Daily Checklist Evaluation
            </h3>

            <div className="border border-slate-800 rounded-xl overflow-hidden print:border-gray-300">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 print:bg-gray-100 print:text-gray-700">
                  <tr>
                    <th className="py-2 px-3">Item #</th>
                    <th className="py-2 px-3">Check Description</th>
                    <th className="py-2 px-3 text-center">Result</th>
                    <th className="py-2 px-3">Inspector Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-200">
                  {Object.entries(inspection.checklistResults).map(([itemId, res], idx) => {
                    const template = DEFAULT_CHECKLIST_ITEMS.find(c => c.id === itemId);
                    return (
                      <tr key={itemId} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-mono text-slate-400 print:text-gray-600">
                          #{idx + 1}
                        </td>
                        <td className="py-2 px-3 font-medium text-white print:text-black">
                          {template?.label || itemId}
                        </td>
                        <td className="py-2 px-3 text-center font-bold">
                          {res.status === 'OK' && (
                            <span className="text-emerald-400 print:text-emerald-700">OK</span>
                          )}
                          {res.status === 'NOT_OK' && (
                            <span className="text-rose-400 print:text-red-700">NOT OK</span>
                          )}
                          {res.status === 'NA' && (
                            <span className="text-slate-500">N/A</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-slate-300 print:text-gray-800">
                          {res.notes || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="pt-4 border-t border-slate-800 print:border-gray-300 grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 print:text-gray-600">
                Inspector Name &amp; Signature
              </span>
              {(inspection.inspectorSignature || inspection.operatorSignature) ? (
                <div className="h-16 bg-slate-900 border border-slate-700 rounded-lg p-1 flex items-center justify-center print:border-gray-400">
                  <img
                    src={inspection.inspectorSignature || inspection.operatorSignature}
                    alt="Inspector Signature"
                    className="max-h-full max-w-full object-contain filter invert print:filter-none"
                  />
                </div>
              ) : (
                <div className="h-16 border border-dashed border-slate-700 rounded-lg flex items-center justify-center text-xs text-slate-500">
                  Signed on mobile device
                </div>
              )}
              <p className="text-xs text-white print:text-black font-bold">
                {inspection.inspectorName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 print:text-gray-600">
                Authorized Plant / Site Incharge
              </span>
              <div className="h-16 border border-dashed border-slate-700 rounded-lg flex items-center justify-center text-xs text-slate-500 print:border-gray-300">
                VRC Verified
              </div>
              <p className="text-xs text-slate-400 print:text-gray-700">
                Project Safety &amp; Machinery Department
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-[10px] text-center text-slate-500 print:text-gray-500 pt-2 border-t border-slate-800 print:border-gray-300">
            VRC MACHINERIES Inspection Certificate • Free Android App Developed by Prince Pandey • Record ID: {inspection.id}
          </div>
        </div>
      </div>
    </div>
  );
};
