import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Thermometer, Video, Stethoscope, Menu, X, Heart } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Leaf },
    { path: '/temperature', label: 'Monitoring', icon: Thermometer },
    { path: '/feed', label: 'Live Feed', icon: Video },
    { path: '/DiseaseDetection', label: 'Disease Detection', icon: Stethoscope },
    { path: '/vitals', label: 'Vitals', icon: Heart },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="nav-floating rounded-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="icon-box group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-forest-800 font-display">LiveStock Monitoring System</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-forest-600 text-white shadow-lg'
                      : 'text-forest-700 hover:bg-forest-100 hover:text-forest-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-forest-600 hover:text-forest-800 hover:bg-forest-100 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? 'bg-forest-600 text-green'
                      : 'text-green-700 hover:bg-forest-100 hover:text-green-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;