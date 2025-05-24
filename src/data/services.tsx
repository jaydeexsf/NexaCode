import { 
  Code, 
  Palette, 
  Cpu, 
  ShoppingBag, 
  Smartphone,
  // Barcode,
  MessagesSquare
} from 'lucide-react';
import { ServiceProps } from '@/components/home/ServiceCard';

export const services: ServiceProps[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Responsive, high-performance websites and web applications built with cutting-edge technologies.',
    icon: <Code className="h-8 w-8" />,
    color: 'primary',
    link: '/services/web-development'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design that delivers intuitive, engaging experiences that convert visitors into customers.',
    icon: <Palette className="h-8 w-8" />,
    color: 'secondary',
    link: '/services/ui-ux-design'
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Harness the power of artificial intelligence to automate processes and create smarter applications.',
    icon: <Cpu className="h-8 w-8" />,
    color: 'accent',
    link: '/services/ai-integration'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Scalable online stores that provide seamless shopping experiences with secure payment processing.',
    icon: <ShoppingBag className="h-8 w-8" />,
    color: 'primary',
    link: '/services/ecommerce'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    icon: <Smartphone className="h-8 w-8" />,
    color: 'secondary',
    link: '/services/mobile-app'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies to increase visibility, engagement, and conversion rates.',
    icon: <Smartphone className="h-8 w-8" />,
    color: 'accent',
    link: '/services/digital-marketing'
  }
];

// Extended service details for individual service pages
export interface ServiceDetail extends ServiceProps {
  subtitle: string;
  fullDescription: string;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  caseStudies: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'web-development': {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Custom Web Solutions for Growing Businesses',
    description: 'Responsive, high-performance websites and web applications built with cutting-edge technologies.',
    fullDescription: 'Our web development services deliver custom, responsive websites optimized for performance and conversion. We build sites that not only look great but also drive business results through strategic architecture, modern code, and smooth user experiences.',
    icon: <Code className="h-8 w-8" />,
    color: 'primary',
    link: '/services/web-development',
    features: [
      {
        title: 'Custom Website Development',
        description: 'Tailored websites designed and built from scratch to meet your specific business needs.',
        icon: <Code className="h-6 w-6" />
      },
      {
        title: 'Web Application Development',
        description: 'Complex web applications with advanced functionalities and integrations.',
        icon: <Code className="h-6 w-6" />
      },
      {
        title: 'CMS Implementation',
        description: 'Custom content management systems or implementation of WordPress, Drupal, or other platforms.',
        icon: <Code className="h-6 w-6" />
      }
    ],
    benefits: [
      'Increased conversion rates through optimized user journeys',
      'Faster load times and improved SEO ranking',
      'Mobile-first responsive design for all devices',
      'Secure, scalable architecture',
      'Easy content management'
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your business needs, target audience, and project goals.'
      },
      {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Creating wireframes and visual designs for your approval.'
      },
      {
        step: 3,
        title: 'Development',
        description: 'Coding the website with clean, optimized front and back-end development.'
      },
      {
        step: 4,
        title: 'Testing & Launch',
        description: 'Thorough quality assurance and testing before deployment.'
      },
      {
        step: 5,
        title: 'Maintenance & Support',
        description: 'Ongoing support, updates, and performance monitoring.'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer: 'The timeline depends on the complexity of the project, but typically ranges from 4-12 weeks from concept to launch for custom websites.'
      },
      {
        question: 'What technologies do you use?',
        answer: 'We work with modern frameworks like React, Angular, Vue.js for front-end, and Node.js, Python, PHP for back-end development. We customize the tech stack based on your specific project needs.'
      },
      {
        question: 'Will my website be mobile-friendly?',
        answer: 'Absolutely. All our websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices and screen sizes.'
      }
    ],
    caseStudies: ['project-1', 'project-2']
  },
  'ui-ux-design': {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'Creating Intuitive, Engaging User Experiences',
    description: 'User-centered design that delivers intuitive, engaging experiences that convert visitors into customers.',
    fullDescription: 'Our design team creates beautiful, intuitive interfaces that enhance user engagement and improve conversion rates. We focus on research-driven design decisions that create seamless user experiences across all platforms and devices.',
    icon: <Palette className="h-8 w-8" />,
    color: 'secondary',
    link: '/services/ui-ux-design',
    features: [
      {
        title: 'User Research & Analysis',
        description: 'Comprehensive research to understand your users and their needs.',
        icon: <Palette className="h-6 w-6" />
      },
      {
        title: 'Interface Design',
        description: 'Beautiful, intuitive UI design that aligns with your brand.',
        icon: <Palette className="h-6 w-6" />
      },
      {
        title: 'Prototyping & Testing',
        description: 'Interactive prototypes and user testing to validate design decisions.',
        icon: <Palette className="h-6 w-6" />
      }
    ],
    benefits: [
      'Improved user satisfaction and engagement',
      'Higher conversion rates and lower bounce rates',
      'Reduced development costs through early problem identification',
      'Consistent experience across all touchpoints',
      'Data-driven design decisions'
    ],
    process: [
      {
        step: 1,
        title: 'User Research',
        description: 'Gathering insights about users through interviews, surveys, and analytics.'
      }
    ],
    faqs: [],
    caseStudies: []
  }
}; 