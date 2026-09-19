import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Sprout,
  Calendar,
  Layers,
  Droplets,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const MyFarmAndCalendar = () => {
  const { farmerProfile, setFarmerProfile, currentUser, cropCalendars, t } = useAgriStore();

  const [selectedCropCalendar, setSelectedCropCalendar] = useState('Cotton');
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newCropAcres, setNewCropAcres] = useState(1);
  const [newCropSowingDate, setNewCropSowingDate] = useState('2026-09-20');
  const [completedTasks, setCompletedTasks] = useState({});

  const profile = farmerProfile || {
    name: currentUser?.name || 'Farmer',
    village: currentUser?.village || 'Local Village',
    district: currentUser?.district || 'Jalgaon',
    state: 'Maharashtra',
    totalLandAcres: currentUser?.totalLandAcres || 0,
    soilType: currentUser?.soilType || 'Black Cotton Soil (काळी माती)',
    irrigationType: currentUser?.irrigationType || 'Drip & Borewell (ठिबक)',
    currentCrops: []
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const newCrop = {
      id: `crop-${Date.now()}`,
      name: newCropName,
      acres: Number(newCropAcres),
      sowingDate: newCropSowingDate,
      expectedHarvest: 'In 120 Days',
      stage: 'Germination & Early Vegetative',
      healthStatus: 'Good',
      waterNeeds: 'Moderate'
    };

    setFarmerProfile(prev => ({
      ...(prev || profile),
      currentCrops: [...((prev || profile).currentCrops || []), newCrop]
    }));

    setShowAddCropModal(false);
    setNewCropName('');
  };

  const calendarStages = cropCalendars[selectedCropCalendar] || cropCalendars['Cotton'];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-green-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            🌾 Farm Digital Twin & Smart Crop Calendar
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Farm Land & Crop Lifecycle Timeline
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Track your farm acreage, soil characteristics, and follow chronological growth stages with step-by-step checklists to maximize harvest yields.
          </p>
        </div>
        <Layers className="absolute -right-6 -bottom-6 w-48 h-48 text-emerald-600/20 pointer-events-none" />
      </div>

      {/* Farm Profile Information Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Digital Land Record</span>
            <h3 className="text-lg font-bold text-stone-900">{profile.name}'s Farm Holding</h3>
          </div>

          <button
            onClick={() => setShowAddCropModal(true)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Crop Cultivation</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <span className="text-stone-400 block mb-1 font-medium">Total Land Size</span>
            <span className="text-xl font-bold text-stone-900 font-serif">
              {profile.totalLandAcres > 0 ? `${profile.totalLandAcres} Acres` : '0 Acres'}
            </span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <span className="text-stone-400 block mb-1 font-medium">Village & Location</span>
            <span className="text-sm font-bold text-stone-900">{profile.village}, {profile.district}</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <span className="text-stone-400 block mb-1 font-medium">Soil Classification</span>
            <span className="text-sm font-bold text-stone-900">{profile.soilType}</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <span className="text-stone-400 block mb-1 font-medium">Irrigation Infrastructure</span>
            <span className="text-sm font-bold text-stone-900">{profile.irrigationType}</span>
          </div>
        </div>

        {/* Current Active Crops */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-3">
            Currently Cultivated Crops ({profile.currentCrops.length})
          </h4>
          {profile.currentCrops.length === 0 ? (
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
              <Sprout className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-xs text-stone-600 font-medium">No crops added to your farm profile yet.</p>
              <button
                onClick={() => setShowAddCropModal(true)}
                className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold shadow"
              >
                + Add Crop (फसल जोड़ें)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.currentCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200/80 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-emerald-950">{crop.name}</span>
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {crop.acres} Acres
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-1">
                      Current Stage: <strong className="text-emerald-800">{crop.stage}</strong>
                    </p>

                    <div className="mt-2 text-[11px] text-stone-500 space-y-0.5">
                      <p>📅 Sowing: {crop.sowingDate} • Expected Harvest: {crop.expectedHarvest}</p>
                      <p>💧 Water Schedule: {crop.waterNeeds}</p>
                    </div>
                  </div>

                  <span className="bg-white text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm shrink-0">
                    Healthy
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Crop Activity & Farming Calendar Timeline */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              Interactive Crop Growth Timeline
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Chronological farming activities, critical irrigation milestones, and pest precautions.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
            {['Cotton', 'Wheat'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCropCalendar(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCropCalendar === c
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {c} Timeline
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Visual Flow */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
          {calendarStages.map((stage, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-6 sm:-left-8 top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md border-2 border-white">
                {idx + 1}
              </div>

              <div className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{stage.icon}</span>
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      {stage.stage}
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {stage.days}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">
                    Action Checklist:
                  </span>
                  {stage.tasks.map((task, tIdx) => {
                    const taskId = `${selectedCropCalendar}-${idx}-${tIdx}`;
                    const isDone = !!completedTasks[taskId];
                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleTask(taskId)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2.5 transition ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-70'
                            : 'bg-white border-stone-200 text-stone-800 hover:border-emerald-300'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${isDone ? 'text-emerald-600' : 'text-stone-300'}`}
                        />
                        <span>{task}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Agronomic Precaution:</strong> {stage.caution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Crop Modal */}
      {showAddCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-6 border border-stone-200 space-y-4">
            <h4 className="font-bold text-base text-stone-900">Add Crop to Farm Digital Twin</h4>
            <form onSubmit={handleAddCrop} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  placeholder="e.g. Onion, Tomato, Sugarcane"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Acreage (Acres)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={newCropAcres}
                  onChange={(e) => setNewCropAcres(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Sowing Date</label>
                <input
                  type="date"
                  value={newCropSowingDate}
                  onChange={(e) => setNewCropSowingDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow"
                >
                  Save Crop
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCropModal(false)}
                  className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
