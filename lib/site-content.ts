// Master content aggregator for AI Assistant
// This file consolidates all site content (careers, scholarships, universities, entrepreneurship)
// into a structured format that the AI can reference for accurate, current information

import { allCourses } from "@/lib/careers-data"

// Type definitions for structured content
export interface SiteContent {
  careers: {
    courses: typeof allCourses
    summary: string
  }
  scholarships: {
    count: number
    summary: string
  }
  universities: {
    count: number
    summary: string
  }
  entrepreneurship: {
    summary: string
  }
}

// Format careers data for AI context
function formatCareersContent() {
  const careersText = allCourses
    .map((course) => {
      const paths = course.careerPaths?.join(", ") || course.careerPaths.join(", ")
      const institutions = course.institutions?.join(", ") || course.institutions.join(", ")

      return `
## ${course.name} (${course.id})
- **Programme Level:** ${course.programmeLevel}
- **Category:** ${course.category}
- **Description:** ${course.description}
- **KCSE Requirements:** ${course.kcseRequirements}
- **Career Paths:** ${paths}
- **Available At:** ${institutions}
- **About Career:** ${course.aboutCareer || "N/A"}
- **Academic Structure:** ${course.academicStructure || "N/A"}
- **Job Market:** ${course.jobMarketTrends?.demandOutlook || "N/A"}
- **Salary Range:** Entry: ${course.salaryInsights?.entryLevel || "N/A"}, Mid: ${course.salaryInsights?.midCareer || "N/A"}, Senior: ${course.salaryInsights?.seniorLevel || "N/A"}
`
    })
    .join("\n")

  return careersText
}

// Format scholarships summary
function formatScholarshipsContent() {
  return `
## Scholarships
ACCESS platform offers information and guidance on numerous scholarships:
- Kenyan national scholarships (government-funded opportunities)
- International scholarships from prestigious organizations
- Merit-based and need-based awards
- Country-specific scholarships for study abroad programs
- Fully-funded and partial scholarship opportunities

Students can search, filter, and compare scholarships by:
- Category (National, International, Grants, etc.)
- Eligibility level (Secondary, Undergraduate, Postgraduate)
- Location (Kenya-based or International)
- Application status and deadlines

Key scholarship categories:
- National scholarships for Kenyan students
- STEM and business-focused scholarships
- International development scholarships
- Erasmus Mundus (EU scholarships)
- Chevening (UK scholarships)
- Australia Awards and Chinese Government scholarships
`
}

// Format universities summary
function formatUniversitiesContent() {
  return `
## Universities
ACCESS platform features information on world-class universities:
- Ivy League and top-ranked global institutions
- Location-based filtering by country
- Program focus areas (Engineering, Business, Medicine, etc.)
- World rankings and acceptance rates
- Tuition fees and student population data

Featured universities include:
- Harvard University (USA)
- Stanford University (USA)
- Oxford University (UK)
- Cambridge University (UK)
- University of Toronto (Canada)

For each university, students can access:
- Popular programs and courses
- Application deadlines and processes
- Admission requirements and qualifications
- Tuition fees and financial aid information
- Acceptance rates and world rankings
- Campus life and considerations
`
}

// Format entrepreneurship summary
function formatEntrepreneurshipContent() {
  return `
## Entrepreneurship
ACCESS platform celebrates and educates about entrepreneurship through:
- Stories and insights from successful entrepreneurs
- Educational resources and learning materials
- Mentorship opportunities with experienced founders
- Startup ecosystem information
- Business development strategies

Key entrepreneurship areas covered:
- Tech entrepreneurship and startups
- Social entrepreneurship and impact ventures
- Small business and enterprise development
- Innovation and problem-solving frameworks
- Funding and investment strategies for startups

The platform features:
- Real entrepreneur interviews and case studies
- Educational videos from top institutions
- Articles from industry leaders and publications
- Practical entrepreneurship guides and resources
`
}

// Aggregate all content for AI context
export function getFullSiteContent(): SiteContent {
  return {
    careers: {
      courses: allCourses,
      summary: formatCareersContent(),
    },
    scholarships: {
      count: 15, // Approximate count from scholarships page
      summary: formatScholarshipsContent(),
    },
    universities: {
      count: 10, // Approximate count from universities page
      summary: formatUniversitiesContent(),
    },
    entrepreneurship: {
      summary: formatEntrepreneurshipContent(),
    },
  }
}

// Generate AI system prompt with current site content
export function generateAISystemPrompt(): string {
  const siteContent = getFullSiteContent()

  return `You are a comprehensive AI career advisor for the ACCESS platform, a Kenyan educational platform empowering students with career guidance, academic planning, and educational opportunities.

## About ACCESS Platform
ACCESS (Academic Career Exploration and Scholarship Support System) helps Kenyan students and young professionals:
- Explore career options and academic pathways
- Find scholarships and funding opportunities
- Research universities locally and internationally
- Learn from successful entrepreneurs
- Make informed decisions about their future

## Your Expertise Areas
You specialize in:
1. **Career Guidance:** Detailed information on Kenyan academic programs (degrees, diplomas, certificates)
2. **Academic Planning:** Study strategies, university requirements, KCSE cluster point calculations
3. **Scholarships:** Finding and applying for national and international funding opportunities
4. **Universities:** Admissions requirements, programs, rankings, and student experiences
5. **Entrepreneurship:** Starting businesses, innovation, funding, and success stories
6. **Professional Development:** Skills development, networking, and career advancement

## Current Site Content Knowledge Base

${siteContent.careers.summary}

${siteContent.scholarships.summary}

${siteContent.universities.summary}

${siteContent.entrepreneurship.summary}

## How to Provide Excellent Support
1. **Be Specific:** Reference actual programs, scholarships, and universities available on ACCESS
2. **Be Encouraging:** Support students in exploring diverse pathways and possibilities
3. **Be Practical:** Provide actionable steps and concrete guidance
4. **Be Informed:** Use the current content above - it represents what's available on the platform
5. **Be Empathetic:** Understand the pressures and challenges of academic decision-making
6. **Be Honest:** If you're unsure about specific details, direct students to check the platform directly

## Student Support Guidelines
- Help students understand their strengths and interests
- Guide them toward suitable career paths and educational options
- Provide scholarship research and application advice
- Support university selection and application processes
- Encourage entrepreneurial thinking and innovation
- Celebrate diverse paths to success

When students ask about specific careers, scholarships, or universities, reference the detailed information above. Always encourage students to explore the full ACCESS platform for the most current information and opportunities.`
}
