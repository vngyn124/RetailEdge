import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';

// Theme colors matching the logo
export const THEME = {
  background: '#1a1a1a', // Dark background
  surface: '#2a2a2a',   // Slightly lighter dark for cards
  primary: '#3b82f6',   // Logo blue
  primaryGradient: ['#7dd3fc', '#3b82f6'], // Light to dark blue
  secondary: '#22c55e', // Logo green
  secondaryGradient: ['#86efac', '#22c55e'], // Light to dark green
  text: '#ffffff',      // White text
  textSecondary: '#94a3b8', // Lighter text for secondary information
  border: '#374151',    // Dark border color
};

// ScrollToAnchor component to handle hash navigation
function ScrollToAnchor() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If there's a hash in the URL
    if (location.hash) {
      // If we're not on the home page, navigate to home with the hash
      if (location.pathname !== '/') {
        navigate('/' + location.hash);
        return;
      }
    }
  }, [location, navigate]);

  return null;
}

function App() {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    
    // If we're already on the home page
    if (window.location.pathname === '/') {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Element with id "${anchor}" not found`);
      }
    } else {
      // Navigate to home page with the anchor
      window.location.href = '/#' + anchor;
    }
  };

  return (
    <Router>
      <ScrollToAnchor />
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        {/* Navigation */}
        <nav className="bg-[#2a2a2a] border-b border-[#374151]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  RetailEdge
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-gray-300 hover:text-white px-3 py-2">Features</a>
                  <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2">About</Link>
                  <Link to="/pricing" className="text-gray-300 hover:text-white px-3 py-2">Pricing</Link>
                  <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')} className="text-gray-300 hover:text-white px-3 py-2">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-[#2a2a2a] border-t border-[#374151]">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">RetailEdge</h3>
                <p className="text-gray-300">
                  Professional stock analysis platform for retail investors.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-gray-300 hover:text-white">Features</a></li>
                  <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                  <li><Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
                  <li><a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')} className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-[#374151] pt-8 text-center">
              <p className="text-gray-300">&copy; {new Date().getFullYear()} RetailEdge. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
