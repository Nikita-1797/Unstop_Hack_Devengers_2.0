import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Briefcase,
  X,
  CheckCircle2,
  Phone,
  MapPin,
  IndianRupee,
  Star,
  UserCheck
} from 'lucide-react';

export const WorkerJobSeekerModal = ({ isOpen, onClose }) => {
  const { currentUser, registerWorkerProfile } = useAgriStore();

  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [phone, setPhone] = useState(currentUser ? currentUser.phone : '');
  const [village, setVillage] = useState(currentUser ? currentUser.village : '');
  const [dailyWage, setDailyWage] = useState(500);
  const [experienceYears, setExperienceYears] = useState(6);
  const [selectedSkills, setSelectedSkills] = useState(['Cotton Harvesting', 'Weeding (निंदणी)']);
  const [available, setAvailable] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    registerWorkerProfile({
      name,
      phone,
      village: village || 'Local Village',
      dailyWage: Number(dailyWage),
      experienceYears: Number(experienceYears),
      skills: selectedSkills.length > 0 ? selectedSkills : ['General Farm Labor'],
      available
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const skillsList = [
    'Cotton Harvesting',
    'Weeding (निंदणी)',
    'Pesticide Spraying',
    'Seed Sowing',
    'Tractor Driving',
    'Drip Line Repair',
    'Threshing & Bagging'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded">
              Farm Labor Pool
            </span>
            <h3 className="font-bold text-base sm:text-lg text-stone-900 mt-1">
              Register as Farm Worker (काम चाहिए)
            </h3>
            <p className="text-xs text-stone-500">स्थानीय किसानों से काम पाने के लिए अपनी जानकारी भरें</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="font-bold text-emerald-950 text-base">Worker Registered!</h4>
            <p className="text-xs text-emerald-800">
              Your profile is now visible to nearby farmers hiring for harvesting, sowing, and spraying.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Worker Full Name (नाम)</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Tukaram Pawar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Mobile Number (फ़ोन)</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Village / Town (गांव)</label>
                <input
                  type="text"
                  placeholder="e.g. Asoda"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Daily Wage Expected (₹/दिन)</label>
                <input
                  type="number"
                  step="50"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Experience (वर्ष)</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">
                Skills / Expertise (आपके काम का हुनर):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {skillsList.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                      selectedSkills.includes(skill)
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span className="font-semibold text-stone-800">
                Currently Available for Work (काम के लिए उपलब्ध हैं)
              </span>
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow transition flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Register to Available Pool</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 bg-stone-100 text-stone-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
