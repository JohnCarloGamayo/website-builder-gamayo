'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Layers, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
     const checkUser = async () => {
         const { data: { user } } = await supabase.auth.getUser();
         setUser(user);
     };
     checkUser();

     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
     });
     
     return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    setMobileMenuOpen(false);
  };

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
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 hover:bg-white/20 transition-all duration-300 group-hover:scale-110 text-white">
            <Layers size={32} />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">WebBuilder</span>
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
          {user ? (
            <>
             <Link 
              href="/dashboard"
              className="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
               <Layers size={18} /> My Templates
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-red-500 hover:bg-red-500/10 text-gray-300 hover:text-red-400 rounded-lg font-semibold transition duration-300"
            >
              <LogOut size={18} /> Logout
            </button>
            </>
          ) : (
            <>
              {/* Login Button - Desktop */}
              <Link 
                href="/login"
                className="hidden md:block text-gray-300 hover:text-white font-medium transition duration-300"
              >
                Login
              </Link>

              {/* Get Started Button - Desktop */}
              <Link 
                href="/signup"
                className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}

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
            {user ? (
               <>
                <Link 
                  href="/dashboard"
                  className="w-full text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition duration-300 mt-4 flex items-center justify-center gap-2"
                >
                  <Layers size={18} /> My Templates
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-6 py-2 border border-gray-700 hover:border-red-500 hover:bg-red-500/10 text-gray-300 hover:text-red-400 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
               </>
            ) : (
                <div className="flex gap-2 mt-4">
                  <Link 
                    href="/login"
                    className="flex-1 text-center px-6 py-2 border border-gray-700 hover:border-white text-gray-300 hover:text-white rounded-lg font-semibold transition duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup"
                    className="flex-1 text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
