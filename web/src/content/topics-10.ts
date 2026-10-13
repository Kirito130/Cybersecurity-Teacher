import type { Topic } from "./types";

export const topics10: Topic[] = [
  {
    "id": "10.1",
    "blockId": "10",
    "slug": "10-1",
    "title": "API and token-based identity testing",
    "subtopics": [
      {
        "id": "10.1.1",
        "title": "API controls",
        "concepts": "BOLA/BFLA, property authorization, mass assignment, version inventory, resource limits",
        "reading": {
          "label": "OWASP API Security Top 10",
          "url": "https://api-security.owasp.org/"
        },
        "video": {
          "label": "APISec University: API Penetration Testing",
          "url": "https://au.apisec.ai/"
        }
      },
      {
        "id": "10.1.2",
        "title": "Tokens/federation",
        "concepts": "JWT signature/claims/key selection, OAuth roles/flows, state/redirect URI, OIDC distinction",
        "reading": {
          "label": "PortSwigger: JWT",
          "url": "https://portswigger.net/web-security/jwt"
        },
        "video": {
          "label": "APISec University: authentication and authorization lessons",
          "url": "https://au.apisec.ai/"
        }
      },
      {
        "id": "10.1.3",
        "title": "Alternate interfaces",
        "concepts": "GraphQL schema/resolvers, field permissions, NoSQL query structure, WebSocket messages",
        "reading": {
          "label": "PortSwigger: GraphQL",
          "url": "https://portswigger.net/web-security/graphql"
        },
        "video": {
          "label": "GraphQL private posts",
          "url": "https://portswigger.net/web-security/graphql/lab-graphql-reading-private-posts"
        }
      }
    ],
    "task": "work through [crAPI][CRAPI] challenges covering three distinct API authorization/business-flow failures. Solve two JWT, two OAuth, one GraphQL, one NoSQL, and one WebSocket Academy lab. For each, show the legitimate use first, the violated invariant second, and the corrected behavior last. Evaluate resource limits with small bounded requests; do not conduct load or availability attacks."
  },
  {
    "id": "10.2",
    "blockId": "10",
    "slug": "10-2",
    "title": "Interpreters, serialization, and JavaScript object behavior",
    "subtopics": [
      {
        "id": "10.2.1",
        "title": "Templates",
        "concepts": "data versus template source, expression evaluation, engine identification, safe rendering",
        "reading": {
          "label": "PortSwigger: server-side template injection",
          "url": "https://portswigger.net/web-security/server-side-template-injection"
        },
        "video": {
          "label": "PortSwigger: original SSTI research talk",
          "url": "https://portswigger.net/research/server-side-template-injection"
        }
      },
      {
        "id": "10.2.2",
        "title": "Serialization",
        "concepts": "object reconstruction, integrity, dangerous hooks/gadgets, signed data, safer formats",
        "reading": {
          "label": "PortSwigger: insecure deserialization",
          "url": "https://portswigger.net/web-security/deserialization"
        },
        "video": {
          "label": "Deserialization lab: Community solutions",
          "url": "https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-modifying-serialized-objects"
        }
      },
      {
        "id": "10.2.3",
        "title": "Prototype pollution",
        "concepts": "inheritance, unsafe merges, source/sink/gadget, client versus server effects",
        "reading": {
          "label": "PortSwigger: prototype pollution",
          "url": "https://portswigger.net/web-security/prototype-pollution"
        },
        "video": {
          "label": "PortSwigger: DOM Invader prototype-pollution demonstration",
          "url": "https://portswigger.net/blog/finding-client-side-prototype-pollution-with-dom-invader"
        }
      }
    ],
    "task": "complete two labs per vulnerability family. Read a small deliberately vulnerable code sample and identify the precise data-to-code or property boundary. Patch it in a local copy and add a regression test. For deserialization, explain a chain's prerequisites without treating every parser as exploitable. For prototype pollution, demonstrate a meaningful affected behavior, not just a modified property."
  },
  {
    "id": "10.3",
    "blockId": "10",
    "slug": "10-3",
    "title": "HTTP parsers, proxies, and caches",
    "subtopics": [
      {
        "id": "10.3.1",
        "title": "Request smuggling",
        "concepts": "front/back-end parsing, framing, connection reuse, HTTP version translation",
        "reading": {
          "label": "PortSwigger: request smuggling",
          "url": "https://portswigger.net/web-security/request-smuggling"
        },
        "video": {
          "label": "PortSwigger: HTTP Desync research talk",
          "url": "https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn"
        }
      },
      {
        "id": "10.3.2",
        "title": "Caching",
        "concepts": "cache key, unkeyed input, poisoning versus deception, normalization, user-data separation",
        "reading": {
          "label": "PortSwigger: cache poisoning",
          "url": "https://portswigger.net/web-security/web-cache-poisoning"
        },
        "video": {
          "label": "PortSwigger: Web Cache Entanglement talk",
          "url": "https://portswigger.net/research/web-cache-entanglement"
        }
      },
      {
        "id": "10.3.3",
        "title": "Routing trust",
        "concepts": "Host/forwarded headers, proxy behavior, password-reset links, downstream assumptions",
        "reading": {
          "label": "PortSwigger: HTTP Host header attacks",
          "url": "https://portswigger.net/web-security/host-header"
        },
        "video": {
          "label": "Host-header lab: Community solutions",
          "url": "https://portswigger.net/web-security/host-header/exploiting/lab-host-header-authentication-bypass"
        }
      }
    ],
    "task": "solve two smuggling labs, two cache-poisoning/deception labs, and one Host-header lab. Draw exactly where components disagree. Practice only in provider-isolated labs or your private proxy stack: cache and desynchronization experiments can affect other users on a shared system. Record protocol versions and successful control requests so timeouts alone are not mistaken for proof."
  },
  {
    "id": "10.4",
    "blockId": "10",
    "slug": "10-4",
    "title": "Business logic, races, and source-assisted review",
    "subtopics": [
      {
        "id": "10.4.1",
        "title": "Business logic",
        "concepts": "order of operations, price/quantity constraints, workflow bypass, multi-step authorization",
        "reading": {
          "label": "PortSwigger: business logic",
          "url": "https://portswigger.net/web-security/logic-flaws"
        },
        "video": {
          "label": "APISec University: business-logic and API testing lessons",
          "url": "https://au.apisec.ai/"
        }
      },
      {
        "id": "10.4.2",
        "title": "Races",
        "concepts": "state transitions, concurrent access, time-of-check/time-of-use, idempotency, transactions",
        "reading": {
          "label": "PortSwigger: race conditions",
          "url": "https://portswigger.net/web-security/race-conditions"
        },
        "video": {
          "label": "PortSwigger: Smashing the State Machine recording",
          "url": "https://portswigger.net/research/smashing-the-state-machine"
        }
      },
      {
        "id": "10.4.3",
        "title": "Code review",
        "concepts": "entry-to-sink tracing, data validation, dependencies, SAST/DAST differences, regression tests",
        "reading": {
          "label": "OWASP: Code Review Guide",
          "url": "https://owasp.org/projects/code-review-guide"
        },
        "video": {
          "label": "CS50 Web: Testing/CI and security",
          "url": "https://cs50.harvard.edu/web/"
        }
      }
    ],
    "task": "solve three business-logic and two race-condition labs. In a disposable local points/coupon application, state a business invariant such as “one redemption per account,” test it with a small bounded concurrent experiment, then fix it using an appropriate atomic operation or transaction. Review your notes app source and report one real flaw or a well-supported clean result with coverage limits."
  }
];
