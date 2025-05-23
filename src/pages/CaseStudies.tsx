import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects, ProjectDetail } from '@/data/projects';
import { useTheme } from '@/lib/theme-provider';
import OptimizedImage from '@/components/shared/OptimizedImage';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

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
    
    // Create a grid of cubes representing case studies/projects
    const cubeSize = 0.3;
    const gapSize = 0.2;
    const gridSize = 15;
    const totalWidth = gridSize * (cubeSize + gapSize);
    const cubes: THREE.Mesh[] = [];
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Create cube
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const material = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color(
            0.5 + Math.random() * 0.5, 
            0.5 + Math.random() * 0.5, 
            0.5 + Math.random() * 0.5
          ),
          transparent: true,
          opacity: 0.3 + Math.random() * 0.2
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position in grid
        cube.position.x = (x * (cubeSize + gapSize)) - totalWidth / 2;
        cube.position.y = (y * (cubeSize + gapSize)) - totalWidth / 2;
        cube.position.z = Math.random() * -3;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        scene.add(cube);
        cubes.push(cube);
      }
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate cubes gently
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.003 * (Math.sin(index) * 0.5 + 0.5);
        cube.rotation.y += 0.003 * (Math.cos(index) * 0.5 + 0.5);
        
        // Gentle floating motion
        cube.position.z = Math.sin(Date.now() * 0.001 + index) * 0.1 + cube.position.z * 0.99;
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

const CaseStudies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const { theme } = useTheme();
  
  // Extract unique industries from projects
  const industries = Array.from(
    new Set(
      projects
        .map(project => "industry" in project ? (project as ProjectDetail).industry : null)
        .filter(Boolean)
    )
  );
  
  // Filter and sort projects
  const filteredProjects = projects.filter(project => {
    // Filter by search query
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by industry
    const matchesIndustry = 
      industryFilter === 'all' || 
      ("industry" in project && (project as ProjectDetail).industry === industryFilter);
    
    return matchesSearch && matchesIndustry;
  });
  
  return (
    <>
      <Helmet>
        <title>Case Studies | NexaWeb Digital Agency</title>
        <meta name="description" content="Explore our portfolio of successful case studies across various industries. Learn how we've helped businesses transform their digital presence and achieve measurable results." />
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
                Case Studies
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore our portfolio of successful projects and discover how we help 
                businesses transform their digital presence
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Filter and search section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search by keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-500" />
                <span className="text-sm font-medium">Filter by:</span>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Case studies grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="grid" className="mb-12">
              <div className="flex justify-end">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="mt-8">
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                      No case studies found matching your criteria. Please try different search terms or filters.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={`/case-studies/${project.id}`}>
                          <Card className="overflow-hidden h-full cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg">
                            <div className="relative h-60 overflow-hidden">
                              <OptimizedImage
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full transition-transform hover:scale-105"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-2 line-clamp-2">{project.title}</h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                    {tag}
                                  </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                    +{project.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                              <Button variant="link" className="p-0 h-auto">
                                View Case Study <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="list" className="mt-8">
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                      No case studies found matching your criteria. Please try different search terms or filters.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={`/case-studies/${project.id}`}>
                          <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg">
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-1/3 h-48">
                                <OptimizedImage
                                  src={project.image}
                                  alt={project.title}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <CardContent className="p-6 w-full md:w-2/3">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                {"industry" in project && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    Industry: {(project as ProjectDetail).industry}
                                  </p>
                                )}
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                  {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <Button variant="link" className="p-0 h-auto">
                                  View Case Study <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardContent>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Success Story?</h2>
              <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                Let's work together to transform your business and create remarkable digital experiences.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;