import React from 'react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Pricing Hero Section */}
      <div className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Pricing Plans</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Choose the plan that fits your investment strategy and needs.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-[#2a2a2a] rounded-lg shadow-xl overflow-hidden">
            <div className="bg-green-500 p-6 text-center">
              <div className="text-3xl font-bold text-white">Basic</div>
            </div>
            <div className="p-8 bg-white text-gray-800">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold">Free</div>
                <div className="text-green-500 mt-2">Good for beginners, casual investors</div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ads included
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  5 Stock Lookups / day
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic charts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email support
                </li>
              </ul>
              <div className="mt-8">
                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-green-600 transition duration-300">
                  TRY IT FREE
                </button>
              </div>
            </div>
          </div>

          {/* Value Plan */}
          <div className="bg-[#2a2a2a] rounded-lg shadow-xl overflow-hidden">
            <div className="bg-blue-400 p-6 text-center">
              <div className="text-3xl font-bold text-white">Standard</div>
            </div>
            <div className="p-8 bg-white text-gray-800">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold">$19.99</div>
                <div className="text-blue-500 mt-2">Per month</div>
                <div className="text-gray-600 mt-1">For intermediate investors</div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ad-free experience
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  15 Stock Lookups / day
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced charts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority email support
                </li>
              </ul>
              <div className="mt-8">
                <button className="w-full bg-blue-400 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-500 transition duration-300">
                  TRY IT NOW
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#2a2a2a] rounded-lg shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-6 text-center">
              <div className="text-3xl font-bold text-white">Professional</div>
            </div>
            <div className="p-8 bg-white text-gray-800">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold">$49.99</div>
                <div className="text-blue-600 mt-2">Per month</div>
                <div className="text-gray-600 mt-1">For active traders</div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ad-free experience
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited Stock Lookups
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium charts & indicators
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 priority support
                </li>
              </ul>
              <div className="mt-8">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
                  TRY IT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-[#374151] p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Is there a free trial for paid plans?</h3>
            <p className="text-gray-300">Yes, we offer a 7-day free trial for both our Standard and Professional plans.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-300">We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Can I cancel my subscription?</h3>
            <p className="text-gray-300">Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your current billing period.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 