import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, ChevronRight, HelpCircle, BookOpen, MessageCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OptimizedImage from '@/components/shared/OptimizedImage';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// Sample FAQ data (typically would come from a CMS)
const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'What services does NexaWeb Digital Agency provide?',
        answer: 'NexaWeb provides a comprehensive range of digital services including web design and development, UX/UI design, digital marketing, e-commerce solutions, SEO optimization, content creation, and brand strategy. Our team of experts works collaboratively to deliver holistic digital solutions tailored to your specific business needs.'
      },
      {
        question: 'How do I request a quote for my project?',
        answer: 'You can request a quote by filling out our contact form on the Contact page, calling our office directly, or scheduling a consultation through our online booking system. Please provide as much detail as possible about your project requirements to help us prepare an accurate and comprehensive quote.'
      },
      {
        question: 'What is your typical project timeline?',
        answer: 'Project timelines vary based on scope, complexity, and specific requirements. A simple website might take 4-6 weeks, while a complex e-commerce platform could take 2-3 months or more. During our initial consultation, we\'ll provide a detailed timeline based on your specific project needs.'
      },
      {
        question: 'Do you work with clients internationally?',
        answer: 'Yes, we work with clients worldwide. Our team uses collaborative tools and scheduled video conferences to maintain clear communication across different time zones, ensuring a smooth project experience regardless of geographic location.'
      }
    ]
  },
  {
    category: 'Services & Pricing',
    items: [
      {
        question: 'How is project pricing determined?',
        answer: 'Our pricing is based on several factors including project scope, complexity, timeline, and required resources. We offer both fixed-price and time-and-materials pricing models depending on the nature of your project. We provide detailed proposals with transparent pricing before any work begins.'
      },
      {
        question: 'Do you offer maintenance services after the project is complete?',
        answer: 'Yes, we offer various maintenance packages to keep your digital assets secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security monitoring, performance optimization, content updates, and technical support.'
      },
      {
        question: 'Can you work with my existing website or do I need to start from scratch?',
        answer: 'We can work with your existing website depending on its current state and your goals. Our team will evaluate your site and recommend whether improvements to the existing platform or a complete redesign would better serve your objectives and provide the best ROI.'
      },
      {
        question: 'Do you offer discounts for non-profit organizations?',
        answer: 'Yes, we offer special pricing for registered non-profit organizations. Please mention your non-profit status when contacting us, and we\'ll be happy to discuss our non-profit rates and how we can support your mission.'
      }
    ]
  },
  {
    category: 'Technical Support',
    items: [
      {
        question: 'How do I report a technical issue with my website?',
        answer: 'You can report technical issues through our support portal, by emailing support@nexaweb.com, or by calling our technical support line. For clients with maintenance packages, please use the dedicated support channel provided in your client dashboard for priority assistance.'
      },
      {
        question: 'What is your response time for support requests?',
        answer: 'For clients with maintenance packages, we guarantee initial response times of 2-4 hours during business hours for standard issues, and 1 hour for critical issues affecting website functionality. For clients without maintenance packages, we respond to support requests within 24-48 business hours.'
      },
      {
        question: 'Do you provide training for content management systems?',
        answer: 'Yes, we provide comprehensive training for any content management system (CMS) we implement. Training includes hands-on sessions, documentation, and video tutorials. Additional training sessions can be arranged as needed for new team members or refresher courses.'
      },
      {
        question: 'How do you handle website security?',
        answer: 'Security is a top priority in all our implementations. We follow industry best practices including regular security updates, secure coding standards, SSL implementation, firewall configuration, and malware scanning. For e-commerce and sites handling sensitive data, we implement additional security measures and compliance standards.'
      }
    ]
  },
  {
    category: 'Billing & Accounts',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit cards (Visa, MasterCard, American Express), direct bank transfers, PayPal, and checks for clients in the United States. For larger projects, we typically work with a milestone-based payment schedule agreed upon before the project begins.'
      },
      {
        question: 'How do I update my account information?',
        answer: 'You can update your account information by logging into your client portal and navigating to the Account Settings section. If you have any difficulty accessing your account or making changes, please contact our support team for assistance.'
      },
      {
        question: 'What is your refund policy?',
        answer: 'Our refund policy varies depending on the type of service and project stage. For most services, we offer a satisfaction guarantee within specific parameters outlined in our service agreement. Please refer to your contract for specific details, or contact our account management team to discuss your situation.'
      },
      {
        question: 'How do I receive and pay invoices?',
        answer: 'Invoices are sent via email and are also available in your client portal. Payment instructions are included with each invoice, and you can pay directly through the portal using your preferred payment method. We also offer auto-billing options for clients with recurring services.'
      }
    ]
  }
];

// Sample help categories
const helpCategories = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Find answers about our web development processes, technologies, and best practices.',
    articleCount: 28,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: <ExternalLink className="h-5 w-5" />,
    description: 'Learn about our digital marketing services, analytics, and optimization strategies.',
    articleCount: 35,
    iconBg: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    id: 'design-ux',
    title: 'Design & UX',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Discover our design principles, UX methodologies, and creative processes.',
    articleCount: 24,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Information about our e-commerce solutions, platforms, and optimization techniques.',
    articleCount: 19,
    iconBg: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    id: 'hosting-maintenance',
    title: 'Hosting & Maintenance',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Details about our hosting services, maintenance packages, and security practices.',
    articleCount: 22,
    iconBg: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    id: 'account-billing',
    title: 'Account & Billing',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Information about your account, invoices, payment methods, and billing policies.',
    articleCount: 16,
    iconBg: 'bg-teal-100 dark:bg-teal-900/30'
  }
];

// Sample team members for support
const supportTeam = [
  {
    name: 'Emily Johnson',
    title: 'Client Support Manager',
    image: 'https://i.pravatar.cc/300?img=1',
    specialty: 'Account Management'
  },
  {
    name: 'Michael Chen',
    title: 'Technical Support Lead',
    image: 'https://i.pravatar.cc/300?img=2',
    specialty: 'Web Development'
  },
  {
    name: 'Sarah Williams',
    title: 'Customer Success Specialist',
    image: 'https://i.pravatar.cc/300?img=3',
    specialty: 'Onboarding & Training'
  }
];

const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Add responsive handling
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Create support-themed elements (question marks, speech bubbles, etc.)
    const elements: THREE.Mesh[] = [];
    const elementCount = 20;
    
    for (let i = 0; i < elementCount; i++) {
      // Decide which type of element to create
      const elementType = Math.floor(Math.random() * 3); // 0: question mark, 1: circle, 2: speech bubble-like shape
      
      let geometry;
      
      // Create different geometries based on type
      if (elementType === 0) {
        // Create a torus (question mark-like)
        geometry = new THREE.TorusGeometry(0.5, 0.2, 8, 20, Math.PI * 1.5);
      } else if (elementType === 1) {
        // Create a simple circle/sphere
        geometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.3, 8, 8);
      } else {
        // Create a rounded rectangle (speech bubble-like)
        geometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
        // Could add more complex shapes here in a real implementation
      }
      
      // Create a material with a random subtle color
      const colors = [
        0x3a86ff, // Blue
        0x8338ec, // Purple
        0xff006e, // Pink
        0xfb5607, // Orange
        0xffbe0b, // Yellow
      ];
      
      const material = new THREE.MeshBasicMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2
      });
      
      const element = new THREE.Mesh(geometry, material);
      
      // Random position in 3D space
      element.position.x = (Math.random() - 0.5) * 20;
      element.position.y = (Math.random() - 0.5) * 20;
      element.position.z = (Math.random() - 0.5) * 10;
      
      // Random rotation
      element.rotation.x = Math.random() * Math.PI;
      element.rotation.y = Math.random() * Math.PI;
      element.rotation.z = Math.random() * Math.PI;
      
      scene.add(element);
      elements.push(element);
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate the elements
      elements.forEach((element, index) => {
        // Gentle rotation
        element.rotation.x += 0.002 * (Math.sin(index) * 0.5 + 0.5);
        element.rotation.y += 0.002 * (Math.cos(index) * 0.5 + 0.5);
        
        // Gentle floating motion
        element.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.004;
        element.position.x += Math.cos(Date.now() * 0.0005 + index * 0.5) * 0.002;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger a search API call
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <>
      <Helmet>
        <title>Help Center | NexaWeb Digital Agency</title>
        <meta name="description" content="Find answers to frequently asked questions, browse our knowledge base, and get support for all NexaWeb services. Our help center provides resources to assist you with any queries." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Interactive background */}
        <InteractiveBackground />
        
        {/* Hero section */}
        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                How Can We Help You?
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Find answers, browse topics, or contact our support team
              </motion.p>
              
              <motion.form 
                onSubmit={handleSearch}
                className="relative w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
        
        {/* Help categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse Help Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/help-center/${category.id}`}>
                    <Card className="h-full cursor-pointer hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.iconBg}`}>
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{category.articleCount} articles</span>
                          <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/90">
                            View Articles <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              
              <Tabs defaultValue={faqs[0].category.toLowerCase().replace(/\s+/g, '-')} className="mb-8">
                <TabsList className="flex justify-center flex-wrap">
                  {faqs.map((faqCategory) => (
                    <TabsTrigger 
                      key={faqCategory.category} 
                      value={faqCategory.category.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {faqCategory.category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {faqs.map((faqCategory) => (
                  <TabsContent 
                    key={faqCategory.category} 
                    value={faqCategory.category.toLowerCase().replace(/\s+/g, '-')}
                  >
                    <Accordion type="single" collapsible className="space-y-4">
                      {faqCategory.items.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <AccordionItem value={`item-${index}`} className="border rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700/20 text-left">
                              <div className="flex items-start">
                                <HelpCircle className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{faq.question}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 pl-12">
                              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
              
              <div className="text-center mt-8">
                <Link href="/contact">
                  <Button variant="outline" className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Can't find what you're looking for?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Support team section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Our Support Team</h2>
              <p className="text-lg mb-12 text-gray-600 dark:text-gray-300">
                Meet the people dedicated to helping you succeed with our services
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {supportTeam.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <OptimizedImage
                          src={member.image}
                          alt={member.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-1">{member.title}</p>
                        <p className="text-sm text-gray-500 mb-4">Specializes in {member.specialty}</p>
                        <Button variant="outline" className="w-full gap-2">
                          <MessageCircle className="h-4 w-4" /> Contact
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact options */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Get in Touch</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get a response within 24 hours
                    </p>
                    <Button variant="outline" className="w-full">
                      support@nexaweb.com
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Available Monday-Friday, 9am-5pm ET
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Knowledge Base</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Browse our comprehensive resources
                    </p>
                    <Link href="/help-center/articles">
                      <Button variant="outline" className="w-full">
                        View Articles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HelpCenter;