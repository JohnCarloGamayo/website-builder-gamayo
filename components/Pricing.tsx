'use client';

import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: '₱0',
      yearlyPrice: '₱0',
      description: 'For personal projects and testing.',
      features: [
        { name: '1 Website Project', included: true },
        { name: '5 Pages per site', included: true },
        { name: 'Basic Components', included: true },
        { name: 'Community Support', included: true },
        { name: 'Export Code', included: false },
        { name: 'Custom Domain', included: false },
      ],
      highlighted: false,
      badge: '',
    },
    {
      name: 'Professional',
      price: '₱500',
      yearlyPrice: '₱5,000',
      description: 'For freelancers and portfolios.',
      features: [
        { name: '5 Website Projects', included: true },
        { name: 'Unlimited Pages', included: true },
        { name: 'All Pro Components', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Export HTML/CSS', included: true },
        { name: 'Custom Domain', included: true },
      ],
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Agency',
      price: '₱1,500',
      yearlyPrice: '₱15,000',
      description: 'For design agencies and teams.',
      features: [
        { name: 'Unlimited Projects', included: true },
        { name: 'Unlimited Pages', included: true },
        { name: 'White-label Editor', included: true },
        { name: 'Team Collaboration', included: true },
        { name: 'Export React Code', included: true },
        { name: 'Client Billing', included: true },
      ],
      highlighted: false,
      badge: '',
    },
    {
      name: 'Unified',
      price: '₱11,000',
      yearlyPrice: '₱110,000',
      description: 'For large organizations.',
      features: [
         { name: 'Unlimited Everything', included: true },
         { name: 'Self-Hosted Option', included: true },
         { name: 'SSO & Advanced Security', included: true },
         { name: 'Dedicated Success Manager', included: true },
         { name: 'Custom Component Dev', included: true },
         { name: 'SLA Guarantee', included: true },
      ],
      highlighted: false,
      badge: '',
    },
  ];

  const comparisonFeatures = [
    { name: 'Monthly Cost', free: '₱0 /month', pro: '₱500 /month', business: '₱1,500 /month', enterprise: '₱11,000 /month' },
    { name: 'Projects', free: '1', pro: '5', business: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Pages', free: '5', pro: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Export', free: '-', pro: 'HTML/CSS', business: 'React/Next.js', enterprise: 'Full Source' },
    { name: 'Support', free: 'Community', pro: 'Priority', business: '24/7 Priority', enterprise: 'Dedicated Manager' },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-[#050510] via-[#0d0d1a] to-[#050510] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">Simple Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 font-light">
            Start for free, upgrade when you need to launch. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 bg-gray-900/50 border border-purple-500/30 rounded-full px-2 py-2 w-fit mx-auto hover:border-purple-500/50 transition duration-300 backdrop-blur-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${!isYearly ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${isYearly ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Yearly
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-6 italic">
            Not ready to choose? Review your details or continue exploring.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition duration-300 transform hover:scale-105 ${
                plan.highlighted
                  ? 'border-2 border-purple-500 bg-gradient-to-b from-purple-500/10 via-gray-900/80 to-gray-800/50 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in-up backdrop-blur-sm'
                  : 'border border-gray-800 bg-gray-900/50 hover:border-purple-500/30 animate-fade-in-up backdrop-blur-sm'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">
                    {isYearly ? plan.yearlyPrice : plan.price}
                  </span>
                  <span className="text-gray-400">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-purple-500/20' : 'bg-gray-800'}`}>
                      <Check size={14} className={`${plan.highlighted ? 'text-purple-400' : 'text-gray-500'}`} />
                    </div>
                    <span className="text-gray-300 text-sm leading-tight">{feature.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => window.location.href = '#signup'}
                className={`group w-full py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/50'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-purple-500/30 hover:border-purple-500/50'
                }`}
              >
                Continue
                <ArrowRight size={18} className="group-hover:translate-x-1 transition duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Back to Login Link */}
        <div className="text-center mb-16">
          <button 
            onClick={() => window.location.href = '#login'}
            className="text-gray-400 hover:text-purple-400 transition duration-300 underline underline-offset-4"
          >
            Back to Login
          </button>
        </div>

        {/* Comparison Table */}
        <div className="mt-20 animate-fade-in-up">
          <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">Compare plan capabilities</span>
          </h3>
          <p className="text-gray-400 text-center mb-10">
            Find the plan that gives your team the tools and support it needs.
          </p>

          {/* Mobile Comparison Cards */}
          <div className="lg:hidden space-y-6">
            {plans.map((plan, index) => (
              <div key={index} className="border border-gray-800 rounded-2xl p-6 bg-gray-900/50 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-4">{plan.name}</h4>
                {comparisonFeatures.map((feature, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400 text-sm">{feature.name}</span>
                    <span className="text-white font-semibold text-sm">
                      {index === 0 ? feature.free : index === 1 ? feature.pro : index === 2 ? feature.business : feature.enterprise}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Desktop Comparison Table */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-gray-300 font-semibold">Free</th>
                  <th className="px-6 py-4 text-center font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pro</th>
                  <th className="px-6 py-4 text-center text-gray-300 font-semibold">Business</th>
                  <th className="px-6 py-4 text-center text-gray-300 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/30 transition duration-200">
                    <td className="px-6 py-4 text-gray-300 font-medium">{feature.name}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{feature.free}</td>
                    <td className="px-6 py-4 text-center text-white font-semibold">{feature.pro}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{feature.business}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{feature.enterprise}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-800 hover:bg-gray-800/30 transition duration-200">
                  <td className="px-6 py-4 text-gray-300 font-medium">Agents available</td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">GPT-4.1 Mini</td>
                  <td className="px-6 py-4 text-center text-white text-sm">GPT-4.1 Mini, GPT-4.1, GPT-5.1 Mini</td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">GPT-4.1 Mini, GPT-4.1, GPT-5.2, GPT-5.1 Mini</td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">GPT-4.1, GPT-4.1 Mini, GPT-5.1, GPT-5.1 Mini, GPT-5.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
