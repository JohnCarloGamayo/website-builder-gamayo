'use client';

export default function Timeline() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-1/2 right-0 w-1 h-64 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent rounded-full blur-lg opacity-50"></div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in-up">
          <p className="text-gray-500 text-sm mb-4">2025</p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Whether you're designing for personal projects, creative teams, or large-scale campaigns, our AI-powered platform is built to bring your ideas to life—quickly, beautifully, and intelligently.
            <br />
            <br />
            And the results? The numbers speak for themselves:
          </p>
        </div>

        {/* Timeline Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Vertical connecting lines */}
          <div className="hidden md:block absolute top-0 left-1/4 w-1 h-96 border-l border-gray-700 -translate-x-1/2"></div>
          <div className="hidden md:block absolute top-0 left-1/2 w-1 h-96 border-l border-gray-700 -translate-x-1/2"></div>
          <div className="hidden md:block absolute top-0 right-1/4 w-1 h-96 border-l border-gray-700 -translate-x-1/2"></div>

          {/* Stat 1 */}
          <div className="relative animate-fade-in-up group" style={{ animationDelay: '0s' }}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-orange-500 transition duration-300">2014</h3>
            <p className="text-white font-semibold mb-1">Year of establishment</p>
            <p className="text-gray-500 text-sm">More than 10 years in the field</p>
            <div className="mt-4 flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-black"
              />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="relative animate-fade-in-up group" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-orange-500 transition duration-300">304</h3>
            <p className="text-white font-semibold mb-1">Projects are launched</p>
            <p className="text-gray-500 text-sm">A lot of projects are done</p>
            <div className="mt-4 flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="Project"
                className="w-10 h-10 rounded-lg border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                alt="Project"
                className="w-10 h-10 rounded-lg border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                alt="Project"
                className="w-10 h-10 rounded-lg border-2 border-black"
              />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="relative animate-fade-in-up group" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-orange-500 transition duration-300">189</h3>
            <p className="text-white font-semibold mb-1">Clients are satisfied</p>
            <p className="text-gray-500 text-sm">These people love us</p>
            <div className="mt-4 flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="Client"
                className="w-10 h-10 rounded-full border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                alt="Client"
                className="w-10 h-10 rounded-full border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                alt="Client"
                className="w-10 h-10 rounded-full border-2 border-black"
              />
            </div>
          </div>

          {/* Stat 4 */}
          <div className="relative animate-fade-in-up group" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-orange-500 transition duration-300">12</h3>
            <p className="text-white font-semibold mb-1">Projects in work</p>
            <p className="text-gray-500 text-sm">What we do right now</p>
            <div className="mt-4 flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="Work"
                className="w-10 h-10 rounded-lg border-2 border-black"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                alt="Work"
                className="w-10 h-10 rounded-lg border-2 border-black"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up">
          <button className="px-6 sm:px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 w-full sm:w-auto justify-center">
            Get Started
            <span>→</span>
          </button>
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Slots are available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
