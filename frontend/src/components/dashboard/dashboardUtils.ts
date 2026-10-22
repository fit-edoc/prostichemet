export const AVATAR_LIST = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
];

export const getLeadAvatar = (id: number | string) => {
  const num = typeof id === "number" ? id : (id ? id.toString().charCodeAt(0) : 0);
  return AVATAR_LIST[Math.abs(num) % AVATAR_LIST.length];
};

export const SMB_INDUSTRY_CATEGORIES = [
  {
    group: "Small Business & Commercial Trades",
    options: [
      "Commercial HVAC, Mechanical & Trades",
      "Commercial Cleaning & Facility Services",
      "Construction, Architecture & General Contracting",
      "Commercial Real Estate & Property Management",
      "Landscaping & Exterior Maintenance",
    ],
  },
  {
    group: "Professional & Business Services",
    options: [
      "Accounting, CPA & Financial Advisory",
      "Legal Practices & Corporate Counsel",
      "Staffing, HR & Executive Search",
      "Management & Strategy Consulting",
      "Commercial Insurance & Risk Advisory",
    ],
  },
  {
    group: "Agencies & Marketing",
    options: [
      "Digital Marketing, SEO & Performance Agencies",
      "AI Outbound & Sales Development Agencies",
      "Creative, Branding & Media Production",
      "Public Relations & Communications",
    ],
  },
  {
    group: "IT & Technology",
    options: [
      "IT Managed Service Providers (MSP) & Cloud Support",
      "B2B SaaS & Tech Startups",
      "Cybersecurity, Compliance & Infrastructure",
      "Developer Tools & Software Engineering",
      "Telecommunications & VoIP Services",
    ],
  },
  {
    group: "Industrial, Manufacturing & Logistics",
    options: [
      "Manufacturing & Precision Industrial Goods",
      "Logistics, Freight, Warehousing & 3PL",
      "Wholesale Distribution & B2B Supply",
      "Automotive & Fleet Services",
    ],
  },
  {
    group: "Healthcare & Specialized",
    options: [
      "Healthcare Practices, Clinics & Dental Groups",
      "BioTech & Life Sciences",
      "Hospitality, Catering & Commercial Foodservice",
      "Other Commercial & Local Niche",
    ],
  },
];

export const SMB_COMPANY_SCALE_OPTIONS = [
  "Small Business (1 - 25 employees)",
  "Growing SMB (25 - 100 employees)",
  "Medium-Sized Business (100 - 500 employees)",
  "All Small & Medium Businesses (1 - 500 employees)",
  "Mid-Market to Enterprise (500+ employees)",
];

