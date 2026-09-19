import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  User,
  Lock,
  Phone,
  MapPin,
  Sprout,
  Briefcase,
  Store,
  Tractor,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { registerUser, loginUser, t } = useAgriStore();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('farmer');

  // Common Fields
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('Jalgaon');

  // Farmer Specific Fields
  const [landAcres, setLandAcres] = useState('4');
  const [soilType, setSoilType] = useState('Black Cotton Soil (काळी माती)');
  const [irrigationType, setIrrigationType] = useState('Drip & Well (ठिबक व विहीर)');
  const [primaryCrop, setPrimaryCrop] = useState('Cotton (कापूस)');

  // Worker Specific Fields
  const [dailyWage, setDailyWage] = useState('500');
  const [experienceYears, setExperienceYears] = useState('5');
  const [selectedSkills, setSelectedSkills] = useState(['Cotton Harvesting', 'Weeding']);

  // Seller Specific Fields
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');

  // Equipment Owner Fields
  const [equipmentTypes, setEquipmentTypes] = useState('Tractor & Rotavator');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!phone || !password) {
      setErrorMsg('Please enter both mobile number and password.');
      return;
    }

    const result = loginUser(phone, password);
    if (result.success) {
      setSuccessMsg(`Welcome, ${result.user.name}!`);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1000);
    } else {
      setErrorMsg(result.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    const userData = {
      name,
      phone,
      password,
      role: selectedRole,
      village: village || 'Local Village',
      district: district || 'Jalgaon',
      state: 'Maharashtra',
      // Role specific payload
      totalLandAcres: landAcres,
      soilType,
      irrigationType,
      primaryCrop,
      dailyWage,
      experienceYears,
      skills: selectedSkills,
      shopName,
      shopAddress,
      equipmentTypes
    };

    registerUser(userData);
    setSuccessMsg('Account registered successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const roleOptions = [
    { id: 'farmer', title: 'Farmer', titleHi: 'किसान', icon: Sprout, color: 'text-emerald-700' },
    { id: 'worker', title: 'Farm Worker', titleHi: 'मजदूर', icon: Briefcase, color: 'text-amber-700' },
    { id: 'owner', title: 'Equipment Owner', titleHi: 'उपकरण मालिक', icon: Tractor, color: 'text-purple-700' },
    { id: 'seller', title: 'Agri Seller', titleHi: 'विक्रेता', icon: Store, color: 'text-blue-700' }
  ];

  const workerSkillsOptions = [
    'Cotton Harvesting',
    'Weeding (निंदणी)',
    'Pesticide Spraying',
    'Seed Sowing',
    'Tractor Driving',
    'Drip Pipe Repair',
    'Threshing & Bagging'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <User className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {mode === 'login' ? 'Login to KrishiSetu' : 'Create New Account'}
              </h3>
              <p className="text-xs text-emerald-100/80">
                {mode === 'login' ? 'लॉग इन करें' : 'किसान / मजदूर / मालिक पंजीकरण'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-emerald-100 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle Bar */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition ${
              mode === 'login'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In (लॉग इन)
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition ${
              mode === 'register'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Register New Account (नया खाता)
          </button>
        </div>

        {/* Body Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Registered Mobile Number (मोबाइल नंबर)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="e.g. 9822155678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Password (पासवर्ड)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow transition flex items-center justify-center gap-2"
              >
                <span>Login (लॉग इन करें)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-stone-500 pt-2">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-emerald-700 font-bold underline"
                >
                  Register Here
                </button>
              </p>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              {/* Role Selection */}
              <div>
                <label className="block font-bold text-stone-800 mb-2">
                  Select Your Primary Role (अपनी भूमिका चुनें):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map((r) => {
                    const Icon = r.icon;
                    const isSel = selectedRole === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition ${
                          isSel
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20'
                            : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${r.color}`} />
                        <div>
                          <p className="font-bold text-stone-900">{r.title}</p>
                          <p className="text-[10px] text-stone-500">{r.titleHi}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name (पूरा नाम)</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Patil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mobile Number (मोबाइल)</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Village / Town (गांव / शहर)</label>
                  <input
                    type="text"
                    placeholder="e.g. Asoda"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">District (ज़िला)</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Set Password (पासवर्ड बनाएं)</label>
                <input
                  type="password"
                  placeholder="At least 4 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              {/* Role-Specific Fields */}
              {selectedRole === 'farmer' && (
                <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                  <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                    🌱 Farm Profile Details
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Total Land (Acres)</label>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={landAcres}
                        onChange={(e) => setLandAcres(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Primary Crop</label>
                      <input
                        type="text"
                        value={primaryCrop}
                        onChange={(e) => setPrimaryCrop(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Soil Type</label>
                    <select
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    >
                      <option value="Black Cotton Soil (काळी माती)">Black Cotton Soil (काळी माती)</option>
                      <option value="Alluvial Soil (गाळाची माती)">Alluvial Soil (गाळाची माती)</option>
                      <option value="Red / Laterite Soil">Red / Laterite Soil</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedRole === 'worker' && (
                <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
                  <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">
                    👷 Labor Profile & Skills
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Daily Wage (₹/day)</label>
                      <input
                        type="number"
                        step="50"
                        value={dailyWage}
                        onChange={(e) => setDailyWage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Experience (Years)</label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Select Your Skills (अपने हुनर चुनें):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {workerSkillsOptions.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggleSkill(s)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                            selectedSkills.includes(s)
                              ? 'bg-amber-600 text-white'
                              : 'bg-white border border-stone-300 text-stone-700'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'seller' && (
                <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3">
                  <span className="font-bold text-blue-900 block text-[11px] uppercase tracking-wider">
                    🏪 Shop & Business Details
                  </span>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Shop / Kendra Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Kisan Krishi Seva Kendra"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                      required
                    />
                  </div>
                </div>
              )}

              {selectedRole === 'owner' && (
                <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-3">
                  <span className="font-bold text-purple-900 block text-[11px] uppercase tracking-wider">
                    🚜 Machinery Fleet
                  </span>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Equipment Owned</label>
                    <input
                      type="text"
                      placeholder="e.g. Mahindra 45HP Tractor, Rotavator"
                      value={equipmentTypes}
                      onChange={(e) => setEquipmentTypes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow transition flex items-center justify-center gap-2"
              >
                <span>Register & Open Dashboard</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
