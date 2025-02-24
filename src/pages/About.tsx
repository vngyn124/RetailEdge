import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* About Hero Section */}
      <div className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">About RetailEdge</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Your trusted partner for professional stock analysis and market insights.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-[#374151] p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">
            RetailEdge was founded with a simple mission: to provide retail investors with the same quality of tools and insights that professional traders use, but in an accessible and affordable package.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2023, RetailEdge emerged from the recognition that retail investors often lack access to the sophisticated tools and data that institutional investors rely on. Our team of financial experts and software engineers came together to bridge this gap, creating a platform that democratizes access to professional-grade stock analysis.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="mb-6">
            Our diverse team brings together expertise from finance, technology, and data science. With backgrounds from leading financial institutions and tech companies, we're uniquely positioned to understand both the complexities of the market and how to make them accessible through intuitive technology.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2"><span className="font-bold">Transparency:</span> We believe in clear, honest communication about market data and our services.</li>
            <li className="mb-2"><span className="font-bold">Accessibility:</span> Financial tools should be available to everyone, not just institutions.</li>
            <li className="mb-2"><span className="font-bold">Education:</span> We're committed to helping our users understand the market, not just observe it.</li>
            <li className="mb-2"><span className="font-bold">Innovation:</span> We continuously improve our platform with the latest in financial technology.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 