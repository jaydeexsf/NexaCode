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
      },
      {
        step: 2,
        title: 'Information Architecture',
        description: 'Organizing content and structuring the user flow.'
      },
      {
        step: 3,
        title: 'Wireframing',
        description: 'Creating low-fidelity layouts to establish structure.'
      },
      {
        step: 4,
        title: 'UI Design',
        description: 'Developing the visual design and brand elements.'
      },
      {
        step: 5,
        title: 'Prototyping & Testing',
        description: 'Building interactive prototypes and conducting user tests.'
      }
    ],
    faqs: [
      {
        question: 'What makes good UX design?',
        answer: 'Good UX design is intuitive, accessible, and aligned with user needs. It allows users to accomplish their goals efficiently while creating positive emotional experiences.'
      },
      {
        question: 'How do you measure the success of UX design?',
        answer: 'We measure success through metrics like task completion rates, time on task, error rates, conversion rates, and user satisfaction scores.'
      },
      {
        question: 'Can you redesign our existing product?',
        answer: 'Yes, we offer UX audits and redesign services to improve existing products based on user research and best practices.'
      }
    ],
    caseStudies: ['project-3', 'project-6']
  },
  'ai-integration': {
    id: 'ai-integration',
    title: 'AI Integration',
    subtitle: 'Smart Solutions for Future-Ready Businesses',
    description: 'Harness the power of artificial intelligence to automate processes and create smarter applications.',
    fullDescription: 'Our AI integration services help businesses leverage cutting-edge artificial intelligence and machine learning technologies to automate processes, gain valuable insights from data, and create more intelligent applications that transform user experiences.',
    icon: <Cpu className="h-8 w-8" />,
    color: 'accent',
    link: '/services/ai-integration',
    features: [
      {
        title: 'Chatbot Development',
        description: 'Intelligent conversational interfaces to enhance customer support and user engagement.',
        icon: <MessagesSquare className="h-6 w-6" />
      },
      {
        title: 'Predictive Analytics',
        description: 'Data analysis tools that identify patterns and forecast future trends.',
        icon: <Cpu className="h-6 w-6" />
      },
      {
        title: 'Recommendation Systems',
        description: 'Smart systems that provide personalized content and product suggestions.',
        icon: <Cpu className="h-6 w-6" />
      }
    ],
    benefits: [
      'Automation of repetitive tasks',
      'Enhanced decision-making through data insights',
      'Personalized user experiences',
      'Improved operational efficiency',
      'Competitive advantage through innovation'
    ],
    process: [
      {
        step: 1,
        title: 'AI Strategy',
        description: 'Identifying opportunities for AI implementation in your business.'
      },
      {
        step: 2,
        title: 'Data Assessment',
        description: 'Evaluating data availability and quality for AI models.'
      },
      {
        step: 3,
        title: 'Solution Design',
        description: 'Designing custom AI solutions tailored to your specific needs.'
      },
      {
        step: 4,
        title: 'Development & Training',
        description: 'Building and training AI models using your data.'
      },
      {
        step: 5,
        title: 'Integration & Deployment',
        description: 'Seamlessly integrating AI solutions into your existing systems.'
      }
    ],
    faqs: [
      {
        question: 'How can AI benefit my business?',
        answer: 'AI can improve efficiency through automation, enhance decision-making with data insights, personalize customer experiences, predict trends, and optimize operations.'
      },
      {
        question: 'What types of AI projects do you implement?',
        answer: 'We implement a wide range of AI solutions including chatbots, recommendation systems, predictive analytics, computer vision, natural language processing, and custom machine learning models.'
      },
      {
        question: 'Do I need a large amount of data to use AI?',
        answer: 'While having more quality data generally leads to better AI models, we can work with various data scenarios and even implement transfer learning techniques for situations with limited data.'
      }
    ],
    caseStudies: ['project-5', 'project-6']
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    subtitle: 'Build Your Digital Store with Seamless Shopping Experiences',
    description: 'Scalable online stores that provide seamless shopping experiences with secure payment processing.',
    fullDescription: 'Our e-commerce solutions help businesses of all sizes sell online effectively. We create custom online stores with intuitive product management, secure payment processing, and optimized checkout flows designed to maximize conversions and sales.',
    icon: <ShoppingBag className="h-8 w-8" />,
    color: 'primary',
    link: '/services/ecommerce',
    features: [
      {
        title: 'Custom E-commerce Development',
        description: 'Tailored online stores built to your specific business requirements.',
        icon: <ShoppingBag className="h-6 w-6" />
      },
      {
        title: 'Platform Integration',
        description: 'Integration with Shopify, WooCommerce, Magento, and other popular platforms.',
        icon: <ShoppingBag className="h-6 w-6" />
      },
      {
        title: 'Payment & Shipping Solutions',
        description: 'Secure payment processing and optimized shipping integration.',
        icon: <ShoppingBag className="h-6 w-6" />
      }
    ],
    benefits: [
      'Increased sales through optimized conversion funnels',
      'Seamless shopping experience across all devices',
      'Secure transactions and data protection',
      'Scalable solutions that grow with your business',
      'Detailed analytics and sales reporting'
    ],
    process: [
      {
        step: 1,
        title: 'Business Analysis',
        description: 'Understanding your products, target audience, and business requirements.'
      },
      {
        step: 2,
        title: 'Platform Selection',
        description: 'Recommending the best e-commerce platform for your specific needs.'
      },
      {
        step: 3,
        title: 'Design & Development',
        description: 'Creating your store with a focus on user experience and conversion.'
      },
      {
        step: 4,
        title: 'Payment & Shipping Setup',
        description: 'Integrating secure payment gateways and shipping methods.'
      },
      {
        step: 5,
        title: 'Testing & Launch',
        description: 'Thorough testing of all store functionalities before going live.'
      }
    ],
    faqs: [
      {
        question: 'Which e-commerce platform is best for my business?',
        answer: 'The best platform depends on your specific needs, budget, and goals. We can help evaluate options like Shopify, WooCommerce, Magento, or custom solutions to find the right fit for your business.'
      },
      {
        question: 'How do you ensure the security of online transactions?',
        answer: 'We implement industry-standard security protocols, SSL certificates, and PCI DSS compliance. We also use trusted payment gateways and follow security best practices for all e-commerce development.'
      },
      {
        question: 'Can you migrate my existing online store to a new platform?',
        answer: 'Yes, we offer full migration services, carefully transferring your products, customer data, order history, and SEO value to ensure a smooth transition without losing sales or rankings.'
      }
    ],
    caseStudies: ['project-1', 'project-4']
  },
  'mobile-app': {
    id: 'mobile-app',
    title: 'Mobile App Development',
    subtitle: 'Engaging Mobile Experiences for iOS and Android',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    fullDescription: 'Our mobile app development services create powerful, user-friendly applications for iOS and Android. Whether you need a native app for maximum performance or a cross-platform solution for broader reach, we deliver mobile experiences that engage users and drive results.',
    icon: <Smartphone className="h-8 w-8" />,
    color: 'secondary',
    link: '/services/mobile-app',
    features: [
      {
        title: 'Native App Development',
        description: 'High-performance native applications for iOS and Android platforms.',
        icon: <Smartphone className="h-6 w-6" />
      },
      {
        title: 'Cross-Platform Solutions',
        description: 'Efficient development using React Native, Flutter, or other cross-platform frameworks.',
        icon: <Smartphone className="h-6 w-6" />
      },
      {
        title: 'App Store Optimization',
        description: 'Strategies to improve visibility and downloads in app stores.',
        icon: <Smartphone className="h-6 w-6" />
      }
    ],
    benefits: [
      'Enhanced user engagement through mobile-specific features',
      'Increased brand loyalty and retention',
      'New revenue streams through in-app purchases',
      'Offline functionality for uninterrupted user experience',
      'Valuable data collection and analytics'
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Defining app functionality, user stories, and technical requirements.'
      },
      {
        step: 2,
        title: 'UI/UX Design',
        description: 'Creating intuitive, engaging interfaces following platform guidelines.'
      },
      {
        step: 3,
        title: 'Development',
        description: 'Building the app using the appropriate technology stack.'
      },
      {
        step: 4,
        title: 'Testing',
        description: 'Comprehensive testing across devices and operating systems.'
      },
      {
        step: 5,
        title: 'Deployment & Maintenance',
        description: 'App store submission and ongoing updates and support.'
      }
    ],
    faqs: [
      {
        question: 'Should I build a native app or a cross-platform app?',
        answer: 'It depends on your specific needs. Native apps offer the best performance and access to platform-specific features, while cross-platform solutions allow faster development and broader reach with a single codebase. We can help you make the right choice based on your goals and budget.'
      },
      {
        question: 'How long does it take to develop a mobile app?',
        answer: 'Development timelines vary based on complexity, but typically range from 3-6 months for a fully-featured app. We can also work with phased approaches, launching with core features and adding more over time.'
      },
      {
        question: 'How do you ensure app security?',
        answer: 'We implement secure coding practices, data encryption, secure authentication, and regular security testing to protect user data and prevent vulnerabilities in all our mobile applications.'
      }
    ],
    caseStudies: ['project-3', 'project-5']
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Data-Driven Strategies for Online Growth',
    description: 'Data-driven marketing strategies to increase visibility, engagement, and conversion rates.',
    fullDescription: 'Our digital marketing services help businesses grow online through strategic, measurable campaigns. We combine SEO, content marketing, paid advertising, and social media to increase your brand visibility, drive qualified traffic, and convert visitors into customers.',
    icon: <Smartphone className="h-8 w-8" />,
    color: 'accent',
    link: '/services/digital-marketing',
    features: [
      {
        title: 'Search Engine Optimization',
        description: 'Improving organic rankings and visibility in search results.',
        icon: <Smartphone className="h-6 w-6" />
      },
      {
        title: 'Paid Advertising',
        description: 'Strategic PPC campaigns across Google, social media, and other platforms.',
        icon: <Smartphone className="h-6 w-6" />
      },
      {
        title: 'Social Media Marketing',
        description: 'Building brand presence and engagement on social platforms.',
        icon: <Smartphone className="h-6 w-6" />
      }
    ],
    benefits: [
      'Increased website traffic and brand visibility',
      'Higher conversion rates and ROI',
      'Better targeting of ideal customers',
      'Measurable results and campaign tracking',
      'Competitive advantage in your market'
    ],
    process: [
      {
        step: 1,
        title: 'Strategy Development',
        description: 'Creating a custom marketing plan aligned with your business goals.'
      },
      {
        step: 2,
        title: 'Campaign Setup',
        description: 'Implementing tracking, building campaigns, and creating content.'
      },
      {
        step: 3,
        title: 'Optimization',
        description: 'Continuous refinement based on performance data.'
      },
      {
        step: 4,
        title: 'Reporting & Analysis',
        description: 'Regular reporting on KPIs and campaign performance.'
      },
      {
        step: 5,
        title: 'Strategy Refinement',
        description: 'Evolving strategies based on results and market conditions.'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to see results from digital marketing?',
        answer: 'Timeframes vary by channel. PPC campaigns can show results immediately, while SEO typically takes 3-6 months to see significant improvements. We provide realistic expectations and focus on both short and long-term strategies.'
      },
      {
        question: 'How do you measure marketing success?',
        answer: 'We track key performance indicators aligned with your business goals, such as traffic, conversions, leads, sales, ROI, and other relevant metrics using advanced analytics tools.'
      },
      {
        question: 'What makes your digital marketing services different?',
        answer: 'Our approach combines data-driven strategies with creative execution. We focus on measurable results, transparent reporting, and continuous optimization rather than vanity metrics.'
      }
    ],
    caseStudies: ['project-2', 'project-4']
  }
};
