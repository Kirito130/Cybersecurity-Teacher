import type { Topic } from "./types";

export const topics14: Topic[] = [
  {
    "id": "14.1",
    "blockId": "14",
    "slug": "14-1",
    "title": "C, memory, and machine architecture",
    "subtopics": [
      {
        "id": "14.1.1",
        "title": "C programming",
        "concepts": "types, arrays, pointers, structs, allocation/free, compilation, warnings, undefined behavior",
        "reading": {
          "label": "CS50x: C/arrays/memory notes",
          "url": "https://cs50.harvard.edu/x/"
        },
        "video": {
          "label": "CS50x: weeks 1, 2, and 4",
          "url": "https://cs50.harvard.edu/x/"
        }
      },
      {
        "id": "14.1.2",
        "title": "Machine model",
        "concepts": "registers, stack/heap, virtual memory, endianness, instruction pointer, system calls",
        "reading": {
          "label": "pwn.college: Computing 101",
          "url": "https://pwn.college/computing-101/"
        },
        "video": {
          "label": "pwn.college: Computing 101 lectures",
          "url": "https://pwn.college/computing-101/"
        }
      },
      {
        "id": "14.1.3",
        "title": "Assembly",
        "concepts": "x86-64 instructions, calling conventions, branches, arguments/returns, executable formats",
        "reading": {
          "label": "OST2 Arch1001: course materials",
          "url": "https://p.ost2.fyi/"
        },
        "video": {
          "label": "OST2 Arch1001: x86-64 Assembly",
          "url": "https://p.ost2.fyi/"
        }
      }
    ],
    "task": "write three small C programs using arrays, pointers, and dynamic allocation. Compile with warnings, inspect their assembly, and follow one function call in a debugger. Draw the stack/heap layout of a simple example. Solve introductory Computing 101 challenges. Do not skip C and jump straight to copying exploit scripts."
  },
  {
    "id": "14.2",
    "blockId": "14",
    "slug": "14-2",
    "title": "Static and dynamic program analysis",
    "subtopics": [
      {
        "id": "14.2.1",
        "title": "Static inspection",
        "concepts": "strings, symbols, imports, control/data flow, disassembly versus decompilation",
        "reading": {
          "label": "Ghidra: official beginner training",
          "url": "https://ghidra.re/ghidra_docs/GhidraClass/Beginner/Introduction_to_Ghidra_Student_Guide.html"
        },
        "video": {
          "label": "OST2 Dbg1102: Introductory Ghidra",
          "url": "https://p.ost2.fyi/"
        }
      },
      {
        "id": "14.2.2",
        "title": "Debugging",
        "concepts": "breakpoint, stepping, registers, memory view, call stack, watchpoint, crash trace",
        "reading": {
          "label": "GDB manual",
          "url": "https://sourceware.org/gdb/current/onlinedocs/gdb.html/"
        },
        "video": {
          "label": "OST2 Dbg1012: Introductory GDB",
          "url": "https://p.ost2.fyi/"
        }
      },
      {
        "id": "14.2.3",
        "title": "Behavioral models",
        "concepts": "input validation, parsing, file/network operations, execution trace, inferred types",
        "reading": {
          "label": "pwn.college: reverse-engineering module",
          "url": "https://pwn.college/intro-to-cybersecurity/reverse-engineering/"
        },
        "video": {
          "label": "pwn.college: reverse-engineering lectures",
          "url": "https://pwn.college/intro-to-cybersecurity/reverse-engineering/"
        }
      }
    ],
    "task": "analyze your own stripped program without reading its source, recover its input rules, then compare your conclusions with the source. Solve four beginner reverse-engineering challenges in pwn.college or [CyLab][CYLAB]. Include one hypothesis disproved by dynamic evidence and explain why decompiler output was not authoritative source code."
  },
  {
    "id": "14.3",
    "blockId": "14",
    "slug": "14-3",
    "title": "Memory corruption and exploitation constraints",
    "subtopics": [
      {
        "id": "14.3.1",
        "title": "Bug classes",
        "concepts": "out-of-bounds read/write, stack overflow, integer errors, format strings, use-after-free",
        "reading": {
          "label": "OST2 SecDev/Vulns course materials",
          "url": "https://p.ost2.fyi/"
        },
        "video": {
          "label": "OST2: C-family vulnerability courses",
          "url": "https://p.ost2.fyi/"
        }
      },
      {
        "id": "14.3.2",
        "title": "Mitigations",
        "concepts": "NX/DEP, ASLR/PIE, canaries, RELRO, control-flow protections, hardened allocators",
        "reading": {
          "label": "pwn.college: Program Security",
          "url": "https://pwn.college/program-security/"
        },
        "video": {
          "label": "pwn.college: Program Security lectures",
          "url": "https://pwn.college/program-security/"
        }
      },
      {
        "id": "14.3.3",
        "title": "Controlled exploitation",
        "concepts": "crash versus control, offsets, calling convention, information disclosure, ROP concepts, heap lifetime",
        "reading": {
          "label": "pwn.college: program security, ROP, allocator modules",
          "url": "https://pwn.college/program-security/"
        },
        "video": {
          "label": "pwn.college: corresponding lectures",
          "url": "https://pwn.college/program-security/"
        }
      }
    ],
    "task": "solve at least six beginner binary-exploitation challenges across two bug classes in designated training environments. For one toy program, reproduce a memory error with a sanitizer, explain the corrupted object, and demonstrate only the challenge's intended proof. Compare protected/unprotected builds and fix the original code. A crash is a bug report, not automatically proof of arbitrary code execution."
  },
  {
    "id": "14.4",
    "blockId": "14",
    "slug": "14-4",
    "title": "Fuzzing, root causes, and disclosure",
    "subtopics": [
      {
        "id": "14.4.1",
        "title": "Fuzzing",
        "concepts": "harness, seed corpus, mutation/generation, coverage feedback, sanitizer, timeout/resource budget",
        "reading": {
          "label": "AFL++: fuzzing documentation",
          "url": "https://aflplus.plus/docs/"
        },
        "video": {
          "label": "OST2 Fuzz1001: introductory fuzzing",
          "url": "https://p.ost2.fyi/"
        }
      },
      {
        "id": "14.4.2",
        "title": "Triage",
        "concepts": "reproducibility, deduplication, minimization, stack trace, root cause, patch, regression",
        "reading": {
          "label": "AFL++: crash investigation",
          "url": "https://aflplus.plus/docs/"
        },
        "video": {
          "label": "OST2 Fuzz1001: crash analysis and case studies",
          "url": "https://p.ost2.fyi/"
        }
      },
      {
        "id": "14.4.3",
        "title": "Research reporting",
        "concepts": "affected version, impact evidence, minimal reproducer, coordinated disclosure, upstream fix",
        "reading": {
          "label": "CERT/CC: Coordinated Vulnerability Disclosure Guide",
          "url": "https://certcc.github.io/CERT-Guide-to-CVD/"
        },
        "video": {
          "label": "Hacker101: reporting",
          "url": "https://www.hacker101.com/playlists/pentesting_series"
        }
      }
    ],
    "task": "fuzz your own small parser or an explicitly designated educational target for a fixed time budget. If a crash occurs, minimize it, identify the cause, patch, and add a regression test. If none occurs, report coverage, corpus, time, and limitations honestly; add a known intentional bug in your own parser to prove the harness detects it. Draft a disclosure report without contacting a real vendor unless you have an actual verified issue and appropriate process."
  }
];
