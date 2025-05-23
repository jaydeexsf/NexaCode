interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechSolutions Inc.',
    quote: "NexaWeb transformed our online presence with a stunning new website that has increased our conversion rate by 45%. Their team was professional, responsive, and delivered beyond our expectations.",
    rating: 5,
    avatarUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    position: 'Director of Technology',
    company: 'GlobalVision Realty',
    quote: "The virtual tour platform has completely transformed our business. Clients can now view properties from anywhere in the world, and the immersive experience has significantly increased our remote sales.",
    rating: 5,
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'testimonial-3',
    name: 'Jessica Patel',
    position: 'Founder',
    company: 'HealthTech Solutions',
    quote: "NexaWeb delivered an exceptional app that our users love. The AI coach feature has set us apart from competitors, and the intuitive design has resulted in engagement metrics far above industry standards.",
    rating: 5,
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'testimonial-4',
    name: 'Robert Alvarez',
    position: 'Chief Data Officer',
    company: 'FinTech Innovations',
    quote: "The dashboard has revolutionized how we analyze market trends. The intuitive interface and powerful visualization tools have made complex data accessible and actionable for our entire team.",
    rating: 5,
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'testimonial-5',
    name: 'Dr. Elena Rodriguez',
    position: 'Chief Medical Information Officer',
    company: 'MedConnect Health',
    quote: "NexaWeb understood the unique challenges of healthcare technology and delivered a secure, user-friendly platform that has transformed our patient engagement and operational efficiency.",
    rating: 5,
    avatarUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'testimonial-6',
    name: 'Thomas Wilson',
    position: 'Director of Operations',
    company: 'EcoSmart Technologies',
    quote: "The system has revolutionized how we monitor and respond to environmental changes. The real-time analytics and alerting capabilities have helped us prevent several potentially serious incidents.",
    rating: 5,
    avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];
