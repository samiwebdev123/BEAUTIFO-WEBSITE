import React from 'react';
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Eye,
  Sparkles,
  Phone,
} from 'lucide-react';
import { formatPKR } from '../utils/format';
import { Product } from '../types';
import { AdminOrder } from './adminData';

interface AdminDashboardProps {
  products: Product[];
  orders: AdminOrder[];
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, onNavigate }) => {
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Category breakdown
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryLabels: Record<string, string> = {
    face: 'For face',
    body: 'For body',
    hair: 'For hair',
    accessories: 'Accessories',
  };

  // Mock 7-day performance trend
  const weeklyData = [
    { day: 'Mon', amount: 14200, count: 4 },
    { day: 'Tue', amount: 18900, count: 5 },
    { day: 'Wed', amount: 22400, count: 7 },
    { day: 'Thu', amount: 16800, count: 4 },
    { day: 'Fri', amount: 27500, count: 8 },
    { day: 'Sat', amount: 34100, count: 11 },
    { day: 'Sun', amount: 29800, count: 9 },
  ];
  const maxWeeklyAmount = Math.max(...weeklyData.map((d) => d.amount));

  return (
    <div className="space-y-8 font-sans">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E3889B] uppercase font-mono">
            OVERVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1F1F] font-normal">
            BEAUTIFO ADMIN
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Store performance, inventory metrics, and recent client activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/admin/products')}
            className="px-4 py-2 bg-white border border-[#F7D6DC] hover:border-[#E3889B] hover:bg-[#FDF0F3] rounded-xl text-xs font-medium text-neutral-700 hover:text-[#E3889B] transition-colors cursor-pointer shadow-2xs"
          >
            Manage Catalog
          </button>
          <button
            onClick={() => onNavigate('/admin/orders')}
            className="px-4 py-2 bg-[#1F1F1F] hover:bg-[#E3889B] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
          >
            Review Orders
          </button>
        </div>
      </div>

      {/* Admin Owner Information Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F7D6DC] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] border border-[#F7D6DC] flex items-center justify-center text-[#E3889B] shrink-0 font-serif text-lg shadow-2xs">
            SR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E3889B] font-bold bg-[#FDF0F3] px-2.5 py-0.5 rounded-full border border-[#F7D6DC]">
                OWNER
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">Administration Profile</span>
            </div>
            <h3 className="text-lg font-serif text-[#1F1F1F] font-normal mt-1">Sami Raza</h3>
            <div className="flex items-center gap-3 text-xs text-neutral-600 mt-0.5">
              <span className="text-neutral-400 text-[11px]">Direct Contact:</span>
              <a
                href="tel:03112989025"
                className="font-mono font-medium text-neutral-800 hover:text-[#E3889B] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#E3889B]" />
                <span>03112989025</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center border-t md:border-t-0 border-[#FDF0F3] pt-3 md:pt-0 w-full md:w-auto">
          <a
            href="tel:03112989025"
            className="flex-1 md:flex-none text-center px-4 py-2 bg-[#FAF5F6] hover:bg-[#FDF0F3] border border-[#F7D6DC] rounded-xl text-xs font-medium text-neutral-700 hover:text-[#E3889B] transition-colors inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#E3889B]" />
            <span>03112989025</span>
          </a>
          <button
            onClick={() => onNavigate('/admin/settings')}
            className="flex-1 md:flex-none text-center px-4 py-2 bg-white hover:bg-[#FAF5F6] border border-[#F7D6DC] rounded-xl text-xs font-medium text-neutral-700 hover:text-[#1F1F1F] transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <span>Admin Settings</span>
          </button>
        </div>
      </div>

      {/* 4 Required Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#F7D6DC] shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FDF0F3] border border-[#F7D6DC] flex items-center justify-center text-[#E3889B]">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-serif text-[#1F1F1F] font-normal">{totalProducts}</span>
            <p className="text-[11px] text-[#E3889B] mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Active cosmetics catalog</span>
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#F7D6DC] shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FDF0F3] border border-[#F7D6DC] flex items-center justify-center text-[#E3889B]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-serif text-[#1F1F1F] font-normal">{totalOrders}</span>
            <p className="text-[11px] text-neutral-500 mt-1">
              Revenue: <span className="font-semibold text-neutral-800">{formatPKR(totalRevenue)}</span>
            </p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#F7D6DC] shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Pending Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-serif text-amber-900 font-normal">{pendingOrders}</span>
            <p className="text-[11px] text-amber-600 mt-1 font-medium">
              Awaiting dispatch & verification
            </p>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#F7D6DC] shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Completed Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-serif text-emerald-900 font-normal">{completedOrders}</span>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">
              Delivered throughout Pakistan
            </p>
          </div>
        </div>
      </div>

      {/* Clean Visual Charts / Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Trend Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F7D6DC] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E3889B] font-mono">
                SALES VELOCITY
              </span>
              <h3 className="font-serif text-lg text-[#1F1F1F] font-normal">7-Day Revenue Trend</h3>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono font-semibold text-[#1F1F1F]">
                {formatPKR(weeklyData.reduce((s, d) => s + d.amount, 0))}
              </p>
              <p className="text-[10px] text-neutral-400">Weekly Total (PKR)</p>
            </div>
          </div>

          {/* Bar Visualizer */}
          <div className="pt-4 pb-2">
            <div className="flex items-end justify-between gap-3 h-36 border-b border-[#F7D6DC]/60 px-2">
              {weeklyData.map((item, idx) => {
                const heightPercent = Math.round((item.amount / maxWeeklyAmount) * 100);
                const isHighlight = idx === weeklyData.length - 2; // Saturday
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-medium text-neutral-700 bg-[#FDF0F3] border border-[#F7D6DC] px-1.5 py-0.5 rounded-sm whitespace-nowrap shadow-2xs pointer-events-none">
                      {formatPKR(item.amount)}
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 ${
                        isHighlight
                          ? 'bg-[#E3889B] shadow-2xs'
                          : 'bg-[#F7D6DC] hover:bg-[#E3889B]'
                      }`}
                    />
                    <span className="text-[11px] font-medium text-neutral-500 pt-1">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-[#FDF0F3]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3889B]" />
              <span>Highest volume day (Saturday: 11 orders)</span>
            </span>
            <span className="font-mono text-neutral-400">Currency: PKR</span>
          </div>
        </div>

        {/* Category Breakdown Progress */}
        <div className="bg-white rounded-2xl border border-[#F7D6DC] p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E3889B] font-mono">
                  CATALOG STATS
                </span>
                <h3 className="font-serif text-lg text-[#1F1F1F] font-normal">Products by Category</h3>
              </div>
              <Sparkles className="w-4 h-4 text-[#E3889B]" />
            </div>

            <div className="space-y-3.5 mt-5">
              {(['face', 'body', 'hair', 'accessories'] as const).map((cat) => {
                const count = categoryCounts[cat] || 0;
                const percentage = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-700">{categoryLabels[cat]}</span>
                      <span className="font-mono text-neutral-500 font-semibold">{count} items ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#FAF5F6] rounded-full h-2 border border-[#F7D6DC]/50 overflow-hidden">
                      <div
                        className="bg-[#E3889B] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#FDF0F3] flex items-center justify-between text-xs text-neutral-500">
            <span>Catalog Distribution</span>
            <button
              onClick={() => onNavigate('/admin/products')}
              className="text-[#E3889B] hover:text-[#1F1F1F] font-semibold transition-colors cursor-pointer"
            >
              Add New Category &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Orders & Catalog Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F7D6DC] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-lg text-[#1F1F1F] font-normal">Recent Orders</h3>
              <p className="text-xs text-neutral-500">Real-time beauty store transactions</p>
            </div>
            <button
              onClick={() => onNavigate('/admin/orders')}
              className="text-xs font-semibold text-[#E3889B] hover:text-[#1F1F1F] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-[#FAF5F6] border-y border-[#F7D6DC] text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-3">Order</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDF0F3]">
                {orders.slice(0, 5).map((order) => {
                  const statusColors = {
                    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
                    Confirmed: 'bg-[#FDF0F3] text-[#E3889B] border-[#F7D6DC]',
                    Processing: 'bg-purple-50 text-purple-800 border-purple-200',
                    Completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    Cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
                  };
                  return (
                    <tr key={order.id} className="hover:bg-[#FAF5F6]/60 transition-colors">
                      <td className="py-3.5 px-3 font-medium text-[#1F1F1F] font-mono">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-neutral-800">
                        {order.customerName}
                        <span className="block text-[10px] text-neutral-400 font-normal">
                          {order.city}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-neutral-500">{order.date}</td>
                      <td className="py-3.5 px-3 font-semibold text-[#1F1F1F]">
                        {formatPKR(order.total)}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Catalog Snapshot (1 col) */}
        <div className="bg-white rounded-2xl border border-[#F7D6DC] p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-[#1F1F1F] font-normal">Featured Catalog</h3>
              <button
                onClick={() => onNavigate('/admin/products')}
                className="text-xs text-[#E3889B] hover:text-[#1F1F1F] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Manage</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF5F6] transition-colors border border-transparent hover:border-[#F7D6DC]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-11 h-11 object-contain rounded-lg border border-[#F7D6DC] bg-[#FAF5F6] p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1F1F1F] truncate">{p.name}</p>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {formatPKR(p.price)} &middot;{' '}
                      <span className="capitalize">{categoryLabels[p.category] || p.category}</span>
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      p.inStock
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {p.inStock ? 'In Stock' : 'Out'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#FDF0F3]">
            <button
              onClick={() => onNavigate('/admin/products')}
              className="w-full py-2.5 px-4 bg-[#FAF5F6] hover:bg-[#FDF0F3] text-neutral-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#F7D6DC]"
            >
              <Eye className="w-3.5 h-3.5 text-[#E3889B]" />
              <span>Inspect All Products ({totalProducts})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
