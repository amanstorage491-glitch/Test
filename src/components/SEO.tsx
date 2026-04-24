import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, unknown>;
}

const siteUrl = 'https://nexuscreative.systems';

export default function SEO({
  title,
  description,
  keywords = '',
  image = '/images/abstract-shapes.jpg',
  url = siteUrl,
  type = 'website',
  structuredData,
}: SEOProps) {
  const fullTitle = title === 'Nexus Creative Systems'
    ? title
    : `${title} | Nexus Creative Systems`;
  
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Nexus Creative Systems" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Nexus Creative Systems" />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nexus Creative Systems',
  alternateName: 'Nexus Creative',
  url: siteUrl,
  logo: `${siteUrl}/images/abstract-shapes.jpg`,
  sameAs: [
    'https://www.linkedin.com/company/nexuscreative',
    'https://twitter.com/nexuscreative',
    'https://github.com/nexuscreative',
    'https://www.instagram.com/nexuscreative',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@nexuscreative.systems',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
  description: 'Strategic execution partner at the intersection of technology and creativity. Custom software development, hardware solutions, web development, brand strategy, video production, and digital marketing.',
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nexus Creative Systems',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const serviceSchema = (name: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url,
  provider: {
    '@type': 'Organization',
    name: 'Nexus Creative Systems',
    url: siteUrl,
  },
});

export const articleSchema = (title: string, description: string, url: string, image: string, datePublished: string, dateModified: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: {
    '@type': 'ImageObject',
    url: image.startsWith('http') ? image : `${siteUrl}${image}`,
    width: 1200,
    height: 630,
  },
  url,
  datePublished,
  dateModified,
  author: {
    '@type': 'Organization',
    name: 'Nexus Creative Systems',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Nexus Creative Systems',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/abstract-shapes.jpg`,
    },
  },
});

export const faqSchema = (questions: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer,
    },
  })),
});

export { siteUrl };
