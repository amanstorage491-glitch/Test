export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'Engineer' | 'Elevate';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  features: string[];
  technologies: string[];
  process: string[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: 'software',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    category: 'Engineer',
    description: 'Full-stack development of bespoke software solutions, from enterprise applications to microservices architectures.',
    longDescription: 'We architect and build custom software solutions tailored to your exact business requirements. Our team specializes in scalable enterprise applications, cloud-native microservices, and high-performance backend systems. Whether you need a customer-facing application, internal tooling, or a complete digital platform, we engineer solutions that are robust, secure, and built for growth.',
    image: '/images/case-study-1.jpg',
    tags: ['React', 'Node.js', 'Python', 'Cloud', 'AWS', 'Docker'],
    features: [
      'Enterprise-grade application architecture',
      'Microservices and API development',
      'Database design and optimization',
      'Cloud deployment and DevOps',
      'Third-party integrations',
      'Performance monitoring and optimization',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'],
    process: [
      'Discovery — Requirements gathering and technical planning',
      'Architecture — System design and technology stack selection',
      'Development — Agile sprints with continuous delivery',
      'Testing — Comprehensive QA and security audits',
      'Deployment — Production launch with monitoring',
      'Support — Ongoing maintenance and iteration',
    ],
    faq: [
      {
        question: 'How long does custom software development typically take?',
        answer: 'Project timelines vary based on complexity. A minimum viable product typically takes 8-12 weeks, while enterprise platforms can span 4-6 months. We provide detailed timelines during the discovery phase.',
      },
      {
        question: 'What technologies do you use?',
        answer: 'We are technology-agnostic and select the best stack for your specific needs. Our primary expertise includes React/Next.js for frontend, Node.js/Python for backend, PostgreSQL/MongoDB for databases, and AWS for cloud infrastructure.',
      },
      {
        question: 'Do you provide ongoing maintenance?',
        answer: 'Yes, we offer retainer-based maintenance and support packages. This includes bug fixes, performance monitoring, security updates, and feature enhancements.',
      },
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware & IoT Solutions',
    shortTitle: 'Hardware & IoT',
    category: 'Engineer',
    description: 'Embedded systems, IoT integrations, sensor networks, and hardware-software bridging solutions.',
    longDescription: 'We bridge the physical and digital worlds with custom hardware and IoT solutions. From embedded firmware development to sensor networks and smart device integration, we create connected systems that collect, process, and act on real-world data. Our hardware solutions integrate seamlessly with your software infrastructure.',
    image: '/images/case-study-2.jpg',
    tags: ['Embedded', 'IoT', 'Raspberry Pi', 'Arduino', 'Sensors', 'Firmware'],
    features: [
      'Embedded firmware development',
      'IoT device prototyping and production',
      'Sensor network architecture',
      'Real-time data processing pipelines',
      'Hardware-software integration',
      'Industrial automation systems',
    ],
    technologies: ['C/C++', 'Python', 'MQTT', 'Raspberry Pi', 'Arduino', 'ESP32', 'LoRaWAN', 'Bluetooth LE', 'AWS IoT', 'Edge Computing'],
    process: [
      'Requirements — Define hardware specs and connectivity needs',
      'Prototyping — PCB design and firmware development',
      'Integration — Connect hardware to cloud platforms',
      'Testing — Field testing and calibration',
      'Deployment — Production rollout and monitoring',
      'Iteration — Continuous improvement based on data',
    ],
    faq: [
      {
        question: 'Can you help prototype a hardware product?',
        answer: 'Absolutely. We handle everything from initial concept and PCB design to firmware development and prototyping. We work with rapid prototyping tools to get your hardware concept validated quickly.',
      },
      {
        question: 'What IoT protocols do you support?',
        answer: 'We support MQTT, CoAP, HTTP/REST, WebSockets, LoRaWAN, Bluetooth LE, and Zigbee. Protocol selection depends on your use case, power constraints, and data volume requirements.',
      },
      {
        question: 'Do you handle mass production?',
        answer: 'While we specialize in design and prototyping, we partner with trusted manufacturing facilities and can manage the transition from prototype to production, including supply chain coordination.',
      },
    ],
  },
  {
    slug: 'web',
    title: 'Web Development',
    shortTitle: 'Web Development',
    category: 'Engineer',
    description: 'High-performance websites, e-commerce platforms, and web applications with cutting-edge technologies.',
    longDescription: 'We build websites and web applications that perform. From marketing sites that convert to complex e-commerce platforms and SaaS applications, our web development combines technical excellence with user experience design. Every site we build is optimized for speed, accessibility, and search engine visibility.',
    image: '/images/case-study-1.jpg',
    tags: ['Next.js', 'Three.js', 'Shopify', 'Headless', 'E-commerce', 'CMS'],
    features: [
      'Custom website design and development',
      'E-commerce platform engineering',
      'Headless CMS architectures',
      'Progressive Web Apps (PWA)',
      'Performance optimization',
      'Accessibility compliance (WCAG)',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shopify', 'Sanity', 'Vercel', 'AWS', 'WebGL', 'Three.js'],
    process: [
      'Strategy — Define goals, audience, and technical requirements',
      'Design — Wireframes, UI/UX design, and prototyping',
      'Development — Frontend and backend implementation',
      'Content — CMS setup and content integration',
      'Testing — Cross-browser, performance, and accessibility testing',
      'Launch — Deployment with analytics and monitoring',
    ],
    faq: [
      {
        question: 'Do you build e-commerce websites?',
        answer: 'Yes, we build custom e-commerce solutions on Shopify, headless architectures, and fully custom platforms. We handle everything from product catalogs to payment processing and inventory management.',
      },
      {
        question: 'What about website performance and SEO?',
        answer: 'Performance is built into our development process. We target Core Web Vitals scores in the 90s+, implement proper semantic HTML, structured data, and all technical SEO best practices from day one.',
      },
      {
        question: 'Can you integrate with our existing systems?',
        answer: 'Yes, we specialize in integration work. Whether it is connecting to your CRM, ERP, payment gateway, or custom APIs, we build seamless bridges between your website and existing infrastructure.',
      },
    ],
  },
  {
    slug: 'brand',
    title: 'Brand Strategy & Promotion',
    shortTitle: 'Brand Promotion',
    category: 'Elevate',
    description: 'Strategic brand positioning, identity systems, and market penetration strategies for growth.',
    longDescription: 'We build brands that command attention and drive growth. Our brand strategy process goes deeper than visual identity — we analyze your market, define your positioning, and craft a brand narrative that resonates with your target audience. From logo design to comprehensive brand systems, we create identities that scale.',
    image: '/images/case-study-3.jpg',
    tags: ['Strategy', 'Identity', 'Positioning', 'Launch', 'Guidelines', 'Visual System'],
    features: [
      'Brand strategy and market positioning',
      'Visual identity and logo systems',
      'Brand guidelines and documentation',
      'Market research and competitive analysis',
      'Launch strategy and campaign planning',
      'Brand storytelling and messaging',
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Brand Strategy Frameworks', 'Market Analysis Tools', 'Social Listening', 'A/B Testing'],
    process: [
      'Research — Market analysis, competitor audit, audience research',
      'Strategy — Positioning, messaging, and brand architecture',
      'Identity — Logo, typography, color, and visual language',
      'System — Guidelines, templates, and asset libraries',
      'Launch — Go-to-market strategy and campaign execution',
      'Evolve — Ongoing brand management and iteration',
    ],
    faq: [
      {
        question: 'What does a brand strategy project include?',
        answer: 'A comprehensive brand strategy includes market research, competitive positioning, audience personas, brand architecture, messaging framework, visual identity system, and brand guidelines documentation.',
      },
      {
        question: 'How long does branding take?',
        answer: 'A full brand identity project typically takes 6-10 weeks. Brand strategy alone takes 3-4 weeks, while visual identity development takes 4-6 weeks. Rush timelines are available for specific launch dates.',
      },
      {
        question: 'Do you work with existing brands?',
        answer: 'Yes, we frequently work with existing brands on repositioning, refreshes, and extensions. We can audit your current brand and recommend strategic improvements or a complete overhaul.',
      },
    ],
  },
  {
    slug: 'video',
    title: 'Cinematic Video Production',
    shortTitle: 'Cinematic Editing',
    category: 'Elevate',
    description: 'High-end video production, post-production, color grading, and motion design for brands.',
    longDescription: 'We create video content that captivates. From brand films and product showcases to social media content and documentary-style storytelling, our video production team brings cinematic quality to every frame. Our post-production capabilities include professional color grading, motion graphics, sound design, and visual effects.',
    image: '/images/case-study-3.jpg',
    tags: ['Premiere', 'After Effects', 'Color', 'Motion', 'Sound', 'Direction'],
    features: [
      'Commercial and brand film production',
      'Product video and demonstration',
      'Social media content creation',
      'Motion graphics and animation',
      'Color grading and post-production',
      'Sound design and mixing',
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema 4D', 'Unreal Engine', 'Pro Tools', 'Red Camera', 'Sony FX6', 'DJI Ronin'],
    process: [
      'Concept — Creative direction and storyboarding',
      'Pre-Production — Casting, location scouting, scheduling',
      'Production — Principal photography with cinematic gear',
      'Post-Production — Editing, color, sound, and VFX',
      'Delivery — Multiple formats for all platforms',
      'Distribution — Strategy for maximum reach and impact',
    ],
    faq: [
      {
        question: 'What types of videos do you produce?',
        answer: 'We produce brand films, product videos, commercials, social media content, corporate documentaries, event coverage, and motion graphics. Every project is tailored to your brand and audience.',
      },
      {
        question: 'Do you handle the full production?',
        answer: 'Yes, we are a full-service video production company. We handle creative direction, filming, editing, color grading, sound design, and final delivery. We also offer scriptwriting and casting services.',
      },
      {
        question: 'What is your turnaround time?',
        answer: 'Social media content can be delivered within 1-2 weeks. Brand films and commercials typically take 4-8 weeks from concept to final delivery. Timeline depends on complexity and approvals.',
      },
    ],
  },
  {
    slug: 'marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    category: 'Elevate',
    description: 'Data-driven marketing campaigns, SEO, social strategy, and conversion optimization.',
    longDescription: 'We engineer growth through data-driven digital marketing. Our approach combines deep analytics with creative execution to deliver measurable results. From search engine optimization and paid advertising to social media strategy and content marketing, we build campaigns that attract, engage, and convert your target audience.',
    image: '/images/case-study-1.jpg',
    tags: ['SEO', 'PPC', 'Social', 'Analytics', 'Content', 'CRO'],
    features: [
      'Search engine optimization (SEO)',
      'Pay-per-click advertising (PPC)',
      'Social media strategy and management',
      'Content marketing and copywriting',
      'Conversion rate optimization (CRO)',
      'Marketing analytics and reporting',
    ],
    technologies: ['Google Analytics 4', 'Google Ads', 'Meta Ads', 'HubSpot', 'SEMrush', 'Ahrefs', 'Hotjar', 'Mailchimp', 'Salesforce'],
    process: [
      'Audit — Current performance and competitive analysis',
      'Strategy — Channel selection and campaign architecture',
      'Execution — Content creation and campaign management',
      'Optimize — A/B testing and performance tuning',
      'Report — Regular analytics and insight delivery',
      'Scale — Expand successful campaigns and channels',
    ],
    faq: [
      {
        question: 'How do you measure marketing success?',
        answer: 'We establish clear KPIs before any campaign launches. Metrics vary by channel but typically include ROI, cost per acquisition, conversion rates, engagement rates, and organic traffic growth.',
      },
      {
        question: 'Do you work with specific industries?',
        answer: 'We work across industries including technology, e-commerce, healthcare, finance, and professional services. Our data-driven approach adapts to any market.',
      },
      {
        question: 'What is your minimum engagement period?',
        answer: 'We recommend a minimum 3-month engagement for most marketing services. SEO typically requires 6+ months for significant organic growth. We offer flexible contracts based on your goals.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
