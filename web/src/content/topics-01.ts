import type { Topic } from "./types";

export const topics01: Topic[] = [
  {
    "id": "01.1",
    "blockId": "01",
    "slug": "01-1",
    "title": "Hardware, data, and operating systems",
    "subtopics": [
      {
        "id": "01.1.1",
        "title": "Components",
        "concepts": "CPU, cores, RAM, storage, network adapter, peripherals, firmware",
        "reading": {
          "label": "Cisco: Computer Hardware Basics",
          "url": "https://www.netacad.com/courses/computer-hardware-basics"
        },
        "video": {
          "label": "Messer A+ Core 1: memory, storage, CPU, BIOS",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/"
        }
      },
      {
        "id": "01.1.2",
        "title": "Data representation",
        "concepts": "bits/bytes, binary/decimal/hex, text encodings, file types, compression",
        "reading": {
          "label": "CS50x Week 0: notes",
          "url": "https://cs50.harvard.edu/x/2026/weeks/0/"
        },
        "video": {
          "label": "CS50x Week 0: lecture",
          "url": "https://cs50.harvard.edu/x/2026/weeks/0/"
        }
      },
      {
        "id": "01.1.3",
        "title": "Execution",
        "concepts": "OS, kernel, application, process, service, driver, boot sequence",
        "reading": {
          "label": "Cisco: Operating Systems Basics",
          "url": "https://www.netacad.com/courses/operating-systems-basics"
        },
        "video": {
          "label": "Messer A+ Core 2: Operating Systems",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      }
    ],
    "task": "inventory your CPU, architecture, RAM, free storage, OS version, and network adapter without opening the chassis. Convert five small values between binary, decimal, and hexadecimal; distinguish MB from Mb. Open an application, identify its process, and explain which components retain data after shutdown."
  },
  {
    "id": "01.2",
    "blockId": "01",
    "slug": "01-2",
    "title": "Everyday technical fluency",
    "subtopics": [
      {
        "id": "01.2.1",
        "title": "Files",
        "concepts": "paths, folders, extensions, hidden files, copy/move/delete, archives, permissions",
        "reading": {
          "label": "Cisco: operating-system file management",
          "url": "https://www.netacad.com/courses/operating-systems-basics"
        },
        "video": {
          "label": "Messer A+ Core 2: Windows tools and file systems",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      },
      {
        "id": "01.2.2",
        "title": "Software",
        "concepts": "browser versus internet, URL, download, install, update, uninstall, trusted source",
        "reading": {
          "label": "MDN: getting started and environment setup",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development"
        },
        "video": {
          "label": "Messer A+ Core 2: application installation and browser security",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      },
      {
        "id": "01.2.3",
        "title": "Troubleshooting",
        "concepts": "exact error, recent change, one-variable test, log, backup, restore",
        "reading": {
          "label": "Cisco: OS troubleshooting",
          "url": "https://www.netacad.com/courses/operating-systems-basics"
        },
        "video": {
          "label": "Messer A+ Core 1: Troubleshooting Hardware/Networks",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/"
        }
      }
    ],
    "task": "create a folder tree, save a text file, show its extension, archive it, restore a deleted copy from your own backup, and compare contents. Install and remove a benign application from its official source. Reproduce a missing-file error and document a diagnosis using evidence rather than repeated random changes."
  },
  {
    "id": "01.3",
    "blockId": "01",
    "slug": "01-3",
    "title": "Virtual machines and recovery",
    "subtopics": [
      {
        "id": "01.3.1",
        "title": "Virtualization",
        "concepts": "hypervisor, guest image, ISO, virtual CPU/RAM/disk, architecture compatibility",
        "reading": {
          "label": "VirtualBox manual: first steps",
          "url": "https://docs.oracle.com/en/virtualization/virtualbox/7.1/user/Introduction.html"
        },
        "video": {
          "label": "Messer A+ Core 1: Virtualization Concepts/Services",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/"
        }
      },
      {
        "id": "01.3.2",
        "title": "Networking",
        "concepts": "internal network, host-only, NAT, bridged, port forwarding, interface selection",
        "reading": {
          "label": "VirtualBox: networking modes",
          "url": "https://docs.oracle.com/en/virtualization/virtualbox/7.1/user/networkingdetails.html"
        },
        "video": {
          "label": "TCM Part 1: VM installation/configuration",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "01.3.3",
        "title": "Recovery",
        "concepts": "snapshots, guest updates, clean baseline, export, independent backup, disk capacity",
        "reading": {
          "label": "VirtualBox: snapshots and virtual storage",
          "url": "https://docs.oracle.com/en/virtualization/virtualbox/7.1/user/Introduction.html"
        },
        "video": {
          "label": "Messer A+ Core 2: backup and recovery",
          "url": "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"
        }
      }
    ],
    "task": "install a supported Ubuntu guest from its official image and make a clean snapshot. Add a second benign guest when resources permit. Place them on an internal network, document their interfaces, and verify connectivity only where intended. Make a harmless configuration change and restore the snapshot. Keep vulnerable images uninstalled until you can explain the network settings."
  }
];
