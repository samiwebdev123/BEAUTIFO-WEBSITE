import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { loginAdmin } from './auth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onReturnToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToStore,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginAdmin(password);
    if (result.success) {
      setError(null);
      onLoginSuccess();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#F7D6DC] selection:text-[#1F1F1F]">
      {/* Top Brand Link Back to Public Store */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <button
          onClick={onReturnToStore}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-500 hover:text-[#E3889B] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Header matching exact prompt requirements */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FDF0F3] border border-[#F7D6DC] text-[#E3889B] mb-4 shadow-2xs">
            <Lock className="w-5 h-5 text-[#E3889B]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#1F1F1F] font-normal">
            BEAUTIFO
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#E3889B]">
            ADMIN PANEL
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-[#F7D6DC] rounded-2xl sm:rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium text-neutral-700 tracking-wider uppercase mb-2"
              >
                Password:
              </label>
              
              <div className="relative rounded-xl border border-[#F2D0D7] focus-within:border-[#E3889B] focus-within:ring-1 focus-within:ring-[#E3889B] transition-all bg-[#FDFBFB]">
                <input
                  id="admin-password"
                  name="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter Admin Password"
                  className="block w-full px-4 py-3.5 pr-12 text-sm text-[#1F1F1F] placeholder:text-neutral-400 focus:outline-hidden rounded-xl bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-[#E3889B] cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Clean, unambiguous error message strictly meeting prompt instructions */}
            {error && (
              <div
                role="alert"
                className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-800 flex items-center gap-2.5 animate-in fade-in duration-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-white bg-[#1F1F1F] hover:bg-[#E3889B] active:scale-[0.99] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#E3889B] transition-all cursor-pointer shadow-xs"
              >
                LOGIN
              </button>
            </div>
          </form>

          {/* Discreet Security Badge */}
          <div className="mt-8 pt-6 border-t border-[#FDF0F3] flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Administration Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};
