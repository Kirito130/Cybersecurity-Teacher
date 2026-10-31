import type { Block } from "./types";

export const blocks: Block[] = [
  {
    "id": "00",
    "slug": "00",
    "number": "00",
    "title": "Orientation, authorization, and learning habits",
    "outcome": "explain what a penetration test is and create the records needed to practice responsibly. Learn concepts here; install the lab in Chapter 01.",
    "estimatedHours": "8–12",
    "prerequisites": [],
    "topicIds": [
      "00.1",
      "00.2",
      "00.3"
    ],
    "checkpointId": "checkpoint-00",
    "badgeId": "badge-00",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": false
  },
  {
    "id": "01",
    "slug": "01",
    "number": "01",
    "title": "Computer literacy and an isolated lab",
    "outcome": "use a computer confidently and explain what is happening when software runs. Do not begin with attack tools.",
    "estimatedHours": "35–55",
    "prerequisites": [
      "00"
    ],
    "topicIds": [
      "01.1",
      "01.2",
      "01.3"
    ],
    "checkpointId": "checkpoint-01",
    "badgeId": "badge-01",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": false
  },
  {
    "id": "02",
    "slug": "02",
    "number": "02",
    "title": "Networking from first principles",
    "outcome": "explain a request from application to destination, interpret packets, and troubleshoot connectivity.",
    "estimatedHours": "70–100",
    "prerequisites": [
      "01"
    ],
    "topicIds": [
      "02.1",
      "02.2",
      "02.3",
      "02.4"
    ],
    "checkpointId": "checkpoint-02",
    "badgeId": "badge-02",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "03",
    "slug": "03",
    "number": "03",
    "title": "Linux administration and the command line",
    "outcome": "understand the operating system beneath the tools. Use Ubuntu first; introduce Kali as a toolbox after you can manage a normal Linux guest.",
    "estimatedHours": "60–90",
    "prerequisites": [
      "02"
    ],
    "topicIds": [
      "03.1",
      "03.2",
      "03.3"
    ],
    "checkpointId": "checkpoint-03",
    "badgeId": "badge-03",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": false
  },
  {
    "id": "04",
    "slug": "04",
    "number": "04",
    "title": "Windows, PowerShell, and endpoint internals",
    "outcome": "administer and inspect a Windows lab without confusing local accounts, administrator rights, and domain identities.",
    "estimatedHours": "50–80",
    "prerequisites": [
      "03"
    ],
    "topicIds": [
      "04.1",
      "04.2",
      "04.3"
    ],
    "checkpointId": "checkpoint-04",
    "badgeId": "badge-04",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": false
  },
  {
    "id": "05",
    "slug": "05",
    "number": "05",
    "title": "Programming, automation, and reproducibility",
    "outcome": "write and debug small tools, read unfamiliar code, and understand what a downloaded script will do before running it.",
    "estimatedHours": "100–150",
    "prerequisites": [
      "04"
    ],
    "topicIds": [
      "05.1",
      "05.2",
      "05.3",
      "05.4"
    ],
    "checkpointId": "checkpoint-05",
    "badgeId": "badge-05",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "06",
    "slug": "06",
    "number": "06",
    "title": "Build applications before testing them",
    "outcome": "understand the browser, server, database, and identity boundaries that create application vulnerabilities.",
    "estimatedHours": "70–110",
    "prerequisites": [
      "05"
    ],
    "topicIds": [
      "06.1",
      "06.2",
      "06.3"
    ],
    "checkpointId": "checkpoint-06",
    "badgeId": "badge-06",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": false
  },
  {
    "id": "07",
    "slug": "07",
    "number": "07",
    "title": "Security principles, cryptography, and defense",
    "outcome": "explain why a weakness matters and how a control addresses it, rather than identifying tools by name.",
    "estimatedHours": "50–75",
    "prerequisites": [
      "06"
    ],
    "topicIds": [
      "07.1",
      "07.2",
      "07.3",
      "07.4"
    ],
    "checkpointId": "checkpoint-07",
    "badgeId": "badge-07",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "08",
    "slug": "08",
    "number": "08",
    "title": "A repeatable penetration-testing method",
    "outcome": "move from a written scope to a defensible finding. Learn why and when to use a tool before relying on its output.",
    "estimatedHours": "60–90",
    "prerequisites": [
      "07"
    ],
    "topicIds": [
      "08.1",
      "08.2",
      "08.3",
      "08.4"
    ],
    "checkpointId": "checkpoint-08",
    "badgeId": "badge-08",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "09",
    "slug": "09",
    "number": "09",
    "title": "Core web application vulnerabilities",
    "outcome": "discover and explain common application flaws manually. For a video embedded under a lab's **Community solutions**, treat that lab as a demonstration. Attempt it first, then watch; use a different lab for your independent task count. Never count a watched solution as an unseen solve.",
    "estimatedHours": "110–160",
    "prerequisites": [
      "08"
    ],
    "topicIds": [
      "09.1",
      "09.2",
      "09.3",
      "09.4"
    ],
    "checkpointId": "checkpoint-09",
    "badgeId": "badge-09",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "10",
    "slug": "10",
    "number": "10",
    "title": "APIs, advanced web behavior, and code review",
    "outcome": "investigate state, identity, and parser interactions that simple scanners frequently miss. Read research papers critically and reproduce only their designated lab scenarios.",
    "estimatedHours": "130–190",
    "prerequisites": [
      "09"
    ],
    "topicIds": [
      "10.1",
      "10.2",
      "10.3",
      "10.4"
    ],
    "checkpointId": "checkpoint-10",
    "badgeId": "badge-10",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "11",
    "slug": "11",
    "number": "11",
    "title": "Network services, host access, and privilege escalation",
    "outcome": "reason from exposed service to authorized proof, understand privilege boundaries, and assess reachable lab segments without treating a tool's success message as sufficient evidence.",
    "estimatedHours": "110–170",
    "prerequisites": [
      "10"
    ],
    "topicIds": [
      "11.1",
      "11.2",
      "11.3",
      "11.4"
    ],
    "checkpointId": "checkpoint-11",
    "badgeId": "badge-11",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "12",
    "slug": "12",
    "number": "12",
    "title": "Active Directory and identity attack paths",
    "outcome": "understand how enterprise identity relationships create access paths and how to remove those paths. This is a substantial engineering topic, not a list of attack commands.",
    "estimatedHours": "130–190",
    "prerequisites": [
      "11"
    ],
    "topicIds": [
      "12.1",
      "12.2",
      "12.3",
      "12.4"
    ],
    "checkpointId": "checkpoint-12",
    "badgeId": "badge-12",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "13",
    "slug": "13",
    "number": "13",
    "title": "Cloud, containers, and software delivery",
    "outcome": "reason about identities, policies, workloads, and secrets across modern infrastructure. Start with one provider in depth—AWS here—and learn to translate the model to Azure/Entra and GCP. Breadth alone is not multi-cloud expertise.",
    "estimatedHours": "100–160",
    "prerequisites": [
      "12"
    ],
    "topicIds": [
      "13.1",
      "13.2",
      "13.3",
      "13.4"
    ],
    "checkpointId": "checkpoint-13",
    "badgeId": "badge-13",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "14",
    "slug": "14",
    "number": "14",
    "title": "Reverse engineering and vulnerability research",
    "outcome": "understand executable behavior, investigate crashes, and distinguish a reproducible bug from a proven security vulnerability. This block introduces advanced research foundations; kernel, browser, hypervisor, and firmware exploitation remain additional specialties.",
    "estimatedHours": "160–240",
    "prerequisites": [
      "13"
    ],
    "topicIds": [
      "14.1",
      "14.2",
      "14.3",
      "14.4"
    ],
    "checkpointId": "checkpoint-14",
    "badgeId": "badge-14",
    "detailLevel": "full",
    "topicCount": 4,
    "isSpecialist": false
  },
  {
    "id": "15",
    "slug": "15",
    "number": "15",
    "title": "Independent engagements and professional delivery",
    "outcome": "plan, execute, and communicate an assessment another professional can trust. This is the core graduation block.",
    "estimatedHours": "100–150",
    "prerequisites": [
      "14"
    ],
    "topicIds": [
      "15.1",
      "15.2",
      "15.3"
    ],
    "checkpointId": "checkpoint-15",
    "badgeId": "badge-15",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": false
  },
  {
    "id": "16",
    "slug": "16",
    "number": "16",
    "title": "Mobile application specialization",
    "outcome": "practical Android assessment plus an informed iOS comparison. iOS hands-on completion requires suitable Apple hardware/software and, for some techniques, suitable test-device access; do not claim it from Android-only work.",
    "estimatedHours": "70–120",
    "prerequisites": [
      "10",
      "14"
    ],
    "topicIds": [
      "16.1",
      "16.2",
      "16.3"
    ],
    "checkpointId": "checkpoint-16",
    "badgeId": "badge-16",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": true
  },
  {
    "id": "17",
    "slug": "17",
    "number": "17",
    "title": "Wireless and IoT specialization",
    "outcome": "assess wireless configurations and embedded-software attack surfaces. Use supplied captures or your own access point; active interference with nearby networks is outside this curriculum.",
    "estimatedHours": "70–120",
    "prerequisites": [
      "11",
      "14"
    ],
    "topicIds": [
      "17.1",
      "17.2",
      "17.3"
    ],
    "checkpointId": "checkpoint-17",
    "badgeId": "badge-17",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": true
  },
  {
    "id": "18",
    "slug": "18",
    "number": "18",
    "title": "AI application security specialization",
    "outcome": "assess an AI-enabled application's data access and actions. This is application security around probabilistic components; making a chatbot say something surprising is not automatically a security finding.",
    "estimatedHours": "50–90",
    "prerequisites": [
      "10",
      "13"
    ],
    "topicIds": [
      "18.1",
      "18.2",
      "18.3"
    ],
    "checkpointId": "checkpoint-18",
    "badgeId": "badge-18",
    "detailLevel": "full",
    "topicCount": 3,
    "isSpecialist": true
  }
];

export function getBlock(id: string) {
  return blocks.find((block) => block.id === id || block.slug === id);
}

export function getBlockBySlug(slug: string) {
  return blocks.find((block) => block.slug === slug || block.id === slug);
}
