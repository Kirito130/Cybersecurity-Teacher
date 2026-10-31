import type { Checkpoint } from "./types";

export const checkpoints: Checkpoint[] = [
  {
    "id": "checkpoint-00",
    "blockId": "00",
    "title": "Chapter 00 quiz and practical — Permission and practice plan",
    "criticalQuestionIds": [
      "q1",
      "q2",
      "q3",
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "A company publishes its IP address. What additional condition must be met before you test it?",
        "modelAnswer": "Explicit authorization from an appropriate owner and scope covering the asset and proposed actions; visibility alone grants nothing."
      },
      {
        "id": "q2",
        "prompt": "How does a penetration test differ from simply running a vulnerability scanner?",
        "modelAnswer": "A test uses a defined scope, manual validation, impact analysis, and reporting; a scanner provides candidate findings, including mistakes."
      },
      {
        "id": "q3",
        "prompt": "A permitted application redirects to an external identity provider. What should you do?",
        "modelAnswer": "Stop at that boundary unless the separate service is explicitly authorized; clarify with the owner."
      },
      {
        "id": "q4",
        "prompt": "What is the difference between an observation and a hypothesis? Give an example.",
        "modelAnswer": "“The response is 403” is an observation; “the role check caused it” is a hypothesis that needs a controlled test."
      },
      {
        "id": "q5",
        "prompt": "Why is a VM snapshot useful, and what does it not replace?",
        "modelAnswer": "It enables rollback of guest state; it does not replace independent backups, isolation, or evidence records."
      },
      {
        "id": "q6",
        "prompt": "Why should you record unsuccessful tests?",
        "modelAnswer": "They show coverage, prevent repeated dead ends, and constrain conclusions about what was actually tested."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Scope completeness",
        "description": "Assessed as: scope completeness."
      },
      {
        "id": "c2",
        "label": "Isolation reasoning",
        "description": "Assessed as: isolation reasoning."
      },
      {
        "id": "c3",
        "label": "Reproducible notes",
        "description": "Assessed as: reproducible notes."
      },
      {
        "id": "c4",
        "label": "Correct boundary decisions",
        "description": "Assessed as: correct boundary decisions."
      }
    ],
    "practicalBrief": "submit the Cedar Lab authorization sheet, diagram, notebook sample, and ten scope decisions. Score: **scope completeness / isolation reasoning / reproducible notes / correct boundary decisions**. Pass using the universal rules before installing the practice lab.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-01",
    "blockId": "01",
    "title": "Chapter 01 quiz and practical — Rebuildable workstation",
    "criticalQuestionIds": [
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why does adding disk space not necessarily fix a machine running out of RAM?",
        "modelAnswer": "RAM holds active working data; disk capacity is a different resource. Paging may help capacity but can be much slower."
      },
      {
        "id": "q2",
        "prompt": "What does an operating system provide that an ordinary application does not?",
        "modelAnswer": "It manages hardware, processes, memory, files, and access between programs and devices."
      },
      {
        "id": "q3",
        "prompt": "Is renaming `picture.jpg` to `picture.txt` a conversion? Explain.",
        "modelAnswer": "No. The bytes and format stay the same; only the name changes."
      },
      {
        "id": "q4",
        "prompt": "Which two machines are meant by “host” and “guest”?",
        "modelAnswer": "The host runs the hypervisor; the guest is the OS inside a virtual machine."
      },
      {
        "id": "q5",
        "prompt": "Why is NAT alone insufficient to guarantee a vulnerable guest cannot reach other systems?",
        "modelAnswer": "NAT commonly permits outbound traffic and may have port forwards; verify routes and interfaces and use stronger lab separation."
      },
      {
        "id": "q6",
        "prompt": "What must you record so another learner can recreate your VM?",
        "modelAnswer": "Image/source and version, architecture, virtual resources, network mode, setup steps, and recovery/verification procedure."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Working rebuild",
        "description": "Assessed as: working rebuild."
      },
      {
        "id": "c2",
        "label": "Data recovery",
        "description": "Assessed as: data recovery."
      },
      {
        "id": "c3",
        "label": "Isolation verification",
        "description": "Assessed as: isolation verification."
      },
      {
        "id": "c4",
        "label": "Hardware-and-OS explanation",
        "description": "Assessed as: hardware-and-OS explanation."
      }
    ],
    "practicalBrief": "rebuild a guest from your instructions, recover a file, demonstrate snapshot rollback, and explain its connectivity. Score: **working rebuild / data recovery / isolation verification / hardware-and-OS explanation**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-02",
    "blockId": "02",
    "title": "Chapter 02 quiz and practical — Explain the packet journey",
    "criticalQuestionIds": [
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "What does a switch normally use to forward an Ethernet frame? What does a router use?",
        "modelAnswer": "Destination MAC and its forwarding table; destination IP and the routing table respectively."
      },
      {
        "id": "q2",
        "prompt": "For `192.168.10.70/26`, give network, ordinary usable range, and broadcast.",
        "modelAnswer": "Network `.64`, usable `.65–.126`, broadcast `.127` in `192.168.10.0/24`."
      },
      {
        "id": "q3",
        "prompt": "A hostname fails but an IP connection works. What is one reasonable hypothesis and test?",
        "modelAnswer": "DNS resolution may be wrong; inspect resolver configuration and compare the name's answer with the intended IP."
      },
      {
        "id": "q4",
        "prompt": "Does an open TCP port prove that a service is vulnerable?",
        "modelAnswer": "No. It indicates a listener; vulnerability requires further evidence of a weakness under relevant conditions."
      },
      {
        "id": "q5",
        "prompt": "What does TLS protect, and what does it not establish about application authorization?",
        "modelAnswer": "It protects transport confidentiality/integrity and supports endpoint authentication; it does not decide which records a logged-in user may access."
      },
      {
        "id": "q6",
        "prompt": "Why can a machine that ignores ping still provide a working web service?",
        "modelAnswer": "ICMP may be filtered while TCP/HTTPS is allowed; different protocols have different policies."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Addressing",
        "description": "Assessed as: addressing."
      },
      {
        "id": "c2",
        "label": "Packet interpretation",
        "description": "Assessed as: packet interpretation."
      },
      {
        "id": "c3",
        "label": "Systematic troubleshooting",
        "description": "Assessed as: systematic troubleshooting."
      },
      {
        "id": "c4",
        "label": "Correct trust-boundary explanation",
        "description": "Assessed as: correct trust-boundary explanation."
      }
    ],
    "practicalBrief": "deliver a two-subnet diagram, ten correct subnet calculations after corrections, annotated captures, and diagnosis of three faults. Score: **addressing / packet interpretation / systematic troubleshooting / correct trust-boundary explanation**. Network+ preparation becomes plausible later after the certification gap checklist.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-03",
    "blockId": "03",
    "title": "Chapter 03 quiz and practical — Operate without a walkthrough",
    "criticalQuestionIds": [
      "q1"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why can a user read a file but still fail to access it through a directory?",
        "modelAnswer": "Traversing directories requires appropriate execute/search permission along the path, in addition to the file's permissions."
      },
      {
        "id": "q2",
        "prompt": "What does `sudo` change about a command's execution?",
        "modelAnswer": "It runs the permitted command under another identity, usually root, according to policy; it is not a universal requirement."
      },
      {
        "id": "q3",
        "prompt": "Why can a tool available in one terminal be “not found” in another?",
        "modelAnswer": "PATH, environment, shell initialization, working directory, or installed environment may differ."
      },
      {
        "id": "q4",
        "prompt": "How do stderr and an exit status differ?",
        "modelAnswer": "stderr carries diagnostic text; exit status is a process result code. Either can exist without a useful message in the other."
      },
      {
        "id": "q5",
        "prompt": "What risk does accepting an unexpected SSH host-key change create?",
        "modelAnswer": "You might trust an impersonating host; verify the legitimate host's fingerprint through a trusted channel."
      },
      {
        "id": "q6",
        "prompt": "A service has stopped. What evidence should you collect before reinstalling it?",
        "modelAnswer": "Status, recent logs, configuration validity, resource use, dependencies, and recent changes; preserve the error before changing state."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Shell fluency",
        "description": "Assessed as: shell fluency."
      },
      {
        "id": "c2",
        "label": "Access correctness",
        "description": "Assessed as: access correctness."
      },
      {
        "id": "c3",
        "label": "Evidence-led diagnosis",
        "description": "Assessed as: evidence-led diagnosis."
      },
      {
        "id": "c4",
        "label": "Recovery",
        "description": "Assessed as: recovery."
      }
    ],
    "practicalBrief": "from a clean guest, build the two-user permission model, install/restrict a service, diagnose a planted failure, and restore it. Score: **shell fluency / access correctness / evidence-led diagnosis / recovery**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-04",
    "blockId": "04",
    "title": "Chapter 04 quiz and practical — Windows administration evidence",
    "criticalQuestionIds": [
      "q1"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why might access through an SMB share fail even when NTFS permissions appear sufficient?",
        "modelAnswer": "Share permissions, identity, firewall/network policy, and NTFS permissions all matter; effective access depends on the actual path and identity."
      },
      {
        "id": "q2",
        "prompt": "How is the PowerShell pipeline different from an ordinary text pipe?",
        "modelAnswer": "Cmdlets commonly pass structured objects with properties, not only displayed strings."
      },
      {
        "id": "q3",
        "prompt": "Does membership in Administrators mean every process runs elevated?",
        "modelAnswer": "No. UAC and token/elevation context affect the running process."
      },
      {
        "id": "q4",
        "prompt": "What information can a process tree reveal that a filename alone cannot?",
        "modelAnswer": "Parentage, command-line context, user identity, and related child activity support a more reliable interpretation."
      },
      {
        "id": "q5",
        "prompt": "Why does the absence of a login event not prove no login occurred?",
        "modelAnswer": "Auditing may be disabled, logs may have rolled over, or the event may be elsewhere; check collection coverage."
      },
      {
        "id": "q6",
        "prompt": "Why should a collection script distinguish “zero results” from “access denied”?",
        "modelAnswer": "Missing visibility is not evidence of absence. Reporting the error preserves the validity of the assessment."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Permissions",
        "description": "Assessed as: permissions."
      },
      {
        "id": "c2",
        "label": "Useful automation",
        "description": "Assessed as: useful automation."
      },
      {
        "id": "c3",
        "label": "Event interpretation",
        "description": "Assessed as: event interpretation."
      },
      {
        "id": "c4",
        "label": "Recovery and limitations",
        "description": "Assessed as: recovery and limitations."
      }
    ],
    "practicalBrief": "deliver your inventory script, two-user access matrix, annotated process evidence, and login-event timeline. Score: **permissions / useful automation / event interpretation / recovery and limitations**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-05",
    "blockId": "05",
    "title": "Chapter 05 quiz and practical — Build a dependable small tool",
    "criticalQuestionIds": [
      "q3"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "How do bytes differ from a Unicode string when communicating over a socket?",
        "modelAnswer": "Sockets transfer bytes; strings require a defined encoding/decoding. Confusing them causes errors or data corruption."
      },
      {
        "id": "q2",
        "prompt": "Why can an HTTP timeout not be reported as status code 200?",
        "modelAnswer": "No successful HTTP response was observed; report a connection/request error, not invented evidence."
      },
      {
        "id": "q3",
        "prompt": "What is one boundary case for a log parser, and why does it matter?",
        "modelAnswer": "Examples include empty input, malformed timestamps, or unexpected encoding; mishandling can distort conclusions or crash the tool."
      },
      {
        "id": "q4",
        "prompt": "Why should a network tool have both a timeout and a request limit?",
        "modelAnswer": "A timeout bounds waiting per operation; a limit bounds workload and overall effect. Neither fully replaces the other."
      },
      {
        "id": "q5",
        "prompt": "A password was committed and then deleted. Is the repository safe to share?",
        "modelAnswer": "Not necessarily: history may retain it. Rotate any real secret and review/remove exposure before sharing."
      },
      {
        "id": "q6",
        "prompt": "What makes a bug report reproducible?",
        "modelAnswer": "A minimal input, environment/version, exact steps, expected and actual result, and supporting evidence."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Correct outputs",
        "description": "Assessed as: correct outputs."
      },
      {
        "id": "c2",
        "label": "Error handling and tests",
        "description": "Assessed as: error handling and tests."
      },
      {
        "id": "c3",
        "label": "Scope controls",
        "description": "Assessed as: scope controls."
      },
      {
        "id": "c4",
        "label": "Documentation and clean rebuild",
        "description": "Assessed as: documentation and clean rebuild."
      }
    ],
    "practicalBrief": "independently build a lab inventory/report generator combining a local file parser and bounded HTTP checker. Score: **correct outputs / error handling and tests / scope controls / documentation and clean rebuild**. Do not progress if you cannot explain your own code.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-06",
    "blockId": "06",
    "title": "Chapter 06 quiz and practical — Explain your own application",
    "criticalQuestionIds": [
      "q1",
      "q3",
      "q6"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why is hiding an administrator button insufficient access control?",
        "modelAnswer": "Clients can send requests without the interface; enforce permissions on the server for every relevant operation."
      },
      {
        "id": "q2",
        "prompt": "How does a session cookie differ from the server-side session data it references?",
        "modelAnswer": "A cookie is browser-held data; in a server-side session design it often identifies state stored separately. Other session designs exist."
      },
      {
        "id": "q3",
        "prompt": "What separates authentication from authorization?",
        "modelAnswer": "Authentication establishes identity; authorization decides permitted actions on specific resources."
      },
      {
        "id": "q4",
        "prompt": "Why are parameterized database queries safer than concatenating user input?",
        "modelAnswer": "Values are handled as data rather than changing query structure, when the API is used correctly."
      },
      {
        "id": "q5",
        "prompt": "Can a frontend API key be treated as a secret? Why?",
        "modelAnswer": "Generally no: users can inspect delivered code/network traffic. Restrict public identifiers and keep actual secrets server-side."
      },
      {
        "id": "q6",
        "prompt": "Why must an API check ownership even when object IDs are hard to guess?",
        "modelAnswer": "Unpredictability is not authorization; leaked or discovered IDs must not grant access across users."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Working system",
        "description": "Assessed as: working system."
      },
      {
        "id": "c2",
        "label": "Correct identity boundaries",
        "description": "Assessed as: correct identity boundaries."
      },
      {
        "id": "c3",
        "label": "Protocol-and-data explanation",
        "description": "Assessed as: protocol-and-data explanation."
      },
      {
        "id": "c4",
        "label": "Tests and reproducibility",
        "description": "Assessed as: tests and reproducibility."
      }
    ],
    "practicalBrief": "demonstrate the notes application and API, explain one full request's path, show cross-user denials, and rebuild from documentation. Score: **working system / correct identity boundaries / protocol-and-data explanation / tests and reproducibility**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-07",
    "blockId": "07",
    "title": "Chapter 07 quiz and practical — Defend the system you built",
    "criticalQuestionIds": [
      "q1",
      "q4",
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Give different examples of a threat, a vulnerability, and a risk for the notes app.",
        "modelAnswer": "An unauthorized reader is a threat actor/capability; a missing ownership check is a vulnerability; confidential notes being exposed is a risk scenario."
      },
      {
        "id": "q2",
        "prompt": "Why is Base64 unsuitable for protecting a password?",
        "modelAnswer": "It is reversible encoding with no secret key, not password storage protection."
      },
      {
        "id": "q3",
        "prompt": "What does a password salt accomplish, and what does it not accomplish?",
        "modelAnswer": "Unique salts make identical passwords differ and hinder precomputed comparisons; they do not replace a slow password KDF or strong passwords."
      },
      {
        "id": "q4",
        "prompt": "Why does MFA not fix a missing record-ownership check?",
        "modelAnswer": "MFA strengthens identity verification; the application must separately authorize access to each object."
      },
      {
        "id": "q5",
        "prompt": "Who normally decides permissions on customer data stored in a cloud service?",
        "modelAnswer": "Responsibility depends on the service, but customers commonly configure their identities and data access; the provider does not make every authorization decision for them."
      },
      {
        "id": "q6",
        "prompt": "Why should a backup be restored during testing rather than merely checked for existence?",
        "modelAnswer": "Existence does not prove integrity, completeness, available keys, or a working restoration process within the required time."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Risk reasoning",
        "description": "Assessed as: risk reasoning."
      },
      {
        "id": "c2",
        "label": "Correct cryptographic choices",
        "description": "Assessed as: correct cryptographic choices."
      },
      {
        "id": "c3",
        "label": "Defense-and-recovery validation",
        "description": "Assessed as: defense-and-recovery validation."
      },
      {
        "id": "c4",
        "label": "Clear communication",
        "description": "Assessed as: clear communication."
      }
    ],
    "practicalBrief": "deliver the threat model, working controls, restored backup, and incident tabletop record. Score: **risk reasoning / correct cryptographic choices / defense-and-recovery validation / clear communication**. You now have foundations for CC/Security+ preparation; use the current-objective gaps in the certification section.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-08",
    "blockId": "08",
    "title": "Chapter 08 quiz and practical — A small complete assessment",
    "criticalQuestionIds": [
      "q1"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "What is the difference between recon and vulnerability validation?",
        "modelAnswer": "Recon discovers assets/behavior; validation tests a specific security hypothesis and its preconditions."
      },
      {
        "id": "q2",
        "prompt": "A scanner reports a CVE based on a banner. What must you check next?",
        "modelAnswer": "Actual version/build, patch backports, configuration, exposure, and safe reproduction against the affected condition."
      },
      {
        "id": "q3",
        "prompt": "Why can authenticated testing reveal weaknesses missed by an unauthenticated scan?",
        "modelAnswer": "Privileged features, role boundaries, and logged-in workflows may not be visible otherwise."
      },
      {
        "id": "q4",
        "prompt": "What is a false positive? Give a plausible example.",
        "modelAnswer": "A reported weakness that is not present; for example a version-only alert where the vulnerable code was backport-patched."
      },
      {
        "id": "q5",
        "prompt": "Why can two businesses assign different priority to the same technical vulnerability?",
        "modelAnswer": "Data sensitivity, exposure, business dependency, compensating controls, and threat context differ."
      },
      {
        "id": "q6",
        "prompt": "What evidence belongs in a retest record?",
        "modelAnswer": "The changed version/configuration, repeated original test, negative/positive controls, result, date, and any remaining limitation."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Coverage",
        "description": "Assessed as: coverage."
      },
      {
        "id": "c2",
        "label": "Validation quality",
        "description": "Assessed as: validation quality."
      },
      {
        "id": "c3",
        "label": "Impact and remediation",
        "description": "Assessed as: impact and remediation."
      },
      {
        "id": "c4",
        "label": "Reproducible report",
        "description": "Assessed as: reproducible report."
      }
    ],
    "practicalBrief": "assess your app and one lab service under a written scope; submit an inventory, test log, validated findings, and retest. Score: **coverage / validation quality / impact and remediation / reproducible report**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-09",
    "blockId": "09",
    "title": "Chapter 09 quiz and practical — Unlabeled web assessment",
    "criticalQuestionIds": [
      "q1",
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "A user can change a record ID and read another user's note. Which control failed?",
        "modelAnswer": "Object-level authorization/ownership enforcement, not necessarily authentication."
      },
      {
        "id": "q2",
        "prompt": "Why is SQL injection not fixed reliably by merely removing quote characters?",
        "modelAnswer": "Query contexts, encodings, and syntax vary; use parameterized access and appropriate structural controls."
      },
      {
        "id": "q3",
        "prompt": "How does stored XSS differ from reflected XSS?",
        "modelAnswer": "Stored input is retained and later rendered; reflected input appears from the current request. Both require an unsafe output context."
      },
      {
        "id": "q4",
        "prompt": "Explain one important distinction between XSS and CSRF.",
        "modelAnswer": "XSS executes attacker-controlled content in a trusted context; CSRF induces an authenticated action through ambient browser credentials, often without reading the response."
      },
      {
        "id": "q5",
        "prompt": "Why can an SSRF flaw reach a service that your browser cannot reach directly?",
        "modelAnswer": "The server issues the request from its own network and identity context, crossing a different boundary."
      },
      {
        "id": "q6",
        "prompt": "Why does checking an upload's extension alone provide weak protection?",
        "modelAnswer": "Names are attacker-controlled and may not match content; storage/execution configuration and robust validation also matter."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Independent discovery",
        "description": "Assessed as: independent discovery."
      },
      {
        "id": "c2",
        "label": "Accurate causes",
        "description": "Assessed as: accurate causes."
      },
      {
        "id": "c3",
        "label": "Evidence and impact",
        "description": "Assessed as: evidence and impact."
      },
      {
        "id": "c4",
        "label": "Remediation and retest",
        "description": "Assessed as: remediation and retest."
      }
    ],
    "practicalBrief": "in your local [Juice Shop][JUICE] or [WebGoat][WEBGOAT], identify and validate at least five findings across four vulnerability families without using challenge solutions. Include one rejected candidate and fixes/retests for two classes in your own app. Score: **independent discovery / accurate causes / evidence and impact / remediation and retest**. Finish a minimum of **30 independent core-web lab solves** across the block; extras may come from [Natas][NATAS] or [Hacker101 CTF][H101CTF].",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-10",
    "blockId": "10",
    "title": "Chapter 10 quiz and practical — Think beyond vulnerability names",
    "criticalQuestionIds": [
      "q2"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why is decoding a JWT different from verifying it?",
        "modelAnswer": "Decoding reads data; verification checks authenticity and relevant claims using the intended trust configuration."
      },
      {
        "id": "q2",
        "prompt": "A GraphQL endpoint requires login. Why may field-level data still leak?",
        "modelAnswer": "Authentication at the endpoint does not guarantee authorization in each resolver/object/field."
      },
      {
        "id": "q3",
        "prompt": "What distinguishes cache poisoning from cache deception?",
        "modelAnswer": "Poisoning influences a cached response delivered to others; deception causes sensitive responses to be cached under an inappropriately reusable location/key."
      },
      {
        "id": "q4",
        "prompt": "What must disagree for a request-smuggling hypothesis to make sense?",
        "modelAnswer": "Components sharing a connection must parse request boundaries or routing differently; mere unusual formatting is insufficient proof."
      },
      {
        "id": "q5",
        "prompt": "Why can two individually valid requests violate a rule when run concurrently?",
        "modelAnswer": "Both may observe the same precondition before either updates state; an atomic invariant is missing."
      },
      {
        "id": "q6",
        "prompt": "Why is a static-analysis warning not automatically a confirmed vulnerability?",
        "modelAnswer": "Reachability, attacker control, sanitization, configuration, and impact must be verified."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Coverage across interfaces",
        "description": "Assessed as: coverage across interfaces."
      },
      {
        "id": "c2",
        "label": "Chain correctness",
        "description": "Assessed as: chain correctness."
      },
      {
        "id": "c3",
        "label": "Controlled proof",
        "description": "Assessed as: controlled proof."
      },
      {
        "id": "c4",
        "label": "Actionable report",
        "description": "Assessed as: actionable report."
      }
    ],
    "practicalBrief": "complete a second application/API assessment and **25 independent advanced labs**, including at least one from every family above. Deliver a role/endpoint matrix, two safe multi-step chains, one source-based fix, and a retest. Score: **coverage across interfaces / chain correctness / controlled proof / actionable report**. Aim for 60+ total web/API solves before considering a web certification; certification readiness additionally needs its own practice criteria.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-11",
    "blockId": "11",
    "title": "Chapter 11 quiz and practical — An unfamiliar host assessment",
    "criticalQuestionIds": [
      "q2",
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why is an exploit for a product name alone insufficient evidence it will work?",
        "modelAnswer": "Version, patch, architecture, feature, authentication, and configuration conditions must match."
      },
      {
        "id": "q2",
        "prompt": "What distinguishes a local privilege escalation from an initial-access vulnerability?",
        "modelAnswer": "Escalation crosses a privilege boundary after an existing foothold; initial access creates the first relevant access path."
      },
      {
        "id": "q3",
        "prompt": "Why does a readable hash not necessarily reveal a plaintext password?",
        "modelAnswer": "Hashes/KDF outputs are not reversible encryption; candidates must be tested, and cost/entropy matter."
      },
      {
        "id": "q4",
        "prompt": "Why are offline password recovery and online login guessing operationally different?",
        "modelAnswer": "Offline tests use owned hash samples without service requests; online attempts interact with account controls, lockouts, and monitoring."
      },
      {
        "id": "q5",
        "prompt": "What changes about network reachability when you use a permitted pivot host?",
        "modelAnswer": "Connections originate or route through a new authorized context; that does not expand the engagement's permitted targets."
      },
      {
        "id": "q6",
        "prompt": "What must you document before reverting a vulnerable VM?",
        "modelAnswer": "Starting/ending identity, reproducible steps, evidence, affected state, cleanup performed, and important limitations."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Enumeration",
        "description": "Assessed as: enumeration."
      },
      {
        "id": "c2",
        "label": "Independent validation",
        "description": "Assessed as: independent validation."
      },
      {
        "id": "c3",
        "label": "Privilege-and-network explanation",
        "description": "Assessed as: privilege-and-network explanation."
      },
      {
        "id": "c4",
        "label": "Reporting and cleanup",
        "description": "Assessed as: reporting and cleanup."
      }
    ],
    "practicalBrief": "complete **four distinct lab-host assessments**: two Linux and two Windows configurations, including low-privilege access, escalation, and one multi-segment path across the set. At least two must be unfamiliar challenges or configurations selected by a peer. Score: **enumeration / independent validation / privilege-and-network explanation / reporting and cleanup**. If Windows licensing or hardware prevents this, keep this chapter incomplete; a Linux-only substitute does not demonstrate Windows competence.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-12",
    "blockId": "12",
    "title": "Chapter 12 quiz and practical — Assess an identity path, not a diagram",
    "criticalQuestionIds": [
      "q5",
      "q6"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why can broken DNS or clock skew disrupt domain authentication?",
        "modelAnswer": "Domain services rely on name/service discovery, and Kerberos relies on bounded time differences for ticket validity."
      },
      {
        "id": "q2",
        "prompt": "How does a local administrator differ from a domain administrator?",
        "modelAnswer": "Local authority concerns a specific computer; domain-level rights can affect directory objects and many systems, depending on policy."
      },
      {
        "id": "q3",
        "prompt": "Why is a BloodHound path a hypothesis rather than unconditional proof of compromise?",
        "modelAnswer": "Collection may be stale or incomplete, and connectivity, tokens, configuration, or protections may block the path."
      },
      {
        "id": "q4",
        "prompt": "How does relaying authentication differ from cracking a password hash?",
        "modelAnswer": "Relay forwards an authentication exchange to another accepting service; cracking tests candidate secrets offline. Their prerequisites and defenses differ."
      },
      {
        "id": "q5",
        "prompt": "Why can a certificate-template permission become an identity-security issue?",
        "modelAnswer": "A template may permit obtaining an authentication certificate representing an unintended identity or purpose."
      },
      {
        "id": "q6",
        "prompt": "Why must an identity fix be retested with fresh collection and actual access checks?",
        "modelAnswer": "Old graphs and cached permissions may mislead; verify both the relationship data and the behavior the fix is intended to stop."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Identity understanding",
        "description": "Assessed as: identity understanding."
      },
      {
        "id": "c2",
        "label": "Independently validated paths",
        "description": "Assessed as: independently validated paths."
      },
      {
        "id": "c3",
        "label": "Practical mitigations and retests",
        "description": "Assessed as: practical mitigations and retests."
      },
      {
        "id": "c4",
        "label": "Debrief and evidence",
        "description": "Assessed as: debrief and evidence."
      }
    ],
    "practicalBrief": "perform an assumed-breach assessment from an ordinary lab account. Validate two distinct paths to a designated high-value test resource, including one rights/configuration path; demonstrate a certificate-related finding where supported. Submit a full report and a 15-minute recorded debrief. Score: **identity understanding / independently validated paths / practical mitigations and retests / debrief and evidence**. Passing supports further PNPT/CRTP/CPTS preparation; it is not automatic exam eligibility.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-13",
    "blockId": "13",
    "title": "Chapter 13 quiz and practical — Cloud and workload trust",
    "criticalQuestionIds": [
      "q1",
      "q2",
      "q3",
      "q4",
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why is a temporary credential still dangerous when its permissions are excessive?",
        "modelAnswer": "It can exercise those rights until expiry or effective revocation; lifetime and authorization are separate controls."
      },
      {
        "id": "q2",
        "prompt": "What two sides of a cross-account access relationship may require configuration?",
        "modelAnswer": "The requesting identity's permissions and the target's trust/resource policy, subject to relevant boundaries and organizational controls."
      },
      {
        "id": "q3",
        "prompt": "Does a Kubernetes namespace automatically provide complete tenant isolation?",
        "modelAnswer": "No. RBAC, network, workload, node, and other controls must support the intended isolation."
      },
      {
        "id": "q4",
        "prompt": "Why can mounting a container-management socket defeat the intended container boundary?",
        "modelAnswer": "Access to a sufficiently privileged daemon may allow control over containers or the host; the socket is a sensitive administration interface."
      },
      {
        "id": "q5",
        "prompt": "Why should untrusted pull-request code not receive deployment secrets?",
        "modelAnswer": "The code could read or misuse them; event context, token permissions, and workflow trust must be constrained."
      },
      {
        "id": "q6",
        "prompt": "What competence is not proved by reviewing cloud policies entirely offline?",
        "modelAnswer": "Real provider deployment, troubleshooting, logging configuration, cleanup, and operational test behavior remain unproven."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Identity-policy correctness",
        "description": "Assessed as: identity-policy correctness."
      },
      {
        "id": "c2",
        "label": "Workload boundary validation",
        "description": "Assessed as: workload boundary validation."
      },
      {
        "id": "c3",
        "label": "Evidence and logging",
        "description": "Assessed as: evidence and logging."
      },
      {
        "id": "c4",
        "label": "Supply-chain controls",
        "description": "Assessed as: supply-chain controls."
      }
    ],
    "practicalBrief": "submit the corrected policy bundle with reasoning, local container/Kubernetes assessment, synthetic audit analysis, and CI review. Score: **identity-policy correctness / workload boundary validation / evidence and logging / supply-chain controls**. Label this **offline/local cloud-security foundation** unless you also complete and document live-provider practice.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-14",
    "blockId": "14",
    "title": "Chapter 14 quiz and practical — Prove what your research supports",
    "criticalQuestionIds": [
      "q5"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "What is the difference between a pointer and the value stored at its address?",
        "modelAnswer": "A pointer represents an address; dereferencing accesses the object at that location, subject to validity and type rules."
      },
      {
        "id": "q2",
        "prompt": "Why can decompiled code disagree with the original source while still approximating behavior?",
        "modelAnswer": "Compilation removes or transforms names, types, and structure; the decompiler infers an approximation from machine code."
      },
      {
        "id": "q3",
        "prompt": "Why does one crashing input not prove reliable code execution?",
        "modelAnswer": "Exploitability depends on controlled state, useful primitives, protections, reliability, and reachable conditions."
      },
      {
        "id": "q4",
        "prompt": "How do ASLR and non-executable memory address different parts of exploitation?",
        "modelAnswer": "ASLR changes relevant addresses; NX/DEP restricts execution from designated memory regions. Neither repairs the original bug."
      },
      {
        "id": "q5",
        "prompt": "Why minimize a crashing test case?",
        "modelAnswer": "A small reproducer isolates the trigger, simplifies debugging, and improves reliable regression testing."
      },
      {
        "id": "q6",
        "prompt": "What should you conclude when a fuzzing run finds no crashes?",
        "modelAnswer": "Only that the tested configuration/corpus/budget revealed no crash; absence of findings is not proof of absence of vulnerabilities."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Program understanding",
        "description": "Assessed as: program understanding."
      },
      {
        "id": "c2",
        "label": "Evidence-supported impact",
        "description": "Assessed as: evidence-supported impact."
      },
      {
        "id": "c3",
        "label": "Experimental reproducibility",
        "description": "Assessed as: experimental reproducibility."
      },
      {
        "id": "c4",
        "label": "Patch and honest limitations",
        "description": "Assessed as: patch and honest limitations."
      }
    ],
    "practicalBrief": "deliver a research dossier with a C program analysis, an unfamiliar reverse-engineering solve, a toy memory-bug investigation, and a fuzz/patch/regression experiment. Score: **program understanding / evidence-supported impact / experimental reproducibility / patch and honest limitations**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-15",
    "blockId": "15",
    "title": "Chapter 15 quiz and practical — Final graduation assessment",
    "criticalQuestionIds": [
      "q3"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "How should a report distinguish “not vulnerable,” “not tested,” and “inconclusive”?",
        "modelAnswer": "Use explicit statuses tied to evidence and coverage; an untested or unresolved case is not a clean bill of health."
      },
      {
        "id": "q2",
        "prompt": "Why should the executive summary avoid listing only CVE numbers and tool output?",
        "modelAnswer": "Decision-makers need affected operations/data, priority, confidence, and actions; raw identifiers do not provide that context."
      },
      {
        "id": "q3",
        "prompt": "What do you do when a promising route crosses the written scope boundary?",
        "modelAnswer": "Stop that route, document the boundary, and request a scope decision before proceeding."
      },
      {
        "id": "q4",
        "prompt": "Why should a severe finding include a realistic business-impact scenario rather than only a score?",
        "modelAnswer": "The scenario connects observed technical capability to the organization's exposure and decisions without exaggerating untested consequences."
      },
      {
        "id": "q5",
        "prompt": "What evidence distinguishes your independent work from following a walkthrough?",
        "modelAnswer": "Dated hypotheses, failed attempts, novel variations, reproducible explanations, and fresh unseen solves provide stronger evidence than flags alone."
      },
      {
        "id": "q6",
        "prompt": "What would justify claiming advanced capability in a specialty?",
        "modelAnswer": "Repeated success on unfamiliar problems, understanding of internals and limitations, reliable reporting, and external/peer feedback—not completing a playlist."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Criterion A",
        "description": "Assessed as: Criterion A."
      },
      {
        "id": "c2",
        "label": "Criterion B",
        "description": "Assessed as: Criterion B."
      },
      {
        "id": "c3",
        "label": "Criterion C",
        "description": "Assessed as: Criterion C."
      },
      {
        "id": "c4",
        "label": "Criterion D",
        "description": "Assessed as: Criterion D."
      }
    ],
    "practicalBrief": "score **assessment coverage / independent technical reasoning / report-and-remediation quality / professional execution** separately for each capstone. Each must pass 16/20 with no criterion below 3. A peer reproduces at least one finding per capstone when possible; otherwise perform a clean rebuild and retest after a week, labeling it self-review. Do not fabricate additional findings to meet a quota: select a lab designed to contain enough issues, and change targets if necessary. **Graduation statement:** “I can independently scope and perform lab-based web, host, network, and identity assessments; validate and report findings; and reproduce fixes. My demonstrated specialist area is ____. My remaining limitations are ____.” Replace “lab-based” with professional claims only when supported by actual authorized engagement experience.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-16",
    "blockId": "16",
    "title": "Chapter 16 quiz and practical — Mobile assessment",
    "criticalQuestionIds": [
      "q2",
      "q3",
      "q4",
      "q5",
      "q6"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why is an embedded application secret usually recoverable by someone who has the app?",
        "modelAnswer": "Delivered code/resources and runtime behavior can be inspected; obfuscation changes effort, not the fundamental trust issue."
      },
      {
        "id": "q2",
        "prompt": "How does an exported component change an Android app's attack surface?",
        "modelAnswer": "Other apps or callers may reach it, subject to platform permissions and its own checks."
      },
      {
        "id": "q3",
        "prompt": "Why is local biometric success insufficient proof of server-side authorization?",
        "modelAnswer": "A client result is not a server policy decision; the backend must authenticate and authorize the actual operation."
      },
      {
        "id": "q4",
        "prompt": "Does certificate pinning fix an insecure API ownership check?",
        "modelAnswer": "No. Pinning constrains transport trust, whereas ownership is an application authorization control."
      },
      {
        "id": "q5",
        "prompt": "What extra boundary can a WebView JavaScript bridge introduce?",
        "modelAnswer": "Untrusted web content may gain access to privileged native methods if the bridge exposes them unsafely."
      },
      {
        "id": "q6",
        "prompt": "Why should Android testing not be presented as demonstrated iOS expertise?",
        "modelAnswer": "The platforms differ in runtime, signing, storage, permissions, tooling, and testing constraints; hands-on evidence is platform-specific."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Platform understanding",
        "description": "Assessed as: platform understanding."
      },
      {
        "id": "c2",
        "label": "Independent evidence",
        "description": "Assessed as: independent evidence."
      },
      {
        "id": "c3",
        "label": "Backend linkage",
        "description": "Assessed as: backend linkage."
      },
      {
        "id": "c4",
        "label": "Fixes and scope clarity",
        "description": "Assessed as: fixes and scope clarity."
      }
    ],
    "practicalBrief": "assess an unfamiliar designated Android training app, mapping findings to MASVS/MASTG categories. Include storage, platform, transport, and API coverage with at least three validated issues and one defended boundary. Score: **platform understanding / independent evidence / backend linkage / fixes and scope clarity**. Mark iOS as conceptual unless you perform an equivalent iOS assessment.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-17",
    "blockId": "17",
    "title": "Chapter 17 quiz and practical — Wireless/device assessment",
    "criticalQuestionIds": [
      "q1"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why does being within radio range not authorize testing a network?",
        "modelAnswer": "Authorization comes from the appropriate owner and scope, not signal reachability."
      },
      {
        "id": "q2",
        "prompt": "What can a passive packet capture fail to show even when a network is active?",
        "modelAnswer": "Other channels, missed frames, encrypted content, and unobserved time windows can hide relevant activity."
      },
      {
        "id": "q3",
        "prompt": "Why must an enterprise Wi-Fi client validate the authentication server's certificate?",
        "modelAnswer": "Without appropriate trust validation, the client may authenticate to an impersonating server under vulnerable configurations."
      },
      {
        "id": "q4",
        "prompt": "Why does recovering a weak test passphrase not imply every WPA3 network is vulnerable?",
        "modelAnswer": "Protocol, handshake, protection, credential entropy, and prerequisites differ; a chosen training sample proves only its own case."
      },
      {
        "id": "q5",
        "prompt": "What is the difference between a firmware filesystem and the running device's state?",
        "modelAnswer": "The image contains packaged code/configuration; runtime state adds memory, generated secrets, mounts, and configuration changes."
      },
      {
        "id": "q6",
        "prompt": "Why does a firmware update need authenticity checking as well as a checksum?",
        "modelAnswer": "A checksum can detect accidental change but does not by itself prove who produced the update; trusted signatures establish authenticity under the key model."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Protocol interpretation",
        "description": "Assessed as: protocol interpretation."
      },
      {
        "id": "c2",
        "label": "Scope and observation limits",
        "description": "Assessed as: scope and observation limits."
      },
      {
        "id": "c3",
        "label": "Firmware root causes",
        "description": "Assessed as: firmware root causes."
      },
      {
        "id": "c4",
        "label": "Remediation validation",
        "description": "Assessed as: remediation validation."
      }
    ],
    "practicalBrief": "produce a wireless configuration/capture assessment and an IoTGoat firmware report with validated evidence and fixes. Score: **protocol interpretation / scope and observation limits / firmware root causes / remediation validation**. Document whether live radio and physical hardware were actually tested.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  },
  {
    "id": "checkpoint-18",
    "blockId": "18",
    "title": "Chapter 18 quiz and practical — Evidence-based AI assessment",
    "criticalQuestionIds": [
      "q2",
      "q3",
      "q4"
    ],
    "quizQuestions": [
      {
        "id": "q1",
        "prompt": "Why is text retrieved from a document not equivalent to trusted system instructions?",
        "modelAnswer": "Retrieved documents may contain attacker-controlled content; their origin does not grant control-plane authority."
      },
      {
        "id": "q2",
        "prompt": "Does hiding a system prompt provide reliable authorization for a sensitive tool?",
        "modelAnswer": "No. Tool access and arguments need independent identity, authorization, validation, and approval controls."
      },
      {
        "id": "q3",
        "prompt": "Why should tenant filtering happen outside the model's discretionary reasoning?",
        "modelAnswer": "Data authorization must be enforceable and consistent even when model instructions are manipulated or outputs vary."
      },
      {
        "id": "q4",
        "prompt": "What distinguishes a strange answer from a security vulnerability?",
        "modelAnswer": "A vulnerability violates a defined protection boundary or creates demonstrated security impact under stated conditions."
      },
      {
        "id": "q5",
        "prompt": "Why should some AI tests be repeated rather than run once?",
        "modelAnswer": "Outputs may vary with model behavior and context; repeated trials reveal reliability and uncertainty."
      },
      {
        "id": "q6",
        "prompt": "What does a deterministic mock fail to demonstrate about a real model?",
        "modelAnswer": "It tests integration/control logic, not the model's response distribution or susceptibility to prompt manipulation."
      }
    ],
    "practicalCriteria": [
      {
        "id": "c1",
        "label": "Boundary accuracy",
        "description": "Assessed as: boundary accuracy."
      },
      {
        "id": "c2",
        "label": "Reproducible impact",
        "description": "Assessed as: reproducible impact."
      },
      {
        "id": "c3",
        "label": "Evaluation quality",
        "description": "Assessed as: evaluation quality."
      },
      {
        "id": "c4",
        "label": "Honest limitations and fixes",
        "description": "Assessed as: honest limitations and fixes."
      }
    ],
    "practicalBrief": "submit a complete AI application threat model, two hosted-lab investigations, the 20-case evaluation set, and mitigation/retest evidence. Score: **boundary accuracy / reproducible impact / evaluation quality / honest limitations and fixes**.",
    "passRules": "Quiz: score each answer 0–2; pass at 10/12 with no zero on a critical scope/isolation question. Practical: four criteria at 0–5; pass at 16/20 with no criterion below 3."
  }
];

export function getCheckpoint(id: string) {
  return checkpoints.find((checkpoint) => checkpoint.id === id);
}

export function getCheckpointByBlock(blockId: string) {
  return checkpoints.find((checkpoint) => checkpoint.blockId === blockId);
}
