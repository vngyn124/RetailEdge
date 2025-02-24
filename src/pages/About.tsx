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
            RetailEdge exists to empower everyday investors by providing them with clear, reliable, and professional-grade stock market insights. Our goal is to make financial information accessible, easy to understand, and actionable—ensuring that anyone, regardless of experience level, can invest with confidence.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">The Problem and Opportunity</h2>
          <p className="mb-6">
            Many retail investors struggle to find accurate, up-to-date market data. Information is scattered across multiple sources, often making investment decisions overwhelming. While institutional investors have access to advanced tools, retail traders are left navigating unreliable, complex, and biased sources.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">How RetailEdge Solves This</h2>
          <p className="mb-6">
            RetailEdge is a one-stop hub for real-time stock market updates, financial news, and data-driven insights. Instead of relying on multiple platforms, our users get everything they need in one place—live stock prices, AI-driven investment insights, personalized alerts, and easy-to-read market trends—helping them make smarter, data-backed decisions.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2025, RetailEdge emerged from the recognition that retail investors often lack access to the sophisticated tools and data that institutional investors rely on. Our team of financial experts and software engineers came together to bridge this gap, creating a platform that democratizes access to professional-grade stock analysis.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="mb-6">
            RetailEdge was built by a team of financial analysts, software engineers, and investment enthusiasts who understand both the complexities of the stock market and the needs of everyday investors. Our diverse backgrounds—from finance, technology, and data science—help us develop innovative tools that simplify investing.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2"><span className="font-bold">Transparency:</span> We provide clear, honest market insights with no hidden bias.</li>
            <li className="mb-2"><span className="font-bold">Accessibility:</span> Financial tools should be available to everyone, not just institutions.</li>
            <li className="mb-2"><span className="font-bold">Education:</span> We simplify complex stock data so users understand the market, not just observe it.</li>
            <li className="mb-2"><span className="font-bold">Innovation:</span> We leverage AI and real-time data to keep our platform cutting-edge.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 