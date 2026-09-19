import React from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  CloudRain,
  Sun,
  CloudLightning,
  Droplets,
  Wind,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Calendar,
  Thermometer
} from 'lucide-react';

export const WeatherAdvisoryView = () => {
  const { weather, t } = useAgriStore();

  const getIcon = (icon) => {
    switch (icon) {
      case 'cloud-rain': return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'cloud-lightning': return <CloudLightning className="w-6 h-6 text-amber-500" />;
      default: return <Sun className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-blue-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/30 text-sky-200 text-xs font-semibold mb-3 border border-sky-400/30">
            🌦️ Hyperlocal Meteorological Advisory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Weather Forecast & Agronomic Advisory
          </h2>
          <p className="text-sky-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Real-time rainfall probabilities, humidity conditions, and AI-driven recommendations to protect fertilizer investments and optimize irrigation cycles.
          </p>
        </div>
        <CloudRain className="absolute -right-6 -bottom-6 w-48 h-48 text-sky-600/20 pointer-events-none" />
      </div>

      {/* Critical Weather Alert Box */}
      <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-3xl flex items-start gap-4 shadow-sm">
        <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0 mt-0.5">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-amber-950 text-sm sm:text-base">High-Priority Farm Advisory Alert</h3>
          <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
            {weather.advisoryAlert}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-amber-200/70 text-amber-900 px-2.5 py-1 rounded-lg">
              ✓ Postpone Chemical Sprays
            </span>
            <span className="bg-amber-200/70 text-amber-900 px-2.5 py-1 rounded-lg">
              ✓ Turn Off Drip Lines
            </span>
            <span className="bg-amber-200/70 text-amber-900 px-2.5 py-1 rounded-lg">
              ✓ Clear Trench Outlets
            </span>
          </div>
        </div>
      </div>

      {/* Current Conditions Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 block">Temperature</span>
            <span className="text-2xl font-bold text-stone-900">{weather.temp}°C</span>
            <span className="text-[10px] text-stone-400 block">{weather.condition}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 block">Rain Probability</span>
            <span className="text-2xl font-bold text-blue-700">{weather.rainProbability}%</span>
            <span className="text-[10px] text-stone-400 block">Scattered rain today</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 block">Humidity</span>
            <span className="text-2xl font-bold text-stone-900">{weather.humidity}%</span>
            <span className="text-[10px] text-teal-600 font-semibold block">Fungal risk high</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-stone-100 text-stone-700 rounded-xl">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 block">Wind Velocity</span>
            <span className="text-2xl font-bold text-stone-900">{weather.windSpeed} km/h</span>
            <span className="text-[10px] text-stone-400 block">Gentle breeze</span>
          </div>
        </div>
      </div>

      {/* 5-Day Extended Forecast */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-600" />
          5-Day Weather Forecast & Farm Action Plan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {weather.forecast.map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center space-y-2 transition ${
                idx === 1
                  ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-400/20'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <span className="font-bold text-xs text-stone-800 block">{f.day}</span>
              <div className="flex justify-center my-1">{getIcon(f.icon)}</div>
              <span className="text-xl font-bold text-stone-900 block">{f.temp}°C</span>
              <span className="text-xs font-semibold text-blue-700 block">
                Rain: {f.rain}%
              </span>
              <span className="text-[11px] text-stone-500 block line-clamp-1">
                {f.condition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
