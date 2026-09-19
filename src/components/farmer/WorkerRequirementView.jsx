import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import { WorkerJobSeekerModal } from '../forms/WorkerJobSeekerModal';
import {
  Users,
  Calculator,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Star,
  CheckCircle2,
  Phone,
  Briefcase,
  Plus,
  Send,
  Sparkles,
  ShieldCheck,
  UserPlus
} from 'lucide-react';

export const WorkerRequirementView = () => {
  const { workers, jobs, postJob, t, farmerProfile, currentUser } = useAgriStore();

  const [landSize, setLandSize] = useState(5);
  const [workType, setWorkType] = useState('Cotton Harvesting');
  const [workersRequired, setWorkersRequired] = useState(8);
  const [workingHours, setWorkingHours] = useState(8);
  const [startDate, setStartDate] = useState('2026-09-22');
  const [wagePerWorker, setWagePerWorker] = useState(500);
  const [location, setLocation] = useState(farmerProfile ? `${farmerProfile.village}, ${farmerProfile.district}` : 'Jalgaon');
  const [crop, setCrop] = useState(farmerProfile?.primaryCrop || 'Cotton');
  const [notes, setNotes] = useState('Drinking water and lunch shelter provided at the field.');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [selectedWorkerForHire, setSelectedWorkerForHire] = useState(null);
  const [showWorkerRegModal, setShowWorkerRegModal] = useState(false);

  // Dynamic Calculation
  const dailyLaborCost = Number(workersRequired) * Number(wagePerWorker);
  const estimatedDays = Math.max(1, Math.ceil((Number(landSize) * 4) / Number(workersRequired)));
  const totalEstimatedProjectBudget = dailyLaborCost * estimatedDays;

  const handleSubmitRequirement = (e) => {
    e.preventDefault();
    postJob({
      crop,
      workType,
      landSize,
      workersRequired,
      hoursPerDay: workingHours,
      startDate,
      wagePerWorker,
      location,
      notes
    });
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const workTypeOptions = [
    "Cotton Harvesting / Picking",
    "Soybean / Wheat Threshing",
    "Manual Weeding (निंदणी)",
    "Pesticide Spraying (फवारणी)",
    "Seed Sowing & Dibbling",
    "Drip Line Laying & Repair",
    "Tractor Assisted Ploughing"
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-semibold mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Killer Feature #1: Smart Labor Matching Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Farm Worker Requirement & Wage Calculator
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Specify your farm acreage, work type, and budget. Our algorithm auto-calculates total labor economics and broadcasts requirements to local registered workers.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setShowWorkerRegModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow"
            >
              <UserPlus className="w-4 h-4" />
              <span>Need Farm Work? Register as Worker (काम चाहिए - फॉर्म भरें)</span>
            </button>
          </div>
        </div>
        <Users className="absolute -right-6 -bottom-6 w-48 h-48 text-amber-600/20 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Calculator & Job Posting Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-600" />
              Requirement Calculator
            </h3>
            <span className="text-xs text-stone-500 font-medium">Post Requirement</span>
          </div>

          <form onSubmit={handleSubmitRequirement} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Land Size */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Land Size (Acres)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-stone-400 font-medium">Acres</span>
                </div>
              </div>

              {/* Crop */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Crop
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  placeholder="e.g. Cotton, Soybean, Wheat"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Work Type */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Type of Agricultural Work
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  {workTypeOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Workers Required */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Workers Required
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={workersRequired}
                  onChange={(e) => setWorkersRequired(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Hours / Day */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Working Hours / Day
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="4"
                    max="12"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-stone-400 font-medium">Hours</span>
                </div>
              </div>

              {/* Wage Per Worker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Wage per Worker (₹/day)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-stone-500 font-bold">₹</span>
                  <input
                    type="number"
                    min="200"
                    step="50"
                    value={wagePerWorker}
                    onChange={(e) => setWagePerWorker(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-7 pr-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Farm Location / Village
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Real-time Dynamic Calculation Display */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-amber-200">
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> Budget Breakdown
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-amber-950 font-serif">
                    ₹{dailyLaborCost.toLocaleString()} <span className="text-xs font-normal text-amber-800">/ day</span>
                  </p>
                  <p className="text-xs text-amber-800 font-mono mt-0.5">
                    {workersRequired} workers × ₹{wagePerWorker}/day
                  </p>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-amber-200 w-full sm:w-auto">
                  <span className="text-[11px] text-amber-700 block">Est. Completion ({estimatedDays} days):</span>
                  <span className="text-base font-bold text-stone-900">
                    ≈ ₹{totalEstimatedProjectBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Worker Requirement</span>
            </button>

            {submittedSuccess && (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Requirement successfully posted! Registered workers will receive alerts.</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Available Nearby Workers Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              Available Local Workers ({workers.length})
            </h3>
            <button
              onClick={() => setShowWorkerRegModal(true)}
              className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full transition"
            >
              + Register Worker
            </button>
          </div>

          {workers.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3">
              <Users className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-700 text-sm">No Workers Registered Yet</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                No agricultural workers are registered in the local pool yet. Local laborers can register their skills and daily wage rate using the form below.
              </p>
              <button
                onClick={() => setShowWorkerRegModal(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Register as Worker (फॉर्म भरें)
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {workers.map((w) => (
                <div
                  key={w.id}
                  className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm hover:border-amber-400 transition group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={w.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60"}
                      alt={w.name}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                          {w.name}
                        </h4>
                        <div className="flex items-center text-amber-500 text-xs font-bold shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="ml-1 text-stone-800">{w.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{w.village} • <strong className="text-emerald-700">{w.distance}</strong></span>
                      </div>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {w.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-stone-400 block">Expected Wage</span>
                          <span className="font-bold text-xs text-stone-900">
                            ₹{w.dailyWage} <span className="font-normal text-stone-500">/ day</span>
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedWorkerForHire(w)}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Hire / Contact</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Direct Contact Modal */}
      {selectedWorkerForHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 border border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedWorkerForHire.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60"}
                alt={selectedWorkerForHire.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-base text-stone-900">{selectedWorkerForHire.name}</h4>
                <p className="text-xs text-stone-500">{selectedWorkerForHire.village} • {selectedWorkerForHire.experienceYears} Years Experience</p>
                <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Farm Worker</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl space-y-1.5 text-xs text-stone-700">
              <p><strong>Daily Wage Rate:</strong> ₹{selectedWorkerForHire.dailyWage} / day</p>
              <p><strong>Direct Phone:</strong> {selectedWorkerForHire.phone}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`tel:${selectedWorkerForHire.phone}`}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Call Worker Now</span>
              </a>
              <button
                onClick={() => setSelectedWorkerForHire(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Worker Job Seeker Modal */}
      <WorkerJobSeekerModal
        isOpen={showWorkerRegModal}
        onClose={() => setShowWorkerRegModal(false)}
      />
    </div>
  );
};
