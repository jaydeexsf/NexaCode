import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

// Interactive Three.js Component for Privacy Policy Page
const InteractivePrivacyBackground = () => {
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
    
    // Create privacy-themed visual elements
    
    // Create a shield to represent protection of data
    const shieldGeometry = new THREE.CircleGeometry(5, 32);
    const shieldMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4a86e8,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    scene.add(shield);
    
    // Add a lock icon in the center of the shield
    const lockBodyGeometry = new THREE.BoxGeometry(2, 2, 1);
    const lockShackleGeometry = new THREE.TorusGeometry(1, 0.3, 16, 32, Math.PI);
    const lockMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4a86e8,
      transparent: true,
      opacity: 0.1
    });
    
    const lockBody = new THREE.Mesh(lockBodyGeometry, lockMaterial);
    lockBody.position.z = 0.5;
    shield.add(lockBody);
    
    const lockShackle = new THREE.Mesh(lockShackleGeometry, lockMaterial);
    lockShackle.position.y = 1.5;
    lockShackle.rotation.x = Math.PI / 2;
    shield.add(lockShackle);
    
    // Create floating data particles around the shield
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particleVertices = [];
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 7 + Math.random() * 8;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      particleVertices.push(x, y, z);
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4a86e8,
      size: 0.2,
      transparent: true,
      opacity: 0.3
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Create a data flow visual - lines connecting random particles to the shield
    const connectionCount = 30;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4a86e8,
      transparent: true,
      opacity: 0.1
    });
    
    const connections: THREE.Line[] = [];
    
    for (let i = 0; i < connectionCount; i++) {
      // Randomly select a particle to connect
      const particleIndex = Math.floor(Math.random() * particleCount);
      const startX = particleVertices[particleIndex * 3];
      const startY = particleVertices[particleIndex * 3 + 1];
      const startZ = particleVertices[particleIndex * 3 + 2];
      
      // Create a line from the particle to the shield
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(0, 0, 0)  // Shield center
      ]);
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      connections.push(line);
    }
    
    // Animation properties
    let shieldPulseDirection = 1;
    let shieldScale = 1;
    const shieldMinScale = 0.95;
    const shieldMaxScale = 1.05;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the shield slowly
      shield.rotation.z += 0.001;
      
      // Make the shield pulse like a heartbeat
      shieldScale += 0.001 * shieldPulseDirection;
      if (shieldScale >= shieldMaxScale) {
        shieldPulseDirection = -1;
      } else if (shieldScale <= shieldMinScale) {
        shieldPulseDirection = 1;
      }
      shield.scale.set(shieldScale, shieldScale, shieldScale);
      
      // Rotate the particles around the shield
      particles.rotation.y += 0.001;
      
      // Animate connections - make them fade in and out
      connections.forEach((connection, i) => {
        const opacity = Math.abs(Math.sin(Date.now() * 0.001 + i * 0.1)) * 0.2;
        (connection.material as THREE.LineBasicMaterial).opacity = opacity;
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

const PrivacyPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>Privacy Policy | NexaWeb Digital Agency</title>
        <meta name="description" content="Learn about how NexaWeb Digital Agency collects, uses, and protects your personal information in compliance with data protection laws." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Three.js interactive background */}
        <InteractivePrivacyBackground />
        
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
                Privacy Policy
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-4 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Last Updated: {currentDate}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Privacy Policy content */}
        <section className="py-10 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-10">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  At NexaWeb Digital Agency, we respect your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                  website or use our services.
                </p>
                
                <Accordion type="single" collapsible className="w-full my-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-bold py-4">1. Information We Collect</AccordionTrigger>
                    <AccordionContent>
                      <p className="font-semibold">Personal Data</p>
                      <p>We may collect personal identification information from you, including but not limited to:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Name, email address, phone number, and company name</li>
                        <li>Billing information, including address and payment details</li>
                        <li>Information you provide when filling out forms on our website</li>
                        <li>Records and copies of your correspondence with us</li>
                        <li>Details of transactions you carry out through our website</li>
                      </ul>
                      
                      <p className="font-semibold mt-4">Usage Data</p>
                      <p>We may also collect information on how you access and use our website, including:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Your IP address, browser type, operating system</li>
                        <li>Pages you visit on our website and time spent on those pages</li>
                        <li>Referral sources and exit pages</li>
                        <li>Date and time of your visit</li>
                        <li>Other diagnostic data</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-bold py-4">2. How We Collect Information</AccordionTrigger>
                    <AccordionContent>
                      <p>We collect information through various methods, including:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Direct interactions when you provide information by filling in forms, communicating with us, or otherwise providing your information</li>
                        <li>Automated technologies such as cookies, server logs, and other tracking technologies</li>
                        <li>Third parties, including business partners, analytics providers, and service providers</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-bold py-4">3. How We Use Your Information</AccordionTrigger>
                    <AccordionContent>
                      <p>We may use the information we collect for various purposes, including to:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Provide, operate, and maintain our website and services</li>
                        <li>Improve, personalize, and expand our website and services</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you, including for customer service, updates, and marketing purposes</li>
                        <li>Process transactions and send related information</li>
                        <li>Protect against fraud and unauthorized access</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl font-bold py-4">4. Disclosure of Your Information</AccordionTrigger>
                    <AccordionContent>
                      <p>We may share your personal information with:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Service providers who perform functions on our behalf</li>
                        <li>Business partners with whom we jointly offer products or services</li>
                        <li>Affiliates and subsidiaries</li>
                        <li>Third parties in connection with a business transaction such as a merger or acquisition</li>
                        <li>Law enforcement or other governmental authorities when required by law</li>
                      </ul>
                      <p className="mt-4">
                        We do not sell, rent, or trade your personal information with third parties for their marketing purposes.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl font-bold py-4">5. Cookies and Tracking Technologies</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We use cookies and similar tracking technologies to collect information about your browsing activities. 
                        Cookies are small data files stored on your device that help us improve our website and deliver a better 
                        user experience.
                      </p>
                      <p className="mt-4">We use the following types of cookies:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li><strong>Essential Cookies:</strong> Required for the operation of our website</li>
                        <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count visitors and see how they move around our website</li>
                        <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website</li>
                        <li><strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed</li>
                      </ul>
                      <p className="mt-4">
                        You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access 
                        cookies. If you disable or refuse cookies, please note that some parts of our website may become inaccessible 
                        or not function properly.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-xl font-bold py-4">6. Data Security</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We have implemented appropriate technical and organizational measures to secure your personal information 
                        from accidental loss and unauthorized access, use, alteration, and disclosure.
                      </p>
                      <p className="mt-4">
                        Unfortunately, the transmission of information via the internet is not completely secure. Although we do 
                        our best to protect your personal information, we cannot guarantee the security of your personal information 
                        transmitted to our website. Any transmission of personal information is at your own risk.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-xl font-bold py-4">7. Data Retention</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We will retain your personal information only for as long as necessary to fulfill the purposes for which 
                        we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                      </p>
                      <p className="mt-4">
                        To determine the appropriate retention period for personal information, we consider the amount, nature, 
                        and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure 
                        of your personal information, the purposes for which we process your personal information, and whether we 
                        can achieve those purposes through other means, and the applicable legal requirements.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-xl font-bold py-4">8. Your Rights</AccordionTrigger>
                    <AccordionContent>
                      <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>The right to access and receive a copy of your personal information</li>
                        <li>The right to rectify or update your personal information</li>
                        <li>The right to erase your personal information in certain circumstances</li>
                        <li>The right to restrict processing of your personal information</li>
                        <li>The right to object to processing of your personal information</li>
                        <li>The right to data portability</li>
                        <li>The right to withdraw consent at any time where we rely on consent to process your personal information</li>
                      </ul>
                      <p className="mt-4">
                        If you wish to exercise any of these rights, please contact us using the information provided in the 
                        "Contact Us" section below.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-xl font-bold py-4">9. Children's Privacy</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Our website is not intended for children under 16 years of age. We do not knowingly collect personal 
                        information from children under 16. If you are a parent or guardian and you believe your child has 
                        provided us with personal information, please contact us so that we can take appropriate action.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-xl font-bold py-4">10. International Transfers</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Your information may be transferred to and processed in countries other than the country in which you 
                        reside. These countries may have data protection laws that are different from the laws of your country.
                      </p>
                      <p className="mt-4">
                        When we transfer your information to other countries, we will take appropriate safeguards to protect your 
                        information in accordance with this Privacy Policy and applicable law.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-xl font-bold py-4">11. Changes to Our Privacy Policy</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                        Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                      </p>
                      <p className="mt-4">
                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
                        are effective when they are posted on this page.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, or if you would like to exercise any of your rights 
                  regarding your personal information, please contact us at:
                </p>
                <div className="mt-2">
                  <p>NexaWeb Digital Agency</p>
                  <p>123 Tech Plaza, Suite 400</p>
                  <p>San Francisco, CA 94105</p>
                  <p>Email: privacy@nexaweb.com</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
                
                <div className="mt-12 text-center">
                  <Link href="/terms-of-service">
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      View Terms of Service
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;