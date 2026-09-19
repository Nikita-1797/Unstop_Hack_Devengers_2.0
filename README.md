
# 🌾 KrishiSetu (कृषिसेतु) - All-in-One Smart Farming Ecosystem

An all-in-one digital agriculture platform engineered for smallholder and rural Indian farmers. KrishiSetu unifies certified agricultural inputs, smart farm labor matching, equipment & livestock rental, government scheme eligibility discovery, hyperlocal weather alerts, interactive store maps, and voice-assisted AI agronomy into a single, high-performance web ecosystem.



## 🚀 How to Run the Application

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Launch Vite development server
npm run dev

# 3. Open your browser at:
http://localhost:3000
```

---

## 🌟 5 Killer Hackathon Modules

### 1. 👨‍🌾 Smart Farm Worker Labor Matching Engine
- **Acreage & Wage Calculator**: Enter land size (e.g. 5 acres), work type (Cotton harvesting, weeding, spraying), required worker count, and daily wage (₹500/day).
- **Dynamic Economics**: Calculates daily wage burn (`8 workers × ₹500 = ₹4,000/day`) and estimated project completion budget.
- **Local Workers Feed**: Displays distance, skills, star ratings, and direct contact options. Broadcasts requirements to the local worker pool.

### 2. 🚜 Equipment & Animal Sharing Marketplace
- **Machinery Rentals**: 45HP Tractors (Mahindra, John Deere), Rotavators, Cultivators, 5HP Water Pumps, and Boom Sprayers.
- **Transparent Terms**: Daily rent rates, refundable security deposit, driver/operator add-on (+₹400/day), and live availability ("Available Tomorrow").
- **Livestock (Bullocks & Cattle)**: Working Khillari bullocks for ploughing, Gir cows, and Murrah buffaloes with veterinary health verification certificates.

### 3. 🏛️ Smart Government Scheme Discovery & Eligibility Wizard
- **Natural Language Search**: e.g., *"I have 3 acres and grow cotton"*.
- **"Check My Eligibility" Wizard**: 4-step questionnaire (Land size, crop, social category, subsidy priority) that computes confidence match scores (e.g., 98% Match for PM-KISAN, 94% for PMKSY Drip Subsidy).
- **Interactive Document Checklist**: Ticking off 7/12 Land Extracts (सातबारा), Aadhaar, Bank passbook, and direct links to official portals (pmkisan.gov.in, mahadbt.maharashtra.gov.in).

### 4. 🤖 AI Farming Assistant (Krishi AI) + Voice Interaction
- **Speech-to-Text & Text-to-Speech**: Rural farmers can speak in Hindi, Marathi, or English and listen to audio playback of recommendations.
- **Agronomic Heuristics Engine**: Instant diagnosis of cotton yellow leaf reddening, pink bollworm traps, wheat CRI irrigation timing, and humidity-triggered fungal precautions.
- **Weather Context Awareness**: Automatically references live weather (e.g., *80% rain forecast: postpone spraying*).
- **Gemini API Key Drawer**: Optional live generative AI hook with automatic fallback to the internal expert engine.
- **Agricultural Safety Guardrails**: Highlights mandatory KVK consultation for toxic chemical dosages.

### 5. 🏪 Location-Based Agriculture Shops & Interactive Map
- **Leaflet & OpenStreetMap**: Geocoded dealership pins across the district with category filters (Seeds & Fertilizers, Irrigation, Equipment Repair, Veterinary).
- **Radius Slider**: Filter within 5 km, 10 km, or 25 km radius.
- **Store Badges**: Highlights authorized subsidized fertilizer counters (Urea & DAP).

---

## 👥 Multi-Role Demo Switcher (Top Navbar)

To present this to judges, use the sticky top role switcher bar:
1. **👨‍🌾 Farmer**: Marketplace, worker requirement posting, equipment booking, scheme eligibility, farm calendar, sell produce.
2. **👷 Worker**: Profile with skills & daily wage, available jobs feed, 1-click apply, earnings history.
3. **🏪 Seller / Shop Owner**: Incoming order management, live order lifecycle stepper (`New` ➔ `Accepted` ➔ `Packed` ➔ `Dispatched` ➔ `Delivered`), inventory management.
4. **🚜 Equipment Owner**: Booking requests management, machinery fleet status, rental earnings tracker.
5. **👑 Super Admin**: Platform KPIs (1,248 farmers, ₹4.85L gross transactions), dealer KYC verification, grievance mediation desk.

---

## 🌐 Multilingual Vernacular Localization

Switch languages instantly in the top bar:
- **EN**: English
- **हिन्दी**: Hindi
- **मराठी**: Marathi

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS
- **Icons**: Lucide React
- **Mapping**: Leaflet + OpenStreetMap
- **Celebration Effects**: Canvas Confetti
- **Voice**: Web Speech API (`SpeechRecognition` + `SpeechSynthesis`)
- **Persistence**: Reactive `localStorage` Context layer (`useAgriStore`)
- **AI**: KrishiSetu Heuristic Agronomy Engine + Optional Google Gemini API Integration
=======
# Unstop_Hack_Devengers_2.0
🌾 An all-in-one smart agriculture platform built for Hack Devengers 2.0, empowering farmers with digital tools, insights, and resources in one place. It helps farmers make informed decisions, improve productivity, manage farming activities, and access essential resources through a simple, scalable, and user-friendly platform.
