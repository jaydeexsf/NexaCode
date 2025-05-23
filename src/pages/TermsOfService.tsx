import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Interactive Three.js Component for Terms Page
const InteractiveTermsBackground = () => {
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
    camera.position.z = 15;
    
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
    
    // Create subtle background elements symbolizing security and trust
    // Create a grid pattern representing a contract/document
    const gridSize = 20;
    const gridDivisions = 10;
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3a86ff,
      transparent: true,
      opacity: 0.1
    });
    
    // Horizontal lines
    for (let i = 0; i <= gridDivisions; i++) {
      const y = (i / gridDivisions) * gridSize - gridSize / 2;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize / 2, y, 0),
        new THREE.Vector3(gridSize / 2, y, 0)
      ]);
      const line = new THREE.Line(geometry, gridMaterial);
      scene.add(line);
    }
    
    // Vertical lines
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i / gridDivisions) * gridSize - gridSize / 2;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -gridSize / 2, 0),
        new THREE.Vector3(x, gridSize / 2, 0)
      ]);
      const line = new THREE.Line(geometry, gridMaterial);
      scene.add(line);
    }
    
    // Create floating 'paragraph' rectangles resembling text on a document
    const paragraphCount = 15;
    const paragraphGeometry = new THREE.PlaneGeometry(8, 0.5);
    const paragraphMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3a86ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    
    const paragraphs: THREE.Mesh[] = [];
    
    for (let i = 0; i < paragraphCount; i++) {
      const paragraph = new THREE.Mesh(paragraphGeometry, paragraphMaterial);
      // Position them in a staggered column pattern
      paragraph.position.x = (Math.random() - 0.5) * 8;
      paragraph.position.y = i * -1 + 7; // Stacked effect
      paragraph.position.z = (Math.random() - 0.5) * 2;
      
      // Vary the width to simulate different text lengths
      paragraph.scale.x = 0.5 + Math.random() * 0.5;
      
      scene.add(paragraph);
      paragraphs.push(paragraph);
    }
    
    // Create a moving 'signature' effect
    const signaturePointCount = 100;
    const signatureCurve = new THREE.CurvePath<THREE.Vector3>();
    
    // Create a wavy pattern for the signature
    const startX = -4;
    const signatureWidth = 8;
    
    for (let i = 0; i < signaturePointCount - 1; i++) {
      const t1 = i / signaturePointCount;
      const t2 = (i + 1) / signaturePointCount;
      
      const x1 = startX + t1 * signatureWidth;
      const x2 = startX + t2 * signatureWidth;
      
      const y1 = Math.sin(t1 * 10) * 0.5 - 8; // Positioned at the bottom
      const y2 = Math.sin(t2 * 10) * 0.5 - 8;
      
      const curve = new THREE.LineCurve3(
        new THREE.Vector3(x1, y1, 0),
        new THREE.Vector3(x2, y2, 0)
      );
      
      signatureCurve.add(curve);
    }
    
    const signatureGeometry = new THREE.TubeGeometry(
      signatureCurve as any, 
      signaturePointCount, 
      0.05, 
      8, 
      false
    );
    
    const signatureMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3a86ff,
      transparent: true,
      opacity: 0.3
    });
    
    const signature = new THREE.Mesh(signatureGeometry, signatureMaterial);
    scene.add(signature);
    
    // Add a subtle spinning animation to the entire scene
    const sceneRotationSpeed = 0.0005;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the scene slightly
      scene.rotation.z += sceneRotationSpeed;
      
      // Animate paragraphs with a subtle floating effect
      paragraphs.forEach((paragraph, index) => {
        paragraph.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        paragraph.position.x += Math.cos(Date.now() * 0.001 + index) * 0.001;
      });
      
      // Make the signature pulsate slightly
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
      signature.scale.set(scale, scale, scale);
      
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

const TermsOfServicePage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>Terms of Service | NexaWeb Digital Agency</title>
        <meta name="description" content="Our terms of service outline the rules, guidelines, and legal agreements between NexaWeb Digital Agency and our clients or users." />
      </Helmet>
      
      <div className="relative min-h-screen">
        {/* Three.js interactive background */}
        <InteractiveTermsBackground />
        
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
                Terms of Service
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
        
        {/* Terms content */}
        <section className="py-10 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-10">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Welcome to NexaWeb Digital Agency. These Terms of Service ("Terms") govern your access to and use of our website, 
                  services, applications, and content ("Services"). By accessing or using our Services, you agree to be bound by 
                  these Terms and our Privacy Policy.
                </p>
                
                <Accordion type="single" collapsible className="w-full my-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-bold py-4">1. Acceptance of Terms</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these 
                        Terms, you may not access or use the Services. These Terms constitute a legally binding agreement between 
                        you and NexaWeb Digital Agency.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-bold py-4">2. Description of Services</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        NexaWeb Digital Agency provides digital strategy, design, development, and marketing services for 
                        businesses of all sizes. Our Services may include website design and development, application development, 
                        digital marketing, SEO services, content creation, and other related services as agreed upon in a separate 
                        statement of work or contract.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-bold py-4">3. Service Fees and Payment</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Fees for our Services are set forth in the applicable statement of work or contract. Unless otherwise 
                        specified, all fees are quoted in US dollars and are non-refundable. Payment terms will be outlined in 
                        your contract or statement of work.
                      </p>
                      <p className="mt-4">
                        If you fail to make any payment when due, we reserve the right to suspend or terminate your Services until 
                        payment is received. You are responsible for all taxes associated with the Services, other than taxes 
                        based on our net income.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl font-bold py-4">4. Intellectual Property Rights</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Upon full payment of all applicable fees, you will own all rights to the final deliverables created 
                        specifically for you, except for:
                      </p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Third-party materials that are incorporated into the deliverables</li>
                        <li>Our pre-existing intellectual property</li>
                        <li>Our proprietary methods, processes, and tools used to create the deliverables</li>
                      </ul>
                      <p>
                        We retain the right to display and link to your project as part of our portfolio and to write about the 
                        project for promotional purposes, unless explicitly agreed otherwise in writing.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl font-bold py-4">5. Client Responsibilities</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        You are responsible for:
                      </p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>Providing accurate and complete information as required for the Services</li>
                        <li>Reviewing and approving deliverables in a timely manner</li>
                        <li>Ensuring you have the rights to all materials provided to us</li>
                        <li>Complying with all applicable laws and regulations</li>
                        <li>Maintaining the confidentiality of any account credentials</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-xl font-bold py-4">6. Confidentiality</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Each party agrees to keep confidential any proprietary or non-public information disclosed during the 
                        course of the engagement, including business plans, technical information, designs, and financial 
                        information. This obligation continues for two years after the termination of Services.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-xl font-bold py-4">7. Term and Termination</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        These Terms remain in effect until terminated. Either party may terminate the Services as specified in 
                        the applicable statement of work or contract. Upon termination:
                      </p>
                      <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>You are responsible for paying for all Services performed up to the date of termination</li>
                        <li>All licenses granted will terminate unless fully paid for</li>
                        <li>Any provisions that by their nature should survive termination will survive</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-xl font-bold py-4">8. Limitation of Liability</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEXAWEB DIGITAL AGENCY SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER 
                        INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                      </p>
                      <p className="mt-4">
                        IN NO EVENT SHALL OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICES EXCEED THE GREATER OF 
                        $1,000 OR THE AMOUNTS PAID BY YOU TO NEXAWEB DIGITAL AGENCY FOR THE APPLICABLE SERVICES IN THE TWELVE 
                        MONTHS PRECEDING THE CLAIM.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-xl font-bold py-4">9. Indemnification</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        You agree to indemnify and hold harmless NexaWeb Digital Agency and its officers, directors, employees, 
                        and agents from any claims, damages, liabilities, costs, and expenses (including reasonable attorney's 
                        fees) arising from or related to your use of the Services, your violation of these Terms, or your 
                        violation of any rights of a third party.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-xl font-bold py-4">10. Governing Law and Jurisdiction</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        These Terms shall be governed by and construed in accordance with the laws of the State of California, 
                        without regard to its conflict of law provisions. You agree to submit to the personal and exclusive 
                        jurisdiction of the courts located in San Francisco County, California.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-xl font-bold py-4">11. Changes to Terms</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We reserve the right to modify these Terms at any time. We will provide notice of significant changes by 
                        posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the 
                        Services after such changes constitutes your acceptance of the new Terms.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-12">
                    <AccordionTrigger className="text-xl font-bold py-4">12. Miscellaneous</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        These Terms constitute the entire agreement between you and NexaWeb Digital Agency regarding the Services. 
                        If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will 
                        remain in full force and effect.
                      </p>
                      <p className="mt-4">
                        Our failure to enforce any right or provision of these Terms will not be considered a waiver of such 
                        right or provision. The waiver of any such right or provision will be effective only if in writing and 
                        signed by a duly authorized representative of NexaWeb Digital Agency.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-2">
                  <p>NexaWeb Digital Agency</p>
                  <p>123 Tech Plaza, Suite 400</p>
                  <p>San Francisco, CA 94105</p>
                  <p>Email: legal@nexaweb.com</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfServicePage;