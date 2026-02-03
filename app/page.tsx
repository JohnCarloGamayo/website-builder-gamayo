'use client';

import Link from 'next/link';
import { Edit3, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Editor Buttons - Floating */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <Link
          href="/preview"
          className="flex items-center gap-2 px-5 py-3 bg-gray-900/90 backdrop-blur border border-gray-700 hover:border-purple-500 text-white rounded-full shadow-lg transition-all hover:scale-105 font-medium"
        >
          <Eye size={18} />
          View Saved Design
        </Link>
        <Link
          href="/editor"
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 font-medium"
        >
          <Edit3 size={18} />
          Open Editor
        </Link>
      </div>
      
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
