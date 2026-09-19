import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialProducts,
  initialShops,
  initialSchemes,
  initialWeather,
  cropCalendars,
  initialWorkers as demoWorkers,
  initialJobs as demoJobs,
  initialEquipment as demoEquipment,
  initialAnimals as demoAnimals,
  initialFarmerProfile as demoFarmerProfile
} from '../data/mockData';
import { translations } from '../i18n/translations';

const AgriStoreContext = createContext(null);

export const AgriStoreProvider = ({ children }) => {
  // Check clean slate version: if not 'v2_clean', flush old mock data!
  const hasCleanedV2 = localStorage.getItem('krishi_v2_clean');
  if (!hasCleanedV2) {
    localStorage.removeItem('krishi_workers');
    localStorage.removeItem('krishi_jobs');
    localStorage.removeItem('krishi_equipment');
    localStorage.removeItem('krishi_animals');
    localStorage.removeItem('krishi_cart');
    localStorage.removeItem('krishi_orders');
    localStorage.removeItem('krishi_eq_bookings');
    localStorage.removeItem('krishi_farmer_produce');
    localStorage.removeItem('krishi_complaints');
    localStorage.removeItem('krishi_farmer_profile');
    localStorage.removeItem('krishi_current_user');
    localStorage.setItem('krishi_v2_clean', 'true');
  }

  // Current Logged-in User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('krishi_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Registered Users Registry
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('krishi_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Current Role (defaults to currentUser.role or 'farmer')
  const [currentRole, setCurrentRole] = useState(() => {
    const savedUser = localStorage.getItem('krishi_current_user');
    if (savedUser) {
      try { return JSON.parse(savedUser).role; } catch (e) {}
    }
    return localStorage.getItem('krishi_role') || 'farmer';
  });

  const [language, setLanguage] = useState(() => localStorage.getItem('krishi_lang') || 'en');
  const [activeFarmerTab, setActiveFarmerTab] = useState('home');

  // Catalogs & Reference Data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('krishi_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [shops] = useState(initialShops);
  const [schemes, setSchemes] = useState(() => {
    const saved = localStorage.getItem('krishi_schemes');
    return saved ? JSON.parse(saved) : initialSchemes;
  });

  // USER-CREATED DATA COLLECTIONS (EMPTY BY DEFAULT AS REQUESTED)
  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('krishi_workers');
    return saved ? JSON.parse(saved) : [];
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('krishi_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [equipment, setEquipment] = useState(() => {
    const saved = localStorage.getItem('krishi_equipment');
    return saved ? JSON.parse(saved) : [];
  });

  const [animals, setAnimals] = useState(() => {
    const saved = localStorage.getItem('krishi_animals');
    return saved ? JSON.parse(saved) : [];
  });

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('krishi_farmer_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [farmerProduce, setFarmerProduce] = useState(() => {
    const saved = localStorage.getItem('krishi_farmer_produce');
    return saved ? JSON.parse(saved) : [];
  });

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('krishi_complaints');
    return saved ? JSON.parse(saved) : [];
  });

  // Cart & Orders (Empty by default)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('krishi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('krishi_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [equipmentBookings, setEquipmentBookings] = useState(() => {
    const saved = localStorage.getItem('krishi_eq_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('krishi_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: "notif-init",
        title: "Welcome to KrishiSetu 🌾",
        message: "Register or login to access personalized farming services and post requirements.",
        type: "info",
        time: "Just now",
        read: false
      }
    ];
  });

  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('krishi_gemini_key') || '');
  const [weather] = useState(initialWeather);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('krishi_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('krishi_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('krishi_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('krishi_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('krishi_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('krishi_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('krishi_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('krishi_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('krishi_equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('krishi_animals', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem('krishi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('krishi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('krishi_eq_bookings', JSON.stringify(equipmentBookings));
  }, [equipmentBookings]);

  useEffect(() => {
    localStorage.setItem('krishi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (farmerProfile) {
      localStorage.setItem('krishi_farmer_profile', JSON.stringify(farmerProfile));
    } else {
      localStorage.removeItem('krishi_farmer_profile');
    }
  }, [farmerProfile]);

  useEffect(() => {
    localStorage.setItem('krishi_farmer_produce', JSON.stringify(farmerProduce));
  }, [farmerProduce]);

  useEffect(() => {
    localStorage.setItem('krishi_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('krishi_gemini_key', geminiApiKey);
  }, [geminiApiKey]);

  // AUTHENTICATION FUNCTIONS
  const registerUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      ...userData
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentRole(newUser.role);

    // If farmer, save their farm profile
    if (newUser.role === 'farmer') {
      const newFarmProfile = {
        name: newUser.name,
        phone: newUser.phone,
        village: newUser.village || 'Jalgaon',
        district: newUser.district || 'Jalgaon',
        state: newUser.state || 'Maharashtra',
        totalLandAcres: Number(newUser.totalLandAcres) || 4,
        soilType: newUser.soilType || 'Black Cotton Soil (काळी माती)',
        irrigationType: newUser.irrigationType || 'Drip & Borewell (ठिबक)',
        currentCrops: newUser.currentCrops || [
          {
            id: `crop-${Date.now()}`,
            name: newUser.primaryCrop || 'Cotton (कापूस)',
            acres: Number(newUser.totalLandAcres) || 4,
            sowingDate: new Date().toISOString().split('T')[0],
            expectedHarvest: 'In 120 Days',
            stage: 'Vegetative & Growth',
            healthStatus: 'Good',
            waterNeeds: 'Regular'
          }
        ]
      };
      setFarmerProfile(newFarmProfile);
    }

    // If worker, also add to available workers pool
    if (newUser.role === 'worker') {
      const newWorker = {
        id: `worker-${Date.now()}`,
        name: newUser.name,
        village: newUser.village || 'Jalgaon',
        distance: 'Nearby (Local Village)',
        rating: 5.0,
        reviewsCount: 1,
        dailyWage: Number(newUser.dailyWage) || 500,
        experienceYears: Number(newUser.experienceYears) || 5,
        phone: newUser.phone,
        skills: newUser.skills && newUser.skills.length > 0 ? newUser.skills : ["General Farm Work", "Harvesting"],
        available: true,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60",
        completedJobs: 0
      };
      setWorkers(prev => [newWorker, ...prev]);
    }

    addNotification({
      title: `Welcome, ${newUser.name}! 🎉`,
      message: `Your ${newUser.role} account has been created successfully.`,
      type: "auth"
    });

    return newUser;
  };

  const loginUser = (phone, password) => {
    const foundUser = users.find(u => u.phone === phone && u.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      setCurrentRole(foundUser.role);
      if (foundUser.role === 'farmer' && foundUser.farmProfile) {
        setFarmerProfile(foundUser.farmProfile);
      }
      addNotification({
        title: `Welcome back, ${foundUser.name}! 👋`,
        message: `Logged in as ${foundUser.role}.`,
        type: "auth"
      });
      return { success: true, user: foundUser };
    }
    return { success: false, error: "Invalid mobile number or password." };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('farmer');
    addNotification({
      title: "Logged Out",
      message: "You have been logged out of KrishiSetu.",
      type: "auth"
    });
  };

  // Add Worker independently from form
  const registerWorkerProfile = (workerData) => {
    const newWorker = {
      id: `worker-${Date.now()}`,
      name: workerData.name,
      village: workerData.village,
      distance: "Nearby",
      rating: 5.0,
      reviewsCount: 0,
      dailyWage: Number(workerData.dailyWage),
      experienceYears: Number(workerData.experienceYears),
      phone: workerData.phone,
      skills: workerData.skills,
      available: workerData.available ?? true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=60",
      completedJobs: 0
    };
    setWorkers(prev => [newWorker, ...prev]);
    addNotification({
      title: "Worker Profile Registered 👷",
      message: `${newWorker.name} is now available in the local worker pool at ₹${newWorker.dailyWage}/day.`,
      type: "worker"
    });
    return newWorker;
  };

  // Add Equipment / Machinery for rent from form
  const addEquipmentListing = (eqData) => {
    const newEq = {
      id: `eq-${Date.now()}`,
      name: eqData.name,
      category: eqData.category || "Tractor",
      rentPerDay: Number(eqData.rentPerDay),
      deposit: Number(eqData.deposit) || 1000,
      ownerName: eqData.ownerName || (currentUser ? currentUser.name : "Local Owner"),
      ownerPhone: eqData.ownerPhone || (currentUser ? currentUser.phone : "+91 98220 00000"),
      location: eqData.location || "Local Village",
      distance: "2.0 km",
      rating: 5.0,
      reviewsCount: 0,
      driverAvailable: eqData.driverAvailable ?? false,
      driverWageExtra: Number(eqData.driverWageExtra) || 0,
      availableTomorrow: true,
      image: eqData.image || "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&auto=format&fit=crop&q=60",
      description: eqData.description || "Well maintained agricultural machinery available for rent."
    };

    if (newEq.category === 'Bullocks' || newEq.category === 'Cow' || newEq.category === 'Buffalo') {
      setAnimals(prev => [newEq, ...prev]);
    } else {
      setEquipment(prev => [newEq, ...prev]);
    }

    addNotification({
      title: "Equipment Listed for Rent 🚜",
      message: `${newEq.name} is now available in the rental hub at ₹${newEq.rentPerDay}/day.`,
      type: "equipment"
    });
    return newEq;
  };

  // One-click reset to clean slate
  const clearAllUserData = () => {
    setWorkers([]);
    setJobs([]);
    setEquipment([]);
    setAnimals([]);
    setCart([]);
    setOrders([]);
    setEquipmentBookings([]);
    setFarmerProduce([]);
    setComplaints([]);
    setFarmerProfile(null);
    setCurrentUser(null);
    setUsers([]);
    localStorage.clear();
    localStorage.setItem('krishi_v2_clean', 'true');
    addNotification({
      title: "Database Cleared 🧹",
      message: "All user records have been removed. System is fresh.",
      type: "admin"
    });
  };

  // Optional: Load sample demo data for quick presentation if needed
  const loadDemoData = () => {
    setWorkers(demoWorkers);
    setJobs(demoJobs);
    setEquipment(demoEquipment);
    setAnimals(demoAnimals);
    setFarmerProfile(demoFarmerProfile);
    addNotification({
      title: "Sample Demo Data Loaded 📥",
      message: "Sample farmers, workers, and machinery loaded for demonstration.",
      type: "admin"
    });
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addNotification({
      title: "Item Added to Cart",
      message: `${product.name} (x${quantity}) was added to your cart.`,
      type: "cart"
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = ({ deliveryType = "Home Delivery", deliveryAddress = "Farm Address" }) => {
    if (cart.length === 0) return null;
    const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({ ...item.product, quantity: item.quantity })),
      totalAmount,
      status: "New",
      deliveryType,
      deliveryAddress,
      farmerName: currentUser ? currentUser.name : (farmerProfile ? farmerProfile.name : "Kisan User"),
      farmerPhone: currentUser ? currentUser.phone : (farmerProfile ? farmerProfile.phone : "+91 98000 00000")
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addNotification({
      title: "Order Placed Successfully! 🛒",
      message: `Order #${newOrder.id} of ₹${totalAmount.toLocaleString()} received.`,
      type: "order"
    });
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
    );
    addNotification({
      title: "Order Status Updated",
      message: `Order #${orderId} is now ${newStatus}.`,
      type: "order"
    });
  };

  // Worker Requirement Post
  const postJob = (jobData) => {
    const newJob = {
      id: `job-${Date.now()}`,
      farmerName: currentUser ? currentUser.name : (farmerProfile ? farmerProfile.name : "Kisan Farmer"),
      farmerPhone: currentUser ? currentUser.phone : (farmerProfile ? farmerProfile.phone : "+91 98000 00000"),
      crop: jobData.crop || "Cotton",
      workType: jobData.workType,
      landSize: `${jobData.landSize} Acres`,
      workersRequired: Number(jobData.workersRequired),
      workersApplied: 0,
      hoursPerDay: Number(jobData.hoursPerDay) || 8,
      startDate: jobData.startDate,
      wagePerWorker: Number(jobData.wagePerWorker),
      location: jobData.location || "Village Farm",
      distance: "Local Area",
      totalBudget: Number(jobData.workersRequired) * Number(jobData.wagePerWorker),
      status: "Open",
      notes: jobData.notes || "Timely payment provided."
    };
    setJobs(prev => [newJob, ...prev]);
    addNotification({
      title: "Worker Requirement Posted 👨‍🌾",
      message: `Requirement for ${newJob.workersRequired} workers for ${newJob.workType} posted.`,
      type: "job"
    });
    return newJob;
  };

  const applyForJob = (jobId, workerName = null) => {
    const applicantName = workerName || (currentUser ? currentUser.name : "Registered Worker");
    setJobs(prev =>
      prev.map(j => {
        if (j.id === jobId) {
          return {
            ...j,
            workersApplied: j.workersApplied + 1,
            status: j.workersApplied + 1 >= j.workersRequired ? "Filled" : j.status
          };
        }
        return j;
      })
    );
    addNotification({
      title: "Job Application Submitted 👷",
      message: `${applicantName} applied for the job #${jobId}.`,
      type: "worker"
    });
  };

  // Equipment Booking
  const bookEquipment = ({ equipmentItem, startDate, days = 1, withDriver = false }) => {
    const totalRent = (equipmentItem.rentPerDay * days) + (withDriver ? (equipmentItem.driverWageExtra || 0) * days : 0);
    const newBooking = {
      id: `EQB-${Math.floor(100 + Math.random() * 900)}`,
      equipmentName: equipmentItem.name,
      ownerName: equipmentItem.ownerName,
      farmerName: currentUser ? currentUser.name : "Kisan User",
      startDate,
      days,
      totalRent,
      deposit: equipmentItem.deposit,
      withDriver,
      status: "Confirmed",
      bookedAt: new Date().toISOString().split('T')[0]
    };
    setEquipmentBookings(prev => [newBooking, ...prev]);
    addNotification({
      title: "Equipment Booked! 🚜",
      message: `Booking for ${equipmentItem.name} confirmed with ${equipmentItem.ownerName}.`,
      type: "equipment"
    });
    return newBooking;
  };

  // Produce Listing
  const addProduceListing = (produceData) => {
    const newProduce = {
      id: `sell-${Date.now()}`,
      sellerName: currentUser ? currentUser.name : "Farmer User",
      sellerPhone: currentUser ? currentUser.phone : "+91 98000 00000",
      location: produceData.location || "Village Farm",
      ...produceData
    };
    setFarmerProduce(prev => [newProduce, ...prev]);
    addNotification({
      title: "Produce Listed for Sale 🌾",
      message: `${newProduce.quantity} ${newProduce.unit} of ${newProduce.crop} listed.`,
      type: "produce"
    });
  };

  // Seller Inventory Actions
  const addProduct = (prodData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      image: prodData.image || "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=600&auto=format&fit=crop&q=60",
      ...prodData
    };
    setProducts(prev => [newProd, ...prev]);
    addNotification({
      title: "Product Added to Marketplace",
      message: `${newProd.name} added to catalog.`,
      type: "seller"
    });
  };

  const addNotification = ({ title, message, type = "info" }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const submitComplaint = (compData) => {
    const newComp = {
      id: `comp-${Date.now()}`,
      farmerName: currentUser ? currentUser.name : "Farmer User",
      farmerPhone: currentUser ? currentUser.phone : "+91 98000 00000",
      date: new Date().toISOString().split('T')[0],
      status: "In Review",
      adminNotes: "Complaint forwarded to dispute desk.",
      ...compData
    };
    setComplaints(prev => [newComp, ...prev]);
    addNotification({
      title: "Grievance Registered 🏛️",
      message: `Your complaint #${newComp.id} has been logged.`,
      type: "complaint"
    });
  };

  const resolveComplaint = (compId, resolutionNotes) => {
    setComplaints(prev =>
      prev.map(c => c.id === compId ? { ...c, status: "Resolved", adminNotes: resolutionNotes } : c)
    );
  };

  const t = translations[language] || translations.en;

  return (
    <AgriStoreContext.Provider value={{
      // Auth & User
      currentUser,
      registerUser,
      loginUser,
      logout,
      users,
      // Role & Navigation
      currentRole,
      setCurrentRole,
      language,
      setLanguage,
      activeFarmerTab,
      setActiveFarmerTab,
      t,
      // User data collections
      products,
      addProduct,
      workers,
      registerWorkerProfile,
      jobs,
      postJob,
      applyForJob,
      equipment,
      animals,
      addEquipmentListing,
      bookEquipment,
      equipmentBookings,
      shops,
      schemes,
      farmerProfile,
      setFarmerProfile,
      farmerProduce,
      addProduceListing,
      complaints,
      submitComplaint,
      resolveComplaint,
      weather,
      cropCalendars,
      // Cart & Orders
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      orders,
      placeOrder,
      updateOrderStatus,
      // Notifications
      notifications,
      addNotification,
      markAllNotificationsRead,
      // Reset & Demo functions
      clearAllUserData,
      loadDemoData,
      geminiApiKey,
      setGeminiApiKey
    }}>
      {children}
    </AgriStoreContext.Provider>
  );
};

export const useAgriStore = () => {
  const context = useContext(AgriStoreContext);
  if (!context) {
    throw new Error('useAgriStore must be used within an AgriStoreProvider');
  }
  return context;
};
