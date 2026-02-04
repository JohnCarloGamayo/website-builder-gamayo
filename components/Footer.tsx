'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* About */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 text-white">
                <Layers size={32} />
              </div>
              <h3 className="text-white font-bold text-lg">WebBuilder</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed hover:text-gray-300 transition duration-300">
              Empowering creators with intuitive tools to build the web. Design, customize, and launch your dream website in minutes without coding.
            </p>
          </div>

          {/* Useful Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <h3 className="text-purple-400 font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '#documentation'} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-purple-400 font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => window.location.href = '#support'} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '#help'} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '#terms'} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '#privacy'} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '#contact'} className="text-gray-400 hover:text-white transition duration-300 hover:translate-x-1 inline-block">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <h3 className="text-purple-400 font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition duration-300">
                <Mail size={18} className="mt-1 flex-shrink-0 text-purple-400" />
                <a href="mailto:support@webbuilder.com" className="text-sm">support@webbuilder.com</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition duration-300">
                <Phone size={18} className="mt-1 flex-shrink-0 text-purple-400" />
                <span className="text-sm">+1 (555) 987-6543</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition duration-300">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-purple-400" />
                <span className="text-sm">123 Web St, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-500 text-sm text-center">© 2026 WebBuilder. All rights reserved. Empowering creators to build the future.</p>
        </div>
      </div>
    </footer>
  );
}
