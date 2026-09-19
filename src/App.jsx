import React, { useState } from 'react';
import { useAgriStore } from './context/AgriStoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { EquipmentOwnerDashboard } from './components/owner/EquipmentOwnerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { CartAndOrdersModal } from './components/farmer/CartAndOrdersModal';
import { AuthModal } from './components/auth/AuthModal';
import { Bot, Sparkles } from 'lucide-react';

export function App() {
  const { currentRole, t } = useAgriStore();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-900 font-sans">
      {/* Navigation Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Role Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentRole === 'farmer' && (
          <FarmerDashboard
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAI={() => setIsAIOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentRole === 'worker' && <WorkerDashboard />}

        {currentRole === 'seller' && <SellerDashboard />}

        {currentRole === 'owner' && <EquipmentOwnerDashboard />}

        {currentRole === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Farming Assistant Trigger */}
      <button
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:scale-105 hover:shadow-emerald-600/30 transition-all flex items-center gap-2.5 border-2 border-emerald-400/40 group"
        title="Ask Krishi AI Assistant (Voice / Text)"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-pulse text-emerald-200" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
        </div>
        <div className="hidden sm:block text-left">
          <span className="text-xs font-extrabold block leading-tight tracking-wide flex items-center gap-1">
            Krishi AI <Sparkles className="w-3 h-3 text-amber-300" />
          </span>
          <span className="text-[10px] text-emerald-100 font-medium leading-none block">
            Voice & Chatbot
          </span>
        </div>
      </button>

      {/* Modals */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      <CartAndOrdersModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;
