import InteractiveWebGLHero from '@/components/home/InteractiveWebGLHero';
import RealTimeStatsCounter from '@/components/home/RealTimeStatsCounter';
import ServiceCard from '@/components/home/ServiceCard';
import TechnologyStackMarquee from '@/components/home/TechnologyStackMarquee';
import WorkCard from '@/components/home/WorkCard';
import ClientVideoTestimonialsCarousel from '@/components/home/ClientVideoTestimonialsCarousel';
import ComparisonSlider from '@/components/home/ComparisonSlider';
import SmartForm from '@/components/contact/SmartForm';
import SEO from '@/components/shared/SEO';
import { services } from '@/data/services.tsx';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [workRef, workInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <main>
      {/* SEO */}
      <SEO 
        title="NexaWeb Digital Agency | Premium Web Development Services"
        description="Premium digital agency specializing in cutting-edge web development, AI solutions, and stunning digital experiences for businesses."
        keywords="web development, digital agency, UI/UX design, AI integration, e-commerce, premium websites"
        schema={{
          "@type": "ProfessionalService",
          "name": "NexaWeb Digital Agency",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Tech Street, Suite 456",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94107",
            "addressCountry": "US"
          },
          "telephone": "+1-555-123-4567",
          "priceRange": "$$$"
        }}
      />
      
      {/* Hero section */}
      <InteractiveWebGLHero />
      
      {/* Stats counter */}
      <RealTimeStatsCounter 
        projects={4500}
        clients={1200}
        countries={85}
      />
      
      {/* Services section */}
      <section ref={servicesRef} id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-montserrat mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Our Premium Services
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer end-to-end solutions tailored to your unique business needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technology stack */}
      <TechnologyStackMarquee />
      
      {/* Work section */}
      <section ref={workRef} id="work" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-montserrat mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={workInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Our Recent Work
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={workInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our portfolio of successful projects
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={workInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <WorkCard {...project} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.a 
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={workInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <ClientVideoTestimonialsCarousel />
      
      {/* Comparison slider */}
      <ComparisonSlider 
        beforeImage="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
        afterImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      />
      
      {/* Contact section */}
      <section ref={contactRef} id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">Let's Create Something Amazing Together</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Ready to start your project? Get in touch with our team to discuss your needs and how we can help.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Phone</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">info@nexaweb.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="h-6 w-6 text-primary dark:text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Office</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        123 Tech Street, Suite 456<br />San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SmartForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
