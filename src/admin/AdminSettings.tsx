import React, { useState } from 'react';
import { Shield, Key, Globe, Check, Palette, Sparkles, Terminal, UserCheck, Phone } from 'lucide-react';
import { getAdminOwner, saveAdminOwner, AdminOwnerInfo } from './adminData';

export const AdminSettings: React.FC = () => {
  const [storeName, setStoreName] = useState('BEAUTIFO');
  const [currency] = useState('PKR');
  const [ownerInfo, setOwnerInfo] = useState<AdminOwnerInfo>(() => getAdminOwner());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminOwner(ownerInfo);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8 font-sans">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E3889B] uppercase font-mono">
          CONFIGURATION
        </span>
        <h2 className="text-2xl font-serif text-[#1F1F1F] font-normal">Store & Admin Settings</h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Manage brand properties, inspect the active BEAUTIFO theme system, and configure security.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Admin Owner Information */}
        <div className="bg-white p-6 rounded-2xl border border-[#F7D6DC] shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#FDF0F3] pb-3">
            <h3 className="font-serif text-base text-[#1F1F1F] font-normal flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#E3889B]" />
              <span>Admin Owner Information</span>
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E3889B] bg-[#FDF0F3] px-2.5 py-1 rounded-full border border-[#F7D6DC] font-semibold">
              OWNER
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Owner Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ownerInfo.name}
                  onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6] text-[#1F1F1F] font-medium focus:bg-white focus:outline-hidden focus:border-[#E3889B]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#E3889B] bg-[#FDF0F3] px-2 py-0.5 rounded border border-[#F7D6DC]">
                  Owner
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Owner Name: <span className="font-semibold text-neutral-800">Sami Raza</span></p>
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ownerInfo.phone}
                  onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6] text-neutral-800 font-mono font-medium focus:bg-white focus:outline-hidden focus:border-[#E3889B]"
                />
                <a
                  href={`tel:${ownerInfo.phone}`}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>Call</span>
                </a>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Phone: <a href={`tel:${ownerInfo.phone}`} className="font-semibold text-neutral-800 hover:text-[#E3889B] transition-colors">{ownerInfo.phone}</a></p>
            </div>
          </div>
        </div>

        {/* Store Profile */}
        <div className="bg-white p-6 rounded-2xl border border-[#F7D6DC] shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#FDF0F3] pb-3">
            <h3 className="font-serif text-base text-[#1F1F1F] font-normal flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#E3889B]" />
              <span>Store Profile</span>
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Public Brand Info
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6] text-[#1F1F1F] font-medium focus:bg-white focus:outline-hidden focus:border-[#E3889B]"
              />
              <p className="text-[10px] text-neutral-400 mt-1">Official brand label: BEAUTIFO Cosmetics</p>
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Active Currency
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={`${currency} (Pakistani Rupee)`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6] text-neutral-700 font-mono font-medium cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Fixed PKR
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">Standardized across all public & admin views</p>
            </div>
          </div>
        </div>

        {/* Admin Theme Preview */}
        <div className="bg-white p-6 rounded-2xl border border-[#F7D6DC] shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#FDF0F3] pb-3">
            <h3 className="font-serif text-base text-[#1F1F1F] font-normal flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#E3889B]" />
              <span>BEAUTIFO Active Theme Preview</span>
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E3889B] bg-[#FDF0F3] px-2.5 py-1 rounded-full border border-[#F7D6DC]">
              Synchronized with Public Store
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            The admin panel dynamically adopts the BEAUTIFO brand design system. If the public brand palette or accents change, the administration workspace automatically syncs:
          </p>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6]">
              <div className="w-full h-8 rounded-lg bg-[#FAF5F6] border border-[#F7D6DC] mb-2" />
              <p className="text-[11px] font-semibold text-neutral-800">Background Cream</p>
              <p className="text-[10px] font-mono text-neutral-400">#FAF5F6</p>
            </div>

            <div className="p-3 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6]">
              <div className="w-full h-8 rounded-lg bg-[#F7D6DC] border border-[#E3889B]/30 mb-2" />
              <p className="text-[11px] font-semibold text-neutral-800">Theme Border & Tone</p>
              <p className="text-[10px] font-mono text-neutral-400">#F7D6DC</p>
            </div>

            <div className="p-3 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6]">
              <div className="w-full h-8 rounded-lg bg-[#E3889B] mb-2" />
              <p className="text-[11px] font-semibold text-neutral-800">Brand Accent Rose</p>
              <p className="text-[10px] font-mono text-neutral-400">#E3889B</p>
            </div>

            <div className="p-3 rounded-xl border border-[#F7D6DC] bg-[#FAF5F6]">
              <div className="w-full h-8 rounded-lg bg-[#1F1F1F] mb-2" />
              <p className="text-[11px] font-semibold text-neutral-800">Primary Slate / Dark</p>
              <p className="text-[10px] font-mono text-neutral-400">#1F1F1F</p>
            </div>
          </div>

          {/* Component Preview Strip */}
          <div className="p-4 rounded-xl bg-[#FAF5F6] border border-[#F7D6DC] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E3889B]" />
              <span className="font-serif text-[#1F1F1F] text-sm">Theme Component Elements:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#FDF0F3] text-[#E3889B] text-[10px] font-semibold border border-[#F7D6DC]">
                Active Badge
              </span>
              <button
                type="button"
                className="px-3.5 py-1.5 bg-[#1F1F1F] hover:bg-[#E3889B] text-white rounded-lg text-[11px] font-medium tracking-wide uppercase transition-colors shadow-2xs"
              >
                Sample Action
              </button>
            </div>
          </div>
        </div>

        {/* Admin Password & Access Information */}
        <div className="bg-white p-6 rounded-2xl border border-[#F7D6DC] shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#FDF0F3] pb-3">
            <h3 className="font-serif text-base text-[#1F1F1F] font-normal flex items-center gap-2">
              <Key className="w-4 h-4 text-[#E3889B]" />
              <span>Admin Authentication & Access</span>
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
              Active Session
            </span>
          </div>

          <div className="text-xs text-neutral-600 space-y-4">
            <p className="leading-relaxed">
              The <strong className="text-neutral-900 font-mono">/admin</strong> panel uses dedicated direct credential authentication with instant dashboard redirection and active <code className="bg-[#FAF5F6] text-[#E3889B] font-mono px-1.5 py-0.5 rounded border border-[#F7D6DC]">sessionStorage</code> persistence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#FAF5F6] border border-[#F7D6DC] space-y-1.5">
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#E3889B]" />
                  <span>Session Persistence</span>
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Refreshing any page (Dashboard, Products, Orders, Customers, Settings) preserves your active admin session automatically.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5F6] border border-[#F7D6DC] space-y-1.5">
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#E3889B]" />
                  <span>Direct URL Routing</span>
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Direct browser access is supported for Netlify and Vercel with single-page application fallback to prevent 404 errors.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-start gap-2 text-[11px] text-neutral-500 border-t border-[#FDF0F3]">
              <Shield className="w-4 h-4 text-[#E3889B] shrink-0 mt-0.5" />
              <span>
                To exit the admin workspace, use the Logout button in the sidebar. This will clear the active session and return to /admin.
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs text-emerald-600 flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4" />
              <span>Settings saved successfully</span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1F1F1F] hover:bg-[#E3889B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
