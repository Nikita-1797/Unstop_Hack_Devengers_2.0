import React, { useState } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import {
  Store,
  Package,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const SellerDashboard = () => {
  const { products, addProduct, orders, updateOrderStatus, t } = useAgriStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory' | 'add'
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Seeds');
  const [newProdCrop, setNewProdCrop] = useState('Cotton');
  const [newProdPrice, setNewProdPrice] = useState(850);
  const [newProdUnit, setNewProdUnit] = useState('Packet (450g)');
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdDesc, setNewProdDesc] = useState('');

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'New' || o.status === 'Accepted');

  const handleCreateProduct = (e) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      category: newProdCategory,
      cropSuitability: newProdCrop,
      price: Number(newProdPrice),
      unit: newProdUnit,
      stockCount: Number(newProdStock),
      seller: "Kisan Krishi Seva Kendra",
      sellerLocation: "Jalgaon, Maharashtra",
      description: newProdDesc || "High quality certified input for optimal agricultural yield."
    });

    setNewProdName('');
    setNewProdDesc('');
    setActiveTab('inventory');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Seller Header Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-sky-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/30 text-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30">
                Dealer ID: AGRI-JLG-902
              </span>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> State Certified Kendra
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Kisan Krishi Seva Kendra</h2>
            <p className="text-xs text-blue-100/90 mt-1">
              Station Road, Opp. Market Yard, Jalgaon • Phone: +91 257 222 4110
            </p>
          </div>

          <button
            onClick={() => setActiveTab('add')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
        <Store className="absolute -right-6 -bottom-6 w-48 h-48 text-blue-600/20 pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Total Revenue</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block font-serif">
            ₹{totalRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">From {orders.length} orders</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Pending Orders</span>
          <span className="text-2xl font-extrabold text-amber-600 mt-1 block font-serif">
            {pendingOrders.length}
          </span>
          <span className="text-[11px] text-stone-400 font-medium">Needs packing / dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Products in Catalog</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block font-serif">
            {products.length}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">All certified by Dept of Agri</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold block">Store Rating</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block font-serif">
            4.8 ★
          </span>
          <span className="text-[11px] text-stone-400 font-medium">Based on 156 farmer reviews</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-2xl p-1.5 shadow-sm">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-blue-700 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Incoming Farmer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'inventory'
              ? 'bg-blue-700 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Product Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'add'
              ? 'bg-blue-700 text-white shadow'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 text-stone-400">
              <Package className="w-12 h-12 mx-auto mb-2 text-stone-300" />
              <p className="font-bold text-stone-700">No orders received yet</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <span className="font-mono font-bold text-sm text-stone-900">Order #{order.id}</span>
                    <span className="text-xs text-stone-500 ml-3">Placed: {order.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-medium">Current Status:</span>
                    <span className="bg-blue-100 text-blue-900 font-bold text-xs px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h5 className="font-bold text-stone-800 mb-2">Customer / Farmer Details:</h5>
                    <p className="text-stone-700 font-semibold">{order.farmerName}</p>
                    <p className="text-stone-500 flex items-center gap-1 mt-1">
                      <Phone className="w-3.5 h-3.5" /> {order.farmerPhone}
                    </p>
                    <p className="text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {order.deliveryType} • {order.deliveryAddress}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-stone-800 mb-2">Ordered Agricultural Inputs:</h5>
                    <div className="space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-stone-700">
                          <span>{item.name} (x{item.quantity})</span>
                          <span className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                        <span>Total Payable:</span>
                        <span className="text-emerald-700">₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Advancement Action Buttons */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 font-medium">Update Order Lifecycle:</span>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {order.status === 'New' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Accepted')}
                        className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold shadow"
                      >
                        Accept Order
                      </button>
                    )}

                    {(order.status === 'New' || order.status === 'Accepted') && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Packed')}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow"
                      >
                        Mark as Packed
                      </button>
                    )}

                    {(order.status === 'Packed') && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Dispatched')}
                        className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold shadow"
                      >
                        Handover to Delivery / Dispatch
                      </button>
                    )}

                    {(order.status === 'Dispatched') && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold shadow"
                      >
                        Confirm Delivered
                      </button>
                    )}

                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 rounded-lg font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase">
                <tr>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Crop Suitability</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50">
                    <td className="p-4 font-bold text-stone-900 flex items-center gap-2">
                      <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-4 text-stone-600">{p.category}</td>
                    <td className="p-4 text-emerald-800 font-semibold">{p.cropSuitability}</td>
                    <td className="p-4 font-bold text-stone-900">₹{p.price} / {p.unit}</td>
                    <td className="p-4">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        Available ({p.stockCount || 50} in stock)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === 'add' && (
        <div className="bg-white max-w-xl mx-auto rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900">List New Product in KrishiSetu Marketplace</h3>
          <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Product Title</label>
              <input
                type="text"
                placeholder="e.g. Mahyco Hybrid Cotton Seeds 500g"
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizers">Fertilizers</option>
                  <option value="Pesticides">Pesticides</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Farming Tools">Farming Tools</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Target Crop</label>
                <input
                  type="text"
                  placeholder="e.g. Cotton, Wheat, All Crops"
                  value={newProdCrop}
                  onChange={(e) => setNewProdCrop(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Packaging Unit</label>
                <input
                  type="text"
                  placeholder="e.g. Bag (50kg), Bottle (1L)"
                  value={newProdUnit}
                  onChange={(e) => setNewProdUnit(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Description & Usage Guidelines</label>
              <textarea
                rows={3}
                placeholder="Dosage, benefits, crop resistance..."
                value={newProdDesc}
                onChange={(e) => setNewProdDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow transition"
            >
              Add to Active Marketplace
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
