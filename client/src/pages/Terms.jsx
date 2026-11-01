import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p className="text-sm text-gray-400">Last updated: November 2026</p>

        <div className="glass-panel p-8 rounded-3xl border border-cine-border space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CineRate, you acknowledge and agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Community Guidelines & Reviews</h2>
            <p>
              CineRate provides a respectful forum for movie critiques. Users agree not to post spoilers without notice, hate speech, abusive language, or fraudulent ratings. CineRate reserves the right to moderate and delete inappropriate submissions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property & Attribution</h2>
            <p>
              Movie metadata and images are provided through TMDB API or licensed public domains. User-generated critiques remain the property of their authors with a non-exclusive license granted to CineRate for platform display.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

