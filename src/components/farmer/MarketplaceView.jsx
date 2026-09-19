import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Sprout,
  Filter,
  Search,
  Star,
  ShoppingBag,
  CheckCircle2,
  Leaf,
  MapPin,
  ShieldCheck,
  Plus,
  ArrowRight
} from 'lucide-react';

export const MarketplaceView = ({ onOpenCart }) => {
  const { products, addToCart, t } = useAgriStore();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Irrigation', 'Farming Tools'];
  const cropFilters = ['All', 'Cotton', 'Wheat', 'Soybean', 'All Crops'];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesCrop = selectedCrop === 'All' || p.cropSuitability.toLowerCase().includes(selectedCrop.toLowerCase()) || p.cropSuitability === 'All Crops';
    const matchesOrganic = !onlyOrganic || p.isOrganic;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesCrop && matchesOrganic && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            🌱 Certified Agricultural Inputs Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Certified Seeds, Fertilizers & Irrigation Hub
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Order certified Bt cotton and wheat seeds, Nano Urea, cold-pressed neem bio-pesticides, and micro-irrigation hardware directly from authorized Kendra distributors.
          </p>
        </div>
        <Sprout className="absolute -right-6 -bottom-6 w-48 h-48 text-emerald-600/20 pointer-events-none" />
      </div>

      {/* Filters & Search Header */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search certified seeds, fertilizers, neem oil, sprayers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={(e) => setOnlyOrganic(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Organic Only</span>
            </label>

            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="font-semibold whitespace-nowrap">Crop:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="text-xs px-2.5 py-2 rounded-xl border border-stone-300 bg-white font-medium"
              >
                {cropFilters.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-emerald-500/50 transition group"
          >
            <div>
              <div className="relative h-44 bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProductDetails(p)}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
                {p.isOrganic && (
                  <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> Bio / Organic
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Suitability: {p.cropSuitability}
                  </span>
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="ml-1 text-stone-800 text-[11px]">{p.rating}</span>
                  </div>
                </div>

                <h3
                  onClick={() => setSelectedProductDetails(p)}
                  className="font-bold text-stone-900 text-sm hover:text-emerald-700 cursor-pointer line-clamp-1"
                >
                  {p.name}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                <p className="text-[11px] text-stone-400">
                  Seller: <strong>{p.seller}</strong>
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 mt-2">
              <div className="flex items-baseline justify-between py-2">
                <div>
                  <span className="text-base font-extrabold text-stone-900 font-serif">₹{p.price.toLocaleString()}</span>
                  <span className="text-[10px] text-stone-400 ml-1">/ {p.unit}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">In Stock</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(p, 1)}
                  className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-emerald-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(p, 1);
                    onOpenCart();
                  }}
                  className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition"
                  title="Buy Now"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-7 border border-stone-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedProductDetails.category}
                </span>
                <h3 className="font-bold text-lg text-stone-900 mt-1">{selectedProductDetails.name}</h3>
              </div>
              <button onClick={() => setSelectedProductDetails(null)} className="text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <img
              src={selectedProductDetails.image}
              alt={selectedProductDetails.name}
              className="w-full h-48 object-cover rounded-2xl"
            />

            <p className="text-xs text-stone-600 leading-relaxed">
              {selectedProductDetails.description}
            </p>

            <div className="bg-stone-50 p-3.5 rounded-xl text-xs space-y-1.5 border border-stone-100">
              <div className="flex justify-between">
                <span className="text-stone-500">Crop Suitability:</span>
                <span className="font-bold text-stone-800">{selectedProductDetails.cropSuitability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Packaging Size:</span>
                <span className="font-bold text-stone-800">{selectedProductDetails.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Authorized Seller:</span>
                <span className="font-bold text-stone-800">{selectedProductDetails.seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shop Location:</span>
                <span className="font-bold text-stone-800">{selectedProductDetails.sellerLocation}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xl font-extrabold text-stone-900 font-serif">₹{selectedProductDetails.price}</span>
                <span className="text-xs text-stone-400 ml-1">/ {selectedProductDetails.unit}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToCart(selectedProductDetails, 1);
                    setSelectedProductDetails(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
