import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  ShieldAlert,
  Users,
  CheckCircle2,
  XCircle,
  Landmark,
  Store,
  Tractor,
  FileText,
  AlertTriangle,
  TrendingUp,
  Search,
  Check,
  RotateCcw,
  Trash2,
  DownloadCloud
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    products,
    workers,
    equipment,
    schemes,
    orders,
    complaints,
    resolveComplaint,
    clearAllUserData,
    loadDemoData,
    users,
    jobs,
    t
  } = useAgriStore();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'complaints' | 'schemes' | 'data'
  const [resolutionText, setResolutionText] = useState('');
  const [selectedCompId, setSelectedCompId] = useState(null);

  const handleResolve = (compId) => {
    if (!resolutionText.trim()) return;
    resolveComplaint(compId, resolutionText);
    setSelectedCompId(null);
    setResolutionText('');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-rose-900 via-stone-900 to-red-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-semibold mb-3 border border-rose-400/30">
            👑 Super Administrator Governance Console
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            KrishiSetu Ecosystem Governance & Data Control
          </h2>
          <p className="text-rose-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Monitor real-time user registrations, verify dealers and machinery owners, manage welfare schemes, and control database states.
          </p>
        </div>
        <ShieldAlert className="absolute -right-6 -bottom-6 w-48 h-48 text-rose-700/20 pointer-events-none" />
      </div>

      {/* Real-time Dynamic Platform Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
          <span className="text-[11px] text-stone-500 font-bold block uppercase">Registered Users</span>
          <span className="text-xl font-extrabold text-emerald-800 block mt-1 font-serif">{users.length}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Farmers & Workers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
          <span className="text-[11px] text-stone-500 font-bold block uppercase">Farm Workers</span>
          <span className="text-xl font-extrabold text-amber-800 block mt-1 font-serif">{workers.length}</span>
          <span className="text-[10px] text-amber-600 font-medium">Available pool</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
          <span className="text-[11px] text-stone-500 font-bold block uppercase">Active Jobs</span>
          <span className="text-xl font-extrabold text-blue-800 block mt-1 font-serif">{jobs.length}</span>
          <span className="text-[10px] text-blue-600 font-medium">Posted by farmers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
          <span className="text-[11px] text-stone-500 font-bold block uppercase">Equipment Fleet</span>
          <span className="text-xl font-extrabold text-purple-800 block mt-1 font-serif">{equipment.length}</span>
          <span className="text-[10px] text-purple-600 font-medium">Machinery listed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
          <span className="text-[11px] text-stone-500 font-bold block uppercase">Orders Placed</span>
          <span className="text-xl font-extrabold text-stone-900 block mt-1 font-serif">{orders.length}</span>
          <span className="text-[10px] text-stone-500 font-medium">Marketplace orders</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
          <span className="text-[11px] text-stone-500 font-bold block uppercase">Grievances</span>
          <span className="text-xl font-extrabold text-rose-900 block mt-1 font-serif">{complaints.length}</span>
          <span className="text-[10px] text-rose-600 font-medium">Disputes logged</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto">
        {[
          { id: 'overview', label: 'Ecosystem Overview', icon: TrendingUp },
          { id: 'users', label: `Registered Users (${users.length})`, icon: Users },
          { id: 'complaints', label: `Grievances (${complaints.filter(c => c.status !== 'Resolved').length})`, icon: AlertTriangle },
          { id: 'schemes', label: 'Government Schemes CMS', icon: Landmark },
          { id: 'data', label: 'Database Controls ⚙️', icon: RotateCcw }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-rose-800 text-white shadow'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Database Controls Tab */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-base text-stone-900">Database & State Management</h3>
            <p className="text-xs text-stone-500 mt-1">
              Reset the platform to a completely empty state, or load sample records for quick demo presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-rose-50 rounded-2xl border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <Trash2 className="w-5 h-5 text-rose-700" />
                <span>Clear All User Data (Start 100% Fresh)</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                Removes all registered farmers, workers, posted jobs, equipment listings, and orders. The platform will be completely clean.
              </p>
              <button
                onClick={clearAllUserData}
                className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Clear All Data Now
              </button>
            </div>

            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <DownloadCloud className="w-5 h-5 text-emerald-700" />
                <span>Load Sample Demo Data (एक क्लिक में लोड करें)</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Populates sample farmers, verified workers, tractors, and active job postings in Maharashtra for testing and judging presentations.
              </p>
              <button
                onClick={loadDemoData}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Load Demo Sample Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grievance & Complaints Tab */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-base text-stone-900">Farmer Grievance & Dispute Resolution Desk</h3>
            <p className="text-xs text-stone-500">
              Address disputes regarding non-delivery of equipment, damaged seed consignments, or labor wage conflicts.
            </p>
          </div>

          {complaints.length === 0 ? (
            <p className="text-xs text-stone-400 py-8 text-center">No complaints or grievances registered.</p>
          ) : (
            <div className="space-y-4">
              {complaints.map((c) => (
                <div
                  key={c.id}
                  className={`p-5 rounded-2xl border transition ${
                    c.status === 'Resolved'
                      ? 'bg-stone-50 border-stone-200 opacity-80'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200/60">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-stone-900">Grievance #{c.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">Logged: {c.date}</span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex flex-wrap justify-between text-stone-600">
                      <span>Complainant: <strong className="text-stone-900">{c.farmerName}</strong> ({c.farmerPhone})</span>
                      <span>Target: <strong className="text-stone-900">{c.targetName}</strong> ({c.targetType})</span>
                    </div>

                    <p className="p-3 bg-white rounded-xl border border-stone-200 text-stone-800 font-medium">
                      "{c.issue}"
                    </p>

                    <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600">
                      <strong>Administrative Resolution:</strong> {c.adminNotes}
                    </div>
                  </div>

                  {c.status !== 'Resolved' && (
                    <div className="mt-4 pt-3 border-t border-stone-200">
                      {selectedCompId === c.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            placeholder="Enter administrative resolution notes..."
                            value={resolutionText}
                            onChange={(e) => setResolutionText(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleResolve(c.id)}
                              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow"
                            >
                              Confirm Resolution & Close Case
                            </button>
                            <button
                              onClick={() => setSelectedCompId(null)}
                              className="px-3 py-2 bg-stone-100 text-stone-600 rounded-lg text-xs font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedCompId(c.id)}
                          className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold transition shadow"
                        >
                          Mediate / Resolve Grievance
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* User Verification Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900">Registered Platform Users ({users.length})</h3>
          {users.length === 0 ? (
            <p className="text-xs text-stone-400 py-8 text-center">No users registered yet. Users will appear here after registering.</p>
          ) : (
            <div className="divide-y divide-stone-100">
              {users.map((u) => (
                <div key={u.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{u.name}</span>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                        {u.role}
                      </span>
                    </div>
                    <p className="text-stone-500 mt-0.5">Phone: {u.phone} • Village: {u.village || 'Jalgaon'}</p>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <h4 className="font-bold text-base text-stone-900">Platform Health & Registration Status</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              The platform is operating with dynamic user persistence. New farmers, workers, and machinery listings are saved directly into the reactive database and updated across all dashboards immediately.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-900 border border-emerald-200">
              ✓ Clean slate mode active: only registered users appear.<br />
              ✓ Full authentication system enabled for all roles.<br />
              ✓ Interactive forms available for labor, rentals, and services.
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <h4 className="font-bold text-base text-stone-900">Admin Quick Actions</h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setActiveTab('data')}
                className="w-full text-left p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 font-semibold text-stone-800 flex items-center justify-between"
              >
                <span>⚙️ Manage Database & Demo Data</span>
                <span>➔</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className="w-full text-left p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 font-semibold text-stone-800 flex items-center justify-between"
              >
                <span>👥 View Registered Users List</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schemes CMS Tab */}
      {activeTab === 'schemes' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900">Active Welfare Schemes Directory ({schemes.length})</h3>
          <div className="divide-y divide-stone-100 text-xs">
            {schemes.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900">{s.name}</h4>
                  <p className="text-stone-500">{s.benefitAmount}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                  Status: Published & Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
