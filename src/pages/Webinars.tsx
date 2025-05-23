import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Calendar, Clock, Play, Search, ChevronRight, Calendar as CalendarIcon, Clock as ClockIcon, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import OptimizedImage from '@/components/shared/OptimizedImage';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// Mock webinar data (would typically come from API/CMS)
const webinars = [
  {
    id: 'ai-driven-ux-design',
    title: 'AI-Driven UX Design: Creating Personalized User Experiences',
    description: 'Learn how to leverage AI to create more personalized, intuitive, and effective user experiences for digital products and services.',
    image: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'Sofia Rodriguez',
    presenterTitle: 'Head of UX Design',
    date: '2023-08-15T14:00:00Z',
    duration: '60 min',
    registrants: 456,
    status: 'upcoming',
    categories: ['UX Design', 'AI'],
    featured: true
  },
  {
    id: 'seo-strategies-2023',
    title: 'SEO Strategies That Actually Work in 2023',
    description: 'Discover the latest SEO techniques and algorithms updates that are driving organic traffic growth in 2023 and beyond.',
    image: 'https://images.unsplash.com/photo-1571721795195-a2d50c780532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'Marcus Chen',
    presenterTitle: 'SEO Director',
    date: '2023-08-22T15:00:00Z',
    duration: '75 min',
    registrants: 289,
    status: 'upcoming',
    categories: ['SEO', 'Digital Marketing'],
    featured: true
  },
  {
    id: 'ecommerce-optimization',
    title: 'E-Commerce Conversion Optimization Masterclass',
    description: 'A comprehensive guide to optimizing your e-commerce store for higher conversion rates, improved user experience, and increased revenue.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'Olivia Martinez',
    presenterTitle: 'E-Commerce Strategist',
    date: '2023-07-15T16:00:00Z',
    duration: '90 min',
    registrants: 714,
    status: 'past',
    recording: true,
    categories: ['E-Commerce', 'Conversion Optimization'],
    featured: false
  },
  {
    id: 'b2b-content-marketing',
    title: 'B2B Content Marketing: Strategy to Execution',
    description: 'Learn how to develop and implement a results-driven B2B content marketing strategy that generates quality leads and builds thought leadership.',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'James Wilson',
    presenterTitle: 'Content Strategy Lead',
    date: '2023-07-08T14:00:00Z',
    duration: '60 min',
    registrants: 527,
    status: 'past',
    recording: true,
    categories: ['Content Marketing', 'B2B'],
    featured: false
  },
  {
    id: 'web-performance-optimization',
    title: 'Web Performance Optimization for Better User Experience',
    description: 'Technical strategies and best practices for optimizing website performance, improving Core Web Vitals, and delivering exceptional user experiences.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'David Park',
    presenterTitle: 'Web Performance Engineer',
    date: '2023-09-05T16:00:00Z',
    duration: '75 min',
    registrants: 183,
    status: 'upcoming',
    categories: ['Web Development', 'Performance'],
    featured: false
  },
  {
    id: 'digital-marketing-analytics',
    title: 'Digital Marketing Analytics: Turning Data into Action',
    description: 'How to effectively collect, analyze, and act on digital marketing data to improve campaign performance and maximize ROI.',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'Emily Johnson',
    presenterTitle: 'Analytics Director',
    date: '2023-08-29T15:00:00Z',
    duration: '60 min',
    registrants: 251,
    status: 'upcoming',
    categories: ['Analytics', 'Digital Marketing'],
    featured: false
  },
  {
    id: 'website-security-essentials',
    title: 'Website Security Essentials for Business Owners',
    description: 'Learn the fundamental security practices every business should implement to protect their website, customer data, and brand reputation.',
    image: 'https://images.unsplash.com/photo-1563452965085-2e77e5bf2607?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    presenter: 'Michael Chen',
    presenterTitle: 'Security Specialist',
    date: '2023-06-28T16:00:00Z',
    duration: '75 min',
    registrants: 432,
    status: 'past',
    recording: true,
    categories: ['Security', 'Business'],
    featured: false
  }
];

// Extract all unique categories
const allCategories = Array.from(
  new Set(webinars.flatMap(webinar => webinar.categories))
);

// Interactive background component with Three.js
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
    
    // Create animated abstract particles for webinar/virtual event theme
    const particleCount = 150;
    const particles: THREE.Points[] = [];
    
    // Create particle groups with different materials
    const particleGroups = 3;
    
    for (let g = 0; g < particleGroups; g++) {
      // Create particle geometry
      const geometryParticles = new THREE.BufferGeometry();
      const vertices = [];
      
      // Generate random positions for particles
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 30;
        
        vertices.push(x, y, z);
      }
      
      // Set particle positions
      geometryParticles.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      
      // Create materials with different colors
      const colors = [0x4285F4, 0x34A853, 0xFBBC05]; // Blue, Green, Yellow
      
      const material = new THREE.PointsMaterial({
        color: colors[g],
        size: 0.1 + Math.random() * 0.1,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      
      // Create points and add to scene
      const points = new THREE.Points(geometryParticles, material);
      scene.add(points);
      particles.push(points);
    }
    
    // Create connecting lines between some particles (network effect)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05
    });
    
    const lines: THREE.Line[] = [];
    const lineCount = 40;
    
    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      
      // Create random line between two random points
      const points = [];
      
      const startX = (Math.random() - 0.5) * 25;
      const startY = (Math.random() - 0.5) * 25;
      const startZ = (Math.random() - 0.5) * 25;
      
      const endX = startX + (Math.random() - 0.5) * 10;
      const endY = startY + (Math.random() - 0.5) * 10;
      const endZ = startZ + (Math.random() - 0.5) * 10;
      
      points.push(
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(endX, endY, endZ)
      );
      
      geometry.setFromPoints(points);
      
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
      lines.push(line);
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particle groups gently
      particles.forEach((particle, index) => {
        particle.rotation.x += 0.0003 * (index + 1);
        particle.rotation.y += 0.0002 * (index + 1);
      });
      
      // Gently animate lines
      lines.forEach((line, index) => {
        line.rotation.x += 0.0001 * Math.sin(index);
        line.rotation.y += 0.0001 * Math.cos(index);
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

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });
};

// Format time for display
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const Webinars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter webinars based on search query and active tab
  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = 
      webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'upcoming' && webinar.status === 'upcoming') ||
      (activeTab === 'past' && webinar.status === 'past') ||
      webinar.categories.includes(activeTab);
    
    return matchesSearch && matchesTab;
  });
  
  const featuredWebinars = webinars.filter(webinar => webinar.featured && webinar.status === 'upcoming');
  const upcomingWebinars = webinars.filter(webinar => webinar.status === 'upcoming');
  const pastWebinars = webinars.filter(webinar => webinar.status === 'past');
  
  return (
    <>
      <Helmet>
        <title>Webinars | NexaWeb Digital Agency</title>
        <meta name="description" content="Join our expert-led webinars on digital marketing, web development, UX design, and more. Register for upcoming sessions or watch recordings of past webinars." />
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
                Expert Webinars
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Join our live sessions and learn directly from industry experts about the latest trends, 
                strategies, and technologies
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
                  placeholder="Search webinars by topic, presenter, or keyword..."
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured upcoming webinars */}
        {featuredWebinars.length > 0 && searchQuery === '' && activeTab === 'all' && (
          <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-center">Featured Upcoming Webinars</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredWebinars.map((webinar, index) => (
                  <motion.div
                    key={webinar.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden shadow-lg h-full flex flex-col md:flex-row">
                      <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                        <OptimizedImage
                          src={webinar.image}
                          alt={webinar.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-sm font-medium rounded-bl-md">
                          Featured
                        </div>
                      </div>
                      <CardContent className="p-6 md:w-3/5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Upcoming
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {webinar.description}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{formatDate(webinar.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{formatTime(webinar.date)} • {webinar.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{webinar.registrants} people registered</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <p className="font-medium">{webinar.presenter}</p>
                            <p className="text-sm text-gray-500">{webinar.presenterTitle}</p>
                          </div>
                          <Link href={`/webinars/${webinar.id}`}>
                            <Button className="bg-primary hover:bg-primary/90">
                              Register Now
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Filtering tabs */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="flex overflow-x-auto pb-2 scrollbar-hide">
                <TabsTrigger value="all">All Webinars</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Recordings</TabsTrigger>
                <Separator orientation="vertical" className="h-6 mx-2" />
                {allCategories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        {/* Webinars list */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {searchQuery ? 'Search Results' : activeTab === 'all' ? 'All Webinars' : 
               activeTab === 'upcoming' ? 'Upcoming Webinars' : 
               activeTab === 'past' ? 'Past Webinars' : 
               `Webinars in ${activeTab}`}
            </h2>
            
            {filteredWebinars.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2">No webinars found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                  We couldn't find any webinars matching your search criteria. Please try different search terms or browse our categories.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredWebinars.map((webinar, index) => (
                  <motion.div
                    key={webinar.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/webinars/${webinar.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/4 h-48 md:h-auto overflow-hidden">
                            <OptimizedImage
                              src={webinar.image}
                              alt={webinar.title}
                              className="object-cover w-full h-full"
                            />
                            {webinar.status === 'past' && webinar.recording && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                  <Play className="h-8 w-8 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6 md:w-3/4">
                            <div className="flex items-center gap-2 mb-2">
                              {webinar.status === 'upcoming' ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                  Upcoming
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                                  Past
                                </Badge>
                              )}
                              {webinar.categories.map((category) => (
                                <Badge key={category} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {webinar.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-4">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{formatDate(webinar.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ClockIcon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{formatTime(webinar.date)} • {webinar.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{webinar.registrants} people registered</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{webinar.presenter}</p>
                                <p className="text-sm text-gray-500">{webinar.presenterTitle}</p>
                              </div>
                              {webinar.status === 'upcoming' ? (
                                <Button className="bg-primary hover:bg-primary/90">
                                  Register Now
                                </Button>
                              ) : (
                                <Button variant="outline" className="flex items-center gap-2">
                                  <Play className="h-4 w-4" /> Watch Recording
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Host your own webinar CTA */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Host Your Own Webinar?</h2>
              <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                Partner with us to create and host engaging webinars that showcase your expertise and generate qualified leads.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Webinars;