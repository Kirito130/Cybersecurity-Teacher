import type { Topic } from "./types";

export const topics15: Topic[] = [
  {
    "id": "15.1",
    "blockId": "15",
    "slug": "15-1",
    "title": "Engagement operations and coverage",
    "subtopics": [
      {
        "id": "15.1.1",
        "title": "Delivery planning",
        "concepts": "objectives, scope, access requirements, dependencies, time allocation, status updates",
        "reading": {
          "label": "NIST: planning/execution/post-testing",
          "url": "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        "video": {
          "label": "Hacker101: pentest series",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "15.1.2",
        "title": "Coverage",
        "concepts": "asset/test matrix, authenticated roles, excluded tests, failed prerequisites, unknowns",
        "reading": {
          "label": "WSTG: test framework and reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Starter's Guide with OWASP",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "15.1.3",
        "title": "Quality control",
        "concepts": "peer reproduction, evidence references, false-positive review, cleanup and data retention",
        "reading": {
          "label": "WSTG: reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Reporting and Best Practices",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      }
    ],
    "task": "prepare a statement-of-work-style plan for a fictional five-day engagement. Assign time to enumeration, manual testing, validation, reporting, and retesting. Have a peer change one requirement mid-plan; record its effect on scope and coverage. If studying alone, use a prewritten change card and do not silently expand the assignment."
  },
  {
    "id": "15.2",
    "blockId": "15",
    "slug": "15-2",
    "title": "Reports, debriefs, and remediation",
    "subtopics": [
      {
        "id": "15.2.1",
        "title": "Executive communication",
        "concepts": "business effect, realistic scenario, priorities, systemic causes, limitations",
        "reading": {
          "label": "WSTG: executive summary and report audience",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Writing Good Reports",
          "url": "https://www.hacker101.com/playlists/newcomers"
        }
      },
      {
        "id": "15.2.2",
        "title": "Technical communication",
        "concepts": "precise reproduction, role/asset/version, timestamps, proof, severity assumptions",
        "reading": {
          "label": "WSTG reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Pentest Reporting",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "15.2.3",
        "title": "Remediation",
        "concepts": "immediate containment, durable fix, owner/dependency, validation, residual risk",
        "reading": {
          "label": "NIST CSF: prioritization and improvement",
          "url": "https://www.nist.gov/cyberframework"
        },
        "video": {
          "label": "Hacker101: Reporting and Best Practices",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      }
    ],
    "task": "rewrite one previous report for two audiences: a business owner and an engineer. Deliver a ten-minute debrief with three priorities, followed by five minutes of questions. Ask the engineer to reproduce one finding and the business reader to explain why it matters. Revise wherever either cannot do so."
  },
  {
    "id": "15.3",
    "blockId": "15",
    "slug": "15-3",
    "title": "Portfolio and continuing development",
    "subtopics": [
      {
        "id": "15.3.1",
        "title": "Portfolio",
        "concepts": "sanitized reports, reproducible tooling, research notes, lab diagrams, attribution, honest contribution",
        "reading": {
          "label": "MIT: version control and code quality",
          "url": "https://missing.csail.mit.edu/"
        },
        "video": {
          "label": "MIT: corresponding recordings",
          "url": "https://missing.csail.mit.edu/"
        }
      },
      {
        "id": "15.3.2",
        "title": "Assessment readiness",
        "concepts": "unseen tasks, time management, exam rules, allowed tools, reporting completeness",
        "reading": {
          "label": "OffSec exam guide",
          "url": "https://help.offsec.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide"
        },
        "video": {
          "label": "Hacker101: pentesting resources and professional practice",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "15.3.3",
        "title": "Lifelong learning",
        "concepts": "vendor advisories, patch analysis, new standards, hypothesis notebook, specialist depth",
        "reading": {
          "label": "PortSwigger research",
          "url": "https://portswigger.net/research"
        },
        "video": {
          "label": "PortSwigger recorded research talks",
          "url": "https://portswigger.net/research/talks"
        }
      }
    ],
    "task": "assemble a private portfolio containing two sanitized assessment reports, one tested automation project, one research dossier, and a skills/limitations matrix. Record the tool/version/date for each artifact. Write a 90-day development plan around three evidenced weaknesses. Publish only content you are entitled to share; respect platform writeup and challenge-spoiler rules."
  }
];
