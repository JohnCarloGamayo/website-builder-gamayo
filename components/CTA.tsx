'use client';

import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-[#030014]">
      {/* Ultra-Modern Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(16,185,129,0.18),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_70%,rgba(120,40,200,0.12),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(236,72,153,0.1),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Advanced Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-emerald-600/30 to-green-600/30 rounded-full blur-[140px] animate-pulse opacity-70"></div>
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-purple-600/25 to-fuchsia-600/25 rounded-full blur-[140px] animate-pulse opacity-60" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full blur-[160px] opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <div className="group relative border-2 border-white/20 rounded-[3rem] p-12 sm:p-16 md:p-24 text-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl hover:border-white/30 transition-all duration-700 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:shadow-[0_50px_140px_-20px_rgba(0,0,0,0.9),0_0_100px_-20px_rgba(16,185,129,0.4)] animate-fade-in-up overflow-hidden hover:scale-[1.02]">
          
          {/* Enhanced Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Advanced Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Premium Icon Badge with Advanced Animation */}
          <div className="relative flex justify-center mb-12 animate-float">
            <div className="relative p-7 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-[2rem] border-2 border-emerald-400/40 shadow-[0_30px_80px_rgba(16,185,129,0.5),0_0_0_1px_rgba(255,255,255,0.2)_inset] group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-[2rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Gift size={48} className="text-emerald-200 relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
            </div>
          </div>
          
          <div className="relative">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_4px_50px_rgba(16,185,129,0.6)] animate-gradient-x">
                Start Building Today
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_4px_50px_rgba(168,85,247,0.5)] animate-gradient-x mt-2">
                100% Free!
              </span>
            </h2>
            <p className="text-gray-300/95 text-xl sm:text-2xl md:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
              We're in beta testing and <span className="text-white font-medium">all premium features</span> are completely free! Create unlimited websites, export <span className="text-emerald-400 font-medium">production-ready code</span>, and build amazing projects.
            </p>
            
            {/* Ultra-Premium CTA Button Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/editor"
                className="group/btn relative px-12 py-6 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-bold rounded-2xl transition-all duration-500 flex items-center gap-4 shadow-[0_0_80px_rgba(16,185,129,0.6),0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:shadow-[0_0_100px_rgba(16,185,129,0.8)] transform hover:scale-115 text-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <span className="relative font-extrabold tracking-wide">Launch Editor — Free Forever</span>
                <ArrowRight size={26} className="relative group-hover/btn:translate-x-2 transition duration-300 animate-pulse" />
              </Link>
              
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="group/alt px-12 py-6 bg-white/[0.06] hover:bg-white/[0.12] border-2 border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all duration-500 backdrop-blur-2xl text-xl shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
