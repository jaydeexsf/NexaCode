import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const ClientVideoTestimonialsCarousel: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  
  useEffect(() => {
    if (!inView) return;
    
    const swiper = new Swiper('.testimonial-carousel', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
    
    swiperRef.current = swiper;
    setIsNavigationVisible(true);
    
    return () => {
      swiper.destroy();
    };
  }, [inView]);
  
  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-montserrat mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Client Success Stories
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear directly from our clients about their experience working with us
          </motion.p>
        </div>
        
        <div className="relative testimonial-carousel">
          {/* Testimonial slides */}
          <div className="swiper-wrapper">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="swiper-slide p-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg h-full">
                  <div className="relative aspect-video">
                    {/* Video thumbnail */}
                    <img 
                      src={testimonial.thumbnailUrl} 
                      alt={`${testimonial.name} testimonial video thumbnail`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-primary hover:bg-white transition-colors"
                        aria-label={`Play video testimonial from ${testimonial.name}`}
                      >
                        <Play className="h-8 w-8 fill-current ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-amber-500">
                        {/* 5 stars */}
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-300 mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatarUrl} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          {isNavigationVisible && (
            <>
              <button 
                className="swiper-button-prev absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button 
                className="swiper-button-next absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientVideoTestimonialsCarousel;
