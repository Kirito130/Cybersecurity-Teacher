import type { Topic } from "./types";

export const topics06: Topic[] = [
  {
    "id": "06.1",
    "blockId": "06",
    "slug": "06-1",
    "title": "Browser and HTTP fundamentals",
    "subtopics": [
      {
        "id": "06.1.1",
        "title": "Frontend",
        "concepts": "HTML elements/forms, basic CSS, JavaScript, DOM, event handlers, developer tools",
        "reading": {
          "label": "MDN: core HTML/CSS/JavaScript modules",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development"
        },
        "video": {
          "label": "CS50 Web: HTML/CSS and JavaScript",
          "url": "https://cs50.harvard.edu/web/"
        }
      },
      {
        "id": "06.1.2",
        "title": "Protocol",
        "concepts": "URL parts, methods, status codes, headers/body, content type, encoding, caching",
        "reading": {
          "label": "MDN: HTTP overview and messages",
          "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP"
        },
        "video": {
          "label": "Hacker101: The Web in Depth",
          "url": "https://www.hacker101.com/playlists/newcomers"
        }
      },
      {
        "id": "06.1.3",
        "title": "Browser state",
        "concepts": "cookies, session, local storage, origin/site distinction, same-origin policy, CORS",
        "reading": {
          "label": "MDN: HTTP cookies and CORS",
          "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP"
        },
        "video": {
          "label": "Hacker101: web fundamentals",
          "url": "https://www.hacker101.com/playlists/newcomers"
        }
      }
    ],
    "task": "build a small page with a form and JavaScript request to a local server. Inspect its request, response, cookie, and DOM in developer tools. Change a client-side field and explain why the server must still validate it. Draw the difference between a browser origin and a URL path."
  },
  {
    "id": "06.2",
    "blockId": "06",
    "slug": "06-2",
    "title": "Server, SQL, and access decisions",
    "subtopics": [
      {
        "id": "06.2.1",
        "title": "Backend",
        "concepts": "routes, request parsing, templates, configuration, exceptions, middleware",
        "reading": {
          "label": "Flask tutorial",
          "url": "https://flask.palletsprojects.com/en/stable/tutorial/"
        },
        "video": {
          "label": "CS50x: Flask lecture",
          "url": "https://cs50.harvard.edu/x/"
        }
      },
      {
        "id": "06.2.2",
        "title": "Database",
        "concepts": "tables, primary/foreign keys, SELECT/INSERT/UPDATE/DELETE, joins, parameterization",
        "reading": {
          "label": "CS50 SQL: notes and practice",
          "url": "https://cs50.harvard.edu/sql/"
        },
        "video": {
          "label": "CS50 SQL: Querying/Relating/Writing lectures",
          "url": "https://cs50.harvard.edu/sql/"
        }
      },
      {
        "id": "06.2.3",
        "title": "Identity",
        "concepts": "registration/login/logout, password hashing, session lifecycle, role and ownership checks",
        "reading": {
          "label": "Flask tutorial: authentication",
          "url": "https://flask.palletsprojects.com/en/stable/tutorial/"
        },
        "video": {
          "label": "CS50 Web: Django and security",
          "url": "https://cs50.harvard.edu/web/"
        }
      }
    ],
    "task": "build a local notes application with two ordinary users and one administrator. Each user can view/edit only their own notes. Use parameterized database access, a framework's password-hashing helper, and server-side authorization. Create tests for a normal request, another user's record, and an unauthenticated request."
  },
  {
    "id": "06.3",
    "blockId": "06",
    "slug": "06-3",
    "title": "APIs, deployment, and trust boundaries",
    "subtopics": [
      {
        "id": "06.3.1",
        "title": "APIs",
        "concepts": "JSON, REST resources, parameters, pagination, versioning, OpenAPI, GraphQL overview",
        "reading": {
          "label": "PortSwigger: API testing",
          "url": "https://portswigger.net/web-security/api-testing"
        },
        "video": {
          "label": "APISec University: API fundamentals",
          "url": "https://au.apisec.ai/"
        }
      },
      {
        "id": "06.3.2",
        "title": "Deployment",
        "concepts": "reverse proxy, application server, database, environment secrets, TLS termination",
        "reading": {
          "label": "MDN: server-side introduction",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction"
        },
        "video": {
          "label": "CS50 Web: Scalability and Security",
          "url": "https://cs50.harvard.edu/web/"
        }
      },
      {
        "id": "06.3.3",
        "title": "Boundaries",
        "concepts": "browser/server, user/tenant, service/service, file upload/storage, logs/errors",
        "reading": {
          "label": "OWASP WSTG: architecture and threat modeling",
          "url": "https://owasp.org/www-project-web-security-testing-guide/v42/"
        },
        "video": {
          "label": "APISec University: API risks and authorization",
          "url": "https://au.apisec.ai/"
        }
      }
    ],
    "task": "add a JSON API to your notes app, write a simple endpoint inventory, and draw a data-flow diagram with boundaries. Explain where validation and authorization occur. Test pagination, invalid types, and a second user's note ID. Keep the app reachable only in your lab."
  }
];
