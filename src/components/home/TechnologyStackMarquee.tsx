import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { technologies } from '@/data/technologies';

const TechnologyStackMarquee: React.FC = () => {
  const [duplicatedTech, setDuplicatedTech] = useState(technologies);
  
  // Duplicate technologies to ensure smooth infinite scrolling
  useEffect(() => {
    setDuplicatedTech([...technologies, ...technologies]);
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-10">Technologies We Work With</h2>
        
        <div className="relative">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ 
              x: { 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 25,
                ease: "linear"
              }
            }}
          >
            {duplicatedTech.map((tech, index) => (
              <div 
                key={`${tech.id}-${index}`} 
                className={cn(
                  "flex items-center justify-center mx-6 w-20 h-20 grayscale hover:grayscale-0 transition-all duration-300",
                  "transform hover:scale-110"
                )}
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className="h-12"
                  loading="lazy" 
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStackMarquee;
