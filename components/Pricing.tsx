'use client';

import { useState } from 'react';
import { Check, Sparkles, Rocket, Gift } from 'lucide-react';

export default function Pricing() {
  const freeFeatures = [
    'Unlimited Website Projects',
    'Unlimited Pages per site',
    'All Pro Components & Templates',
    'Drag & Drop Editor',
    'Export HTML/CSS/JS',
    'Export React/Next.js Code',
    'ZIP Export with Assets',
    'Responsive Preview Modes',
    'Animations & Effects',
    'Multi-page Navigation',
    'Group/Ungroup Layers',
    'Keyboard Shortcuts',
    'Auto-save to Browser',
  ];

  return (
    <section id="pricing" className="py-36 px-6 bg-[#030014] relative overflow-hidden">
      {/* Ultra-Modern Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(16,185,129,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_70%,rgba(20,184,166,0.1),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Advanced Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-600/25 to-green-600/25 rounded-full blur-[130px] animate-pulse opacity-70"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-teal-600/20 to-cyan-600/20 rounded-full blur-[130px] animate-pulse opacity-60" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-green-600/15 to-emerald-600/15 rounded-full blur-[150px] opacity-50"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/15 via-green-500/15 to-teal-500/15 backdrop-blur-2xl border border-emerald-400/40 rounded-full px-8 py-3.5 mb-10 shadow-[0_0_40px_rgba(16,185,129,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] group hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
            <Gift className="text-emerald-300 relative" size={22} />
            <span className="text-emerald-300 font-bold text-base bg-gradient-to-r from-emerald-200 via-green-300 to-teal-200 bg-clip-text text-transparent tracking-wide relative">
              🎉 100% FREE DURING BETA TESTING!
            </span>
          </div>
          
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tighter">
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_4px_50px_rgba(16,185,129,0.5)] animate-gradient-x">
              100% FREE
            </span>
          </h2>
          <p className="text-gray-300/95 text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
            We're in beta testing phase. Enjoy all <span className="text-white font-medium">premium features</span> completely free while we perfect the experience!
          </p>
        </div>

        {/* Ultra-Premium Glassmorphic Card */}
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative rounded-[2.5rem] p-12 border-2 border-emerald-500/40 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(16,185,129,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] group hover:border-emerald-400/60 transition-all duration-700 hover:shadow-[0_50px_120px_-20px_rgba(16,185,129,0.7),0_0_80px_-10px_rgba(16,185,129,0.4)] overflow-hidden hover:scale-[1.02]">
            
            {/* Enhanced Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            
            {/* Advanced Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Premium Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 animate-float">
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-10 py-4 rounded-full text-base font-bold shadow-[0_20px_60px_rgba(16,185,129,0.5),0_0_0_1px_rgba(255,255,255,0.2)_inset] flex items-center gap-3 border border-emerald-400/30 hover:scale-110 transition-transform duration-500">
                <Sparkles size={22} className="animate-pulse" /> Beta Access
              </span>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-14 mt-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-8xl sm:text-9xl font-black bg-gradient-to-br from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)] tracking-tight">
                    FREE
                  </span>
                </div>
                <p className="text-gray-300/90 text-lg tracking-wide">All premium features unlocked during testing</p>
              </div>

              {/* Premium Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
                {freeFeatures.map((feature, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 py-3.5 px-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.12] transition-all duration-500 group/item hover:scale-105 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center border border-emerald-400/30 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                      <Check size={16} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                    </div>
                    <span className="text-gray-300 text-base font-medium group-hover/item:text-white transition-colors tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Ultra-Premium CTA Button */}
              <button
                onClick={() => window.location.href = '/editor'}
                className="relative group/btn w-full py-6 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-[0_0_60px_rgba(16,185,129,0.5),0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:shadow-[0_0_80px_rgba(16,185,129,0.7)] text-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <Rocket size={26} className="relative animate-pulse" />
                <span className="relative font-extrabold tracking-wide">Start Building Now — Free Forever</span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Info Note */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-white/[0.08] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-2xl px-10 py-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:scale-105 transition-transform duration-500">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_16px_rgba(16,185,129,1)] ring-4 ring-emerald-400/30"></div>
            <span className="text-gray-300/95 text-base font-medium tracking-wide">
              Premium plans coming soon. Beta testers will get <span className="text-emerald-400 font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">exclusive lifetime discounts!</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
