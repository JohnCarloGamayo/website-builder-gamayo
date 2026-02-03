'use client';

import { Star, ArrowRight, LayoutTemplate, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-[#050510] via-[#0d0d1a] to-[#050510]">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      
      {/* 3D Floating Elements (Builder Theme) */}
      <div className="absolute top-24 right-20 w-40 h-28 bg-[#1e1e2e] border border-gray-700/50 rounded-lg shadow-2xl p-4 animate-float hidden lg:block rotate-6 hover:rotate-0 transition-all duration-500 opacity-80 hover:opacity-100 z-10">
         <div className="h-2 w-12 bg-red-400 rounded-full mb-2"></div>
         <div className="h-2 w-24 bg-gray-600 rounded-full mb-4"></div>
         <div className="grid grid-cols-2 gap-2">
            <div className="h-10 bg-gray-700/50 rounded"></div>
            <div className="h-10 bg-gray-700/50 rounded"></div>
         </div>
      </div>

      <div className="absolute bottom-40 left-20 w-32 h-32 bg-[#1e1e2e] border border-gray-700/50 rounded-lg shadow-2xl p-3 animate-float hidden lg:block -rotate-12 hover:rotate-0 transition-all duration-500 opacity-80 hover:opacity-100 z-10" style={{ animationDelay: '1.5s' }}>
         <div className="flex gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
         </div>
         <div className="space-y-2">
            <div className="h-2 w-3/4 bg-gray-600 rounded"></div>
            <div className="h-2 w-1/2 bg-gray-600 rounded"></div>
            <div className="h-16 w-full bg-purple-500/20 border border-purple-500/30 rounded flex items-center justify-center text-purple-400">
               <MousePointer2 size={16} />
            </div>
         </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="mb-8 flex items-center justify-center gap-2 bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-full px-5 py-2 w-fit mx-auto animate-fade-in-up hover:bg-green-500/20 transition duration-300">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-green-300 font-medium tracking-wide">
             🎉 100% Free During Beta Testing
          </span>
        </div>

        {/* Main Heading */}
        <div className="relative mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in-up tracking-tight" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
              Build Websites
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              Like a Pro. For Free.
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-l md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
          Design stunning, responsive websites with our powerful drag-and-drop builder. Export clean HTML/CSS or React code. No signup required—completely free during beta!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up mb-16" style={{ animationDelay: '0.3s' }}>
          <Link href="/editor"
            className="group px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-[length:200%_200%] animate-gradient-x hover:brightness-110 text-white font-semibold rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Start Building — It's Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition duration-300" />
          </Link>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-full transition duration-300 w-full sm:w-auto backdrop-blur-sm flex items-center gap-2"
          >
            <LayoutTemplate size={18} />
            See Features
          </button>
        </div>

        {/* Mock Browser Preview (Hero Image) */}
        <div className="relative max-w-5xl mx-auto animate-fade-in-up perspective-1000" style={{ animationDelay: '0.5s' }}>
           <div className="relative rounded-xl bg-[#1e1e2e] border border-gray-700/50 shadow-2xl overflow-hidden aspect-video transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000 ease-out group">
              
              {/* Browser Header */}
              <div className="h-10 bg-[#2a2a3e] border-b border-gray-700/50 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                 <div className="flex-1 ml-4 bg-[#1e1e2e] h-6 rounded-md border border-gray-700/50 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                    website-builder.com/editor
                 </div>
              </div>

              {/* Browser Content (Abstract UI) */}
              <div className="flex h-full bg-[#0d0d1a]">
                  {/* Fake Sidebar */}
                  <div className="w-16 border-r border-gray-800 flex flex-col items-center py-4 gap-4">
                      {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded bg-gray-800"></div>)}
                  </div>
                  {/* Fake Canvas */}
                  <div className="flex-1 p-8 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-gray-900 border border-gray-700 border-dashed rounded-lg flex items-center justify-center relative">
                          <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 opacity-50">
                              <div className="bg-gray-800 rounded h-32"></div>
                              <div className="bg-gray-800 rounded h-32"></div>
                              <div className="col-span-2 bg-gray-800 rounded h-20"></div>
                          </div>
                          
                          {/* Floating Cursor/Label */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg z-10 animate-bounce">
                             Drag Component Here
                          </div>
                      </div>
                  </div>
                  {/* Fake Properties */}
                  <div className="w-48 border-l border-gray-800 bg-[#151520] hidden sm:block">
                     <div className="h-full p-4 space-y-3">
                         <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                         <div className="h-8 w-full bg-gray-800 rounded"></div>
                         <div className="h-4 w-3/4 bg-gray-800 rounded mt-4"></div>
                         <div className="grid grid-cols-2 gap-2">
                            <div className="h-8 bg-gray-800 rounded"></div>
                            <div className="h-8 bg-gray-800 rounded"></div>
                         </div>
                     </div>
                  </div>
              </div>

              {/* Overlay Gradient on Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent pointer-events-none opacity-50"></div>
           </div>
        </div>
      </div>
    </section>
  );
}
