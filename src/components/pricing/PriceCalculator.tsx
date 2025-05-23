import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface PriceCalculatorProps {
  basePrice?: number;
  modifiers?: {
    pages: number;
    features: number;
    integrations: number;
  };
}

type Timeline = 'standard' | 'accelerated' | 'rush';

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ 
  basePrice = 2000,
  modifiers = {
    pages: 100,
    features: 50,
    integrations: 75
  }
}) => {
  // State for form values
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState(3);
  const [integrations, setIntegrations] = useState(1);
  const [timeline, setTimeline] = useState<Timeline>('standard');
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Sub-totals for display
  const [pagesSubtotal, setPagesSubtotal] = useState(0);
  const [featuresSubtotal, setFeaturesSubtotal] = useState(0);
  const [integrationsSubtotal, setIntegrationsSubtotal] = useState(0);
  const [timelineExtra, setTimelineExtra] = useState(0);

  // Animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Calculate price based on inputs
  useEffect(() => {
    const pagesTotal = pages * modifiers.pages;
    const featuresTotal = features * modifiers.features;
    const integrationsTotal = integrations * modifiers.integrations;
    
    // Apply timeline multiplier
    let timelineMultiplier = 1;
    let timelineCost = 0;
    
    if (timeline === 'accelerated') {
      timelineMultiplier = 1.3;
      timelineCost = (basePrice + pagesTotal + featuresTotal + integrationsTotal) * 0.3;
    } else if (timeline === 'rush') {
      timelineMultiplier = 1.5;
      timelineCost = (basePrice + pagesTotal + featuresTotal + integrationsTotal) * 0.5;
    }
    
    // Save individual values for display
    setPagesSubtotal(pagesTotal);
    setFeaturesSubtotal(featuresTotal);
    setIntegrationsSubtotal(integrationsTotal);
    setTimelineExtra(timelineCost);
    
    // Calculate total price
    const total = (basePrice + pagesTotal + featuresTotal + integrationsTotal) * timelineMultiplier;
    setTotalPrice(Math.round(total / 100) * 100); // Round to nearest hundred
  }, [pages, features, integrations, timeline, basePrice, modifiers]);

  return (
    <section ref={ref} id="pricing" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-montserrat mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Custom Project Calculator
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get an instant estimate for your project
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Calculator inputs */}
              <div className="p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-6">Tell us about your project</h3>
                
                {/* Number of pages slider */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Number of pages</label>
                    <span className="font-bold">{pages}</span>
                  </div>
                  <input 
                    type="range" 
                    id="pages" 
                    min="1" 
                    max="20" 
                    value={pages} 
                    onChange={(e) => setPages(parseInt(e.target.value))}
                    className="w-full" 
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1</span>
                    <span>10</span>
                    <span>20+</span>
                  </div>
                </div>
                
                {/* Features slider */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Custom features</label>
                    <span className="font-bold">{features}</span>
                  </div>
                  <input 
                    type="range" 
                    id="features" 
                    min="0" 
                    max="10" 
                    value={features} 
                    onChange={(e) => setFeatures(parseInt(e.target.value))}
                    className="w-full" 
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Basic</span>
                    <span>Advanced</span>
                    <span>Enterprise</span>
                  </div>
                </div>
                
                {/* Integrations slider */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Third-party integrations</label>
                    <span className="font-bold">{integrations}</span>
                  </div>
                  <input 
                    type="range" 
                    id="integrations" 
                    min="0" 
                    max="8" 
                    value={integrations} 
                    onChange={(e) => setIntegrations(parseInt(e.target.value))}
                    className="w-full" 
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>None</span>
                    <span>A few</span>
                    <span>Many</span>
                  </div>
                </div>
                
                {/* Timeline radio buttons */}
                <div className="mb-6">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred timeline</p>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeline" 
                        value="standard" 
                        checked={timeline === 'standard'} 
                        onChange={() => setTimeline('standard')}
                        className="sr-only peer" 
                      />
                      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-primary peer-checked:border-primary peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20">
                        <span className="block font-medium">Standard</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">8-12 weeks</span>
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeline" 
                        value="accelerated" 
                        checked={timeline === 'accelerated'}
                        onChange={() => setTimeline('accelerated')}
                        className="sr-only peer" 
                      />
                      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-primary peer-checked:border-primary peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20">
                        <span className="block font-medium">Accelerated</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">4-7 weeks</span>
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeline" 
                        value="rush" 
                        checked={timeline === 'rush'}
                        onChange={() => setTimeline('rush')}
                        className="sr-only peer"
                      />
                      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-primary peer-checked:border-primary peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20">
                        <span className="block font-medium">Rush</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">2-3 weeks</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Price display */}
              <div className="bg-primary-700 dark:bg-primary-800 p-6 md:p-8 lg:p-10 text-white">
                <h3 className="text-2xl font-bold mb-6">Your Estimate</h3>
                
                <div className="mb-6">
                  <p className="text-white/80 mb-1">Estimated project cost</p>
                  <div className="flex items-end">
                    <span className="text-5xl font-bold">${totalPrice.toLocaleString()}</span>
                    <span className="text-white/80 ml-2 mb-1">USD</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span>Base cost</span>
                    <span>${basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages ({pages})</span>
                    <span>${pagesSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Features ({features})</span>
                    <span>${featuresSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Integrations ({integrations})</span>
                    <span>${integrationsSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-white/20">
                    <span>Timeline ({timeline})</span>
                    <span>{timelineExtra > 0 ? `+$${timelineExtra.toLocaleString()}` : "$0"}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="mb-2">Includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Responsive design for all devices</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>SEO optimization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Analytics integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>1 month of support</span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  asChild
                  className="w-full py-3 px-4 bg-white text-primary-700 hover:bg-gray-100 text-center font-bold rounded-lg"
                >
                  <Link href="/contact?estimate=true&price=${totalPrice}">
                    Get Detailed Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceCalculator;
