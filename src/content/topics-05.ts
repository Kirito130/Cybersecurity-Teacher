import type { Topic } from "./types";

export const topics05: Topic[] = [
  {
    "id": "05.1",
    "blockId": "05",
    "slug": "05-1",
    "title": "Python fundamentals",
    "subtopics": [
      {
        "id": "05.1.1",
        "title": "Building blocks",
        "concepts": "variables, types, strings/bytes, input/output, functions, scope",
        "reading": {
          "label": "CS50P: notes, weeks 0–1",
          "url": "https://cs50.harvard.edu/python/"
        },
        "video": {
          "label": "CS50P: lectures 0–1",
          "url": "https://cs50.harvard.edu/python/"
        }
      },
      {
        "id": "05.1.2",
        "title": "Control and data",
        "concepts": "conditions, loops, lists, tuples, dictionaries, sets, iteration",
        "reading": {
          "label": "CS50P: notes, weeks 1–2",
          "url": "https://cs50.harvard.edu/python/"
        },
        "video": {
          "label": "CS50P: lectures 1–2",
          "url": "https://cs50.harvard.edu/python/"
        }
      },
      {
        "id": "05.1.3",
        "title": "Reliability",
        "concepts": "exceptions, imports, standard library, virtual environments, dependency versions",
        "reading": {
          "label": "CS50P: weeks 3–4 notes",
          "url": "https://cs50.harvard.edu/python/"
        },
        "video": {
          "label": "CS50P: exceptions and libraries",
          "url": "https://cs50.harvard.edu/python/"
        }
      }
    ],
    "task": "complete at least eight CS50P problems across these units. Write an address-book program using synthetic data with search, input validation, and graceful errors. Explain every line of a small unfamiliar Python script and predict its output before execution."
  },
  {
    "id": "05.2",
    "blockId": "05",
    "slug": "05-2",
    "title": "Files, tests, and data handling",
    "subtopics": [
      {
        "id": "05.2.1",
        "title": "Persistence",
        "concepts": "file paths, context managers, CSV/JSON, encodings, parsing, malformed input",
        "reading": {
          "label": "CS50P: File I/O notes",
          "url": "https://cs50.harvard.edu/python/"
        },
        "video": {
          "label": "CS50P: File I/O lecture",
          "url": "https://cs50.harvard.edu/python/"
        }
      },
      {
        "id": "05.2.2",
        "title": "Correctness",
        "concepts": "unit tests, assertions, boundary cases, logging, debugging, reproducible bugs",
        "reading": {
          "label": "CS50P: Unit Tests notes",
          "url": "https://cs50.harvard.edu/python/"
        },
        "video": {
          "label": "CS50P: Unit Tests",
          "url": "https://cs50.harvard.edu/python/"
        }
      },
      {
        "id": "05.2.3",
        "title": "Text models",
        "concepts": "regular expressions, escaping, bytes versus Unicode, basic classes and methods",
        "reading": {
          "label": "CS50P: regex and object-oriented notes",
          "url": "https://cs50.harvard.edu/python/"
        },
        "video": {
          "label": "CS50P: Regular Expressions and OOP",
          "url": "https://cs50.harvard.edu/python/"
        }
      }
    ],
    "task": "build a synthetic authentication-log analyzer with JSON output. Test empty files, malformed lines, different timestamps, and duplicate records. Include at least six meaningful tests and one deliberately broken test you then repair. Avoid counting a parsing failure as “no suspicious events.”"
  },
  {
    "id": "05.3",
    "blockId": "05",
    "slug": "05-3",
    "title": "HTTP and network scripting",
    "subtopics": [
      {
        "id": "05.3.1",
        "title": "Networking code",
        "concepts": "socket, client/server, timeout, connection failure, text/byte conversion",
        "reading": {
          "label": "Python: socket documentation",
          "url": "https://docs.python.org/3/library/socket.html"
        },
        "video": {
          "label": "TCM Part 1: sockets, 5:15:30",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "05.3.2",
        "title": "HTTP clients",
        "concepts": "methods, status, headers, JSON, cookies, redirects, certificate verification",
        "reading": {
          "label": "Requests: Quickstart",
          "url": "https://requests.readthedocs.io/en/latest/user/quickstart/"
        },
        "video": {
          "label": "CS50 Web: Django and JavaScript requests",
          "url": "https://cs50.harvard.edu/web/"
        }
      },
      {
        "id": "05.3.3",
        "title": "Safe automation",
        "concepts": "explicit target list, rate cap, bounded retries, dry-run, errors, secrets outside code",
        "reading": {
          "label": "OWASP: REST Security and Secrets Management sheets",
          "url": "https://cheatsheetseries.owasp.org/"
        },
        "video": {
          "label": "CS50 Web: Testing/CI and Scalability/Security",
          "url": "https://cs50.harvard.edu/web/"
        }
      }
    ],
    "task": "create a local HTTP health checker that accepts only a supplied list of your lab URLs, limits request rate, sets timeouts, and logs status/error separately. Reject an out-of-list destination and unexpected redirects. Use a tiny local server to test success, timeout, and error cases; no internet-wide scanning."
  },
  {
    "id": "05.4",
    "blockId": "05",
    "slug": "05-4",
    "title": "Shell scripting and version control",
    "subtopics": [
      {
        "id": "05.4.1",
        "title": "Bash",
        "concepts": "arguments, quoting, conditions, loops, return values, pipeline pitfalls",
        "reading": {
          "label": "MIT: shell tools and scripting",
          "url": "https://missing.csail.mit.edu/2020/shell-tools/"
        },
        "video": {
          "label": "MIT: corresponding recording",
          "url": "https://missing.csail.mit.edu/2020/shell-tools/"
        }
      },
      {
        "id": "05.4.2",
        "title": "Git",
        "concepts": "repository, commit, diff, branch, merge, restore, ignore files",
        "reading": {
          "label": "Pro Git: getting started and basics",
          "url": "https://git-scm.com/book/en/v2"
        },
        "video": {
          "label": "MIT: Version Control",
          "url": "https://missing.csail.mit.edu/2020/version-control/"
        }
      },
      {
        "id": "05.4.3",
        "title": "Project hygiene",
        "concepts": "README, requirements, tests, reproducible setup, secret redaction, licensing",
        "reading": {
          "label": "MIT: code quality and packaging",
          "url": "https://missing.csail.mit.edu/"
        },
        "video": {
          "label": "MIT: code quality and packaging recordings",
          "url": "https://missing.csail.mit.edu/"
        }
      }
    ],
    "task": "version your log analyzer and health checker in a private local repository. Create and merge a branch, recover a previous revision, and reproduce setup in a clean environment. Add a README with inputs, outputs, limits, and tests. Use only dummy secrets; explain why deleting a secret from the latest file does not remove Git history."
  }
];
