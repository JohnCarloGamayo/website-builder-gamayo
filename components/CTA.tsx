'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        <div className="border-2 border-purple-500/30 rounded-3xl p-8 sm:p-12 md:p-16 text-center bg-gradient-to-b from-gray-900/80 to-gray-800/50 hover:border-purple-500/50 transition duration-300 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Sparkles size={32} className="text-purple-400" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">Ready to Transform Your Organization?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of organizations using AI to automate workflows, enhance productivity, and make smarter decisions. Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/editor"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition duration-300 flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105"
            >
              Start Building Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition duration-300" />
            </Link>
            <button 
              onClick={() => window.location.href = '#contact'}
              className="px-8 py-4 border-2 border-purple-500/50 hover:border-pink-500 text-white font-semibold rounded-xl transition duration-300 hover:bg-purple-900/30 backdrop-blur-sm"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
