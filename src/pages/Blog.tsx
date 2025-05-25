import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Tag, Search } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'wouter';

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  isPopular?: boolean;
}

// Sample blog data
const blogPosts: BlogPost[] = [
  {
    id: 'web-trends-2023',
    title: 'Web Development Trends to Watch in 2023',
    excerpt: 'Explore the cutting-edge technologies and methodologies that are reshaping the web development landscape in 2023.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non erat in justo fermentum semper at ut metus. Donec et sem tempor, auctor sapien in, fringilla eros. Nulla facilisi. Integer ac ante et quam hendrerit lobortis in eget tellus.',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/200?img=1',
      role: 'Lead Developer'
    },
    date: 'April 15, 2023',
    readTime: '8 min',
    category: 'Development',
    tags: ['Web Development', 'Tech Trends', 'JavaScript', 'Frontend'],
    featuredImage: 'https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isPopular: true
  },
  {
    id: 'ai-in-design',
    title: 'How AI is Transforming UI/UX Design',
    excerpt: 'Artificial intelligence is revolutionizing the way designers approach user experience. Discover how AI tools are enhancing creativity and efficiency.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non erat in justo fermentum semper at ut metus. Donec et sem tempor, auctor sapien in, fringilla eros. Nulla facilisi. Integer ac ante et quam hendrerit lobortis in eget tellus.',
    author: {
      name: 'Emily Chen',
      avatar: 'https://i.pravatar.cc/200?img=5',
      role: 'Senior Designer'
    },
    date: 'March 22, 2023',
    readTime: '6 min',
    category: 'Design',
    tags: ['UI/UX', 'Artificial Intelligence', 'Design Tools', 'Innovation'],
    featuredImage: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'headless-cms',
    title: 'The Rise of Headless CMS: Flexibility for Modern Web Projects',
    excerpt: 'Traditional content management systems are being replaced by headless alternatives. Learn why this shift matters for your next project.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non erat in justo fermentum semper at ut metus. Donec et sem tempor, auctor sapien in, fringilla eros. Nulla facilisi. Integer ac ante et quam hendrerit lobortis in eget tellus.',
    author: {
      name: 'Marcus Wright',
      avatar: 'https://i.pravatar.cc/200?img=3',
      role: 'CTO'
    },
    date: 'February 10, 2023',
    readTime: '10 min',
    category: 'Technology',
    tags: ['CMS', 'Architecture', 'Content Management', 'API'],
    featuredImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isPopular: true
  },
  {
    id: 'ecommerce-optimization',
    title: 'Ecommerce Optimization Strategies That Actually Work',
    excerpt: 'Boost your online store\'s conversion rates with these proven optimization techniques backed by real-world data.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non erat in justo fermentum semper at ut metus. Donec et sem tempor, auctor sapien in, fringilla eros. Nulla facilisi. Integer ac ante et quam hendrerit lobortis in eget tellus.',
    author: {
      name: 'Sophia Rodriguez',
      avatar: 'https://i.pravatar.cc/200?img=2',
      role: 'Ecommerce Specialist'
    },
    date: 'January 28, 2023',
    readTime: '12 min',
    category: 'Ecommerce',
    tags: ['Conversion Rate', 'Optimization', 'Online Store', 'Sales'],
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'mobile-first-design',
    title: 'Why Mobile-First Design Is No Longer Optional',
    excerpt: 'With mobile traffic dominating the web, designing for smaller screens first has become a necessity. Here\'s how to adapt your approach.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non erat in justo fermentum semper at ut metus. Donec et sem tempor, auctor sapien in, fringilla eros. Nulla facilisi. Integer ac ante et quam hendrerit lobortis in eget tellus.',
    author: {
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/200?img=4',
      role: 'UI/UX Designer'
    },
    date: 'January 5, 2023',
    readTime: '7 min',
    category: 'Design',
    tags: ['Mobile Design', 'Responsive', 'User Experience', 'Design Strategy'],
    featuredImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    isPopular: true
  },
  {
    id: 'web-security',
    title: 'Essential Web Security Practices for 2023',
    excerpt: 'Protect your web applications from evolving threats with these updated security measures every developer should implement.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras non erat in justo fermentum semper at ut metus. Donec et sem tempor, auctor sapien in, fringilla eros. Nulla facilisi. Integer ac ante et quam hendrerit lobortis in eget tellus.',
    author: {
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/200?img=6',
      role: 'Security Engineer'
    },
    date: 'December 12, 2022',
    readTime: '9 min',
    category: 'Security',
    tags: ['Cybersecurity', 'Web Development', 'Best Practices', 'HTTPS'],
    featuredImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
];

// Categories
const categories = ['All', 'Development', 'Design', 'Technology', 'Ecommerce', 'Security'];

// Three.js Interactive Background Component
const InteractiveBlogBackground = () => {
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
    
    // Create a blog-themed visual - floating documents/cards
    const totalCards = 30;
    const cards: THREE.Mesh[] = [];
    const cardMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3a86ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    
    for (let i = 0; i < totalCards; i++) {
      // Create card shapes of different sizes
      const width = 0.5 + Math.random() * 0.5;
      const height = 0.7 + Math.random() * 0.5;
      const cardGeometry = new THREE.PlaneGeometry(width, height);
      const card = new THREE.Mesh(cardGeometry, cardMaterial);
      
      // Position randomly in 3D space
      card.position.x = (Math.random() - 0.5) * 10;
      card.position.y = (Math.random() - 0.5) * 10;
      card.position.z = (Math.random() - 0.5) * 10;
      
      // Random rotation
      card.rotation.x = Math.random() * Math.PI;
      card.rotation.y = Math.random() * Math.PI;
      
      scene.add(card);
      cards.push(card);
    }
    
    // Animation properties for each card
    const animations = cards.map(() => ({
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      movementSpeed: {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      }
    }));
    
    // Connect cards with lines to create a network visual
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3a86ff, 
      transparent: true,
      opacity: 0.1 
    });
    
    // Create connections between some cards
    const connections: THREE.Line[] = [];
    
    for (let i = 0; i < totalCards; i++) {
      // Connect to 1-3 random other cards
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < connectionsCount; j++) {
        const targetIndex = Math.floor(Math.random() * totalCards);
        if (targetIndex !== i) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            cards[i].position,
            cards[targetIndex].position
          ]);
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
          connections.push(line);
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate cards
      cards.forEach((card, index) => {
        // Rotate each card
        card.rotation.x += animations[index].rotationSpeed.x;
        card.rotation.y += animations[index].rotationSpeed.y;
        card.rotation.z += animations[index].rotationSpeed.z;
        
        // Move each card slightly
        card.position.x += animations[index].movementSpeed.x;
        card.position.y += animations[index].movementSpeed.y;
        card.position.z += animations[index].movementSpeed.z;
        
        // Boundary check and reverse direction if needed
        if (Math.abs(card.position.x) > 5) animations[index].movementSpeed.x *= -1;
        if (Math.abs(card.position.y) > 5) animations[index].movementSpeed.y *= -1;
        if (Math.abs(card.position.z) > 5) animations[index].movementSpeed.z *= -1;
      });
      
      // Update line connections
      connections.forEach((line) => {
        const positions = line.geometry.attributes.position.array;
        if (positions) {
          const linePositions = positions as Float32Array;
          // We know each line connects two specific cards, update their positions
          if (linePositions.length >= 6) {
            // Update connections dynamically - this creates a more organic feel
            // as the cards move, the lines follow
            const sourceIndex = Math.floor(Math.random() * totalCards);
            const targetIndex = Math.floor(Math.random() * totalCards);
            
            // Update line positions to follow the cards
            linePositions[0] = cards[sourceIndex].position.x;
            linePositions[1] = cards[sourceIndex].position.y;
            linePositions[2] = cards[sourceIndex].position.z;
            linePositions[3] = cards[targetIndex].position.x;
            linePositions[4] = cards[targetIndex].position.y;
            linePositions[5] = cards[targetIndex].position.z;
            
            line.geometry.attributes.position.needsUpdate = true;
          }
        }
      });
      
      // Rotate the entire scene slightly for a more dynamic effect
      scene.rotation.y += 0.001;
      
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

const BlogPage = () => {
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter posts based on category and search term
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Get popular posts
  const popularPosts = blogPosts.filter(post => post.isPopular).slice(0, 3);
  
  return (
    <>
      <Helmet>
        <title>Blog | NexaWeb Digital Agency</title>
        <meta name="description" content="Explore the latest insights, trends, and best practices in web development, design, and digital marketing from NexaWeb\'s industry experts." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Three.js interactive background */}
        <InteractiveBlogBackground />
        
        {/* Hero section */}
        <section className="pt-32 pb-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Blog
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Insights and perspectives on digital innovation, design, and technology
              </motion.p>
              
              {/* Search bar */}
              <motion.div 
                className="max-w-xl mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 py-6 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured posts */}
        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Popular Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularPosts.map((post, index) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary">Popular</Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl hover:text-primary transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="text-sm">{post.author.name}</span>
                      </div>
                      <Badge variant="outline">{post.category}</Badge>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* All blog posts with filter tabs */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            
            <Tabs defaultValue="All" onValueChange={setCategory} className="mb-8">
              <TabsList className="mb-8 flex flex-wrap justify-center">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 % 0.5 }}
                      >
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title} 
                              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {post.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <CardTitle className="text-xl hover:text-primary transition-colors">
                              <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              <span className="text-sm">{post.author.name}</span>
                            </div>
                            <Badge variant="outline">{post.category}</Badge>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No articles found matching your search.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => { setSearchTerm(''); setCategory('All'); }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Newsletter Signup */}
            <div className="mt-16 bg-primary/10 rounded-xl p-8 md:p-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get the latest articles, resources, and insights delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;