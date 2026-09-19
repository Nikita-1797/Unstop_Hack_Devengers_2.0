import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Landmark,
  Search,
  CheckCircle,
  FileText,
  ExternalLink,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  Square,
  Award,
  ArrowRight
} from 'lucide-react';

export const GovernmentSchemesView = () => {
  const { schemes, t } = useAgriStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showWizard, setShowWizard] = useState(false);

  // Eligibility Wizard States
  const [wizardLand, setWizardLand] = useState('small'); // 'marginal' | 'small' | 'large'
  const [wizardCrop, setWizardCrop] = useState('Cotton');
  const [wizardCategory, setWizardCategory] = useState('General');
  const [wizardNeed, setWizardNeed] = useState('all');
  const [wizardEvaluated, setWizardEvaluated] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState({});

  const toggleDoc = (docName) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  // Filter schemes based on search or wizard
  const filteredSchemes = schemes.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.targetCrops.toLowerCase().includes(q) ||
      s.benefitAmount.toLowerCase().includes(q);

    if (!wizardEvaluated) return matchesSearch;

    // In wizard mode, highlight based on selected criteria
    if (wizardNeed === 'mechanization' && !s.name.includes('SMAM') && !s.category.includes('Equipment')) return false;
    if (wizardNeed === 'irrigation' && !s.name.includes('PMKSY') && !s.category.includes('Irrigation')) return false;
    if (wizardNeed === 'insurance' && !s.name.includes('PMFBY') && !s.category.includes('Insurance')) return false;
    if (wizardNeed === 'credit' && !s.name.includes('Credit') && !s.name.includes('KCC')) return false;

    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold mb-3 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Killer Feature #3: Smart Schemes & Subsidies Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Government Agricultural Schemes & Eligibility
          </h2>
          <p className="text-blue-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Discover central and state agricultural welfare schemes, calculate your exact subsidy eligibility, prepare required 7/12 land records, and apply directly through authorized government portals.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setShowWizard(!showWizard);
                if (!showWizard) setWizardEvaluated(false);
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>{showWizard ? 'Hide Eligibility Wizard' : 'Check My Eligibility (पात्रता जांचें)'}</span>
            </button>
          </div>
        </div>
        <Landmark className="absolute -right-6 -bottom-6 w-48 h-48 text-blue-700/20 pointer-events-none" />
      </div>

      {/* Interactive Eligibility Wizard Modal / Card */}
      {showWizard && (
        <div className="bg-white rounded-3xl border-2 border-blue-500/40 p-6 sm:p-7 shadow-lg space-y-6 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Farmer Eligibility Evaluation Wizard
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Answer 4 quick questions to get matched with personalized subsidies and direct benefits.
              </p>
            </div>
            <button onClick={() => setShowWizard(false)} className="text-stone-400 hover:text-stone-700">✕</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Q1: Land Holding */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">1. Land Holding Size</label>
              <select
                value={wizardLand}
                onChange={(e) => setWizardLand(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="marginal">Marginal (&lt; 2.5 Acres / &lt;1 Ha)</option>
                <option value="small">Small Farmer (2.5 - 5 Acres)</option>
                <option value="large">Medium/Large (&gt; 5 Acres)</option>
              </select>
            </div>

            {/* Q2: Primary Crop */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">2. Primary Crop Grown</label>
              <select
                value={wizardCrop}
                onChange={(e) => setWizardCrop(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cotton">Cotton (कापूस)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
                <option value="Wheat">Wheat (गहू)</option>
                <option value="Sugarcane">Sugarcane (ऊस)</option>
                <option value="Horticulture">Horticulture / Vegetables</option>
              </select>
            </div>

            {/* Q3: Farmer Category */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">3. Social Category</label>
              <select
                value={wizardCategory}
                onChange={(e) => setWizardCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="General">General Category</option>
                <option value="OBC">OBC</option>
                <option value="SC/ST">SC / ST (Higher Subsidy)</option>
                <option value="Woman">Woman Farmer (50% Subsidy Priority)</option>
              </select>
            </div>

            {/* Q4: Specific Need */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-800 block mb-2">4. Primary Need</label>
              <select
                value={wizardNeed}
                onChange={(e) => setWizardNeed(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Available Subsidies</option>
                <option value="mechanization">Tractor / Rotavator Subsidy</option>
                <option value="irrigation">Drip & Sprinkler Subsidy</option>
                <option value="insurance">Crop Loss Insurance (PMFBY)</option>
                <option value="credit">Low Interest Kisan Loan (4%)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setWizardEvaluated(true);
              }}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-2"
            >
              <span>Match Schemes for My Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {wizardEvaluated && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Success!</strong> Filtered <strong>{filteredSchemes.length} potentially relevant schemes</strong> tailored for your {wizardLand} landholding with {wizardCrop} cultivation!
                </span>
              </div>
              <button
                onClick={() => setWizardEvaluated(false)}
                className="text-xs text-emerald-700 underline font-semibold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      )}

      {/* Natural Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0" />
        <input
          type="text"
          placeholder="Search schemes by name, crop or benefit (e.g. 'I have 3 acres and grow cotton', 'Drip', 'Tractor')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-sm focus:outline-none bg-transparent"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs text-stone-400 hover:text-stone-700 mr-2">
            ✕
          </button>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:border-blue-400 hover:shadow-md transition group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {scheme.popularScore}% Eligible Match
                </span>
              </div>

              <h3 className="font-bold text-stone-900 text-base group-hover:text-blue-700 transition">
                {scheme.name}
              </h3>

              <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs">
                <p className="font-bold text-blue-950 mb-0.5">💰 Financial Benefit:</p>
                <p className="text-blue-900 leading-relaxed">{scheme.benefitAmount}</p>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Eligibility:</strong> {scheme.eligibilityCriteria}
              </p>

              <div className="text-xs text-stone-500 space-y-1">
                <p>🌱 <strong>Target Crops:</strong> {scheme.targetCrops}</p>
                <p>⏰ <strong>Deadline:</strong> {scheme.deadline}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                <span>View Documents Checklist</span>
              </button>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-stone-900 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <span>Apply Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Details & Document Checklist Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-7 border border-stone-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Scheme Documentation</span>
                <h3 className="font-bold text-base sm:text-lg text-stone-900 mt-0.5">{selectedScheme.name}</h3>
              </div>
              <button onClick={() => setSelectedScheme(null)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl text-xs space-y-1 text-blue-950">
              <p className="font-bold text-sm">Key Benefit:</p>
              <p>{selectedScheme.benefitAmount}</p>
            </div>

            {/* Document Checklist with interactive checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wide">
                  Required Documents Checklist ({selectedScheme.documentsRequired.length})
                </h4>
                <span className="text-[11px] text-stone-500">Tick as you gather documents</span>
              </div>

              <div className="space-y-2">
                {selectedScheme.documentsRequired.map((doc, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(doc)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-3 transition ${
                      checkedDocs[doc]
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {checkedDocs[doc] ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                    <span className={checkedDocs[doc] ? 'line-through opacity-80' : 'font-medium'}>
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl text-xs space-y-1 border border-stone-100">
              <p className="font-bold text-stone-800">Application Procedure:</p>
              <p className="text-stone-600 leading-relaxed">{selectedScheme.applicationProcess}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={selectedScheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow"
              >
                <span>Proceed to Official Government Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
