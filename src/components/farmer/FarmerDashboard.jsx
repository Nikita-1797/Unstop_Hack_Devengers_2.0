import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import { MarketplaceView } from './MarketplaceView';
import { WorkerRequirementView } from './WorkerRequirementView';
import { EquipmentRentalView } from './EquipmentRentalView';
import { GovernmentSchemesView } from './GovernmentSchemesView';
import { NearbyShopsMap } from './NearbyShopsMap';
import { WeatherAdvisoryView } from './WeatherAdvisoryView';
import { MyFarmAndCalendar } from './MyFarmAndCalendar';
import { SellProduceView } from './SellProduceView';
import { AddEquipmentRentalModal } from '../forms/AddEquipmentRentalModal';
import { WorkerJobSeekerModal } from '../forms/WorkerJobSeekerModal';
import {
  Sprout,
  Users,
  Tractor,
  Landmark,
  Store,
  CloudSun,
  Layers,
  Wheat,
  Bot,
  Search,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShoppingBag,
  PlusCircle,
  UserCheck,
  LogIn
} from 'lucide-react';

export const FarmerDashboard = ({ onOpenCart, onOpenAI, onOpenAuth }) => {
  const {
    activeFarmerTab,
    setActiveFarmerTab,
    farmerProfile,
    currentUser,
    weather,
    t,
    jobs,
    workers,
    equipment,
    equipmentBookings,
    orders
  } = useAgriStore();

  const [heroSearch, setHeroSearch] = useState('');
  const [showAddRentalModal, setShowAddRentalModal] = useState(false);
  const [showWorkerRegModal, setShowWorkerRegModal] = useState(false);

  const displayName = currentUser ? currentUser.name : (farmerProfile ? farmerProfile.name : "Farmer");
  const displayLocation = currentUser ? currentUser.village : (farmerProfile ? `${farmerProfile.village}, ${farmerProfile.district}` : "Local Village");
  const displayLand = currentUser?.totalLandAcres || farmerProfile?.totalLandAcres || 0;

  const quickServices = [
    {
      id: 'marketplace',
      title: t.nav.marketplace,
      desc: 'Certified hybrid seeds, urea & bio-pesticides',
      icon: Sprout,
      color: 'from-emerald-600 to-green-700',
      badge: 'Certified Inputs'
    },
    {
      id: 'workers',
      title: t.nav.workers,
      desc: 'Land acreage calculator & local labor hiring',
      icon: Users,
      color: 'from-amber-600 to-yellow-700',
      badge: `${workers.length} Available`
    },
    {
      id: 'equipment',
      title: t.nav.equipment,
      desc: 'Rent 45HP tractors, rotavators & bullocks',
      icon: Tractor,
      color: 'from-purple-600 to-indigo-700',
      badge: `${equipment.length} Listed`
    },
    {
      id: 'schemes',
      title: t.nav.schemes,
      desc: 'PM-Kisan, SMAM 50% subsidy & eligibility check',
      icon: Landmark,
      color: 'from-blue-600 to-cyan-700',
      badge: 'Subsidy Wizard'
    },
    {
      id: 'shops',
      title: t.nav.shops,
      desc: 'Interactive map of dealers & veterinary clinics',
      icon: Store,
      color: 'from-teal-600 to-emerald-700',
      badge: 'Dealer Map'
    },
    {
      id: 'aiAssistant',
      title: 'AI Farming Assistant',
      desc: 'Speech/text crop diagnosis & weather advice',
      icon: Bot,
      color: 'from-rose-600 to-pink-700',
      badge: 'Voice Enabled',
      isAction: true,
      action: onOpenAI
    },
    {
      id: 'weather',
      title: t.nav.weather,
      desc: '80% rain forecast & pesticide spray advisory',
      icon: CloudSun,
      color: 'from-sky-600 to-blue-700',
      badge: 'Live Radar'
    },
    {
      id: 'myfarm',
      title: t.nav.myFarm,
      desc: `${displayLand > 0 ? `${displayLand} Acres digital twin` : 'Set up your farm land & crops'}`,
      icon: Layers,
      color: 'from-stone-700 to-stone-900',
      badge: 'Crop Calendar'
    },
    {
      id: 'sell',
      title: t.nav.sellProduce,
      desc: 'Direct produce selling at MSP to aggregators',
      icon: Wheat,
      color: 'from-orange-600 to-amber-700',
      badge: '0% Brokerage'
    }
  ];

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    const q = heroSearch.toLowerCase();
    if (q.includes('worker') || q.includes('labor') || q.includes('मजदूर')) {
      setActiveFarmerTab('workers');
    } else if (q.includes('tractor') || q.includes('rotavator') || q.includes('equipment') || q.includes('animal') || q.includes('bullock')) {
      setActiveFarmerTab('equipment');
    } else if (q.includes('scheme') || q.includes('subsidy') || q.includes('kisan') || q.includes('pm')) {
      setActiveFarmerTab('schemes');
    } else if (q.includes('shop') || q.includes('store') || q.includes('dealer')) {
      setActiveFarmerTab('shops');
    } else if (q.includes('weather') || q.includes('rain')) {
      setActiveFarmerTab('weather');
    } else if (q.includes('sell') || q.includes('produce')) {
      setActiveFarmerTab('sell');
    } else {
      setActiveFarmerTab('marketplace');
    }
  };

  return (
    <div className="space-y-8">
      {/* If Guest, show friendly registration banner */}
      {!currentUser && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-300 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-emerald-950 text-sm">
                Welcome! Currently browsing as Guest (अतिथि मोड)
              </p>
              <p className="text-xs text-emerald-800">
                Register as a Farmer, Worker, or Equipment Owner to post jobs, hire labor, and list machinery.
              </p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Register / Login (खाता बनाएं)</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation Pill Bar */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'home', label: t.nav.home, icon: Sprout },
            { id: 'marketplace', label: t.nav.marketplace, icon: ShoppingBag },
            { id: 'workers', label: t.nav.workers, icon: Users },
            { id: 'equipment', label: t.nav.equipment, icon: Tractor },
            { id: 'schemes', label: t.nav.schemes, icon: Landmark },
            { id: 'shops', label: t.nav.shops, icon: Store },
            { id: 'weather', label: t.nav.weather, icon: CloudSun },
            { id: 'myfarm', label: t.nav.myFarm, icon: Layers },
            { id: 'sell', label: t.nav.sellProduce, icon: Wheat }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFarmerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFarmerTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected View */}
      {activeFarmerTab === 'home' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-300 font-semibold text-xs tracking-wider uppercase">
                  {t.hero.greeting}, {displayName} 👋
                </span>
                <span className="text-stone-400 text-xs">•</span>
                <span className="text-emerald-200 text-xs">{displayLocation}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif leading-tight">
                {t.hero.question}
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/85 max-w-lg leading-relaxed">
                Connect with agricultural workers, order seeds, rent equipment, check government subsidies, or consult your AI assistant.
              </p>

              {/* Universal Search Bar */}
              <form onSubmit={handleHeroSearchSubmit} className="pt-2">
                <div className="bg-white rounded-2xl p-1.5 flex items-center shadow-lg border border-emerald-500/20 max-w-xl">
                  <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder={t.hero.searchPlaceholder}
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2 text-stone-800 focus:outline-none placeholder:text-stone-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition shadow"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Direct Form Triggers in Hero */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => setShowAddRentalModal(true)}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 flex items-center gap-1.5 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Offer Equipment/Animal for Rent</span>
                </button>

                <button
                  onClick={() => setShowWorkerRegModal(true)}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 flex items-center gap-1.5 transition"
                >
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  <span>Need Work? Register Worker</span>
                </button>
              </div>
            </div>

            <Sprout className="absolute -right-10 -bottom-10 w-72 h-72 text-emerald-700/20 pointer-events-none" />
          </div>

          {/* Quick Metrics & Weather Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Weather Card */}
            <div
              onClick={() => setActiveFarmerTab('weather')}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-sky-400 transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">Today's Weather</span>
                <span className="text-xl font-bold text-stone-900 mt-1 block">{weather.temp}°C • {weather.condition}</span>
                <span className="text-xs text-blue-600 font-semibold mt-0.5 block">🌧️ {weather.rainProbability}% Rain Chance</span>
              </div>
              <CloudSun className="w-10 h-10 text-sky-500 shrink-0" />
            </div>

            {/* Farm Crops */}
            <div
              onClick={() => setActiveFarmerTab('myfarm')}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-emerald-400 transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">My Farm Crops</span>
                <span className="text-xl font-bold text-stone-900 mt-1 block">{displayLand > 0 ? `${displayLand} Acres Holding` : 'Setup Land'}</span>
                <span className="text-xs text-emerald-700 font-semibold mt-0.5 block">
                  {farmerProfile ? `🌱 ${farmerProfile.currentCrops?.[0]?.name || 'Cotton'}` : 'Click to register farm'}
                </span>
              </div>
              <Layers className="w-10 h-10 text-emerald-600 shrink-0" />
            </div>

            {/* Active Workers & Jobs */}
            <div
              onClick={() => setActiveFarmerTab('workers')}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-amber-400 transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">Farm Labor Posts</span>
                <span className="text-xl font-bold text-stone-900 mt-1 block">{jobs.length} Active Jobs</span>
                <span className="text-xs text-amber-700 font-semibold mt-0.5 block">👷 {workers.length} Registered Workers</span>
              </div>
              <Users className="w-10 h-10 text-amber-600 shrink-0" />
            </div>

            {/* Orders & Rentals */}
            <div
              onClick={onOpenCart}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-400 transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">Orders & Rentals</span>
                <span className="text-xl font-bold text-stone-900 mt-1 block">{orders.length} Active Orders</span>
                <span className="text-xs text-purple-700 font-semibold mt-0.5 block">🚜 {equipment.length} Machinery Listed</span>
              </div>
              <Tractor className="w-10 h-10 text-purple-600 shrink-0" />
            </div>
          </div>

          {/* Quick Services Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                All Essential Farming Services
              </h2>
              <span className="text-xs text-stone-500">Everything in one single platform</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {quickServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      if (service.isAction) {
                        service.action();
                      } else {
                        setActiveFarmerTab(service.id);
                      }
                    }}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-700 transition">
                        {service.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-emerald-700">
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeFarmerTab === 'marketplace' && <MarketplaceView onOpenCart={onOpenCart} />}
      {activeFarmerTab === 'workers' && <WorkerRequirementView />}
      {activeFarmerTab === 'equipment' && <EquipmentRentalView />}
      {activeFarmerTab === 'schemes' && <GovernmentSchemesView />}
      {activeFarmerTab === 'shops' && <NearbyShopsMap />}
      {activeFarmerTab === 'weather' && <WeatherAdvisoryView />}
      {activeFarmerTab === 'myfarm' && <MyFarmAndCalendar />}
      {activeFarmerTab === 'sell' && <SellProduceView />}

      {/* Modals for forms */}
      <AddEquipmentRentalModal
        isOpen={showAddRentalModal}
        onClose={() => setShowAddRentalModal(false)}
      />

      <WorkerJobSeekerModal
        isOpen={showWorkerRegModal}
        onClose={() => setShowWorkerRegModal(false)}
      />
    </div>
  );
};
