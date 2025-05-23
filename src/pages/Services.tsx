import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEO from '@/components/shared/SEO';
import ServiceCard from '@/components/home/ServiceCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services.ts';
import { projects } from '@/data/projects';
import WorkCard from '@/components/home/WorkCard';
import SmartForm from '@/components/contact/SmartForm';

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

const Services = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Filter projects by active tab
  const filteredProjects = activeTab === 'all' 
    ? projects.slice(0, 3) 
    : projects.filter(project => project.tags.some(tag => 
        tag.toLowerCase().includes(activeTab.toLowerCase())
      )).slice(0, 3);
  
  // Process steps for the "How We Work" section
  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by understanding your business, audience, and goals through in-depth consultations.'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Our team develops a comprehensive strategy tailored to your specific needs and objectives.'
    },
    {
      number: '03',
      title: 'Design',
      description: 'We create intuitive, engaging designs that reflect your brand and resonate with your audience.'
    },
    {
      number: '04',
      title: 'Development',
      description: 'Our developers build robust, scalable solutions using the latest technologies and best practices.'
    },
    {
      number: '05',
      title: 'Testing',
      description: 'Rigorous quality assurance ensures your product performs flawlessly across all devices and scenarios.'
    },
    {
      number: '06',
      title: 'Launch & Support',
      description: 'We handle the deployment and provide ongoing support to ensure long-term success.'
    }
  ];

  return (
    <main>
      <SEO
        title="Services | NexaWeb Digital Agency"
        description="Explore our comprehensive range of digital services including web development, UI/UX design, and AI integration solutions."
        keywords="web development, UI/UX design, AI integration, e-commerce, mobile app development, digital marketing"
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Our Digital <span className="text-primary">Services</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer end-to-end digital solutions designed to transform your business 
              and create exceptional user experiences.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section 
        ref={servicesRef} 
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section 
        ref={processRef} 
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              How We Work
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our proven methodology ensures successful outcomes for every project
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
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
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              See how we've helped businesses achieve their digital goals
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                variant={activeTab === 'all' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('all')}
              >
                All
              </Button>
              <Button 
                variant={activeTab === 'web' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('web')}
              >
                Web Development
              </Button>
              <Button 
                variant={activeTab === 'mobile' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('mobile')}
              >
                Mobile
              </Button>
              <Button 
                variant={activeTab === 'ai' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('ai')}
              >
                AI Integration
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss how we can help bring your vision to life.
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
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">How long does a typical project take?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Project timelines vary based on complexity and scope. A standard website might take 4-8 weeks, 
                  while more complex applications can take 3-6 months. During our initial consultation, 
                  we'll provide a detailed timeline specific to your project.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">What is your pricing structure?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We offer both fixed-price and time-and-materials pricing models depending on project 
                  requirements. Our base prices start at $2,000 for basic websites and vary based on 
                  features, complexity, and timeline. We provide detailed proposals with transparent 
                  pricing before any project begins.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Do you provide ongoing support?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, we offer various support and maintenance packages to ensure your digital products 
                  continue to perform optimally. These include regular updates, security monitoring, 
                  performance optimization, and content updates. We'll recommend the appropriate 
                  support plan based on your specific needs.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">What technologies do you work with?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We work with a wide range of modern technologies including React, Angular, Vue.js, 
                  Node.js, Python, and many others. We select the most appropriate technology stack 
                  based on your project requirements, focusing on performance, scalability, and 
                  long-term maintainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Have questions about our services? Reach out to our team.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SmartForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
