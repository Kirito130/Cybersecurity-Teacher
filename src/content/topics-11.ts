import type { Topic } from "./types";

export const topics11: Topic[] = [
  {
    "id": "11.1",
    "blockId": "11",
    "slug": "11-1",
    "title": "Service-specific enumeration and initial access",
    "subtopics": [
      {
        "id": "11.1.1",
        "title": "Services",
        "concepts": "SMB/NFS, SSH/RDP/WinRM, FTP/SMTP, DNS/SNMP, databases, anonymous access, shares",
        "reading": {
          "label": "Nmap: service detection and NSE documentation",
          "url": "https://nmap.org/book/man.html"
        },
        "video": {
          "label": "TCM Part 2: enumeration and capstone demonstrations",
          "url": "https://www.youtube.com/watch?v=sH4JCwjybGs"
        }
      },
      {
        "id": "11.1.2",
        "title": "Vulnerability matching",
        "concepts": "vendor advisory, build/configuration, reachable feature, authentication need, exploit reliability",
        "reading": {
          "label": "Metasploit documentation: methodology and modules",
          "url": "https://docs.metasploit.com/"
        },
        "video": {
          "label": "TCM Part 2: vulnerability research and exploitation",
          "url": "https://www.youtube.com/watch?v=sH4JCwjybGs"
        }
      },
      {
        "id": "11.1.3",
        "title": "Validation",
        "concepts": "manual test versus framework module, staged behavior, expected effects, proof files, cleanup",
        "reading": {
          "label": "Metasploit: module usage and documentation",
          "url": "https://docs.metasploit.com/"
        },
        "video": {
          "label": "TCM Part 2: exploitation and shells",
          "url": "https://www.youtube.com/watch?v=sH4JCwjybGs"
        }
      }
    ],
    "task": "use [Metasploitable][METASPLOITLAB] or a beginner [VulnHub][VULNHUB] VM on your isolated network. Inventory at least six services, compare two plausible vulnerability candidates, and obtain the lab's intended low-privilege proof by one verified route. Read any proof-of-concept code before running it; document outbound behavior and revert after testing. Repeat with a different target without its walkthrough."
  },
  {
    "id": "11.2",
    "blockId": "11",
    "slug": "11-2",
    "title": "Linux privilege boundaries",
    "subtopics": [
      {
        "id": "11.2.1",
        "title": "Enumeration",
        "concepts": "identity, groups, sudo policy, special bits, capabilities, writable paths, mount options",
        "reading": {
          "label": "pwn.college: Access Control",
          "url": "https://pwn.college/intro-to-cybersecurity/access-control/"
        },
        "video": {
          "label": "pwn.college: Access Control lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/access-control/"
        }
      },
      {
        "id": "11.2.2",
        "title": "Misconfigurations",
        "concepts": "scheduled jobs, service ownership, PATH/library assumptions, credentials in configuration",
        "reading": {
          "label": "Kali Linux Revealed: administration/security",
          "url": "https://www.kali.org/docs/general-use/kali-training/"
        },
        "video": {
          "label": "TCM Part 2: Linux capstone privilege analysis",
          "url": "https://www.youtube.com/watch?v=sH4JCwjybGs"
        }
      },
      {
        "id": "11.2.3",
        "title": "Reasoning and remediation",
        "concepts": "prerequisite versus exploit, effective identity, kernel patching, least privilege, regression",
        "reading": {
          "label": "pwn.college: Access Control explanations",
          "url": "https://pwn.college/intro-to-cybersecurity/access-control/"
        },
        "video": {
          "label": "pwn.college: Access Control lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/access-control/"
        }
      }
    ],
    "task": "complete six access-control challenges, then demonstrate two different privilege-boundary failures in deliberately misconfigured local guests. One must be a permissions/configuration issue rather than a kernel exploit. Record the starting identity, exact misconfiguration, resulting identity, fix, and failed retest. Verify tool findings manually; a binary listed in GTFOBins is not inherently vulnerable in every installation."
  },
  {
    "id": "11.3",
    "blockId": "11",
    "slug": "11-3",
    "title": "Windows privilege boundaries and credential exposure",
    "subtopics": [
      {
        "id": "11.3.1",
        "title": "Enumeration",
        "concepts": "token privileges, service/task identities, writable executable/config paths, patch state",
        "reading": {
          "label": "Microsoft: access control",
          "url": "https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control"
        },
        "video": {
          "label": "TCM Windows escalation: initial/automated enumeration",
          "url": "https://www.youtube.com/watch?v=uTcrbNBcoxQ"
        }
      },
      {
        "id": "11.3.2",
        "title": "Credential context",
        "concepts": "stored secrets, log exposure, local versus domain identity, impersonation permissions",
        "reading": {
          "label": "Microsoft: Windows security and credentials",
          "url": "https://learn.microsoft.com/en-us/windows/security/"
        },
        "video": {
          "label": "TCM Windows escalation: passwords and impersonation",
          "url": "https://www.youtube.com/watch?v=uTcrbNBcoxQ"
        }
      },
      {
        "id": "11.3.3",
        "title": "Verification",
        "concepts": "effective token, service boundaries, UAC limitations, reliability, mitigation and retest",
        "reading": {
          "label": "Microsoft: Access Control Overview",
          "url": "https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control"
        },
        "video": {
          "label": "TCM Windows escalation: impersonation and RunAs",
          "url": "https://www.youtube.com/watch?v=uTcrbNBcoxQ"
        }
      }
    ],
    "task": "in a disposable Windows lab, analyze three planted issues: an over-permissive test folder, a dummy credential in configuration, and an incorrectly privileged test service/task. Validate two distinct boundary failures with harmless proof files, then correct permissions or identities and retest. Prefer your own controlled configuration over unverified downloadable binaries. Do not disable protections on your everyday computer."
  },
  {
    "id": "11.4",
    "blockId": "11",
    "slug": "11-4",
    "title": "Password auditing, tunnels, and multi-host reasoning",
    "subtopics": [
      {
        "id": "11.4.1",
        "title": "Password auditing",
        "concepts": "online/offline, hash format, salt/KDF, wordlists/rules, lockouts, reuse, remediation",
        "reading": {
          "label": "Hashcat documentation",
          "url": "https://hashcat.net/wiki/"
        },
        "video": {
          "label": "TCM AD course: password cracking and defenses",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      },
      {
        "id": "11.4.2",
        "title": "Reachability",
        "concepts": "routes, local/remote forwarding, SOCKS concept, DNS resolution, connection provenance",
        "reading": {
          "label": "OpenSSH manual: forwarding",
          "url": "https://man.openbsd.org/ssh"
        },
        "video": {
          "label": "TCM Windows escalation: port forwarding",
          "url": "https://www.youtube.com/watch?v=uTcrbNBcoxQ"
        }
      },
      {
        "id": "11.4.3",
        "title": "Multi-host workflow",
        "concepts": "segment inventory, least necessary pivot, test limits, evidence chain, cleanup",
        "reading": {
          "label": "NIST: execution and post-testing",
          "url": "https://csrc.nist.gov/pubs/sp/800/115/final"
        },
        "video": {
          "label": "TCM AD course: lateral movement concepts",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      }
    ],
    "task": "generate a small synthetic password-hash set, recover only the intentionally weak examples offline, and explain why failure to recover a strong sample is not proof of security. Build a two-segment lab with an authorized relay host; reach one hidden benign service using a narrowly scoped tunnel. Demonstrate the route, record listeners, remove the tunnel, and prove it is gone. Do not collect real-user credentials."
  }
];
