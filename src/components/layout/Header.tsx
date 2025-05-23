import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/lib/theme-provider';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Application header component with navigation and theme toggle
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const activeRef = dropdownRefs.current[activeDropdown];
        if (activeRef && !activeRef.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/#work' },
    { name: 'Pricing', href: '/pricing' },
    { 
      name: 'Resources', 
      href: '#',
      isDropdown: true,
      items: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Guides', href: '/guides' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Help Center', href: '/help-center' },
      ] 
    },
    { 
      name: 'Company', 
      href: '#',
      isDropdown: true,
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ] 
    },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-0 shadow-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md" : ""
    )}>
      <nav className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        !isScrolled && "glassmorphism"
      )}>
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-primary dark:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold font-montserrat text-gray-900 dark:text-white">NexaWeb</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.isDropdown ? (
                    <div 
                      ref={ref => dropdownRefs.current[item.name] = ref}
                      className="relative"
                    >
                      <button 
                        onClick={() => toggleDropdown(item.name)}
                        className={cn(
                          "flex items-center font-medium transition-colors",
                          activeDropdown === item.name
                            ? "text-primary dark:text-primary" 
                            : "hover:text-primary dark:hover:text-primary"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          activeDropdown === item.name ? "rotate-180" : ""
                        )} />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                role="menuitem"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className={cn(
                        "font-medium transition-colors",
                        (location === item.href || 
                         (item.href !== '/' && location.startsWith(item.href))) 
                          ? "text-primary dark:text-primary" 
                          : "hover:text-primary dark:hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode" 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <Link href="/contact" className="hidden md:block">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            
            <button 
              type="button" 
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" 
              aria-controls="mobile-menu" 
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="pt-2 pb-4 space-y-1 px-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.isDropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={cn(
                          "flex items-center justify-between w-full py-2 px-3 rounded-md font-medium",
                          activeDropdown === item.name
                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          activeDropdown === item.name ? "rotate-180" : ""
                        )} />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.items?.map((subItem) => (
                            <Link 
                              key={subItem.name} 
                              href={subItem.href}
                              className="block py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      href={item.href}
                      className={cn(
                        "block py-2 px-3 rounded-md font-medium",
                        (location === item.href || 
                         (item.href !== '/' && location.startsWith(item.href))) 
                          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" 
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link 
                href="/contact" 
                className="block mt-4 py-2 px-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
