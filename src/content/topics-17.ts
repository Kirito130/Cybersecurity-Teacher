import type { Topic } from "./types";

export const topics17: Topic[] = [
  {
    "id": "17.1",
    "blockId": "17",
    "slug": "17-1",
    "title": "Wireless protocols and evidence",
    "subtopics": [
      {
        "id": "17.1.1",
        "title": "Radio and frames",
        "concepts": "channels/bands, SSID/BSSID, association, management/data/control frames, capture limits",
        "reading": {
          "label": "Aircrack-ng: getting started and tutorials",
          "url": "https://www.aircrack-ng.org/doku.php?id=getting_started"
        },
        "video": {
          "label": "Messer Network+: wireless technologies",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "17.1.2",
        "title": "Authentication",
        "concepts": "WPA2/WPA3, personal/enterprise, SAE, 802.1X/EAP, certificate trust, protected management frames",
        "reading": {
          "label": "Cisco Networking Academy: wireless/security material",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "Messer Network+: wireless security and authentication",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "17.1.3",
        "title": "Observation",
        "concepts": "monitor mode, adapter constraints, channel coverage, handshake interpretation, synthetic capture",
        "reading": {
          "label": "Wireshark: wireless capture guidance and samples",
          "url": "https://wiki.wireshark.org/SampleCaptures"
        },
        "video": {
          "label": "Aircrack-ng: project video demonstrations",
          "url": "https://www.aircrack-ng.org/doku.php?id=videos"
        }
      }
    ],
    "task": "analyze a supplied wireless capture or a passive capture of your own isolated AP. Identify networks, frame types, and a client association; state which events are absent or encrypted. Explain why old WEP/WPA demonstrations are historical examples and must not be generalized to modern WPA3 configurations."
  },
  {
    "id": "17.2",
    "blockId": "17",
    "slug": "17-2",
    "title": "Wireless assessment and configuration hardening",
    "subtopics": [
      {
        "id": "17.2.1",
        "title": "Scope/configuration",
        "concepts": "AP ownership, radio reach, guest isolation, admin interface, firmware, WPS",
        "reading": {
          "label": "Aircrack-ng: tutorials",
          "url": "https://www.aircrack-ng.org/doku.php?id=getting_started"
        },
        "video": {
          "label": "Messer Network+: wireless setup and security",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "17.2.2",
        "title": "Credential evaluation",
        "concepts": "supplied handshake, offline checking, strong passphrases, enterprise server certificates",
        "reading": {
          "label": "Aircrack-ng: WPA tutorials and limitations",
          "url": "https://www.aircrack-ng.org/doku.php?id=getting_started"
        },
        "video": {
          "label": "Aircrack-ng: video demonstrations",
          "url": "https://www.aircrack-ng.org/doku.php?id=videos"
        }
      },
      {
        "id": "17.2.3",
        "title": "Validation",
        "concepts": "segmentation, management access, firmware support, monitoring, modern protocol choice",
        "reading": {
          "label": "Wi-Fi Alliance: security",
          "url": "https://www.wi-fi.org/discover-wi-fi/security"
        },
        "video": {
          "label": "Messer Network+: wireless security/troubleshooting",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      }
    ],
    "task": "audit your own AP's configuration or a provided configuration export. On an intentionally weak, supplied test capture, demonstrate an offline password check and explain its limits. Verify guest-to-private segmentation with your own two clients if available. No forced disconnections, rogue AP targeting strangers, or interference is needed. Capture-only learners label live-radio testing as not performed."
  },
  {
    "id": "17.3",
    "blockId": "17",
    "slug": "17-3",
    "title": "Embedded Linux, firmware, and device interfaces",
    "subtopics": [
      {
        "id": "17.3.1",
        "title": "Firmware anatomy",
        "concepts": "bootloader/kernel/root filesystem, architecture, embedded services, configuration/secrets",
        "reading": {
          "label": "OWASP IoTGoat: setup and wiki",
          "url": "https://github.com/OWASP/IoTGoat"
        },
        "video": {
          "label": "OWASP: IoTGoat project presentation",
          "url": "https://www.youtube.com/watch?v=29CspfVh9qs"
        }
      },
      {
        "id": "17.3.2",
        "title": "Interfaces",
        "concepts": "web/admin API, network services, UART/JTAG concepts, update channel, device/cloud boundary",
        "reading": {
          "label": "OWASP Firmware Security Testing Methodology",
          "url": "https://scriptingxss.gitbook.io/firmware-security-testing-methodology"
        },
        "video": {
          "label": "OWASP IoTGoat presentation and demonstrations",
          "url": "https://www.youtube.com/watch?v=29CspfVh9qs"
        }
      },
      {
        "id": "17.3.3",
        "title": "Analysis",
        "concepts": "extraction, static review, emulation, default accounts, update authenticity, component vulnerabilities",
        "reading": {
          "label": "IoTGoat wiki and FSTM",
          "url": "https://scriptingxss.gitbook.io/firmware-security-testing-methodology"
        },
        "video": {
          "label": "OWASP IoTGoat presentation",
          "url": "https://www.youtube.com/watch?v=29CspfVh9qs"
        }
      }
    ],
    "task": "analyze the designated [IoTGoat][IOTGOAT] firmware offline, then run its vulnerable guest only in your isolated lab. Inventory components and services, identify three weaknesses, and validate two using synthetic proof data. Explain the firmware update trust model and how you would verify a fix. Physical probing is optional; conceptual UART/JTAG familiarity is not hands-on hardware expertise."
  }
];
