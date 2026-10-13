import type { Topic } from "./types";

export const topics08: Topic[] = [
  {
    "id": "08.1",
    "blockId": "08",
    "slug": "08-1",
    "title": "Plan and model the engagement",
    "subtopics": [
      {
        "id": "08.1.1",
        "title": "Engagement design",
        "concepts": "objectives, black/gray/white box, accounts, exclusions, stop conditions, communications",
        "reading": {
          "label": "NIST: planning and rules of engagement",
          "url": "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        "video": {
          "label": "Hacker101: Pentesting vs Bug Bounty and best practices",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "08.1.2",
        "title": "Attack surface",
        "concepts": "asset inventory, service inventory, user roles, trust boundaries, dependencies",
        "reading": {
          "label": "WSTG: information gathering",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Starter's Guide to Pentesting with OWASP",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      },
      {
        "id": "08.1.3",
        "title": "Test planning",
        "concepts": "hypothesis, precondition, expected result, safe evidence, risk limit, cleanup",
        "reading": {
          "label": "WSTG: testing framework",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: pentest methodology",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      }
    ],
    "task": "write a test plan for your notes app plus two lab hosts. Include a user-role matrix, asset list, time budget, excluded actions, and ten test hypotheses. Add a stop-and-notify procedure for unexpected sensitive data or an unintended service interruption. Do not include denial-of-service testing in the default scope."
  },
  {
    "id": "08.2",
    "blockId": "08",
    "slug": "08-2",
    "title": "Reconnaissance and enumeration",
    "subtopics": [
      {
        "id": "08.2.1",
        "title": "Passive research",
        "concepts": "owner-published information, DNS, certificate records, source provenance, scope ambiguity",
        "reading": {
          "label": "WSTG: information gathering tests",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "TCM Part 1: passive recon, 6:27:52 onward",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "08.2.2",
        "title": "Active discovery",
        "concepts": "reachable hosts, TCP/UDP states, service/version, timing, filtering, scan limitations",
        "reading": {
          "label": "Nmap reference: discovery, scan types, timing, output",
          "url": "https://nmap.org/book/man.html"
        },
        "video": {
          "label": "TCM Part 2: scanning and enumeration sections",
          "url": "https://www.youtube.com/watch?v=sH4JCwjybGs"
        }
      },
      {
        "id": "08.2.3",
        "title": "Application discovery",
        "concepts": "endpoints, parameters, technologies, content paths, roles, baseline responses",
        "reading": {
          "label": "WSTG: entry points and application mapping",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "PortSwigger: getting-started Burp tutorials",
          "url": "https://portswigger.net/web-security/getting-started"
        }
      }
    ],
    "task": "build an inventory from a local two-host network and your app. Compare Nmap results with the service configuration you control; explain discrepancies. Record three “unknown” observations without upgrading them into findings. Practice passive research on your own repository or fictional business documents, avoiding collection of strangers' personal data."
  },
  {
    "id": "08.3",
    "blockId": "08",
    "slug": "08-3",
    "title": "Tools and vulnerability validation",
    "subtopics": [
      {
        "id": "08.3.1",
        "title": "Interception",
        "concepts": "proxy scope, browser trust, HTTP history, Repeater, raw request editing, tool state",
        "reading": {
          "label": "Burp Community documentation",
          "url": "https://portswigger.net/burp/documentation"
        },
        "video": {
          "label": "PortSwigger: Burp video tutorials",
          "url": "https://portswigger.net/web-security/getting-started"
        }
      },
      {
        "id": "08.3.2",
        "title": "Scanners",
        "concepts": "passive versus active, authenticated coverage, false positives, version/configuration dependence",
        "reading": {
          "label": "ZAP: getting started",
          "url": "https://www.zaproxy.org/getting-started/"
        },
        "video": {
          "label": "ZAP: official getting-started/deep-dive videos",
          "url": "https://www.zaproxy.org/videos/"
        }
      },
      {
        "id": "08.3.3",
        "title": "Research validation",
        "concepts": "CVE versus CWE, affected versions, vendor advisory, exploit prerequisites, source review",
        "reading": {
          "label": "CVE program overview",
          "url": "https://www.cve.org/About/Overview"
        },
        "video": {
          "label": "TCM Part 2: vulnerability research and exploitation demonstrations",
          "url": "https://www.youtube.com/watch?v=sH4JCwjybGs"
        }
      }
    ],
    "task": "intercept and replay a harmless request to your app. Run a restrained ZAP assessment of that app in the lab, validate three candidate observations manually, and document at least one false positive or unconfirmed result. Compare a vendor advisory against an intentionally vulnerable lab version; explain all conditions needed before any proof of concept could apply."
  },
  {
    "id": "08.4",
    "blockId": "08",
    "slug": "08-4",
    "title": "Evidence, severity, and remediation",
    "subtopics": [
      {
        "id": "08.4.1",
        "title": "Findings",
        "concepts": "title, affected asset, prerequisites, reproduction, evidence, observed impact, uncertainty",
        "reading": {
          "label": "WSTG: reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Writing Good Reports",
          "url": "https://www.hacker101.com/playlists/newcomers"
        }
      },
      {
        "id": "08.4.2",
        "title": "Severity",
        "concepts": "CVSS metrics/vector, technical severity versus business priority, scope of impact",
        "reading": {
          "label": "FIRST: CVSS v4 specification and examples",
          "url": "https://www.first.org/cvss/v4.0/specification-document"
        },
        "video": {
          "label": "Messer Security+: vulnerability analysis and prioritization",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "08.4.3",
        "title": "Closure",
        "concepts": "practical fix, owner, verification criteria, retest, residual risk, limitations, cleanup",
        "reading": {
          "label": "WSTG: analysis and reporting",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Pentest Reporting and Best Practices",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      }
    ],
    "task": "create three finding records: one validated weakness, one informational observation, and one rejected hypothesis. Give the validated weakness a defensible severity with assumptions, a fix, and a retest. Have a reader reproduce it using only the report. Do not label a version banner alone as confirmed exploitation."
  }
];
