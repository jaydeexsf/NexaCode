import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Briefcase, Code, Globe, Headphones, Lightbulb, Map, Users, Zap } from 'lucide-react';

// Career opening interface
interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  level: 'Junior' | 'Mid-level' | 'Senior' | 'Lead';
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  featured?: boolean;
}

const jobOpenings: JobOpening[] = [
  {
    id: 'jr-software-engineer',
    title: 'Junior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Remote Option)',
    type: 'Full-time',
    level: 'Junior',
    salary: '$70,000 - $90,000',
    description: 'We are looking for a talented Junior Software Engineer to join our growing engineering team. You will work closely with senior engineers to develop and maintain high-quality web applications.',
    responsibilities: [
      'Develop and maintain front-end and back-end applications using modern frameworks',
      'Write clean, maintainable, and efficient code',
      'Collaborate with cross-functional teams to define, design, and ship new features',
      'Identify and fix bugs and performance bottlenecks',
      'Participate in code reviews and contribute to team knowledge sharing'
    ],
    requirements: [
      '0-2 years of experience in software development',
      'Proficiency in HTML, CSS, and JavaScript',
      'Experience with React, Vue, or Angular',
      'Basic understanding of server-side technologies (Node.js, Python, etc.)',
      'Excellent problem-solving skills and attention to detail',
      'Good communication skills and ability to work in a team'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible work arrangements',
      'Health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Professional development budget',
      'Home office stipend'
    ],
    featured: true
  },
  {
    id: 'sr-software-engineer',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Remote Option)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$120,000 - $160,000',
    description: 'We are seeking an experienced Senior Software Engineer to lead development initiatives, mentor junior developers, and architect robust solutions for our clients.',
    responsibilities: [
      'Design and implement complex features and services',
      'Lead technical architecture discussions and make critical design decisions',
      'Mentor junior developers and perform code reviews',
      'Collaborate with product and design teams to build intuitive user experiences',
      'Optimize applications for performance and scalability',
      'Evaluate and introduce new technologies to improve development efficiency'
    ],
    requirements: [
      '5+ years of experience in software development',
      'Expert knowledge of JavaScript/TypeScript and modern front-end frameworks',
      'Strong experience with server-side development and API design',
      'Understanding of cloud infrastructure and deployment pipelines',
      'Experience with performance optimization and debugging',
      'Excellent communication skills and ability to lead technical discussions'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible work arrangements',
      'Health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Professional development budget',
      'Home office stipend',
      'Leadership development opportunities'
    ],
    featured: true
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'San Francisco, CA (Remote Option)',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$90,000 - $120,000',
    description: 'We are looking for a creative UI/UX Designer to create amazing user experiences for our clients. You should have a passion for designing intuitive and engaging digital products.',
    responsibilities: [
      'Create user flows, wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Maintain and evolve our design system',
      'Stay up-to-date with the latest UI/UX trends and best practices'
    ],
    requirements: [
      '3+ years of experience in UI/UX design',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD',
      'Strong portfolio showcasing web and mobile design work',
      'Understanding of user-centered design principles',
      'Experience with design systems and component libraries',
      'Knowledge of HTML and CSS is a plus'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible work arrangements',
      'Health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Professional development budget',
      'Home office stipend'
    ]
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'San Francisco, CA (Remote Option)',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$80,000 - $110,000',
    description: 'We are seeking a skilled Digital Marketing Specialist to develop and implement marketing strategies for our agency and our clients.',
    responsibilities: [
      'Plan and execute digital marketing campaigns across various channels',
      'Analyze campaign performance and provide insights to improve results',
      'Manage social media accounts and create engaging content',
      'Optimize websites for search engines (SEO)',
      'Collaborate with the design team on marketing materials'
    ],
    requirements: [
      '3+ years of experience in digital marketing',
      'Experience with SEO, SEM, email marketing, and social media',
      'Knowledge of marketing analytics tools (Google Analytics, etc.)',
      'Understanding of conversion rate optimization',
      'Strong analytical and communication skills',
      'Experience with marketing automation platforms is a plus'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible work arrangements',
      'Health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Professional development budget',
      'Home office stipend'
    ]
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    department: 'Operations',
    location: 'San Francisco, CA (Remote Option)',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$90,000 - $120,000',
    description: 'We are looking for a detail-oriented Project Manager to oversee client projects from initiation to completion, ensuring they are delivered on time and within budget.',
    responsibilities: [
      'Lead project planning, execution, and delivery',
      'Manage project scope, timeline, and budget',
      'Coordinate cross-functional team activities',
      'Communicate project status to stakeholders',
      'Identify and mitigate project risks',
      'Implement and maintain project management best practices'
    ],
    requirements: [
      '3+ years of experience in project management, preferably in a digital agency',
      'Experience with project management methodologies (Agile, Scrum, etc.)',
      'Strong organization and time management skills',
      'Excellent communication and leadership abilities',
      'Problem-solving attitude and ability to work under pressure',
      'PMP or Scrum certification is a plus'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible work arrangements',
      'Health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Professional development budget',
      'Home office stipend'
    ]
  },
];

// Interactive Three.js Component for Careers Page
const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup - using PerspectiveCamera for a 3D view
    const camera = new THREE.PerspectiveCamera(
      70, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;
    
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
    
    // Career-themed particles: create a field of connected dots representing a network of opportunities
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number, y: number, z: number }[] = [];
    
    // Set initial positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create a line material for connections
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.5
    });
    
    // Create particles
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.2,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Create connection lines
    let lineGeometry: THREE.BufferGeometry;
    let connections: THREE.Line;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update particle positions
      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;
        
        // Bounce off walls
        if (Math.abs(positions[i3]) > 15) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 15) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 15) velocities[i].z *= -1;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Create connections between nearby particles
      const linePositions: number[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const p1 = {
          x: positions[i3],
          y: positions[i3 + 1],
          z: positions[i3 + 2]
        };
        
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const p2 = {
            x: positions[j3],
            y: positions[j3 + 1],
            z: positions[j3 + 2]
          };
          
          // Calculate distance between particles
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // If particles are close enough, draw a line between them
          if (distance < 5) {
            linePositions.push(p1.x, p1.y, p1.z);
            linePositions.push(p2.x, p2.y, p2.z);
          }
        }
      }
      
      // Remove old connections and add new ones
      if (connections) scene.remove(connections);
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      connections = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(connections);
      
      // Rotate the entire scene for a dynamic effect
      particles.rotation.y += 0.001;
      if (connections) connections.rotation.y += 0.001;
      
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

const CareersPage = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  
  // Function to open job details
  const openJobDetails = (job: JobOpening) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Filtered job openings based on department
  const filteredJobs = filter === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department.toLowerCase() === filter);
  
  return (
    <>
      <Helmet>
        <title>Careers | NexaWeb Digital Agency</title>
        <meta name="description" content="Join our team of talented professionals and build the future of digital experiences. Explore current job openings at NexaWeb." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Three.js interactive background */}
        <InteractiveBackground />
        
        {/* Hero section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Team
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Build the digital future with a team of passionate innovators
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    const jobsSection = document.getElementById('open-positions');
                    if (jobsSection) {
                      jobsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Company culture section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                At NexaWeb, we believe in fostering a culture of innovation, collaboration, and continuous learning. 
                Our team members are empowered to bring their authentic selves to work every day and contribute their unique perspectives.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We encourage creative thinking and embrace new technologies to solve complex problems for our clients.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We work together across teams to share knowledge, skills, and perspectives, creating better outcomes for our clients.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Growth</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We invest in our team's professional development and create pathways for career advancement within the company.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Benefits section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We offer a comprehensive benefits package designed to support your health, wellbeing, 
                and long-term success, along with an engaging work environment.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-bold text-lg mb-3">Health & Wellness</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Comprehensive health insurance</li>
                  <li>Dental and vision coverage</li>
                  <li>Mental health support</li>
                  <li>Wellness program</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-bold text-lg mb-3">Work-Life Balance</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Unlimited PTO policy</li>
                  <li>Remote work options</li>
                  <li>Flexible hours</li>
                  <li>Paid parental leave</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-bold text-lg mb-3">Professional Growth</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Learning & development budget</li>
                  <li>Conference attendance</li>
                  <li>Mentorship program</li>
                  <li>Career advancement paths</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-bold text-lg mb-3">Financial Benefits</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Competitive salary</li>
                  <li>Equity options</li>
                  <li>401(k) with company match</li>
                  <li>Referral bonuses</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Job openings section */}
        <section id="open-positions" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Open Positions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Find your dream role and join our growing team of passionate professionals.
              </p>
            </motion.div>
            
            {/* Department Tabs */}
            <div className="mb-12">
              <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList>
                    <TabsTrigger value="all">All Departments</TabsTrigger>
                    <TabsTrigger value="engineering">Engineering</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="operations">Operations</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  {selectedJob ? (
                    <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
                  ) : (
                    <JobList jobs={filteredJobs} onSelectJob={openJobDetails} />
                  )}
                </TabsContent>
                
                <TabsContent value="engineering" className="mt-0">
                  {selectedJob ? (
                    <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
                  ) : (
                    <JobList jobs={filteredJobs} onSelectJob={openJobDetails} />
                  )}
                </TabsContent>
                
                <TabsContent value="design" className="mt-0">
                  {selectedJob ? (
                    <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
                  ) : (
                    <JobList jobs={filteredJobs} onSelectJob={openJobDetails} />
                  )}
                </TabsContent>
                
                <TabsContent value="marketing" className="mt-0">
                  {selectedJob ? (
                    <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
                  ) : (
                    <JobList jobs={filteredJobs} onSelectJob={openJobDetails} />
                  )}
                </TabsContent>
                
                <TabsContent value="operations" className="mt-0">
                  {selectedJob ? (
                    <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
                  ) : (
                    <JobList jobs={filteredJobs} onSelectJob={openJobDetails} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Contact section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Don't See the Perfect Fit?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We're always on the lookout for exceptional talent. Send us your resume and tell us how you can contribute to our team.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Submit General Application
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Job List Component
interface JobListProps {
  jobs: JobOpening[];
  onSelectJob: (job: JobOpening) => void;
}

const JobList = ({ jobs, onSelectJob }: JobListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No positions currently available in this department.</p>
        </div>
      ) : (
        jobs.map((job) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <Card className={job.featured ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  {job.featured && (
                    <Badge className="bg-primary">Featured</Badge>
                  )}
                </div>
                <CardDescription className="flex flex-wrap gap-2 mt-2">
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" /> {job.department}
                  </span>
                  <span className="flex items-center">
                    <Map className="h-4 w-4 mr-1" /> {job.location}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  <Badge variant="outline">{job.level}</Badge>
                  <Badge variant="outline">{job.salary}</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => onSelectJob(job)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
};

// Job Details Component
interface JobDetailsProps {
  job: JobOpening;
  onBack: () => void;
}

const JobDetails = ({ job, onBack }: JobDetailsProps) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 md:p-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← Back to All Positions
        </Button>
        
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="flex items-center text-gray-600 dark:text-gray-300">
              <Briefcase className="h-4 w-4 mr-2" /> {job.department}
            </span>
            <span className="flex items-center text-gray-600 dark:text-gray-300">
              <Map className="h-4 w-4 mr-2" /> {job.location}
            </span>
            <span className="flex items-center text-gray-600 dark:text-gray-300">
              <Code className="h-4 w-4 mr-2" /> {job.level}
            </span>
            <span className="flex items-center text-gray-600 dark:text-gray-300">
              <Globe className="h-4 w-4 mr-2" /> {job.type}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-xl font-semibold">{job.salary}</span>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-lg mb-6">{job.description}</p>
          
          <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
          <ul className="space-y-2 mb-6">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold mb-4">Requirements</h3>
          <ul className="space-y-2 mb-6">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold mb-4">Benefits</h3>
          <ul className="space-y-2 mb-8">
            {job.benefits.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto">
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CareersPage;