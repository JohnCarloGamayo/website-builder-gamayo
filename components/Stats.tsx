'use client';

import { Layout, Users, Code, Globe } from 'lucide-react';

export default function Stats() {
  const stats = [
    { label: 'Websites Built', value: '10,000+', icon: Layout, description: 'Created with our builder' },
    { label: 'Active Designers', value: '5,000+', icon: Users, description: 'Using the platform daily' },
    { label: 'Lines of Code Saved', value: '50M+', icon: Code, description: 'We write the code for you' },
    { label: 'Published Online', value: '8,500+', icon: Globe, description: 'Live websites' },
  ];

  return (
    <section className="py-20 border-y border-gray-800 bg-gradient-to-b from-[#050510] via-[#0d0d1a] to-[#050510] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center animate-fade-in-up group cursor-pointer bg-[#1a1a2e]/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-[#1a1a2e]/50 transition duration-300" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 group-hover:scale-110 transition duration-300">
                    <Icon size={24} className="text-purple-400" />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white group-hover:scale-110 transition duration-300 mb-2">{stat.value}</p>
                <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-sm font-semibold mb-1 transition duration-300">{stat.label}</p>
                <p className="text-gray-500 text-xs">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
