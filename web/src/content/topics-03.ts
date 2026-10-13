import type { Topic } from "./types";

export const topics03: Topic[] = [
  {
    "id": "03.1",
    "blockId": "03",
    "slug": "03-1",
    "title": "Files, shell, and text processing",
    "subtopics": [
      {
        "id": "03.1.1",
        "title": "Navigation",
        "concepts": "absolute/relative path, home/root, file types, dotfiles, manual/help, editor",
        "reading": {
          "label": "Ubuntu command-line tutorial",
          "url": "https://ubuntu.com/tutorials/command-line-for-beginners"
        },
        "video": {
          "label": "MIT: Introduction to the Shell",
          "url": "https://missing.csail.mit.edu/2026/course-shell/"
        }
      },
      {
        "id": "03.1.2",
        "title": "Composition",
        "concepts": "stdin/stdout/stderr, redirection, pipes, quoting, globbing, exit status",
        "reading": {
          "label": "The Linux Command Line: shell chapters",
          "url": "https://linuxcommand.org/tlcl.php"
        },
        "video": {
          "label": "MIT: shell and scripting lectures",
          "url": "https://missing.csail.mit.edu/2020/shell-tools/"
        }
      },
      {
        "id": "03.1.3",
        "title": "Text",
        "concepts": "grep, sort, uniq, cut, find, regular-expression basics, structured versus plain text",
        "reading": {
          "label": "The Linux Command Line: text processing",
          "url": "https://linuxcommand.org/tlcl.php"
        },
        "video": {
          "label": "MIT: Data Wrangling",
          "url": "https://missing.csail.mit.edu/2020/data-wrangling/"
        }
      }
    ],
    "task": "complete [Bandit][BANDIT] levels 0–10 and the corresponding [Linux Luminarium][LUMINARIUM] paths, commands, and piping exercises. Analyze a synthetic log: count events, extract unique addresses, and separate errors. Explain every command and quote a filename containing spaces correctly. Do not publish challenge passwords."
  },
  {
    "id": "03.2",
    "blockId": "03",
    "slug": "03-2",
    "title": "Users, permissions, and processes",
    "subtopics": [
      {
        "id": "03.2.1",
        "title": "Identity",
        "concepts": "UID/GID, users/groups, root, sudo, least privilege, file ownership",
        "reading": {
          "label": "The Linux Command Line: permissions",
          "url": "https://linuxcommand.org/tlcl.php"
        },
        "video": {
          "label": "TCM Part 1: users and privileges, 2:28:22",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "03.2.2",
        "title": "Access",
        "concepts": "read/write/execute, directory semantics, octal modes, umask, ACL awareness, special bits",
        "reading": {
          "label": "Linux Luminarium: users and permissions",
          "url": "https://pwn.college/linux-luminarium/"
        },
        "video": {
          "label": "pwn.college: Access Control lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/access-control/"
        }
      },
      {
        "id": "03.2.3",
        "title": "Processes",
        "concepts": "PID/parent, jobs, signals, environment/PATH, service accounts, scheduled jobs",
        "reading": {
          "label": "The Linux Command Line: processes and environment",
          "url": "https://linuxcommand.org/tlcl.php"
        },
        "video": {
          "label": "MIT: command-line environment",
          "url": "https://missing.csail.mit.edu/2020/command-line/"
        }
      }
    ],
    "task": "create two unprivileged users and a shared group. Build a directory where one user can edit and another can only read; test as both users. Start a harmless long-running process, inspect its parent/environment, stop it, and explain the result. Solve six permissions or process challenges in Linux Luminarium."
  },
  {
    "id": "03.3",
    "blockId": "03",
    "slug": "03-3",
    "title": "Services, packages, and observability",
    "subtopics": [
      {
        "id": "03.3.1",
        "title": "Maintenance",
        "concepts": "repositories, package signatures, dependencies, service management, updates",
        "reading": {
          "label": "Kali Linux Revealed: package management and services",
          "url": "https://www.kali.org/docs/general-use/kali-training/"
        },
        "video": {
          "label": "TCM Part 1: services and installing/updating, 3:00:16–3:18:35",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "03.3.2",
        "title": "Remote access",
        "concepts": "SSH host keys, user keys, file transfer, listening address, firewall",
        "reading": {
          "label": "Kali Linux Revealed: securing and monitoring Linux",
          "url": "https://www.kali.org/docs/general-use/kali-training/"
        },
        "video": {
          "label": "MIT: command-line environment, remote machines",
          "url": "https://missing.csail.mit.edu/2020/command-line/"
        }
      },
      {
        "id": "03.3.3",
        "title": "Logs and recovery",
        "concepts": "journal/syslog, authentication events, disk/memory use, backups, time zones",
        "reading": {
          "label": "Kali Linux Revealed: administration/monitoring",
          "url": "https://www.kali.org/docs/general-use/kali-training/"
        },
        "video": {
          "label": "MIT: debugging/profiling and machine inspection",
          "url": "https://missing.csail.mit.edu/2020/debugging-profiling/"
        }
      }
    ],
    "task": "install a benign local service, restrict it to the intended interface, inspect its listener and logs, and connect with SSH keys between your own guests. Deliberately stop the service and diagnose the failure. Restore a configuration backup. Finish Bandit 11–20, with notes about encodings and archives rather than pasted solutions."
  }
];
