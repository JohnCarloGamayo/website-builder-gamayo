'use client';

import AuthVisuals from './AuthVisuals';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0a0f] p-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>

      {/* Right Side - Visuals (Desktop Only) */}
      <div className="hidden lg:block w-1/2 h-screen sticky top-0">
        <AuthVisuals />
      </div>
    </div>
  );
}
