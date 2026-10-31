import type { Topic } from "./types";

export const topics00: Topic[] = [
  {
    "id": "00.1",
    "blockId": "00",
    "slug": "00-1",
    "title": "Understand the job and its boundaries",
    "subtopics": [
      {
        "id": "00.1.1",
        "title": "Roles",
        "concepts": "ethical hacking, penetration testing, vulnerability assessment, bug bounty, red/blue/purple teams",
        "reading": {
          "label": "NIST: assessment approaches",
          "url": "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        "video": {
          "label": "Hacker101: Pentesting vs Bug Bounty",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "00.1.2",
        "title": "Authorization",
        "concepts": "asset owner, scope, exclusions, test window, emergency stop, third-party dependencies",
        "reading": {
          "label": "NIST: planning and rules of engagement",
          "url": "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        "video": {
          "label": "Hacker101: Starter's Guide to Pentesting",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "00.1.3",
        "title": "Professional conduct",
        "concepts": "minimum evidence, synthetic data, confidentiality, coordinated reporting, cleanup",
        "reading": {
          "label": "OWASP WSTG: introduction and reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Reporting and Best Practices",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      }
    ],
    "task": "write a one-page authorization sheet for a fictional company, Cedar Lab. Name two permitted lab assets, two exclusions, permitted techniques, a stop contact, test dates, evidence storage, and cleanup requirements. Classify ten imaginary actions as permitted, prohibited, or needing clarification; explain each. Include a third-party login provider and an unexpected public IP among the cases."
  },
  {
    "id": "00.2",
    "blockId": "00",
    "slug": "00-2",
    "title": "Learn how to learn and record evidence",
    "subtopics": [
      {
        "id": "00.2.1",
        "title": "Technical reading",
        "concepts": "documentation, versions, examples, terminology, checking assumptions",
        "reading": {
          "label": "MIT: course overview and shell documentation",
          "url": "https://missing.csail.mit.edu/2026/course-shell/"
        },
        "video": {
          "label": "MIT: course overview recording",
          "url": "https://missing.csail.mit.edu/2026/course-shell/"
        }
      },
      {
        "id": "00.2.2",
        "title": "Working notes",
        "concepts": "timestamp, hypothesis, action, observation, conclusion, next test",
        "reading": {
          "label": "WSTG: reporting structure",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "TCM Part 1: Effective Notekeeping, 27:44",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "00.2.3",
        "title": "Evidence quality",
        "concepts": "reproducibility, negative results, redaction, distinguishing observation from inference",
        "reading": {
          "label": "WSTG: reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Writing Good Reports",
          "url": "https://www.hacker101.com/playlists/newcomers"
        }
      }
    ],
    "task": "create a private notebook with a glossary, daily log, lab inventory, findings, and mistakes section. Document a harmless action such as changing a display setting, including before/after evidence and reversal. Ask another person, or your future self after a day, to repeat it from the notes alone."
  },
  {
    "id": "00.3",
    "blockId": "00",
    "slug": "00-3",
    "title": "Understand the practice environment",
    "subtopics": [
      {
        "id": "00.3.1",
        "title": "Lab types",
        "concepts": "hosted CTF, local VM, container, purpose-built vulnerable application",
        "reading": {
          "label": "pwn.college: getting started/dojos",
          "url": "https://pwn.college/dojos"
        },
        "video": {
          "label": "TCM Part 1: tools and VM setup, 34:27 and 1:46:01",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "00.3.2",
        "title": "Isolation",
        "concepts": "host versus guest, internal versus NAT networking, shared folders, snapshots",
        "reading": {
          "label": "Oracle VirtualBox: networking chapter",
          "url": "https://docs.oracle.com/en/virtualization/virtualbox/7.1/user/networkingdetails.html"
        },
        "video": {
          "label": "Messer A+ Core 1: Virtualization Concepts/Services",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/"
        }
      },
      {
        "id": "00.3.3",
        "title": "Learning progression",
        "concepts": "guided task, independent attempt, hints, proof, remediation, retest",
        "reading": {
          "label": "Bandit: instructions and beginner guidance",
          "url": "https://overthewire.org/wargames/bandit/"
        },
        "video": {
          "label": "Hacker101: introduction",
          "url": "https://www.hacker101.com/playlists/newcomers"
        }
      }
    ],
    "task": "draw the proposed lab with a host, testing VM, vulnerable VM, update connection, and disconnected home/work network. Write how you will restore it and how you will prove isolation. Create an evidence checklist for a completed challenge; do not deploy vulnerable software yet."
  }
];
