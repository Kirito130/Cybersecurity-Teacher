import type { Topic } from "./types";

export const topics04: Topic[] = [
  {
    "id": "04.1",
    "blockId": "04",
    "slug": "04-1",
    "title": "Windows structure and access",
    "subtopics": [
      {
        "id": "04.1.1",
        "title": "Administration",
        "concepts": "editions, updates, services, Registry, scheduled tasks, local accounts/groups",
        "reading": {
          "label": "Microsoft Windows documentation",
          "url": "https://learn.microsoft.com/en-us/windows/"
        },
        "video": {
          "label": "Messer A+ Core 2: Windows tools and configuration",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      },
      {
        "id": "04.1.2",
        "title": "Authorization",
        "concepts": "SID, security token, NTFS permissions, ACL inheritance, UAC, standard/admin account",
        "reading": {
          "label": "Microsoft: Access Control Overview",
          "url": "https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control"
        },
        "video": {
          "label": "Messer A+ Core 2: Windows security settings",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      },
      {
        "id": "04.1.3",
        "title": "Network access",
        "concepts": "SMB shares versus NTFS access, RDP, firewall profiles, local versus domain login",
        "reading": {
          "label": "Microsoft: Windows Server networking",
          "url": "https://learn.microsoft.com/en-us/windows-server/networking/"
        },
        "video": {
          "label": "Messer A+ Core 2: networking and remote access",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      }
    ],
    "task": "in a licensed/evaluation guest, create standard and administrator accounts. Set a test folder's ACL and a local share, then compare effective access for two users. Inspect a service and a scheduled task. Document an allowed and denied operation without disabling the system's protections."
  },
  {
    "id": "04.2",
    "blockId": "04",
    "slug": "04-2",
    "title": "PowerShell as an administration language",
    "subtopics": [
      {
        "id": "04.2.1",
        "title": "Discoverability",
        "concepts": "Get-Help, Get-Command, cmdlet nouns/verbs, parameters, modules",
        "reading": {
          "label": "PowerShell 101: help and command discovery",
          "url": "https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/00-introduction"
        },
        "video": {
          "label": "Microsoft: Getting Started with PowerShell, discovery lessons",
          "url": "https://learn.microsoft.com/en-us/shows/getting-started-with-microsoft-powershell/"
        }
      },
      {
        "id": "04.2.2",
        "title": "Object pipeline",
        "concepts": "properties, filtering, selection, sorting, formatting versus data",
        "reading": {
          "label": "PowerShell 101: objects and pipeline",
          "url": "https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/00-introduction"
        },
        "video": {
          "label": "Microsoft: PowerShell pipeline lessons",
          "url": "https://learn.microsoft.com/en-us/shows/getting-started-with-microsoft-powershell/"
        }
      },
      {
        "id": "04.2.3",
        "title": "Scripts",
        "concepts": "variables, loops, functions, errors, CSV/JSON, execution-policy limitations",
        "reading": {
          "label": "PowerShell 101: scripting chapters",
          "url": "https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/00-introduction"
        },
        "video": {
          "label": "Microsoft: PowerShell scripting lessons",
          "url": "https://learn.microsoft.com/en-us/shows/getting-started-with-microsoft-powershell/"
        }
      }
    ],
    "task": "write a read-only inventory script producing CSV/JSON for processes, services, local users, and basic network settings. Handle a missing permission without silently reporting empty results as success. Keep collection local. Explain why an execution-policy setting is not a complete security boundary."
  },
  {
    "id": "04.3",
    "blockId": "04",
    "slug": "04-3",
    "title": "Processes and Windows evidence",
    "subtopics": [
      {
        "id": "04.3.1",
        "title": "Runtime",
        "concepts": "process tree, command line, loaded modules, handles, service identity",
        "reading": {
          "label": "Microsoft Sysinternals: Process Explorer/Process Monitor",
          "url": "https://learn.microsoft.com/en-us/sysinternals/"
        },
        "video": {
          "label": "TCM Windows escalation: initial enumeration, 23:15",
          "url": "https://www.youtube.com/watch?v=uTcrbNBcoxQ"
        }
      },
      {
        "id": "04.3.2",
        "title": "Event evidence",
        "concepts": "Event Viewer, authentication events, time correlation, auditing prerequisites",
        "reading": {
          "label": "Microsoft: Windows security auditing",
          "url": "https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/security-auditing-overview"
        },
        "video": {
          "label": "Messer Security+: monitoring, log data, investigations",
          "url": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
        }
      },
      {
        "id": "04.3.3",
        "title": "Protection",
        "concepts": "Defender, patching, disk encryption, firewall, recovery, baseline comparison",
        "reading": {
          "label": "Microsoft Windows Security",
          "url": "https://learn.microsoft.com/en-us/windows/security/"
        },
        "video": {
          "label": "Messer A+ Core 2: endpoint protection and recovery",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      }
    ],
    "task": "generate a successful and failed login in your guest, locate available events, and record which audit settings were required. Observe a benign program opening a file with Process Monitor. Produce a before/after baseline for one approved configuration change and restore it."
  }
];
