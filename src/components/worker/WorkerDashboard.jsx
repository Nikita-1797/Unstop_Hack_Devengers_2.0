import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import { WorkerJobSeekerModal } from '../forms/WorkerJobSeekerModal';
import {
  Briefcase,
  Star,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  ShieldCheck,
  TrendingUp,
  User,
  PlusCircle,
  Sparkles,
  ArrowRight,
  UserPlus
} from 'lucide-react';

export const WorkerDashboard = () => {
  const { jobs, applyForJob, workers, currentUser, t } = useAgriStore();

  const [activeTab, setActiveTab] = useState('available'); // 'available' | 'applied' | 'earnings'
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [availableForWork, setAvailableForWork] = useState(true);
  const [showRegModal, setShowRegModal] = useState(false);

  // Use logged in worker or first registered worker
  const workerProfile = (currentUser && currentUser.role === 'worker')
    ? currentUser
    : (workers.length > 0 ? workers[0] : null);

  const handleApply = (jobId) => {
    const applicantName = workerProfile ? workerProfile.name : "Local Worker";
    applyForJob(jobId, applicantName);
    setAppliedJobIds(prev => new Set(prev).add(jobId));
  };

  const appliedJobsList = jobs.filter(j => appliedJobIds.has(j.id) || j.workersApplied > 0);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Worker Profile Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-600/30 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-md">
              👷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {workerProfile ? workerProfile.name : "Farm Worker Portal"}
                </h2>
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {workerProfile ? 'Verified' : 'Register Below'}
                </span>
              </div>
              <p className="text-xs text-amber-200 mt-1">
                📍 {workerProfile?.village || "Local Agricultural Region"} • {workerProfile?.experienceYears || 5} Years Agriculture Experience
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 mr-1" />
                  <span>{workerProfile?.rating || 5.0}</span>
                </div>
                <span>•</span>
                <span className="text-white font-bold">
                  Daily Wage: ₹{workerProfile?.dailyWage || 500}/day
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setShowRegModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{workerProfile ? 'Update Worker Profile' : 'Register as Worker'}</span>
            </button>

            <button
              onClick={() => setAvailableForWork(!availableForWork)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow ${
                availableForWork ? 'bg-emerald-600 text-white' : 'bg-stone-700 text-stone-200'
              }`}
            >
              {availableForWork ? '🟢 Available for Work' : '🔴 Currently Busy'}
            </button>
          </div>
        </div>
        <Briefcase className="absolute -right-6 -bottom-6 w-48 h-48 text-amber-600/20 pointer-events-none" />
      </div>

      {/* Skills Badges */}
      {workerProfile && workerProfile.skills && (
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wide mr-2">Registered Skills:</span>
          {workerProfile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-xl"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-2xl p-1.5 shadow-sm">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'available'
              ? 'bg-amber-600 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Available Farm Jobs ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applied')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'applied'
              ? 'bg-amber-600 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>My Applied Jobs ({appliedJobsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'earnings'
              ? 'bg-amber-600 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Earnings & History</span>
        </button>
      </div>

      {/* Available Jobs Tab */}
      {activeTab === 'available' && (
        jobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
            <Briefcase className="w-14 h-14 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-base">No Farm Jobs Posted Right Now</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              When neighboring farmers post labor requirements for cotton harvesting, weeding, sowing, or spraying, they will appear here instantly!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const hasApplied = appliedJobIds.has(job.id);
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:border-amber-400 hover:shadow-md transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                        {job.crop}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        📍 {job.location}
                      </span>
                    </div>

                    <h3 className="font-bold text-stone-900 text-base">{job.workType}</h3>

                    <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase font-bold block">Wage Rate</span>
                        <span className="text-lg font-extrabold text-amber-950 font-serif">
                          ₹{job.wagePerWorker} <span className="text-xs font-normal text-stone-600">/ day</span>
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-stone-700">{job.hoursPerDay} Hours / Day</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Farm Land: {job.landSize}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Starts: <strong>{job.startDate}</strong></span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Workers: <strong>{job.workersApplied} / {job.workersRequired} Filled</strong></span>
                      </p>
                    </div>

                    {job.notes && (
                      <p className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg border border-stone-100">
                        💡 {job.notes}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex gap-2">
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={hasApplied}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow ${
                        hasApplied
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      {hasApplied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Application Sent</span>
                        </>
                      ) : (
                        <>
                          <span>Apply for Job</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a
                      href={`tel:${job.farmerPhone}`}
                      className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl"
                      title="Call Farmer"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Applied Jobs Tab */}
      {activeTab === 'applied' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900">Your Applications & Accepted Labor Contracts</h3>
          {appliedJobsList.length === 0 ? (
            <p className="text-xs text-stone-400 py-8 text-center">You have not applied for any jobs yet.</p>
          ) : (
            <div className="divide-y divide-stone-100">
              {appliedJobsList.map((job) => (
                <div key={job.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">{job.workType} ({job.crop})</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Application Active
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Farmer: {job.farmerName} • Phone: {job.farmerPhone}
                    </p>
                    <p className="text-xs text-stone-700 mt-1">
                      📅 Date: <strong>{job.startDate}</strong> • Location: <strong>{job.location}</strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-stone-400 block">Daily Wage</span>
                    <span className="text-base font-bold text-amber-700">₹{job.wagePerWorker} / day</span>
                    <a
                      href={`tel:${job.farmerPhone}`}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold"
                    >
                      <Phone className="w-3 h-3" /> Call Farmer
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-semibold">Total Season Earnings</span>
              <p className="text-2xl font-extrabold text-amber-900 mt-1 font-serif">₹0</p>
              <span className="text-[11px] text-stone-400 font-medium">Earnings track after job completion</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-semibold">Daily Wage Rate</span>
              <p className="text-2xl font-extrabold text-stone-900 mt-1 font-serif">
                ₹{workerProfile?.dailyWage || 500}
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold">Configured rate</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs text-stone-500 font-semibold">Worker Status</span>
              <p className="text-sm font-bold text-stone-800 mt-2">
                {workerProfile ? '✓ Registered' : 'Not registered yet'}
              </p>
              <button
                onClick={() => setShowRegModal(true)}
                className="text-[11px] text-amber-700 font-bold underline mt-1 block"
              >
                Edit Profile & Rates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Worker Job Seeker Modal */}
      <WorkerJobSeekerModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
      />
    </div>
  );
};
