import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-cine-bg text-gray-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: November 2026</p>

        <div className="glass-panel p-8 rounded-3xl border border-cine-border space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Data We Collect</h2>
            <p>
              We collect basic profile information (such as your display name, email, and avatar) and user activity data (including ratings, reviews, watchlists, and favorites) to personalize your cinema experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Security of Your Information</h2>
            <p>
              All passwords are cryptographically salted and hashed using bcrypt before storage. Sensitive API tokens and credentials are encrypted and never exposed to unauthorized parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Third-Party Data & Cookies</h2>
            <p>
              CineRate does not sell your personal data. We utilize localStorage and secure JWT tokens strictly for persistent sessions and interface preferences.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

