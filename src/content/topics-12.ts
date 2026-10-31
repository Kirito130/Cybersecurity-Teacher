import type { Topic } from "./types";

export const topics12: Topic[] = [
  {
    "id": "12.1",
    "blockId": "12",
    "slug": "12-1",
    "title": "Administer a domain before attacking it",
    "subtopics": [
      {
        "id": "12.1.1",
        "title": "Directory model",
        "concepts": "domain/forest, controller, OU, user/group/computer, GPO, LDAP, DNS, time",
        "reading": {
          "label": "Microsoft: AD DS overview and linked administration topics",
          "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"
        },
        "video": {
          "label": "TCM AD course: components and lab setup",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      },
      {
        "id": "12.1.2",
        "title": "Authentication",
        "concepts": "Kerberos tickets/KDC/SPN, NTLM challenge-response, local/domain authentication",
        "reading": {
          "label": "Microsoft: Kerberos authentication overview",
          "url": "https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview"
        },
        "video": {
          "label": "TCM AD course: authentication and post-compromise sections",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      },
      {
        "id": "12.1.3",
        "title": "Authorization relationships",
        "concepts": "group nesting, ACLs, delegation, service accounts, trusts, effective rights",
        "reading": {
          "label": "Microsoft: AD DS",
          "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"
        },
        "video": {
          "label": "BloodHound Basics: concepts and graph interpretation",
          "url": "https://academy.specterops.io/bloodhound-basics"
        }
      }
    ],
    "task": "join a member guest to your domain; create two departments, a service identity, and a constrained share. Apply one benign GPO. Draw a Kerberos login in your own words, explain the roles of DNS and time, and show how nested membership changes access. Keep account names and passwords synthetic."
  },
  {
    "id": "12.2",
    "blockId": "12",
    "slug": "12-2",
    "title": "Enumeration and identity-path analysis",
    "subtopics": [
      {
        "id": "12.2.1",
        "title": "Collection",
        "concepts": "authenticated visibility, directory queries, sessions, group/ACL data, collection permissions",
        "reading": {
          "label": "BloodHound: data collectors and permissions",
          "url": "https://bloodhound.specterops.io/home"
        },
        "video": {
          "label": "BloodHound Basics: collection and ingestion",
          "url": "https://academy.specterops.io/bloodhound-basics"
        }
      },
      {
        "id": "12.2.2",
        "title": "Graph reasoning",
        "concepts": "nodes/edges, attack path, preconditions, stale data, shortest versus feasible path",
        "reading": {
          "label": "BloodHound: edge and path documentation",
          "url": "https://bloodhound.specterops.io/home"
        },
        "video": {
          "label": "BloodHound Basics: analysis and Cypher",
          "url": "https://academy.specterops.io/bloodhound-basics"
        }
      },
      {
        "id": "12.2.3",
        "title": "Validation",
        "concepts": "effective permission, logon restrictions, network dependency, session validity, mitigation edges",
        "reading": {
          "label": "BloodHound: attack-path documentation",
          "url": "https://bloodhound.specterops.io/home"
        },
        "video": {
          "label": "TCM AD course: domain enumeration and attack analysis",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      }
    ],
    "task": "collect only from your lab, import the data into BloodHound Community Edition, and identify three candidate paths. Manually validate two and reject one that lacks a prerequisite or depends on stale information. Explain each edge without reading out the tool label alone. Remove an unnecessary permission and recollect to confirm the path changed."
  },
  {
    "id": "12.3",
    "blockId": "12",
    "slug": "12-3",
    "title": "Authentication abuse and movement in the lab",
    "subtopics": [
      {
        "id": "12.3.1",
        "title": "Ticket/password exposure",
        "concepts": "service-account passwords, Kerberoasting/AS-REP concepts, reuse, offline validation",
        "reading": {
          "label": "Microsoft Kerberos documentation",
          "url": "https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview"
        },
        "video": {
          "label": "TCM AD course: Kerberos and credential attacks",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      },
      {
        "id": "12.3.2",
        "title": "Protocol trust",
        "concepts": "relay versus cracking, signing, channel binding, name resolution, IPv6, authentication coercion concept",
        "reading": {
          "label": "Microsoft: SMB security documentation",
          "url": "https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-security"
        },
        "video": {
          "label": "TCM AD course: relay/name-resolution demonstrations and defenses",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      },
      {
        "id": "12.3.3",
        "title": "Movement and delegation",
        "concepts": "remote administration, token/ticket context, delegated rights, constrained/unconstrained models",
        "reading": {
          "label": "Microsoft: Kerberos and AD DS documentation",
          "url": "https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview"
        },
        "video": {
          "label": "TCM AD course: lateral movement and post-compromise",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      }
    ],
    "task": "select two documented GOAD identity-misconfiguration scenarios. Record all preconditions, validate the path using lab accounts, map the resulting events, and apply a targeted mitigation such as stronger service credentials, signing, or reduced delegated rights. Prove that the same path fails after the change. Explain how current Windows defaults may prevent an older demonstration from working."
  },
  {
    "id": "12.4",
    "blockId": "12",
    "slug": "12-4",
    "title": "Certificates, trust boundaries, and defensive validation",
    "subtopics": [
      {
        "id": "12.4.1",
        "title": "AD CS",
        "concepts": "certificate authority, templates, enrollment rights, subject identity, authentication usage",
        "reading": {
          "label": "SpecterOps: Certified Pre-Owned research",
          "url": "https://specterops.io/blog/2021/06/17/certified-pre-owned/"
        },
        "video": {
          "label": "Original researchers: Certified Pre-Owned talk",
          "url": "https://www.youtube.com/watch?v=ejmAIgxFRgM"
        }
      },
      {
        "id": "12.4.2",
        "title": "Escalation paths",
        "concepts": "certificate-template misconfiguration, delegated ownership, domain/forest boundaries, prerequisite verification",
        "reading": {
          "label": "SpecterOps: AD CS paths",
          "url": "https://specterops.io/blog/2021/06/17/certified-pre-owned/"
        },
        "video": {
          "label": "Certified Pre-Owned talk",
          "url": "https://www.youtube.com/watch?v=ejmAIgxFRgM"
        }
      },
      {
        "id": "12.4.3",
        "title": "Defense",
        "concepts": "remove privilege edges, service-account management, logs, tiering, credential rotation, retest",
        "reading": {
          "label": "Microsoft AD DS security guidance",
          "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"
        },
        "video": {
          "label": "TCM AD course: mitigations",
          "url": "https://www.youtube.com/watch?v=VXxH4n684HE"
        }
      }
    ],
    "task": "review one deliberately weak certificate template in a suitable GOAD scenario, explain the identity consequence, and demonstrate the intended lab proof only if its prerequisites match. Fix the permission/template and retest. Submit a one-page prioritized remediation plan for three identity paths, including operational impact and evidence owners can use. If your small lab lacks AD CS, extend it before claiming this topic's practical completion."
  }
];
