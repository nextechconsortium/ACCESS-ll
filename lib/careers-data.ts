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
      "A four-year degree programme preparing students for professional nursing practice. Covers medical-surgical nursing, community health, and midwifery.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have B+ in Biology and Chemistry, B in Mathematics and English.",
    careerPaths: [
      "Registered Nurse",
      "Midwife",
      "Community Health Nurse",
      "Nursing Educator",
      "Nurse Manager",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
      "Kenyatta University",
      "Masinde Muliro University",
      "Kenya Methodist University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Nursing Council of Kenya — https://nckenya.com",
  },
  {
    id: "d-mhs-004",
    name: "Bachelor of Dental Surgery (BDS)",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A six-year programme providing training in dentistry, oral health, and dental surgery. Graduates are registered by the Kenya Medical Practitioners and Dentists Council.",
    kcseRequirements:
      "Mean grade A- (minus) and above. Must have A in Biology and Chemistry, B+ in Physics/Mathematics.",
    careerPaths: [
      "Dentist",
      "Oral Surgeon",
      "Orthodontist",
      "Dental Public Health Officer",
      "Dental Researcher",
    ],
    institutions: [
      "University of Nairobi",
      "Moi University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi Dental School — https://healthsciences.uonbi.ac.ke",
  },
  {
    id: "d-mhs-005",
    name: "Bachelor of Science in Clinical Medicine",
    programmeLevel: "Degree",
    category: "Medical & Health Sciences",
    description:
      "A programme that trains clinical officers to diagnose, treat, and manage patients. Graduates work alongside doctors in hospitals and health centres.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have B+ in Biology, Chemistry, and Mathematics/Physics.",
    careerPaths: [
      "Clinical Officer",
      "Clinical Medicine Specialist",
      "Health Facility Manager",
      "Public Health Officer",
    ],
    institutions: [
      "Kenyatta University",
      "Moi University",
      "Egerton University",
      "Kenya Methodist University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Clinical Officers Council — https://clinicalofficerscouncil.org",
  },

  // ── Engineering & Technology ──
  {
    id: "d-et-001",
    name: "Bachelor of Science in Civil Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A five-year programme covering structural engineering, transportation, water resources, and construction management. Accredited by the Engineers Board of Kenya.",
    kcseRequirements:
      "Mean grade B+ (plus) and above. Must have A- in Mathematics, B+ in Physics, B+ in Chemistry.",
    careerPaths: [
      "Civil Engineer",
      "Structural Engineer",
      "Transportation Engineer",
      "Construction Project Manager",
      "Urban Planner",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Technical University of Kenya",
      "Dedan Kimathi University of Technology",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Engineers Board of Kenya — https://ebk.go.ke",
  },
  {
    id: "d-et-002",
    name: "Bachelor of Science in Electrical and Electronic Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A five-year programme covering power systems, electronics, telecommunications, and control systems. Accredited by the Engineers Board of Kenya.",
    kcseRequirements:
      "Mean grade B+ (plus) and above. Must have A- in Mathematics, B+ in Physics, B in Chemistry.",
    careerPaths: [
      "Electrical Engineer",
      "Electronics Engineer",
      "Telecommunications Engineer",
      "Power Systems Engineer",
      "Control Systems Engineer",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Technical University of Kenya",
      "Dedan Kimathi University of Technology",
      "Multimedia University of Kenya",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Engineers Board of Kenya — https://ebk.go.ke",
  },
  {
    id: "d-et-003",
    name: "Bachelor of Science in Mechanical Engineering",
    programmeLevel: "Degree",
    category: "Engineering & Technology",
    description:
      "A five-year programme covering thermodynamics, fluid mechanics, manufacturing, and machine design. Accredited by the Engineers Board of Kenya.",
    kcseRequirements:
      "Mean grade B+ (plus) and above. Must have A- in Mathematics, B+ in Physics, B in Chemistry.",
    careerPaths: [
      "Mechanical Engineer",
      "Manufacturing Engineer",
      "Automotive Engineer",
      "Energy Consultant",
      "HVAC Engineer",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Technical University of Kenya",
      "Dedan Kimathi University of Technology",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Engineers Board of Kenya — https://ebk.go.ke",
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
      "A four-year programme covering micro and macroeconomics, econometrics, development economics, and economic policy analysis.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Mathematics, C+ in English.",
    careerPaths: [
      "Economist",
      "Policy Analyst",
      "Research Analyst",
      "Financial Planner",
      "Development Consultant",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Strathmore University",
      "Egerton University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
  },
  {
    id: "d-be-003",
    name: "Bachelor of Science in Actuarial Science",
    programmeLevel: "Degree",
    category: "Business & Economics",
    description:
      "A four-year programme in risk assessment, insurance mathematics, financial modelling, and probability theory. Highly competitive and well-paying field in Kenya.",
    kcseRequirements:
      "Mean grade A- (minus). Must have A in Mathematics, B+ in English.",
    careerPaths: [
      "Actuary",
      "Risk Analyst",
      "Insurance Underwriter",
      "Pension Consultant",
      "Quantitative Analyst",
    ],
    institutions: [
      "University of Nairobi",
      "JKUAT",
      "Strathmore University",
      "Kenyatta University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Insurance Regulatory Authority — https://ira.go.ke",
  },
  {
    id: "d-be-004",
    name: "Bachelor of Science in Finance",
    programmeLevel: "Degree",
    category: "Business & Economics",
    description:
      "A programme focused on corporate finance, investment analysis, banking, financial markets, and international finance.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Mathematics, C+ in English.",
    careerPaths: [
      "Financial Analyst",
      "Investment Banker",
      "Portfolio Manager",
      "Credit Analyst",
      "Treasury Manager",
    ],
    institutions: [
      "Strathmore University",
      "University of Nairobi",
      "KCA University",
      "USIU-Africa",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Capital Markets Authority — https://cma.or.ke",
  },

  // ── Education & Teaching ──
  {
    id: "d-edu-001",
    name: "Bachelor of Education (Arts)",
    programmeLevel: "Degree",
    category: "Education & Teaching",
    description:
      "A four-year programme training secondary school teachers in arts subjects including English, Kiswahili, History, Geography, CRE, and Business Studies.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in two teaching subjects, C+ in English and Mathematics.",
    careerPaths: [
      "Secondary School Teacher",
      "Education Administrator",
      "Curriculum Developer",
      "Education Consultant",
      "School Principal",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Moi University",
      "Maseno University",
      "Egerton University",
      "Masinde Muliro University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Teachers Service Commission — https://tsc.go.ke",
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
      "A four-year programme covering crop science, soil science, agricultural economics, and farm management. Essential for Kenya's agricultural sector.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Biology, C+ in Chemistry and Mathematics.",
    careerPaths: [
      "Agricultural Officer",
      "Farm Manager",
      "Agronomist",
      "Agricultural Researcher",
      "Extension Officer",
    ],
    institutions: [
      "Egerton University",
      "University of Nairobi",
      "JKUAT",
      "Moi University",
      "Chuka University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Egerton University Faculty of Agriculture — https://egerton.ac.ke",
  },
  {
    id: "d-ag-002",
    name: "Bachelor of Science in Environmental Science",
    programmeLevel: "Degree",
    category: "Agriculture & Environmental Sciences",
    description:
      "A programme covering environmental management, conservation, climate change, and environmental impact assessment.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Biology, C+ in Chemistry and Geography.",
    careerPaths: [
      "Environmental Scientist",
      "Conservation Officer",
      "EIA Consultant",
      "Climate Change Analyst",
      "NEMA Officer",
    ],
    institutions: [
      "Kenyatta University",
      "University of Nairobi",
      "Moi University",
      "Egerton University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; NEMA — https://nema.go.ke",
  },
  {
    id: "d-ag-003",
    name: "Bachelor of Science in Food Science and Technology",
    programmeLevel: "Degree",
    category: "Agriculture & Environmental Sciences",
    description:
      "A programme covering food processing, preservation, quality control, nutrition, and food safety standards.",
    kcseRequirements:
      "Mean grade B (plain). Must have B in Chemistry and Biology, C+ in Mathematics/Physics.",
    careerPaths: [
      "Food Technologist",
      "Quality Assurance Manager",
      "Food Safety Officer",
      "Nutritionist",
      "Product Development Scientist",
    ],
    institutions: [
      "JKUAT",
      "Egerton University",
      "University of Nairobi",
      "Technical University of Kenya",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenya Bureau of Standards — https://kebs.org",
  },

  // ── Natural & Physical Sciences ──
  {
    id: "d-nps-001",
    name: "Bachelor of Science in Mathematics",
    programmeLevel: "Degree",
    category: "Natural & Physical Sciences",
    description:
      "A programme covering pure and applied mathematics, statistics, and mathematical modelling for research and industry applications.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have A- in Mathematics, B in Physics.",
    careerPaths: [
      "Mathematician",
      "Statistician",
      "Data Analyst",
      "Quantitative Researcher",
      "Actuarial Analyst",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "JKUAT",
      "Maseno University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
  },
  {
    id: "d-nps-002",
    name: "Bachelor of Science in Physics",
    programmeLevel: "Degree",
    category: "Natural & Physical Sciences",
    description:
      "A programme covering classical and modern physics, quantum mechanics, thermodynamics, and electronics. Provides a strong foundation for technology and research careers.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have A- in Physics, B+ in Mathematics.",
    careerPaths: [
      "Physicist",
      "Research Scientist",
      "Telecommunications Engineer",
      "Medical Physicist",
      "Energy Analyst",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "JKUAT",
      "Moi University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
  },
  {
    id: "d-nps-003",
    name: "Bachelor of Science in Chemistry",
    programmeLevel: "Degree",
    category: "Natural & Physical Sciences",
    description:
      "A programme covering organic, inorganic, physical, and analytical chemistry. Prepares students for careers in research, industry, and environmental monitoring.",
    kcseRequirements:
      "Mean grade B+ (plus). Must have A- in Chemistry, B in Mathematics and Physics.",
    careerPaths: [
      "Chemist",
      "Quality Control Analyst",
      "Environmental Chemist",
      "Pharmaceutical Chemist",
      "Lab Technologist",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "JKUAT",
      "Egerton University",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Kenya Chemical Society — https://uonbi.ac.ke",
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
      "A programme covering graphic design, industrial design, interior design, and visual communication. Develops creative and technical design skills.",
    kcseRequirements:
      "Mean grade C+ (plus). Must have C+ in English, C in Art and Design or any relevant subject.",
    careerPaths: [
      "Graphic Designer",
      "UI/UX Designer",
      "Interior Designer",
      "Brand Strategist",
      "Art Director",
    ],
    institutions: [
      "University of Nairobi",
      "Kenyatta University",
      "Technical University of Kenya",
      "Multimedia University of Kenya",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; University of Nairobi — https://uonbi.ac.ke",
  },
  {
    id: "d-cam-002",
    name: "Bachelor of Arts in Communication and Media Studies",
    programmeLevel: "Degree",
    category: "Creative Arts, Media & Design",
    description:
      "A programme covering journalism, public relations, broadcasting, digital media, and corporate communication.",
    kcseRequirements:
      "Mean grade B- (minus). Must have B in English, C+ in Kiswahili.",
    careerPaths: [
      "Journalist",
      "Public Relations Officer",
      "Media Producer",
      "Corporate Communications Manager",
      "Social Media Strategist",
    ],
    institutions: [
      "University of Nairobi",
      "Daystar University",
      "Moi University",
      "Multimedia University of Kenya",
      "USIU-Africa",
    ],
    sourceCitation:
      "KUCCPS Programme Catalogue; Media Council of Kenya — https://mediacouncil.or.ke",
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
