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
    <section id="faq" className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Decorative curved elements */}
      <div className="absolute left-0 top-1/4 w-64 h-64 text-orange-500/10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 50 0 Q 50 100 150 100 L 200 100 L 200 200 L 0 200 L 0 0 Q 0 50 50 50"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
      <div className="absolute right-0 bottom-1/4 w-64 h-64 text-orange-500/10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 150 0 Q 150 100 50 100 L 0 100 L 0 200 L 200 200 L 200 0" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">Frequently Asked Questions</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">Got questions? We've got answers. Find everything you need to know about using our platform, plans, and features.</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-800 rounded-2xl overflow-hidden bg-gray-900/50 hover:bg-gray-900/70 transition duration-300 hover:border-purple-500/30 animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: `${index * 0.05}s` }}>
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full px-4 sm:px-6 py-5 flex items-center justify-between text-left hover:bg-gray-900/20 transition duration-300"
              >
                <span className="text-white font-semibold text-base sm:text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={`text-purple-400 transition-transform duration-300 flex-shrink-0 ${expanded === index ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Expanded Answer */}
              {expanded === index && (
                <div className="px-4 sm:px-6 py-5 border-t border-gray-800 bg-gray-900/30 animate-fade-in-down">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
