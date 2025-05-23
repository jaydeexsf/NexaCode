import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projects, ProjectDetail } from '@/data/projects';
import OptimizedImage from '@/components/shared/OptimizedImage';
import * as THREE from 'three';
import { useRef } from 'react';

// Interactive Three.js background
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
    
    // Create a portfolio/gallery visualization with floating frames
    const frames: THREE.Mesh[] = [];
    const frameCount = 25;
    
    // Create frames representing portfolio items
    for (let i = 0; i < frameCount; i++) {
      // Create frame geometry (thin box)
      const frameWidth = 1.5 + Math.random() * 1;
      const frameHeight = 1 + Math.random() * 1.5;
      const frameDepth = 0.05;
      
      const frameGeometry = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
      const frameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
      });
      
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      
      // Create "canvas" inside the frame (slightly smaller plane)
      const canvasGeometry = new THREE.PlaneGeometry(frameWidth * 0.9, frameHeight * 0.9);
      
      // Create a gradient material to simulate portfolio contents
      const colors = [
        0x5E60CE, // Purple
        0x64DFDF, // Teal
        0xFBAB7E, // Peach
        0x00B4D8, // Blue
        0x5E60CE, // Purple
        0xFFE45E  // Yellow
      ];
      
      const canvasMaterial = new THREE.MeshBasicMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      
      const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
      canvas.position.z = 0.05; // Slightly in front of frame
      
      // Group frame and canvas
      const frameGroup = new THREE.Group();
      frameGroup.add(frame);
      frameGroup.add(canvas);
      
      // Random position in 3D space
      frameGroup.position.x = (Math.random() - 0.5) * 25;
      frameGroup.position.y = (Math.random() - 0.5) * 15;
      frameGroup.position.z = (Math.random() - 0.5) * 15;
      
      // Random rotation
      frameGroup.rotation.x = Math.random() * Math.PI * 0.2;
      frameGroup.rotation.y = Math.random() * Math.PI * 0.2;
      frameGroup.rotation.z = Math.random() * Math.PI * 0.05;
      
      scene.add(frameGroup);
      frames.push(frame);
    }
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle movement of frames
      frames.forEach((frame, index) => {
        if (frame.parent) {
          // Apply gentle floating motion to parent group
          frame.parent.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.003;
          frame.parent.position.x += Math.cos(Date.now() * 0.0005 + index * 0.5) * 0.002;
          
          // Gentle rotation
          frame.parent.rotation.x += Math.sin(Date.now() * 0.0001) * 0.0005;
          frame.parent.rotation.y += Math.cos(Date.now() * 0.0001) * 0.0005;
        }
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

const ViewAllProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [technologyFilter, setTechnologyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;
  
  // Extract unique industries and technologies from projects
  const industries = Array.from(
    new Set(
      projects
        .map(project => "industry" in project ? (project as ProjectDetail).industry : null)
        .filter(Boolean)
    )
  );
  
  const technologies = Array.from(
    new Set(
      projects
        .flatMap(project => {
          if ("technologies" in project) {
            return (project as ProjectDetail).technologies;
          }
          return [];
        })
        .filter(Boolean)
    )
  );
  
  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by industry
    const matchesIndustry = 
      industryFilter === 'all' || 
      ("industry" in project && (project as ProjectDetail).industry === industryFilter);
    
    // Filter by technology
    const matchesTechnology = 
      technologyFilter === 'all' || 
      ("technologies" in project && (project as ProjectDetail).technologies.includes(technologyFilter));
    
    return matchesSearch && matchesIndustry && matchesTechnology;
  });
  
  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Portfolio | NexaWeb Digital Agency</title>
        <meta name="description" content="Explore our complete portfolio of successful digital projects across various industries. Discover how we've helped businesses transform their digital presence and achieve their goals." />
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
                Our Work
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore our portfolio of award-winning digital experiences
                and successful client projects
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Filter section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                  }}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Industry:</span>
                  <Select 
                    value={industryFilter} 
                    onValueChange={(value) => {
                      setIndustryFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Industries" />
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
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Technology:</span>
                  <Select 
                    value={technologyFilter} 
                    onValueChange={(value) => {
                      setTechnologyFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Technologies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Technologies</SelectItem>
                      {technologies.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">No projects found</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  We couldn't find any projects matching your criteria. Please try different search terms or filters.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setIndustryFilter('all');
                    setTechnologyFilter('all');
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/case-studies/${project.id}`}>
                        <Card className="overflow-hidden h-full cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg">
                          <div className="relative h-64 overflow-hidden">
                            <OptimizedImage
                              src={project.image}
                              alt={project.title}
                              className="object-cover w-full h-full transition-transform hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-6">
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
                              View Project <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-12">
                    <Button
                      variant="outline"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </Button>
                    
                    <div className="text-sm">
                      Page {currentPage} of {totalPages} 
                      <span className="ml-2 text-gray-500">
                        ({filteredProjects.length} projects)
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
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

export default ViewAllProjects;