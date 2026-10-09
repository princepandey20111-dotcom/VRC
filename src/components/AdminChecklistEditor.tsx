import React, { useState } from 'react';
import { ChecklistItem, MachineCategory, CATEGORY_LABELS } from '../types/inspection';
import { Plus, Edit2, Trash2, Check, X, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';

interface AdminChecklistEditorProps {
  items: ChecklistItem[];
  onAddItem: (item: Omit<ChecklistItem, 'id'>) => void;
  onUpdateItem: (item: ChecklistItem) => void;
  onDeleteItem: (itemId: string) => void;
  onResetDefaults: () => void;
  onBack: () => void;
}

export const AdminChecklistEditor: React.FC<AdminChecklistEditorProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onResetDefaults,
  onBack,
}) => {
  const [filterCategory, setFilterCategory] = useState<MachineCategory | 'ALL'>('ALL');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);

  // Form State
  const [newLabel, setNewLabel] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIsCritical, setNewIsCritical] = useState(true);
  const [newCategories, setNewCategories] = useState<MachineCategory[]>([
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
  ]);

  const allCategories: MachineCategory[] = [
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

  const handleToggleCategory = (cat: MachineCategory) => {
    if (newCategories.includes(cat)) {
      if (newCategories.length > 1) {
        setNewCategories(newCategories.filter(c => c !== cat));
      }
    } else {
      setNewCategories([...newCategories, cat]);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    onAddItem({
      label: newLabel.trim(),
      description: newDesc.trim() || 'Visual and operational check as per standard SOP.',
      isCritical: newIsCritical,
      categories: newCategories,
    });

    setNewLabel('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.label.trim()) return;

    onUpdateItem(editingItem);
    setEditingItem(null);
  };

  const filteredItems = items.filter(item => {
    if (filterCategory === 'ALL') return true;
    return item.categories.includes(filterCategory);
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                ADMINISTRATION
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Edit & Configure Inspection Checklists
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize daily check points for Vehicles, HMP Plant, RMC Plant, WMM Plant, and Heavy Equipment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdding(true)}
              className="py-2 px-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              Add Check Point
            </button>
            <button
              onClick={onBack}
              className="py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700"
            >
              Back
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
              filterCategory === 'ALL'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Checkpoints ({items.length})
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Checkpoint Form Drawer */}
      {isAdding && (
        <form
          onSubmit={handleCreateSubmit}
          className="rounded-2xl bg-slate-900 border-2 border-amber-500/80 p-4 space-y-3.5 shadow-xl animate-in slide-in-from-top-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              New Inspection Checkpoint
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Check Item Title / Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bitumen spray bar heating jacket temperature & nozzles"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Inspection Description & What to Check
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Verify heating oil circulation pressure, check all 16 spray nozzles free of clogged asphalt."
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Critical Safety Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Critical Safety Check (Stops Machine if NOT OK)
              </p>
              <p className="text-[10px] text-slate-400">
                If marked critical, any NOT OK will immediately mark the machine as FAIL (STOP MACHINE).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNewIsCritical(!newIsCritical)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                newIsCritical ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {newIsCritical ? 'CRITICAL' : 'ROUTINE'}
            </button>
          </div>

          {/* Applicable Categories */}
          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1.5">
              Applicable To Machine Categories:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allCategories.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleToggleCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    newCategories.includes(cat)
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              Save New Checkpoint
            </button>
          </div>
        </form>
      )}

      {/* Editing Existing Item Drawer */}
      {editingItem && (
        <form
          onSubmit={handleEditSubmit}
          className="rounded-2xl bg-slate-900 border-2 border-sky-500/80 p-4 space-y-3.5 shadow-xl animate-in slide-in-from-top-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-sky-400" />
              Edit Inspection Checkpoint
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Check Item Title *
            </label>
            <input
              type="text"
              required
              value={editingItem.label}
              onChange={e => setEditingItem({ ...editingItem, label: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Inspection Description
            </label>
            <textarea
              rows={2}
              value={editingItem.description}
              onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Critical Safety Check
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditingItem({ ...editingItem, isCritical: !editingItem.isCritical })}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                editingItem.isCritical ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {editingItem.isCritical ? 'CRITICAL' : 'ROUTINE'}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              Update Checkpoint
            </button>
          </div>
        </form>
      )}

      {/* Checkpoints List */}
      <div className="space-y-2">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  #{index + 1}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {item.label}
                </h4>
                {item.isCritical ? (
                  <span className="text-[10px] font-black text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    CRITICAL (STOP IF NOT OK)
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    ROUTINE CHECK
                  </span>
                )}
                {item.isCustom && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                    CUSTOM
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {item.categories.map(c => (
                  <span
                    key={c}
                    className="text-[9px] font-medium text-slate-400 bg-slate-950/80 px-1.5 py-0.5 rounded"
                  >
                    {CATEGORY_LABELS[c]}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Edit checkpoint"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              {item.isCustom && (
                <button
                  onClick={() => {
                    if (confirm(`Delete custom check "${item.label}"?`)) {
                      onDeleteItem(item.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800 transition"
                  title="Delete checkpoint"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Reset */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span>VRC MACHINERIES Inspection Standards (OSHA / ISO)</span>
        <button
          onClick={() => {
            if (confirm('Reset all inspection checklist items to standard VRC plant defaults?')) {
              onResetDefaults();
            }
          }}
          className="text-slate-400 hover:text-amber-400 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Standard Checkpoints
        </button>
      </div>
    </div>
  );
};
