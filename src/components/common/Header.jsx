import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Sprout,
  User,
  ShoppingBag,
  Bell,
  Globe,
  Bot,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Menu,
  X,
  PhoneCall,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

export const Header = ({ onOpenCart, onOpenAI, onOpenAuth }) => {
  const {
    currentUser,
    logout,
    currentRole,
    setCurrentRole,
    language,
    setLanguage,
    t,
    cart,
    notifications,
    markAllNotificationsRead,
    weather,
    activeFarmerTab,
    setActiveFarmerTab
  } = useAgriStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const roleOptions = [
    { id: 'farmer', label: '👨‍🌾 ' + t.roles.farmer, bg: 'bg-emerald-600' },
    { id: 'worker', label: '👷 ' + t.roles.worker, bg: 'bg-amber-600' },
    { id: 'seller', label: '🏪 ' + t.roles.seller, bg: 'bg-blue-600' },
    { id: 'owner', label: '🚜 ' + t.roles.owner, bg: 'bg-purple-600' },
    { id: 'admin', label: '👑 ' + t.roles.admin, bg: 'bg-rose-700' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-stone-200">
      {/* Top Advisory Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-700 text-white">
              🌦️ {weather.location}
            </span>
            <span className="hidden sm:inline font-medium">
              {weather.temp}°C, {weather.condition} • Rain chance: {weather.rainProbability}%
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
              <span>Kisan Helpline: <strong>1800-180-1551</strong> (Toll Free)</span>
            </div>
            <span className="text-emerald-400 hidden md:inline">|</span>
            <span className="hidden md:inline font-medium text-emerald-200">
              🇮🇳 National Agriculture Portal Partner
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => {
              if (currentRole === 'farmer') setActiveFarmerTab('home');
            }}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">KrishiSetu</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">कृषिसेतू</span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium leading-none">Smart Farming Ecosystem</p>
            </div>
          </div>

          {/* Role Switcher Pill Bar */}
          <div className="hidden lg:flex items-center bg-stone-100 p-1 rounded-full border border-stone-200">
            <span className="text-[11px] font-bold text-stone-500 uppercase px-2.5">Switch View:</span>
            {roleOptions.map(r => (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                  currentRole === r.id
                    ? `${r.bg} text-white shadow-sm scale-105`
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Auth, Language, AI, Notifications, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Login / Profile Trigger */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 transition shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span className="hidden md:inline truncate max-w-[120px]">{currentUser.name}</span>
                  <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.2 rounded font-semibold uppercase">
                    {currentUser.role}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 p-3 animate-in fade-in space-y-2">
                    <div className="pb-2 border-b border-stone-100 text-xs">
                      <p className="font-bold text-stone-900">{currentUser.name}</p>
                      <p className="text-[11px] text-stone-500">{currentUser.phone}</p>
                      <p className="text-[11px] text-stone-500">{currentUser.village || 'Jalgaon'}</p>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl flex items-center gap-2 px-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out (लॉग आउट)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200 text-xs">
              <Globe className="w-3.5 h-3.5 text-stone-500 mx-1" />
              {[
                { code: 'en', label: 'EN' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'mr', label: 'मराठी' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-0.5 rounded font-medium transition-colors ${
                    language === lang.code
                      ? 'bg-white text-emerald-800 font-bold shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-xs font-semibold shadow hover:shadow-md hover:from-emerald-700 hover:to-teal-700 transition"
              title="Open Krishi AI Assistant"
            >
              <Bot className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllNotificationsRead();
                }}
                className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      Live Farming Alerts & Updates
                    </h4>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2 divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-stone-400 py-4 text-center">No alerts right now.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="py-2.5 flex items-start gap-2.5">
                          <div className="mt-0.5">
                            {n.type === 'weather' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                            ) : n.type === 'equipment' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Clock className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-stone-900">{n.title}</p>
                            <p className="text-xs text-stone-600 mt-0.5 leading-snug">{n.message}</p>
                            <span className="text-[10px] text-stone-400 mt-1 inline-block">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            {currentRole === 'farmer' && (
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-1.5 p-2 px-3 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 text-xs font-semibold transition"
                title="View Shopping Cart & Orders"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">Cart</span>
                {totalCartItems > 0 && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {totalCartItems}
                  </span>
                )}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Role Switcher Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 pb-2 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase">Select Active Role:</p>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRole(r.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs font-semibold p-2 rounded-lg text-left ${
                    currentRole === r.id
                      ? `${r.bg} text-white`
                      : 'bg-stone-100 text-stone-800'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {!currentUser && (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Login / Register Account
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
