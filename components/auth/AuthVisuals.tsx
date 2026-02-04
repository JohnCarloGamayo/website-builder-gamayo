'use client';

import { useEffect, useState } from 'react';

export default function AuthVisuals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full bg-[#050510] overflow-hidden flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* 3D Scene Container */}
      <div className="relative w-[400px] h-[500px] perspective-1000">
        
        {/* Main Floating Card */}
        <div 
            className="absolute inset-0 bg-[#1e1e2e]/90 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transform-style-3d animate-float-slow"
            style={{ transform: 'rotateY(-10deg) rotateX(5deg)' }}
        >
          {/* Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          {/* Content Mockup */}
          <div className="p-6 space-y-4">
             <div className="h-8 w-3/4 bg-white/10 rounded animate-pulse" />
             <div className="h-32 w-full bg-white/5 rounded border border-white/5" />
             <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-purple-500/20 rounded border border-purple-500/30" />
                <div className="h-24 bg-blue-500/20 rounded border border-blue-500/30" />
             </div>
          </div>
        </div>

        {/* Floating Elements - Layer 1 */}
        <div 
            className="absolute -right-12 top-20 w-40 h-24 bg-[#2a2a3e] border border-gray-700 rounded-lg shadow-xl transform-style-3d animate-float-delayed backdrop-blur-md"
            style={{ transform: 'translateZ(50px) rotateY(-10deg) rotateX(5deg)' }}
        >
             <div className="h-2 w-12 bg-green-500 rounded-full m-3 mb-1" />
             <div className="h-2 w-20 bg-gray-600 rounded-full m-3 mt-0" />
             <div className="mt-4 mx-3 grid grid-cols-3 gap-2">
                <div className="h-6 bg-gray-700 rounded" />
                <div className="h-6 bg-gray-700 rounded" />
                <div className="h-6 bg-gray-700 rounded" />
             </div>
        </div>

        {/* Floating Elements - Layer 2 */}
        <div 
            className="absolute -left-8 bottom-32 w-32 h-32 bg-gray-900/80 border border-purple-500/30 rounded-lg shadow-xl flex items-center justify-center transform-style-3d animate-float"
            style={{ transform: 'translateZ(80px) rotateY(-10deg) rotateX(5deg)', animationDelay: '1s' }}
        >
            <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
        </div>

         {/* Decorative Ring */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow pointer-events-none" />
      </div>

       <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes float-slow {
          0%, 100% { transform: rotateY(-10deg) rotateX(5deg) translateY(0px); }
          50% { transform: rotateY(-5deg) rotateX(2deg) translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateZ(80px) rotateY(-10deg) rotateX(5deg) translateY(0px); }
          50% { transform: translateZ(80px) rotateY(-10deg) rotateX(5deg) translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateZ(50px) rotateY(-10deg) rotateX(5deg) translateY(0px); }
          50% { transform: translateZ(50px) rotateY(-10deg) rotateX(5deg) translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>
    </div>
  );
}
