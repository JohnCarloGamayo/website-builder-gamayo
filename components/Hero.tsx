'use client';

import { Star, ArrowRight, LayoutTemplate, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#030014]">
      {/* Ultra-Modern Mesh Gradient Background with Multiple Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(236,72,153,0.2),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_70%,rgba(59,130,246,0.2),rgba(255,255,255,0))]"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Advanced Animated Gradient Orbs with Blur */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/40 via-fuchsia-600/30 to-pink-600/40 blur-[120px] animate-pulse opacity-80"></div>
      <div className="absolute -bottom-20 -left-20 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-600/30 via-cyan-600/20 to-teal-600/30 blur-[130px] animate-pulse opacity-70" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-[140px] opacity-60"></div>
      
      {/* Premium 3D Floating Cards with Enhanced Glassmorphism */}
      <div className="absolute top-20 right-16 w-44 h-32 bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)_inset] p-5 animate-float hidden lg:block rotate-6 hover:rotate-0 transition-all duration-700 z-10 hover:scale-110 group">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-3xl"></div>
         <div className="relative">
            <div className="h-2.5 w-14 bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 rounded-full mb-3 shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
            <div className="h-2 w-28 bg-white/20 rounded-full mb-5"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-transparent rounded-xl border border-purple-400/30 backdrop-blur-sm shadow-[0_8px_16px_rgba(168,85,247,0.2)]"></div>
              <div className="h-12 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-transparent rounded-xl border border-blue-400/30 backdrop-blur-sm shadow-[0_8px_16px_rgba(59,130,246,0.2)]"></div>
            </div>
         </div>
      </div>

      <div className="absolute bottom-32 left-16 w-36 h-36 bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)_inset] p-4 animate-float hidden lg:block -rotate-12 hover:rotate-0 transition-all duration-700 z-10 hover:scale-110" style={{ animationDelay: '1.5s' }}>
         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-3xl"></div>
         <div className="relative">
            <div className="flex gap-2 mb-3">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)] ring-2 ring-red-500/30"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.7)] ring-2 ring-yellow-500/30"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.7)] ring-2 ring-green-500/30"></div>
            </div>
            <div className="space-y-2.5">
              <div className="h-2 w-4/5 bg-white/20 rounded-full"></div>
              <div className="h-2 w-3/5 bg-white/15 rounded-full"></div>
              <div className="h-18 w-full bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20 border border-purple-400/40 rounded-xl flex items-center justify-center text-purple-300 shadow-[0_8px_24px_rgba(168,85,247,0.3)] backdrop-blur-sm">
                <MousePointer2 size={18} className="animate-pulse" />
              </div>
            </div>
         </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Premium Badge with Advanced Shimmer */}
        <div className="mb-10 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500/15 via-green-500/15 to-teal-500/15 backdrop-blur-2xl border border-emerald-400/40 rounded-full px-8 py-3.5 w-fit mx-auto animate-fade-in-up hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
          <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_16px_rgba(52,211,153,1)] ring-4 ring-emerald-400/20"></span>
          <span className="text-sm text-emerald-300 font-bold tracking-wider bg-gradient-to-r from-emerald-200 via-green-300 to-teal-200 bg-clip-text text-transparent relative">
             🎉 100% FREE DURING BETA · NO SIGNUP REQUIRED
          </span>
        </div>

        {/* Ultra-Modern Heading with Advanced Typography */}
        <div className="relative mb-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block bg-gradient-to-b from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)] mb-3">
              Build Websites
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_4px_50px_rgba(168,85,247,0.6)] relative">
              Like Magic. For Free.
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-full animate-gradient-x opacity-60"></div>
            </span>
          </h1>
        </div>

        {/* Enhanced Subtitle with Better Typography */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300/95 mb-14 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-light tracking-wide" style={{ animationDelay: '0.2s' }}>
          Create stunning, <span className="text-white font-medium">responsive websites</span> with our revolutionary drag-and-drop builder. 
          <br className="hidden sm:block" />
          Export <span className="text-purple-300 font-medium">production-ready code</span>—completely free during beta!
        </p>

        {/* Premium CTA Buttons with Magnetic Effect */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up mb-24" style={{ animationDelay: '0.3s' }}>
          <Link href="/editor"
            className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-bold rounded-2xl transition-all transform hover:scale-110 shadow-[0_0_50px_rgba(16,185,129,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_0_80px_rgba(16,185,129,0.7)] w-full sm:w-auto flex items-center justify-center gap-3 overflow-hidden text-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative font-extrabold">Start Building — Free Forever</span>
            <ArrowRight size={22} className="relative group-hover:translate-x-2 transition duration-300" />
          </Link>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-10 py-5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all duration-500 w-full sm:w-auto backdrop-blur-2xl flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:scale-105 text-lg"
          >
            <LayoutTemplate size={20} />
            <span>Explore Features</span>
          </button>
        </div>

        {/* Ultra-Modern Browser Preview with Premium Design */}
        <div className="relative max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
           <div className="relative rounded-3xl bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1a]/90 border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden group hover:border-white/20 transition-all duration-700 hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.95)]">
              
              {/* Premium Glassmorphic Browser Header */}
              <div className="h-14 bg-gradient-to-r from-[#25253a]/98 to-[#2a2a40]/98 backdrop-blur-3xl border-b border-white/10 flex items-center px-5 gap-4">
                 <div className="flex gap-2.5">
                   <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)] ring-2 ring-red-500/30 hover:ring-4 transition-all cursor-pointer"></div>
                   <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.7)] ring-2 ring-yellow-500/30 hover:ring-4 transition-all cursor-pointer"></div>
                   <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.7)] ring-2 ring-green-500/30 hover:ring-4 transition-all cursor-pointer"></div>
                 </div>
                 <div className="flex-1 ml-4 bg-[#13131f]/90 h-8 rounded-xl border border-white/10 flex items-center justify-center text-xs text-gray-400 font-mono backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.3)_inset] hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500/30 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      </div>
                      website-builder.com/editor
                    </div>
                 </div>
              </div>

              {/* Premium Browser Content */}
              <div className="flex h-[520px] bg-gradient-to-br from-[#0a0a15]/95 to-[#050510]/98">
                  {/* Premium Sidebar */}
                  <div className="w-24 border-r border-white/5 bg-gradient-to-b from-[#0f0f1f]/80 to-[#0a0a15]/80 backdrop-blur-xl flex flex-col items-center py-8 gap-5">
                      {[
                        { color: 'from-purple-500/40 to-fuchsia-500/40', border: 'purple-400/40' },
                        { color: 'from-blue-500/40 to-cyan-500/40', border: 'blue-400/40' },
                        { color: 'from-pink-500/40 to-rose-500/40', border: 'pink-400/40' },
                        { color: 'from-emerald-500/40 to-teal-500/40', border: 'emerald-400/40' }
                      ].map((item, i) => (
                        <div key={i} className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} border border-${item.border} hover:border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer backdrop-blur-sm`}></div>
                      ))}
                  </div>
                  {/* Premium Canvas */}
                  <div className="flex-1 p-12 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-gradient-to-br from-gray-900/40 to-gray-950/40 backdrop-blur-sm border-2 border-dashed border-gray-600/40 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)_inset]">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-pink-500/5 to-blue-500/8"></div>
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                          <div className="absolute inset-0 grid grid-cols-2 gap-8 p-8 opacity-50">
                              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 h-40 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)]"></div>
                              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 h-40 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)]"></div>
                              <div className="col-span-2 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 h-28 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)]"></div>
                          </div>
                          
                          {/* Premium Floating Label */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-base px-8 py-3.5 rounded-full shadow-[0_20px_60px_rgba(168,85,247,0.6),0_0_0_1px_rgba(255,255,255,0.2)_inset] z-10 animate-bounce font-bold tracking-wide">
                             ✨ Drag & Drop Components
                          </div>
                      </div>
                  </div>
                  {/* Premium Properties Panel */}
                  <div className="w-72 border-l border-white/5 bg-gradient-to-b from-[#0f0f1f]/80 to-[#0a0a15]/80 backdrop-blur-xl hidden md:block">
                     <div className="h-full p-8 space-y-6">
                         <div className="h-6 w-2/3 bg-gradient-to-r from-white/20 to-white/10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.3)]"></div>
                         <div className="h-12 w-full bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.3)]"></div>
                         <div className="h-5 w-3/4 bg-gradient-to-r from-white/20 to-white/10 rounded-xl mt-8 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"></div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="h-12 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-transparent rounded-xl border border-purple-400/30 backdrop-blur-sm shadow-[0_8px_24px_rgba(168,85,247,0.2)]"></div>
                            <div className="h-12 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-xl border border-blue-400/30 backdrop-blur-sm shadow-[0_8px_24px_rgba(59,130,246,0.2)]"></div>
                         </div>
                         <div className="space-y-3 mt-8">
                            {[1,2,3].map(i => (
                              <div key={i} className="h-8 bg-gradient-to-r from-white/5 to-transparent rounded-lg border border-white/5"></div>
                            ))}
                         </div>
                     </div>
                  </div>
              </div>

              {/* Enhanced Bottom Gradient with Glow */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent pointer-events-none"></div>
              
              {/* Premium Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 via-fuchsia-500/0 to-transparent opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-all duration-700 pointer-events-none"></div>
           </div>
        </div>
```
      </div>
    </section>
  );
}
