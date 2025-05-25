import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Briefcase, 
  Clock, 
  Globe, 
  Heart, 
  Lightbulb, 
  Share2, 
  Target, 
  Zap
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

// Company value interface
interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Milestone interface
interface Milestone {
  year: string;
  title: string;
  description: string;
}

// Team member interface
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Company values data
const companyValues: CompanyValue[] = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Innovation',
    description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions for our clients.'
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Excellence',
    description: 'We are committed to delivering exceptional quality in everything we do, exceeding client expectations.'
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: 'Collaboration',
    description: 'We believe the best results come from working closely with our clients and team members.'
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Passion',
    description: 'We are driven by our love for digital craftsmanship and the impact of our work on users.'
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Inclusivity',
    description: 'We embrace diversity and create accessible digital experiences for all users.'
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Agility',
    description: 'We adapt quickly to change, continuously evolving our skills and methodologies.'
  }
];

// Company milestones
const milestones: Milestone[] = [
  {
    year: '2016',
    title: 'The Beginning',
    description: 'NexaWeb was founded with the vision of creating exceptional digital experiences that drive business growth.'
  },
  {
    year: '2017',
    title: 'First Major Client',
    description: 'Secured our first enterprise client and expanded our team to meet growing demand.'
  },
  {
    year: '2019',
    title: 'International Expansion',
    description: 'Opened our first international office and began serving clients across three continents.'
  },
  {
    year: '2020',
    title: 'Embracing Remote Work',
    description: 'Successfully transitioned to a remote-first model while maintaining our collaborative culture.'
  },
  {
    year: '2021',
    title: 'Award-Winning Work',
    description: 'Received industry recognition for our innovative designs and development practices.'
  },
  {
    year: '2023',
    title: 'Accelerated Growth',
    description: 'Expanded our service offerings and doubled our team size to serve more diverse client needs.'
  }
];

// Leadership team
const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'Sarah founded NexaWeb with a vision to transform how businesses connect with their customers online. With 15+ years of experience in digital strategy, she leads the company\'s vision and growth initiatives.',
    image: 'https://i.pravatar.cc/300?img=1',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    bio: 'Michael oversees all technical aspects of NexaWeb\'s projects, ensuring we utilize the most effective technologies. His background in software architecture and AI brings innovative solutions to our clients.',
    image: 'https://i.pravatar.cc/300?img=3',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Olivia Martinez',
    role: 'Creative Director',
    bio: 'Olivia leads our design team, translating client visions into stunning visual experiences. Her award-winning design approach combines aesthetics with functionality to create memorable brand interactions.',
    image: 'https://i.pravatar.cc/300?img=5',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'James Wilson',
    role: 'Head of Client Services',
    bio: 'James ensures our clients receive exceptional service from first contact to project completion. His client-centric approach has helped build our reputation for outstanding customer satisfaction.',
    image: 'https://i.pravatar.cc/300?img=4',
    socialLinks: {
      linkedin: 'https://linkedin.com'
    }
  }
];

// Company stats
const companyStats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '50+', label: 'Team Members' },
  { value: '12', label: 'Industry Awards' },
  { value: '97%', label: 'Client Satisfaction' }
];

// Interactive Three.js Component for the About Page
const InteractiveAboutBackground = () => {
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
    camera.position.z = 30;
    
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
    
    // Create a visual representation of the company timeline/journey
    const journeyPathPoints = [];
    const curveResolution = 100;
    const radius = 15;
    
    // Create a curved path representing the company's journey
    for (let i = 0; i <= curveResolution; i++) {
      const angle = (i / curveResolution) * Math.PI * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 2;
      journeyPathPoints.push(new THREE.Vector3(x, y, z));
    }
    
    // Create a smooth curve through these points
    const journeyCurve = new THREE.CatmullRomCurve3(journeyPathPoints);
    journeyCurve.closed = true;
    
    // Create a tube geometry along the curve
    const tubeGeometry = new THREE.TubeGeometry(journeyCurve, 100, 0.3, 8, true);
    const tubeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4a86e8,
      transparent: true,
      opacity: 0.5
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    
    // Add milestone markers along the path
    const milestoneCount = milestones.length;
    const milestoneGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const milestoneMaterial = new THREE.MeshBasicMaterial({ color: 0x4a86e8 });
    
    const milestonePoints = [];
    for (let i = 0; i < milestoneCount; i++) {
      const t = i / milestoneCount;
      const point = journeyCurve.getPointAt(t);
      milestonePoints.push(point);
      
      const milestone = new THREE.Mesh(milestoneGeometry, milestoneMaterial);
      milestone.position.copy(point);
      scene.add(milestone);
    }
    
    // Add floating value icons representing company values
    const valueGeometries = [
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.TetrahedronGeometry(1.5),
      new THREE.DodecahedronGeometry(1.5),
      new THREE.IcosahedronGeometry(1.5),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TorusGeometry(1, 0.4, 16, 32)
    ];
    
    const valueMaterials = valueGeometries.map((_, i) => 
      new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(i / valueGeometries.length, 0.7, 0.5),
        transparent: true,
        opacity: 0.8,
        wireframe: true
      })
    );
    
    const values = valueGeometries.map((geometry, i) => {
      const mesh = new THREE.Mesh(geometry, valueMaterials[i]);
      // Position values in a circle above the journey path
      const angle = (i / valueGeometries.length) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * (radius + 8);
      mesh.position.y = Math.sin(angle) * (radius + 8);
      mesh.position.z = 5;
      scene.add(mesh);
      return mesh;
    });
    
    // Add particles to create a dynamic, energetic atmosphere
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 60;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 60;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Animation loop
    let journeyProgress = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the journey tube slowly
      tube.rotation.z += 0.001;
      
      // Rotate each value shape on its own axis
      values.forEach((value, i) => {
        value.rotation.x += 0.01 * (i % 3 + 1);
        value.rotation.y += 0.01 * ((i + 1) % 3 + 1);
      });
      
      // Animate particles slightly
      particles.rotation.y += 0.0005;
      
      // Create a moving light effect along the journey path
      journeyProgress = (journeyProgress + 0.001) % 1;
      const pathPoint = journeyCurve.getPointAt(journeyProgress);
      
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

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | NexaWeb Digital Agency</title>
        <meta name="description" content="Learn about NexaWeb\'s journey, our values, our team, and our mission to create exceptional digital experiences that drive business growth." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Three.js interactive background */}
        <InteractiveAboutBackground />
        
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
                About NexaWeb
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Building the digital future, one pixel at a time
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Our story section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Founded in 2016, NexaWeb began as a small team of passionate digital enthusiasts with a shared vision: 
                    to create exceptional digital experiences that transform how businesses connect with their audiences.
                  </p>
                  <p>
                    What started as a boutique web design studio has evolved into a full-service digital agency, 
                    offering comprehensive solutions from UX/UI design and development to digital marketing and AI integration.
                  </p>
                  <p>
                    Over the years, our team has grown to include specialists from diverse backgrounds, bringing together 
                    unique perspectives and expertise to solve complex digital challenges for clients across industries.
                  </p>
                  <p>
                    Today, NexaWeb proudly serves clients globally, maintaining our founding principles of innovation, 
                    quality craftsmanship, and client partnership.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {companyStats.map((stat, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-4">
                      <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                      <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our values section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                These core principles guide everything we do, from how we work with clients to how we build our team.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our journey section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Key milestones that have shaped our company's evolution
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {/* Content */}
                      <div className="w-5/12">
                        <div className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                        </div>
                      </div>
                      
                      {/* Center dot */}
                      <div className="w-2/12 flex justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full z-10 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Empty space for alternating layout */}
                      <div className="w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Leadership team section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Leadership Team</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Meet the people driving our vision and success
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                    {member.socialLinks && (
                      <div className="flex space-x-4">
                        {member.socialLinks.twitter && (
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Join Us on Our Journey
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to build something amazing together? Let's start a conversation.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get in Touch
                </Button>
                <Button size="lg" variant="outline">
                  Explore Careers
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;