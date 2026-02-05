'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is this Website Builder platform?',
      answer:
        "It's a powerful, drag-and-drop website builder designed to help you create stunning, professional websites in minutes without writing a single line of code. Perfect for portfolios, business sites, and landing pages.",
    },
    {
      question: 'How do I start building my website?',
      answer: 'Simply click "Start Building" to enter the editor. Drag and drop components onto the canvas, customize styles, and arrange your layout exactly how you want it. No design experience needed.',
    },
    {
      question: 'Is it mobile-friendly?',
      answer: 'Yes! All websites created with our builder are fully responsive by default. You can also switch to mobile view in the editor to fine-tune how your site looks on smaller screens.',
    },
    {
      question: 'Can I export my code?',
      answer: 'Absolutely. We believe you should own your work. You can export your design as clean, production-ready React/HTML code to host anywhere you like.',
    },
    {
      question: 'Do I need programming skills?',
      answer: 'Not at all. Our platform is built for everyone. Whether you\'re a complete beginner or a professional developer looking to speed up your workflow, our visual tools make the process seamless.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. Your projects are saved securely in our cloud database (powered by Supabase), and we use industry-standard encryption to protect your account and designs.',
    },
  ];

  return (
    <section id="faq" className="py-36 px-6 relative overflow-hidden bg-[#030014]">
      {/* Ultra-Modern Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(120,40,200,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_70%,rgba(236,72,153,0.12),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Advanced Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/25 to-fuchsia-600/25 rounded-full blur-[130px] animate-pulse opacity-70"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-pink-600/20 to-rose-600/20 rounded-full blur-[130px] animate-pulse opacity-60" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-600/15 to-blue-600/15 rounded-full blur-[150px] opacity-50"></div>

      <div className="max-w-5xl mx-auto relative z-10 px-4">
        {/* Premium Header */}
        <div className="text-center mb-24 animate-fade-in-up">
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
            <span className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_4px_50px_rgba(168,85,247,0.6)] animate-gradient-x">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-300/95 text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
            Got questions? We've got answers. Find everything you need to know about our platform.
          </p>
        </div>

        {/* Ultra-Premium Glassmorphic FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group border border-white/10 rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl hover:border-white/25 transition-all duration-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(168,85,247,0.3)] animate-fade-in-up hover:-translate-y-2 hover:scale-[1.01]" 
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Enhanced Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
              
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="relative w-full px-6 sm:px-10 py-7 flex items-center justify-between text-left group-hover:bg-white/[0.05] transition-all duration-500"
              >
                <span className="text-white font-bold text-lg sm:text-xl pr-6 group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-fuchsia-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 tracking-wide">{faq.question}</span>
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 flex items-center justify-center border border-purple-400/40 transition-all duration-500 ${expanded === index ? 'rotate-180 bg-purple-500/40 scale-110' : ''} group-hover:scale-125 shadow-[0_0_30px_rgba(168,85,247,0.3)]`}>
                  <ChevronDown
                    size={24}
                    className="text-purple-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </button>

              {/* Ultra-Modern Expanded Answer with Advanced Animation */}
              {expanded === index && (
                <div className="px-6 sm:px-10 pb-8 border-t border-white/10 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-transparent animate-fade-in-down">
                  <div className="pt-6">
                    <p className="text-gray-300/95 leading-relaxed text-base sm:text-lg font-light tracking-wide">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
