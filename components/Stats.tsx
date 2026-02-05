'use client';

import { Layout, Users, Code, Globe } from 'lucide-react';

export default function Stats() {
  const stats = [
    { label: 'Websites Built', value: '10K+', fullValue: '10,000+', icon: Layout, description: 'Created with our builder', gradient: 'from-purple-500 to-fuchsia-500', color: 'purple' },
    { label: 'Active Designers', value: '5K+', fullValue: '5,000+', icon: Users, description: 'Using platform daily', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
    { label: 'Code Saved', value: '50M+', fullValue: '50M+ Lines', icon: Code, description: 'We write code for you', gradient: 'from-pink-500 to-rose-500', color: 'pink' },
    { label: 'Live Sites', value: '8.5K+', fullValue: '8,500+', icon: Globe, description: 'Published worldwide', gradient: 'from-emerald-500 to-teal-500', color: 'emerald' },
  ];

  return (
    <section className="py-32 border-y border-white/5 bg-[#030014] relative overflow-hidden">
      {/* Ultra-Modern Background with Advanced Mesh Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(120,40,200,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_30%,rgba(236,72,153,0.1),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Animated Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 rounded-full blur-[120px] animate-pulse opacity-60"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/15 to-cyan-600/15 rounded-full blur-[120px] animate-pulse opacity-50" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="relative text-center animate-fade-in-up group cursor-pointer" 
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {/* Premium Glassmorphic Card */}
                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 overflow-hidden group-hover:border-white/25 group-hover:bg-white/[0.12] transition-all duration-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(168,85,247,0.3)] group-hover:-translate-y-3 group-hover:scale-105">
                  
                  {/* Advanced Gradient Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700 blur-2xl`}></div>
                  
                  {/* Enhanced Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  
                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-bl-[2rem] transition-opacity duration-700 blur-xl`}></div>
                  
                  <div className="relative z-10">
                    {/* Premium Icon with Advanced Design */}
                    <div className="flex justify-center mb-8">
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-[1.2rem] flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-[0_0_60px_rgba(168,85,247,0.3),0_0_0_1px_rgba(255,255,255,0.2)_inset] border border-white/20`}>
                        <div className={`absolute inset-0 rounded-[1.2rem] bg-gradient-to-br ${stat.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}></div>
                        <Icon size={32} className="text-white relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
                      </div>
                    </div>
                    
                    {/* Premium Value with Ultra-Modern Typography */}
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-500">
                      <p className={`text-6xl md:text-7xl font-black bg-gradient-to-br from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,255,255,0.2)] tracking-tight leading-none`}>
                        {stat.value}
                      </p>
                    </div>
                    
                    {/* Enhanced Label with Premium Gradient */}
                    <p className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent text-base font-bold uppercase tracking-widest mb-3 transition duration-300`}>
                      {stat.label}
                    </p>
                    
                    {/* Modern Description */}
                    <p className="text-gray-400/90 text-sm font-light leading-relaxed tracking-wide">{stat.description}</p>
                  </div>
                  
                  {/* Bottom Border Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-[2rem]`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
