import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, ExternalLink, Award, Radio } from 'lucide-react';

// Press release interface
interface PressRelease {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: 'Company News' | 'Product Launch' | 'Award' | 'Event';
  link?: string;
  pdf?: string;
}

// Media mention interface
interface MediaMention {
  id: string;
  title: string;
  date: string;
  publication: string;
  publicationLogo: string;
  excerpt: string;
  link: string;
}

// Award interface
interface CompanyAward {
  id: string;
  title: string;
  organization: string;
  date: string;
  image: string;
  description: string;
}

// Press contact interface
interface PressContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
}

// Sample data
const pressReleases: PressRelease[] = [
  {
    id: 'nexaweb-expands-services-ai',
    title: 'NexaWeb Digital Agency Expands Services with AI-Powered Solutions',
    date: 'March 15, 2023',
    excerpt: 'NexaWeb Digital Agency announced today the expansion of its service offerings to include AI-powered solutions for businesses looking to leverage artificial intelligence in their digital strategies.',
    content: `BOSTON, March 15, 2023 -- NexaWeb Digital Agency announced today the expansion of its service offerings to include AI-powered solutions for businesses looking to leverage artificial intelligence in their digital strategies.

The new AI services include intelligent chatbots, predictive analytics, content generation, and personalized user experiences. These solutions aim to help businesses improve customer engagement, streamline operations, and drive growth through data-driven insights.

"AI technology has reached a maturity level where it delivers tremendous value for businesses of all sizes," said Sarah Johnson, CEO of NexaWeb. "Our new AI-powered solutions allow our clients to harness the power of artificial intelligence without needing specialized in-house expertise."

NexaWeb's AI solutions are built with a focus on practical applications that deliver measurable business results. The company has already successfully implemented these solutions for select clients in e-commerce, healthcare, and financial services.

For more information about NexaWeb's AI-powered solutions, visit www.nexaweb.com/ai-solutions.`,
    category: 'Company News',
    pdf: '/press/nexaweb-ai-expansion-press-release.pdf'
  },
  {
    id: 'nexaweb-wins-webby-award',
    title: 'NexaWeb Wins Prestigious Webby Award for E-Commerce Excellence',
    date: 'January 25, 2023',
    excerpt: 'NexaWeb Digital Agency has been awarded the Webby Award for Excellence in E-Commerce Design for its work on FashionForward\'s innovative online shopping experience.',
    content: `NEW YORK, January 25, 2023 -- NexaWeb Digital Agency has been awarded the Webby Award for Excellence in E-Commerce Design for its work on FashionForward\'s innovative online shopping experience.

The award recognizes NexaWeb\'s approach to creating an immersive and intuitive shopping platform that has helped FashionForward increase conversion rates by 45% and reduce cart abandonment by 32% since its launch in Q3 2022.

"We\'re incredibly honored to receive this recognition from the Webby Awards," said Olivia Martinez, Creative Director at NexaWeb. "This project represents our commitment to pushing the boundaries of what\'s possible in e-commerce design while maintaining a laser focus on conversion optimization."

The FashionForward e-commerce platform features advanced product visualization, personalized recommendations powered by AI, and a streamlined checkout process that has set new standards in the fashion retail industry.

The Webby Awards, presented by the International Academy of Digital Arts and Sciences, is the leading international award honoring excellence on the Internet.`,
    category: 'Award',
    link: 'https://www.webbyawards.com'
  },
  {
    id: 'nexaweb-launches-experience-lab',
    title: 'NexaWeb Launches Experience Lab to Pioneer Next-Gen Digital Interactions',
    date: 'November 10, 2022',
    excerpt: 'NexaWeb Digital Agency has announced the launch of its Experience Lab, a dedicated innovation hub focused on exploring emerging technologies and their applications in creating cutting-edge digital experiences.',
    content: `SAN FRANCISCO, November 10, 2022 -- NexaWeb Digital Agency has announced the launch of its Experience Lab, a dedicated innovation hub focused on exploring emerging technologies and their applications in creating cutting-edge digital experiences.

The NexaWeb Experience Lab will serve as a testing ground for technologies including augmented reality (AR), virtual reality (VR), mixed reality, voice interfaces, and other emerging interaction models. The lab aims to bridge the gap between experimental technology and practical business applications.

"Digital experiences are evolving beyond traditional screens and interfaces," said Michael Chen, CTO of NexaWeb. "Our Experience Lab gives us a dedicated space to prototype and refine next-generation experiences that will help our clients stay ahead of the curve and engage their audiences in meaningful new ways."

Initial projects at the Experience Lab include an AR-powered retail experience, a voice-enabled content platform, and a VR training simulation for healthcare providers. These projects represent NexaWeb\'s commitment to pushing the boundaries of digital experience design while creating tangible business value.

The Experience Lab is located at NexaWeb\'s San Francisco headquarters and will collaborate with clients and technology partners on joint innovation initiatives.`,
    category: 'Product Launch',
    pdf: '/press/nexaweb-experience-lab-launch.pdf'
  },
  {
    id: 'nexaweb-digital-summit-2023',
    title: 'NexaWeb Announces Digital Transformation Summit 2023',
    date: 'October 5, 2022',
    excerpt: 'NexaWeb Digital Agency will host its inaugural Digital Transformation Summit on February 15-16, 2023, bringing together industry leaders, innovators, and experts to explore the future of digital business.',
    content: `CHICAGO, October 5, 2022 -- NexaWeb Digital Agency will host its inaugural Digital Transformation Summit on February 15-16, 2023, bringing together industry leaders, innovators, and experts to explore the future of digital business.

The two-day event will feature keynote presentations, panel discussions, workshops, and networking opportunities focused on helping businesses navigate the rapidly evolving digital landscape. Topics will include AI and automation, digital experience design, data-driven marketing strategies, and emerging technology trends.

"The pace of digital change continues to accelerate, and businesses need actionable insights to stay competitive," said James Wilson, Head of Client Services at NexaWeb. "Our Digital Transformation Summit will provide a forum for learning, collaboration, and inspiration that goes beyond typical industry events."

The summit will be held at the Chicago Innovation Center and will feature speakers from leading global brands, tech innovators, and digital strategy experts. Early bird registration is now open, with a limited number of discounted passes available.

For more information and registration details, visit www.nexawebsummit.com.`,
    category: 'Event',
    link: 'https://www.nexawebsummit.com'
  }
];

const mediaMentions: MediaMention[] = [
  {
    id: 'techcrunch-ai-leaders',
    title: 'The AI Design Leaders Shaping the Future of Digital Experiences',
    date: 'April 2, 2023',
    publication: 'TechCrunch',
    publicationLogo: 'https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png?w=32',
    excerpt: 'In a comprehensive overview of agencies pioneering AI-driven design, TechCrunch highlights NexaWeb\'s innovative approach to integrating artificial intelligence into user experiences.',
    link: 'https://techcrunch.com'
  },
  {
    id: 'forbes-digital-agencies',
    title: 'The Top Digital Agencies Transforming Business in 2023',
    date: 'February 18, 2023',
    publication: 'Forbes',
    publicationLogo: 'https://i.forbesimg.com/media/assets/forbes_1200x1200.jpg',
    excerpt: 'Forbes names NexaWeb among the top digital agencies driving business transformation through innovative design and technology solutions.',
    link: 'https://forbes.com'
  },
  {
    id: 'fast-company-innovation',
    title: 'Innovation by Design: The Companies Reimagining Digital Experiences',
    date: 'January 10, 2023',
    publication: 'Fast Company',
    publicationLogo: 'https://www.fastcompany.com/apple-touch-icon.png?v=5',
    excerpt: 'Fast Company features NexaWeb in its annual Innovation by Design issue, highlighting the agency\'s work on creating inclusive and accessible digital experiences.',
    link: 'https://fastcompany.com'
  },
  {
    id: 'wired-future-ecommerce',
    title: 'The Future of E-Commerce Is Here: How NexaWeb Is Redefining Online Shopping',
    date: 'December 5, 2022',
    publication: 'Wired',
    publicationLogo: 'https://www.wired.com/apple-touch-icon.png',
    excerpt: 'Wired explores how NexaWeb\'s innovative approach to e-commerce design is setting new standards for online retail experiences.',
    link: 'https://wired.com'
  }
];

const awards: CompanyAward[] = [
  {
    id: 'webby-ecommerce',
    title: 'Webby Award for Excellence in E-Commerce Design',
    organization: 'International Academy of Digital Arts and Sciences',
    date: 'January 2023',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/The_Webby_Awards_Logo.svg',
    description: 'Recognized for groundbreaking e-commerce user experience design on the FashionForward platform.'
  },
  {
    id: 'awwwards-sotd',
    title: 'Site of the Day',
    organization: 'Awwwards',
    date: 'November 2022',
    image: 'https://assets.awwwards.com/awards/favicon-56f93eab10.svg',
    description: 'Honored for excellence in web design and development for the NexaHealth patient portal.'
  },
  {
    id: 'css-design-awards',
    title: 'Best UI Design',
    organization: 'CSS Design Awards',
    date: 'September 2022',
    image: 'https://www.cssdesignawards.com/images/cssda-logo-v2.svg',
    description: 'Awarded for outstanding user interface design for the EcoTrack sustainability platform.'
  }
];

const pressContacts: PressContact[] = [
  {
    name: 'Rebecca Kim',
    title: 'Director of Communications',
    email: 'rebecca.kim@nexaweb.com',
    phone: '(555) 234-5678',
    photo: 'https://i.pravatar.cc/150?img=5'
  }
];

// Interactive Three.js Component for Press Page
const InteractivePressBackground = () => {
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
    
    // Create press/media themed visual elements
    // Newspaper/magazine 3D elements floating around
    
    // Create floating "newspaper" rectangles
    const paperCount = 15;
    const papers: THREE.Mesh[] = [];
    
    for (let i = 0; i < paperCount; i++) {
      // Create a newspaper-like rectangle
      const width = 4 + Math.random() * 2;
      const height = 5 + Math.random() * 2;
      const geometry = new THREE.PlaneGeometry(width, height);
      
      // Create a gradient material to simulate text on paper
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = 256;
        canvas.height = 256;
        
        // Create a paper-like background
        context.fillStyle = '#f8f8f8';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add simulated text lines
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        
        const lineCount = 20;
        const lineHeight = canvas.height / lineCount;
        
        for (let j = 0; j < lineCount; j++) {
          const lineWidth = Math.random() * 0.8 + 0.2; // Random line length
          context.fillRect(
            10, 
            j * lineHeight + lineHeight / 3, 
            canvas.width * lineWidth - 20, 
            lineHeight / 3
          );
        }
        
        // Add a "headline"
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(10, 10, canvas.width - 20, lineHeight);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      
      const paper = new THREE.Mesh(geometry, material);
      
      // Random position
      paper.position.x = (Math.random() - 0.5) * 40;
      paper.position.y = (Math.random() - 0.5) * 30;
      paper.position.z = (Math.random() - 0.5) * 30;
      
      // Random rotation
      paper.rotation.x = Math.random() * Math.PI;
      paper.rotation.y = Math.random() * Math.PI;
      paper.rotation.z = Math.random() * Math.PI;
      
      scene.add(paper);
      papers.push(paper);
    }
    
    // Create microphone models for "press" theme
    const microphoneCount = 5;
    
    for (let i = 0; i < microphoneCount; i++) {
      // Create microphone head
      const headGeometry = new THREE.SphereGeometry(0.8, 12, 12);
      const headMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x888888,
        transparent: true,
        opacity: 0.5
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      
      // Create microphone handle
      const handleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 8);
      const handleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x555555,
        transparent: true,
        opacity: 0.5
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.y = -2;
      
      // Group the microphone parts
      const microphone = new THREE.Group();
      microphone.add(head);
      microphone.add(handle);
      
      // Position the microphone
      microphone.position.x = (Math.random() - 0.5) * 30;
      microphone.position.y = (Math.random() - 0.5) * 30;
      microphone.position.z = (Math.random() - 0.5) * 30;
      
      // Random rotation
      microphone.rotation.x = Math.random() * Math.PI;
      microphone.rotation.y = Math.random() * Math.PI;
      microphone.rotation.z = Math.random() * Math.PI;
      
      // Add to scene
      scene.add(microphone);
    }
    
    // Create "award" trophy models
    const trophyCount = 3;
    
    for (let i = 0; i < trophyCount; i++) {
      // Create trophy cup
      const cupGeometry = new THREE.CylinderGeometry(1, 0.7, 2, 16);
      const cupMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffd700, // Gold color
        transparent: true,
        opacity: 0.4
      });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      
      // Create trophy base
      const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.5, 16);
      const baseMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x555555,
        transparent: true,
        opacity: 0.4
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -1.25;
      
      // Group the trophy parts
      const trophy = new THREE.Group();
      trophy.add(cup);
      trophy.add(base);
      
      // Position the trophy
      trophy.position.x = (Math.random() - 0.5) * 30;
      trophy.position.y = (Math.random() - 0.5) * 30;
      trophy.position.z = (Math.random() - 0.5) * 30;
      
      trophy.scale.set(1.5, 1.5, 1.5);
      
      // Add to scene
      scene.add(trophy);
    }
    
    // Animation logic for floating papers and objects
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate floating papers
      papers.forEach((paper, index) => {
        // Gentle floating motion
        paper.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        paper.position.x += Math.cos(Date.now() * 0.001 + index * 0.5) * 0.005;
        
        // Gentle rotation
        paper.rotation.x += 0.0005;
        paper.rotation.y += 0.0005;
      });
      
      // Slow overall scene rotation for dynamic effect
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

const PressPage = () => {
  return (
    <>
      <Helmet>
        <title>Press | NexaWeb Digital Agency</title>
        <meta name="description" content="Find the latest press releases, media coverage, and company news about NexaWeb Digital Agency. Access media resources and contact our press team." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Three.js interactive background */}
        <InteractivePressBackground />
        
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
                Press & Media
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The latest news and updates from NexaWeb Digital Agency
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Press and media content */}
        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="press-releases">
              <TabsList className="w-full flex justify-center mb-10">
                <TabsTrigger value="press-releases" className="px-6">Press Releases</TabsTrigger>
                <TabsTrigger value="media-mentions" className="px-6">Media Coverage</TabsTrigger>
                <TabsTrigger value="awards" className="px-6">Awards</TabsTrigger>
                <TabsTrigger value="resources" className="px-6">Media Resources</TabsTrigger>
              </TabsList>
              
              {/* Press Releases Tab */}
              <TabsContent value="press-releases">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pressReleases.map((release, index) => (
                      <motion.div 
                        key={release.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full flex flex-col">
                          <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline">{release.category}</Badge>
                              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {release.date}
                              </div>
                            </div>
                            <CardTitle className="text-xl">{release.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                              {release.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center"
                                onClick={() => window.open(release.link || '#', '_blank')}
                                disabled={!release.link}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Read More
                              </Button>
                              {release.pdf && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Media Mentions Tab */}
              <TabsContent value="media-mentions">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mediaMentions.map((mention, index) => (
                      <motion.div 
                        key={mention.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full flex flex-col">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <img 
                                  src={mention.publicationLogo} 
                                  alt={mention.publication} 
                                  className="h-6 w-6 mr-2"
                                />
                                <span className="font-bold text-sm">{mention.publication}</span>
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {mention.date}
                              </div>
                            </div>
                            <CardTitle className="text-xl">{mention.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                              {mention.excerpt}
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center"
                              onClick={() => window.open(mention.link, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Read Full Article
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Awards Tab */}
              <TabsContent value="awards">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 gap-6">
                    {awards.map((award, index) => (
                      <motion.div 
                        key={award.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                                <img 
                                  src={award.image} 
                                  alt={award.organization} 
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                              <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 justify-center md:justify-start">
                                  <span className="text-gray-600 dark:text-gray-300">{award.organization}</span>
                                  <span className="hidden md:block text-gray-400">•</span>
                                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {award.date}
                                  </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{award.description}</p>
                              </div>
                              <div className="flex items-center justify-center md:items-start">
                                <Award className="h-8 w-8 text-yellow-500" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Media Resources Tab */}
              <TabsContent value="resources">
                <div className="max-w-4xl mx-auto">
                  {/* Media Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mb-10">
                      <CardHeader>
                        <CardTitle className="text-2xl">Media Contacts</CardTitle>
                        <CardDescription>
                          For press inquiries, please contact our communications team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {pressContacts.map((contact) => (
                          <div key={contact.name} className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                              <img 
                                src={contact.photo} 
                                alt={contact.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                              <h3 className="text-xl font-bold">{contact.name}</h3>
                              <p className="text-primary mb-4">{contact.title}</p>
                              <div className="space-y-2">
                                <p className="flex items-center justify-center md:justify-start">
                                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <a href={`mailto:${contact.email}`} className="hover:text-primary">
                                    {contact.email}
                                  </a>
                                </p>
                                <p className="flex items-center justify-center md:justify-start">
                                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="hover:text-primary">
                                    {contact.phone}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* Brand Assets Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="mb-10">
                      <CardHeader>
                        <CardTitle className="text-2xl">Brand Assets</CardTitle>
                        <CardDescription>
                          Download official NexaWeb logos, brand guidelines, and other assets for media use
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                            <div className="h-32 flex items-center justify-center mb-4">
                              <svg className="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" fill="currentColor" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Logo Package</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Logo files in various formats including PNG, SVG, and EPS with both light and dark variants.
                            </p>
                            <Button className="bg-primary hover:bg-primary/90 w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download Logos
                            </Button>
                          </div>
                          
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                            <div className="h-32 flex items-center justify-center mb-4">
                              <svg className="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Brand Guidelines</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Comprehensive brand guidelines including logo usage, color palette, typography, and imagery standards.
                            </p>
                            <Button className="bg-primary hover:bg-primary/90 w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download Guidelines
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* Media Kit Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Media Kit</CardTitle>
                        <CardDescription>
                          Download our complete media kit with company information, executive bios, and project showcases
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                          <div className="h-32 flex items-center justify-center mb-4">
                            <Radio className="h-16 w-16 text-primary" />
                          </div>
                          <h3 className="text-lg font-bold mb-2">Complete Media Kit</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Our comprehensive media kit includes company background, executive team profiles, case studies, 
                            high-resolution images, and brand assets in a single downloadable package.
                          </p>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Download className="h-4 w-4 mr-2" />
                            Download Media Kit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Interview request section */}
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
                Interview Requests
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our leadership team is available for expert commentary on digital design, 
                technology trends, and business transformation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request an Interview
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PressPage;