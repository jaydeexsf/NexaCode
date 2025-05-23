import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export interface WorkItemProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

/**
 * Work Card component for displaying portfolio items
 */
const WorkCard: React.FC<WorkItemProps> = ({ 
  title, description, image, tags, link = "#" 
}) => {
  // Generate random color for each tag
  const getTagColor = (tag: string) => {
    const colors = [
      'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
      'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300',
      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    ];
    
    // Use the sum of character codes to determine a consistent color for the same tag
    const sum = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <a href={link} className="text-white font-bold text-lg">View Project</a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className={getTagColor(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
