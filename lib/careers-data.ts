// ACCESS Careers Database
// Structured based on KUCCPS (Kenya Universities and Colleges Central Placement Service) classifications
// Sources: KUCCPS official programme listings, official Kenyan university programme pages,
// accredited TVET and KMTC programme listings.

export interface Institution {
  type: 'public' | 'private' | 'tvet'
  name: string
  location?: string
  notes?: string
}

export interface CareerPathway {
  title: string
  description: string
}

export interface Consideration {
  challenge: string
  description: string
}

export interface CutoffHistoryEntry {
  year: number
  ranges: { high: number; mid: number; low: number }
  notes?: string
}

export interface JobMarketData {
  demandOutlook: string
  trends: string[]
  challenges: string[]
}

export interface SalaryInsights {
  entryLevel: string
  midCareer: string
  seniorLevel: string
}

export interface FunFact {
  fact: string
  category: 'surprising' | 'historical' | 'kenya-specific'
}

export interface Course {
  id: string
  name: string
  programmeLevel: ProgrammeLevel
  category: string
  description: string
  kcseRequirements: string
  careerPaths: string[]
  institutions: string[]
  sourceCitation: string
  // New extended fields for career detail pages
  aboutCareer?: string
  academicStructure?: string
  technicalSkills?: string[]
  softSkills?: string[]
  careerPathways?: CareerPathway[]
  thingsToConsider?: Consideration[]
  detailedInstitutions?: Institution[]
  clusterRequirements?: string
  cutoffHistory?: CutoffHistoryEntry[]
  jobMarketTrends?: JobMarketData
  salaryInsights?: SalaryInsights
  funFacts?: FunFact[]
}

export type ProgrammeLevel = "Degree" | "Diploma" | "Certificate" | "Artisan"

// ──────────────────────────────────────────────
//  KUCCPS CLUSTER POINTS SYSTEM
// ──────────────────────────────────────────────

export type KCSEGrade = "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E"

export const gradeToPoints: Record<KCSEGrade, number> = {
  A: 12,
  "A-": 11,
  "B+": 10,
  B: 9,
  "B-": 8,
  "C+": 7,
  C: 6,
  "C-": 5,
  "D+": 4,
  D: 3,
  "D-": 2,
  E: 1,
}

export const allGrades: KCSEGrade[] = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "E"]

export interface ClusterSubject {
  id: string
  name: string
  group: "compulsory" | "sciences" | "humanities" | "technical"
}

export const clusterSubjects: ClusterSubject[] = [
  // Compulsory
  { id: "maths", name: "Mathematics", group: "compulsory" },
  { id: "english", name: "English", group: "compulsory" },
  { id: "kiswahili", name: "Kiswahili", group: "compulsory" },
  // Sciences
  { id: "physics", name: "Physics", group: "sciences" },
  { id: "chemistry", name: "Chemistry", group: "sciences" },
  { id: "biology", name: "Biology", group: "sciences" },
  // Humanities
  { id: "geography", name: "Geography", group: "humanities" },
  { id: "history", name: "History", group: "humanities" },
  { id: "cre", name: "CRE / IRE", group: "humanities" },
  // Technical
  { id: "computer", name: "Computer Studies", group: "technical" },
  { id: "business", name: "Business Studies", group: "technical" },
  { id: "agriculture", name: "Agriculture", group: "technical" },
  { id: "homescience", name: "Home Science", group: "technical" },
]

export interface CourseCutoff {
  courseId: string
  courseName: string
  programmeLevel: ProgrammeLevel
  category: string
  clusterSubjectIds: string[] // the 4 subjects used for this cluster
  cutoffHigh: number   // highly competitive threshold
  cutoffMid: number    // moderate chance threshold
  cutoffLow: number    // stretch / borderline threshold
}

// Historical KUCCPS estimated cutoff ranges (based on 2022-2024 placement trends)
export const courseCutoffs: CourseCutoff[] = [
  // ── DEGREE: Medical & Health Sciences ──
  { courseId: "d-mhs-001", courseName: "Bachelor of Medicine and Bachelor of Surgery (MBChB)", programmeLevel: "Degree", category: "Medical & Health Sciences", clusterSubjectIds: ["biology", "chemistry", "maths", "physics"], cutoffHigh: 47, cutoffMid: 44, cutoffLow: 42 },
  { courseId: "d-mhs-002", courseName: "Bachelor of Pharmacy (BPharm)", programmeLevel: "Degree", category: "Medical & Health Sciences", clusterSubjectIds: ["chemistry", "biology", "maths", "physics"], cutoffHigh: 45, cutoffMid: 42, cutoffLow: 40 },
  { courseId: "d-mhs-003", courseName: "Bachelor of Science in Nursing", programmeLevel: "Degree", category: "Medical & Health Sciences", clusterSubjectIds: ["biology", "chemistry", "maths", "english"], cutoffHigh: 42, cutoffMid: 38, cutoffLow: 36 },
  { courseId: "d-mhs-004", courseName: "Bachelor of Dental Surgery (BDS)", programmeLevel: "Degree", category: "Medical & Health Sciences", clusterSubjectIds: ["biology", "chemistry", "physics", "maths"], cutoffHigh: 46, cutoffMid: 43, cutoffLow: 41 },
  { courseId: "d-mhs-005", courseName: "Bachelor of Science in Clinical Medicine", programmeLevel: "Degree", category: "Medical & Health Sciences", clusterSubjectIds: ["biology", "chemistry", "maths", "physics"], cutoffHigh: 41, cutoffMid: 38, cutoffLow: 35 },

  // ── DEGREE: Engineering & Technology ──
  { courseId: "d-et-001", courseName: "Bachelor of Science in Civil Engineering", programmeLevel: "Degree", category: "Engineering & Technology", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 44, cutoffMid: 40, cutoffLow: 37 },
  { courseId: "d-et-002", courseName: "Bachelor of Science in Electrical and Electronic Engineering", programmeLevel: "Degree", category: "Engineering & Technology", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 44, cutoffMid: 40, cutoffLow: 37 },
  { courseId: "d-et-003", courseName: "Bachelor of Science in Mechanical Engineering", programmeLevel: "Degree", category: "Engineering & Technology", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 43, cutoffMid: 39, cutoffLow: 36 },
  { courseId: "d-et-004", courseName: "Bachelor of Science in Chemical Engineering", programmeLevel: "Degree", category: "Engineering & Technology", clusterSubjectIds: ["maths", "chemistry", "physics", "english"], cutoffHigh: 42, cutoffMid: 38, cutoffLow: 35 },
  { courseId: "d-et-005", courseName: "Bachelor of Technology in Mechatronic Engineering", programmeLevel: "Degree", category: "Engineering & Technology", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 41, cutoffMid: 37, cutoffLow: 34 },

  // ── DEGREE: Computing & ICT ──
  { courseId: "d-ict-001", courseName: "Bachelor of Science in Computer Science", programmeLevel: "Degree", category: "Computing & ICT", clusterSubjectIds: ["maths", "physics", "english", "chemistry"], cutoffHigh: 42, cutoffMid: 38, cutoffLow: 35 },
  { courseId: "d-ict-002", courseName: "Bachelor of Science in Information Technology", programmeLevel: "Degree", category: "Computing & ICT", clusterSubjectIds: ["maths", "english", "physics", "chemistry"], cutoffHigh: 38, cutoffMid: 34, cutoffLow: 31 },
  { courseId: "d-ict-003", courseName: "Bachelor of Business Information Technology (BBIT)", programmeLevel: "Degree", category: "Computing & ICT", clusterSubjectIds: ["maths", "english", "business", "physics"], cutoffHigh: 37, cutoffMid: 33, cutoffLow: 30 },
  { courseId: "d-ict-004", courseName: "Bachelor of Science in Software Engineering", programmeLevel: "Degree", category: "Computing & ICT", clusterSubjectIds: ["maths", "physics", "english", "chemistry"], cutoffHigh: 41, cutoffMid: 37, cutoffLow: 34 },
  { courseId: "d-ict-005", courseName: "Bachelor of Science in Cybersecurity and Digital Forensics", programmeLevel: "Degree", category: "Computing & ICT", clusterSubjectIds: ["maths", "physics", "english", "chemistry"], cutoffHigh: 40, cutoffMid: 36, cutoffLow: 33 },

  // ── DEGREE: Business & Economics ──
  { courseId: "d-be-001", courseName: "Bachelor of Commerce (BCom)", programmeLevel: "Degree", category: "Business & Economics", clusterSubjectIds: ["maths", "english", "business", "kiswahili"], cutoffHigh: 38, cutoffMid: 34, cutoffLow: 31 },
  { courseId: "d-be-002", courseName: "Bachelor of Science in Economics", programmeLevel: "Degree", category: "Business & Economics", clusterSubjectIds: ["maths", "english", "geography", "business"], cutoffHigh: 37, cutoffMid: 33, cutoffLow: 30 },
  { courseId: "d-be-003", courseName: "Bachelor of Science in Actuarial Science", programmeLevel: "Degree", category: "Business & Economics", clusterSubjectIds: ["maths", "english", "physics", "chemistry"], cutoffHigh: 45, cutoffMid: 42, cutoffLow: 39 },
  { courseId: "d-be-004", courseName: "Bachelor of Science in Finance", programmeLevel: "Degree", category: "Business & Economics", clusterSubjectIds: ["maths", "english", "business", "kiswahili"], cutoffHigh: 37, cutoffMid: 33, cutoffLow: 30 },

  // ── DEGREE: Education & Teaching ──
  { courseId: "d-edu-001", courseName: "Bachelor of Education (Arts)", programmeLevel: "Degree", category: "Education & Teaching", clusterSubjectIds: ["english", "kiswahili", "history", "geography"], cutoffHigh: 36, cutoffMid: 32, cutoffLow: 29 },
  { courseId: "d-edu-002", courseName: "Bachelor of Education (Science)", programmeLevel: "Degree", category: "Education & Teaching", clusterSubjectIds: ["maths", "physics", "chemistry", "biology"], cutoffHigh: 37, cutoffMid: 33, cutoffLow: 30 },

  // ── DEGREE: Law & Governance ──
  { courseId: "d-lg-001", courseName: "Bachelor of Laws (LLB)", programmeLevel: "Degree", category: "Law & Governance", clusterSubjectIds: ["english", "kiswahili", "history", "cre"], cutoffHigh: 44, cutoffMid: 41, cutoffLow: 38 },

  // ── DEGREE: Agriculture & Environmental Sciences ──
  { courseId: "d-ae-001", courseName: "Bachelor of Science in Agriculture", programmeLevel: "Degree", category: "Agriculture & Environmental Sciences", clusterSubjectIds: ["biology", "chemistry", "maths", "agriculture"], cutoffHigh: 36, cutoffMid: 32, cutoffLow: 28 },
  { courseId: "d-ae-002", courseName: "Bachelor of Science in Environmental Science", programmeLevel: "Degree", category: "Agriculture & Environmental Sciences", clusterSubjectIds: ["biology", "chemistry", "geography", "maths"], cutoffHigh: 35, cutoffMid: 31, cutoffLow: 28 },

  // ── DEGREE: Natural & Physical Sciences ──
  { courseId: "d-ns-001", courseName: "Bachelor of Science in Mathematics", programmeLevel: "Degree", category: "Natural & Physical Sciences", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 39, cutoffMid: 35, cutoffLow: 32 },
  { courseId: "d-ns-002", courseName: "Bachelor of Science in Physics", programmeLevel: "Degree", category: "Natural & Physical Sciences", clusterSubjectIds: ["physics", "maths", "chemistry", "english"], cutoffHigh: 38, cutoffMid: 34, cutoffLow: 31 },
  { courseId: "d-ns-003", courseName: "Bachelor of Science in Chemistry", programmeLevel: "Degree", category: "Natural & Physical Sciences", clusterSubjectIds: ["chemistry", "maths", "physics", "biology"], cutoffHigh: 37, cutoffMid: 33, cutoffLow: 30 },

  // ── DEGREE: Social Sciences & Humanities ──
  { courseId: "d-ss-001", courseName: "Bachelor of Arts in Communication and Media Studies", programmeLevel: "Degree", category: "Social Sciences & Humanities", clusterSubjectIds: ["english", "kiswahili", "history", "geography"], cutoffHigh: 36, cutoffMid: 32, cutoffLow: 29 },
  { courseId: "d-ss-002", courseName: "Bachelor of Psychology", programmeLevel: "Degree", category: "Social Sciences & Humanities", clusterSubjectIds: ["english", "biology", "kiswahili", "history"], cutoffHigh: 37, cutoffMid: 33, cutoffLow: 30 },

  // ── DEGREE: Creative Arts, Media & Design ──
  { courseId: "d-cam-001", courseName: "Bachelor of Architecture", programmeLevel: "Degree", category: "Creative Arts, Media & Design", clusterSubjectIds: ["maths", "physics", "english", "chemistry"], cutoffHigh: 42, cutoffMid: 38, cutoffLow: 35 },
  { courseId: "d-cam-002", courseName: "Bachelor of Fine Arts", programmeLevel: "Degree", category: "Creative Arts, Media & Design", clusterSubjectIds: ["english", "kiswahili", "history", "geography"], cutoffHigh: 33, cutoffMid: 29, cutoffLow: 26 },

  // ── DIPLOMA: Health Sciences ──
  { courseId: "dip-hs-001", courseName: "Diploma in Clinical Medicine and Surgery", programmeLevel: "Diploma", category: "Health Sciences", clusterSubjectIds: ["biology", "chemistry", "maths", "english"], cutoffHigh: 34, cutoffMid: 30, cutoffLow: 26 },
  { courseId: "dip-hs-002", courseName: "Diploma in Kenya Registered Community Health Nursing (KRCHN)", programmeLevel: "Diploma", category: "Health Sciences", clusterSubjectIds: ["biology", "chemistry", "english", "maths"], cutoffHigh: 32, cutoffMid: 28, cutoffLow: 24 },
  { courseId: "dip-hs-003", courseName: "Diploma in Pharmacy", programmeLevel: "Diploma", category: "Health Sciences", clusterSubjectIds: ["chemistry", "biology", "maths", "english"], cutoffHigh: 33, cutoffMid: 29, cutoffLow: 25 },
  { courseId: "dip-hs-004", courseName: "Diploma in Medical Laboratory Sciences", programmeLevel: "Diploma", category: "Health Sciences", clusterSubjectIds: ["biology", "chemistry", "maths", "physics"], cutoffHigh: 32, cutoffMid: 28, cutoffLow: 24 },

  // ── DIPLOMA: Technical & Engineering ──
  { courseId: "dip-te-001", courseName: "Diploma in Electrical and Electronic Engineering", programmeLevel: "Diploma", category: "Technical & Engineering", clusterSubjectIds: ["maths", "physics", "english", "chemistry"], cutoffHigh: 30, cutoffMid: 26, cutoffLow: 22 },
  { courseId: "dip-te-002", courseName: "Diploma in Mechanical Engineering", programmeLevel: "Diploma", category: "Technical & Engineering", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 30, cutoffMid: 26, cutoffLow: 22 },
  { courseId: "dip-te-003", courseName: "Diploma in Civil Engineering", programmeLevel: "Diploma", category: "Technical & Engineering", clusterSubjectIds: ["maths", "physics", "chemistry", "english"], cutoffHigh: 30, cutoffMid: 26, cutoffLow: 22 },

  // ── DIPLOMA: ICT & Computing ──
  { courseId: "dip-ict-001", courseName: "Diploma in Information Communication Technology", programmeLevel: "Diploma", category: "ICT & Computing", clusterSubjectIds: ["maths", "english", "physics", "business"], cutoffHigh: 28, cutoffMid: 24, cutoffLow: 20 },

  // ── DIPLOMA: Business & Finance ──
  { courseId: "dip-bf-001", courseName: "Diploma in Business Management", programmeLevel: "Diploma", category: "Business & Finance", clusterSubjectIds: ["maths", "english", "business", "kiswahili"], cutoffHigh: 28, cutoffMid: 24, cutoffLow: 20 },
  { courseId: "dip-bf-002", courseName: "Diploma in Accounting", programmeLevel: "Diploma", category: "Business & Finance", clusterSubjectIds: ["maths", "english", "business", "kiswahili"], cutoffHigh: 28, cutoffMid: 24, cutoffLow: 20 },

  // ── DIPLOMA: Education & Teacher Training ──
  { courseId: "dip-ed-001", courseName: "Diploma in Primary Teacher Education (PTE)", programmeLevel: "Diploma", category: "Education & Teacher Training", clusterSubjectIds: ["english", "kiswahili", "maths", "cre"], cutoffHigh: 26, cutoffMid: 22, cutoffLow: 18 },

  // ── DIPLOMA: Hospitality & Tourism ──
  { courseId: "dip-ht-001", courseName: "Diploma in Hospitality Management", programmeLevel: "Diploma", category: "Hospitality & Tourism", clusterSubjectIds: ["english", "kiswahili", "business", "geography"], cutoffHigh: 26, cutoffMid: 22, cutoffLow: 18 },
  { courseId: "dip-ht-002", courseName: "Diploma in Food and Beverage Management", programmeLevel: "Diploma", category: "Hospitality & Tourism", clusterSubjectIds: ["english", "biology", "chemistry", "business"], cutoffHigh: 26, cutoffMid: 22, cutoffLow: 18 },
]

/** Calculate cluster points from 4 subject grades */
export function calculateClusterPoints(grades: { subjectId: string; grade: KCSEGrade }[]): number {
  if (grades.length < 4) return 0
  // Sum the top 4 subject grade points
  const points = grades
    .map((g) => gradeToPoints[g.grade])
    .sort((a, b) => b - a)
    .slice(0, 4)
  return points.reduce((sum, p) => sum + p, 0)
}

/** Match courses the student qualifies for based on their cluster points and subjects */
export function matchCoursesForStudent(
  subjectGrades: { subjectId: string; grade: KCSEGrade }[]
): {
  highlyCompetitive: (CourseCutoff & { studentPoints: number })[]
  moderateChance: (CourseCutoff & { studentPoints: number })[]
  stretchOptions: (CourseCutoff & { studentPoints: number })[]
} {
  const results = {
    highlyCompetitive: [] as (CourseCutoff & { studentPoints: number })[],
    moderateChance: [] as (CourseCutoff & { studentPoints: number })[],
    stretchOptions: [] as (CourseCutoff & { studentPoints: number })[],
  }

  const subjectMap = new Map(subjectGrades.map((g) => [g.subjectId, g.grade]))

  for (const cutoff of courseCutoffs) {
    // Check if the student has grades for the required cluster subjects
    const matchingGrades = cutoff.clusterSubjectIds
      .map((sid) => {
        const grade = subjectMap.get(sid)
        return grade ? gradeToPoints[grade] : null
      })
      .filter((p): p is number => p !== null)

    if (matchingGrades.length < 4) continue // student doesn't have all required subjects

    const studentPoints = matchingGrades
      .sort((a, b) => b - a)
      .slice(0, 4)
      .reduce((sum, p) => sum + p, 0)

    const entry = { ...cutoff, studentPoints }

    if (studentPoints >= cutoff.cutoffHigh) {
      results.highlyCompetitive.push(entry)
    } else if (studentPoints >= cutoff.cutoffMid) {
      results.moderateChance.push(entry)
    } else if (studentPoints >= cutoff.cutoffLow) {
      results.stretchOptions.push(entry)
    }
  }

  // Sort each category by how much the student exceeds the cutoff
  results.highlyCompetitive.sort((a, b) => b.studentPoints - a.studentPoints)
  results.moderateChance.sort((a, b) => b.studentPoints - a.studentPoints)
  results.stretchOptions.sort((a, b) => b.studentPoints - a.studentPoints)

  return results
}

export interface ProgrammeCategory {
  level: ProgrammeLevel
  categories: string[]
}

export const programmeLevels: ProgrammeLevel[] = [
  "Degree",
  "Diploma",
  "Certificate",
  "Artisan",
]

export const programmeCategories: ProgrammeCategory[] = [
  {
    level: "Degree",
    categories: [
      "Medical & Health Sciences",
      "Engineering & Technology",
      "Computing & ICT",
      "Business & Economics",
      "Education & Teaching",
      "Law & Governance",
      "Agriculture & Environmental Sciences",
      "Natural & Physical Sciences",
      "Social Sciences & Humanities",
      "Creative Arts, Media & Design",
    ],
  },
  {
    level: "Diploma",
    categories: [
      "Health Sciences",
      "Technical & Engineering",
      "ICT & Computing",
      "Business & Finance",
      "Education & Teacher Training",
      "Hospitality & Tourism",
      "Agriculture & Animal Sciences",
      "Construction & Building",
      "Media & Creative Studies",
    ],
  },
  {
    level: "Certificate",
    categories: [
      "Business & Entrepreneurship",
      "ICT & Computer Skills",
      "Hospitality & Tourism",
      "Technical Trades",
      "Health Support Services",
      "Agriculture Skills",
    ],
  },
  {
    level: "Artisan",
    categories: [
      "Electrical & Electronics",
      "Mechanical & Automotive",
      "Construction Trades",
      "Metal & Fabrication",
      "Plumbing & Water Technology",
      "Beauty & Fashion Trades",
    ],
  },
]

// ──────────────────────────────────────────────
//  DEGREE PROGRAMMES
// ──────────────────────────────────────────────

const degreeCourses: Course[] = [
  // ── Medical & Health Sciences ──
  {
    id: "d-mhs-001",
    name: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A six-year professional degree programme that trains students in clinical medicine, surgery, and patient care. Graduates are eligible for registration by the Kenya Medical Practitioners and Dentists Council.",
    kcseRequirements:
      "Mean grade A- (minus) and above. Must have A in Biology and Chemistry, and B+ in Mathematics/Physics and English/Kiswahili.",
    careerPaths: [
      "Medical Doctor",
      "Surgeon",
      "General Practitioner",
      "Medical Researcher",
      "Public Health Officer",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
      "Kenyatta University",
      "Egerton University",
      "Maseno University",
      "JKUAT",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi School of Medicine — https://healthsciences.uonbi.ac.ke",
    // Extended fields for career detail pages
    aboutCareer:
      "Medicine is the science and practice of diagnosing, treating, and preventing diseases and injuries in humans. As a medical doctor, you'll take the oath to serve humanity with integrity and compassion. In Kenya, doctors work in hospitals, clinics, private practice, research institutions, and international organizations. The profession demands continuous learning, ethical practice, and dedication to improving public health outcomes.",
    academicStructure:
      "The MBChB programme is a 6-year full-time degree consisting of 2 years of pre-clinical sciences (anatomy, physiology, biochemistry), 2 years of para-clinical sciences (pathology, pharmacology, microbiology), and 2 years of clinical practice in hospital departments. Students complete 2 months of internship post-graduation before provisional registration with the Medical and Dentists Board of Kenya.",
    technicalSkills: [
      "Clinical diagnosis and patient assessment",
      "Surgical techniques and procedures",
      "Pharmacotherapy and medication management",
      "Medical research methodologies",
      "Healthcare informatics and EHR systems",
      "Pathology interpretation",
      "Radiology and medical imaging analysis",
    ],
    softSkills: [
      "Patient communication and empathy",
      "Team collaboration and leadership",
      "Critical thinking and problem-solving",
      "Time management under pressure",
      "Emotional resilience and stress management",
      "Ethical decision-making",
      "Cultural sensitivity and adaptability",
    ],
    careerPathways: [
      {
        title: "Hospital Medicine",
        description: "Work in public or private hospitals as a resident, specialist, or consultant. Manage patient care, lead medical teams, and develop expertise in specific medical disciplines.",
      },
      {
        title: "General Practice",
        description: "Establish your own clinic or work in group practices. Provide primary healthcare, manage chronic diseases, and serve as a first point of contact for patients.",
      },
      {
        title: "Surgical Specialization",
        description: "Pursue surgical specialties like orthopedics, cardiothoracic surgery, or neurosurgery. Perform complex surgical procedures and lead surgical teams.",
      },
      {
        title: "Public Health & Policy",
        description: "Work with government health ministries, WHO, or NGOs on health policy, disease prevention, and population health management programs.",
      },
      {
        title: "Medical Research",
        description: "Conduct clinical trials, medical research, and contribute to advancing medical knowledge. Work in academic institutions or research-focused organizations.",
      },
      {
        title: "International Medicine",
        description: "Work with international organizations like Médecins Sans Frontières or UNICEF on global health initiatives, humanitarian work, and capacity building.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "High Entry Requirements",
        description: "You need excellent grades in sciences, especially Biology and Chemistry. Competition for admission is intense with very limited slots.",
      },
      {
        challenge: "Long Training Period",
        description: "The 6-year degree is demanding and requires sustained academic commitment. Clinical years involve long shifts and overnight calls.",
      },
      {
        challenge: "High Student Debt",
        description: "Many medical schools charge high fees. Consider scholarships and bursaries. Loan repayment plans may be necessary.",
      },
      {
        challenge: "Emotional Toll",
        description: "Dealing with suffering, death, and ethical dilemmas can be emotionally draining. You'll need strong support systems and mental health awareness.",
      },
      {
        challenge: "Work-Life Balance",
        description: "Medical practice often requires on-call duties, emergency cases, and long working hours. Work-life balance can be challenging, especially early in your career.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi - School of Medicine", location: "Nairobi", notes: "Leading medical school in East Africa" },
      { type: "public", name: "Moi University - School of Medicine", location: "Eldoret", notes: "Strong clinical training programs" },
      { type: "public", name: "Kenyatta University - School of Medicine", location: "Nairobi", notes: "Growing medical education hub" },
      { type: "private", name: "Mount Kenya University - School of Medicine", location: "Nairobi", notes: "Accredited private medical school" },
      { type: "private", name: "Strathmore University - School of Medicine", location: "Nairobi", notes: "Recently accredited medical program" },
    ],
    clusterRequirements:
      "Compulsory: English/Kiswahili. Core Sciences: Biology (A), Chemistry (A), Physics/Mathematics (B+). Mean grade A- (minus) or above calculated from best four subjects.",
    cutoffHistory: [
      {
        year: 2024,
        ranges: { high: 47, mid: 44, low: 42 },
        notes: "Highly competitive. Most admitted students had A- or above.",
      },
      {
        year: 2023,
        ranges: { high: 48, mid: 45, low: 43 },
        notes: "Slightly higher cutoff due to increased applicants.",
      },
      {
        year: 2022,
        ranges: { high: 46, mid: 43, low: 41 },
        notes: "Normal admission year.",
      },
    ],
    jobMarketTrends: {
      demandOutlook:
        "Kenya has a critical shortage of doctors. The WHO recommends 1 doctor per 1,000 people, but Kenya has only 1 per 1,500+. Demand is very high across public and private sectors.",
      trends: [
        "Growing demand for specialists in oncology, cardiology, and neurosurgery",
        "Increased need for doctors in rural areas with financial incentives",
        "Telemedicine and digital health creating new opportunities",
        "Rising private healthcare sector growth",
        "Government commitment to universal healthcare coverage creating more positions",
      ],
      challenges: [
        "Brain drain: Many doctors migrate to Europe, USA, and Gulf countries for better pay and work conditions",
        "Limited specialist positions in public sector",
        "Low remuneration in government health system compared to private practice",
        "Challenges with professional licensing in some countries",
      ],
    },
    salaryInsights: {
      entryLevel: "KES 50,000 - 80,000/month",
      midCareer: "KES 150,000 - 250,000/month",
      seniorLevel: "KES 300,000+/month",
    },
    funFacts: [
      {
        fact: "The oldest medical school in East Africa is the University of Nairobi School of Medicine, established in 1967.",
        category: "historical",
      },
      {
        fact: "Kenya produces around 200-300 new doctors annually, but the country needs 3,000+ per year to meet health demands.",
        category: "kenya-specific",
      },
      {
        fact: "The first Kenyan to win the Nobel Prize in Physiology or Medicine was Bernhard Lown, though he worked internationally.",
        category: "historical",
      },
      {
        fact: "Nairobi's Kenyatta National Hospital is the largest hospital in East Africa and a major training ground for doctors.",
        category: "kenya-specific",
      },
      {
        fact: "Medical school in Kenya has one of the highest gender ratios with many more women entering the profession recently.",
        category: "surprising",
      },
    ],
  },
  {
    id: "d-mhs-002",
    name: "Bachelor of Pharmacy (BPharm)",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A five-year programme covering pharmaceutical sciences, pharmacology, and clinical pharmacy. Graduates are registered by the Pharmacy and Poisons Board of Kenya.",
    kcseRequirements:
      "Mean grade A- (minus). Must have A- in Chemistry and Biology, B+ in Mathematics/Physics.",
    careerPaths: [
      "Pharmacist",
      "Pharmaceutical Researcher",
      "Drug Regulatory Officer",
      "Clinical Pharmacist",
      "Pharmaceutical Sales Representative",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Mount Kenya University",
      "JKUAT",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi School of Pharmacy — https://pharmacy.uonbi.ac.ke",
    // Extended fields for career detail pages
    aboutCareer:
      "Pharmacy is a healthcare profession focused on the safe and effective use of medications. Pharmacists are medication experts who work to ensure patients receive the right drugs, at the right dose, at the right time. In Kenya, pharmacists work in community pharmacies, hospitals, pharmaceutical industries, regulatory agencies, and research institutions. The profession is evolving toward clinical pharmacy with pharmacists taking more active roles in patient care.",
    academicStructure:
      "The BPharm programme is 5 years of full-time study comprising 2 years of pharmaceutical sciences (chemistry, botany, pharmaceutics, pharmacology), 2 years of clinical pharmacy and therapeutics, and 1 year of experiential learning through internship in community and hospital settings. Final year includes modules on pharmacy management and professional practice.",
    technicalSkills: [
      "Drug formulation and compounding",
      "Pharmacokinetics and pharmacodynamics",
      "Pharmaceutical analysis and quality control",
      "Clinical pharmacy and patient counseling",
      "Drug interactions and contraindication identification",
      "Pharmacy management systems",
      "Regulatory compliance and Good Pharmacy Practice",
    ],
    softSkills: [
      "Patient communication and health education",
      "Attention to detail",
      "Problem-solving in medication therapy",
      "Team collaboration with healthcare providers",
      "Ethical practice and professional responsibility",
      "Empathy and customer service orientation",
      "Time management",
    ],
    careerPathways: [
      {
        title: "Community Pharmacy",
        description: "Own or manage a community pharmacy. Dispense medications, counsel patients, manage inventory, and run a business. This is the most common career path in Kenya.",
      },
      {
        title: "Hospital Pharmacy",
        description: "Work in hospital pharmacies managing medication supplies, ensuring quality, and collaborating with healthcare teams on clinical medication use.",
      },
      {
        title: "Pharmaceutical Industry",
        description: "Work in drug manufacturing, quality assurance, regulatory affairs, or sales. Opportunities with local and international pharmaceutical companies.",
      },
      {
        title: "Drug Regulatory Affairs",
        description: "Work with the Pharmacy and Poisons Board or pharmaceutical companies ensuring medicines meet safety and efficacy standards.",
      },
      {
        title: "Clinical Pharmacy Specialist",
        description: "Provide advanced clinical pharmacy services, manage drug therapy, conduct medication reviews, and educate healthcare providers.",
      },
      {
        title: "Pharmaceutical Research",
        description: "Conduct clinical trials, drug discovery research, or pharmacovigilance studies in academic or research institutions.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Competition for Licenses",
        description: "Only licensed pharmacies can operate. Getting a pharmacy license requires capital investment and meeting regulatory requirements. Spots are limited.",
      },
      {
        challenge: "Regulatory Complexity",
        description: "Pharmacy practice is heavily regulated. You must stay updated with changing regulations, which requires continuous professional development.",
      },
      {
        challenge: "Drug Supply Issues",
        description: "Sourcing quality, affordable medicines can be challenging in Kenya. Managing supplier relationships and prices impacts profitability.",
      },
      {
        challenge: "Scope Limitations",
        description: "In Kenya, pharmacists' clinical roles are still developing. Many work primarily in dispensing rather than clinical practice.",
      },
      {
        challenge: "Salary vs. Investment",
        description: "Community pharmacy owners can earn well, but require significant initial capital. Hospital pharmacists earn less but have job security.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi - School of Pharmacy", location: "Nairobi", notes: "Largest and most established pharmacy school" },
      { type: "public", name: "Kenyatta University - School of Pharmacy", location: "Nairobi", notes: "Growing pharmacy program" },
      { type: "public", name: "JKUAT - School of Pharmacy", location: "Nairobi", notes: "Strong industrial pharmacy focus" },
      { type: "private", name: "Mount Kenya University - School of Pharmacy", location: "Nairobi", notes: "Accredited private pharmacy program" },
      { type: "private", name: "Strathmore University - School of Pharmacy", location: "Nairobi", notes: "Recently launched pharmacy program" },
    ],
    clusterRequirements:
      "Compulsory: English/Kiswahili. Core Sciences: Chemistry (A-), Biology (A-), Physics/Mathematics (B+). Mean grade A- (minus) or above from best four subjects.",
    cutoffHistory: [
      {
        year: 2024,
        ranges: { high: 45, mid: 42, low: 40 },
        notes: "Competitive but slightly lower than medicine.",
      },
      {
        year: 2023,
        ranges: { high: 44, mid: 41, low: 39 },
        notes: "Increasing demand for pharmacists.",
      },
      {
        year: 2022,
        ranges: { high: 43, mid: 40, low: 38 },
        notes: "Steady demand year.",
      },
    ],
    jobMarketTrends: {
      demandOutlook:
        "Growing demand for pharmacists across hospitals, community pharmacies, and industry. Kenya's healthcare expansion and increased focus on medication safety is driving employment growth.",
      trends: [
        "Clinical pharmacy services expanding in hospitals",
        "Increasing private healthcare sector offering pharmacy opportunities",
        "Pharmacy chains creating management and leadership positions",
        "Pharmaceutical industry growth with local manufacturing expansion",
        "Digital pharmacy and e-health platforms emerging",
      ],
      challenges: [
        "Oversupply of pharmacists in Nairobi; fewer opportunities in rural areas",
        "Salary competition from other allied health professionals",
        "Limited clinical pharmacy advancement in government sector",
        "Counterfeit drug problem affecting reputation",
        "Dependence on patient purchasing power in private settings",
      ],
    },
    salaryInsights: {
      entryLevel: "KES 40,000 - 70,000/month",
      midCareer: "KES 100,000 - 180,000/month",
      seniorLevel: "KES 200,000+/month (depends on business ownership)",
    },
    funFacts: [
      {
        fact: "The Pharmacy and Poisons Board of Kenya, established in 1979, regulates all pharmaceutical practice in the country.",
        category: "kenya-specific",
      },
      {
        fact: "Kenya produces approximately 400-500 pharmacists annually, but faces a supply-demand imbalance in rural areas.",
        category: "kenya-specific",
      },
      {
        fact: "The first female pharmacist in Kenya was Njeri Karanja, who practiced in the 1960s.",
        category: "historical",
      },
      {
        fact: "Nairobi's pharmaceutical industry supplies medications to the entire East African region.",
        category: "kenya-specific",
      },
      {
        fact: "Pharmacist-led clinics for chronic disease management are becoming more common in Kenya.",
        category: "surprising",
      },
    ],
  },
  {
    id: "d-mhs-003",
    name: "Bachelor of Science in Nursing",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A professional healthcare degree that trains individuals to become registered nurses responsible for patient care, health promotion, disease prevention, and rehabilitation. Nurses act as the primary link between doctors, patients, and families.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Biology (Mandatory), Chemistry (Mandatory), Mathematics or Physics, English or Kiswahili. Typical cluster cut-off: ~40-44 points",
    careerPaths: [
      "Registered Nurse",
      "Midwife",
      "Community Health Nurse",
      "Emergency Room Nurse",
      "Intensive Care Nurse",
      "Pediatric Nurse",
      "Maternity Nurse",
      "Nursing Educator",
      "Nurse Manager",
      "International Humanitarian Nurse",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
      "Kenyatta University",
      "Masinde Muliro University",
      "Kenya Methodist University",
      "Mount Kenya University",
      "Aga Khan University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Nursing Council of Kenya — https://nckenya.com",
    aboutCareer:
      "Bachelor of Science in Nursing trains individuals to become professional nurses who provide hands-on patient care, health education, and community health services. Nursing is people-centered work focusing on holistic patient well-being—physical, emotional, psychological, and social.",
    academicStructure:
      "4 years of university study (8 semesters) plus 1-year mandatory internship. Years 1-2: Human Anatomy & Physiology, Microbiology, Biochemistry, Nutrition, Psychology, Sociology, Fundamentals of Nursing, Communication Skills. Years 3-4: Medical-Surgical Nursing, Pediatric Nursing, Maternal & Neonatal Nursing, Mental Health Nursing, Community Health Nursing, Emergency & Critical Care Nursing. Internship: Rotations in General Nursing, Maternal & Child Health, Community Health, Mental Health.",
    technicalSkills: [
      "Patient assessment and monitoring",
      "Medication administration",
      "Emergency response",
      "Infection control",
      "Clinical documentation",
      "Wound care",
    ],
    softSkills: [
      "Communication and empathy",
      "Teamwork and collaboration",
      "Stress management",
      "Critical thinking",
      "Cultural sensitivity",
      "Compassion and patience",
    ],
    careerPathways: [
      {
        title: "Hospital Nurse",
        description: "Provide direct patient care in hospital settings, managing medical and surgical patients.",
      },
      {
        title: "Community Health Nurse",
        description: "Deliver preventive and primary healthcare services in community settings and health centers.",
      },
      {
        title: "Intensive Care Nurse",
        description: "Specialize in caring for critically ill patients in ICU settings with advanced monitoring skills.",
      },
      {
        title: "International Nurse",
        description: "Work globally for humanitarian organizations, international hospitals, or development agencies.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Physically Demanding Work",
        description: "Long shifts, night duties, and physical exertion are part of nursing practice.",
      },
      {
        challenge: "Emotional Stress",
        description: "Exposure to illness, trauma, and patient suffering requires emotional resilience.",
      },
      {
        challenge: "Continuous Learning Required",
        description: "Professional licensing renewal and ongoing education are mandatory.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "private", name: "Mount Kenya University", location: "Thika" },
      { type: "private", name: "Aga Khan University", location: "Nairobi" },
    ],
    clusterRequirements: "Biology (Mandatory), Chemistry (Mandatory), Mathematics or Physics, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 44, mid: 40, low: 38 }, notes: "High competition due to strong demand" },
    ],
    jobMarketTrends: {
      demandOutlook: "Kenya faces a major nursing shortage with WHO recommending 1 nurse per 400 people but Kenya has about 1 per 900+. Strong employment opportunities both locally and internationally.",
      trends: [
        "Critical shortage of nurses in Kenya",
        "High international demand, especially UK and Middle East",
        "Growing opportunities in community health",
        "Expansion of private healthcare creating new positions",
      ],
      challenges: [
        "Limited government hiring budgets",
        "Significant brain drain to international opportunities",
        "Understaffing in rural health facilities",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 30,000 - 50,000/month (Intern), KSh 60,000 - 120,000/month (Registered)",
      midCareer: "KSh 120,000 – 250,000/month",
      seniorLevel: "KSh 300,000 - 600,000+/month (Specialists and international nurses earn more)",
    },
    funFacts: [
      {
        fact: "Nursing is one of the oldest professions, with modern nursing beginning in the 1800s with Florence Nightingale.",
        category: "historical",
      },
      {
        fact: "Nurses spend more time with patients than doctors, providing about 80% of direct patient care.",
        category: "surprising",
      },
      {
        fact: "Nursing is globally ranked as one of the most trusted professions for decades.",
        category: "surprising",
      },
      {
        fact: "Kenya has over 100,000 registered nurses but still faces severe shortages in rural areas.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-mhs-004",
    name: "Bachelor of Dental Surgery (BDS)",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A professional healthcare degree that trains individuals to become dentists—medical professionals who diagnose, treat, and prevent diseases affecting teeth, gums, mouth, and overall oral health. Dentistry combines medical and technical precision work.",
    kcseRequirements:
      "KCSE Mean Grade: B+ (plus) and above. Biology (Mandatory), Chemistry (Mandatory), Physics or Mathematics, English or Kiswahili. Typical cluster cut-off: ~40-46 points",
    careerPaths: [
      "General Dentist",
      "Dental Specialist",
      "Oral Surgeon",
      "Orthodontist",
      "Pediatric Dentist",
      "Periodontist",
      "Prosthodontist",
      "Dental Public Health Officer",
      "Dental Researcher",
      "Private Dental Practice Owner",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
      "Maseno University",
      "Aga Khan University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi Dental School — https://healthsciences.uonbi.ac.ke",
    aboutCareer:
      "Bachelor of Dental Surgery trains individuals to become dentists—medical professionals who diagnose and treat oral diseases, perform surgical procedures, and promote oral health. Dentistry is both a medical and technical career combining scientific knowledge with precise manual skills.",
    academicStructure:
      "5 years university study (10 semesters) plus 1-year mandatory internship. Years 1-2: Human Anatomy, Physiology, Biochemistry, Oral Biology, Dental Materials Science, Histology, Microbiology, Pathology, Laboratory training in tooth anatomy and dental instruments. Years 3-5: Oral Surgery, Orthodontics, Periodontology, Prosthodontics, Pediatric Dentistry, Preventive Dentistry, Oral Radiology, Patient treatment under supervision. Internship: General Dentistry, Oral Surgery, Community Dental Health, Pediatric Dentistry.",
    technicalSkills: [
      "Dental diagnosis and treatment",
      "Tooth restoration techniques",
      "Oral surgery skills",
      "Radiographic interpretation",
      "Dental prosthetic design",
      "Manual precision and hand-eye coordination",
    ],
    softSkills: [
      "Patient communication and empathy",
      "Attention to detail",
      "Problem-solving",
      "Precision and manual dexterity",
      "Patience",
    ],
    careerPathways: [
      {
        title: "General Dentist",
        description: "Provide comprehensive dental care including examinations, treatments, and preventive services to patients.",
      },
      {
        title: "Dental Specialist",
        description: "Specialize in areas like orthodontics, surgery, or pediatric dentistry with advanced training.",
      },
      {
        title: "Private Dental Clinic Owner",
        description: "Establish and manage own dental practice with potential for high income.",
      },
      {
        title: "Hospital Dental Officer",
        description: "Provide dental services in hospital settings with access to advanced equipment.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Very Competitive Admissions",
        description: "Among the most competitive courses with highest entry requirements.",
      },
      {
        challenge: "Physically and Mentally Demanding",
        description: "Requires long hours standing, high concentration, and manual precision.",
      },
      {
        challenge: "Expensive Equipment for Private Practice",
        description: "Starting private practice requires significant capital investment.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "private", name: "Aga Khan University", location: "Nairobi" },
    ],
    clusterRequirements: "Biology (Mandatory), Chemistry (Mandatory), Physics or Mathematics, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 46, mid: 43, low: 41 }, notes: "Among the most competitive courses in Kenya" },
    ],
    jobMarketTrends: {
      demandOutlook: "High demand but limited training slots. Kenya has fewer than 2,000 dentists for a population of over 50 million—far below WHO recommendations.",
      trends: [
        "Growing demand for cosmetic dentistry in urban areas",
        "Limited local dental professionals creating shortages",
        "International recruitment opportunities, especially in developed countries",
        "Private dental clinics expanding rapidly",
      ],
      challenges: [
        "Very few universities offer dental training",
        "Highly competitive admissions",
        "High startup costs for private practice",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 70,000 - 100,000/month (Intern), KSh 120,000 - 250,000/month (Newly licensed)",
      midCareer: "KSh 300,000 – 600,000/month",
      seniorLevel: "KSh 700,000 - 1M+/month (Specialists and private practice owners)",
    },
    funFacts: [
      {
        fact: "Tooth enamel is the hardest substance in the human body, even stronger than bone.",
        category: "surprising",
      },
      {
        fact: "Ancient dentists used gold fillings—dental work dates back over 4,000 years.",
        category: "historical",
      },
      {
        fact: "Kenya has fewer than 2,000 dentists despite a population of over 50 million.",
        category: "kenya-specific",
      },
      {
        fact: "Teeth are unique like fingerprints—no two people have identical dental patterns.",
        category: "surprising",
      },
    ],
  },
  {
    id: "d-mhs-005",
    name: "Bachelor of Science in Clinical Medicine",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A professional healthcare degree that trains students to become Clinical Officers—mid-level medical practitioners who diagnose illnesses, treat patients, prescribe medication, and perform minor surgical procedures. They play a critical role especially in rural healthcare.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Biology (Mandatory), Chemistry (Mandatory), Mathematics or Physics, English or Kiswahili. Typical cluster cut-off: ~36-42 points",
    careerPaths: [
      "Clinical Officer",
      "Emergency Care Officer",
      "Public Health Officer",
      "Community Health Practitioner",
      "Hospital Clinical Officer",
      "NGO Healthcare Practitioner",
      "Health Facility Manager",
      "Medical Researcher",
    ],
    institutions: [
      "Kenyatta University",
      "Moi University",
      "Egerton University",
      "Kenya Methodist University",
      "Kenya Medical Training College",
      "Mount Kenya University",
      "Jaramogi Oginga Odinga University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Clinical Officers Council — https://clinicalofficerscouncil.org",
    aboutCareer:
      "Bachelor of Science in Clinical Medicine trains mid-level medical practitioners who diagnose and treat illnesses, manage patients, and provide healthcare services. Clinical Officers fill a critical gap in Kenya's healthcare system, providing over 70% of primary healthcare services.",
    academicStructure:
      "4 years university study (8 semesters) plus 1-year mandatory internship. Years 1-2: Human Anatomy, Physiology, Biochemistry, Microbiology, Pharmacology, Pathology, Community Health. Years 3-4: Internal Medicine, Surgery, Pediatrics, Obstetrics & Gynecology, Emergency Medicine, Community Health. Internship: Rotations in General Medicine, Surgery, Pediatrics, Maternal Health.",
    technicalSkills: [
      "Patient diagnosis and treatment planning",
      "Minor surgical procedures",
      "Emergency response",
      "Medication prescription",
      "Community health assessment",
      "Medical documentation",
    ],
    softSkills: [
      "Communication and empathy",
      "Critical thinking",
      "Decision-making under pressure",
      "Teamwork and collaboration",
      "Problem-solving",
      "Emotional resilience",
    ],
    careerPathways: [
      {
        title: "Hospital Clinical Officer",
        description: "Provide diagnostic and treatment services in hospital settings, working alongside doctors.",
      },
      {
        title: "Community Health Practitioner",
        description: "Deliver primary healthcare services in community health centers and remote clinics.",
      },
      {
        title: "Emergency Care Officer",
        description: "Specialize in emergency medicine and trauma response in hospitals.",
      },
      {
        title: "Health Facility Manager",
        description: "Manage operations of health facilities and lead healthcare teams.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "High Responsibility",
        description: "Responsible for patient diagnoses and treatment decisions directly affecting lives.",
      },
      {
        challenge: "Long Working Hours",
        description: "Often work long shifts, including nights and emergency duty rotations.",
      },
      {
        challenge: "Emotional Stress",
        description: "Exposure to medical emergencies and patient suffering requires emotional resilience.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Kenya Medical Training College", location: "Nairobi" },
      { type: "private", name: "Mount Kenya University", location: "Thika" },
    ],
    clusterRequirements: "Biology (Mandatory), Chemistry (Mandatory), Mathematics or Physics, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 42, mid: 36, low: 34 }, notes: "High but slightly lower competition than MBChB" },
    ],
    jobMarketTrends: {
      demandOutlook: "Very high demand profession. Kenya faces a doctor shortage, making clinical officers extremely important for healthcare delivery.",
      trends: [
        "Clinical officers provide over 70% of primary healthcare in Kenya",
        "Strong employment in government hospitals and health centers",
        "Growing private healthcare sector creating new opportunities",
        "International recruitment for East African positions",
      ],
      challenges: [
        "Government sector hiring dependent on budgets",
        "Limited opportunities for advancement without further study",
        "Understaffing in rural facilities",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 35,000 - 60,000/month (Intern), KSh 70,000 - 150,000/month (Registered)",
      midCareer: "KSh 150,000 – 300,000/month",
      seniorLevel: "KSh 300,000 - 600,000+/month (Specialists in private practice)",
    },
    funFacts: [
      {
        fact: "Clinical Officers treat most patients in Kenya and provide the majority of primary healthcare services.",
        category: "kenya-specific",
      },
      {
        fact: "The Clinical Officer profession exists mainly in Africa and a few other regions globally.",
        category: "surprising",
      },
      {
        fact: "Kenya has over 30,000 Clinical Officers making them a major part of the healthcare workforce.",
        category: "kenya-specific",
      },
      {
        fact: "Some Clinical Officers later pursue MBChB to become doctors after gaining experience.",
        category: "surprising",
      },
    ],
  },

  // ── Engineering & Technology ──
  {
    id: "d-et-001",
    name: "Bachelor of Science in Civil Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A professional degree focused on the design, construction, and maintenance of infrastructure such as roads, bridges, buildings, dams, water systems, and transport networks. It combines mathematics, physics, engineering principles, and practical construction skills.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics (very important), Physics (very important), Chemistry, English or Kiswahili. Typical cluster cut-off: ~44-48+ points",
    careerPaths: [
      "Civil Engineer",
      "Structural Engineer",
      "Construction Manager",
      "Site Engineer",
      "Highway Engineer",
      "Water Resources Engineer",
      "Quantity Surveyor",
      "Urban Infrastructure Planner",
      "Project Manager",
      "Site Supervisor",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Technical University of Kenya",
      "Dedan Kimathi University of Technology",
      "Strathmore University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Engineers Board of Kenya — https://ebk.go.ke",
    aboutCareer:
      "Bachelor of Science in Civil Engineering trains individuals to become engineers who design, build, and maintain critical infrastructure. Civil engineers solve complex problems related to transportation, water resources, structural safety, and sustainable development.",
    academicStructure:
      "5 years (10 semesters). Year 1: Engineering Mathematics, Physics for Engineers, Engineering Drawing, Computer Programming, Introduction to Engineering. Year 2: Mechanics of Materials, Structural Analysis, Surveying, Fluid Mechanics, Engineering Geology. Year 3: Reinforced Concrete Design, Transportation Engineering, Hydrology, Soil Mechanics, Construction Materials. Year 4: Structural Design, Environmental Engineering, Highway Engineering, Water Supply Systems, Project Management. Year 5: Engineering Project/Research, Construction Management, Advanced Structural Analysis, Engineering Ethics.",
    technicalSkills: [
      "Structural design and analysis",
      "Construction planning",
      "Technical drawing and modeling",
      "Project management",
      "Environmental impact assessment",
      "Problem-solving and critical thinking",
    ],
    softSkills: [
      "Project management",
      "Team leadership",
      "Communication",
      "Problem-solving",
      "Decision-making",
      "Site management",
    ],
    careerPathways: [
      {
        title: "Civil Engineer",
        description: "Design and oversee construction of infrastructure projects like roads, buildings, and bridges.",
      },
      {
        title: "Structural Engineer",
        description: "Specialize in designing safe, durable building and bridge structures.",
      },
      {
        title: "Construction Manager",
        description: "Manage construction projects, budgets, timelines, and teams.",
      },
      {
        title: "Infrastructure Planner",
        description: "Plan and develop transportation networks, water systems, and urban infrastructure.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Very Demanding Academically",
        description: "Requires exceptional math and physics knowledge over 5 years.",
      },
      {
        challenge: "Long Working Hours on Sites",
        description: "Site work often requires extended hours and outdoor work in various weather.",
      },
      {
        challenge: "Safety Risks in Construction",
        description: "Construction environments carry inherent safety hazards.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Technical University of Kenya", location: "Nairobi" },
    ],
    clusterRequirements: "Mathematics (very important), Physics (very important), Chemistry, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 48, mid: 44, low: 41 }, notes: "One of the most competitive engineering programs" },
    ],
    jobMarketTrends: {
      demandOutlook: "High demand both locally and globally. Kenya's infrastructure development driving strong employment.",
      trends: [
        "Growing infrastructure projects in Kenya (roads, railways, dams)",
        "International opportunities in Gulf countries and Africa",
        "Strong demand for construction managers and site engineers",
        "Sustainable infrastructure creating new green engineering roles",
      ],
      challenges: [
        "Academically demanding program with high failure rates",
        "Limited positions in public sector",
        "Competition from experienced engineers",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 60,000 – 120,000/month",
      midCareer: "KSh 150,000 – 300,000/month",
      seniorLevel: "KSh 400,000+/month (Senior engineers and project managers)",
    },
    funFacts: [
      {
        fact: "Civil engineering is the oldest engineering discipline, dating back to Roman times.",
        category: "historical",
      },
      {
        fact: "The Great Wall of China, Egyptian pyramids, and modern skyscrapers are all civil engineering achievements.",
        category: "surprising",
      },
      {
        fact: "Kenya's infrastructure development (Standard Gauge Railway, highways) is driven by civil engineers.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-et-002",
    name: "Bachelor of Science in Electrical and Electronic Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A professional degree focused on the design, development, and maintenance of electrical systems, electronics, telecommunications, and power technologies. It covers electricity generation, circuits, automation, robotics, and renewable energy.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics (very important), Physics (very important), Chemistry, English or Kiswahili. Typical cluster cut-off: ~44-50+ points",
    careerPaths: [
      "Electrical Engineer",
      "Electronics Engineer",
      "Telecommunications Engineer",
      "Power Systems Engineer",
      "Automation Engineer",
      "Robotics Engineer",
      "Renewable Energy Engineer",
      "Instrumentation Engineer",
      "Design Engineer",
      "System Integration Engineer",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Technical University of Kenya",
      "Dedan Kimathi University of Technology",
      "Strathmore University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Engineers Board of Kenya — https://ebk.go.ke",
    aboutCareer:
      "Bachelor of Science in Electrical and Electronic Engineering trains individuals to design, develop, and maintain electrical and electronic systems. Electrical engineers work on power generation, distribution, telecommunications, automation, and emerging renewable energy technologies.",
    academicStructure:
      "5 years (10 semesters). Year 1: Engineering Mathematics, Physics for Engineers, Computer Programming, Engineering Drawing, Introduction to Electrical Engineering. Year 2: Circuit Theory, Electronics I, Digital Logic Systems, Electromagnetics, Signals and Systems. Year 3: Power Systems Engineering, Control Systems, Microprocessors, Communication Systems, Electrical Machines. Year 4: Renewable Energy Systems, Embedded Systems, Industrial Automation, Telecommunications Engineering, Power Electronics. Year 5: Engineering Project/Research, Smart Grid Technology, Robotics and Automation, Engineering Management, Professional Ethics.",
    technicalSkills: [
      "Electrical system design",
      "Circuit analysis and troubleshooting",
      "Programming and automation",
      "Power system management",
      "Technical drawing and modeling",
      "Problem-solving and innovation",
    ],
    softSkills: [
      "Technical communication",
      "Team collaboration",
      "Project management",
      "Problem-solving",
      "Innovation thinking",
      "Systems thinking",
    ],
    careerPathways: [
      {
        title: "Electrical Engineer",
        description: "Design and maintain electrical systems for power generation, distribution, and utilization.",
      },
      {
        title: "Telecommunications Engineer",
        description: "Design and manage communication networks and infrastructure.",
      },
      {
        title: "Power Systems Engineer",
        description: "Design and optimize power generation and distribution systems.",
      },
      {
        title: "Automation Engineer",
        description: "Design and implement automated systems for industrial and manufacturing processes.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Very Mathematically Intensive",
        description: "Requires complex technical understanding of electrical theory and mathematics.",
      },
      {
        challenge: "Demanding Practical and Laboratory Work",
        description: "Extensive lab work and hands-on experimentation required.",
      },
      {
        challenge: "Rapidly Evolving Technology",
        description: "Must continuously learn new technologies and industry developments.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Technical University of Kenya", location: "Nairobi" },
    ],
    clusterRequirements: "Mathematics (very important), Physics (very important), Chemistry, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 50, mid: 44, low: 40 }, notes: "Among the most competitive engineering programs" },
    ],
    jobMarketTrends: {
      demandOutlook: "Extremely high demand globally. Power utilities, telecom, tech companies actively recruit.",
      trends: [
        "Growing renewable energy sector (solar, wind, geothermal)",
        "Telecommunications expansion creating opportunities",
        "Industrial automation and IoT driving demand",
        "Strong international opportunities in developed nations",
      ],
      challenges: [
        "Highly competitive and academically demanding",
        "Limited entry positions without experience",
        "Continuous skill updates required for salary growth",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 70,000 – 130,000/month",
      midCareer: "KSh 150,000 – 350,000/month",
      seniorLevel: "KSh 400,000+/month (Senior engineers and executives)",
    },
    funFacts: [
      {
        fact: "Electricity powers modern civilization—electrical engineers make this possible.",
        category: "surprising",
      },
      {
        fact: "Thomas Edison and Nikola Tesla were among the greatest electrical engineers in history.",
        category: "historical",
      },
      {
        fact: "Kenya's power sector relies heavily on electrical engineers for generation and distribution.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-et-003",
    name: "Bachelor of Science in Mechanical Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A professional degree focused on the design, manufacturing, operation, and maintenance of machines and mechanical systems. It combines physics, mathematics, materials science, and engineering design for practical problem-solving.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics (very important), Physics (very important), Chemistry, English or Kiswahili. Typical cluster cut-off: ~44-48+ points",
    careerPaths: [
      "Mechanical Engineer",
      "Automotive Engineer",
      "Manufacturing Engineer",
      "Maintenance Engineer",
      "Energy Systems Engineer",
      "Robotics Engineer",
      "Industrial Engineer",
      "Plant Engineer",
      "Project Manager",
      "Design Engineer",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Technical University of Kenya",
      "Dedan Kimathi University of Technology",
      "Strathmore University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Engineers Board of Kenya — https://ebk.go.ke",
    aboutCareer:
      "Bachelor of Science in Mechanical Engineering trains individuals to design and maintain mechanical systems, engines, machines, and industrial equipment. Mechanical engineers work on vehicles, engines, manufacturing systems, robotics, and renewable energy systems.",
    academicStructure:
      "5 years (10 semesters). Year 1: Engineering Mathematics, Physics for Engineers, Engineering Drawing, Computer Programming, Introduction to Mechanical Engineering. Year 2: Engineering Mechanics, Thermodynamics, Materials Science, Fluid Mechanics, Manufacturing Processes. Year 3: Machine Design, Heat Transfer, Control Systems, Mechanical Vibrations, Engineering Materials. Year 4: Automotive Engineering, Renewable Energy Systems, Industrial Engineering, Robotics and Automation, Mechatronics. Year 5: Engineering Project/Research, Plant Engineering, Maintenance Engineering, Engineering Management, Professional Ethics.",
    technicalSkills: [
      "Mechanical design and analysis",
      "Problem-solving and innovation",
      "Manufacturing and production planning",
      "Technical drawing and modeling",
      "Maintenance and repair skills",
      "Project management",
    ],
    softSkills: [
      "Creative problem-solving",
      "Team leadership",
      "Communication",
      "Project management",
      "Decision-making",
      "Innovation thinking",
    ],
    careerPathways: [
      {
        title: "Mechanical Engineer",
        description: "Design, test, and improve mechanical systems and machines for various industries.",
      },
      {
        title: "Automotive Engineer",
        description: "Design and develop automobile engines, systems, and components.",
      },
      {
        title: "Manufacturing Engineer",
        description: "Optimize manufacturing processes and production efficiency.",
      },
      {
        title: "Robotics Engineer",
        description: "Design and program robotic systems for industrial automation.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Very Demanding Academically",
        description: "Requires strong technical skills and understanding of complex systems.",
      },
      {
        challenge: "Physically Demanding Fieldwork",
        description: "Site work often requires physical effort and exposure to industrial environments.",
      },
      {
        challenge: "Continuous Learning Required",
        description: "Rapidly evolving technology requires staying current with innovations.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Technical University of Kenya", location: "Nairobi" },
    ],
    clusterRequirements: "Mathematics (very important), Physics (very important), Chemistry, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 48, mid: 43, low: 39 }, notes: "Highly competitive engineering program" },
    ],
    jobMarketTrends: {
      demandOutlook: "Broad career opportunities globally. Manufacturing, automotive, energy, and tech sectors actively recruit.",
      trends: [
        "Growing renewable energy sector creating opportunities",
        "Automotive industry expansion in East Africa",
        "Industrial automation increasing robotics demand",
        "Strong international opportunities in developed countries",
      ],
      challenges: [
        "Highly demanding program with high attrition",
        "Competition from experience and specialization",
        "Salary growth requires continuous skill development",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 60,000 – 120,000/month",
      midCareer: "KSh 150,000 – 300,000/month",
      seniorLevel: "KSh 400,000+/month (Senior engineers and managers)",
    },
    funFacts: [
      {
        fact: "Mechanical engineering is the broadest engineering discipline with applications in every industry.",
        category: "surprising",
      },
      {
        fact: "The first steam engine invented by Thomas Newcomen was a mechanical engineering breakthrough.",
        category: "historical",
      },
      {
        fact: "Kenya's manufacturing sector increasingly relies on mechanical engineers for innovation.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-et-004",
    name: "Bachelor of Science in Chemical Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A five-year programme training students in process engineering, industrial chemistry, and material science for manufacturing and processing industries.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have A- in Mathematics, B+ in Chemistry and Physics.",
    careerPaths: [
      "Chemical Engineer",
      "Process Engineer",
      "Petroleum Engineer",
      "Environmental Engineer",
      "Quality Control Engineer",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
      "JKUAT",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi Faculty of Engineering — https://engineering.uonbi.ac.ke",
  },
  {
    id: "d-et-005",
    name: "Bachelor of Technology in Mechatronic Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A programme combining mechanical, electronic, and computer engineering. Focuses on robotics, automation, and intelligent systems design.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have A- in Mathematics, B+ in Physics.",
    careerPaths: [
      "Mechatronics Engineer",
      "Robotics Engineer",
      "Automation Specialist",
      "IoT Systems Engineer",
    ],
    institutions: [
      "JKUAT",
      "Dedan Kimathi University of Technology",
      "Technical University of Kenya",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; JKUAT Academic Programmes — https://jkuat.ac.ke",
  },

  // ── Computing & ICT ──
  {
    id: "d-ict-001",
    name: "Bachelor of Science in Computer Science",
    programmeLevel: "Degree",
    category: "Computing & ICT",
    description:
      "A four-year programme covering algorithms, software engineering, databases, artificial intelligence, and computer systems. One of the most popular tech programmes in Kenya.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have B+ in Mathematics, B in Physics and English.",
    careerPaths: [
      "Software Engineer",
      "Data Scientist",
      "Systems Analyst",
      "AI/Machine Learning Engineer",
      "Cybersecurity Analyst",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Strathmore University",
      "Kenyatta University",
      "Maseno University",
      "Dedan Kimathi University of Technology",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi School of Computing — https://computing.uonbi.ac.ke",
  },
  {
    id: "d-ict-002",
    name: "Bachelor of Science in Information Technology",
    programmeLevel: "Degree",
    category: "Computing & ICT",
    description:
      "A four-year programme focusing on network administration, web development, information systems, and IT project management.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Mathematics, C+ in Physics and English.",
    careerPaths: [
      "IT Manager",
      "Network Administrator",
      "Web Developer",
      "Database Administrator",
      "IT Consultant",
    ],
    institutions: [
      "JKUAT",
      "Strathmore University",
      "Kenyatta University",
      "Moi University",
      "Multimedia University of Kenya",
      "KCA University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; JKUAT School of Computing — https://jkuat.ac.ke",
  },
  {
    id: "d-ict-003",
    name: "Bachelor of Business Information Technology (BBIT)",
    programmeLevel: "Degree",
    category: "Computing & ICT",
    description:
      "A four-year programme integrating business management with information technology. Focuses on e-commerce, enterprise systems, and IT strategy.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Mathematics, C+ in English.",
    careerPaths: [
      "Business Analyst",
      "IT Project Manager",
      "ERP Consultant",
      "Systems Administrator",
      "Digital Transformation Specialist",
    ],
    institutions: [
      "Strathmore University",
      "JKUAT",
      "KCA University",
      "Kenyatta University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Strathmore University — https://strathmore.edu",
  },
  {
    id: "d-ict-004",
    name: "Bachelor of Science in Software Engineering",
    programmeLevel: "Degree",
    category: "Computing & ICT",
    description:
      "A four-year programme specializing in software design, development methodologies, quality assurance, and DevOps practices.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have B+ in Mathematics, B in Physics.",
    careerPaths: [
      "Software Developer",
      "Full-Stack Engineer",
      "DevOps Engineer",
      "Mobile App Developer",
      "Quality Assurance Engineer",
    ],
    institutions: [
      "JKUAT",
      "Strathmore University",
      "Multimedia University of Kenya",
      "Dedan Kimathi University of Technology",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; JKUAT School of Computing — https://jkuat.ac.ke",
  },
  {
    id: "d-ict-005",
    name: "Bachelor of Science in Cybersecurity and Digital Forensics",
    programmeLevel: "Degree",
    category: "Computing & ICT",
    description:
      "A programme focusing on information security, ethical hacking, digital forensics, and cyber law. Addresses the growing need for cybersecurity professionals in Kenya.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have B+ in Mathematics, B in Physics.",
    careerPaths: [
      "Cybersecurity Analyst",
      "Penetration Tester",
      "Digital Forensics Investigator",
      "Security Architect",
      "Compliance Officer",
    ],
    institutions: [
      "KCA University",
      "Strathmore University",
      "Multimedia University of Kenya",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Communications Authority of Kenya — https://ca.go.ke",
  },

  // ── Business & Economics ──
  {
    id: "d-be-001",
    name: "Bachelor of Commerce (BCom)",
    programmeLevel: "Degree",
    category: "Business & Economics",
    description:
      "A four-year programme covering accounting, finance, marketing, human resource management, and business administration. One of Kenya's most enrolled programmes.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Mathematics, C+ in English.",
    careerPaths: [
      "Accountant",
      "Financial Analyst",
      "Marketing Manager",
      "Human Resource Manager",
      "Auditor",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Strathmore University",
      "Moi University",
      "Egerton University",
      "JKUAT",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi Faculty of Commerce — https://business.uonbi.ac.ke",
  },
  {
    id: "d-be-002",
    name: "Bachelor of Science in Economics",
    programmeLevel: "Degree",
    category: "Business & Economics",
    description:
      "A degree program that focuses on understanding how money, resources, markets, and decision-making affect individuals, businesses, and governments. It combines mathematics, statistics, and economic theory to analyze real-world issues.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics, English or Kiswahili, Business Studies/Geography/History, Any Group II subject. Typical cluster cut-off: ~36-42 points",
    careerPaths: [
      "Economist",
      "Policy Analyst",
      "Research Analyst",
      "Financial Analyst",
      "Investment Analyst",
      "Insurance Analyst",
      "Data Analyst",
      "Market Research Analyst",
      "Development Consultant",
      "Statistician",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Strathmore University",
      "Egerton University",
      "Government ministries",
      "Central banks",
      "Research institutions",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
    aboutCareer:
      "Bachelor of Science in Economics trains individuals to become economists who analyze economic trends, develop policy recommendations, and solve complex economic problems. Graduates understand how markets function at local and global levels and can inform strategic decisions.",
    academicStructure:
      "4 years (8 semesters). Year 1: Principles of Microeconomics, Principles of Macroeconomics, Business Mathematics, Introduction to Statistics, Communication Skills. Year 2: Intermediate Microeconomics, Intermediate Macroeconomics, Econometrics I, Public Finance, Development Economics. Year 3: Monetary Economics, International Trade, Economic Policy Analysis, Mathematical Economics, Econometrics II. Year 4: Project/Research Thesis, Industrial Economics, Financial Economics, Environmental Economics, Economic Planning.",
    technicalSkills: [
      "Data analysis and interpretation",
      "Statistical modeling",
      "Financial and economic forecasting",
      "Policy analysis",
      "Research and reporting",
      "Problem-solving skills",
    ],
    softSkills: [
      "Critical thinking and decision-making",
      "Research skills",
      "Communication and writing",
      "Analytical reasoning",
      "Teamwork and collaboration",
    ],
    careerPathways: [
      {
        title: "Economist",
        description: "Analyze economic data, forecast trends, and advise governments or organizations on economic policy.",
      },
      {
        title: "Policy Analyst",
        description: "Research and evaluate government or organizational policies, proposing improvements based on economic analysis.",
      },
      {
        title: "Financial Analyst",
        description: "Analyze financial markets and make investment recommendations based on economic indicators.",
      },
      {
        title: "Development Consultant",
        description: "Work with NGOs and international organizations to design development programs and poverty alleviation strategies.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Strong Mathematics Required",
        description: "Requires strong mathematical skills for econometrics and statistical modeling.",
      },
      {
        challenge: "Heavy Statistics and Data Analysis",
        description: "Course is intensive in statistics and data analysis work.",
      },
      {
        challenge: "Competitive Job Market",
        description: "Without specialization, job competition can be fierce.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "private", name: "Strathmore University", location: "Nairobi" },
      { type: "public", name: "Egerton University", location: "Nakuru" },
    ],
    clusterRequirements: "Mathematics, English or Kiswahili, Business Studies/Geography/History, Any Group II science subject",
    cutoffHistory: [
      { year: 2024, ranges: { high: 42, mid: 37, low: 33 }, notes: "Moderate to high competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "Steady demand in government, finance, and research institutions. Economics graduates are highly versatile and employable.",
      trends: [
        "Growing need for economic analysts in development sector",
        "Increased demand in fintech and banking",
        "Strong demand for policy researchers",
        "International organizations actively recruiting",
      ],
      challenges: [
        "Requires specialization for competitive advantage",
        "Government sector hiring depends on budgets",
        "Skill gaps in data science and programming",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 40,000 – 80,000/month",
      midCareer: "KSh 100,000 – 250,000/month",
      seniorLevel: "KSh 300,000+ (Senior economists and consultants)",
    },
    funFacts: [
      {
        fact: "Economics is called the social science because it studies human behavior in resource allocation.",
        category: "surprising",
      },
      {
        fact: "Kenya's Central Bank employs many economics graduates for monetary policy analysis.",
        category: "kenya-specific",
      },
      {
        fact: "Economists help predict inflation, unemployment, and economic growth trends that affect everyone.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-be-003",
    name: "Bachelor of Science in Actuarial Science",
    programmeLevel: "Degree",
    category: "Business & Economics",
    description:
      "A highly specialized degree focused on risk analysis, financial forecasting, statistics, and insurance mathematics. Actuaries use mathematical and statistical methods to predict future risks and help organizations make safe financial decisions.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics (very important), English or Kiswahili, Business Studies/Geography/History, Physics or any science subject. Typical cluster cut-off: ~40-48 points",
    careerPaths: [
      "Actuary",
      "Risk Analyst",
      "Investment Analyst",
      "Insurance Underwriter",
      "Financial Consultant",
      "Pension Consultant",
      "Data Scientist",
      "Quantitative Analyst",
      "Bank Risk Manager",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Strathmore University",
      "Kenyatta University",
      "Insurance companies",
      "Pension funds",
      "Investment firms",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Insurance Regulatory Authority — https://ira.go.ke",
    aboutCareer:
      "Bachelor of Science in Actuarial Science trains individuals to become actuaries—highly specialized professionals who analyze risk and uncertainty using mathematics and statistics. They help organizations understand financial implications of future events and make strategic decisions.",
    academicStructure:
      "4 years (8 semesters). Year 1: Calculus I & II, Linear Algebra, Principles of Microeconomics, Financial Accounting, Introduction to Programming, Business Communication. Year 2: Probability Theory, Mathematical Statistics, Financial Mathematics, Risk Theory, Macroeconomics, Investment Principles. Year 3: Life Contingencies, Actuarial Modelling, Insurance Mathematics, Corporate Finance, Stochastic Processes, Econometrics. Year 4: Pension Mathematics, Risk Management, Derivatives & Financial Engineering, Actuarial Project/Research, Investment & Portfolio Management.",
    technicalSkills: [
      "Advanced mathematical modelling",
      "Risk assessment and forecasting",
      "Financial analysis",
      "Data interpretation",
      "Investment planning",
      "Statistical programming",
      "Problem-solving under uncertainty",
    ],
    softSkills: [
      "Analytical thinking",
      "Complex problem-solving",
      "Communication of technical concepts",
      "Decision-making under uncertainty",
      "Attention to detail",
    ],
    careerPathways: [
      {
        title: "Actuary",
        description: "Analyze risk and uncertainty for insurance companies, pension funds, and investment firms to ensure financial stability.",
      },
      {
        title: "Risk Manager",
        description: "Identify, assess, and mitigate financial and operational risks for organizations.",
      },
      {
        title: "Investment Analyst",
        description: "Use statistical models to analyze investments and recommend portfolio allocation strategies.",
      },
      {
        title: "Data Scientist",
        description: "Apply actuarial and statistical expertise to solve business problems using data analytics.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Very Mathematically Intensive",
        description: "Requires exceptional mathematical ability and mastery of complex theories.",
      },
      {
        challenge: "Professional Exams are Difficult",
        description: "Society of Actuaries and IFA exams require extensive additional study and have low pass rates.",
      },
      {
        challenge: "Highly Competitive Field",
        description: "Limited actuarial positions available despite high demand.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "private", name: "Strathmore University", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
    ],
    clusterRequirements: "Mathematics (very important), English or Kiswahili, Business Studies/Geography/History, Physics or any science subject",
    cutoffHistory: [
      { year: 2024, ranges: { high: 48, mid: 44, low: 41 }, notes: "Among the most competitive and highest-paying programs" },
    ],
    jobMarketTrends: {
      demandOutlook: "Extremely high demand globally. Actuaries are among the most sought-after professionals in finance and insurance.",
      trends: [
        "Strong global demand for actuaries in insurance and pensions",
        "Growing opportunities in risk management and data science",
        "International firms actively recruiting Kenyan actuaries",
        "Fintech creating new actuarial roles",
      ],
      challenges: [
        "Difficult professional exams to pass",
        "Limited positions available in Kenya",
        "Requires continuous professional development",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 70,000 – 120,000/month",
      midCareer: "KSh 150,000 – 350,000/month",
      seniorLevel: "KSh 400,000 – 1M+ (Among the highest paid careers in Kenya)",
    },
    funFacts: [
      {
        fact: "Actuaries are among the highest-paid professionals in Kenya, with earning potential exceeding KSh 1M monthly.",
        category: "kenya-specific",
      },
      {
        fact: "Professional actuarial exams have some of the lowest pass rates of any professional certification.",
        category: "surprising",
      },
      {
        fact: "Actuaries prevented many insurance and pension fund collapses during Kenya's financial crises.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-be-004",
    name: "Bachelor of Science in Finance",
    programmeLevel: "Degree",
    category: "Business & Economics",
    description:
      "A degree program that focuses on money management, investments, banking, financial markets, and corporate financial decision-making. It equips students with skills to analyze financial data, manage risks, and make strategic investment decisions.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics (very important), English or Kiswahili, Business Studies/Geography/History, Any Group II subject. Typical cluster cut-off: ~36-44 points",
    careerPaths: [
      "Financial Analyst",
      "Investment Banker",
      "Bank Officer",
      "Credit Analyst",
      "Insurance Analyst",
      "Financial Planner",
      "Auditor",
      "Stock Market Trader",
      "Risk Manager",
    ],
    institutions: [
      "Strathmore University",
      "University of Nairobi",
      "KCA University",
      "USIU-Africa",
      "Commercial banks",
      "Investment firms",
      "Insurance companies",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Capital Markets Authority — https://cma.or.ke",
    aboutCareer:
      "Bachelor of Science in Finance trains individuals to become financial professionals who manage money, analyze investments, assess risks, and make strategic financial decisions for individuals and organizations. The career combines financial analysis, investment management, and corporate finance expertise.",
    academicStructure:
      "4 years (8 semesters). Year 1: Principles of Accounting, Business Mathematics, Microeconomics, Introduction to Finance, Communication Skills. Year 2: Corporate Finance, Financial Markets & Institutions, Investment Analysis, Macroeconomics, Statistics for Finance. Year 3: Financial Management, Portfolio Management, Risk Management, International Finance, Banking Operations. Year 4: Financial Modelling, Derivatives & Securities, Strategic Financial Planning, Research Project, Entrepreneurship.",
    technicalSkills: [
      "Financial analysis and forecasting",
      "Investment decision-making",
      "Risk assessment",
      "Budgeting and financial planning",
      "Data interpretation",
      "Business strategy skills",
    ],
    softSkills: [
      "Analytical thinking",
      "Problem-solving",
      "Communication",
      "Decision-making under uncertainty",
      "Teamwork and collaboration",
    ],
    careerPathways: [
      {
        title: "Financial Analyst",
        description: "Analyze financial data, prepare reports, and provide investment recommendations to clients and organizations.",
      },
      {
        title: "Investment Banker",
        description: "Advise clients on mergers, acquisitions, and capital raising. Facilitate complex financial transactions.",
      },
      {
        title: "Risk Manager",
        description: "Identify and mitigate financial, operational, and market risks for organizations.",
      },
      {
        title: "Banking Executive",
        description: "Manage banking operations, customer relationships, and financial products in commercial or investment banks.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Strong Mathematical Ability Required",
        description: "Requires excellent math skills for financial modeling and complex calculations.",
      },
      {
        challenge: "Competitive Job Market",
        description: "Without specialization or professional certifications (CPA, CFA), competition is intense.",
      },
      {
        challenge: "Professional Certifications Essential",
        description: "Top roles require CPA, CFA, or ACCA certifications for career advancement.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "private", name: "Strathmore University", location: "Nairobi" },
      { type: "private", name: "USIU-Africa", location: "Nairobi" },
    ],
    clusterRequirements: "Mathematics (very important), English or Kiswahili, Business Studies/Geography/History, Any Group II science subject",
    cutoffHistory: [
      { year: 2024, ranges: { high: 44, mid: 38, low: 35 }, notes: "Highly competitive finance programs" },
    ],
    jobMarketTrends: {
      demandOutlook: "High demand in banking, insurance, investment, and fintech sectors. Strong employment opportunities with competitive salaries.",
      trends: [
        "Growing fintech innovation creating new roles",
        "Increased demand for risk management professionals",
        "Digital banking transformation expanding opportunities",
        "Strong international recruitment for qualified professionals",
      ],
      challenges: [
        "Requires professional certifications for top roles",
        "Highly competitive market without specialization",
        "Fast-changing financial industry",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 40,000 – 90,000/month",
      midCareer: "KSh 120,000 – 250,000/month",
      seniorLevel: "KSh 300,000+ (Senior finance professionals and executives)",
    },
    funFacts: [
      {
        fact: "Financial analysts use advanced models to predict market trends and economic changes.",
        category: "kenya-specific",
      },
      {
        fact: "Professional certifications like CFA can significantly increase earning potential by 50-100%.",
        category: "surprising",
      },
      {
        fact: "Kenya's insurance and banking sectors are among the largest employers of finance graduates.",
        category: "kenya-specific",
      },
    ],
  },

  // ── Education & Teaching ──
  {
    id: "d-edu-001",
    name: "Bachelor of Education (Arts)",
    programmeLevel: "Degree",
    category: "Education & Teaching",
    description:
      "A four-year degree program training secondary school teachers in humanities and social sciences subjects. Graduates become professional educators teaching English, History, Kiswahili, Geography, CRE, and Business Studies.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. English or Kiswahili (important), History and Geography (or other arts subjects), Mathematics, Cluster cut-off typically 22-31 points. Major teaching subjects needed.",
    careerPaths: [
      "Secondary School Teacher",
      "Education Administrator",
      "Curriculum Developer",
      "Education Consultant",
      "School Principal",
      "Head of Department",
      "Deputy Head Teacher",
      "Education Policy Advisor",
      "NGO Education Program Manager",
      "Teacher Trainer",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Moi University",
      "Maseno University",
      "Egerton University",
      "Masinde Muliro University",
      "Kenya Methodist University",
      "Kabarak University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Teachers Service Commission — https://tsc.go.ke",
    aboutCareer:
      "Bachelor of Education (Arts) trains professional educators to teach humanities and social sciences. Teachers educate the next generation, solve knowledge gaps, and develop students' critical thinking skills in their communities.",
    academicStructure:
      "4 years (8 semesters). Balance of education theory and subject matter content. Year 1-2: Foundational courses in pedagogy, psychology, curriculum design, general education. Years 2-4: Major and minor subject specialization, teaching practice attachments. Mandatory supervised teaching practice (practical) in real schools. Must pass ~55-60 units within 8 years or be discontinued.",
    technicalSkills: [
      "Pedagogical skills (lesson planning, classroom management)",
      "Subject-matter expertise in teaching subjects",
      "Assessment and evaluation techniques",
      "Educational administration basics",
      "Curriculum design",
      "Basic research and evidence evaluation",
    ],
    softSkills: [
      "Strong communication skills (verbal and written)",
      "Interpersonal skills and empathy",
      "Emotional intelligence",
      "Leadership and classroom management",
      "Critical thinking",
      "Cultural sensitivity",
    ],
    careerPathways: [
      {
        title: "Secondary School Teacher",
        description: "Teach humanities subjects at secondary school level, managing classes and nurturing students.",
      },
      {
        title: "Head of Department",
        description: "Manage an academic department, mentor teachers, and develop curriculum.",
      },
      {
        title: "School Principal",
        description: "Lead school administration and operations after years of teaching experience.",
      },
      {
        title: "Education Consultant",
        description: "Advise schools, NGOs, or government on curriculum and educational programs.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "TSC Registration Requirement",
        description: "Must register with Teachers Service Commission to teach in official schools—delays are common.",
      },
      {
        challenge: "Large Classes and Limited Resources",
        description: "Many Kenyan schools have 40+ students per class with limited materials.",
      },
      {
        challenge: "Limited Salary Growth",
        description: "Teacher salaries grow slowly and top positions are limited, requiring decade+ years for advancement.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Maseno University", location: "Kisumu" },
    ],
    clusterRequirements: "English or Kiswahili (important), History and Geography, Mathematics",
    cutoffHistory: [
      { year: 2024, ranges: { high: 31, mid: 26, low: 22 }, notes: "Moderate competition, high demand for teachers" },
    ],
    jobMarketTrends: {
      demandOutlook: "High demand nationwide. Kenya has severe teacher shortage with ~100,000 deficit. TSC actively recruits annually.",
      trends: [
        "National teacher shortage creating demand",
        "Competency-Based Curriculum requiring 58,590+ new teachers",
        "Government teacher recruitment programs active",
        "International teacher recruitment opportunities (US, Gulf)",
      ],
      challenges: [
        "TSC hiring depends on government budgets and may have delays",
        "Initial placements may be far from home",
        "Some graduates wait months or years for TSC confirmation",
        "Contract-based positions common before permanent hiring",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 18,000 - 25,000/month (Intern), KSh 44,000 - 56,000/month (Confirmed Teacher I with allowances)",
      midCareer: "KSh 60,000 – 150,000/month (Senior teacher and HOD)",
      seniorLevel: "KSh 80,000 - 150,000+/month (Principal and senior management)",
    },
    funFacts: [
      {
        fact: "Teaching has cultural prestige in Kenya—'The teacher is the maker of nations'.",
        category: "kenya-specific",
      },
      {
        fact: "Kenya has an ~100,000 teacher shortage despite strong graduate production.",
        category: "kenya-specific",
      },
      {
        fact: "Competitive-Based Curriculum roll-out revealed need for 58,590 additional senior school teachers.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-edu-002",
    name: "Bachelor of Education (Science)",
    programmeLevel: "Degree",
    category: "Education & Teaching",
    description:
      "A four-year programme training secondary school science teachers in Mathematics, Physics, Chemistry, Biology, and Computer Studies.",
    kcseRequirements:
      "Mean grade B (plain). Must have B+ in two science teaching subjects, C+ in English.",
    careerPaths: [
      "Secondary School Science Teacher",
      "Lab Technician Trainer",
      "STEM Educator",
      "Education Researcher",
    ],
    institutions: [
      "Kenyatta University",
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Egerton University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Teachers Service Commission — https://tsc.go.ke",
  },
  {
    id: "d-edu-003",
    name: "Bachelor of Education (Early Childhood Development)",
    programmeLevel: "Degree",
    category: "Education & Teaching",
    description:
      "A programme focused on early childhood education pedagogy, child psychology, curriculum design, and pre-school management.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in English, C in Mathematics.",
    careerPaths: [
      "ECD Teacher",
      "Pre-School Administrator",
      "Child Development Specialist",
      "Education NGO Officer",
    ],
    institutions: [
      "Kenyatta University",
      "University of Nairobi",
      "Mount Kenya University",
      "Africa Nazarene University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; KICD — https://kicd.ac.ke",
  },

  // ── Law & Governance ──
  {
    id: "d-lg-001",
    name: "Bachelor of Laws (LLB)",
    programmeLevel: "Degree",
    category: "Law & Governance",
    description:
      "A four-year professional law degree covering constitutional law, criminal law, commercial law, and international law. Graduates must complete the Kenya School of Law programme.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have B+ in English, B in Mathematics and any two humanities.",
    careerPaths: [
      "Advocate",
      "Magistrate",
      "Legal Counsel",
      "State Prosecutor",
      "Corporate Lawyer",
      "Human Rights Lawyer",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
      "Kenyatta University",
      "Strathmore University",
      "Kabarak University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Council of Legal Education — https://cle.or.ke",
  },
  {
    id: "d-lg-002",
    name: "Bachelor of Arts in Political Science and Public Administration",
    programmeLevel: "Degree",
    category: "Law & Governance",
    description:
      "A programme covering political systems, governance, public policy, international relations, and public administration.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in English, C+ in Mathematics.",
    careerPaths: [
      "Government Administrator",
      "Diplomat",
      "Policy Analyst",
      "Political Consultant",
      "NGO Programme Officer",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Moi University",
      "Maseno University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
  },

  // ── Agriculture & Environmental Sciences ──
  {
    id: "d-ag-001",
    name: "Bachelor of Science in Agriculture",
    programmeLevel: "Degree",
    category: "Agriculture & Environmental Sciences",
    description:
      "A degree program focused on modern farming, food production, agribusiness, environmental conservation, and agricultural technology. It equips students with scientific knowledge and practical skills for improving crop and livestock production.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Biology (very important), Chemistry, Mathematics or Physics, Geography/Agriculture/Business Studies. Typical cluster cut-off: ~34-40 points",
    careerPaths: [
      "Agricultural Officer",
      "Farm Manager",
      "Agribusiness Manager",
      "Agricultural Extension Officer",
      "Crop Consultant",
      "Livestock Specialist",
      "Agricultural Researcher",
      "Food Production Manager",
      "Irrigation Specialist",
      "Environmental Conservation Officer",
    ],
    institutions: [
      "Egerton University",
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Chuka University",
      "Ministry of Agriculture",
      "NGOs",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Egerton University Faculty of Agriculture — https://egerton.ac.ke",
    aboutCareer:
      "Bachelor of Science in Agriculture trains individuals to improve farming practices, food production, and agricultural sustainability. Graduates work on crop production, livestock management, soil conservation, and addressing food security challenges.",
    academicStructure:
      "4 years (8 semesters). Year 1: Introduction to Agriculture, Soil Science, Plant Biology, Agricultural Economics, Communication Skills. Year 2: Crop Production, Animal Production, Agricultural Engineering Basics, Agricultural Statistics, Farm Management. Year 3: Irrigation & Water Management, Plant Pathology, Animal Nutrition, Agribusiness Management, Agricultural Extension. Year 4: Sustainable Agriculture, Agricultural Policy & Planning, Food Security Studies, Research Project, Environmental Conservation.",
    technicalSkills: [
      "Modern farming techniques",
      "Agribusiness management",
      "Soil and crop analysis",
      "Livestock management",
      "Environmental conservation",
      "Agricultural research skills",
      "Problem-solving and planning",
    ],
    softSkills: [
      "Extension and communication skills",
      "Leadership and mentoring",
      "Problem-solving",
      "Teamwork",
      "Planning and management",
      "Entrepreneurship",
    ],
    careerPathways: [
      {
        title: "Agricultural Officer",
        description: "Advise farmers on modern farming techniques, pest control, and soil management.",
      },
      {
        title: "Farm Manager",
        description: "Manage agricultural operations, crops, livestock, and farm finances.",
      },
      {
        title: "Agricultural Extension Officer",
        description: "Teach farmers new techniques and help communities improve food production.",
      },
      {
        title: "Agribusiness Manager",
        description: "Manage agricultural businesses including production and marketing.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Requires Practical Fieldwork",
        description: "Significant time spent in fields and farms conducting research and training.",
      },
      {
        challenge: "Can Involve Working in Rural Areas",
        description: "Many opportunities require posting in remote or rural locations.",
      },
      {
        challenge: "Weather and Environmental Risks",
        description: "Farming success depends on unpredictable weather and environmental factors.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "Egerton University", location: "Nakuru" },
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
    ],
    clusterRequirements: "Biology (very important), Chemistry, Mathematics or Physics, Geography/Agriculture/Business Studies",
    cutoffHistory: [
      { year: 2024, ranges: { high: 40, mid: 36, low: 32 }, notes: "Moderate competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "High demand due to food security needs and government agricultural development programs.",
      trends: [
        "Government focus on food security creating officer positions",
        "Commercial farming expansion hiring farm managers",
        "Agribusiness opportunities with private companies",
        "International NGO opportunities in development programs",
      ],
      challenges: [
        "Limited private sector opportunities compared to public sector",
        "Many positions require rural posting",
        "Salary growth requires management advancement",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 35,000 – 70,000/month",
      midCareer: "KSh 80,000 – 180,000/month",
      seniorLevel: "KSh 200,000+/month (Senior specialists and managers)",
    },
    funFacts: [
      {
        fact: "Agriculture is the backbone of Kenya's economy, employing over 30% of the workforce.",
        category: "kenya-specific",
      },
      {
        fact: "Modern agricultural techniques can increase crop yields by 50-100% compared to traditional methods.",
        category: "surprising",
      },
      {
        fact: "Kenya is a leader in agricultural technology and innovation in East Africa.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-ag-002",
    name: "Bachelor of Science in Environmental Science",
    programmeLevel: "Degree",
    category: "Agriculture & Environmental Sciences",
    description:
      "A degree program focused on understanding, protecting, and managing the natural environment. It combines biology, chemistry, geography, and environmental policy to address pollution, climate change, conservation, and sustainable development.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Biology, Chemistry, Geography/Mathematics/Physics, English or Kiswahili. Typical cluster cut-off: ~34-42 points",
    careerPaths: [
      "Environmental Officer",
      "Conservation Scientist",
      "Environmental Consultant",
      "Climate Change Analyst",
      "Waste Management Officer",
      "Water Resource Manager",
      "Environmental Researcher",
      "Sustainability Officer",
      "Environmental Auditor",
      "EIA Specialist",
    ],
    institutions: [
      "Kenyatta University",
      "University of Nairobi",
      "Moi University",
      "Egerton University",
      "NEMA",
      "NGOs",
      "Research institutions",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; NEMA — https://nema.go.ke",
    aboutCareer:
      "Bachelor of Science in Environmental Science trains individuals to solve environmental challenges affecting ecosystems, human health, and natural resources. Graduates work on conservation, pollution control, climate change, and sustainable development.",
    academicStructure:
      "4 years (8 semesters). Year 1: Introduction to Environmental Science, Basic Ecology, Environmental Chemistry, Physical Geography, Communication Skills. Year 2: Soil Science, Environmental Microbiology, Environmental Statistics, Hydrology (Water Systems), Environmental Management Principles. Year 3: Pollution Control, Climate Change Studies, Environmental Impact Assessment, Natural Resource Management, Conservation Biology. Year 4: Environmental Law & Policy, Sustainable Development, Environmental Monitoring, Research Project, Waste Management.",
    technicalSkills: [
      "Environmental problem-solving",
      "Data collection and analysis",
      "Environmental monitoring techniques",
      "Conservation planning",
      "Risk assessment",
      "Policy and sustainability planning",
    ],
    softSkills: [
      "Environmental advocacy",
      "Communication",
      "Problem-solving",
      "Teamwork",
      "Policy analysis",
      "Stakeholder engagement",
    ],
    careerPathways: [
      {
        title: "Environmental Officer",
        description: "Monitor environmental compliance and implement environmental protection programs.",
      },
      {
        title: "Conservation Scientist",
        description: "Manage and protect natural resources including forests, water, and wildlife.",
      },
      {
        title: "Environmental Consultant",
        description: "Advise organizations on environmental compliance and sustainability.",
      },
      {
        title: "Climate Change Analyst",
        description: "Analyze climate change impacts and develop mitigation and adaptation strategies.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Requires Fieldwork in Harsh Environments",
        description: "Sometimes work in challenging environmental conditions.",
      },
      {
        challenge: "Jobs May Require Relocation",
        description: "Many positions require work in remote conservation areas.",
      },
      {
        challenge: "Environmental Projects Are Long-Term",
        description: "Conservation and environmental programs often require years to show results.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "public", name: "Egerton University", location: "Nakuru" },
    ],
    clusterRequirements: "Biology, Chemistry, Geography/Mathematics/Physics, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 42, mid: 38, low: 35 }, notes: "Growing competition due to environmental awareness" },
    ],
    jobMarketTrends: {
      demandOutlook: "Growing global demand due to climate change and environmental concerns. Kenya actively recruiting environmental professionals.",
      trends: [
        "Government environmental regulation increasing compliance jobs",
        "Climate change creating new policy and analysis roles",
        "International NGOs expanding conservation programs",
        "Corporate sustainability driving business opportunities",
      ],
      challenges: [
        "Many NGO positions are project-based",
        "Limited high-paying positions in private sector",
        "Competition from geography and science graduates",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 40,000 – 80,000/month",
      midCareer: "KSh 100,000 – 200,000/month",
      seniorLevel: "KSh 250,000+/month (Senior consultants)",
    },
    funFacts: [
      {
        fact: "Climate change is one of the greatest environmental challenges of our time.",
        category: "surprising",
      },
      {
        fact: "Kenya is highly vulnerable to climate change and leading in environmental innovation.",
        category: "kenya-specific",
      },
      {
        fact: "Environmental scientists help predict and prevent environmental disasters.",
        category: "surprising",
      },
    ],
  },
  {
    id: "d-ag-003",
    name: "Bachelor of Science in Food Science and Technology",
    programmeLevel: "Degree",
    category: "Agriculture & Environmental Sciences",
    description:
      "A degree program focused on food production, processing, preservation, safety, quality control, and nutrition science. It combines biology, chemistry, and engineering principles to ensure food is safe, nutritious, and efficiently produced.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Chemistry (very important), Biology, Mathematics or Physics, Geography/Agriculture/Business Studies. Typical cluster cut-off: ~36-44 points",
    careerPaths: [
      "Food Technologist",
      "Quality Assurance Officer",
      "Nutrition Specialist",
      "Food Safety Officer",
      "Research Scientist",
      "Production Manager",
      "Laboratory Analyst",
      "Product Development Specialist",
      "Food Engineer",
      "Regulatory Affairs Officer",
    ],
    institutions: [
      "JKUAT",
      "Egerton University",
      "University of Nairobi",
      "Technical University of Kenya",
      "Food processing companies",
      "Government health agencies",
      "Research institutions",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenya Bureau of Standards — https://kebs.org",
    aboutCareer:
      "Bachelor of Science in Food Science and Technology trains individuals to ensure food quality, safety, and nutrition. Graduates work on food processing, preservation techniques, quality control, and developing safe, nutritious food products.",
    academicStructure:
      "4 years (8 semesters). Year 1: General Chemistry, Biology for Food Science, Introduction to Food Science, Mathematics for Scientists, Communication Skills. Year 2: Food Chemistry, Food Microbiology, Food Processing Principles, Nutrition Science, Biochemistry. Year 3: Food Preservation Techniques, Food Engineering, Quality Control & Assurance, Sensory Evaluation of Foods, Packaging Technology. Year 4: Food Safety Management, Industrial Food Production, Food Product Development, Research Project, Food Regulations & Standards.",
    technicalSkills: [
      "Food quality analysis",
      "Laboratory testing skills",
      "Food preservation techniques",
      "Industrial food processing knowledge",
      "Nutrition assessment",
      "Safety and hygiene management",
    ],
    softSkills: [
      "Quality assurance thinking",
      "Laboratory precision",
      "Communication",
      "Problem-solving",
      "Teamwork",
      "Attention to detail",
    ],
    careerPathways: [
      {
        title: "Food Technologist",
        description: "Develop and improve food products and processing methods.",
      },
      {
        title: "Quality Assurance Officer",
        description: "Ensure food products meet safety and quality standards.",
      },
      {
        title: "Product Development Specialist",
        description: "Create new food products meeting nutritional and consumer preferences.",
      },
      {
        title: "Food Safety Officer",
        description: "Oversee food safety protocols and regulatory compliance.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Requires Extensive Laboratory Work",
        description: "Much of the program involves practical laboratory testing and analysis.",
      },
      {
        challenge: "Can Involve Industrial Environments",
        description: "Working in food processing plants with specific health and safety protocols.",
      },
      {
        challenge: "Strict Quality Control Standards",
        description: "Food safety regulations are stringent and require careful compliance.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Egerton University", location: "Nakuru" },
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Technical University of Kenya", location: "Nairobi" },
    ],
    clusterRequirements: "Chemistry (very important), Biology, Mathematics or Physics, Geography/Agriculture/Business Studies",
    cutoffHistory: [
      { year: 2024, ranges: { high: 44, mid: 40, low: 36 }, notes: "Moderate competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "High demand due to food security needs and growing food processing industry in Kenya.",
      trends: [
        "Food processing industry expansion creating new positions",
        "Government food safety standards increasing compliance needs",
        "Growing export market for processed foods",
        "Opportunities in government health and nutrition programs",
      ],
      challenges: [
        "Limited entry positions without prior experience",
        "Salary growth requires management progression",
        "Competition from broader science graduates",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 40,000 – 80,000/month",
      midCareer: "KSh 100,000 – 200,000/month",
      seniorLevel: "KSh 250,000+/month (Senior scientists and managers)",
    },
    funFacts: [
      {
        fact: "Food Science combines biology, chemistry, and engineering to make food safer and better.",
        category: "surprising",
      },
      {
        fact: "Kenya's tea industry uses food science techniques for quality assurance.",
        category: "kenya-specific",
      },
      {
        fact: "Food technologists develop preservation methods that keep food fresh longer.",
        category: "surprising",
      },
    ],
  },

  // ── Natural & Physical Sciences ──
  {
    id: "d-nps-001",
    name: "Bachelor of Science in Mathematics",
    programmeLevel: "Degree",
    category: "Natural & Physical Sciences",
    description:
      "A scientific degree that focuses on the study of numbers, patterns, structures, and logical reasoning. Mathematics is the 'language of science and technology' forming the foundation of engineering, finance, computing, and research.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics (Mandatory), Physics or Chemistry, Any science subject, English or Kiswahili. Typical cluster cut-off: ~30-40 points",
    careerPaths: [
      "Data Analyst",
      "Statistician",
      "Financial Analyst",
      "Actuarial Assistant",
      "Research Assistant",
      "Operations Analyst",
      "Data Scientist",
      "AI & Machine Learning Specialist",
      "Quantitative Analyst",
      "Cybersecurity Analyst",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "JKUAT",
      "Maseno University",
      "Moi University",
      "Strathmore University",
      "Mount Kenya University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
    aboutCareer:
      "Bachelor of Science in Mathematics trains individuals to become mathematicians who solve complex problems using analytical thinking, mathematical modeling, and quantitative methods. Mathematicians work behind the scenes in technology, finance, science, and research.",
    academicStructure:
      "4 years (8 semesters) with optional specialization in later years. Years 1-2: Calculus, Algebra, Probability & Statistics, Discrete Mathematics, Linear Algebra, Mathematical Logic, computer-based problem solving. Years 3-4: Real Analysis, Complex Analysis, Numerical Methods, Operations Research, Mathematical Modeling, Financial Mathematics, Statistical Inference, research projects.",
    technicalSkills: [
      "Advanced problem solving",
      "Statistical analysis",
      "Data interpretation",
      "Mathematical modeling",
      "Algorithm design",
    ],
    softSkills: [
      "Logical thinking",
      "Critical reasoning",
      "Attention to detail",
      "Analytical decision-making",
      "Research skills",
    ],
    careerPathways: [
      {
        title: "Data Analyst",
        description: "Analyze complex data sets to extract insights and support business decision-making.",
      },
      {
        title: "Data Scientist",
        description: "Use mathematics and statistics to build predictive models and solve business problems.",
      },
      {
        title: "Quantitative Analyst",
        description: "Apply mathematical models to analyze financial markets and investment risks.",
      },
      {
        title: "Operations Analyst",
        description: "Use mathematical optimization to improve efficiency in business operations.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Highly Abstract Concepts",
        description: "Advanced mathematics involves abstract thinking that goes beyond practical applications.",
      },
      {
        challenge: "Requires Strong Discipline",
        description: "Success requires consistent practice and deep conceptual understanding.",
      },
      {
        challenge: "Less Hands-On Than Applied Sciences",
        description: "Focuses more on theory than practical experimentation.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Maseno University", location: "Kisumu" },
    ],
    clusterRequirements: "Mathematics (Mandatory), Physics or Chemistry, Any science subject, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 40, mid: 35, low: 32 }, notes: "Moderate competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "Rising demand for mathematical and data science skills. Tech and finance sectors actively recruiting mathematicians.",
      trends: [
        "High demand for data science and analytics skills",
        "Growing AI and machine learning opportunities",
        "Fintech sector expansion creating new roles",
        "Tech companies seeking strong mathematical talent",
      ],
      challenges: [
        "Pure mathematics graduates may need additional tech skills",
        "Competition from computer science graduates",
        "Salary depends on industry specialization",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 60,000 - 120,000/month (Data analyst)",
      midCareer: "KSh 150,000 – 350,000/month",
      seniorLevel: "KSh 400,000 - 1M+/month (Quantitative finance professionals)",
    },
    funFacts: [
      {
        fact: "Mathematics has no universal definition—even mathematicians cannot agree on a single definition.",
        category: "surprising",
      },
      {
        fact: "Zero was invented in India—before zero, calculations were extremely difficult.",
        category: "historical",
      },
      {
        fact: "Math is behind all modern technology—from GPS to smartphones to social media algorithms.",
        category: "surprising",
      },
    ],
  },
  {
    id: "d-nps-002",
    name: "Bachelor of Science in Physics",
    programmeLevel: "Degree",
    category: "Natural & Physical Sciences",
    description:
      "A scientific degree that focuses on understanding the fundamental laws of nature—how matter, energy, space, and time interact. Physics explains how the universe works and is the foundation of nearly all modern technology.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Physics (Mandatory), Mathematics (Mandatory), Chemistry, English or Kiswahili. Typical cluster cut-off: ~32-42 points",
    careerPaths: [
      "Laboratory Scientist",
      "Electronics Engineer Assistant",
      "Energy Analyst",
      "Research Assistant",
      "Technical Consultant",
      "Renewable Energy Specialist",
      "Data Scientist",
      "AI & Machine Learning Analyst",
      "Telecommunications Engineer",
      "Space Science Researcher",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "JKUAT",
      "Moi University",
      "Strathmore University",
      "Mount Kenya University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
    aboutCareer:
      "Bachelor of Science in Physics trains individuals to become physicists—scientists who understand the fundamental laws of nature and use this knowledge to develop new technologies. Physics is the foundation for engineering, computing, energy, and space exploration.",
    academicStructure:
      "4 years (8 semesters) with optional specialization in later years. Years 1-2: Mechanics, Waves & Optics, Electricity & Magnetism, Calculus, Linear Algebra, Experimental Physics, laboratory skills. Years 3-4: Quantum Mechanics, Thermodynamics, Solid State Physics, Nuclear Physics, Electronics, Astrophysics, Computational Physics, research project.",
    technicalSkills: [
      "Scientific experimentation",
      "Data analysis",
      "Mathematical modeling",
      "Electronics design",
      "Problem-solving",
    ],
    softSkills: [
      "Critical thinking",
      "Logical reasoning",
      "Research skills",
      "Precision and attention to detail",
      "Complex problem analysis",
    ],
    careerPathways: [
      {
        title: "Physicist",
        description: "Conduct research to advance understanding of physical laws and develop new technologies.",
      },
      {
        title: "Renewable Energy Specialist",
        description: "Work on solar, wind, geothermal, and other sustainable energy systems.",
      },
      {
        title: "Data Scientist",
        description: "Use physics and mathematical expertise to analyze large datasets and extract insights.",
      },
      {
        title: "Telecommunications Engineer",
        description: "Design and maintain communication systems and networks.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Very Mathematically Intensive",
        description: "Requires strong mathematics skills and complex mathematical concepts.",
      },
      {
        challenge: "Abstract Theoretical Concepts",
        description: "Must understand concepts that cannot be directly observed or visualized.",
      },
      {
        challenge: "Requires Strong Discipline and Practice",
        description: "Success requires consistent dedication to learning complex material.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
    ],
    clusterRequirements: "Physics (Mandatory), Mathematics (Mandatory), Chemistry, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 42, mid: 38, low: 34 }, notes: "Moderate competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "Growing demand in energy sector, telecommunications, and technology fields. Physics graduates increasingly needed for renewable energy and tech innovation.",
      trends: [
        "Growing renewable energy sector in Kenya (solar, geothermal, wind)",
        "Expansion in telecommunications and electronics",
        "Increasing tech sector creating opportunities for physics graduates",
        "Research opportunities in government and universities",
      ],
      challenges: [
        "Limited pure research positions",
        "Salary growth requires specialization",
        "Competition for academic positions",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 60,000 - 120,000/month (Laboratory scientist)",
      midCareer: "KSh 150,000 – 350,000/month",
      seniorLevel: "KSh 400,000 - 900,000+/month (Specialists in energy and tech sectors)",
    },
    funFacts: [
      {
        fact: "Physics explains everything in the universe from gravity to electricity to light.",
        category: "surprising",
      },
      {
        fact: "Smartphones exist because of physics—electronics, signals, and semiconductors all rely on physics.",
        category: "surprising",
      },
      {
        fact: "Kenya is a global leader in geothermal energy, where physics plays a huge role.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-nps-003",
    name: "Bachelor of Science in Chemistry",
    programmeLevel: "Degree",
    category: "Natural & Physical Sciences",
    description:
      "A scientific degree that focuses on the study of matter—its composition, structure, properties, and changes. Chemistry is the 'central science' connecting physics, biology, medicine, environmental science, and engineering.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Chemistry (Mandatory), Mathematics or Physics, Biology or Physics, English or Kiswahili. Typical cluster cut-off: ~32-42 points",
    careerPaths: [
      "Laboratory Chemist",
      "Quality Control Analyst",
      "Industrial Chemist",
      "Environmental Analyst",
      "Research Assistant",
      "Pharmaceutical Scientist",
      "Food Safety Specialist",
      "Petroleum Industry Analyst",
      "Materials Scientist",
      "Cosmetic Product Developer",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "JKUAT",
      "Egerton University",
      "Moi University",
      "Mount Kenya University",
      "Strathmore University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenya Chemical Society — https://uonbi.ac.ke",
    aboutCareer:
      "Bachelor of Science in Chemistry trains individuals to become chemists who study matter at the molecular level and develop new materials, medicines, and industrial processes. Chemists work in laboratories and industries solving real-world problems.",
    academicStructure:
      "4 years (8 semesters) including practical laboratory work. Years 1-2: General Chemistry, Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Mathematics for Scientists, Basic Physics, Laboratory skills in chemical measurement and safe handling. Years 3-4: Analytical Chemistry, Environmental Chemistry, Industrial Chemistry, Polymer Chemistry, Biochemistry, Instrumental Analysis, Research projects.",
    technicalSkills: [
      "Laboratory experimentation",
      "Chemical analysis techniques",
      "Quality control testing",
      "Scientific data interpretation",
      "Research and documentation",
    ],
    softSkills: [
      "Critical thinking",
      "Attention to detail",
      "Problem-solving",
      "Analytical reasoning",
      "Scientific communication",
    ],
    careerPathways: [
      {
        title: "Laboratory Chemist",
        description: "Conduct chemical experiments and analysis in research or industrial laboratories.",
      },
      {
        title: "Quality Control Analyst",
        description: "Test and monitor product quality in manufacturing industries.",
      },
      {
        title: "Pharmaceutical Scientist",
        description: "Develop and test pharmaceutical products and medications.",
      },
      {
        title: "Environmental Chemist",
        description: "Monitor and analyze environmental pollution and develop solutions.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Laboratory-Intensive Coursework",
        description: "Requires extensive practical lab work and careful chemical handling.",
      },
      {
        challenge: "Requires Careful Handling of Chemicals",
        description: "Safety protocols and precision are essential when working with chemicals.",
      },
      {
        challenge: "Requires Patience and Accuracy",
        description: "Chemistry demands meticulous attention to detail and consistent practice.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "JKUAT", location: "Nairobi" },
      { type: "public", name: "Egerton University", location: "Nakuru" },
    ],
    clusterRequirements: "Chemistry (Mandatory), Mathematics or Physics, Biology or Physics, English or Kiswahili",
    cutoffHistory: [
      { year: 2024, ranges: { high: 42, mid: 38, low: 34 }, notes: "Moderate competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "Good demand in manufacturing, pharmaceuticals, environmental monitoring, and research sectors.",
      trends: [
        "Growing manufacturing sector requiring quality control chemists",
        "Pharmaceutical industry expanding rapidly in Kenya",
        "Environmental regulations increasing demand for environmental chemists",
        "Food industry growth creating opportunities for food chemists",
      ],
      challenges: [
        "Some roles require postgraduate specialization",
        "Limited positions in pure research",
        "Salary growth may require advancing to senior positions",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 60,000 - 120,000/month (Laboratory analyst)",
      midCareer: "KSh 150,000 – 350,000/month",
      seniorLevel: "KSh 400,000 - 900,000+/month (Specialists in pharmaceuticals and petroleum)",
    },
    funFacts: [
      {
        fact: "Everything around you is made of chemicals—even air and water are chemical substances.",
        category: "surprising",
      },
      {
        fact: "Diamonds and graphite are both made of carbon but their structures make them completely different.",
        category: "surprising",
      },
      {
        fact: "Kenya's tea industry relies heavily on chemistry for soil analysis and quality control.",
        category: "kenya-specific",
      },
    ],
  },

  // ── Social Sciences & Humanities ──
  {
    id: "d-ssh-001",
    name: "Bachelor of Arts in Economics and Statistics",
    programmeLevel: "Degree",
    category: "Social Sciences & Humanities",
    description:
      "A programme combining economics with statistical methods. Covers econometrics, research methodology, and data analysis for policy and development.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Mathematics, C+ in English.",
    careerPaths: [
      "Economist",
      "Statistician",
      "Data Analyst",
      "Policy Researcher",
      "Development Specialist",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Maseno University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenya National Bureau of Statistics — https://knbs.or.ke",
  },
  {
    id: "d-ssh-002",
    name: "Bachelor of Psychology",
    programmeLevel: "Degree",
    category: "Social Sciences & Humanities",
    description:
      "A programme covering clinical psychology, developmental psychology, counselling, and organizational psychology.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in English, C+ in Biology and Mathematics.",
    careerPaths: [
      "Psychologist",
      "Counsellor",
      "HR Specialist",
      "Social Worker",
      "Research Psychologist",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Moi University",
      "Daystar University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenya Psychological Association",
  },
  {
    id: "d-ssh-003",
    name: "Bachelor of Arts in Sociology",
    programmeLevel: "Degree",
    category: "Social Sciences & Humanities",
    description:
      "A programme examining social structures, inequality, urbanization, and community development in Kenyan and global contexts.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in English, C in Mathematics.",
    careerPaths: [
      "Social Researcher",
      "Community Development Officer",
      "NGO Programme Manager",
      "Policy Analyst",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Maseno University",
      "Moi University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
  },

  // ── Creative Arts, Media & Design ──
  {
    id: "d-cam-001",
    name: "Bachelor of Arts in Design",
    programmeLevel: "Degree",
    category: "Creative Arts, Media & Design",
    description:
      "A degree program that develops creative professionals who solve visual communication and usability problems. Designers create visual concepts to communicate ideas through logos, packaging, websites, and layouts for businesses and the public.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. Mathematics, English or Kiswahili, Sciences or Arts subjects, Portfolio of art/drawing samples may be required. Typical cluster cut-off: ~25-33 points",
    careerPaths: [
      "Graphic Designer",
      "UI/UX Designer",
      "Interior Designer",
      "Brand Strategist",
      "Art Director",
      "Product Designer",
      "Web Designer",
      "Motion Graphics Designer",
      "Design Manager",
      "Design Consultant",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Technical University of Kenya",
      "Multimedia University of Kenya",
      "Design studios",
      "Marketing agencies",
      "Tech companies",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
    aboutCareer:
      "Bachelor of Arts in Design trains individuals to solve visual communication problems through design. Designers use art and technology to create designs that communicate ideas effectively for businesses, non-profits, and the public.",
    academicStructure:
      "4 years (8 semesters) with studio-based learning and industry attachments. Core includes: Art theory, Design history, Hand-on studio work, Design software (Adobe CC, CAD), User research, Design thinking, Portfolio development, Industry internship.",
    technicalSkills: [
      "Design software proficiency (Adobe Creative Suite, CAD, 3D modeling)",
      "Drawing and typography techniques",
      "Visual layout and composition",
      "Color theory",
      "Web/UI design (for digital specialists)",
      "User research and testing",
    ],
    softSkills: [
      "Creativity and originality",
      "Communication of design concepts",
      "Teamwork and collaboration",
      "Client interaction",
      "Problem-solving",
      "Attention to aesthetics",
    ],
    careerPathways: [
      {
        title: "Graphic Designer",
        description: "Create visual designs for print and digital media including branding, advertising, and marketing materials.",
      },
      {
        title: "UI/UX Designer",
        description: "Design user interfaces and user experiences for websites and applications.",
      },
      {
        title: "Interior Designer",
        description: "Design interior spaces for homes, offices, and commercial establishments.",
      },
      {
        title: "Brand Designer",
        description: "Create comprehensive brand identities including logos, color schemes, and brand guidelines.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Low Initial Salaries",
        description: "Entry-level designer salaries are modest (~KSh 300-350k/year) requiring years to reach higher income.",
      },
      {
        challenge: "Highly Competitive Market",
        description: "Many graduates compete for limited design positions requiring exceptional portfolios.",
      },
      {
        challenge: "Portfolio-Driven Career",
        description: "Success depends more on portfolio quality than degree credentials alone.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "public", name: "Kenyatta University", location: "Nairobi" },
      { type: "public", name: "Technical University of Kenya", location: "Nairobi" },
      { type: "private", name: "Multimedia University of Kenya", location: "Nairobi" },
    ],
    clusterRequirements: "Mathematics, English or Kiswahili, Sciences or Arts subjects, Portfolio of art samples",
    cutoffHistory: [
      { year: 2024, ranges: { high: 33, mid: 29, low: 26 }, notes: "Lower cutoff but high competition after graduation" },
    ],
    jobMarketTrends: {
      demandOutlook: "Mixed prospects. Growing digital design demand but oversupply of graphic designers. Success depends on portfolio.",
      trends: [
        "Growing digital marketing and web design opportunities",
        "UI/UX design emerging as high-demand specialization",
        "Remote work enabling international client access",
        "Freelance platforms creating income opportunities",
      ],
      challenges: [
        "Oversupply of graphic designers in the market",
        "Initial employment often unstable (internships, freelance)",
        "Salary growth requires specialization or entrepreneurship",
        "Many design jobs moving to remote work globally",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 300,000 - 350,000/year (Junior designer, often unpaid internships initially)",
      midCareer: "KSh 350,000 - 400,000/year (Senior designer with experience)",
      seniorLevel: "KSh 1M+/year (Creative directors and specialized UI/UX designers)",
    },
    funFacts: [
      {
        fact: "Design graduates often start with unpaid internships—financial survival requires careful planning.",
        category: "surprising",
      },
      {
        fact: "Many Kenyan designers work remotely for international clients earning 2-3x local salaries.",
        category: "kenya-specific",
      },
      {
        fact: "Kenya's design scene is growing with design festivals like Design Month Nairobi.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-cam-002",
    name: "Bachelor of Arts in Communication and Media Studies",
    programmeLevel: "Degree",
    category: "Creative Arts, Media & Design",
    description:
      "A degree program focused on research, crafting, and disseminating messages through journalism, advertising, PR, social media, and broadcast. Graduates handle information, storytelling, and communication across all media platforms.",
    kcseRequirements:
      "KCSE Mean Grade: C+ (plus) and above. English or Kiswahili (important), History or Geography, Business Studies or any other subject. Typical cluster cut-off: ~22-31 points",
    careerPaths: [
      "Reporter/Journalist",
      "Public Relations Officer",
      "Media Producer",
      "Corporate Communications Manager",
      "Social Media Strategist",
      "Content Writer",
      "Broadcast Producer",
      "News Editor",
      "Communications Consultant",
      "Digital Marketing Specialist",
    ],
    institutions: [
      "University of Nairobi",
      "Daystar University",
      "Moi University",
      "Multimedia University of Kenya",
      "USIU-Africa",
      "Media houses",
      "PR agencies",
      "NGOs",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Media Council of Kenya — https://mediacouncil.or.ke",
    aboutCareer:
      "Bachelor of Arts in Communication and Media Studies trains professionals who research, craft, and disseminate messages. Graduates inform the public, shape public opinion, entertain audiences, and connect organizations with stakeholders.",
    academicStructure:
      "4 years (8 semesters) blending theory and practice. Core includes: Media ethics, Cultural studies, Communication theory, Journalism labs, Radio/TV production, Advertising projects, Industry internships. Theory covers: mass media effects, journalism, PR, advertising, digital media.",
    technicalSkills: [
      "Writing and editing for various media",
      "Media production (video, audio editing)",
      "Public relations strategies",
      "Marketing analytics",
      "Social media management",
      "Interview and research skills",
      "Digital content creation",
    ],
    softSkills: [
      "Strong writing and speaking skills",
      "Public speaking and presentation",
      "Creativity in crafting messages",
      "Teamwork with reporters and producers",
      "Ethical judgment and critical thinking",
      "Interpersonal communication",
    ],
    careerPathways: [
      {
        title: "Journalist",
        description: "Research, investigate, and report news stories for newspapers, TV, radio, or online platforms.",
      },
      {
        title: "Public Relations Officer",
        description: "Manage organization's public image and communication with media and stakeholders.",
      },
      {
        title: "Content Producer",
        description: "Create engaging content for broadcast, digital, or print media.",
      },
      {
        title: "Communications Consultant",
        description: "Advise organizations on communication strategies and crisis management.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Many Positions Are Temporary/Contract",
        description: "Journalism and media often use contract-based employment rather than permanent positions.",
      },
      {
        challenge: "Deadline-Driven and Stressful Work",
        description: "Tight deadlines, editorial pressure, and constant publication schedules.",
      },
      {
        challenge: "Entry Positions Often Unpaid",
        description: "Many graduates start in unpaid internships to build experience and portfolios.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi", location: "Nairobi" },
      { type: "private", name: "Daystar University", location: "Nairobi" },
      { type: "public", name: "Moi University", location: "Eldoret" },
      { type: "private", name: "USIU-Africa", location: "Nairobi" },
    ],
    clusterRequirements: "English or Kiswahili (important), History or Geography, Business Studies or any other subject",
    cutoffHistory: [
      { year: 2024, ranges: { high: 31, mid: 26, low: 22 }, notes: "Lower cutoff but high employment competition" },
    ],
    jobMarketTrends: {
      demandOutlook: "Growing opportunities in digital media and social platforms but declining print journalism. Competition remains intense.",
      trends: [
        "Digital media creating new content and strategy roles",
        "Social media becoming crucial for brand communication",
        "Corporate communication roles expanding",
        "Freelance content creation opportunities growing",
      ],
      challenges: [
        "Journalism jobs declining due to media industry disruption",
        "Many positions are temporary or freelance",
        "Entry-level saturation with limited permanent roles",
        "Salary growth challenging without specialization",
      ],
    },
    salaryInsights: {
      entryLevel: "KSh 25,000 - 50,000/month (Intern/freelance), KSh 50,000 - 100,000/month (Junior journalist)",
      midCareer: "KSh 100,000 – 250,000/month",
      seniorLevel: "KSh 300,000+/month (Senior editors and directors)",
    },
    funFacts: [
      {
        fact: "Journalists are among the most trusted professionals globally, ranked alongside nurses.",
        category: "surprising",
      },
      {
        fact: "Kenya has one of Africa's largest media industries with 90+ radio stations and 60+ TV channels.",
        category: "kenya-specific",
      },
      {
        fact: "Kenya Institute of Mass Communication (KIMC) is considered one of Africa's most prestigious media schools.",
        category: "kenya-specific",
      },
    ],
  },
  {
    id: "d-cam-003",
    name: "Bachelor of Music",
    programmeLevel: "Degree",
    category: "Creative Arts, Media & Design",
    description:
      "A programme covering music theory, composition, performance, music production, and ethnomusicology.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in English and Music or relevant audition.",
    careerPaths: [
      "Music Producer",
      "Performing Artist",
      "Music Educator",
      "Sound Engineer",
      "Music Therapist",
    ],
    institutions: [
      "Kenyatta University",
      "Maseno University",
      "Kabarak University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenyatta University — https://ku.ac.ke",
  },
]

// ──────────────────────────────────────────────
//  DIPLOMA PROGRAMMES
// ──────────────────────────────────────────────

const diplomaCourses: Course[] = [
  // ── Health Sciences ──
  {
    id: "dip-hs-001",
    name: "Diploma in Clinical Medicine and Surgery",
    programmeLevel: "Diploma",
    category: "Health Sciences",
    description:
      "A three-year programme training clinical officers to diagnose and treat patients in hospitals and health centres. Offered mainly at KMTC campuses.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in Biology, Chemistry, and English/Kiswahili.",
    careerPaths: [
      "Clinical Officer",
      "Community Health Worker",
      "Health Facility In-charge",
    ],
    institutions: [
      "KMTC Nairobi",
      "KMTC Mombasa",
      "KMTC Eldoret",
      "KMTC Nakuru",
      "KMTC Kisumu",
    ],
    sourceCitation:
      "KMTC Official Programme Listings — https://kmtc.ac.ke",
  },
  {
    id: "dip-hs-002",
    name: "Diploma in Nursing (Kenya Registered Community Health Nursing)",
    programmeLevel: "Diploma",
    category: "Health Sciences",
    description:
      "A three-and-a-half year programme training nurses in clinical, community, and public health nursing. Graduates are registered by the Nursing Council of Kenya.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in Biology, C (plain) in Chemistry, English, and Mathematics.",
    careerPaths: [
      "Registered Nurse",
      "Community Health Nurse",
      "Midwife",
      "Public Health Nurse",
    ],
    institutions: [
      "KMTC Nairobi",
      "KMTC Mombasa",
      "KMTC Kisumu",
      "KMTC Nyeri",
      "KMTC Kakamega",
    ],
    sourceCitation:
      "KMTC Official Programme Listings; Nursing Council of Kenya — https://nckenya.com",
  },
  {
    id: "dip-hs-003",
    name: "Diploma in Pharmaceutical Technology",
    programmeLevel: "Diploma",
    category: "Health Sciences",
    description:
      "A three-year programme training pharmaceutical technologists in drug dispensing, pharmaceutical manufacturing, and drug regulation.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in Chemistry, Biology, and Mathematics/Physics.",
    careerPaths: [
      "Pharmaceutical Technologist",
      "Pharmacy Manager",
      "Drug Inspector",
    ],
    institutions: [
      "KMTC Nairobi",
      "KMTC Mombasa",
      "Kenya Medical Training College — various campuses",
    ],
    sourceCitation:
      "KMTC Official Programme Listings; Pharmacy and Poisons Board — https://pharmacyboardkenya.org",
  },
  {
    id: "dip-hs-004",
    name: "Diploma in Medical Laboratory Sciences",
    programmeLevel: "Diploma",
    category: "Health Sciences",
    description:
      "A three-year programme training laboratory technologists in clinical chemistry, haematology, microbiology, and blood transfusion science.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in Biology, Chemistry, and Mathematics/Physics.",
    careerPaths: [
      "Medical Lab Technologist",
      "Research Lab Technician",
      "Blood Bank Technologist",
    ],
    institutions: [
      "KMTC Nairobi",
      "KMTC Kisumu",
      "KMTC Mombasa",
      "KMTC Nakuru",
    ],
    sourceCitation:
      "KMTC Official Programme Listings — https://kmtc.ac.ke",
  },

  // ── Technical & Engineering ──
  {
    id: "dip-te-001",
    name: "Diploma in Electrical and Electronic Engineering",
    programmeLevel: "Diploma",
    category: "Technical & Engineering",
    description:
      "A three-year programme covering electrical installations, electronics, power systems, and telecommunications. Offered at National Polytechnics.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics, Physics, and English.",
    careerPaths: [
      "Electrical Technician",
      "Electronics Technician",
      "Power Systems Technician",
      "Telecommunications Technician",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "Mombasa Polytechnic (TUM)",
      "Eldoret Polytechnic",
      "Kisumu Polytechnic",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; TVETA — https://tveta.go.ke",
  },
  {
    id: "dip-te-002",
    name: "Diploma in Mechanical Engineering (Production)",
    programmeLevel: "Diploma",
    category: "Technical & Engineering",
    description:
      "A programme covering manufacturing processes, machine tools, industrial production, and quality control.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics, Physics, and English.",
    careerPaths: [
      "Mechanical Technician",
      "Production Supervisor",
      "Quality Control Inspector",
      "Maintenance Technician",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "Mombasa Polytechnic (TUM)",
      "Rift Valley Technical Training Institute",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; TVETA — https://tveta.go.ke",
  },
  {
    id: "dip-te-003",
    name: "Diploma in Automotive Engineering",
    programmeLevel: "Diploma",
    category: "Technical & Engineering",
    description:
      "A programme covering motor vehicle technology, engine diagnostics, automotive electronics, and vehicle maintenance.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics, Physics.",
    careerPaths: [
      "Automotive Technician",
      "Vehicle Diagnostics Specialist",
      "Fleet Manager",
      "Automotive Workshop Manager",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "Rift Valley Technical Training Institute",
      "Kabete National Polytechnic",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; TVETA — https://tveta.go.ke",
  },

  // ── ICT & Computing ──
  {
    id: "dip-ict-001",
    name: "Diploma in Information Communication Technology",
    programmeLevel: "Diploma",
    category: "ICT & Computing",
    description:
      "A two-year programme covering computer networking, programming, web development, and database management. Highly popular across TVET institutions.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics and English.",
    careerPaths: [
      "ICT Technician",
      "Web Developer",
      "Network Administrator",
      "Technical Support Specialist",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "Mombasa Polytechnic (TUM)",
      "NIBS Technical College",
      "Kabete National Polytechnic",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; TVETA — https://tveta.go.ke",
  },
  {
    id: "dip-ict-002",
    name: "Diploma in Computer Science",
    programmeLevel: "Diploma",
    category: "ICT & Computing",
    description:
      "A programme covering programming fundamentals, data structures, computer architecture, and software development.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics and English.",
    careerPaths: [
      "Junior Software Developer",
      "IT Support Technician",
      "Database Technician",
      "Systems Support Officer",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "Multimedia University of Kenya",
      "KCA University",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; TVETA — https://tveta.go.ke",
  },

  // ── Business & Finance ──
  {
    id: "dip-bf-001",
    name: "Diploma in Business Management",
    programmeLevel: "Diploma",
    category: "Business & Finance",
    description:
      "A two-year programme covering business administration, marketing, human resources, and entrepreneurship.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics and English.",
    careerPaths: [
      "Office Administrator",
      "Sales Executive",
      "Business Development Officer",
      "Entrepreneur",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "NIBS Technical College",
      "Nairobi Institute of Technology",
      "Kenya Institute of Management",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; TVETA — https://tveta.go.ke",
  },
  {
    id: "dip-bf-002",
    name: "Diploma in Accounting",
    programmeLevel: "Diploma",
    category: "Business & Finance",
    description:
      "A programme covering financial accounting, cost accounting, taxation, and auditing. Prepares students for CPA examinations.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics and English.",
    careerPaths: [
      "Accounts Clerk",
      "Junior Accountant",
      "Tax Assistant",
      "Audit Assistant",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "KCA University",
      "Strathmore University",
      "NIBS Technical College",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; KASNEB — https://kasneb.or.ke",
  },
  {
    id: "dip-bf-003",
    name: "Diploma in Banking and Finance",
    programmeLevel: "Diploma",
    category: "Business & Finance",
    description:
      "A programme focusing on banking operations, credit analysis, financial markets, and digital financial services including M-Pesa systems.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics and English.",
    careerPaths: [
      "Bank Teller",
      "Credit Analyst",
      "Financial Services Officer",
      "Microfinance Officer",
    ],
    institutions: [
      "Kenya School of Monetary Studies",
      "KCA University",
      "Kenya Institute of Bankers",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; Kenya Institute of Bankers — https://kib.co.ke",
  },

  // ── Education & Teacher Training ──
  {
    id: "dip-ed-001",
    name: "Diploma in Primary Teacher Education (P1)",
    programmeLevel: "Diploma",
    category: "Education & Teacher Training",
    description:
      "A two-year programme at Teacher Training Colleges preparing primary school teachers. Covers pedagogy, curriculum, and child development.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in English and Mathematics.",
    careerPaths: [
      "Primary School Teacher",
      "Education Officer",
      "ECD Coordinator",
    ],
    institutions: [
      "Kagumo Teachers College",
      "Highridge Teachers College",
      "Eregi Teachers College",
      "Machakos Teachers College",
    ],
    sourceCitation:
      "TSC Teacher Training Requirements; KICD — https://kicd.ac.ke",
  },

  // ── Hospitality & Tourism ──
  {
    id: "dip-ht-001",
    name: "Diploma in Hotel and Hospitality Management",
    programmeLevel: "Diploma",
    category: "Hospitality & Tourism",
    description:
      "A programme covering front office operations, food and beverage management, housekeeping, and hotel administration.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in English.",
    careerPaths: [
      "Hotel Manager",
      "Front Office Manager",
      "Food & Beverage Supervisor",
      "Events Coordinator",
    ],
    institutions: [
      "Kenya Utalii College",
      "Mombasa Polytechnic (TUM)",
      "Nairobi Institute of Technology",
    ],
    sourceCitation:
      "Kenya Utalii College Programme Listings — https://utalii.ac.ke",
  },
  {
    id: "dip-ht-002",
    name: "Diploma in Tourism Management",
    programmeLevel: "Diploma",
    category: "Hospitality & Tourism",
    description:
      "A programme covering tour operations, travel agency management, eco-tourism, and cultural heritage tourism.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in English and Geography.",
    careerPaths: [
      "Tour Guide",
      "Travel Agent",
      "Tourism Marketing Officer",
      "Eco-Tourism Coordinator",
    ],
    institutions: [
      "Kenya Utalii College",
      "Moi University",
      "Kenyatta University",
    ],
    sourceCitation:
      "Kenya Utalii College Programme Listings; Tourism Regulatory Authority — https://tourismauthority.go.ke",
  },

  // ── Agriculture & Animal Sciences ──
  {
    id: "dip-ag-001",
    name: "Diploma in General Agriculture",
    programmeLevel: "Diploma",
    category: "Agriculture & Animal Sciences",
    description:
      "A programme covering crop production, soil management, farm economics, and agricultural extension services.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Biology and Chemistry/Agriculture.",
    careerPaths: [
      "Agricultural Extension Officer",
      "Farm Supervisor",
      "Agrochemical Sales Agent",
      "Agricultural Entrepreneur",
    ],
    institutions: [
      "Egerton University (Njoro)",
      "Bukura Agricultural College",
      "Embu Agricultural College",
      "Ahiti Ndomba",
    ],
    sourceCitation:
      "Ministry of Agriculture Programme Listings; Egerton University — https://egerton.ac.ke",
  },
  {
    id: "dip-ag-002",
    name: "Diploma in Animal Health and Production",
    programmeLevel: "Diploma",
    category: "Agriculture & Animal Sciences",
    description:
      "A programme covering animal husbandry, veterinary technology, livestock production, and animal health management.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Biology and Chemistry.",
    careerPaths: [
      "Animal Health Assistant",
      "Livestock Production Officer",
      "Veterinary Technician",
      "Ranch Manager",
    ],
    institutions: [
      "Kabete National Polytechnic",
      "Ahiti Ndomba",
      "Bukura Agricultural College",
    ],
    sourceCitation:
      "Ministry of Agriculture Programme Listings; Kenya Veterinary Board — https://kenyavetboard.or.ke",
  },

  // ── Construction & Building ──
  {
    id: "dip-cb-001",
    name: "Diploma in Building Construction",
    programmeLevel: "Diploma",
    category: "Construction & Building",
    description:
      "A programme covering construction technology, building surveying, quantity surveying, and site management.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in Mathematics and Physics.",
    careerPaths: [
      "Building Technician",
      "Site Foreman",
      "Quantity Surveyor Assistant",
      "Construction Supervisor",
    ],
    institutions: [
      "Kenya Polytechnic (TUK)",
      "Mombasa Polytechnic (TUM)",
      "Rift Valley Technical Training Institute",
    ],
    sourceCitation:
      "KUCCPS TVET Programme Listings; National Construction Authority — https://nca.go.ke",
  },

  // ── Media & Creative Studies ──
  {
    id: "dip-mc-001",
    name: "Diploma in Journalism and Mass Communication",
    programmeLevel: "Diploma",
    category: "Media & Creative Studies",
    description:
      "A programme covering news reporting, media law, broadcasting, digital media, and photojournalism.",
    kcseRequirements:
      "Mean grade C (plain). Must have C+ in English.",
    careerPaths: [
      "Journalist",
      "News Reporter",
      "Content Creator",
      "Media Production Assistant",
    ],
    institutions: [
      "Kenya Institute of Mass Communication",
      "Multimedia University of Kenya",
      "Daystar University",
    ],
    sourceCitation:
      "Kenya Institute of Mass Communication; Media Council of Kenya — https://mediacouncil.or.ke",
  },
  {
    id: "dip-mc-002",
    name: "Diploma in Film and Animation",
    programmeLevel: "Diploma",
    category: "Media & Creative Studies",
    description:
      "A programme covering video production, cinematography, animation, visual effects, and post-production editing.",
    kcseRequirements:
      "Mean grade C (plain). Must have C in English.",
    careerPaths: [
      "Video Producer",
      "Animator",
      "Film Editor",
      "Visual Effects Artist",
    ],
    institutions: [
      "Multimedia University of Kenya",
      "Kenya Institute of Mass Communication",
    ],
    sourceCitation:
      "Multimedia University of Kenya; Kenya Film Commission — https://kenyafilmcommission.com",
  },
]

// ──────────────────────────────────────────────
//  CERTIFICATE PROGRAMMES
// ──────────────────────────────────────────────

const certificateCourses: Course[] = [
  // ── Business & Entrepreneurship ──
  {
    id: "cert-be-001",
    name: "Certificate in Business Management",
    programmeLevel: "Certificate",
    category: "Business & Entrepreneurship",
    description:
      "A one-year programme covering basic business administration, bookkeeping, marketing, and entrepreneurship skills.",
    kcseRequirements: "Mean grade D+ (plus) or KCPE certificate.",
    careerPaths: [
      "Office Assistant",
      "Small Business Owner",
      "Sales Agent",
      "Customer Service Representative",
    ],
    institutions: [
      "NIBS Technical College",
      "Kenya Institute of Management",
      "Various TVET institutions countrywide",
    ],
    sourceCitation: "TVETA Accredited Programme Listings — https://tveta.go.ke",
  },
  {
    id: "cert-be-002",
    name: "Certificate in Entrepreneurship",
    programmeLevel: "Certificate",
    category: "Business & Entrepreneurship",
    description:
      "A programme designed to equip learners with skills in starting and running small businesses, covering business planning, finance, and marketing.",
    kcseRequirements: "Mean grade D (plain) or equivalent.",
    careerPaths: [
      "Entrepreneur",
      "Small Business Manager",
      "Self-Employed Professional",
    ],
    institutions: [
      "Kenya Institute of Management",
      "Various TVET institutions countrywide",
    ],
    sourceCitation: "TVETA Accredited Programme Listings — https://tveta.go.ke",
  },

  // ── ICT & Computer Skills ──
  {
    id: "cert-ict-001",
    name: "Certificate in Information Communication Technology",
    programmeLevel: "Certificate",
    category: "ICT & Computer Skills",
    description:
      "A one-year programme covering computer applications, basic networking, web design, and computer maintenance.",
    kcseRequirements: "Mean grade D (plain). Basic literacy required.",
    careerPaths: [
      "Computer Operator",
      "IT Help Desk Assistant",
      "Data Entry Clerk",
      "Cyber Cafe Operator",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Kenya Polytechnic (TUK)",
      "Computer learning centres",
    ],
    sourceCitation: "TVETA Accredited Programme Listings — https://tveta.go.ke",
  },
  {
    id: "cert-ict-002",
    name: "Certificate in Computer Applications",
    programmeLevel: "Certificate",
    category: "ICT & Computer Skills",
    description:
      "A short course covering Microsoft Office suite, internet usage, email communication, and basic data management.",
    kcseRequirements: "Mean grade D (plain) or KCPE certificate.",
    careerPaths: [
      "Office Clerk",
      "Data Entry Operator",
      "Secretary",
      "Virtual Assistant",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "NIBS Technical College",
    ],
    sourceCitation: "TVETA Accredited Programme Listings — https://tveta.go.ke",
  },

  // ── Hospitality & Tourism ──
  {
    id: "cert-ht-001",
    name: "Certificate in Food and Beverage Production",
    programmeLevel: "Certificate",
    category: "Hospitality & Tourism",
    description:
      "A one-year programme covering cookery, food preparation, kitchen management, and food hygiene standards.",
    kcseRequirements: "Mean grade D (plain).",
    careerPaths: [
      "Chef",
      "Cook",
      "Kitchen Supervisor",
      "Catering Entrepreneur",
    ],
    institutions: [
      "Kenya Utalii College",
      "Various TVET institutions countrywide",
    ],
    sourceCitation:
      "Kenya Utalii College; TVETA — https://utalii.ac.ke",
  },
  {
    id: "cert-ht-002",
    name: "Certificate in Tour Guiding",
    programmeLevel: "Certificate",
    category: "Hospitality & Tourism",
    description:
      "A programme training students in tour operations, wildlife knowledge, first aid, and customer relations for Kenya's tourism sector.",
    kcseRequirements: "Mean grade D+ (plus). Must have D+ in English.",
    careerPaths: [
      "Tour Guide",
      "Safari Guide",
      "Museum Guide",
      "Cultural Tourism Facilitator",
    ],
    institutions: [
      "Kenya Utalii College",
      "Kenya Wildlife Service Training Institute",
    ],
    sourceCitation:
      "Kenya Utalii College; Tourism Regulatory Authority — https://tourismauthority.go.ke",
  },

  // ── Technical Trades ──
  {
    id: "cert-tt-001",
    name: "Certificate in Motor Vehicle Mechanics",
    programmeLevel: "Certificate",
    category: "Technical Trades",
    description:
      "A one-year programme covering vehicle engine repair, braking systems, electrical systems, and general vehicle maintenance.",
    kcseRequirements: "Mean grade D (plain). Basic Mathematics and English.",
    careerPaths: [
      "Motor Vehicle Mechanic",
      "Auto Electrician",
      "Garage Manager",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Don Bosco Technical Institute",
    ],
    sourceCitation: "TVETA Accredited Programme Listings — https://tveta.go.ke",
  },
  {
    id: "cert-tt-002",
    name: "Certificate in Electrical Installation",
    programmeLevel: "Certificate",
    category: "Technical Trades",
    description:
      "A programme covering domestic and industrial wiring, electrical safety, and basic electronics.",
    kcseRequirements: "Mean grade D (plain). Must have D in Mathematics.",
    careerPaths: [
      "Electrician",
      "Electrical Installer",
      "Maintenance Electrician",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Don Bosco Technical Institute",
      "St. Kizito Technical Institute",
    ],
    sourceCitation: "TVETA Accredited Programme Listings — https://tveta.go.ke",
  },

  // ── Health Support Services ──
  {
    id: "cert-hss-001",
    name: "Certificate in Community Health",
    programmeLevel: "Certificate",
    category: "Health Support Services",
    description:
      "A programme training community health volunteers and assistants in primary healthcare, health education, and disease prevention.",
    kcseRequirements: "Mean grade D+ (plus). Must have D+ in Biology or Science.",
    careerPaths: [
      "Community Health Volunteer",
      "Health Assistant",
      "Public Health Assistant",
    ],
    institutions: [
      "KMTC — various campuses",
      "County Health Training Centres",
    ],
    sourceCitation: "KMTC Programme Listings — https://kmtc.ac.ke",
  },
  {
    id: "cert-hss-002",
    name: "Certificate in Health Records and Information Technology",
    programmeLevel: "Certificate",
    category: "Health Support Services",
    description:
      "A programme covering medical records management, health data systems, and health information technology.",
    kcseRequirements: "Mean grade C- (minus). Must have C- in English and Mathematics.",
    careerPaths: [
      "Health Records Officer",
      "Medical Data Clerk",
      "Health Information Technician",
    ],
    institutions: [
      "KMTC — various campuses",
    ],
    sourceCitation: "KMTC Programme Listings — https://kmtc.ac.ke",
  },

  // ── Agriculture Skills ──
  {
    id: "cert-as-001",
    name: "Certificate in Agriculture",
    programmeLevel: "Certificate",
    category: "Agriculture Skills",
    description:
      "A one-year programme covering basic crop and livestock production, farm management, and agribusiness skills.",
    kcseRequirements: "Mean grade D+ (plus). Must have D in Agriculture or Biology.",
    careerPaths: [
      "Farm Worker",
      "Agricultural Assistant",
      "Smallholder Farmer",
      "Agri-input Sales Agent",
    ],
    institutions: [
      "Bukura Agricultural College",
      "Embu Agricultural College",
      "Various Agricultural Training Centres",
    ],
    sourceCitation:
      "Ministry of Agriculture; Agricultural Training Centres — https://kilimo.go.ke",
  },
  {
    id: "cert-as-002",
    name: "Certificate in Horticulture",
    programmeLevel: "Certificate",
    category: "Agriculture Skills",
    description:
      "A programme covering floriculture, vegetable production, fruit growing, and greenhouse management for Kenya's horticultural export sector.",
    kcseRequirements: "Mean grade D+ (plus).",
    careerPaths: [
      "Horticulturist",
      "Greenhouse Technician",
      "Flower Farm Supervisor",
      "Export Compliance Officer",
    ],
    institutions: [
      "Bukura Agricultural College",
      "Ahiti Ndomba",
      "Various Agricultural Training Centres",
    ],
    sourceCitation:
      "Ministry of Agriculture; Horticultural Crops Directorate — https://horticulture.agricultureauthority.go.ke",
  },
]

// ──────────────────────────────────────────────
//  ARTISAN / TVET PROGRAMMES
// ──────────────────────────────────────────────

const artisanCourses: Course[] = [
  // ── Electrical & Electronics ──
  {
    id: "art-ee-001",
    name: "Artisan in Electrical Installation",
    programmeLevel: "Artisan",
    category: "Electrical & Electronics",
    description:
      "A one-year programme covering basic electrical wiring, house wiring, safety procedures, and use of electrical tools and instruments.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Electrician",
      "Electrical Installer",
      "Maintenance Assistant",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
  {
    id: "art-ee-002",
    name: "Artisan in Electronics",
    programmeLevel: "Artisan",
    category: "Electrical & Electronics",
    description:
      "A programme covering basic electronics, radio and TV repair, mobile phone repair, and electronic circuit assembly.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Electronics Repair Technician",
      "Mobile Phone Technician",
      "TV Repair Technician",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "Don Bosco Technical Institute",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
  {
    id: "art-ee-003",
    name: "Artisan in Solar PV Installation",
    programmeLevel: "Artisan",
    category: "Electrical & Electronics",
    description:
      "A specialized programme covering solar panel installation, battery systems, solar lighting, and renewable energy basics for off-grid solutions.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Solar Technician",
      "Renewable Energy Installer",
      "Solar Sales Agent",
    ],
    institutions: [
      "Various TVET institutions",
      "Energy and Petroleum Regulatory Authority accredited centres",
    ],
    sourceCitation:
      "TVETA; Energy and Petroleum Regulatory Authority — https://epra.go.ke",
  },

  // ── Mechanical & Automotive ──
  {
    id: "art-ma-001",
    name: "Artisan in Motor Vehicle Mechanics",
    programmeLevel: "Artisan",
    category: "Mechanical & Automotive",
    description:
      "A one-year programme covering engine overhaul, braking systems, suspension, steering, and basic vehicle electrics.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Motor Vehicle Mechanic",
      "Garage Assistant",
      "Jua Kali Mechanic",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "Don Bosco Technical Institute",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
  {
    id: "art-ma-002",
    name: "Artisan in Motorcycle and Bicycle Repair",
    programmeLevel: "Artisan",
    category: "Mechanical & Automotive",
    description:
      "A programme covering motorcycle (boda boda) repair, bicycle maintenance, and basic engine servicing for the growing two-wheeler transport sector.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Motorcycle Mechanic",
      "Boda Boda Repair Technician",
      "Two-Wheeler Workshop Owner",
    ],
    institutions: [
      "Youth Polytechnics",
      "Jua Kali Training Centres",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },

  // ── Construction Trades ──
  {
    id: "art-ct-001",
    name: "Artisan in Masonry",
    programmeLevel: "Artisan",
    category: "Construction Trades",
    description:
      "A programme covering bricklaying, block work, plastering, tiling, and basic construction skills for the building industry.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Mason",
      "Bricklayer",
      "Tiler",
      "Construction Worker",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "National Youth Service",
    ],
    sourceCitation:
      "TVETA Artisan Programme Listings; National Construction Authority — https://nca.go.ke",
  },
  {
    id: "art-ct-002",
    name: "Artisan in Carpentry and Joinery",
    programmeLevel: "Artisan",
    category: "Construction Trades",
    description:
      "A programme covering woodworking, furniture making, door and window frame construction, and roofing carpentry.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Carpenter",
      "Joiner",
      "Furniture Maker",
      "Roofing Carpenter",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "Don Bosco Technical Institute",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
  {
    id: "art-ct-003",
    name: "Artisan in Painting and Decoration",
    programmeLevel: "Artisan",
    category: "Construction Trades",
    description:
      "A programme covering surface preparation, interior and exterior painting, decorative finishes, and colour theory.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Painter",
      "Decorator",
      "Signwriter",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },

  // ── Metal & Fabrication ──
  {
    id: "art-mf-001",
    name: "Artisan in Welding and Fabrication",
    programmeLevel: "Artisan",
    category: "Metal & Fabrication",
    description:
      "A programme covering arc welding, gas welding, metal cutting, and fabrication of gates, grilles, and structural components.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Welder",
      "Metal Fabricator",
      "Jua Kali Artisan",
      "Structural Fabricator",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "National Youth Service",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
  {
    id: "art-mf-002",
    name: "Artisan in Sheet Metal Work",
    programmeLevel: "Artisan",
    category: "Metal & Fabrication",
    description:
      "A programme covering sheet metal cutting, bending, forming, and fabrication of items like water tanks, gutters, and ventilation ducts.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Sheet Metal Worker",
      "HVAC Duct Fabricator",
      "Tinsmith",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },

  // ── Plumbing & Water Technology ──
  {
    id: "art-pw-001",
    name: "Artisan in Plumbing",
    programmeLevel: "Artisan",
    category: "Plumbing & Water Technology",
    description:
      "A programme covering pipe fitting, water supply systems, drainage installation, and sanitary fixtures installation.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Plumber",
      "Pipe Fitter",
      "Sanitary Installer",
      "Water Systems Technician",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "National Youth Service",
    ],
    sourceCitation:
      "TVETA Artisan Programme Listings; National Construction Authority — https://nca.go.ke",
  },
  {
    id: "art-pw-002",
    name: "Artisan in Water Technology",
    programmeLevel: "Artisan",
    category: "Plumbing & Water Technology",
    description:
      "A programme covering water purification, borehole maintenance, water harvesting systems, and basic water treatment for rural and urban communities.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Water Technician",
      "Borehole Operator",
      "Water Treatment Assistant",
    ],
    institutions: [
      "Water Resources Authority Training Centres",
      "Various TVET institutions",
    ],
    sourceCitation:
      "TVETA; Water Resources Authority — https://wra.go.ke",
  },

  // ── Beauty & Fashion Trades ──
  {
    id: "art-bf-001",
    name: "Artisan in Hairdressing and Beauty Therapy",
    programmeLevel: "Artisan",
    category: "Beauty & Fashion Trades",
    description:
      "A programme covering hairstyling, skin care, nail technology, make-up application, and salon management.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Hairdresser",
      "Beauty Therapist",
      "Salon Owner",
      "Make-up Artist",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "Private beauty colleges",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
  {
    id: "art-bf-002",
    name: "Artisan in Fashion Design and Garment Making",
    programmeLevel: "Artisan",
    category: "Beauty & Fashion Trades",
    description:
      "A programme covering pattern making, fabric cutting, sewing, embroidery, and fashion design basics.",
    kcseRequirements: "KCPE certificate or KCSE mean grade D (plain).",
    careerPaths: [
      "Tailor",
      "Fashion Designer",
      "Garment Maker",
      "Textile Worker",
    ],
    institutions: [
      "Various TVET institutions countrywide",
      "Youth Polytechnics",
      "Buruburu Institute of Fine Arts",
    ],
    sourceCitation: "TVETA Artisan Programme Listings — https://tveta.go.ke",
  },
]

// ──────────────────────────────────────────────
//  COMBINED DATABASE EXPORT
// ──────────────────────────────────────────────

export const allCourses: Course[] = [
  ...degreeCourses,
  ...diplomaCourses,
  ...certificateCourses,
  ...artisanCourses,
]

export function getCoursesByLevel(level: ProgrammeLevel): Course[] {
  return allCourses.filter((c) => c.programmeLevel === level)
}

export function getCoursesByCategory(
  level: ProgrammeLevel,
  category: string
): Course[] {
  return allCourses.filter(
    (c) => c.programmeLevel === level && c.category === category
  )
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase()
  return allCourses.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.careerPaths.some((p) => p.toLowerCase().includes(q)) ||
      c.institutions.some((i) => i.toLowerCase().includes(q))
  )
}

export function getCategoriesForLevel(level: ProgrammeLevel): string[] {
  const pc = programmeCategories.find((p) => p.level === level)
  return pc ? pc.categories : []
}

// ──────────────────────────────────────────────
//  SOURCE CITATIONS
// ──────────────────────────────────────────────

export const sourceCitations = [
  {
    name: "KUCCPS — Kenya Universities and Colleges Central Placement Service",
    url: "https://kuccps.net",
    description:
      "Official government portal for university and college placement in Kenya. Primary source for programme listings and KCSE entry requirements.",
  },
  {
    name: "KMTC — Kenya Medical Training College",
    url: "https://kmtc.ac.ke",
    description:
      "Official portal for KMTC programme listings including diploma and certificate health courses.",
  },
  {
    name: "TVETA — Technical and Vocational Education and Training Authority",
    url: "https://tveta.go.ke",
    description:
      "Government authority overseeing TVET institutions and accredited programme listings in Kenya.",
  },
  {
    name: "University of Nairobi",
    url: "https://uonbi.ac.ke",
    description: "Kenya's oldest and largest university. Programme details sourced from faculty pages.",
  },
  {
    name: "JKUAT — Jomo Kenyatta University of Agriculture and Technology",
    url: "https://jkuat.ac.ke",
    description: "Leading technical university in Kenya. Programme details from official academic pages.",
  },
  {
    name: "Kenyatta University",
    url: "https://ku.ac.ke",
    description: "Major public university with comprehensive programme offerings.",
  },
  {
    name: "Strathmore University",
    url: "https://strathmore.edu",
    description:
      "Leading private university known for IT, business, and law programmes.",
  },
  {
    name: "Egerton University",
    url: "https://egerton.ac.ke",
    description: "Premier agricultural university in Kenya.",
  },
  {
    name: "Kenya Utalii College",
    url: "https://utalii.ac.ke",
    description: "Premier hospitality and tourism training institution in East Africa.",
  },
  {
    name: "Engineers Board of Kenya",
    url: "https://ebk.go.ke",
    description: "Regulatory body for engineering programmes and professional registration.",
  },
  {
    name: "Teachers Service Commission",
    url: "https://tsc.go.ke",
    description: "Government body responsible for teacher registration and management.",
  },
  {
    name: "Nursing Council of Kenya",
    url: "https://nckenya.com",
    description: "Regulatory body for nursing education and practice.",
  },
  {
    name: "Council of Legal Education",
    url: "https://cle.or.ke",
    description: "Regulatory body for legal education in Kenya.",
  },
]
