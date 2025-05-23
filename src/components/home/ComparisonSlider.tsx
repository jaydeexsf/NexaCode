import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Interactive before/after image comparison slider component
 */
const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  // Handle mouse/touch move events for slider interaction
  const handleMove = (clientX: number) => {
    if (!sliderRef.current || !isDragging) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const position = clientX - rect.left;
    
    // Calculate percentage position and clamp between 0-100
    const percentage = Math.max(0, Math.min(100, (position / containerWidth) * 100));
    setSliderPosition(percentage);
  };
  
  // Mouse event handlers
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };
  
  // Touch event handlers
  const handleTouchStart = () => {
    setIsDragging(true);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };
  
  // Set up and clean up event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  // Animation when component comes into view
  useEffect(() => {
    if (inView) {
      const animationInterval = setInterval(() => {
        setSliderPosition((prev) => {
          // Animate slider back and forth
          const newValue = prev + (prev > 75 ? -1 : 1);
          if (newValue >= 80) return 80;
          if (newValue <= 20) return 20;
          return newValue;
        });
      }, 20);
      
      // Stop animation after 2 seconds
      setTimeout(() => {
        clearInterval(animationInterval);
        setSliderPosition(50);
      }, 2000);
      
      return () => clearInterval(animationInterval);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-montserrat mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            See the Difference
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the before and after transformations of our client projects
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div 
            ref={sliderRef}
            className="relative w-full overflow-hidden rounded-xl shadow-xl cursor-ew-resize"
          >
            {/* After image (visible by default) */}
            <img 
              src={afterImage} 
              alt="After redesign" 
              className="w-full"
              loading="lazy"
            />
            
            {/* Before image (partially visible based on slider) */}
            <div 
              className="absolute top-0 left-0 h-full overflow-hidden border-r-4 border-white"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={beforeImage} 
                alt="Before redesign" 
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Slider handle */}
            <div 
              className={cn(
                "absolute top-0 bottom-0 w-1",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div 
                className="absolute top-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12H3M9 6l-6 6 6 6M21 6l-6 6 6 6" />
                </svg>
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
              {beforeLabel}
            </div>
            <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded text-sm">
              {afterLabel}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSlider;
