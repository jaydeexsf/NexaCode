import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckIcon, XIcon } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import PriceCalculator from '@/components/pricing/PriceCalculator';
import PlanRecommender from '@/components/pricing/PlanRecommender';
import SEO from '@/components/shared/SEO';

interface PlanFeature {
  title: string;
  basic: boolean;
  standard: boolean;
  premium: boolean;
  enterprise: boolean;
}

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'calculator' | 'recommender'>('plans');
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [plansRef, plansInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [calculatorRef, calculatorInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Pricing plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for small businesses just starting out',
      price: 2000,
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Basic SEO optimization',
        'Contact form',
        '1 month of support'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonLink: '/contact?service=basic'
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Ideal for growing businesses with more complex needs',
      price: 5000,
      features: [
        'Up to 10 pages',
        'Responsive design',
        'Advanced SEO package',
        'CMS integration',
        'Contact form with validation',
        'Google Analytics setup',
        '3 months of support'
      ],
      popular: true,
      buttonText: 'Get Started',
      buttonLink: '/contact?service=standard'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Comprehensive solution for established businesses',
      price: 10000,
      features: [
        'Up to 20 pages',
        'Responsive design',
        'Advanced SEO package',
        'Custom CMS development',
        'E-commerce functionality',
        'Custom integrations',
        'Analytics dashboard',
        'Performance optimization',
        '6 months of support'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonLink: '/contact?service=premium'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Tailored solution for large organizations',
      price: 20000,
      features: [
        'Unlimited pages',
        'Responsive design',
        'Complete SEO strategy',
        'Custom CMS development',
        'Advanced e-commerce features',
        'Multiple third-party integrations',
        'AI-powered recommendations',
        'Advanced analytics & reporting',
        'Performance optimization',
        'Security audit',
        '12 months of priority support'
      ],
      popular: false,
      buttonText: 'Contact Us',
      buttonLink: '/contact?service=enterprise'
    }
  ];

  // Comparison table features
  const features: PlanFeature[] = [
    { title: 'Responsive Design', basic: true, standard: true, premium: true, enterprise: true },
    { title: 'SEO Optimization', basic: true, standard: true, premium: true, enterprise: true },
    { title: 'Contact Form', basic: true, standard: true, premium: true, enterprise: true },
    { title: 'CMS Integration', basic: false, standard: true, premium: true, enterprise: true },
    { title: 'E-commerce Functionality', basic: false, standard: false, premium: true, enterprise: true },
    { title: 'Custom Integrations', basic: false, standard: false, premium: true, enterprise: true },
    { title: 'AI-powered Features', basic: false, standard: false, premium: false, enterprise: true },
    { title: 'Performance Optimization', basic: false, standard: false, premium: true, enterprise: true },
    { title: 'Security Audit', basic: false, standard: false, premium: false, enterprise: true },
    { title: 'Priority Support', basic: false, standard: false, premium: false, enterprise: true },
    { title: 'Maintenance & Updates', basic: false, standard: true, premium: true, enterprise: true },
  ];

  // FAQ items
  const faqs = [
    {
      question: 'How do I know which plan is right for my business?',
      answer: 'Consider your business size, goals, and requirements. Our Basic plan works well for small businesses or startups that need a simple online presence. Standard is ideal for growing businesses that need more features. Premium suits established businesses with complex needs. For enterprise-level organizations with custom requirements, our Enterprise plan offers the most comprehensive solution. You can also use our Plan Recommender tool or contact us for a personalized consultation.'
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes, you can upgrade your plan at any time as your business grows or your needs change. We make the transition seamless, preserving all your existing content and data while adding new features and capabilities.'
    },
    {
      question: 'Do you offer custom pricing for specific project requirements?',
      answer: 'Absolutely. Every business is unique, and we understand that you might need a tailored solution. Use our Price Calculator to get an estimate based on your specific requirements, or contact us directly to discuss your project and receive a custom quote.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, bank transfers, and PayPal. For Enterprise plans, we can also arrange custom payment schedules and methods to accommodate your organization\'s procurement process.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'We stand behind our work and want you to be completely satisfied. If you are not happy with our services within the first 14 days, we offer a full refund. For longer projects, we work with milestone-based payments to ensure your satisfaction at each stage.'
    }
  ];

  return (
    <main>
      <SEO 
        title="Pricing | NexaWeb Digital Agency"
        description="Transparent pricing plans for web development, UI/UX design, and digital services. Choose from Basic, Standard, Premium, and Enterprise options."
        keywords="web development pricing, digital agency pricing, affordable web design, custom website cost"
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Transparent <span className="text-primary">Pricing</span> Plans
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Choose the perfect plan for your business needs or get a custom quote using our interactive pricing tools
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                variant={activeTab === 'plans' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('plans')}
                size="lg"
              >
                Pricing Plans
              </Button>
              <Button 
                variant={activeTab === 'calculator' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('calculator')}
                size="lg"
              >
                Price Calculator
              </Button>
              <Button 
                variant={activeTab === 'recommender' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('recommender')}
                size="lg"
              >
                Plan Recommender
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pricing Plans Section */}
      {activeTab === 'plans' && (
        <section 
          ref={plansRef} 
          className="py-20 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <motion.div 
                  key={plan.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl relative ${plan.popular ? 'border-2 border-primary' : 'border border-gray-200 dark:border-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={plansInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-sm font-bold py-1 px-3 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold">${plan.price.toLocaleString()}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    >
                      <Link href={plan.buttonLink}>
                        {plan.buttonText}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Comparison Table */}
            <motion.div 
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={plansInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-4 px-6 text-left">Feature</th>
                      <th className="py-4 px-6 text-center">Basic</th>
                      <th className="py-4 px-6 text-center">Standard</th>
                      <th className="py-4 px-6 text-center">Premium</th>
                      <th className="py-4 px-6 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
                      >
                        <td className="py-3 px-6 font-medium">{feature.title}</td>
                        <td className="py-3 px-6 text-center">
                          {feature.basic ? 
                            <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                            <XIcon className="h-5 w-5 text-gray-400 mx-auto" />
                          }
                        </td>
                        <td className="py-3 px-6 text-center">
                          {feature.standard ? 
                            <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                            <XIcon className="h-5 w-5 text-gray-400 mx-auto" />
                          }
                        </td>
                        <td className="py-3 px-6 text-center">
                          {feature.premium ? 
                            <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                            <XIcon className="h-5 w-5 text-gray-400 mx-auto" />
                          }
                        </td>
                        <td className="py-3 px-6 text-center">
                          {feature.enterprise ? 
                            <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                            <XIcon className="h-5 w-5 text-gray-400 mx-auto" />
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Price Calculator Section */}
      {activeTab === 'calculator' && (
        <section ref={calculatorRef} className="py-20 bg-white dark:bg-gray-800">
          <PriceCalculator 
            basePrice={2000}
            modifiers={{
              pages: 100,
              features: 50,
              integrations: 75
            }}
          />
        </section>
      )}
      
      {/* Plan Recommender Section */}
      {activeTab === 'recommender' && (
        <section ref={calculatorRef} className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect Plan</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Answer a few simple questions and we'll recommend the best plan for your needs
              </p>
            </div>
            
            <PlanRecommender 
              questions={[
                "What's your monthly traffic?",
                "Need e-commerce?",
                "CMS preference?"
              ]}
            />
          </div>
        </section>
      )}
      
      {/* FAQ Section */}
      <section 
        ref={faqRef} 
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-xl mb-8">
              We offer tailored solutions designed specifically for your unique business requirements.
            </p>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white"
            >
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
