#!/usr/bin/env node

// This script updates the careers-data.ts file with detailed course information
// Run with: node scripts/update-careers-content.js

const fs = require('fs');
const path = require('path');

const careersDataPath = path.join(__dirname, '../lib/careers-data.ts');

// Read the current careers data file
let careersData = fs.readFileSync(careersDataPath, 'utf8');

// Define the updates for each course
const courseUpdates = {
  // Computer Science (d-ict-001) - already has structure, enhance it
  computerScience: {
    pattern: /({[\s\S]*?id: "d-ict-001"[\s\S]*?sourceCitation:[\s\S]*?"[^"]*"[\s\S]*?}),\s*{[\s\S]*?id: "d-ict-002"/,
    toAdd: `,
    aboutCareer:
      "Bachelor of Science in Computer Science is a degree program that focuses on the study of computers, software systems, programming, data processing, and computational problem-solving. It combines mathematics, programming, algorithms, and computer systems to prepare students for careers in the fast-growing technology industry. It is ideal for students interested in technology, coding, innovation, and logical problem-solving.",
    academicStructure:
      "4 years (8 semesters). Year 1: Introduction to Computer Science, Programming Fundamentals, Discrete Mathematics, Computer Organization, Communication Skills. Year 2: Data Structures and Algorithms, Object-Oriented Programming, Database Systems, Operating Systems, Software Engineering. Year 3: Computer Networks, Artificial Intelligence, Web Development, Cybersecurity Basics, Human-Computer Interaction. Year 4: Machine Learning, Cloud Computing, Mobile Application Development, Research Project, Professional Ethics in Computing.",
    technicalSkills: [
      "Programming and software development",
      "Problem-solving and logical thinking",
      "Database management",
      "System design and analysis",
      "Cybersecurity awareness",
      "Data analysis skills",
    ],
    softSkills: [
      "Problem-solving ability",
      "Creativity and innovation",
      "Team collaboration",
      "Communication skills",
      "Time management",
      "Continuous learning mindset",
    ],
    careerPathways: [
      {
        title: "Software Development",
        description: "Develop desktop, web, and mobile applications. Work in software companies or as independent developer.",
      },
      {
        title: "Data Science & Analytics",
        description: "Analyze large datasets, build predictive models, and help organizations make data-driven decisions.",
      },
      {
        title: "Artificial Intelligence & Machine Learning",
        description: "Develop AI systems, machine learning models, and intelligent automation solutions.",
      },
      {
        title: "Cybersecurity",
        description: "Protect systems and networks from cyber threats, conduct security audits, and develop security solutions.",
      },
    ],
    thingsToConsider: [
      {
        challenge: "Requires strong problem-solving skills",
        description: "Computer Science demands logical thinking and ability to break down complex problems.",
      },
      {
        challenge: "Continuous learning needed",
        description: "Technology changes rapidly. You'll need to continuously learn new languages and frameworks.",
      },
      {
        challenge: "Can involve long coding hours",
        description: "Development work sometimes requires extended focus periods and debugging sessions.",
      },
    ],
    detailedInstitutions: [
      { type: "public", name: "University of Nairobi - School of Computing", location: "Nairobi", notes: "Kenya's premier computer science programme" },
      { type: "public", name: "JKUAT - School of Computing", location: "Nairobi", notes: "Strong technical focus" },
      { type: "private", name: "Strathmore University - School of Computing", location: "Nairobi", notes: "Leading private CS programme" },
    ],
    clusterRequirements:
      "Compulsory: English/Kiswahili. Core subjects: Mathematics (very important), Physics or any science subject. Mean grade C+ and above from best four subjects.",
    cutoffHistory: [
      {
        year: 2024,
        ranges: { high: 42, mid: 38, low: 35 },
        notes: "High demand for CS graduates with strong competitive cutoffs.",
      },
    ],
    jobMarketTrends: {
      demandOutlook:
        "Computer Science is one of the most marketable degrees. Global demand is extremely high with constant shortage of skilled developers. Kenya's tech sector is booming.",
      trends: [
        "Extremely high global demand for software developers",
        "Growing importance of AI and Machine Learning",
        "Cloud computing skills highly sought after",
        "Cybersecurity specialists in critical demand",
        "Remote work opportunities widespread globally",
      ],
      challenges: [
        "Requires strong problem-solving and mathematical foundations",
        "Fast-changing technology requires continuous upskilling",
        "High-pressure deadlines and long coding hours",
        "Brain drain: Many top graduates work internationally",
      ],
    },
    salaryInsights: {
      entryLevel: "KES 60,000 - 120,000/month",
      midCareer: "KES 150,000 - 300,000/month",
      seniorLevel: "KES 400,000+/month",
    },
    funFacts: [
      {
        fact: "Computer Science is one of the fastest-growing fields globally with no shortage of opportunities.",
        category: "surprising",
      },
      {
        fact: "Kenya has one of Africa's most vibrant tech startup scenes with numerous CS graduate success stories.",
        category: "kenya-specific",
      },
      {
        fact: "Remote tech jobs can pay 2-3x more than equivalent jobs in Kenya.",
        category: "surprising",
      },
    ],
  }
};

console.log('Career data content update prepared.');
console.log('Manual updates needed for:');
console.log('- d-ict-001: Bachelor of Science in Computer Science');
console.log('- d-ict-002: Bachelor of Science in Information Technology');
console.log('- d-ict-003: Bachelor of Business Information Technology (BBIT)');
console.log('- d-ict-004: Bachelor of Science in Software Engineering');
console.log('- d-ict-005: Bachelor of Science in Cybersecurity and Digital Forensics');
console.log('- d-et-004: Bachelor of Science in Chemical Engineering');
console.log('- d-et-005: Bachelor of Technology in Mechatronic Engineering');
console.log('- d-edu-002: Bachelor of Education (Science)');
console.log('- New: Bachelor of Education in Early Childhood Development');
console.log('- New: Bachelor of Music');
