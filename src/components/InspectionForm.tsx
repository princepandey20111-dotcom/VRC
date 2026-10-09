import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Camera, 
  ArrowLeft, 
  Check, 
  ShieldAlert, 
  Send, 
  AlertTriangle,
  User,
  Wrench,
  MapPin,
  Calendar,
  Clock,
  Gauge,
  Sparkles
} from 'lucide-react';
import { 
  Machine, 
  ChecklistItem, 
  CheckOption, 
  InspectionItemResult, 
  DefectRecord, 
  InspectionRecord, 
  FinalInspectionStatus,
  ShiftType,
  LanguageCode
} from '../types/inspection';
import { SignaturePad } from './SignaturePad';
import { PhotoCaptureModal } from './PhotoCaptureModal';
import { soundFx } from '../utils/audio';
import { t } from '../utils/translations';

interface InspectionFormProps {
  machine: Machine;
  checklistItems: ChecklistItem[];
  defaultInspectorName: string;
  defaultSiteProjectName: string;
  language: LanguageCode;
  onBack: () => void;
  onSubmitInspection: (record: InspectionRecord) => void;
}

export const InspectionForm: React.FC<InspectionFormProps> = ({
  machine,
  checklistItems,
  defaultInspectorName,
  defaultSiteProjectName,
  language,
  onBack,
  onSubmitInspection,
}) => {
  // Required Form Fields
  const [siteProjectName, setSiteProjectName] = useState(machine.siteProjectName || defaultSiteProjectName);
  const [driverOperatorName, setDriverOperatorName] = useState(machine.driverOperatorName || '');
  const [mechanicName, setMechanicName] = useState(machine.mechanicName || '');
  const [operatingHoursKm, setOperatingHoursKm] = useState<number>(machine.currentHoursOdometer || 0);
  const [shift, setShift] = useState<ShiftType>('DAY_SHIFT');
  const [inspectorName, setInspectorName] = useState(defaultInspectorName || 'Prince Pandey');
  const [supervisorName, setSupervisorName] = useState('Anuj Kumar (Site Supervisor)');

  // Problem description & photo
  const [problemDescription, setProblemDescription] = useState('');
  const [photoOfProblem, setPhotoOfProblem] = useState<string | null>(null);
  const [actionTaken, setActionTaken] = useState('');
  const [remarks, setRemarks] = useState('');

  // Signatures
  const [operatorSignature, setOperatorSignature] = useState<string>('');
  const [supervisorSignature, setSupervisorSignature] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Photo modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoItemLabel, setPhotoItemLabel] = useState('');

  // Filter checklist items relevant only for this machine's category
  const relevantItems = checklistItems.filter(item =>
    item.categories.includes(machine.category)
  );

  /**
   * CRITICAL SPEC RULE: "Never mark an inspection item as OK automatically."
   * Initial status for each item is null (Unchecked/Pending).
   */
  const [results, setResults] = useState<Record<string, InspectionItemResult>>(() => {
    const initial: Record<string, InspectionItemResult> = {};
    relevantItems.forEach(i => {
      initial[i.id] = { itemId: i.id, status: null };
    });
    return initial;
  });

  const handleSetStatus = (itemId: string, status: CheckOption, isCritical: boolean, label: string) => {
    if (status === 'OK') {
      soundFx.pass();
    } else if (status === 'NOT_OK') {
      if (isCritical) {
        soundFx.dangerAlarm();
      } else {
        soundFx.warn();
      }
      setPhotoItemLabel(label);
    } else {
      soundFx.click();
    }

    setResults(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        itemId,
        status,
      },
    }));
  };

  const handleSetNote = (itemId: string, notes: string) => {
    setResults(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        notes,
      },
    }));
  };

  // Evaluate status
  let hasCriticalFail = false;
  let hasNonCriticalFail = false;
  let hasUnanswered = false;
  const notOkItems: ChecklistItem[] = [];

  relevantItems.forEach(item => {
    const res = results[item.id]?.status;
    if (res === null) {
      hasUnanswered = true;
    } else if (res === 'NOT_OK') {
      notOkItems.push(item);
      if (item.isCritical) {
        hasCriticalFail = true;
      } else {
        hasNonCriticalFail = true;
      }
    }
  });

  const finalStatus: FinalInspectionStatus = hasCriticalFail
    ? 'FAIL'
    : hasNonCriticalFail
    ? 'NEEDS_ATTENTION'
    : 'PASS';

  // Counts
  const totalCount = relevantItems.length;
  const okCount = Object.values(results).filter(r => r.status === 'OK').length;
  const notOkCount = Object.values(results).filter(r => r.status === 'NOT_OK').length;
  const naCount = Object.values(results).filter(r => r.status === 'NA').length;
  const answeredCount = okCount + notOkCount + naCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Rule: all items must be actively checked
    if (hasUnanswered) {
      setFormError(t('mustSelectAll', language));
      return;
    }

    if (!driverOperatorName.trim()) {
      setFormError('Please enter Driver / Operator Name.');
      return;
    }

    if (!operatorSignature) {
      setFormError('Operator / Driver digital signature is required.');
      return;
    }

    if (notOkItems.length > 0 && !problemDescription.trim()) {
      setFormError('Please enter problem description for the NOT OK defect(s).');
      return;
    }

    // Prepare defects list
    const defects: DefectRecord[] = notOkItems.map((item, idx) => ({
      id: `def-${Date.now()}-${idx}`,
      inspectionId: `insp-${Date.now()}`,
      machineId: machine.id,
      machineName: machine.name,
      identificationNumber: machine.identificationNumber,
      category: machine.category,
      siteProjectName: siteProjectName.trim(),
      checkItemLabel: item.label,
      isCritical: item.isCritical,
      priority: item.isCritical ? 'CRITICAL' : 'MEDIUM',
      problemDescription: results[item.id]?.notes || problemDescription || `${item.label} failed daily inspection.`,
      photoUrl: photoOfProblem || undefined,
      reportingPerson: driverOperatorName.trim(),
      dateReported: new Date().toISOString(),
      assignedMechanic: mechanicName.trim() || undefined,
      repairStatus: 'PENDING',
      repairRemarks: actionTaken.trim() || undefined,
    }));

    const inspectionRecord: InspectionRecord = {
      id: `insp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      dateTimeDisplay: new Date().toLocaleString(),
      timestamp: Date.now(),
      siteProjectName: siteProjectName.trim(),
      category: machine.category,
      machineId: machine.id,
      machineName: machine.name,
      identificationNumber: machine.identificationNumber,
      driverOperatorName: driverOperatorName.trim(),
      mechanicName: mechanicName.trim() || undefined,
      inspectorName: inspectorName.trim(),
      shift,
      operatingHoursOrKm: operatingHoursKm,
      checklistResults: results,
      problemDescription: problemDescription.trim() || undefined,
      photoOfProblem: photoOfProblem || undefined,
      actionTaken: actionTaken.trim() || undefined,
      remarks: remarks.trim() || undefined,
      operatorSignature,
      supervisorSignature: supervisorSignature || undefined,
      supervisorName: supervisorName.trim() || undefined,
      finalStatus,
      hasCriticalDefect: hasCriticalFail,
      warningNotice: hasCriticalFail ? t('criticalWarning', language) : undefined,
      defects,
    };

    onSubmitInspection(inspectionRecord);
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-200">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('btnCancel', language)}
        </button>

        <div className="text-center sm:text-right">
          <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-700">
            {machine.identificationNumber}
          </span>
          <p className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[300px]">
            {machine.name}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="text-xs font-bold font-mono text-amber-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          {answeredCount} / {totalCount} Checked
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Machine & Shift Metadata Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-4 shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {t(machine.category, language)}
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white mt-1">
                {machine.name} ({machine.identificationNumber})
              </h2>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {new Date().toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            
            {/* Project / Site Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldSite', language)} *
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

            {/* Driver / Operator Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldDriver', language)} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Yadav"
                  value={driverOperatorName}
                  onChange={e => setDriverOperatorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Mechanic Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldMechanic', language)}
              </label>
              <div className="relative">
                <Wrench className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Satish Sharma"
                  value={mechanicName}
                  onChange={e => setMechanicName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Hour-meter / Kilometre Reading */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldHourMeter', language)} *
              </label>
              <div className="relative">
                <Gauge className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="number"
                  step="0.1"
                  required
                  value={operatingHoursKm}
                  onChange={e => setOperatingHoursKm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Shift Picker */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldShift', language)} *
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setShift('DAY_SHIFT')}
                  className={`py-1.5 rounded-lg font-bold transition ${
                    shift === 'DAY_SHIFT' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  Day
                </button>
                <button
                  type="button"
                  onClick={() => setShift('NIGHT_SHIFT')}
                  className={`py-1.5 rounded-lg font-bold transition ${
                    shift === 'NIGHT_SHIFT' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  Night
                </button>
                <button
                  type="button"
                  onClick={() => setShift('GENERAL_SHIFT')}
                  className={`py-1.5 rounded-lg font-bold transition ${
                    shift === 'GENERAL_SHIFT' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  General
                </button>
              </div>
            </div>

            {/* Inspector Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Inspector / Supervisor Name *
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
          </div>
        </div>

        {/* Live Status Warning Banner */}
        <div className={`p-4 rounded-2xl border-2 shadow-lg transition-all ${
          finalStatus === 'FAIL'
            ? 'bg-rose-950/90 border-rose-600 text-rose-200'
            : finalStatus === 'NEEDS_ATTENTION'
            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {finalStatus === 'FAIL' && <XCircle className="w-8 h-8 text-rose-400 shrink-0 animate-pulse" />}
              {finalStatus === 'NEEDS_ATTENTION' && <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />}
              {finalStatus === 'PASS' && <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />}

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                  SAFETY EVALUATION RESULT:
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white">
                  {finalStatus === 'FAIL' && t('statusFail', language)}
                  {finalStatus === 'NEEDS_ATTENTION' && t('statusAttention', language)}
                  {finalStatus === 'PASS' && t('statusPass', language)}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300">
                {okCount} OK
              </span>
              {notOkCount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-950 border border-rose-700 text-rose-300">
                  {notOkCount} NOT OK
                </span>
              )}
              {naCount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400">
                  {naCount} N/A
                </span>
              )}
            </div>
          </div>

          {/* CRITICAL STOP SAFETY WARNING (Mandated by Spec) */}
          {finalStatus === 'FAIL' && (
            <div className="mt-3 pt-3 border-t border-rose-800 text-xs font-bold text-white flex items-start gap-2 bg-rose-900/50 p-2.5 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-300 shrink-0" />
              <p>{t('criticalWarning', language)}</p>
            </div>
          )}
        </div>

        {/* Inspection Checklist Items (RULE: Never marked as OK automatically) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Inspection Checklist ({relevantItems.length} Points)
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold">
              * Tap OK, NOT OK or N/A on each item
            </span>
          </div>

          <div className="space-y-2.5">
            {relevantItems.map((item, index) => {
              const currentStatus = results[item.id]?.status;
              const isNotOk = currentStatus === 'NOT_OK';
              const isUnchecked = currentStatus === null;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    currentStatus === 'NOT_OK'
                      ? item.isCritical
                        ? 'bg-rose-950/40 border-rose-600 shadow-md ring-1 ring-rose-500'
                        : 'bg-amber-950/30 border-amber-600 shadow-md'
                      : currentStatus === 'OK'
                      ? 'bg-slate-900/90 border-slate-800'
                      : currentStatus === 'NA'
                      ? 'bg-slate-950/50 border-slate-900'
                      : 'bg-slate-900/50 border-amber-500/30' // Highlight unchecked items
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    
                    {/* Item Information */}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          #{index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {item.label}
                        </h4>
                        {item.isCritical && (
                          <span className="text-[10px] font-black text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                            CRITICAL
                          </span>
                        )}
                        {isUnchecked && (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 animate-pulse">
                            Action Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Three Big Mobile Buttons: OK, NOT OK, N/A */}
                    <div className="grid grid-cols-3 gap-2 self-stretch md:self-auto shrink-0 md:w-80">
                      
                      {/* OK Button */}
                      <button
                        type="button"
                        onClick={() => handleSetStatus(item.id, 'OK', item.isCritical, item.label)}
                        className={`py-3 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 ${
                          currentStatus === 'OK'
                            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {t('btnOk', language)}
                      </button>

                      {/* NOT OK Button */}
                      <button
                        type="button"
                        onClick={() => handleSetStatus(item.id, 'NOT_OK', item.isCritical, item.label)}
                        className={`py-3 px-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 ${
                          currentStatus === 'NOT_OK'
                            ? item.isCritical
                              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400 animate-pulse'
                              : 'bg-amber-500 text-slate-950 shadow-lg ring-2 ring-amber-400'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        {t('btnNotOk', language)}
                      </button>

                      {/* N/A Button */}
                      <button
                        type="button"
                        onClick={() => handleSetStatus(item.id, 'NA', item.isCritical, item.label)}
                        className={`py-3 px-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition active:scale-95 ${
                          currentStatus === 'NA'
                            ? 'bg-slate-400 text-slate-950 ring-2 ring-slate-300'
                            : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                        {t('btnNa', language)}
                      </button>
                    </div>
                  </div>

                  {/* Defect note inline drawer if NOT OK */}
                  {isNotOk && (
                    <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          Describe problem for {item.label}:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoItemLabel(item.label);
                            setIsPhotoModalOpen(true);
                          }}
                          className="text-xs text-amber-400 font-bold flex items-center gap-1 hover:underline"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Attach Photo
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="e.g. Ruptured hose, loose wheel nut, oil leak, abnormal grinding noise..."
                        value={results[item.id]?.notes || ''}
                        onChange={e => handleSetNote(item.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Problem Description, Action Taken, Remarks & Photo Upload */}
        {notOkItems.length > 0 && (
          <div className="rounded-2xl bg-slate-900 border-2 border-rose-800 p-4 space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Problem Description &amp; Maintenance Details
              </h3>
              <span className="text-xs font-bold text-white bg-rose-600 px-2 py-0.5 rounded">
                {notOkItems.length} Defect(s) Reported
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldProblem', language)} *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Describe exact defect location, leakage, sounds, or visual damage..."
                value={problemDescription}
                onChange={e => setProblemDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldAction', language)}
              </label>
              <input
                type="text"
                placeholder="e.g. Engine switched off, mechanic called, machine tagged out..."
                value={actionTaken}
                onChange={e => setActionTaken(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                {t('fieldRemarks', language)}
              </label>
              <input
                type="text"
                placeholder="General shift remarks, weather condition, ground status..."
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Photo of the Problem */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase block">
                {t('fieldPhoto', language)}
              </label>

              {photoOfProblem ? (
                <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <img
                    src={photoOfProblem}
                    alt="Problem"
                    className="w-16 h-16 rounded-xl object-cover border border-amber-400"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-emerald-400">Photo Attached</p>
                    <p className="text-[10px] text-slate-400">Saved with inspection log</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="px-3 py-1.5 text-xs font-bold text-amber-400 bg-slate-800 rounded-lg hover:bg-slate-700"
                  >
                    Retake / Change
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl border border-dashed border-amber-500/50 flex items-center justify-center gap-2 transition"
                >
                  <Camera className="w-4 h-4" />
                  Capture / Upload Defect Photo (Camera / Gallery)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Verification & Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Operator Verification */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow">
            <SignaturePad
              label="Operator / Driver Verification & Signature *"
              inspectorName={driverOperatorName || 'Driver'}
              badgeNumber={machine.identificationNumber}
              onSave={sig => setOperatorSignature(sig)}
              required
            />
          </div>

          {/* Supervisor Verification */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow space-y-2">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Supervisor Name (Verification)
              </label>
              <input
                type="text"
                value={supervisorName}
                onChange={e => setSupervisorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-400 mb-2"
              />
            </div>
            <SignaturePad
              label="Supervisor Verification Signature"
              inspectorName={supervisorName}
              badgeNumber="SITE-SUP"
              onSave={sig => setSupervisorSignature(sig)}
              required={false}
            />
          </div>
        </div>

        {/* Error Alert */}
        {formError && (
          <div className="p-3.5 rounded-xl bg-rose-950 border border-rose-600 text-rose-200 text-xs font-bold flex items-center gap-2 animate-bounce">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
          >
            {t('btnCancel', language)}
          </button>

          <button
            type="submit"
            className={`w-full sm:flex-1 py-4 px-6 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition active:scale-98 ${
              finalStatus === 'FAIL'
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            <Send className="w-4 h-4" />
            {t('btnSubmit', language)} ({finalStatus})
          </button>
        </div>
      </form>

      {/* Photo Capture Modal */}
      {isPhotoModalOpen && (
        <PhotoCaptureModal
          isOpen={isPhotoModalOpen}
          itemName={photoItemLabel || machine.name}
          onClose={() => setIsPhotoModalOpen(false)}
          onPhotoCaptured={url => {
            setPhotoOfProblem(url);
            setIsPhotoModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
