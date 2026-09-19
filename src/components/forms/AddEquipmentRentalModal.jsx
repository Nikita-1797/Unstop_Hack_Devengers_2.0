import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Tractor,
  X,
  CheckCircle2,
  DollarSign,
  MapPin,
  Phone,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const AddEquipmentRentalModal = ({ isOpen, onClose }) => {
  const { currentUser, addEquipmentListing } = useAgriStore();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tractor');
  const [rentPerDay, setRentPerDay] = useState(1500);
  const [deposit, setDeposit] = useState(3000);
  const [ownerName, setOwnerName] = useState(currentUser ? currentUser.name : '');
  const [ownerPhone, setOwnerPhone] = useState(currentUser ? currentUser.phone : '');
  const [location, setLocation] = useState(currentUser ? currentUser.village : 'Jalgaon');
  const [driverAvailable, setDriverAvailable] = useState(true);
  const [driverWageExtra, setDriverWageExtra] = useState(400);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addEquipmentListing({
      name,
      category,
      rentPerDay: Number(rentPerDay),
      deposit: Number(deposit),
      ownerName: ownerName || 'Verified Owner',
      ownerPhone: ownerPhone || '+91 98000 00000',
      location: location || 'Local Area',
      driverAvailable,
      driverWageExtra: driverAvailable ? Number(driverWageExtra) : 0,
      description: description || 'Regularly serviced agricultural equipment available for rental.'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const categories = [
    'Tractor',
    'Rotavator',
    'Cultivator',
    'Water Pump',
    'Sprayer',
    'Harvester',
    'Bullocks',
    'Cow',
    'Buffalo'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-bold text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded">
              Rental Hub
            </span>
            <h3 className="font-bold text-base sm:text-lg text-stone-900 mt-1">
              List Equipment or Animal for Rent
            </h3>
            <p className="text-xs text-stone-500">उपकरण या बैल किराए पर उपलब्ध कराएं</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="font-bold text-emerald-950 text-base">Listing Added Successfully!</h4>
            <p className="text-xs text-emerald-800">
              Your equipment is now visible in the rental hub for neighboring farmers to book.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Equipment or Animal Name (नाम / मॉडल)
              </label>
              <input
                type="text"
                placeholder="e.g. Mahindra 575 DI 45HP Tractor / Khillari Bullocks"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Category (प्रकार)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Daily Rent (₹/दिन)</label>
                <input
                  type="number"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Refundable Deposit (₹)</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Location / Village (गांव)</label>
                <input
                  type="text"
                  placeholder="e.g. Asoda, Jalgaon"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Owner Name (मालिक का नाम)</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Contact Phone (फ़ोन)</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  required
                />
              </div>
            </div>

            {category !== 'Bullocks' && category !== 'Cow' && category !== 'Buffalo' && (
              <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={driverAvailable}
                  onChange={(e) => setDriverAvailable(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">
                  Certified Driver / Operator available (+₹{driverWageExtra}/day)
                </span>
              </label>
            )}

            <div>
              <label className="block font-bold text-stone-700 mb-1">Condition & Details (विवरण)</label>
              <textarea
                rows={2}
                placeholder="Horsepower, maintenance, availability hours..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Listing to Hub</span>
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
