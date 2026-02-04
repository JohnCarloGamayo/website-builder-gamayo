'use client';

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
