import type { Topic } from "./types";

export const topics16: Topic[] = [
  {
    "id": "16.1",
    "blockId": "16",
    "slug": "16-1",
    "title": "Mobile architecture and attack surface",
    "subtopics": [
      {
        "id": "16.1.1",
        "title": "Android model",
        "concepts": "package/manifest, activities/services/providers, permissions, sandbox, signing, emulator",
        "reading": {
          "label": "OWASP MASTG: Android knowledge and setup",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: Android Quickstart",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      },
      {
        "id": "16.1.2",
        "title": "iOS model",
        "concepts": "bundle, sandbox, entitlements, Keychain, signing, app lifecycle, platform differences",
        "reading": {
          "label": "OWASP MASTG: iOS knowledge",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: iOS Quickstart and Application Basics",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      },
      {
        "id": "16.1.3",
        "title": "Test design",
        "concepts": "mobile client versus API, storage/network/platform controls, test profile, hardware limitations",
        "reading": {
          "label": "OWASP MASVS and MASTG",
          "url": "https://mas.owasp.org/MASVS/"
        },
        "video": {
          "label": "Hacker101: Mobile Hacking Crash Course",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      }
    ],
    "task": "install a designated training APK in a disposable emulator. Inventory components, permissions, backend endpoints, and data stored locally. Draw a mobile/API trust diagram and compare the equivalent iOS concepts. Use [OWASP MAS crackmes and reference apps][MASLABS]; do not assume an arbitrary store app permits testing."
  },
  {
    "id": "16.2",
    "blockId": "16",
    "slug": "16-2",
    "title": "Static and dynamic Android assessment",
    "subtopics": [
      {
        "id": "16.2.1",
        "title": "Static review",
        "concepts": "package extraction, resources, decompilation, embedded secrets, exported components",
        "reading": {
          "label": "MASTG: Android static analysis",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: Common Android Bugs, parts 1–2",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      },
      {
        "id": "16.2.2",
        "title": "Dynamic observation",
        "concepts": "adb, logs, filesystem, intents, runtime hooks, instrumentation limits",
        "reading": {
          "label": "MASTG: Android testing techniques",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: Android Hacking Workshop",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      },
      {
        "id": "16.2.3",
        "title": "Storage/authentication",
        "concepts": "preferences/databases, logs/backups, key storage, biometrics versus server authorization",
        "reading": {
          "label": "MASTG: storage and authentication tests",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: Common Android Bugs",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      }
    ],
    "task": "complete three Android training-app challenges: insecure storage, an exposed component, and a runtime validation assumption. For each, distinguish a local-device assumption from a backend flaw. Produce evidence, propose a fix, and validate it in your own small test app or an editable training app."
  },
  {
    "id": "16.3",
    "blockId": "16",
    "slug": "16-3",
    "title": "Transport, WebViews, and backend boundaries",
    "subtopics": [
      {
        "id": "16.3.1",
        "title": "Transport",
        "concepts": "TLS validation, proxy trust, pinning purpose/limits, sensitive request data",
        "reading": {
          "label": "MASTG: network communication tests",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: mobile crash course and iOS App Transport",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      },
      {
        "id": "16.3.2",
        "title": "Platform links",
        "concepts": "deep links, custom schemes, WebViews, JavaScript bridges, inter-app messages",
        "reading": {
          "label": "MASTG: platform interaction tests",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "Hacker101: Android bugs; iOS WebViews/Inter-app Communication",
          "url": "https://www.hacker101.com/playlists/mobile_hacking"
        }
      },
      {
        "id": "16.3.3",
        "title": "End-to-end authorization",
        "concepts": "token storage/use, API ownership, client tampering, offline state, server validation",
        "reading": {
          "label": "MASTG: authentication",
          "url": "https://mas.owasp.org/MASTG/"
        },
        "video": {
          "label": "APISec University: authentication/authorization",
          "url": "https://au.apisec.ai/"
        }
      }
    ],
    "task": "trace one synthetic login and one data request from the training app to its designated backend. Test one deep-link or WebView boundary and one server-side ownership rule. Explain what a pinning bypass in a controlled test does—and does not—prove about real-world exploitability. Use a second emulator profile for cross-user tests."
  }
];
