import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  QrCode, 
  MapPin, 
  Gauge, 
  ChevronRight,
  Flame,
  Building2,
  Factory,
  Zap,
  HardHat,
  Trash2,
  Droplets,
  RotateCcw,
  Layers,
  Sparkles,
  CheckSquare,
  ShieldAlert,
  Info,
  Calendar,
  PackageCheck,
  User,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { 
  Machine, 
  MachineCategory, 
  MachineOperationalStatus, 
  LanguageCode, 
  CATEGORY_LABELS 
} from '../types/inspection';
import { t } from '../utils/translations';
import { resetTo105MasterFleet } from '../utils/storage';

interface FleetListProps {
  fleet: Machine[];
  initialCategory?: MachineCategory | 'ALL';
  language: LanguageCode;
  onSelectForInspection: (machine: Machine) => void;
  onOpenQrScanner: () => void;
  onViewQrBadge: (machine: Machine) => void;
  onAddNewMachine: (machine: Omit<Machine, 'id' | 'qrCodeValue' | 'status'> & { status?: Machine['status'] }) => void;
  onDeleteMachine?: (machineId: string) => void;
}

export const FleetList: React.FC<FleetListProps> = ({
  fleet,
  initialCategory = 'ALL',
  language,
  onSelectForInspection,
  onOpenQrScanner,
  onViewQrBadge,
  onAddNewMachine,
  onDeleteMachine,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MachineCategory | 'ALL'>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<MachineOperationalStatus | 'ALL'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailMachine, setDetailMachine] = useState<Machine | null>(null);

  // New Machine Form State
  const [name, setName] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [category, setCategory] = useState<MachineCategory>('EARTHMOVING');
  const [modelMake, setModelMake] = useState('');
  const [capacityRating, setCapacityRating] = useState('');
  const [siteProjectName, setSiteProjectName] = useState('VRC Highway Expressway Project (Pkg-4)');
  const [driverOperatorName, setDriverOperatorName] = useState('');
  const [mechanicName, setMechanicName] = useState('Satish Sharma (P&M Engineer)');
  const [currentHoursOdometer, setCurrentHoursOdometer] = useState<number>(500);
  const [fuelOilStatus, setFuelOilStatus] = useState('Engine Oil: OK • Fuel: 85% • Hydraulic: Normal');
  const [status, setStatus] = useState<MachineOperationalStatus>('WORKING');

  const categoriesList: MachineCategory[] = [
    'EARTHMOVING',
    'VEHICLES_TRANSPORT',
    'LIFTING_HANDLING',
    'BOOM_LIFTS_ACCESS',
    'DG_POWER',
    'MAIN_PLANTS',
    'CONCRETE_ROAD',
    'WORKSHOP_FABRICATION',
    'PUMPS_UTILITY',
    'MATERIAL_REINFORCEMENT',
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !identificationNumber.trim()) return;

    onAddNewMachine({
      name: name.trim(),
      identificationNumber: identificationNumber.trim().toUpperCase(),
      category,
      modelMake: modelMake.trim() || undefined,
      capacityRating: capacityRating.trim() || undefined,
      siteProjectName: siteProjectName.trim(),
      driverOperatorName: driverOperatorName.trim() || undefined,
      mechanicName: mechanicName.trim() || undefined,
      currentHoursOdometer: currentHoursOdometer || 0,
      fuelOilStatus: fuelOilStatus.trim() || 'Engine Oil: OK • Fuel: Normal',
      status,
    });

    setShowAddModal(false);
    setName('');
    setIdentificationNumber('');
    setModelMake('');
    setCapacityRating('');
    setDriverOperatorName('');
    setCurrentHoursOdometer(500);
  };

  const handleResetCatalog = () => {
    if (confirm('Load/Reset full 105 P&M Machinery Master Register for VRC Construction India Ltd?')) {
      resetTo105MasterFleet();
      window.location.reload();
    }
  };

  const filteredFleet = fleet.filter(machine => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      machine.name.toLowerCase().includes(q) ||
      machine.identificationNumber.toLowerCase().includes(q) ||
      (machine.masterNumber && String(machine.masterNumber).includes(q)) ||
      (machine.modelMake && machine.modelMake.toLowerCase().includes(q)) ||
      (machine.capacityRating && machine.capacityRating.toLowerCase().includes(q)) ||
      (machine.driverOperatorName && machine.driverOperatorName.toLowerCase().includes(q)) ||
      machine.siteProjectName.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategory === 'ALL' ||
      machine.category === selectedCategory ||
      (selectedCategory === 'EARTHMOVING' && ['JCB_BACKHOE', 'LOADERS_EXCAVATORS', 'COMPACTORS_ROLLERS'].includes(machine.category)) ||
      (selectedCategory === 'VEHICLES_TRANSPORT' && machine.category === 'VEHICLES_TIPPERS') ||
      (selectedCategory === 'LIFTING_HANDLING' && machine.category === 'HYDRA_CRANES') ||
      (selectedCategory === 'DG_POWER' && machine.category === 'DG_SETS') ||
      (selectedCategory === 'MAIN_PLANTS' && ['HMP_PLANTS', 'RMC_PLANTS', 'WMM_PLANTS'].includes(machine.category)) ||
      (selectedCategory === 'PUMPS_UTILITY' && machine.category === 'PUMPS_OTHER');

    const matchesStatus =
      selectedStatus === 'ALL' ||
      machine.status === selectedStatus ||
      (selectedStatus === 'WORKING' && machine.status === 'PASSED') ||
      (selectedStatus === 'BREAKDOWN' && machine.status === 'FAILED_STOP');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryIcon = (cat: MachineCategory) => {
    switch (cat) {
      case 'EARTHMOVING':
      case 'LOADERS_EXCAVATORS':
      case 'JCB_BACKHOE':
      case 'COMPACTORS_ROLLERS':
        return <HardHat className="w-4 h-4 text-amber-400" />;
      case 'VEHICLES_TRANSPORT':
      case 'VEHICLES_TIPPERS':
        return <Truck className="w-4 h-4 text-sky-400" />;
      case 'LIFTING_HANDLING':
      case 'HYDRA_CRANES':
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      case 'BOOM_LIFTS_ACCESS':
        return <Layers className="w-4 h-4 text-purple-400" />;
      case 'DG_POWER':
      case 'DG_SETS':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'MAIN_PLANTS':
      case 'HMP_PLANTS':
      case 'RMC_PLANTS':
      case 'WMM_PLANTS':
        return <Factory className="w-4 h-4 text-rose-400" />;
      case 'CONCRETE_ROAD':
        return <Building2 className="w-4 h-4 text-teal-400" />;
      case 'WORKSHOP_FABRICATION':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'PUMPS_UTILITY':
      case 'PUMPS_OTHER':
        return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'MATERIAL_REINFORCEMENT':
        return <CheckSquare className="w-4 h-4 text-lime-400" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (machineStatus: MachineOperationalStatus) => {
    switch (machineStatus) {
      case 'WORKING':
      case 'PASSED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> WORKING
          </span>
        );
      case 'BREAKDOWN':
      case 'FAILED_STOP':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-white bg-rose-600 px-2.5 py-0.5 rounded-full shadow animate-pulse">
            <XCircle className="w-3 h-3" /> BREAKDOWN
          </span>
        );
      case 'UNDER_MAINTENANCE':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-700">
            <Wrench className="w-3 h-3 text-amber-400" /> UNDER MAINTENANCE
          </span>
        );
      case 'NEEDS_ATTENTION':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-700">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> NEEDS ATTENTION
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-800">
            <Clock className="w-3 h-3 text-sky-400" /> PENDING INSPECTION
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Fleet Controls Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3.5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                VRC P&amp;M MASTER
              </span>
              <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                105 Machinery &amp; Plant Fleet Register
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any machine below to start daily inspection (Simple OK / NOT OK buttons)
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleResetCatalog}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              title="Reset to 105 Standard Machines Master List"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset 105 Master</span>
            </button>
            <button
              onClick={onOpenQrScanner}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition active:scale-95"
            >
              <QrCode className="w-3.5 h-3.5" />
              {t('btnScanQr', language)}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Add Machine
            </button>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search #1-105, machine name (Excavator, JCB, DG Set...), reg number, capacity, site..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto text-xs">
            <button
              onClick={() => setSelectedStatus('ALL')}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                selectedStatus === 'ALL'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setSelectedStatus('WORKING')}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                selectedStatus === 'WORKING'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 text-emerald-400 border border-slate-800'
              }`}
            >
              Working
            </button>
            <button
              onClick={() => setSelectedStatus('BREAKDOWN')}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                selectedStatus === 'BREAKDOWN'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-950 text-rose-400 border border-slate-800'
              }`}
            >
              Breakdown
            </button>
            <button
              onClick={() => setSelectedStatus('UNDER_MAINTENANCE')}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                selectedStatus === 'UNDER_MAINTENANCE'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-950 text-amber-400 border border-slate-800'
              }`}
            >
              Maintenance
            </button>
          </div>
        </div>

        {/* 10 Category Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCategory === 'ALL'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All 10 Sections ({fleet.length})
          </button>
          {categoriesList.map(cat => {
            const count = fleet.filter(m => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{CATEGORY_LABELS[cat] || cat} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Machinery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredFleet.length === 0 ? (
          <div className="col-span-full text-center p-12 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <Truck className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-base font-bold text-white">No Machinery Found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your search query, or click &quot;Reset 105 Master&quot; to restore the full P&amp;M fleet register.
            </p>
            <button
              onClick={handleResetCatalog}
              className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
            >
              Reload 105 P&amp;M Machines
            </button>
          </div>
        ) : (
          filteredFleet.map(machine => {
            const isBreakdown = machine.status === 'BREAKDOWN' || machine.status === 'FAILED_STOP';

            return (
              <div
                key={machine.id}
                className={`rounded-2xl bg-slate-900 border overflow-hidden shadow-lg transition-all hover:border-red-500/80 flex flex-col justify-between ${
                  isBreakdown ? 'border-rose-600 ring-1 ring-rose-500 bg-rose-950/15' : 'border-slate-800'
                }`}
              >
                {/* Header */}
                <div className="p-3.5 pb-2 border-b border-slate-800 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {machine.masterNumber && (
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-red-600 text-white">
                          #{machine.masterNumber}
                        </span>
                      )}
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-700">
                        {machine.identificationNumber}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {CATEGORY_LABELS[machine.category] || machine.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {machine.name}
                    </h3>
                    {machine.capacityRating && (
                      <p className="text-xs text-amber-300 font-medium">
                        Capacity: <strong>{machine.capacityRating}</strong>
                      </p>
                    )}
                  </div>

                  <div className="shrink-0">
                    {getStatusBadge(machine.status)}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 space-y-2.5 text-xs flex-1">
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Make &amp; Model</span>
                      <p className="font-medium text-white truncate mt-0.5">
                        {machine.modelMake || 'Standard Industrial'}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Hour-meter / Km</span>
                      <p className="font-mono font-bold text-white flex items-center gap-1 mt-0.5">
                        <Gauge className="w-3.5 h-3.5 text-amber-400" />
                        {machine.currentHoursOdometer ? `${machine.currentHoursOdometer} hrs/km` : '0'}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" /> Project Site:
                    </span>
                    <span className="font-medium text-white text-[11px] truncate max-w-[200px]">
                      {machine.siteProjectName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>
                      Operator: <strong className="text-slate-200">{machine.driverOperatorName || 'Unassigned'}</strong>
                    </span>
                    {machine.mechanicName && (
                      <span>
                        Mechanic: <strong className="text-slate-200">{machine.mechanicName}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions: BIG BUTTON for Drivers & Mechanics */}
                <div className="p-3 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setDetailMachine(machine)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    title="View Machine History & Records"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onViewQrBadge(machine)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    title="Print Machine QR Tag"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  {/* Big Primary Inspection Button designed for unskilled labour */}
                  <button
                    onClick={() => onSelectForInspection(machine)}
                    className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-98 shadow-lg ${
                      isBreakdown
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>{isBreakdown ? 'Re-Inspect Stopped Machine' : 'Do Inspection (OK / NOT OK)'}</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  {onDeleteMachine && (
                    <button
                      onClick={() => {
                        if (confirm(`Remove machine #${machine.masterNumber || ''} ${machine.identificationNumber} (${machine.name}) from fleet?`)) {
                          onDeleteMachine(machine.id);
                        }
                      }}
                      className="p-2.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900 transition"
                      title="Delete Machine"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail / History Drawer Modal */}
      {detailMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-red-600 text-white">
                  #{detailMachine.masterNumber || 'P&M'}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {detailMachine.name} ({detailMachine.identificationNumber})
                </h3>
              </div>
              <button onClick={() => setDetailMachine(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Specification Plaque */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider">Equipment Specification</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <p><strong>Category:</strong> {CATEGORY_LABELS[detailMachine.category] || detailMachine.category}</p>
                  <p><strong>Make &amp; Model:</strong> {detailMachine.modelMake || 'N/A'}</p>
                  <p><strong>Capacity Rating:</strong> {detailMachine.capacityRating || 'Standard'}</p>
                  <p><strong>Site Location:</strong> {detailMachine.siteProjectName}</p>
                  <p><strong>Assigned Operator:</strong> {detailMachine.driverOperatorName || 'Unassigned'}</p>
                  <p><strong>Assigned Mechanic:</strong> {detailMachine.mechanicName || 'Satish Sharma'}</p>
                  <p><strong>Hour-meter / Km:</strong> {detailMachine.currentHoursOdometer} hrs</p>
                  <p><strong>Operating Status:</strong> {detailMachine.status}</p>
                </div>
                {detailMachine.fuelOilStatus && (
                  <p className="text-[11px] text-emerald-400 pt-1 border-t border-slate-800">
                    <strong>Fluids Status:</strong> {detailMachine.fuelOilStatus}
                  </p>
                )}
              </div>

              {/* Maintenance & Service History */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" /> Maintenance &amp; Service History
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {detailMachine.maintenanceHistory?.length || 0} Records
                  </span>
                </div>
                {detailMachine.maintenanceHistory && detailMachine.maintenanceHistory.length > 0 ? (
                  <div className="space-y-2">
                    {detailMachine.maintenanceHistory.map((srv, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="font-bold text-white">{srv.serviceType}</span>
                          <span className="text-[10px] text-slate-500">{new Date(srv.serviceDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">By: {srv.performedBy} • At {srv.hourMeterOrKm} hrs</p>
                        {srv.remarks && <p className="text-slate-300 text-[11px]">{srv.remarks}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No scheduled service logs recorded yet.</p>
                )}
              </div>

              {/* Breakdown & Repair Records */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Breakdown &amp; Repair Records
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {detailMachine.breakdownHistory?.length || 0} Breakdowns
                  </span>
                </div>
                {detailMachine.breakdownHistory && detailMachine.breakdownHistory.length > 0 ? (
                  <div className="space-y-2">
                    {detailMachine.breakdownHistory.map((brk, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-rose-900/40 space-y-1">
                        <div className="flex items-center justify-between text-rose-300">
                          <span className="font-bold">{brk.issue}</span>
                          <span className="text-[10px] text-slate-500">{new Date(brk.date).toLocaleDateString()}</span>
                        </div>
                        {brk.actionTaken && <p className="text-slate-300 text-[11px]">Action: {brk.actionTaken}</p>}
                        <p className="text-slate-400 text-[10px]">Mechanic: {brk.mechanicName} • Downtime: {brk.downtimeHours || 0} hrs</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No breakdowns reported. Equipment operating nominally.</p>
                )}
              </div>

              {/* Spare Parts Replacement History */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5" /> Spare Parts Replacement History
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {detailMachine.sparePartsHistory?.length || 0} Replacements
                  </span>
                </div>
                {detailMachine.sparePartsHistory && detailMachine.sparePartsHistory.length > 0 ? (
                  <div className="space-y-2">
                    {detailMachine.sparePartsHistory.map((sp, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="font-bold text-white">{sp.partName}</span>
                          <span className="text-[10px] text-slate-500">{new Date(sp.dateReplaced).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">Qty: {sp.quantity} • Fitted by: {sp.mechanicName}</p>
                        {sp.remarks && <p className="text-slate-300 text-[11px]">{sp.remarks}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No spare parts replacements logged.</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button
                onClick={() => {
                  const m = detailMachine;
                  setDetailMachine(null);
                  onSelectForInspection(m);
                }}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                Start Inspection Now
              </button>
              <button
                onClick={() => setDetailMachine(null)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Machine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Register New Machine in P&amp;M Master
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3.5 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Machine Type / Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hydraulic Crawler Excavator"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Machine Category (P&amp;M Section) *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as MachineCategory)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>
                        {CATEGORY_LABELS[cat] || cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Machine ID / Vehicle Reg. No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VRC-EXC-02"
                    value={identificationNumber}
                    onChange={e => setIdentificationNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Make and Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tata Hitachi EX200"
                    value={modelMake}
                    onChange={e => setModelMake(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Capacity / Tonnage / kVA / Reach
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 20 Ton / 125 kVA / 60 ft"
                    value={capacityRating}
                    onChange={e => setCapacityRating(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Project Site Location *
                </label>
                <input
                  type="text"
                  required
                  value={siteProjectName}
                  onChange={e => setSiteProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Driver / Operator Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rameshwar Yadav"
                    value={driverOperatorName}
                    onChange={e => setDriverOperatorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Assigned Mechanic Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Satish Sharma"
                    value={mechanicName}
                    onChange={e => setMechanicName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Hour Meter / Odometer
                  </label>
                  <input
                    type="number"
                    value={currentHoursOdometer}
                    onChange={e => setCurrentHoursOdometer(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Initial Status
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as MachineOperationalStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="WORKING">Working (Safe)</option>
                    <option value="PENDING">Pending Inspection</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                    <option value="BREAKDOWN">Breakdown (Stopped)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Fuel &amp; Oil Checks Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Engine Oil: Normal • Fuel: 80% • Hydraulic: Good"
                  value={fuelOilStatus}
                  onChange={e => setFuelOilStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow"
                >
                  Save in Fleet Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
