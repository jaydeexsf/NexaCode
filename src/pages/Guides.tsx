import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Clock, Download, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OptimizedImage from '@/components/shared/OptimizedImage';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// Sample guide data (typically would come from API/backend)
const guides = [
  {
    id: 'seo-optimizatiton-guide-2023',
    title: 'The Complete SEO Optimization Guide for 2023',
    excerpt: 'Learn the latest SEO strategies and techniques to improve your website\'s search engine ranking and drive more organic traffic.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['SEO', 'Digital Marketing'],
    readTime: '15 min',
    downloadable: true,
    featured: true
  },
  {
    id: 'b2b-social-media-strategy',
    title: 'B2B Social Media Strategy Blueprint',
    excerpt: 'A comprehensive guide to creating and implementing an effective social media strategy for B2B companies to generate leads and build brand authority.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['Social Media', 'B2B Marketing'],
    readTime: '12 min',
    downloadable: true,
    featured: true
  },
  {
    id: 'ecommerce-conversion-optimization',
    title: 'E-Commerce Conversion Rate Optimization',
    excerpt: 'Detailed walkthrough of proven techniques to optimize your e-commerce store for higher conversion rates and increased revenue.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['E-Commerce', 'Conversion Optimization'],
    readTime: '18 min',
    downloadable: true,
    featured: false
  },
  {
    id: 'web-accessibility-compliance',
    title: 'Web Accessibility Compliance Guide',
    excerpt: 'Everything you need to know about making your website accessible and compliant with WCAG 2.1 standards and ADA requirements.',
    image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['Accessibility', 'Web Development'],
    readTime: '20 min',
    downloadable: true,
    featured: false
  },
  {
    id: 'content-marketing-framework',
    title: 'Content Marketing Framework for SaaS',
    excerpt: 'A strategic framework for SaaS companies to plan, create, and distribute content that attracts and retains customers.',
    image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['Content Marketing', 'SaaS'],
    readTime: '14 min',
    downloadable: true,
    featured: true
  },
  {
    id: 'ux-design-principles',
    title: 'UX Design Principles for Digital Products',
    excerpt: 'Core principles and best practices for creating intuitive, user-friendly digital products that delight users and drive engagement.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['UX Design', 'Product Design'],
    readTime: '16 min',
    downloadable: true,
    featured: false
  },
  {
    id: 'ai-marketing-automation',
    title: 'AI-Powered Marketing Automation',
    excerpt: 'How to leverage artificial intelligence and automation to scale your marketing efforts and deliver personalized customer experiences.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['AI', 'Marketing Automation'],
    readTime: '17 min',
    downloadable: true,
    featured: false
  },
  {
    id: 'mobile-first-design',
    title: 'Mobile-First Design Strategy',
    excerpt: 'A practical guide to implementing mobile-first design approach for websites and applications in an increasingly mobile-dominated world.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    categories: ['Mobile Design', 'Web Development'],
    readTime: '13 min',
    downloadable: true,
    featured: false
  }
];

// Extract all unique categories from guides
const allCategories = Array.from(
  new Set(guides.flatMap(guide => guide.categories))
);

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
    
    // Create a backdrop of floating books/pages
    const items: THREE.Mesh[] = [];
    const itemCount = 25;
    
    for (let i = 0; i < itemCount; i++) {
      // Randomly create either a book or a page
      const isBook = Math.random() > 0.5;
      
      let geometry;
      
      if (isBook) {
        // Create a book-like shape (cuboid)
        geometry = new THREE.BoxGeometry(1 + Math.random() * 0.5, 1.4 + Math.random() * 0.3, 0.2);
      } else {
        // Create a page-like shape (thin rectangle)
        geometry = new THREE.PlaneGeometry(1 + Math.random() * 0.5, 1.4 + Math.random() * 0.3);
      }
      
      // Create a material with a random color from a professional palette
      const colors = [
        0x4285F4, // Blue
        0x34A853, // Green
        0xFBBC05, // Yellow
        0xEA4335, // Red
        0x673AB7, // Deep Purple
        0x3F51B5, // Indigo
        0x03A9F4, // Light Blue
        0x009688, // Teal
      ];
      
      const material = new THREE.MeshBasicMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2
      });
      
      const item = new THREE.Mesh(geometry, material);
      
      // Random position in 3D space
      item.position.x = (Math.random() - 0.5) * 15;
      item.position.y = (Math.random() - 0.5) * 15;
      item.position.z = Math.random() * -10;
      
      // Random rotation
      item.rotation.x = Math.random() * Math.PI;
      item.rotation.y = Math.random() * Math.PI;
      item.rotation.z = Math.random() * Math.PI;
      
      scene.add(item);
      items.push(item);
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate the items
      items.forEach((item, index) => {
        // Gentle rotation
        item.rotation.x += 0.001 * (Math.sin(index) * 0.5 + 0.5);
        item.rotation.y += 0.001 * (Math.cos(index) * 0.5 + 0.5);
        
        // Gentle floating motion
        item.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.004;
        item.position.x += Math.cos(Date.now() * 0.0005 + index * 0.5) * 0.002;
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

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter guides based on search query and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      guide.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });
  
  const featuredGuides = guides.filter(guide => guide.featured);
  
  return (
    <>
      <Helmet>
        <title>Expert Guides & Resources | NexaWeb Digital Agency</title>
        <meta name="description" content="Access our comprehensive collection of expert guides and resources on digital marketing, web development, UX design, and more to help grow your business online." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Interactive background */}
        <InteractiveBackground />
        
        {/* Hero section */}
        <section className="pt-32 pb-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Expert Guides & Resources
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                In-depth guides, templates, and resources to help you excel in digital marketing, 
                web development, and business growth
              </motion.p>
              
              <motion.div 
                className="relative w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search for guides, resources, topics..."
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Category tabs */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList className="flex overflow-x-auto pb-2 scrollbar-hide">
                <TabsTrigger value="all">All</TabsTrigger>
                {allCategories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        {/* Featured guides */}
        {(selectedCategory === 'all' || featuredGuides.some(guide => guide.categories.includes(selectedCategory))) && 
          searchQuery === '' && (
          <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-center">Featured Guides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredGuides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/guides/${guide.id}`}>
                      <Card className="overflow-hidden h-full cursor-pointer hover:shadow-lg transition-all">
                        <div className="relative h-48 overflow-hidden">
                          <OptimizedImage
                            src={guide.image}
                            alt={guide.title}
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                          <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-sm font-medium">
                            Featured
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{guide.readTime} read</span>
                            {guide.downloadable && (
                              <>
                                <span className="text-gray-500">•</span>
                                <Download className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-500">Downloadable</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {guide.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {guide.categories.map((category) => (
                              <Badge key={category} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                {category}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="link" className="p-0 h-auto">
                            Read Guide <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* All guides */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {searchQuery ? 'Search Results' : 'All Guides'}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </h2>
            
            {filteredGuides.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2">No guides found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                  We couldn't find any guides matching your search criteria. Please try different search terms or browse our categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/guides/${guide.id}`}>
                      <Card className="overflow-hidden h-full cursor-pointer hover:shadow-lg transition-all">
                        <div className="relative h-48 overflow-hidden">
                          <OptimizedImage
                            src={guide.image}
                            alt={guide.title}
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                          {guide.featured && (
                            <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-sm font-medium">
                              Featured
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{guide.readTime} read</span>
                            {guide.downloadable && (
                              <>
                                <span className="text-gray-500">•</span>
                                <Download className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-500">Downloadable</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {guide.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {guide.categories.map((category) => (
                              <Badge key={category} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                {category}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="link" className="p-0 h-auto">
                            Read Guide <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter subscription */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get Expert Insights Delivered</h2>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                Subscribe to our newsletter to receive new guides, industry insights, and exclusive resources directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="sm:max-w-md" 
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm mt-4 text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Guides;