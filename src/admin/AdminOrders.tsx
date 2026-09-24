import React, { useState } from 'react';
import { AdminOrder } from './adminData';
import { formatPKR } from '../utils/format';
import { Search, Eye, Filter, X, ShoppingBag, MapPin, Phone, Mail, Calendar } from 'lucide-react';

interface AdminOrdersProps {
  orders: AdminOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: AdminOrder['status']) => void;
}

const ORDER_STATUSES: AdminOrder['status'][] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Completed',
  'Cancelled',
];

export const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, onUpdateOrderStatus }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeModalOrder, setActiveModalOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filterStatus === 'All' || o.status === filterStatus;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeStyle = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-[#FDF0F3] text-[#E3889B] border-[#F7D6DC]';
      case 'Processing':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-neutral-50 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E3889B] uppercase font-mono">
            ORDER FULFILLMENT
          </span>
          <h2 className="text-2xl font-serif text-[#1F1F1F] font-normal">Customer Orders</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Track order status, manage COD transactions, and update fulfillment progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-600 bg-white px-3.5 py-2 rounded-xl border border-[#F7D6DC] shadow-2xs font-mono">
            {orders.length} Orders Recorded
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F7D6DC] shadow-2xs flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, customer, city, or product..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF5F6] rounded-xl border border-[#F7D6DC] text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#E3889B] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0 mr-1" />
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              filterStatus === 'All'
                ? 'bg-[#1F1F1F] text-white shadow-2xs'
                : 'bg-[#FAF5F6] text-neutral-600 hover:bg-[#FDF0F3] hover:text-[#E3889B] border border-[#F7D6DC]'
            }`}
          >
            All
          </button>
          {ORDER_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                filterStatus === status
                  ? 'bg-[#1F1F1F] text-white shadow-2xs'
                  : 'bg-[#FAF5F6] text-neutral-600 hover:bg-[#FDF0F3] hover:text-[#E3889B] border border-[#F7D6DC]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#F7D6DC] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-[#FAF5F6] border-b border-[#F7D6DC] text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Products</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDF0F3]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF5F6]/60 transition-colors">
                    {/* Order ID */}
                    <td className="py-3 px-4 font-mono font-medium text-[#1F1F1F]">
                      <span className="bg-[#FAF5F6] border border-[#F7D6DC] px-2 py-1 rounded-md text-[11px]">
                        {order.orderNumber}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#1F1F1F]">{order.customerName}</p>
                      <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#E3889B]" />
                        <span>{order.city}</span>
                        <span>&middot;</span>
                        <span>{order.phone}</span>
                      </p>
                    </td>

                    {/* Products */}
                    <td className="py-3 px-4">
                      <div className="max-w-[200px]">
                        <p className="font-medium text-neutral-800 truncate">
                          {order.items[0]?.name || 'Cosmetic Item'}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {order.items.length > 1
                            ? `+ ${order.items.length - 1} more (${order.itemsCount} items total)`
                            : `Qty: ${order.items[0]?.quantity || 1}`}
                        </p>
                      </div>
                    </td>

                    {/* Total (PKR) */}
                    <td className="py-3 px-4 font-semibold text-[#1F1F1F] font-mono">
                      {formatPKR(order.total)}
                      <span className="block text-[10px] text-neutral-400 font-normal">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(order.id, e.target.value as AdminOrder['status'])
                        }
                        className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 border cursor-pointer focus:outline-hidden transition-colors ${getStatusBadgeStyle(
                          order.status
                        )}`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                      {order.date}
                    </td>

                    {/* Details action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveModalOrder(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#F7D6DC] hover:bg-[#FDF0F3] text-neutral-700 hover:text-[#E3889B] text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#E3889B]" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-[#F7D6DC]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F7D6DC]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3889B] font-semibold">
                  ORDER DETAILS
                </span>
                <h3 className="font-serif text-xl text-[#1F1F1F]">
                  Order {activeModalOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#FAF5F6] p-3.5 rounded-2xl border border-[#F7D6DC]">
                <div>
                  <p className="text-neutral-400 uppercase text-[10px] tracking-wider font-mono">
                    Customer Information
                  </p>
                  <p className="font-semibold text-[#1F1F1F] mt-1">{activeModalOrder.customerName}</p>
                  <p className="text-neutral-600 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-[#E3889B]" />
                    <span>{activeModalOrder.email}</span>
                  </p>
                  <p className="text-neutral-600 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-[#E3889B]" />
                    <span>{activeModalOrder.phone}</span>
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 uppercase text-[10px] tracking-wider font-mono">
                    Fulfillment Destination
                  </p>
                  <p className="font-semibold text-[#1F1F1F] mt-1">{activeModalOrder.city}, Pakistan</p>
                  <p className="text-neutral-600 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-[#E3889B]" />
                    <span>{activeModalOrder.date}</span>
                  </p>
                  <p className="text-neutral-600 mt-0.5">Method: {activeModalOrder.paymentMethod}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-[#1F1F1F] uppercase text-[10px] tracking-wider font-mono">
                    Ordered Products
                  </p>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {activeModalOrder.itemsCount} total quantity
                  </span>
                </div>

                <div className="divide-y divide-[#FDF0F3] border border-[#F7D6DC] rounded-2xl overflow-hidden bg-white">
                  {activeModalOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#FAF5F6] border border-[#F7D6DC] flex items-center justify-center text-[#E3889B]">
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F1F1F]">{item.name}</p>
                          <p className="text-neutral-400 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#1F1F1F] font-mono">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update in Modal */}
              <div className="p-3.5 bg-[#FAF5F6] rounded-2xl border border-[#F7D6DC] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    Current Fulfillment Status
                  </span>
                  <div className="mt-1">
                    <select
                      value={activeModalOrder.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as AdminOrder['status'];
                        onUpdateOrderStatus(activeModalOrder.id, newStatus);
                        setActiveModalOrder({ ...activeModalOrder, status: newStatus });
                      }}
                      className={`text-xs font-semibold rounded-xl px-3 py-1.5 border cursor-pointer focus:outline-hidden ${getStatusBadgeStyle(
                        activeModalOrder.status
                      )}`}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    Grand Total
                  </span>
                  <p className="text-lg font-serif font-semibold text-[#1F1F1F] font-mono mt-0.5">
                    {formatPKR(activeModalOrder.total)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalOrder(null)}
                className="px-5 py-2.5 bg-[#1F1F1F] hover:bg-[#E3889B] text-white rounded-xl text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
