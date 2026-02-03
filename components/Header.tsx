'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={80} 
              height={60}
              className="brightness-0 invert"
            />
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('hero')} className="text-white hover:text-orange-500 transition underline underline-offset-4 duration-300 font-medium">
            Home
          </button>
          <button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition duration-300 font-medium">
            Features
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition duration-300 font-medium">
            Pricing
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition duration-300 font-medium">
            FAQ
          </button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Login Button - Desktop */}
          <Link 
            href="/login"
            className="hidden md:block text-gray-300 hover:text-white font-medium transition duration-300"
          >
            Log in
          </Link>
          
          {/* Signup Button - Desktop */}
          <Link 
            href="/signup"
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
          >
            Sign up
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-gray-900/50 rounded-lg transition duration-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800 animate-fade-in-down">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('hero')} className="text-white hover:text-orange-500 transition py-2 duration-300 text-left">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition py-2 duration-300 text-left">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition py-2 duration-300 text-left">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition py-2 duration-300 text-left">
              FAQ
            </button>
            <div className="flex flex-col gap-3 mt-4">
              <Link 
                href="/login"
                className="w-full text-center py-2 text-gray-300 hover:text-white font-medium transition duration-300 border border-gray-700 rounded-lg"
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className="w-full text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition duration-300"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
