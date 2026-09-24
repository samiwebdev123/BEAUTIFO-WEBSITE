import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  onLogout,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icon: Package,
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icon: ShoppingBag,
    },
    {
      id: 'customers',
      label: 'Customers',
      path: '/admin/customers',
      icon: Users,
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF5F6] text-neutral-800 font-sans flex flex-col md:flex-row selection:bg-[#F7D6DC] selection:text-[#1F1F1F]">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-white text-neutral-900 px-4 py-3.5 flex items-center justify-between border-b border-[#F7D6DC] sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FDF0F3] border border-[#F7D6DC] flex items-center justify-center text-[#E3889B]">
            <Sparkles className="w-4 h-4 text-[#E3889B]" />
          </div>
          <div>
            <span className="font-serif text-base tracking-wider block leading-none text-[#1F1F1F]">BEAUTIFO</span>
            <span className="text-[10px] tracking-[0.2em] text-[#E3889B] uppercase font-mono font-semibold">ADMIN</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <span className="text-[8px] font-mono uppercase tracking-[0.16em] text-[#E3889B] font-bold block leading-none">
              OWNER
            </span>
            <p className="text-[11px] font-semibold text-neutral-900 leading-tight">Sami Raza</p>
            <a
              href="https://wa.me/923112989025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] text-neutral-500 font-mono leading-none hover:text-[#25D366] transition-colors block"
              title="WhatsApp: 03112989025"
            >
              03112989025
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-neutral-600 hover:text-[#E3889B] rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-neutral-800 border-r border-[#F7D6DC] transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col justify-between shadow-2xs ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="p-6 border-b border-[#F7D6DC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF0F3] border border-[#F7D6DC] flex items-center justify-center text-[#E3889B] shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#E3889B]" />
              </div>
              <div>
                <h2 className="font-serif text-lg tracking-wider text-[#1F1F1F] leading-tight">BEAUTIFO</h2>
                <span className="text-[10px] tracking-[0.22em] text-[#E3889B] font-semibold uppercase block">
                  ADMIN PANEL
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-neutral-400 hover:text-[#E3889B] p-1 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold font-mono">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path === '/admin/dashboard' && (currentPath === '/admin' || currentPath === '/admin/'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-all duration-150 cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[#FDF0F3] text-[#1F1F1F] border-l-4 border-[#E3889B] font-semibold shadow-2xs'
                      : 'text-neutral-600 hover:text-[#E3889B] hover:bg-[#FDF0F3]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E3889B]' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Owner Profile Card in Sidebar */}
        <div className="mx-4 mb-2 p-3.5 rounded-xl bg-[#FAF5F6] border border-[#F7D6DC] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1F1F1F] text-[#F7D6DC] flex items-center justify-center text-xs font-semibold shrink-0 shadow-2xs">
            SR
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#E3889B] font-bold block leading-none">
              OWNER
            </span>
            <p className="text-xs font-semibold text-neutral-900 truncate mt-0.5">Sami Raza</p>
            <a
              href="https://wa.me/923112989025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-neutral-500 font-mono hover:text-[#25D366] transition-colors truncate flex items-center gap-1"
              title="WhatsApp: 03112989025"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>03112989025</span>
            </a>
          </div>
        </div>

        {/* Bottom Actions: View Store & Logout */}
        <div className="p-4 border-t border-[#F7D6DC] space-y-2">
          {/* Link to public website */}
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-neutral-600 hover:text-[#E3889B] bg-[#FAF5F6] hover:bg-[#FDF0F3] border border-[#F7D6DC] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-[#E3889B]" />
              <span className="font-medium">View Public Store</span>
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">/</span>
          </button>

          {/* Logout Action */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-50 transition-colors cursor-pointer font-medium"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Logout</span>
          </button>

          {/* Security status */}
          <div className="pt-2 px-3 flex items-center gap-2 text-[10px] text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Session Active</span>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-2xs"
        />
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Desktop Topbar */}
        <header className="hidden md:flex bg-white/95 backdrop-blur-md border-b border-[#F7D6DC] px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1F1F1F]">
              BEAUTIFO ADMIN
            </h1>
            <span className="text-neutral-300">/</span>
            <span className="text-xs text-[#E3889B] font-mono font-medium">
              {currentPath.replace('/admin', '') || '/dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-700 hover:text-[#E3889B] border border-[#F7D6DC] hover:border-[#E3889B] hover:bg-[#FDF0F3] px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer bg-white font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E3889B]" />
              <span>Live Store</span>
            </button>

            {/* Top-Right Owner Profile Area */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#F7D6DC]">
              <div className="w-9 h-9 rounded-xl bg-[#1F1F1F] text-[#F7D6DC] flex items-center justify-center text-xs font-semibold shadow-2xs shrink-0">
                SR
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#E3889B] font-bold block leading-none">
                  OWNER
                </span>
                <p className="text-xs font-semibold text-neutral-900 leading-tight mt-0.5">Sami Raza</p>
                <a
                  href="https://wa.me/923112989025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-neutral-500 font-mono hover:text-[#25D366] transition-colors leading-tight flex items-center gap-1"
                  title="WhatsApp: 03112989025"
                >
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  <span>03112989025</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
