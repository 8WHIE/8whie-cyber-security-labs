# 8WHIE Cyber Security Labs

> **Worldwide Hackers Intelligence & Ethics**  
> Creator: **Aryan Thakur**  
> Copyright: © 2026 8WHIE — Aryan Thakur  
> Platform Motto: *"Learn. Practice. Secure."*

---

## 🛡️ About 8WHIE

**8WHIE** (*Worldwide Hackers Intelligence & Ethics*) is an original, dedicated educational cybersecurity platform and research laboratory designed by **Aryan Thakur**. 

The platform provides comprehensive, structured write-ups and technical walkthroughs for legal, authorized lab environments including **TryHackMe**, **Hack The Box**, **PortSwigger Web Security Academy**, and customized virtual machines.

### ⚖️ Ethical Use & Legal Policy
All content, methodologies, and code blocks published across 8WHIE are curated exclusively for authorized educational laboratories, CTFs, and defensive validation. The platform strictly adheres to ethical security standards:
- **Never** test, scan, or attack systems without explicit, verifiable written authorization.
- Always practice defensive techniques, root-cause remediation, and responsible disclosure.
- The author and 8WHIE disclaim any liability for unauthorized actions performed outside legal bounds.

---

## 🚀 Key Features

1. **Comprehensive Write-up Vault**:
   - Deep-dive walkthroughs covering reconnaissance, vulnerability identification, exploitation vectors, privilege escalation, and mitigation.
   - Categorized by **Platform** (TryHackMe, Hack The Box, PortSwigger, Custom Labs) and **Difficulty** (Easy, Medium, Hard, Insane).
   - Fast, interactive search and multi-criteria category filters.

2. **Core Security Disciplines**:
   - Web Security (OWASP Top 10, SQLi, SSRF, IDOR, deserialization)
   - Linux & Windows Internal Privilege Escalation
   - Active Directory Security (Kerberoasting, BloodHound, AS-REP roasting)
   - Network Analysis & Pivoting (Wireshark PCAP triage, Chisel, SSH tunneling)
   - OSINT (Intelligence gathering, infrastructure profiling)
   - Digital Forensics & Incident Response (DFIR with Volatility & Autopsy)
   - Applied Cryptography (Modern ciphers, RSA factorization, padding oracle attacks)
   - Reverse Engineering & Binary Exploitation (Ghidra, ELF/PE disassembly)
   - Defensive Malware Analysis (Static PE inspection, Yara rule authoring)

3. **Structured Learning Roadmaps**:
   - Beginner to Junior Penetration Tester
   - Web Application Security Specialist
   - Blue Team / SOC Analyst Path
   - Digital Forensics & Incident Response (DFIR)

4. **Tools & Techniques Reference Hub**:
   - Quick command cheatsheets, syntax examples, and real lab usage for tools like Nmap, Burp Suite, Gobuster, Impacket, LinPEAS, Volatility, Ghidra, and BloodHound.

5. **Integrated Labs Admin Dashboard**:
   - Add, edit, and delete write-ups and categories with local persistence (`localStorage`).
   - Export and import lab data backups as JSON.
   - Restore default research write-ups anytime.

6. **Interactive Reading Experience**:
   - Clean, dark-mode cybersecurity design.
   - Code blocks with syntax highlighting and instant one-click copy buttons.
   - Interactive Table of Contents with jump-to sections.
   - MITRE ATT&CK and CVE mapping cards for each machine.
   - Bookmarking and favorite list saved in the browser.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Typography**: Plus Jakarta Sans & JetBrains Mono
- **Icons**: Lucide React
- **Animations**: Motion
- **Data Layer**: Pure client-side zero-dependency storage (`localStorage` & static seed) with complete JSON export/import.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/8whie-cyber-labs.git

# Navigate into the project folder
cd 8whie-cyber-labs

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will run on `http://localhost:3000`.

### Production Build
```bash
# Compile and build production assets
npm run build

# Preview the production build locally
npm run preview
```

### Linting & Type Checking
```bash
npm run lint
```

---

## 🌐 Deploying to GitHub & Static Hosting

This project is fully static and client-side ready, making it directly deployable on:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Cloudflare Pages**

For GitHub Pages, run `npm run build` and deploy the output in `/dist` to your repository's `gh-pages` branch.

---

## 📜 License

This project is distributed under the [MIT License](LICENSE).  
Copyright © 2026 8WHIE — Aryan Thakur. All Rights Reserved.
