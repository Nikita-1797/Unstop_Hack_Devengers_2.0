import React, { useState, useEffect, useRef } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import L from 'leaflet';
import {
  Store,
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  Sparkles,
  Map,
  List
} from 'lucide-react';

export const NearbyShopsMap = () => {
  const { shops } = useAgriStore();

  const [viewMode, setViewMode] = useState('both'); // 'map' | 'list' | 'both'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxDistance, setMaxDistance] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const categories = ['All', 'Seeds & Fertilizers', 'Irrigation & Tools', 'Pesticides & Bio-fertilizers', 'Equipment Service & Spares', 'Animal Health & Feed'];

  const filteredShops = shops.filter(shop => {
    const distNum = parseFloat(shop.distance);
    const matchesDist = isNaN(distNum) || distNum <= maxDistance;
    const matchesCat = selectedCategory === 'All' || shop.category === selectedCategory;
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.featuredBrands.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDist && matchesCat && matchesSearch;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default to Jalgaon, Maharashtra coordinates
      const map = L.map(mapContainerRef.current).setView([21.0077, 75.5626], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add Farmer's Home Marker
      const farmerIcon = L.divIcon({
        className: 'custom-farmer-icon',
        html: `<div style="background-color:#15803d; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; border:3px solid white; box-shadow:0 4px 6px -1px rgba(0,0,0,0.3);">🏡</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      L.marker([21.0040, 75.5600], { icon: farmerIcon })
        .addTo(map)
        .bindPopup('<b>Your Farm / Location</b><br/>Asoda Road, Jalgaon');

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // Add Shop Markers
    filteredShops.forEach(shop => {
      const shopIcon = L.divIcon({
        className: 'custom-shop-icon',
        html: `<div style="background-color:#2563eb; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; border:2.5px solid white; box-shadow:0 4px 6px -1px rgba(0,0,0,0.3);">🏪</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([shop.lat, shop.lng], { icon: shopIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:sans-serif; min-width:180px;">
            <b style="font-size:13px; color:#1e293b;">${shop.name}</b><br/>
            <span style="font-size:11px; color:#64748b;">${shop.category}</span><br/>
            <span style="font-size:11px; color:#16a34a; font-weight:bold;">📍 ${shop.distance} away</span><br/>
            <span style="font-size:11px; color:#475569;">📞 ${shop.phone}</span>
          </div>
        `);

      marker.on('click', () => {
        setSelectedShop(shop);
      });

      markersRef.current.push(marker);
    });

    return () => {
      // Map cleanup on unmount
    };
  }, [filteredShops]);

  const panToShop = (shop) => {
    setSelectedShop(shop);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([shop.lat, shop.lng], 15, { duration: 1.2 });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-semibold mb-3 border border-teal-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Killer Feature #5: Geo-Location Agri Store Discovery
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Nearby Agricultural Shops & Dealerships
          </h2>
          <p className="text-teal-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Locate certified fertilizer distribution centers, seed dealers, tractor repair workshops, and veterinary pharmacies in your taluka with live opening hours and instant phone contact.
          </p>
        </div>
        <Store className="absolute -right-6 -bottom-6 w-48 h-48 text-teal-600/20 pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search stores by name, area, or brand (e.g. IFFCO, Bayer, Jain Drip)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="font-semibold whitespace-nowrap">Radius:</span>
              <select
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="text-xs px-2.5 py-2 rounded-xl border border-stone-300 bg-white font-medium"
              >
                <option value={5}>Within 5 km</option>
                <option value={10}>Within 10 km</option>
                <option value={25}>Within 25 km</option>
              </select>
            </div>

            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setViewMode('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'both' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'map' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                <Map className="w-3.5 h-3.5 inline mr-1" /> Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                <List className="w-3.5 h-3.5 inline mr-1" /> List
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-teal-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Map and Store Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map View */}
        {(viewMode === 'map' || viewMode === 'both') && (
          <div className={`${viewMode === 'both' ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl border border-stone-200 p-2 shadow-sm relative h-[500px]`}>
            <div ref={mapContainerRef} className="w-full h-full rounded-2xl" />

            <div className="absolute top-5 right-5 z-[1000] bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl shadow border border-stone-200 text-xs font-bold text-stone-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span>{filteredShops.length} Stores in Jalgaon Region</span>
            </div>
          </div>
        )}

        {/* Store Cards List */}
        {(viewMode === 'list' || viewMode === 'both') && (
          <div className={`${viewMode === 'both' ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4 max-h-[500px] overflow-y-auto pr-1`}>
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => panToShop(shop)}
                className={`bg-white p-4 sm:p-5 rounded-2xl border transition cursor-pointer ${
                  selectedShop?.id === shop.id
                    ? 'border-teal-600 ring-2 ring-teal-500/20 bg-teal-50/20'
                    : 'border-stone-200 hover:border-teal-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {shop.category}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base mt-1.5">
                      {shop.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg shrink-0">
                    📍 {shop.distance}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{shop.address}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{shop.hours}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-medium text-stone-800">
                    <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{shop.phone}</span>
                  </p>
                </div>

                {shop.hasSubsidizedFertilizer && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50/70 px-2 py-1 rounded-lg">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Govt Subsidized Urea & DAP Counter Open</span>
                  </div>
                )}

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1">
                  {shop.featuredBrands.map((brand, i) => (
                    <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                      {brand}
                    </span>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex gap-2">
                  <a
                    href={`tel:${shop.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Store</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      panToShop(shop);
                    }}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Locate on Map</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
