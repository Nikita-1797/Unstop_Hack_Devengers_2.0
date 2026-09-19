import React from 'react';
import { Sprout, Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { useAgriStore } from '../../context/AgriStoreContext';

export const Footer = () => {
  const { t, setCurrentRole, setActiveFarmerTab } = useAgriStore();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Platform Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-serif">KrishiSetu</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              An all-in-one digital agriculture ecosystem unifying seeds, farm labor, machinery rentals, government schemes, and intelligent AI advisory to empower Indian smallholder farmers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Government Agricultural Partner</span>
            </div>
          </div>

          {/* Col 2: Farmer Quick Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Farmer Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setCurrentRole('farmer'); setActiveFarmerTab('marketplace'); }}
                  className="hover:text-emerald-400 transition"
                >
                  🌱 Buy Seeds, Fertilizers & Drip
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentRole('farmer'); setActiveFarmerTab('workers'); }}
                  className="hover:text-emerald-400 transition"
                >
                  👨‍🌾 Farm Worker Labor Matching
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentRole('farmer'); setActiveFarmerTab('equipment'); }}
                  className="hover:text-emerald-400 transition"
                >
                  🚜 Tractor & Equipment Rental
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentRole('farmer'); setActiveFarmerTab('schemes'); }}
                  className="hover:text-emerald-400 transition"
                >
                  🏛️ Government Scheme Eligibility
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentRole('farmer'); setActiveFarmerTab('shops'); }}
                  className="hover:text-emerald-400 transition"
                >
                  🏪 Nearby Agriculture Shops Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentRole('farmer'); setActiveFarmerTab('sell'); }}
                  className="hover:text-emerald-400 transition"
                >
                  🌾 Sell Harvested Farm Produce
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Portals & Helplines */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Official Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition">
                  <span>PM-KISAN Samman Nidhi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition">
                  <span>PM Fasal Bima Yojana</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://mahadbt.maharashtra.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition">
                  <span>MahaDBT Farmer Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition">
                  <span>Agmarknet Mandi Prices</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition">
                  <span>National Soil Health Card Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Helplines & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Emergency & Helpline</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-800 rounded-xl border border-stone-700">
                <p className="text-stone-400 mb-1 font-medium">Kisan Call Centre (24x7)</p>
                <a href="tel:18001801551" className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Phone className="w-4 h-4" /> 1800-180-1551
                </a>
                <p className="text-[10px] text-stone-500 mt-1">Available in 22 regional languages</p>
              </div>

              <div className="flex items-center gap-2 text-stone-400">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Krishi Bhavan, New Delhi & District Agri Offices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 KrishiSetu (कृषिसेतू). Built with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500" /> for Indian Farmers.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Kisan Helpdesk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
