// ACCESS Mentors Database
// Mentors are mapped to career categories so they surface inside individual course pages.

export interface Mentor {
  id: string
  name: string
  title: string
  industry: string
  bio: string
  guidanceAreas: string[]
  /** Career categories this mentor is relevant to (matches Course.category values) */
  categoryTags: string[]
}

// ──────────────────────────────────────────────
//  MENTOR DATABASE
// ──────────────────────────────────────────────

export const mentors: Mentor[] = [
  // Medical & Health Sciences
  {
    id: "m-001",
    name: "Dr. Sarah Wanjiku",
    title: "Consultant Physician & Medical Educator",
    industry: "Medicine & Healthcare",
    bio: "15+ years in clinical practice across leading Kenyan hospitals including KNH and Aga Khan. Passionate about mentoring the next generation of healthcare professionals.",
    guidanceAreas: ["Medical school preparation", "Residency guidance", "Clinical rotations", "Research opportunities", "Specialisation pathways"],
    categoryTags: ["Medical & Health Sciences", "Health Sciences"],
  },
  {
    id: "m-002",
    name: "Dr. James Ochieng",
    title: "Pharmacist & Pharmaceutical Researcher",
    industry: "Pharmacy & Pharmaceutical Sciences",
    bio: "Registered pharmacist with experience in hospital pharmacy and pharmaceutical manufacturing. Advisor on pharmacy career pathways in East Africa.",
    guidanceAreas: ["Pharmacy career paths", "Drug regulation", "Hospital vs retail pharmacy", "Pharmaceutical research"],
    categoryTags: ["Medical & Health Sciences", "Health Sciences"],
  },

  // Engineering & Technology
  {
    id: "m-003",
    name: "Eng. Peter Kamau",
    title: "Senior Civil Engineer",
    industry: "Civil & Structural Engineering",
    bio: "Chartered engineer with 12+ years of experience in infrastructure projects across Kenya and the wider East African region. Registered with the Engineers Board of Kenya.",
    guidanceAreas: ["Engineering licensure (EBK)", "Infrastructure project management", "Graduate trainee programmes", "Postgraduate studies"],
    categoryTags: ["Engineering & Technology", "Technical & Engineering"],
  },
  {
    id: "m-004",
    name: "Eng. Grace Muthoni",
    title: "Electrical & Renewable Energy Engineer",
    industry: "Energy & Electrical Engineering",
    bio: "Specialises in renewable energy systems and power distribution. Worked with Kenya Power and multiple green energy startups.",
    guidanceAreas: ["Renewable energy careers", "Power systems", "Engineering internships", "EBK registration process"],
    categoryTags: ["Engineering & Technology", "Technical & Engineering"],
  },

  // Computing & ICT
  {
    id: "m-005",
    name: "Alex Njoroge",
    title: "Senior Software Engineer",
    industry: "Technology & Software Development",
    bio: "Full-stack developer with experience at Safaricom, Microsoft, and several Nairobi tech startups. Active in the Kenyan tech community and open-source movement.",
    guidanceAreas: ["Software development career paths", "Tech internships", "Building a portfolio", "Freelancing vs employment", "Cloud computing"],
    categoryTags: ["Computing & ICT", "ICT & Computing"],
  },
  {
    id: "m-006",
    name: "Faith Akinyi",
    title: "Cybersecurity Analyst & Consultant",
    industry: "Information Security",
    bio: "Certified cybersecurity professional (CISSP, CEH) with experience protecting critical digital infrastructure for financial institutions in Kenya.",
    guidanceAreas: ["Cybersecurity career roadmap", "Industry certifications", "Ethical hacking", "Digital forensics", "Security consulting"],
    categoryTags: ["Computing & ICT", "ICT & Computing"],
  },

  // Business & Economics
  {
    id: "m-007",
    name: "Catherine Mwangi",
    title: "Chartered Accountant & Business Consultant",
    industry: "Accounting & Finance",
    bio: "CPA(K) holder with Big Four experience at KPMG East Africa. Now runs a boutique consultancy helping SMEs across Kenya with financial strategy.",
    guidanceAreas: ["CPA(K) pathway", "Accounting careers", "Financial modelling", "Audit & assurance", "Starting a consultancy"],
    categoryTags: ["Business & Economics", "Business & Finance"],
  },
  {
    id: "m-008",
    name: "David Kiplagat",
    title: "Actuary & Risk Analyst",
    industry: "Insurance & Risk Management",
    bio: "Fellow of the Institute and Faculty of Actuaries with experience at Jubilee Insurance and UAP Old Mutual. Mentors students through the actuarial examination journey.",
    guidanceAreas: ["Actuarial science exams", "Insurance industry careers", "Data analytics in finance", "Risk management"],
    categoryTags: ["Business & Economics", "Business & Finance"],
  },

  // Education & Teaching
  {
    id: "m-009",
    name: "Mary Njeri",
    title: "Education Policy Specialist & Teacher Trainer",
    industry: "Education",
    bio: "Former high school principal with 18 years in education. Currently advises the Ministry of Education on curriculum development and teacher professional development.",
    guidanceAreas: ["Teaching career progression", "TSC registration", "Education administration", "Curriculum development", "Postgraduate education studies"],
    categoryTags: ["Education & Teaching", "Education & Teacher Training"],
  },

  // Law & Governance
  {
    id: "m-010",
    name: "Advocate Brian Otieno",
    title: "Corporate Lawyer & Legal Consultant",
    industry: "Law & Legal Practice",
    bio: "Advocate of the High Court of Kenya with 10+ years in corporate and commercial law. Previously at Anjarwalla & Khanna (ALN Kenya).",
    guidanceAreas: ["Kenya School of Law preparation", "Pupillage guidance", "Corporate vs litigation practice", "Legal technology", "Bar examinations"],
    categoryTags: ["Law & Governance"],
  },

  // Agriculture & Environmental Sciences
  {
    id: "m-011",
    name: "Dr. John Mwangi",
    title: "Agricultural Scientist & Agribusiness Advisor",
    industry: "Agriculture & Agribusiness",
    bio: "Research scientist at KALRO with expertise in sustainable agriculture and agribusiness development. Helps students bridge the gap between agricultural science and commercial farming.",
    guidanceAreas: ["Agribusiness opportunities", "Agricultural research", "Sustainable farming", "Value chain development", "Postgraduate research"],
    categoryTags: ["Agriculture & Environmental Sciences"],
  },

  // Natural & Physical Sciences
  {
    id: "m-012",
    name: "Dr. Esther Wambui",
    title: "Research Scientist & University Lecturer",
    industry: "Pure & Applied Sciences",
    bio: "PhD in Chemistry from the University of Nairobi. Lectures at a leading Kenyan university while conducting research in materials science.",
    guidanceAreas: ["Research career paths", "Postgraduate scholarships", "Laboratory skills", "Science communication", "Academic publishing"],
    categoryTags: ["Natural & Physical Sciences"],
  },

  // Social Sciences & Humanities
  {
    id: "m-013",
    name: "Diana Chebet",
    title: "Media Producer & Communications Strategist",
    industry: "Media & Communications",
    bio: "Award-winning media professional with experience at NTV, BBC Africa, and multiple digital media agencies. Passionate about nurturing young journalists and content creators.",
    guidanceAreas: ["Journalism career paths", "Digital media production", "Public relations", "Building a media portfolio", "Freelance writing"],
    categoryTags: ["Social Sciences & Humanities"],
  },

  // Creative Arts, Media & Design
  {
    id: "m-014",
    name: "Arch. Samuel Kimani",
    title: "Registered Architect & Urban Designer",
    industry: "Architecture & Design",
    bio: "Registered with BORAQS and has designed commercial and residential projects across Nairobi. Advocates for sustainable African architecture.",
    guidanceAreas: ["Architecture licensure", "Portfolio development", "Sustainable design", "Urban planning careers", "Internship guidance"],
    categoryTags: ["Creative Arts, Media & Design"],
  },

  // Hospitality & Tourism
  {
    id: "m-015",
    name: "Linda Achieng",
    title: "Hotel General Manager & Hospitality Trainer",
    industry: "Hospitality & Tourism",
    bio: "Seasoned hospitality professional with management experience at Sarova Hotels and Radisson Blu. Certified trainer in food safety and hotel operations.",
    guidanceAreas: ["Hospitality management careers", "Hotel internships", "Food & beverage industry", "Tourism entrepreneurship", "International hospitality certifications"],
    categoryTags: ["Hospitality & Tourism"],
  },

  // Trades & Artisan
  {
    id: "m-016",
    name: "Joseph Mutua",
    title: "Master Electrician & TVET Instructor",
    industry: "Electrical Trades",
    bio: "NITA-certified master electrician with 20 years of field experience. Currently teaches at a leading TVET institution and mentors young tradespeople.",
    guidanceAreas: ["Electrical trade licensing", "NITA certification", "Self-employment in trades", "Safety standards", "Advanced trade certifications"],
    categoryTags: ["Electrical & Electronics", "Building & Construction", "Automotive & Mechanics"],
  },
  {
    id: "m-017",
    name: "Ann Wangari",
    title: "Fashion Designer & Textile Entrepreneur",
    industry: "Fashion & Textiles",
    bio: "Founder of a successful Kenyan fashion brand. Trained at Kenya Polytechnic (TUM) and has showcased at Nairobi Fashion Week.",
    guidanceAreas: ["Fashion industry careers", "Starting a clothing business", "Textile sourcing", "Brand building", "Artisan skill development"],
    categoryTags: ["Beauty, Fashion & Hospitality", "Creative Arts, Media & Design"],
  },
]

/** Get mentors relevant to a specific career category */
export function getMentorsForCategory(category: string): Mentor[] {
  return mentors.filter((m) =>
    m.categoryTags.some(
      (tag) => tag.toLowerCase() === category.toLowerCase()
    )
  )
}

/** Get mentors relevant to a course by checking its category */
export function getMentorsForCourse(courseCategory: string): Mentor[] {
  return getMentorsForCategory(courseCategory)
}

/** ACCESS contact details for premium mentorship service */
export const accessContact = {
  phone: "0750226857",
  whatsappNumber: "254750226857",
  email: "254access@gmail.com",
}
