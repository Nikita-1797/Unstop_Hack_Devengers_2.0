import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Tractor,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const EquipmentOwnerDashboard = () => {
  const { equipment, addEquipmentListing, equipmentBookings, t } = useAgriStore();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'myequipment' | 'add'
  const [eqName, setEqName] = useState('');
  const [eqCategory, setEqCategory] = useState('Tractor');
  const [eqRent, setEqRent] = useState(1500);
  const [eqDeposit, setEqDeposit] = useState(3000);
  const [eqDriver, setEqDriver] = useState(true);
  const [eqDriverWage, setEqDriverWage] = useState(400);
  const [eqDesc, setEqDesc] = useState('');

  const totalRentEarned = equipmentBookings.reduce((sum, b) => sum + b.totalRent, 0);

  const handleAddEquipment = (e) => {
    e.preventDefault();
    addEquipmentListing({
      name: eqName,
      category: eqCategory,
      rentPerDay: Number(eqRent),
      deposit: Number(eqDeposit),
      ownerName: "Pravin Jagtap",
      ownerPhone: "+91 98223 90011",
      location: "Kusumba, Jalgaon",
      distance: "4.2 km",
      driverAvailable: eqDriver,
      driverWageExtra: Number(eqDriverWage),
      description: eqDesc || "Reliable machinery maintained with regular authorized servicing."
    });

    setEqName('');
    setEqDesc('');
    setActiveTab('myequipment');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/30 text-purple-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-400/30">
                Machinery Fleet Owner
              </span>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Farm Fleet
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Pravin Jagtap Agro Machinery</h2>
            <p className="text-xs text-purple-100/90 mt-1">
              Kusumba, Jalgaon • Phone: +91 98223 90011
            </p>
          </div>

          <button
            onClick={() => setActiveTab('add')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>List Equipment for Rent</span>
          </button>
        </div>
        <Tractor className="absolute -right-6 -bottom-6 w-48 h-48 text-purple-600/20 pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Total Rental Revenue</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block font-serif">
            ₹{totalRentEarned.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">From {equipmentBookings.length} bookings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Active Bookings</span>
          <span className="text-2xl font-extrabold text-purple-700 mt-1 block font-serif">
            {equipmentBookings.length}
          </span>
          <span className="text-[11px] text-stone-400 font-medium">Currently engaged on field</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Fleet Size</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block font-serif">
            {equipment.length} Units
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">Tractor, rotavator, sprayers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Owner Rating</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block font-serif">
            4.9 ★
          </span>
          <span className="text-[11px] text-stone-400 font-medium">High maintenance score</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-2xl p-1.5 shadow-sm">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-purple-700 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Rental Bookings ({equipmentBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('myequipment')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'myequipment'
              ? 'bg-purple-700 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Tractor className="w-4 h-4" />
          <span>My Machinery Listings ({equipment.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'add'
              ? 'bg-purple-700 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Machinery</span>
        </button>
      </div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {equipmentBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{b.equipmentName}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-stone-400">ID: {b.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <p><strong>Renter / Farmer:</strong> {b.farmerName}</p>
                  <p className="mt-1">📅 <strong>Start Date:</strong> {b.startDate} ({b.days} Days)</p>
                  <p className="mt-1">👨‍✈️ <strong>Operator Option:</strong> {b.withDriver ? 'Yes, certified driver requested' : 'Machinery only'}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-stone-400">Total Rental Paid</p>
                  <p className="text-lg font-bold text-purple-900">₹{b.totalRent.toLocaleString()}</p>
                  <p className="text-[11px] text-stone-500 mt-1">Security Deposit Held: ₹{b.deposit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Equipment Tab */}
      {activeTab === 'myequipment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((eq) => (
            <div
              key={eq.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img src={eq.image} alt={eq.name} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {eq.category}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm">{eq.name}</h3>
                  <p className="text-xs text-stone-500 line-clamp-2">{eq.description}</p>
                  <div className="pt-2 flex justify-between text-xs font-bold text-stone-800">
                    <span>₹{eq.rentPerDay} / day</span>
                    <span className="text-emerald-700">Available</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Equipment Tab */}
      {activeTab === 'add' && (
        <div className="bg-white max-w-xl mx-auto rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900">Add Equipment to Rental Marketplace</h3>
          <form onSubmit={handleAddEquipment} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Equipment Name & Model</label>
              <input
                type="text"
                placeholder="e.g. John Deere 5050D 50HP"
                value={eqName}
                onChange={(e) => setEqName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Category</label>
                <select
                  value={eqCategory}
                  onChange={(e) => setEqCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="Tractor">Tractor</option>
                  <option value="Rotavator">Rotavator</option>
                  <option value="Cultivator">Cultivator</option>
                  <option value="Water Pump">Water Pump</option>
                  <option value="Sprayer">Sprayer</option>
                  <option value="Harvester">Harvester</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Daily Rent (₹)</label>
                <input
                  type="number"
                  value={eqRent}
                  onChange={(e) => setEqRent(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Refundable Deposit (₹)</label>
              <input
                type="number"
                value={eqDeposit}
                onChange={(e) => setEqDeposit(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>

            <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={eqDriver}
                onChange={(e) => setEqDriver(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
              />
              <span className="font-bold text-stone-800">Operator/Driver available upon request</span>
            </label>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Equipment Description & Condition</label>
              <textarea
                rows={3}
                placeholder="Horsepower, maintenance record, delivery range..."
                value={eqDesc}
                onChange={(e) => setEqDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow transition"
            >
              Publish Equipment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
