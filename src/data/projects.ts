import { WorkItemProps } from '@/components/home/WorkCard';

export const projects: WorkItemProps[] = [
  {
    id: 'project-1',
    title: 'LuxeCart E-commerce',
    description: 'A premium online shopping experience with AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'AWS'],
    link: '/case-studies/luxecart'
  },
  {
    id: 'project-2',
    title: 'EstateVision Platform',
    description: 'Virtual property tours with immersive 3D visualizations.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Three.js', 'WebGL', 'MongoDB'],
    link: '/case-studies/estatevision'
  },
  {
    id: 'project-3',
    title: 'FitSync Mobile App',
    description: 'Personalized workout and nutrition tracking with AI coach.',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'TensorFlow'],
    link: '/case-studies/fitsync'
  },
  {
    id: 'project-4',
    title: 'GlobalTrends Dashboard',
    description: 'Real-time data visualization platform for market analysis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Vue.js', 'D3.js', 'Python'],
    link: '/case-studies/globaltrends'
  },
  {
    id: 'project-5',
    title: 'MediConnect Portal',
    description: 'Secure healthcare platform connecting patients and providers.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Angular', 'Node.js', 'MongoDB'],
    link: '/case-studies/mediconnect'
  },
  {
    id: 'project-6',
    title: 'EcoTrack System',
    description: 'IoT-based environmental monitoring and analytics platform.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['IoT', 'React', 'AWS'],
    link: '/case-studies/ecotrack'
  }
];

// Extended project details for case study pages
export interface ProjectDetail extends WorkItemProps {
  client: string;
  industry: string;
  timeframe: string;
  overview: string;
  challenge: string;
  solution: string;
  results: {
    title: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  technologies: string[];
  galleryImages: string[];
  nextProject: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  'project-1': {
    id: 'project-1',
    title: 'LuxeCart E-commerce',
    description: 'A premium online shopping experience with AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'AWS'],
    link: '/case-studies/luxecart',
    client: 'LuxeCart Brands',
    industry: 'Retail',
    timeframe: '4 months',
    overview: 'LuxeCart needed a high-end e-commerce platform to showcase their luxury products with personalized recommendations and a seamless checkout process.',
    challenge: 'The client needed a platform that maintained the premium feel of their brand while handling complex product configurations, personalized recommendations, and integration with their existing inventory system.',
    solution: 'We built a custom e-commerce solution using React for the frontend and Node.js for the backend. We implemented an AI-powered recommendation engine that suggests products based on browsing history and purchase patterns.',
    results: [
      { title: 'Conversion Rate', value: '45% increase' },
      { title: 'Average Order Value', value: '27% increase' },
      { title: 'Page Load Time', value: '67% reduction' },
      { title: 'User Engagement', value: '3x higher' }
    ],
    testimonial: {
      quote: "NexaWeb transformed our online presence with a stunning new website that has increased our conversion rate by 45%. Their team was professional, responsive, and delivered beyond our expectations.",
      author: 'Sarah Johnson',
      position: 'CEO',
      company: 'LuxeCart Brands'
    },
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Redis', 'TensorFlow'],
    galleryImages: [
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537886079530-1e250eea5942?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    nextProject: 'project-2'
  },
  'project-2': {
    id: 'project-2',
    title: 'EstateVision Platform',
    description: 'Virtual property tours with immersive 3D visualizations.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Three.js', 'WebGL', 'MongoDB'],
    link: '/case-studies/estatevision',
    client: 'EstateVision Realty',
    industry: 'Real Estate',
    timeframe: '5 months',
    overview: 'EstateVision wanted to revolutionize the property viewing experience by offering immersive 3D virtual tours that allow potential buyers to explore properties remotely.',
    challenge: 'The client needed a solution that would render detailed 3D models of properties with optimal performance across devices, while integrating with their existing property management system.',
    solution: 'We developed a WebGL-based platform using Three.js that creates photorealistic 3D property tours. The system includes an easy-to-use dashboard for agents to upload floor plans and photos that are automatically converted into 3D models.',
    results: [
      { title: 'Property Viewings', value: '230% increase' },
      { title: 'Time-to-Sale', value: '35% reduction' },
      { title: 'Remote Purchases', value: '40% of total sales' },
      { title: 'Agent Productivity', value: '65% improvement' }
    ],
    testimonial: {
      quote: "The virtual tour platform has completely transformed our business. Clients can now view properties from anywhere in the world, and the immersive experience has significantly increased our remote sales.",
      author: 'Michael Chen',
      position: 'Director of Technology',
      company: 'EstateVision Realty'
    },
    technologies: ['Three.js', 'WebGL', 'React', 'Node.js', 'MongoDB', 'AWS S3', 'WebRTC'],
    galleryImages: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582883040775-f98dd8c04597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    nextProject: 'project-3'
  },
  'project-3': {
    id: 'project-3',
    title: 'FitSync Mobile App',
    description: 'Personalized workout and nutrition tracking with AI coach.',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'TensorFlow'],
    link: '/case-studies/fitsync',
    client: 'FitSync Health',
    industry: 'Health & Fitness',
    timeframe: '6 months',
    overview: 'FitSync wanted to create a mobile app that provides users with personalized workout plans and nutrition guidance powered by artificial intelligence.',
    challenge: 'The client needed a cross-platform solution that could process complex fitness data, learn from user behavior, and provide personalized recommendations while maintaining a smooth and engaging user experience.',
    solution: 'We developed a React Native app with a Firebase backend and integrated TensorFlow for the AI recommendation engine. The app tracks user progress, analyzes workout and nutrition data, and adjusts recommendations based on user performance and goals.',
    results: [
      { title: 'User Retention', value: '78% after 3 months' },
      { title: 'Workout Completion', value: '83% average rate' },
      { title: 'Goal Achievement', value: '62% of users' },
      { title: 'App Store Rating', value: '4.8/5.0' }
    ],
    testimonial: {
      quote: "NexaWeb delivered an exceptional app that our users love. The AI coach feature has set us apart from competitors, and the intuitive design has resulted in engagement metrics far above industry standards.",
      author: 'Jessica Patel',
      position: 'Founder',
      company: 'FitSync Health'
    },
    technologies: ['React Native', 'Firebase', 'TensorFlow', 'Node.js', 'Redux', 'Realm', 'Google Fit API', 'Apple HealthKit'],
    galleryImages: [
      'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    nextProject: 'project-4'
  },
  'project-4': {
    id: 'project-4',
    title: 'GlobalTrends Dashboard',
    description: 'Real-time data visualization platform for market analysis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Vue.js', 'D3.js', 'Python'],
    link: '/case-studies/globaltrends',
    client: 'GlobalTrends Analytics',
    industry: 'Financial Services',
    timeframe: '3 months',
    overview: 'GlobalTrends needed a sophisticated data visualization platform that could process and display complex financial market data in real-time for their analyst team and clients.',
    challenge: 'The client required a high-performance system capable of handling massive datasets, creating interactive visualizations, and providing insights through predictive analytics, all with minimal latency.',
    solution: 'We built a Vue.js frontend with D3.js for advanced visualizations and a Python backend for data processing. The system includes real-time data streaming, interactive charts, custom filtering, and predictive modeling capabilities.',
    results: [
      { title: 'Data Processing Time', value: '92% reduction' },
      { title: 'User Productivity', value: '67% improvement' },
      { title: 'Client Acquisition', value: '35% increase' },
      { title: 'Decision-Making Speed', value: '74% faster' }
    ],
    testimonial: {
      quote: "The dashboard has revolutionized how we analyze market trends. The intuitive interface and powerful visualization tools have made complex data accessible and actionable for our entire team.",
      author: 'Robert Alvarez',
      position: 'Chief Data Officer',
      company: 'GlobalTrends Analytics'
    },
    technologies: ['Vue.js', 'D3.js', 'Python', 'Flask', 'WebSockets', 'PostgreSQL', 'Redis', 'Pandas', 'NumPy'],
    galleryImages: [
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    nextProject: 'project-5'
  },
  'project-5': {
    id: 'project-5',
    title: 'MediConnect Portal',
    description: 'Secure healthcare platform connecting patients and providers.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Angular', 'Node.js', 'MongoDB'],
    link: '/case-studies/mediconnect',
    client: 'MediConnect Health Systems',
    industry: 'Healthcare',
    timeframe: '8 months',
    overview: 'MediConnect needed a secure, HIPAA-compliant platform to facilitate communication between patients and healthcare providers, manage appointments, and provide access to medical records.',
    challenge: 'The project required strict security protocols, seamless integration with existing health systems, and an intuitive interface for users of all technical abilities, including elderly patients.',
    solution: 'We developed a comprehensive Angular-based portal with end-to-end encryption, two-factor authentication, and role-based access control. The system includes appointment scheduling, secure messaging, telehealth capabilities, and medical record access.',
    results: [
      { title: 'Patient Engagement', value: '86% activation' },
      { title: 'Administrative Time', value: '43% reduction' },
      { title: 'Appointment No-Shows', value: '62% decrease' },
      { title: 'Patient Satisfaction', value: '91% positive' }
    ],
    testimonial: {
      quote: "NexaWeb understood the unique challenges of healthcare technology and delivered a secure, user-friendly platform that has transformed our patient engagement and operational efficiency.",
      author: 'Dr. Elena Rodriguez',
      position: 'Chief Medical Information Officer',
      company: 'MediConnect Health Systems'
    },
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'OAuth2', 'Azure', 'HL7 FHIR'],
    galleryImages: [
      'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581093577421-f561a654a353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    nextProject: 'project-6'
  },
  'project-6': {
    id: 'project-6',
    title: 'EcoTrack System',
    description: 'IoT-based environmental monitoring and analytics platform.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['IoT', 'React', 'AWS'],
    link: '/case-studies/ecotrack',
    client: 'EcoTrack Environmental',
    industry: 'Environmental Technology',
    timeframe: '7 months',
    overview: 'EcoTrack needed an IoT platform to collect, analyze, and visualize environmental data from their network of sensors placed in various ecosystems and urban environments.',
    challenge: 'The system needed to handle continuous data streams from thousands of sensors, process this data in real-time, detect anomalies, and present actionable insights through an intuitive dashboard.',
    solution: 'We built an end-to-end IoT platform using AWS IoT Core for device connectivity, serverless functions for data processing, and a React frontend for visualization. The system includes predictive analytics for environmental trends and anomaly detection.',
    results: [
      { title: 'Data Collection Efficiency', value: '99.8% uptime' },
      { title: 'Environmental Incident Detection', value: '92% accuracy' },
      { title: 'Response Time to Incidents', value: '76% faster' },
      { title: 'Operational Costs', value: '38% reduction' }
    ],
    testimonial: {
      quote: "The EcoTrack system has revolutionized how we monitor and respond to environmental changes. The real-time analytics and alerting capabilities have helped us prevent several potentially serious environmental incidents.",
      author: 'Thomas Wilson',
      position: 'Director of Operations',
      company: 'EcoTrack Environmental'
    },
    technologies: ['React', 'AWS IoT Core', 'AWS Lambda', 'DynamoDB', 'Kinesis', 'TensorFlow', 'Node.js', 'Grafana', 'MQTT'],
    galleryImages: [
      'https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573168710865-2e4c680d921a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    nextProject: 'project-1'
  }
};
