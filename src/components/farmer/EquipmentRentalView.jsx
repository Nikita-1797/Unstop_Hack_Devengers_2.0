import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import { AddEquipmentRentalModal } from '../forms/AddEquipmentRentalModal';
import {
  Tractor,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Filter,
  Sparkles,
  ArrowRight,
  Info,
  DollarSign,
  PlusCircle
} from 'lucide-react';

export const EquipmentRentalView = () => {
  const { equipment, animals, bookEquipment, t, equipmentBookings } = useAgriStore();

  const [activeSection, setActiveSection] = useState('machinery'); // 'machinery' | 'animals' | 'mybookings'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingModalItem, setBookingModalItem] = useState(null);
  const [bookingDays, setBookingDays] = useState(2);
  const [bookingStartDate, setBookingStartDate] = useState('2026-09-22');
  const [withDriver, setWithDriver] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [animalInquiryItem, setAnimalInquiryItem] = useState(null);
  const [showAddRentalModal, setShowAddRentalModal] = useState(false);

  const categories = ['All', 'Tractor', 'Rotavator', 'Cultivator', 'Water Pump', 'Sprayer'];

  const filteredEquipment = selectedCategory === 'All'
    ? equipment
    : equipment.filter(e => e.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingModalItem) return;

    bookEquipment({
      equipmentItem: bookingModalItem,
      startDate: bookingStartDate,
      days: Number(bookingDays),
      withDriver
    });

    setBookingDone(true);
    setTimeout(() => {
      setBookingDone(false);
      setBookingModalItem(null);
    }, 2200);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-semibold mb-3 border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Killer Feature #2: Equipment & Animal Rental Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Farming Machinery & Livestock Sharing Hub
          </h2>
          <p className="text-purple-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Eliminate massive capital expense by renting tractors, rotavators, sprayers, or working bullocks directly from neighboring owners.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setShowAddRentalModal(true)}
              className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-stone-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Offer Your Equipment or Animal for Rent (किराए पर दें - फॉर्म भरें)</span>
            </button>
          </div>
        </div>
        <Tractor className="absolute -right-6 -bottom-6 w-48 h-48 text-purple-600/20 pointer-events-none" />
      </div>

      {/* Main Switcher: Machinery vs Animals vs My Bookings */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveSection('machinery')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSection === 'machinery'
                ? 'bg-purple-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Tractor className="w-4 h-4" />
            <span>Farm Machinery ({equipment.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('animals')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSection === 'animals'
                ? 'bg-purple-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🐂 Farm Animals / Bullocks ({animals.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('mybookings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSection === 'mybookings'
                ? 'bg-purple-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>📋 My Active Bookings ({equipmentBookings.length})</span>
          </button>
        </div>

        <button
          onClick={() => setShowAddRentalModal(true)}
          className="px-3.5 py-1.5 bg-stone-900 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add Listing</span>
        </button>
      </div>

      {/* Machinery Section */}
      {activeSection === 'machinery' && (
        equipment.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
            <Tractor className="w-14 h-14 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-base">No Machinery Listed for Rent Yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Own a tractor, rotavator, pump, or sprayer? List it for rent to neighboring farmers and earn daily rental revenue!
            </p>
            <button
              onClick={() => setShowAddRentalModal(true)}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              List Machinery for Rent (फॉर्म भरें)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((eq) => (
              <div
                key={eq.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <img
                    src={eq.image || "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&auto=format&fit=crop&q=60"}
                    alt={eq.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {eq.category}
                  </div>
                  {eq.availableTomorrow && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Available
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-900 text-base">{eq.name}</h3>
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="ml-1 text-stone-800">{eq.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {eq.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Owner:</span>
                        <span className="font-medium text-stone-800">{eq.ownerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Location:</span>
                        <span className="font-medium text-stone-800 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-600" />
                          {eq.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Refundable Deposit:</span>
                        <span className="font-medium text-stone-800">₹{eq.deposit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-bold">Rent Rate</span>
                      <span className="text-lg font-extrabold text-purple-900 font-serif">
                        ₹{eq.rentPerDay.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ day</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setBookingModalItem(eq)}
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Rent Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Animal Marketplace Section */}
      {activeSection === 'animals' && (
        animals.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
            <span className="text-4xl block">🐂</span>
            <h3 className="font-bold text-stone-700 text-base">No Farm Animals Listed Yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Want to rent working bullocks for ploughing or sell cattle? Add your listing to reach nearby farmers!
            </p>
            <button
              onClick={() => setShowAddRentalModal(true)}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              List Animal for Rent/Sale
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((anim) => (
              <div
                key={anim.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group"
              >
                <div className="relative h-52 bg-stone-100 overflow-hidden">
                  <img
                    src={anim.image || "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=600&auto=format&fit=crop&q=60"}
                    alt={anim.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {anim.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{anim.name}</h3>
                    <p className="text-xs text-stone-600 mt-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 leading-snug">
                      {anim.description}
                    </p>

                    <div className="mt-3 text-xs text-stone-500 flex items-center justify-between">
                      <span>Owner: {anim.ownerName}</span>
                      <span className="flex items-center gap-1 text-purple-700">
                        <MapPin className="w-3 h-3" /> {anim.location}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-stone-800">
                        Rent: ₹{anim.rentPerDay} / day
                      </p>
                    </div>

                    <a
                      href={`tel:${anim.ownerPhone}`}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Owner</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* My Active Bookings View */}
      {activeSection === 'mybookings' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-stone-900">Your Equipment Rental Bookings</h3>
          {equipmentBookings.length === 0 ? (
            <p className="text-xs text-stone-500 py-6 text-center">No active rental bookings yet.</p>
          ) : (
            <div className="divide-y divide-stone-100">
              {equipmentBookings.map((b) => (
                <div key={b.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{b.equipmentName}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Owner: {b.ownerName} • Booking ID: <span className="font-mono font-semibold">{b.id}</span>
                    </p>
                    <p className="text-xs text-stone-700 mt-1">
                      📅 Start Date: <strong>{b.startDate}</strong> • Duration: <strong>{b.days} Days</strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-stone-400">Total Rent Paid</p>
                    <p className="text-base font-bold text-purple-900">₹{b.totalRent.toLocaleString()}</p>
                    <span className="text-[11px] text-stone-500">Security Deposit: ₹{b.deposit} (Refundable)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-7 border border-stone-200 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-lg text-stone-900">Rent {bookingModalItem.name}</h3>
                <p className="text-xs text-stone-500">Owner: {bookingModalItem.ownerName} • {bookingModalItem.location}</p>
              </div>
              <button onClick={() => setBookingModalItem(null)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            {bookingDone ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-emerald-950 text-base">Booking Request Confirmed!</h4>
                <p className="text-xs text-emerald-800">
                  {bookingModalItem.ownerName} has been alerted and will deliver the machinery on {bookingStartDate}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Rental Start Date</label>
                    <input
                      type="date"
                      value={bookingStartDate}
                      onChange={(e) => setBookingStartDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Number of Days</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={bookingDays}
                      onChange={(e) => setBookingDays(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      required
                    />
                  </div>
                </div>

                {bookingModalItem.driverAvailable && (
                  <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={withDriver}
                      onChange={(e) => setWithDriver(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-stone-800">Include Certified Driver / Operator</p>
                      <p className="text-[11px] text-stone-500">+₹{bookingModalItem.driverWageExtra}/day extra</p>
                    </div>
                  </label>
                )}

                {/* Price Breakdown */}
                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>Machinery Rent ({bookingDays} days × ₹{bookingModalItem.rentPerDay})</span>
                    <span>₹{(bookingDays * bookingModalItem.rentPerDay).toLocaleString()}</span>
                  </div>
                  {withDriver && (
                    <div className="flex justify-between text-stone-600">
                      <span>Operator Wage ({bookingDays} days × ₹{bookingModalItem.driverWageExtra})</span>
                      <span>₹{(bookingDays * (bookingModalItem.driverWageExtra || 0)).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Refundable Security Deposit</span>
                    <span>₹{bookingModalItem.deposit.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-purple-200 flex justify-between font-bold text-sm text-purple-950">
                    <span>Total Estimated Payable</span>
                    <span>
                      ₹{(
                        (bookingDays * bookingModalItem.rentPerDay) +
                        (withDriver ? bookingDays * (bookingModalItem.driverWageExtra || 0) : 0) +
                        bookingModalItem.deposit
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow-md transition"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingModalItem(null)}
                    className="px-4 py-3 bg-stone-100 text-stone-700 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Equipment Rental Modal */}
      <AddEquipmentRentalModal
        isOpen={showAddRentalModal}
        onClose={() => setShowAddRentalModal(false)}
      />
    </div>
  );
};
