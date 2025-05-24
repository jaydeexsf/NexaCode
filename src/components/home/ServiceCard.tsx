import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface ServiceProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent';
  link: string;
}

/**
 * Service card component for displaying a service with icon, title, description and link
 */
const ServiceCard: React.FC<ServiceProps> = ({ 
  id, title, description, icon, color
}) => {
  // Color class mappings
  const colorClasses = {
    primary: {
      stripe: 'bg-primary-600',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
      link: 'text-primary-600 dark:text-primary-400',
    },
    secondary: {
      stripe: 'bg-secondary-600',
      iconBg: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-600 dark:text-secondary-400',
      link: 'text-secondary-600 dark:text-secondary-400',
    },
    accent: {
      stripe: 'bg-accent-500',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-accent-500',
      link: 'text-accent-500',
    },
  };
  
  const classes = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
    >
      <div className={`h-2 ${classes.stripe}`}></div>
      <div className="p-8">
        <div className={`w-14 h-14 rounded-lg ${classes.iconBg} flex items-center justify-center mb-6`}>
          <div className={classes.iconColor}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        <Link 
          href={`/services/${id}`} 
          className={`${classes.link} font-medium flex items-center group`}
        >
          Learn more
          <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
