export const initialProducts = [
  {
    id: "prod-1",
    name: "Rasi 659 BG II Cotton Seeds",
    category: "Seeds",
    cropSuitability: "Cotton",
    price: 864,
    unit: "Packet (450g)",
    rating: 4.8,
    reviewsCount: 142,
    seller: "Kisan Krishi Seva Kendra",
    sellerLocation: "Jalgaon, Maharashtra",
    inStock: true,
    stockCount: 45,
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=600&auto=format&fit=crop&q=60",
    description: "High-yielding bollworm-resistant Bt cotton hybrid with excellent boll size and drought tolerance. Ideal for black soil regions."
  },
  {
    id: "prod-2",
    name: "Mahyco Sonalika HD-2967 Wheat Seeds",
    category: "Seeds",
    cropSuitability: "Wheat",
    price: 1350,
    unit: "Bag (40kg)",
    rating: 4.7,
    reviewsCount: 98,
    seller: "Balaji Agro Agencies",
    sellerLocation: "Nashik, Maharashtra",
    inStock: true,
    stockCount: 60,
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=60",
    description: "Certified high-tillering wheat seed. Resistant to yellow rust and leaf blight. Maturity period 120-130 days."
  },
  {
    id: "prod-3",
    name: "IFFCO Nano Urea (Liquid)",
    category: "Fertilizers",
    cropSuitability: "All Crops",
    price: 225,
    unit: "Bottle (500ml)",
    rating: 4.9,
    reviewsCount: 310,
    seller: "IFFCO e-Bazar Centre",
    sellerLocation: "Jalgaon, Maharashtra",
    inStock: true,
    stockCount: 120,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&auto=format&fit=crop&q=60",
    description: "Innovative nanotechnology-based nitrogen fertilizer that replaces 1 bag of conventional urea, reduces groundwater pollution."
  },
  {
    id: "prod-4",
    name: "Coromandel Gromor DAP (18:46:0)",
    category: "Fertilizers",
    cropSuitability: "Cotton, Soybean, Wheat",
    price: 1350,
    unit: "Bag (50kg)",
    rating: 4.8,
    reviewsCount: 220,
    seller: "Kisan Krishi Seva Kendra",
    sellerLocation: "Jalgaon, Maharashtra",
    inStock: true,
    stockCount: 30,
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1585336261026-c288ba5c4b1d?w=600&auto=format&fit=crop&q=60",
    description: "High phosphorus and nitrogen basal fertilizer essential for vigorous root establishment and early vegetative development."
  },
  {
    id: "prod-5",
    name: "Pure Cold-Pressed Neem Oil (10,000 PPM)",
    category: "Pesticides",
    cropSuitability: "All Vegetables & Crops",
    price: 490,
    unit: "Bottle (1 Litre)",
    rating: 4.6,
    reviewsCount: 85,
    seller: "GreenEarth Bio Solutions",
    sellerLocation: "Pune, Maharashtra",
    inStock: true,
    stockCount: 50,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=60",
    description: "Certified 100% bio-pesticide repellent against whiteflies, aphids, mites, and leaf miners. Safe for beneficial honeybees."
  },
  {
    id: "prod-6",
    name: "Jain Drip Inline Irrigation Kit (1 Acre)",
    category: "Irrigation",
    cropSuitability: "Vegetables, Cotton, Orchard",
    price: 14500,
    unit: "Complete Set",
    rating: 4.9,
    reviewsCount: 64,
    seller: "Jain Irrigation Systems Authorized",
    sellerLocation: "Jalgaon, Maharashtra",
    inStock: true,
    stockCount: 15,
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=60",
    description: "Saves up to 60% water while increasing yield by 35%. Includes filter, mainline pipe, lateral tubes with drippers, and fittings."
  },
  {
    id: "prod-7",
    name: "Neptune 16L Battery-Operated Knapsack Sprayer",
    category: "Farming Tools",
    cropSuitability: "All Crops",
    price: 2499,
    unit: "1 Unit",
    rating: 4.7,
    reviewsCount: 175,
    seller: "Shree Ganesh Agro Mart",
    sellerLocation: "Bhusawal, Maharashtra",
    inStock: true,
    stockCount: 25,
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=60",
    description: "12V 8Ah rechargeable battery, high-pressure brass lance with 4 nozzles. Can spray up to 25 tanks on a single charge."
  }
];

export const initialWorkers = [
  {
    id: "worker-1",
    name: "Ramesh Tukaram Pawar",
    village: "Asoda, Jalgaon",
    distance: "3.2 km",
    rating: 4.9,
    reviewsCount: 38,
    dailyWage: 500,
    experienceYears: 9,
    phone: "+91 98231 44521",
    skills: ["Cotton Harvesting", "Pesticide Spraying", "Tractor Driving", "Drip Repair"],
    available: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60",
    completedJobs: 47
  },
  {
    id: "worker-2",
    name: "Sunitabai Ashok Shinde",
    village: "Neri, Jalgaon",
    distance: "4.8 km",
    rating: 4.8,
    reviewsCount: 29,
    dailyWage: 450,
    experienceYears: 7,
    phone: "+91 94220 88712",
    skills: ["Weeding", "Seed Sowing", "Vegetable Plucking", "Cotton Picking"],
    available: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=60",
    completedJobs: 34
  },
  {
    id: "worker-3",
    name: "Ganesh Vishnu Patil",
    village: "Paldhi, Dharangaon",
    distance: "6.5 km",
    rating: 4.7,
    reviewsCount: 42,
    dailyWage: 550,
    experienceYears: 12,
    phone: "+91 97654 32190",
    skills: ["Tractor Ploughing", "Rotavator Operation", "Furrow Making", "Irrigation"],
    available: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=60",
    completedJobs: 62
  },
  {
    id: "worker-4",
    name: "Vithal Bhika Bhole",
    village: "Nashirabad, Jalgaon",
    distance: "2.1 km",
    rating: 4.9,
    reviewsCount: 51,
    dailyWage: 500,
    experienceYears: 10,
    phone: "+91 98901 12345",
    skills: ["Cotton Harvesting", "Fertilizer Application", "Pruning", "Grain Bagging"],
    available: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=60",
    completedJobs: 58
  }
];

export const initialJobs = [
  {
    id: "job-1",
    farmerName: "Sanjay Deshmukh",
    farmerPhone: "+91 98220 11223",
    crop: "Cotton (कापूस)",
    workType: "Cotton Harvesting / Picking",
    landSize: "5 Acres",
    workersRequired: 8,
    workersApplied: 3,
    hoursPerDay: 8,
    startDate: "2026-09-22",
    wagePerWorker: 500,
    location: "Asoda Village, Jalgaon",
    distance: "3.5 km",
    totalBudget: 4000,
    status: "Open",
    notes: "Breakfast and drinking water provided at field. Picking from 8:00 AM to 5:00 PM."
  },
  {
    id: "job-2",
    farmerName: "Rajendra Chaudhari",
    farmerPhone: "+91 97665 44332",
    crop: "Soybean (सोयाबीन)",
    workType: "Threshing & Bagging",
    landSize: "4 Acres",
    workersRequired: 5,
    workersApplied: 5,
    hoursPerDay: 8,
    startDate: "2026-09-20",
    wagePerWorker: 550,
    location: "Kusumba, Jalgaon",
    distance: "5.0 km",
    totalBudget: 2750,
    status: "Filled",
    notes: "Experienced workers needed for operating thresher safely."
  },
  {
    id: "job-3",
    farmerName: "Babanrao Patil",
    farmerPhone: "+91 94234 55667",
    crop: "Vegetables (Tomato / Chilli)",
    workType: "Weeding & Staking",
    landSize: "2 Acres",
    workersRequired: 4,
    workersApplied: 2,
    hoursPerDay: 7,
    startDate: "2026-09-24",
    wagePerWorker: 450,
    location: "Paldhi Road, Jalgaon",
    distance: "4.2 km",
    totalBudget: 1800,
    status: "Open",
    notes: "Careful manual weeding around drip laterals."
  }
];

export const initialEquipment = [
  {
    id: "eq-1",
    name: "Mahindra 575 DI 45HP Tractor",
    category: "Tractor",
    rentPerDay: 1500,
    deposit: 3000,
    ownerName: "Pravin Jagtap",
    ownerPhone: "+91 98223 90011",
    location: "Kusumba, Jalgaon",
    distance: "4.2 km",
    rating: 4.9,
    reviewsCount: 34,
    fuelIncluded: false,
    driverAvailable: true,
    driverWageExtra: 400,
    availableTomorrow: true,
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&auto=format&fit=crop&q=60",
    description: "Reliable 45 HP powerhouse equipped with power steering, hitch, and dual clutch. Ideal for ploughing, rotavating, and trolley haulage."
  },
  {
    id: "eq-2",
    name: "Shaktiman 6-Foot Heavy Duty Rotavator",
    category: "Rotavator",
    rentPerDay: 700,
    deposit: 1500,
    ownerName: "Dnyaneshwar Shinde",
    ownerPhone: "+91 94227 12344",
    location: "Neri, Jalgaon",
    distance: "5.5 km",
    rating: 4.8,
    reviewsCount: 22,
    fuelIncluded: false,
    driverAvailable: false,
    availableTomorrow: true,
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=60",
    description: "48 Boron steel blades, multispeed gearbox. Prepares fine seedbed in single pass, crushing crop residue effectively."
  },
  {
    id: "eq-3",
    name: "National 9-Tyne Spring Cultivator",
    category: "Cultivator",
    rentPerDay: 400,
    deposit: 1000,
    ownerName: "Pravin Jagtap",
    ownerPhone: "+91 98223 90011",
    location: "Kusumba, Jalgaon",
    distance: "4.2 km",
    rating: 4.7,
    reviewsCount: 16,
    fuelIncluded: false,
    driverAvailable: false,
    availableTomorrow: true,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=60",
    description: "Heavy-duty spring loaded tynes for deep soil aeration and root weed eradication."
  },
  {
    id: "eq-4",
    name: "Kirloskar 5HP Mobile Diesel Water Pump",
    category: "Water Pump",
    rentPerDay: 450,
    deposit: 1000,
    ownerName: "Ashok Patil",
    ownerPhone: "+91 98902 33445",
    location: "Mohadi, Jalgaon",
    distance: "3.1 km",
    rating: 4.6,
    reviewsCount: 28,
    fuelIncluded: false,
    driverAvailable: false,
    availableTomorrow: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60",
    description: "Mounted on trolley with 100 feet delivery pipe and foot-valve. Fuel consumption 0.9L diesel per hour."
  },
  {
    id: "eq-5",
    name: "Tractor-Mounted 400L HTP Boom Sprayer",
    category: "Sprayer",
    rentPerDay: 600,
    deposit: 1500,
    ownerName: "Vijay Chaudhari",
    ownerPhone: "+91 94231 66778",
    location: "Asoda, Jalgaon",
    distance: "2.8 km",
    rating: 4.9,
    reviewsCount: 19,
    fuelIncluded: false,
    driverAvailable: true,
    driverWageExtra: 350,
    availableTomorrow: true,
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=60",
    description: "Covers 1 acre in 15 minutes with uniform atomized spray mist. Perfect for cotton and soybean pest protection."
  }
];

export const initialAnimals = [
  {
    id: "anim-1",
    title: "Healthy Pair of Khillari Working Bullocks (जोडी)",
    type: "Bullocks",
    mode: "Rent or Buy",
    rentPerDay: 800,
    buyPrice: 95000,
    age: "4.5 Years",
    breed: "Khillari (खिलार)",
    vaccinated: true,
    healthStatus: "Veterinary fitness certificate verified; energetic & well trained for ploughing and cart",
    ownerName: "Pandurang Patil",
    ownerPhone: "+91 98234 77651",
    location: "Khed, Jalgaon",
    distance: "6.0 km",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "anim-2",
    title: "Pure Indigenous Gir Cow with Calf (गीर गाय)",
    type: "Cow",
    mode: "Buy",
    buyPrice: 68000,
    age: "3.5 Years (2nd Lactation)",
    breed: "Pure Gir",
    milkYield: "12 Litres / Day A2 Milk",
    vaccinated: true,
    healthStatus: "Fully vaccinated against FMD and Lumpy Skin Disease. Docile temperament.",
    ownerName: "Shivaji More",
    ownerPhone: "+91 94222 99881",
    location: "Pachora, Jalgaon",
    distance: "14 km",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "anim-3",
    title: "Murrah Dairy Buffalo (मुर्रा म्हैस)",
    type: "Buffalo",
    mode: "Buy",
    buyPrice: 85000,
    age: "4 Years (2nd Calving)",
    breed: "Murrah",
    milkYield: "15 Litres / Day (7.8% Fat)",
    vaccinated: true,
    healthStatus: "Dewormed and certified by District Veterinary Hospital.",
    ownerName: "Kailash Mali",
    ownerPhone: "+91 98811 22334",
    location: "Yaval, Jalgaon",
    distance: "18 km",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=60"
  }
];

export const initialShops = [
  {
    id: "shop-1",
    name: "Kisan Krishi Seva Kendra",
    category: "Seeds & Fertilizers",
    rating: 4.8,
    reviewsCount: 156,
    address: "Station Road, Opp. Market Yard, Jalgaon",
    phone: "+91 257 222 4110",
    hours: "8:00 AM - 8:30 PM",
    distance: "2.3 km",
    lat: 21.0077,
    lng: 75.5626,
    hasSubsidizedFertilizer: true,
    featuredBrands: ["IFFCO", "Mahyco", "Rasi Seeds", "Coromandel"]
  },
  {
    id: "shop-2",
    name: "Shree Ganesh Agro & Drip Spares",
    category: "Irrigation & Tools",
    rating: 4.7,
    reviewsCount: 89,
    address: "MIDC Phase 2, Jalgaon",
    phone: "+91 257 223 9920",
    hours: "9:00 AM - 7:30 PM",
    distance: "4.1 km",
    lat: 21.0185,
    lng: 75.5812,
    hasSubsidizedFertilizer: false,
    featuredBrands: ["Jain Irrigation", "Finolex", "Kirloskar Pumps"]
  },
  {
    id: "shop-3",
    name: "Balaji Krishi Rasayan & Bio Solutions",
    category: "Pesticides & Bio-fertilizers",
    rating: 4.9,
    reviewsCount: 114,
    address: "Near Old Bus Stand, Bhusawal Road, Jalgaon",
    phone: "+91 257 224 5501",
    hours: "8:30 AM - 8:00 PM",
    distance: "3.7 km",
    lat: 21.0120,
    lng: 75.5450,
    hasSubsidizedFertilizer: true,
    featuredBrands: ["Bayer", "Syngenta", "UPL", "Dhanuka"]
  },
  {
    id: "shop-4",
    name: "Pawanputra Tractor Service & Parts",
    category: "Equipment Service & Spares",
    rating: 4.6,
    reviewsCount: 68,
    address: "NH-53 Highway Crossing, Kusumba",
    phone: "+91 94231 88990",
    hours: "8:00 AM - 9:00 PM",
    distance: "5.8 km",
    lat: 20.9950,
    lng: 75.5230,
    hasSubsidizedFertilizer: false,
    featuredBrands: ["Mahindra Spares", "Swaraj Genuine Parts", "Rotavator Blades"]
  },
  {
    id: "shop-5",
    name: "Jalgaon Veterinary Clinic & Cattle Feed",
    category: "Animal Health & Feed",
    rating: 4.8,
    reviewsCount: 92,
    address: "Zilla Parishad Road, Jalgaon",
    phone: "+91 257 225 1199",
    hours: "8:00 AM - 1:00 PM, 4:00 PM - 8:00 PM",
    distance: "3.1 km",
    lat: 21.0040,
    lng: 75.5560,
    hasSubsidizedFertilizer: false,
    featuredBrands: ["Godrej Agrovet Cattle Feed", "Virbac Animal Health"]
  }
];

export const initialSchemes = [
  {
    id: "scheme-1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Direct Income Support",
    benefitAmount: "₹6,000 / Year in 3 equal installments",
    eligibilityCriteria: "All landholding farmer families with cultivable land in their names (subject to exclusion criteria like income tax payers).",
    landLimit: "No land size ceiling (Small, Marginal, and Large farmers eligible)",
    targetCrops: "All Crops",
    documentsRequired: [
      "Aadhaar Card linked with Mobile Number",
      "7/12 & 8A Land Extract (सातबारा व ८-अ उतारा)",
      "Bank Account details linked with Aadhaar (NPCI mapped)",
      "Land Ownership title / Khata number"
    ],
    applicationProcess: "Apply online at pmkisan.gov.in or through your nearest Common Service Centre (CSC) or Talathi office.",
    officialUrl: "https://pmkisan.gov.in",
    deadline: "Open All Year",
    popularScore: 98
  },
  {
    id: "scheme-2",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    category: "Crop Insurance",
    benefitAmount: "Comprehensive crop loss protection (only 1.5% - 2% farmer premium; rest subsidized)",
    eligibilityCriteria: "All farmers growing notified Kharif/Rabi crops in notified areas. Both loanee and non-loanee farmers eligible.",
    landLimit: "Any land size",
    targetCrops: "Cotton, Soybean, Wheat, Maize, Groundnut, Pulses",
    documentsRequired: [
      "7/12 Extract with latest Crop Sowing Certificate (पीक पेरा)",
      "Aadhaar Card",
      "Bank Passbook copy",
      "Sowing Declaration (स्वयंघोषणा पत्र)"
    ],
    applicationProcess: "Register at pmfby.gov.in or via Kisan Credit Card Bank Branch / CSC within 15 days of sowing.",
    officialUrl: "https://pmfby.gov.in",
    deadline: "Kharif: 31 July | Rabi: 15 Dec",
    popularScore: 95
  },
  {
    id: "scheme-3",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Equipment Subsidy",
    benefitAmount: "40% to 50% subsidy on purchase of Tractor, Power Tiller, Rotavator & Drone",
    eligibilityCriteria: "Small, Marginal, SC/ST, and Women farmers receive 50% subsidy (up to ₹1.25 Lakh on rotavator/implements; ₹2 Lakh on tractors).",
    landLimit: "Priority for farmers under 5 Acres (<2 Hectares)",
    targetCrops: "All agricultural activities",
    documentsRequired: [
      "Aadhaar Card",
      "7/12 Land Extract (सातबारा)",
      "Caste Certificate (for SC/ST concession)",
      "Bank Passbook copy",
      "Quotation from Authorized Equipment Dealer"
    ],
    applicationProcess: "Apply through MahaDBT Farmer Portal (mahadbt.maharashtra.gov.in) under Agriculture Mechanization Scheme.",
    officialUrl: "https://agrimachinery.nic.in",
    deadline: "Lottery rounds every 2 months",
    popularScore: 92
  },
  {
    id: "scheme-4",
    name: "PMKSY - Per Drop More Crop (Micro Irrigation)",
    category: "Irrigation Subsidy",
    benefitAmount: "Up to 55% subsidy for small/marginal farmers; 45% for other farmers for Drip & Sprinkler",
    eligibilityCriteria: "Farmers with assured water source (well, borewell, canal) having land in their name.",
    landLimit: "Up to 5 Hectares",
    targetCrops: "Cotton, Sugarcane, Vegetables, Orchards, Banana",
    documentsRequired: [
      "7/12 & 8A Land Record",
      "Electricity Bill of Water Pump / Water availability certificate",
      "Aadhaar Card & Bank Details",
      "Estimate/Quotation from authorized Micro-Irrigation dealer"
    ],
    applicationProcess: "Apply on MahaDBT Agriculture portal; site inspection conducted by Taluka Krishi Adhikari.",
    officialUrl: "https://pmksy.gov.in",
    deadline: "Continuous registration",
    popularScore: 94
  },
  {
    id: "scheme-5",
    name: "Kisan Credit Card (KCC) Crop Loan Scheme",
    category: "Agricultural Credit",
    benefitAmount: "Short-term credit up to ₹3,00,000 at highly subsidized 4% interest rate (with prompt repayment)",
    eligibilityCriteria: "All owner farmers, tenant farmers, oral lessees, and share croppers.",
    landLimit: "Any cultivable holding",
    targetCrops: "All seasonal crops",
    documentsRequired: [
      "Application form with passport photos",
      "Aadhaar Card & PAN Card",
      "Land records (7/12 & 8A) showing crop cultivation",
      "No Dues Certificate (NDC) from local banks"
    ],
    applicationProcess: "Visit any Commercial Bank, Cooperative Bank, or Regional Rural Bank branch.",
    officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
    deadline: "Throughout year",
    popularScore: 96
  }
];

export const initialFarmerProfile = {
  name: "Suresh Patil",
  phone: "+91 98221 55678",
  village: "Asoda",
  district: "Jalgaon",
  state: "Maharashtra",
  totalLandAcres: 5,
  soilType: "Black Cotton Soil (काळी माती)",
  irrigationType: "Drip Irrigation & Well (ठिबक व विहीर)",
  currentCrops: [
    {
      id: "crop-1",
      name: "Cotton (कापूस - Bt)",
      acres: 3,
      sowingDate: "2026-06-15",
      expectedHarvest: "2026-11-10",
      stage: "Boll Development & Maturation",
      healthStatus: "Good",
      waterNeeds: "Moderate (once every 5 days via drip)"
    },
    {
      id: "crop-2",
      name: "Soybean (सोयाबीन)",
      acres: 2,
      sowingDate: "2026-06-25",
      expectedHarvest: "2026-10-05",
      stage: "Pod Filling Stage",
      healthStatus: "Optimal",
      waterNeeds: "Low-Medium (monitor rain)"
    }
  ]
};

export const initialFarmerProduceListings = [
  {
    id: "sell-1",
    crop: "Wheat (गहू - Sonalika 2967)",
    quantity: 25,
    unit: "Quintals",
    askingPrice: 2450,
    priceUnit: "per Quintal",
    location: "Asoda, Jalgaon",
    harvestDate: "2026-03-20",
    grade: "Grade A (Clean & Bold Grain)",
    sellerName: "Suresh Patil",
    sellerPhone: "+91 98221 55678",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "sell-2",
    crop: "Soybean (सोयाबीन JS-335)",
    quantity: 18,
    unit: "Quintals",
    askingPrice: 4700,
    priceUnit: "per Quintal",
    location: "Paldhi, Jalgaon",
    harvestDate: "Expected in 15 days",
    grade: "Organic Certified",
    sellerName: "Vilas Deshmukh",
    sellerPhone: "+91 94231 11222",
    image: "https://images.unsplash.com/photo-1599582998634-1144c9d96db3?w=600&auto=format&fit=crop&q=60"
  }
];

export const initialComplaints = [
  {
    id: "comp-1",
    farmerName: "Ramesh Pawar",
    farmerPhone: "+91 98231 44521",
    targetType: "Equipment Owner",
    targetName: "Ashok Patil",
    issue: "Water pump broke down on day 1 of rental; replacement was not provided.",
    date: "2026-09-14",
    status: "In Review",
    adminNotes: "Owner contacted. He agreed to refund 1 day rent."
  },
  {
    id: "comp-2",
    farmerName: "Suresh Patil",
    farmerPhone: "+91 98221 55678",
    targetType: "Seller",
    targetName: "Shree Ganesh Agro",
    issue: "1 packet of seeds had damaged packaging during delivery.",
    date: "2026-09-15",
    status: "Resolved",
    adminNotes: "Replacement packet dispatched to farmer free of charge."
  }
];

export const initialWeather = {
  location: "Jalgaon, Maharashtra",
  temp: 29,
  condition: "Partly Cloudy with Scattered Showers",
  rainProbability: 65,
  humidity: 78,
  windSpeed: 14,
  forecast: [
    { day: "Today", temp: 29, rain: 65, condition: "Scattered Rain", icon: "cloud-rain" },
    { day: "Tomorrow", temp: 27, rain: 80, condition: "Heavy Showers Expected", icon: "cloud-lightning" },
    { day: "Friday", temp: 31, rain: 20, condition: "Mostly Sunny", icon: "sun" },
    { day: "Saturday", temp: 32, rain: 10, condition: "Clear Sky", icon: "sun" },
    { day: "Sunday", temp: 33, rain: 15, condition: "Warm & Dry", icon: "sun" }
  ],
  advisoryAlert: "🌧️ Rainfall Alert: 80% chance of showers tomorrow. Postpone foliar pesticide sprays & chemical fertilizer application. Ensure open drainage channels in low-lying cotton plots."
};

export const cropCalendars = {
  "Cotton": [
    {
      stage: "Sowing & Seed Treatment",
      days: "Day 0 - 15",
      icon: "🌱",
      tasks: [
        "Treat seeds with Trichoderma viride (10g/kg) to prevent wilt & root rot",
        "Maintain spacing: 90cm between rows × 60cm between plants",
        "Apply basal fertilizer dose: 50kg DAP + 25kg MOP per acre"
      ],
      caution: "Do not sow if soil moisture is below 60mm equivalent."
    },
    {
      stage: "First Irrigation & Vegetative Growth",
      days: "Day 16 - 45",
      icon: "💧",
      tasks: [
        "First light irrigation after germination if rain delays",
        "Thinning: keep single healthy plant per hill at 20 days",
        "First manual weeding or hoeing between rows to break soil crust"
      ],
      caution: "Watch out for early sucking pests like Jassids and Thrips."
    },
    {
      stage: "Square & Flower Bud Initiation",
      days: "Day 46 - 75",
      icon: "🌿",
      tasks: [
        "Top dressing with 25kg Neem-coated Urea per acre",
        "Install 5 Pheromone traps per acre for Pink Bollworm monitoring",
        "Spray 1% Magnesium Sulphate + 0.2% Boron for square retention"
      ],
      caution: "Avoid moisture stress during square formation; drop will hurt yield."
    },
    {
      stage: "Boll Development & Pest Monitoring",
      days: "Day 76 - 115",
      icon: "🐛",
      tasks: [
        "Monitor bollworm entry holes; spray Neem oil 10,000 ppm if below ETL",
        "Inspect lower canopy for yellowing or parawilt symptoms",
        "Maintain clean field borders to prevent whitefly migration"
      ],
      caution: "Do not use non-recommended cocktail pesticide sprays."
    },
    {
      stage: "Boll Bursting & Picking",
      days: "Day 116 - 160",
      icon: "🌾",
      tasks: [
        "First picking when 40% bolls have naturally fluffed open",
        "Pick cotton in dry morning hours after dew evaporates",
        "Store picked cotton in clean cotton cloth bags, avoid plastic sacks"
      ],
      caution: "Keep clean: trash or leaf fragments drop market grade price."
    }
  ],
  "Wheat": [
    {
      stage: "Land Preparation & Sowing",
      days: "Day 0 - 10",
      icon: "🌱",
      tasks: [
        "Plough with cultivator followed by rotavator for level seedbed",
        "Optimum sowing depth: 4-5 cm using seed-cum-fertilizer drill",
        "Basal application: 50kg DAP + 25kg MOP per acre"
      ],
      caution: "Delayed sowing after Nov 25 can reduce yield due to terminal heat."
    },
    {
      stage: "CRI (Crown Root Initiation) Stage",
      days: "Day 20 - 25",
      icon: "💧",
      tasks: [
        "CRITICAL: First irrigation must be given at 21 days",
        "First top dressing of Urea (30kg/acre) after irrigation",
        "Monitor for early broadleaf weeds"
      ],
      caution: "Water stress at CRI stage will permanently reduce tiller count."
    },
    {
      stage: "Tillering & Jointing Stage",
      days: "Day 40 - 65",
      icon: "🌿",
      tasks: [
        "Second irrigation at jointing stage (40-45 days)",
        "Top dress balance Urea (25kg/acre)",
        "Check for yellow rust symptoms on leaves"
      ],
      caution: "Inspect leaves: yellow powder indicates rust requiring immediate fungicide."
    },
    {
      stage: "Flowering & Milking Stage",
      days: "Day 75 - 95",
      icon: "🌾",
      tasks: [
        "Third & fourth irrigation at boot/flowering stage",
        "Foliar spray of 0.5% Potassium Nitrate (13:0:45) for bold grains",
        "Protect against bird damage in morning & evening"
      ],
      caution: "Do not irrigate during high wind speeds to prevent lodging (falling)."
    },
    {
      stage: "Dough & Maturity / Harvesting",
      days: "Day 100 - 125",
      icon: "🚜",
      tasks: [
        "Stop irrigation 10-12 days before anticipated harvest",
        "Harvest when grain moisture drops below 14% (grain breaks with crisp snap)",
        "Clean, thresh, and bag in moisture-free bags"
      ],
      caution: "Harvest promptly to prevent shattering loss."
    }
  ]
};
