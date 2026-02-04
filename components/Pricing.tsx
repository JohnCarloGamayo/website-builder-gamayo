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
    <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-[#050510] via-[#0d0d1a] to-[#050510] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <Gift className="text-green-400" size={18} />
            <span className="text-green-400 font-semibold text-sm">🎉 Free During Beta Testing!</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">100% Free</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">
            We're in beta testing phase. Enjoy all features completely free while we perfect the experience!
          </p>
        </div>

        {/* Single Free Card */}
        <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative rounded-3xl p-8 border-2 border-green-500/50 bg-gradient-to-b from-green-500/10 via-gray-900/80 to-gray-900/50 backdrop-blur-sm shadow-2xl shadow-green-500/20">
            
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <Sparkles size={16} /> Beta Access
              </span>
            </div>

            <div className="text-center mb-8 mt-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-6xl font-bold text-white">FREE</span>
              </div>
              <p className="text-gray-400">All features unlocked during testing</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {freeFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check size={12} className="text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = '/editor'}
              className="group w-full py-4 rounded-xl font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-lg hover:shadow-green-500/50 text-lg"
            >
              <Rocket size={20} />
              Start Building Now
            </button>
          </div>
        </div>

        {/* Info Note */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl px-6 py-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm">
              Premium plans coming soon. Beta testers will get exclusive discounts!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
