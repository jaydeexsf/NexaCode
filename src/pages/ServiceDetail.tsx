import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { serviceDetails, ServiceDetail as ServiceDetailType } from '@/data/services.tsx';
import SEO from '@/components/shared/SEO';
import { projects } from '@/data/projects';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import WorkCard from '@/components/home/WorkCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [, setLocation] = useLocation();
  const [service, setService] = useState<ServiceDetailType | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<typeof projects>([]);
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    // Find service details
    if (serviceId && serviceDetails[serviceId]) {
      setService(serviceDetails[serviceId]);
      
      // Find related projects (simplified match by tag inclusion)
      const related = projects.filter(project => 
        project.tags.some(tag => 
          tag.toLowerCase().includes(serviceId) ||
          serviceId.includes(tag.toLowerCase())
        )
      ).slice(0, 3);
      
      // If not enough matches, just add some projects
      if (related.length < 3) {
        const additionalNeeded = 3 - related.length;
        const otherProjects = projects
          .filter(p => !related.some(r => r.id === p.id))
          .slice(0, additionalNeeded);
          
        setRelatedProjects([...related, ...otherProjects]);
      } else {
        setRelatedProjects(related);
      }
    } else {
      // Redirect to services page if service not found
      setLocation('/services');
    }
  }, [serviceId, setLocation]);
  
  if (!service) {
    return null; // Loading state or will redirect
  }

  return (
    <main>
      <SEO
        title={`${service.title} | NexaWeb Digital Agency`}
        description={service.fullDescription}
        keywords={`${service.title.toLowerCase()}, digital services, web development, design, nexaweb`}
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-white bg-${service.color}`}>
                {service.icon}
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{service.subtitle}</p>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                {service.fullDescription}
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Key Features
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Everything you need for exceptional {service.title.toLowerCase()}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-${service.color} bg-${service.color}-100 dark:bg-${service.color}-900/30 mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits</h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button asChild>
                    <Link href="/contact">
                      Discuss Your Project
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Expert team with specialized experience in {service.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Proven track record of successful projects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Transparent communication throughout the project</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Focus on ROI and achieving your business goals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ongoing support and optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section 
        ref={processRef} 
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Our Process
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How we approach {service.title.toLowerCase()} projects
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Process line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12">
              {service.process.map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className={`md:grid md:grid-cols-2 md:gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`relative z-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <div className="absolute top-1/2 left-0 w-4 h-4 bg-primary rounded-full transform -translate-y-1/2 -translate-x-1/2 hidden md:block"></div>
                      <span className={`inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-${service.color}-100 dark:bg-${service.color}-900/30 text-${service.color}-700 dark:text-${service.color}-300`}>
                        Step {step.step}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                    <div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        ref={faqRef} 
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-bold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section 
        ref={projectsRef} 
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Related Projects
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              See how we've implemented {service.title.toLowerCase()} solutions for our clients
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            {relatedProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <WorkCard {...project} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button asChild>
              <Link href="/#work">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss your {service.title.toLowerCase()} project.
            </p>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white"
            >
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
