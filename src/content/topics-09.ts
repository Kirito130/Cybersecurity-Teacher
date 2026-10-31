import type { Topic } from "./types";

export const topics09: Topic[] = [
  {
    "id": "09.1",
    "blockId": "09",
    "slug": "09-1",
    "title": "Authentication, authorization, and sessions",
    "subtopics": [
      {
        "id": "09.1.1",
        "title": "Authentication",
        "concepts": "enumeration, login/reset workflows, MFA logic, rate limiting, recovery, lockout risk",
        "reading": {
          "label": "PortSwigger: authentication",
          "url": "https://portswigger.net/web-security/authentication"
        },
        "video": {
          "label": "Rana Khalil: Authentication Vulnerabilities",
          "url": "https://www.youtube.com/watch?v=mox6DL4zK7I"
        }
      },
      {
        "id": "09.1.2",
        "title": "Authorization",
        "concepts": "horizontal/vertical access, IDOR, ownership, roles, methods, tenant isolation",
        "reading": {
          "label": "PortSwigger: access control",
          "url": "https://portswigger.net/web-security/access-control"
        },
        "video": {
          "label": "Hacker101: XSS and Authorization",
          "url": "https://www.hacker101.com/playlists/web_hacking"
        }
      },
      {
        "id": "09.1.3",
        "title": "Sessions",
        "concepts": "fixation, expiration, logout, cookie attributes, state changes, session theft versus authorization",
        "reading": {
          "label": "WSTG: session management",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "Hacker101: Session Fixation",
          "url": "https://www.hacker101.com/playlists/web_hacking"
        }
      }
    ],
    "task": "solve two independent authentication and three access-control labs in [PortSwigger][PS], then build a role/resource/action matrix for your own notes app. Verify logged-out, ordinary-user, other-user, and admin cases, including direct requests that bypass the UI. Test session invalidation after logout and write two complete findings. Use only deliberately weak lab accounts for bounded password-control experiments."
  },
  {
    "id": "09.2",
    "blockId": "09",
    "slug": "09-2",
    "title": "Injection and filesystem boundaries",
    "subtopics": [
      {
        "id": "09.2.1",
        "title": "SQL injection",
        "concepts": "query structure, error/union/blind behavior, parameterization, least-privileged DB identity",
        "reading": {
          "label": "PortSwigger: SQL injection",
          "url": "https://portswigger.net/web-security/sql-injection"
        },
        "video": {
          "label": "Rana Khalil: SQL Injection Complete Guide",
          "url": "https://www.youtube.com/watch?v=1nJgupaUPEQ"
        }
      },
      {
        "id": "09.2.2",
        "title": "OS command injection",
        "concepts": "shell interpretation, argument injection, output/blind evidence, safe APIs",
        "reading": {
          "label": "PortSwigger: OS command injection",
          "url": "https://portswigger.net/web-security/os-command-injection"
        },
        "video": {
          "label": "pwn.college: Web Security command-injection lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/web-security/"
        }
      },
      {
        "id": "09.2.3",
        "title": "Path traversal/inclusion",
        "concepts": "normalization, relative paths, file access, allowlists, read versus execution impact",
        "reading": {
          "label": "PortSwigger: path traversal",
          "url": "https://portswigger.net/web-security/file-path-traversal"
        },
        "video": {
          "label": "pwn.college: Web Security path-traversal lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/web-security/"
        }
      }
    ],
    "task": "complete four SQLi labs spanning observable and blind behavior, two command-injection labs, and two traversal labs. Use only the lab's designated proof data. Reproduce one bug in a disposable copy of your notes app, fix it, and show the same test fails while normal functionality still works. Explain the interpreted language at each boundary."
  },
  {
    "id": "09.3",
    "blockId": "09",
    "slug": "09-3",
    "title": "Browser trust and client-side vulnerabilities",
    "subtopics": [
      {
        "id": "09.3.1",
        "title": "XSS",
        "concepts": "reflected/stored/DOM, source/sink, output context, encoding, sanitization, CSP limitations",
        "reading": {
          "label": "PortSwigger: XSS and DOM vulnerabilities",
          "url": "https://portswigger.net/web-security/cross-site-scripting"
        },
        "video": {
          "label": "Hacker101: XSS",
          "url": "https://www.hacker101.com/playlists/web_hacking"
        }
      },
      {
        "id": "09.3.2",
        "title": "CSRF",
        "concepts": "ambient credentials, state-changing request, token validation, SameSite, origin checks",
        "reading": {
          "label": "PortSwigger: CSRF",
          "url": "https://portswigger.net/web-security/csrf"
        },
        "video": {
          "label": "pwn.college: Web Security CSRF lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/web-security/"
        }
      },
      {
        "id": "09.3.3",
        "title": "CORS and framing",
        "concepts": "origin trust, credentialed reads, preflight, clickjacking, frame restrictions",
        "reading": {
          "label": "PortSwigger: CORS",
          "url": "https://portswigger.net/web-security/cors"
        },
        "video": {
          "label": "CORS lab video",
          "url": "https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack"
        }
      }
    ],
    "task": "solve two XSS labs in different contexts, one DOM lab, two CSRF labs, one CORS lab, and one clickjacking lab beyond any video demonstration. Draw which party sends the request, which origin executes code, and who can read the response. Implement a context-appropriate fix in your app and test its normal workflow."
  },
  {
    "id": "09.4",
    "blockId": "09",
    "slug": "09-4",
    "title": "Server-side requests, XML, and uploads",
    "subtopics": [
      {
        "id": "09.4.1",
        "title": "SSRF",
        "concepts": "server-originated requests, URL parsing, redirects, internal services, egress control",
        "reading": {
          "label": "PortSwigger: SSRF",
          "url": "https://portswigger.net/web-security/ssrf"
        },
        "video": {
          "label": "Rana Khalil: SSRF Complete Guide",
          "url": "https://www.youtube.com/watch?v=ih5R_c16bKc"
        }
      },
      {
        "id": "09.4.2",
        "title": "XXE",
        "concepts": "XML/DTD/entity basics, external resolution, parser configuration, safe proof of file/network access",
        "reading": {
          "label": "PortSwigger: XXE",
          "url": "https://portswigger.net/web-security/xxe"
        },
        "video": {
          "label": "XXE lab: Community solutions recordings",
          "url": "https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-retrieve-files"
        }
      },
      {
        "id": "09.4.3",
        "title": "Uploads",
        "concepts": "content versus filename/type, storage location, traversal, execution permissions, size limits",
        "reading": {
          "label": "PortSwigger: file uploads",
          "url": "https://portswigger.net/web-security/file-upload"
        },
        "video": {
          "label": "File-upload lab: Community solutions recording",
          "url": "https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload"
        }
      }
    ],
    "task": "complete two in-band SSRF, two XXE, and two upload labs; use a second lab after each demonstration video. Identify the exact trust boundary and least harmful proof. For callback-dependent concepts, use [WebGoat/WebWolf][WEBGOAT] inside your lab or a local listener receiving only synthetic markers; a Burp Pro subscription is not required. Record the difference between a request being issued and sensitive data actually being disclosed."
  }
];
