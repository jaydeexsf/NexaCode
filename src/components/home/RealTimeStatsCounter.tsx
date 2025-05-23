import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatsCounterProps {
  projects?: number;
  clients?: number;
  countries?: number;
}

const RealTimeStatsCounter: React.FC<StatsCounterProps> = ({ 
  projects = 4500, 
  clients = 1200, 
  countries = 85 
}) => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const animated = useRef(false);
  
  useEffect(() => {
    if (inView && !animated.current) {
      animated.current = true;
      
      // Animate projects counter
      const projectsDuration = 2000; // 2 seconds
      const projectsIncrement = Math.ceil(projects / (projectsDuration / 16)); // 16ms is approx. one frame at 60fps
      
      let currentProjects = 0;
      const projectsInterval = setInterval(() => {
        currentProjects += projectsIncrement;
        if (currentProjects >= projects) {
          setProjectsCount(projects);
          clearInterval(projectsInterval);
        } else {
          setProjectsCount(currentProjects);
        }
      }, 16);
      
      // Animate clients counter
      const clientsDuration = 2000;
      const clientsIncrement = Math.ceil(clients / (clientsDuration / 16));
      
      let currentClients = 0;
      const clientsInterval = setInterval(() => {
        currentClients += clientsIncrement;
        if (currentClients >= clients) {
          setClientsCount(clients);
          clearInterval(clientsInterval);
        } else {
          setClientsCount(currentClients);
        }
      }, 16);
      
      // Animate countries counter
      const countriesDuration = 2000;
      const countriesIncrement = Math.ceil(countries / (countriesDuration / 16));
      
      let currentCountries = 0;
      const countriesInterval = setInterval(() => {
        currentCountries += countriesIncrement;
        if (currentCountries >= countries) {
          setCountriesCount(countries);
          clearInterval(countriesInterval);
        } else {
          setCountriesCount(currentCountries);
        }
      }, 16);
      
      return () => {
        clearInterval(projectsInterval);
        clearInterval(clientsInterval);
        clearInterval(countriesInterval);
      };
    }
  }, [inView, projects, clients, countries]);

  return (
    <section ref={ref} className="bg-white dark:bg-gray-800 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div 
            className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl font-bold font-montserrat text-primary dark:text-primary mb-2">
              <span className="counter">{projectsCount.toLocaleString()}</span>+
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">Projects Completed</p>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-5xl font-bold font-montserrat text-secondary dark:text-secondary mb-2">
              <span className="counter">{clientsCount.toLocaleString()}</span>+
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">Satisfied Clients</p>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-5xl font-bold font-montserrat text-accent mb-2">
              <span className="counter">{countriesCount.toLocaleString()}</span>+
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">Countries Served</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeStatsCounter;
