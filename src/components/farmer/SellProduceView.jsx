import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Wheat,
  Plus,
  MapPin,
  Calendar,
  Phone,
  CheckCircle2,
  TrendingUp,
  Tag,
  Sparkles
} from 'lucide-react';

export const SellProduceView = () => {
  const { farmerProduce, addProduceListing, t, farmerProfile } = useAgriStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [crop, setCrop] = useState('Cotton (कापूस)');
  const [quantity, setQuantity] = useState(20);
  const [unit, setUnit] = useState('Quintals');
  const [askingPrice, setAskingPrice] = useState(7200);
  const [grade, setGrade] = useState('Grade A (Clean & Long Staple)');
  const [harvestDate, setHarvestDate] = useState('Expected Oct 2026');
  const [selectedBuyerListing, setSelectedBuyerListing] = useState(null);

  const handleSubmitListing = (e) => {
    e.preventDefault();
    addProduceListing({
      crop,
      quantity: Number(quantity),
      unit,
      askingPrice: Number(askingPrice),
      priceUnit: `per ${unit.slice(0, -1)}`,
      grade,
      harvestDate,
      image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=600&auto=format&fit=crop&q=60"
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-semibold mb-3 border border-amber-400/30">
            🌾 Direct Farmer-to-Trader Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Sell Harvested Produce & Connect with Buyers
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Eliminate commission middlemen. List your crop lots directly to grain aggregators, food processors, and wholesale buyers at your demanded farm-gate price.
          </p>

          <div className="mt-5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>List New Crop for Sale</span>
            </button>
          </div>
        </div>
        <Wheat className="absolute -right-6 -bottom-6 w-48 h-48 text-amber-600/20 pointer-events-none" />
      </div>

      {/* Indicative MSP & Mandi Price Ticker */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-stone-800">Govt Minimum Support Price (MSP) 2026 Reference:</span>
        </div>
        <div className="flex flex-wrap gap-4 text-stone-600">
          <span>Cotton (Medium Staple): <strong className="text-stone-900">₹7,121/Qtl</strong></span>
          <span>•</span>
          <span>Soybean (Yellow): <strong className="text-stone-900">₹4,892/Qtl</strong></span>
          <span>•</span>
          <span>Wheat: <strong className="text-stone-900">₹2,425/Qtl</strong></span>
        </div>
      </div>

      {/* Produce Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmerProduce.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.crop}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {p.crop}
                </span>
                <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {p.grade}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-stone-900 font-serif">
                    ₹{p.askingPrice.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ {p.unit.slice(0, -1)}</span>
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Lot: {p.quantity} {p.unit}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>Location: {p.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Harvest Date: {p.harvestDate}</span>
                  </p>
                  <p className="text-stone-700">
                    Farmer: <strong>{p.sellerName}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedBuyerListing(p)}
                className="w-full py-2.5 bg-stone-900 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Farmer / Make Bid</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* List Produce Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-6 sm:p-7 border border-stone-200 space-y-4">
            <h4 className="font-bold text-base text-stone-900">List Your Produce for Sale</h4>
            <form onSubmit={handleSubmitListing} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Crop Name & Variety</label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="Quintals">Quintals</option>
                    <option value="Tons">Tons</option>
                    <option value="Bags">Bags (50kg)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Asking Price (₹ / {unit.slice(0, -1)})</label>
                <input
                  type="number"
                  min="100"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Quality Grade</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. Grade A, FAQ, Organic"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Harvest Availability</label>
                <input
                  type="text"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow"
                >
                  Publish Listing
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Buyer Contact Modal */}
      {selectedBuyerListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 border border-stone-200 space-y-4 text-xs">
            <h4 className="font-bold text-base text-stone-900">Direct Contact with {selectedBuyerListing.sellerName}</h4>
            <div className="bg-stone-50 p-3 rounded-xl space-y-1 text-stone-700">
              <p><strong>Crop:</strong> {selectedBuyerListing.crop}</p>
              <p><strong>Available Lot:</strong> {selectedBuyerListing.quantity} {selectedBuyerListing.unit}</p>
              <p><strong>Asking Price:</strong> ₹{selectedBuyerListing.askingPrice} {selectedBuyerListing.priceUnit}</p>
              <p><strong>Village:</strong> {selectedBuyerListing.location}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`tel:${selectedBuyerListing.sellerPhone}`}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call {selectedBuyerListing.sellerPhone}</span>
              </a>
              <button
                onClick={() => setSelectedBuyerListing(null)}
                className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
