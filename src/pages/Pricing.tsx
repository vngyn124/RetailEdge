import { useSubscription } from '../context/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const { currentPlan, setCurrentPlan } = useSubscription();
  const navigate = useNavigate();

  const handlePlanSelection = (plan: 'free' | 'standard' | 'professional') => {
    setCurrentPlan(plan);
    // Navigate to home page to see the effect of plan selection
    navigate('/');
  };

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
                {currentPlan !== 'free' && (
                  <p className="mt-3 text-blue-400">
                    Your current plan: {currentPlan === 'professional' ? 'Professional' : 'Standard'}
                  </p>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
            <div className="bg-green-500 p-6">
              <h2 className="text-2xl font-bold text-white">Basic</h2>
            </div>
            <div className="bg-white text-gray-800 p-8 flex flex-col flex-1">
              <div className="text-5xl font-bold mb-2">Free</div>
              <p className="text-green-500 mb-6">Good for beginners, casual investors</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Ads included
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  5 Stock Lookups / day
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Basic charts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Email support
                </li>
              </ul>
              <button 
                className="w-full bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600 transition-colors"
                onClick={() => handlePlanSelection('free')}
              >
                TRY IT FREE
              </button>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
            <div className="bg-blue-500 p-6">
              <h2 className="text-2xl font-bold text-white">Standard</h2>
            </div>
            <div className="bg-white text-gray-800 p-8 flex flex-col flex-1">
              <div className="text-5xl font-bold mb-2">$19.99</div>
              <p className="text-blue-500 mb-2">Per month</p>
              <p className="text-gray-600 mb-6">For intermediate investors</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Ad-free experience
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  15 Stock Lookups / day
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced charts
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority email support
                </li>
              </ul>
              <button 
                className="w-full bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition-colors"
                onClick={() => handlePlanSelection('standard')}
              >
                TRY IT NOW
              </button>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
            <div className="bg-blue-700 p-6">
              <h2 className="text-2xl font-bold text-white">Professional</h2>
            </div>
            <div className="bg-white text-gray-800 p-8 flex flex-col flex-1">
              <div className="text-5xl font-bold mb-2">$49.99</div>
              <p className="text-blue-700 mb-2">Per month</p>
              <p className="text-gray-600 mb-6">For active traders</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Ad-free experience
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited Stock Lookups
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Premium charts & indicators
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 priority support
                </li>
              </ul>
              <button 
                className="w-full bg-blue-700 text-white rounded py-2 px-4 hover:bg-blue-800 transition-colors"
                onClick={() => handlePlanSelection('professional')}
              >
                TRY IT NOW
              </button>
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