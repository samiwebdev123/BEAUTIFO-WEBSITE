import React, { useState } from 'react';
import { INITIAL_CUSTOMERS, AdminCustomer } from './adminData';
import { formatPKR } from '../utils/format';
import { Search, Mail, Phone, MapPin, UserCheck } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const [customers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E3889B] uppercase font-mono">
            CLIENT DIRECTORY
          </span>
          <h2 className="text-2xl font-serif text-[#1F1F1F] font-normal">Customer Accounts</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Registered Pakistan clients, purchasing history, and loyalty values.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-600 bg-white px-3.5 py-2 rounded-xl border border-[#F7D6DC] shadow-2xs font-mono">
            {customers.length} verified customers
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F7D6DC] shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name, email, city..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF5F6] rounded-xl border border-[#F7D6DC] text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#E3889B] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-[#F7D6DC] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-[#FAF5F6] border-b border-[#F7D6DC] text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4 text-right">Last Purchase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDF0F3]">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#FAF5F6]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF5F6] border border-[#F7D6DC] flex items-center justify-center font-serif text-xs font-semibold text-[#1F1F1F]">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1F1F1F]">{customer.name}</p>
                        <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          <span>Active Client</span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="text-neutral-700 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#E3889B]" />
                      <span>{customer.email}</span>
                    </p>
                    <p className="text-neutral-400 text-[11px] flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-neutral-400" />
                      <span>{customer.phone}</span>
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-neutral-700">
                      <MapPin className="w-3 h-3 text-[#E3889B]" />
                      <span>{customer.city}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-neutral-700">
                    {customer.ordersCount} orders
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#1F1F1F] font-mono">
                    {formatPKR(customer.totalSpent)}
                  </td>

                  <td className="py-3.5 px-4 text-right text-neutral-500 font-mono text-[11px]">
                    {customer.lastOrderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
