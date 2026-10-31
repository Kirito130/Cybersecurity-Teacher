import type { Topic } from "./types";

export const topics02: Topic[] = [
  {
    "id": "02.1",
    "blockId": "02",
    "slug": "02-1",
    "title": "Devices, layers, and local networks",
    "subtopics": [
      {
        "id": "02.1.1",
        "title": "Physical/link layers",
        "concepts": "Ethernet, Wi-Fi, MAC address, frame, switch, access point",
        "reading": {
          "label": "Cisco Networking Basics: networks and Ethernet",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "Messer Network+: networking devices and OSI model",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "02.1.2",
        "title": "Packet forwarding",
        "concepts": "router, gateway, routing table, ARP, broadcast domain, VLAN",
        "reading": {
          "label": "Cisco Networking Basics: local communication and routing",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "Messer Network+: routing, switching, VLANs",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "02.1.3",
        "title": "Layer models",
        "concepts": "OSI versus TCP/IP, encapsulation, header/payload, MTU, fragmentation",
        "reading": {
          "label": "Cisco Networking Basics: protocols and models",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "Messer Network+: OSI and IP packet concepts",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      }
    ],
    "task": "in [Packet Tracer][CISCO] or a drawn simulation, connect two hosts through a switch and then connect two networks through a router. Trace the MAC/IP changes at each hop. Explain why a VLAN needs appropriate routing/firewall policy to communicate with another VLAN. Save a labeled diagram and three packet-flow explanations."
  },
  {
    "id": "02.2",
    "blockId": "02",
    "slug": "02-2",
    "title": "Addressing and transport",
    "subtopics": [
      {
        "id": "02.2.1",
        "title": "IPv4",
        "concepts": "private/public, subnet mask, CIDR, network/broadcast, loopback, default route",
        "reading": {
          "label": "Cisco Networking Basics: IPv4 and segmentation",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "TCM Part 1: addressing and subnetting, 41:06/1:14:39",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "02.2.2",
        "title": "IPv6 and translation",
        "concepts": "notation, link-local, neighbor discovery, dual stack, NAT/PAT",
        "reading": {
          "label": "Cisco Networking Basics: IPv6",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "Messer Network+: IPv6 and network address translation",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "02.2.3",
        "title": "Transport",
        "concepts": "TCP handshake, sequence/acknowledgment, UDP, ports, sockets, ICMP",
        "reading": {
          "label": "pwn.college: communication lectures/slides",
          "url": "https://pwn.college/intro-to-cybersecurity/intercepting-communication/"
        },
        "video": {
          "label": "Messer Network+: TCP, UDP, and protocol fundamentals",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      }
    ],
    "task": "solve ten subnetting problems, including `/24`, `/26`, `/27`, and `/30`; calculate network, usable range, and broadcast for ordinary IPv4 LAN subnets. Identify IPv6 addresses on your guest. Capture one TCP connection and one UDP exchange. Explain why “a UDP port did not answer” does not prove it is closed."
  },
  {
    "id": "02.3",
    "blockId": "02",
    "slug": "02-3",
    "title": "Network services and encrypted communication",
    "subtopics": [
      {
        "id": "02.3.1",
        "title": "Naming/configuration",
        "concepts": "DNS records A/AAAA/CNAME/MX/TXT, resolver/cache/TTL, DHCP lease, NTP",
        "reading": {
          "label": "Cisco Networking Basics: application services",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "Messer Network+: DNS, DHCP, NTP",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "02.3.2",
        "title": "Application protocols",
        "concepts": "HTTP/HTTPS, SSH/SFTP, SMTP, SMB, RDP, LDAP; service versus port number",
        "reading": {
          "label": "Nmap: services and version detection",
          "url": "https://nmap.org/book/man.html"
        },
        "video": {
          "label": "Messer Network+: common ports and protocols",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      },
      {
        "id": "02.3.3",
        "title": "Trust and boundaries",
        "concepts": "TLS certificate/hostname, VPN tunnel, proxy, firewall, segmentation",
        "reading": {
          "label": "MDN: HTTP and transport security",
          "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP"
        },
        "video": {
          "label": "Messer Network+: security concepts and remote access",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      }
    ],
    "task": "resolve a domain you own or an ordinary public documentation site using normal DNS queries; identify record types and TTLs. Inspect that site's TLS certificate in the browser. For your lab only, map five services to transport and observed port, then explain why moving SSH to a different port does not change its protocol."
  },
  {
    "id": "02.4",
    "blockId": "02",
    "slug": "02-4",
    "title": "Troubleshooting and packet analysis",
    "subtopics": [
      {
        "id": "02.4.1",
        "title": "Diagnostic tools",
        "concepts": "interface state, route, ping, traceroute, DNS lookup, socket listing",
        "reading": {
          "label": "Cisco Networking Basics: troubleshooting",
          "url": "https://www.netacad.com/courses/networking-basics"
        },
        "video": {
          "label": "TCM Part 1: common network commands, 2:45:21",
          "url": "https://www.youtube.com/watch?v=3FNYvj2U0HM"
        }
      },
      {
        "id": "02.4.2",
        "title": "Capture skills",
        "concepts": "interface choice, capture/display filters, conversations, streams, timestamps",
        "reading": {
          "label": "Wireshark User's Guide: capture and display filters",
          "url": "https://www.wireshark.org/docs/wsug_html_chunked/"
        },
        "video": {
          "label": "Wireshark: SharkFest training recordings",
          "url": "https://sharkfest.wireshark.org/retrospective/sfus/sf26us/"
        }
      },
      {
        "id": "02.4.3",
        "title": "Failure analysis",
        "concepts": "DNS failure, TCP refusal versus timeout, retransmission, TLS failure, asymmetric path",
        "reading": {
          "label": "Wireshark User's Guide: analyzing packets",
          "url": "https://www.wireshark.org/docs/wsug_html_chunked/"
        },
        "video": {
          "label": "Messer Network+: troubleshooting methodology and issues",
          "url": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"
        }
      }
    ],
    "task": "use only your own generated traffic or [Wireshark sample captures][PCAPS]. Annotate a DNS exchange and TCP handshake. Introduce three reversible lab faults: bad DNS setting, closed service, and blocked lab port. Identify each using a different observable symptom. Save capture files and a short troubleshooting decision tree."
  }
];
