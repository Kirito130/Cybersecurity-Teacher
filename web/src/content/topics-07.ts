import type { Topic } from "./types";

export const topics07: Topic[] = [
  {
    "id": "07.1",
    "blockId": "07",
    "slug": "07-1",
    "title": "Security reasoning and threat modeling",
    "subtopics": [
      {
        "id": "07.1.1",
        "title": "Core principles",
        "concepts": "confidentiality/integrity/availability, least privilege, defense in depth, secure defaults",
        "reading": {
          "label": "CS50 Cybersecurity: notes",
          "url": "https://cs50.harvard.edu/cybersecurity/"
        },
        "video": {
          "label": "CS50 Cybersecurity: Securing Systems",
          "url": "https://cs50.harvard.edu/cybersecurity/"
        }
      },
      {
        "id": "07.1.2",
        "title": "Risk",
        "concepts": "asset, threat, vulnerability, likelihood, impact, exposure, residual risk, false positives/negatives",
        "reading": {
          "label": "NIST CSF 2.0: framework and resources",
          "url": "https://www.nist.gov/cyberframework"
        },
        "video": {
          "label": "Messer Security+: risk and vulnerability management",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "07.1.3",
        "title": "Modeling",
        "concepts": "data flow, trust boundary, abuse case, attacker capability, assumption, control",
        "reading": {
          "label": "OWASP: Threat Modeling sheet",
          "url": "https://cheatsheetseries.owasp.org/"
        },
        "video": {
          "label": "CS50 Cybersecurity: Securing Software",
          "url": "https://cs50.harvard.edu/cybersecurity/"
        }
      }
    ],
    "task": "threat-model the notes app. Identify five assets, five plausible abuse cases, controls, assumptions, and residual risk. For three alerts or findings, invent a true positive and false positive example. Explain how missing logs can create false confidence."
  },
  {
    "id": "07.2",
    "blockId": "07",
    "slug": "07-2",
    "title": "Cryptography and identity foundations",
    "subtopics": [
      {
        "id": "07.2.1",
        "title": "Representation versus protection",
        "concepts": "encoding, hashing, encryption, signing, checksums",
        "reading": {
          "label": "CS50 Cybersecurity: Securing Data notes",
          "url": "https://cs50.harvard.edu/cybersecurity/"
        },
        "video": {
          "label": "CS50 Cybersecurity: Securing Data",
          "url": "https://cs50.harvard.edu/cybersecurity/"
        }
      },
      {
        "id": "07.2.2",
        "title": "Cryptographic use",
        "concepts": "symmetric/asymmetric keys, random nonce/IV, authenticated encryption, key exchange, PKI",
        "reading": {
          "label": "pwn.college: cryptography slides and explanations",
          "url": "https://pwn.college/intro-to-cybersecurity/cryptography/"
        },
        "video": {
          "label": "pwn.college: cryptography lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/cryptography/"
        }
      },
      {
        "id": "07.2.3",
        "title": "Identity controls",
        "concepts": "password KDF/salt, MFA, recovery, certificate validation, key storage/rotation",
        "reading": {
          "label": "OWASP: Password Storage and Key Management sheets",
          "url": "https://cheatsheetseries.owasp.org/"
        },
        "video": {
          "label": "CS50 Cybersecurity: Securing Accounts and Data",
          "url": "https://cs50.harvard.edu/cybersecurity/"
        }
      }
    ],
    "task": "hash a harmless file before/after a one-byte change; encode and decode a string; compare the roles of hashing and encryption. Use a supported library/framework to hash two identical passwords with independent salts and verify them. Inspect a certificate chain. Complete three introductory [CryptoHack][CRYPTOHACK] challenges without inventing your own production cipher."
  },
  {
    "id": "07.3",
    "blockId": "07",
    "slug": "07-3",
    "title": "Defenses and incident evidence",
    "subtopics": [
      {
        "id": "07.3.1",
        "title": "Endpoint/network controls",
        "concepts": "patching, segmentation, firewalls, EDR, IDS/IPS, hardening, backups",
        "reading": {
          "label": "NIST CSF: Protect and Detect",
          "url": "https://www.nist.gov/cyberframework"
        },
        "video": {
          "label": "Messer Security+: architecture and mitigations",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "07.3.2",
        "title": "Detection",
        "concepts": "log source, event correlation, timestamps, baseline, alert, ATT&CK behavior mapping",
        "reading": {
          "label": "MITRE ATT&CK: enterprise matrix and techniques",
          "url": "https://attack.mitre.org/"
        },
        "video": {
          "label": "Messer Security+: monitoring and threat hunting",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "07.3.3",
        "title": "Response",
        "concepts": "triage, containment, evidence preservation, recovery, lessons learned, tabletop",
        "reading": {
          "label": "NIST incident-response guidance SP 800-61 Rev. 3",
          "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
        },
        "video": {
          "label": "Messer Security+: incident response and investigations",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      }
    ],
    "task": "correlate your own failed logins, firewall events, and application logs into a short timeline. Propose two detections with expected false positives. Run a tabletop involving a lost test credential: decide what to preserve, revoke, restore, and improve. Restore a backup and prove the restored data is usable."
  },
  {
    "id": "07.4",
    "blockId": "07",
    "slug": "07-4",
    "title": "Governance, cloud, and modern risk literacy",
    "subtopics": [
      {
        "id": "07.4.1",
        "title": "Governance",
        "concepts": "policy/standard/procedure, asset lifecycle, awareness, access reviews, vendor risk",
        "reading": {
          "label": "NIST CSF: Govern",
          "url": "https://www.nist.gov/cyberframework"
        },
        "video": {
          "label": "Messer Security+: governance and oversight",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "07.4.2",
        "title": "Cloud and resilience",
        "concepts": "IaaS/PaaS/SaaS, shared responsibility, continuity, recovery objectives",
        "reading": {
          "label": "AWS: shared responsibility",
          "url": "https://aws.amazon.com/compliance/shared-responsibility-model/"
        },
        "video": {
          "label": "Messer Security+: cloud architecture and resilience",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "07.4.3",
        "title": "Human and AI risks",
        "concepts": "phishing/pretexting awareness, sensitive-data handling, AI tool permissions, untrusted output",
        "reading": {
          "label": "OWASP: AI Agent Security and data-handling sheets",
          "url": "https://cheatsheetseries.owasp.org/"
        },
        "video": {
          "label": "Messer Security+: social engineering",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      }
    ],
    "task": "write a small-business control sheet covering account onboarding/offboarding, backup ownership, vendor access, and AI data use. Run a consent-based tabletop about a suspicious email; do not send deceptive messages. Explain who is responsible for a misconfigured cloud storage permission. Compare recovery time and acceptable data loss in your own words."
  }
];
