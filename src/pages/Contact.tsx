import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin
} from 'lucide-react';
import SEO from '@/components/shared/SEO';
import SmartForm from '@/components/contact/SmartForm';

const Contact = () => {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const fromEstimate = params.get('estimate') === 'true';
  const estimatedPrice = params.get('price');
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Scroll to form if coming from pricing calculator
  useEffect(() => {
    if (fromEstimate && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [fromEstimate, formRef]);

  return (
    <main>
      <SEO 
        title="Contact Us | NexaWeb Digital Agency"
        description="Get in touch with NexaWeb Digital Agency. We're here to answer your questions and help with your digital projects."
        keywords="contact, digital agency, web development, reach out, project inquiry"
      />
      
      {/* For microdata - additional structured data for contact page */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "NexaWeb Digital Agency Contact Page",
            "description": "Contact NexaWeb Digital Agency for web development, UI/UX design, and digital services.",
            "mainEntity": {
              "@type": "Organization",
              "name": "NexaWeb Digital Agency",
              "telephone": "+1 (555) 123-4567",
              "email": "info@nexaweb.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Tech Street, Suite 456",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "postalCode": "94107",
                "addressCountry": "US"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
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
              Get In <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {fromEstimate 
                ? `Thank you for using our price calculator! We've estimated your project at ${estimatedPrice}. Fill out the form below to get a detailed quote.` 
                : "We're here to help with your digital project. Reach out to discuss your needs or ask any questions."}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Information and Form Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                ref={infoRef}
                initial={{ opacity: 0, x: -20 }}
                animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Phone</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">info@nexaweb.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Office</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        123 Tech Street, Suite 456<br />San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Office Hours</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" aria-label="Facebook">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" aria-label="Twitter">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" aria-label="Instagram">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" aria-label="LinkedIn">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-medium mb-4">What Happens Next?</h3>
                  <ol className="space-y-4 pl-6">
                    <li className="list-decimal text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">We'll contact you within 24 hours</span>
                      <p className="mt-1">Our team will reach out to schedule an initial consultation</p>
                    </li>
                    <li className="list-decimal text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Discovery call</span>
                      <p className="mt-1">We'll discuss your project requirements and goals in detail</p>
                    </li>
                    <li className="list-decimal text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Proposal and timeline</span>
                      <p className="mt-1">We'll provide a detailed proposal with pricing and project timeline</p>
                    </li>
                    <li className="list-decimal text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Project kickoff</span>
                      <p className="mt-1">Once approved, we'll start working on your project immediately</p>
                    </li>
                  </ol>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: 20 }}
                animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SmartForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section 
        ref={mapRef}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Our Location
            </motion.h2>
            
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg h-[450px]"
              initial={{ opacity: 0, y: 20 }}
              animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0969821884526!2d-122.40257582356307!3d37.78789031396835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808eb456e2e3%3A0xe107ab1db094c96f!2s123%20Tech%20St%2C%20San%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1659482493252!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="NexaWeb Office Location"
                aria-label="Map showing NexaWeb office location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">How quickly can you start on my project?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We typically begin new projects within 1-2 weeks of contract signing, depending on our current workload. For urgent projects, we may be able to accommodate faster start times. Let us know your timeline in the contact form and we'll do our best to accommodate your needs.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Do you work with clients internationally?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! We work with clients worldwide and have successfully completed projects for businesses in over 85 countries. Our team is experienced in managing international projects and accommodating different time zones for communication.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What information should I prepare before our initial consultation?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To make our initial consultation as productive as possible, it helps to have: 1) Clear project goals and objectives, 2) Any existing brand guidelines or design preferences, 3) Examples of websites or apps you like, 4) Your target audience information, and 5) Your budget range and timeline expectations.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">What happens after the project is completed?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  After project completion, we provide a handover that includes all necessary files, documentation, and training. We offer various support packages to ensure your digital product continues to perform optimally. Many clients choose to work with us on an ongoing basis for maintenance, updates, and future enhancements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl mb-8">
              Fill out our contact form or give us a call. We're excited to learn about your project and how we can help bring your vision to life.
            </p>
            <div className="inline-flex items-center justify-center text-xl font-bold">
              <Phone className="h-6 w-6 mr-2" />
              +1 (555) 123-4567
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
