import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: Record<string, any>;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

/**
 * SEO component for managing meta tags and structured data
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  schema,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  twitterCard = 'summary_large_image',
}) => {
  // Generate dynamic OG image if not provided
  const dynamicOgImage = ogImage || 
    generateOGImage(title.replace(/\s+/g, '-').toLowerCase());
    
  // Create full schema with structured data
  const fullSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NexaWeb Digital Agency",
    "description": description,
    "url": canonicalUrl || window.location.href,
    "logo": "https://cdn.example.com/logo.png",
    "sameAs": [
      "https://twitter.com/nexaweb",
      "https://www.facebook.com/nexaweb",
      "https://www.linkedin.com/company/nexaweb",
      "https://www.instagram.com/nexaweb"
    ],
    ...schema
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      <meta property="og:image" content={dynamicOgImage} />
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={dynamicOgImage} />
      
      {/* Structured data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(fullSchema)}
      </script>
    </Helmet>
  );
};

// Helper function to generate OG image URLs
const generateOGImage = (path: string): string => 
  `https://og.nexaweb.com/${encodeURIComponent(path)}.png`;

export default SEO;
