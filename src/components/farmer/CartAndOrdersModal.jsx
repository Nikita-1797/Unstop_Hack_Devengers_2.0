import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const CartAndOrdersModal = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    orders,
    farmerProfile,
    t
  } = useAgriStore();

  const [activeTab, setActiveTab] = useState('cart'); // 'cart' | 'orders'
  const [address, setAddress] = useState(
    farmerProfile?.village ? `${farmerProfile.village}, ${farmerProfile.district}` : 'Local Farm Address'
  );

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryType === 'Home Delivery' ? (subtotal > 1500 ? 0 : 70) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder = placeOrder({ deliveryType, deliveryAddress: address });
    if (newOrder) {
      setOrderSuccess(newOrder);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
      setTimeout(() => {
        setOrderSuccess(null);
        setActiveTab('orders');
      }, 2200);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'Dispatched':
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> On the Way</span>;
      case 'Packed':
        return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Packed</span>;
      case 'Accepted':
        return <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Accepted</span>;
      default:
        return <span className="bg-stone-100 text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> New Order</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[90vh] max-h-[750px] overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">Agricultural Cart & Orders</h3>
              <p className="text-xs text-emerald-100/80">Kisan e-Bazar & Order Tracking</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
              activeTab === 'cart'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            My Orders ({orders.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/50">
          {orderSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">Order Placed Successfully!</h3>
              <p className="text-xs text-emerald-800 mt-1">
                Order ID: <span className="font-mono font-bold">{orderSuccess.id}</span>
              </p>
              <p className="text-xs text-stone-600 mt-2 max-w-sm">
                The seller has been notified to pack your agricultural inputs. You can track live updates in the "My Orders" tab.
              </p>
            </div>
          ) : activeTab === 'cart' ? (
            cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <ShoppingBag className="w-16 h-16 stroke-[1.5] text-stone-300 mb-3" />
                <h4 className="font-bold text-stone-700 text-sm">Your cart is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Browse certified seeds, bio-fertilizers, pesticides, and tools from the marketplace.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 transition"
                >
                  Explore Marketplace
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-lg border border-stone-100 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          {item.product.unit} • {item.product.seller}
                        </p>
                        <p className="text-xs font-bold text-emerald-700 mt-0.5">
                          ₹{item.product.price}
                        </p>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-stone-100 rounded-lg border border-stone-200">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 text-stone-700 rounded-l-lg"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800 min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 text-stone-700 rounded-r-lg"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Options */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
                  <h5 className="font-bold text-xs text-stone-800 uppercase tracking-wide">Fulfillment Mode</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('Home Delivery')}
                      className={`p-3 rounded-xl border text-left transition ${
                        deliveryType === 'Home Delivery'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        Home Delivery
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">Direct to farm / village (1-2 days)</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('Store Pickup')}
                      className={`p-3 rounded-xl border text-left transition ${
                        deliveryType === 'Store Pickup'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        Store Pickup
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">Collect from nearest Kendra (Free)</p>
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Delivery / Pickup Location:
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Products Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Charge</span>
                    <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                    <span>Total Amount</span>
                    <span className="text-emerald-700">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          ) : (
            /* Orders View */
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <Package className="w-12 h-12 stroke-[1.5] mx-auto mb-2 text-stone-300" />
                  <p className="text-xs font-semibold text-stone-600">No orders placed yet</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
                  >
                    <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono font-bold text-xs text-stone-900">
                          #{order.id}
                        </span>
                        <span className="text-[11px] text-stone-500 ml-2">
                          Date: {order.date}
                        </span>
                      </div>
                      <div>{getStatusBadge(order.status)}</div>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Tracking Progress Bar */}
                      <div className="py-2">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-stone-500 mb-1">
                          <span className={order.status !== 'Cancelled' ? 'text-emerald-700 font-bold' : ''}>New</span>
                          <span className={['Accepted', 'Packed', 'Dispatched', 'Delivered'].includes(order.status) ? 'text-emerald-700 font-bold' : ''}>Accepted</span>
                          <span className={['Packed', 'Dispatched', 'Delivered'].includes(order.status) ? 'text-emerald-700 font-bold' : ''}>Packed</span>
                          <span className={['Dispatched', 'Delivered'].includes(order.status) ? 'text-emerald-700 font-bold' : ''}>Dispatched</span>
                          <span className={order.status === 'Delivered' ? 'text-emerald-700 font-bold' : ''}>Delivered</span>
                        </div>
                        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                            style={{
                              width:
                                order.status === 'Delivered' ? '100%' :
                                order.status === 'Dispatched' ? '75%' :
                                order.status === 'Packed' ? '50%' :
                                order.status === 'Accepted' ? '25%' : '10%'
                            }}
                          />
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-stone-100 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-stone-800">{item.name}</p>
                              <p className="text-[11px] text-stone-500">Qty: {item.quantity} × ₹{item.price}</p>
                            </div>
                            <span className="font-bold text-stone-900">
                              ₹{(item.quantity * item.price).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-500">
                          {order.deliveryType} • {order.deliveryAddress}
                        </span>
                        <span className="font-bold text-sm text-emerald-800">
                          Total: ₹{order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer with action */}
        {activeTab === 'cart' && cart.length > 0 && !orderSuccess && (
          <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-stone-500">Pay on Delivery / UPI</p>
              <p className="text-base font-bold text-emerald-800">₹{grandTotal.toLocaleString()}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
