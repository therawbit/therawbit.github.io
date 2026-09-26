/**
 * DATA — single source of truth for all rendered content.
 */
window.DATA = Object.freeze({
    projects: [
        { name: "Secware", type: "SYS_SEC", desc: "A sophisticated desktop application designed to watch for changes in a selected folder. It detects the occurrence of any Windows executables, disassembles the sample, and feeds it to a pre-trained machine learning model for classification and notify the user.", tech: "Python / Bash / ML", github: "https://github.com/therawbit/secware" },
        { name: "Query-Us", type: "SYS_DEV", desc: "Backend API for a Discussion Forum Application made using Spring Boot and PostgreSQL. The features include the ability to ask questions and post answers, perform a full text search using tags and text, upvoting system, and question views count.", tech: "Spring Boot / React", github: "https://github.com/therawbit/QueryUs" },
        { name: "Hyprland Config", type: "SYS_ETC", desc: "An Arch Linux configuration designed to automate the setup of a Hyprland-based desktop environment — Wayland, scripting, and dotfiles in one bootstrap.", tech: "Bash / Lua / Config", github: "https://github.com/therawbit/dotfiles" },
        { name: "Budget On", type: "SYS_APK", desc: "Full Stack expense tracker application created using Java. Backend is built using Spring Boot and the front end is a native Android application.", tech: "Spring Boot / Android", github: "https://github.com/therawbit/Budget-On" },
        { name: "iOrder", type: "SYS_APK", desc: "Android application created as a project for KU Hackfest 2022. Restaurants can let customers order food from their own device by scanning a QR code placed at the table.", tech: "Java / Android", github: "https://github.com/therawbit/iOrder" },
        { name: "YT-MP3", type: "SYS_DEV", desc: "A command line utility built in Python to download YouTube videos as MP3. It handles either a single video or an entire playlist from the provided link.", tech: "Python", github: "https://github.com/therawbit/YT-Mp3" },
    ],
    certs: [
        { title: "Certified Network Security Practitioner", issuer: "The SecOps Group (PentestingExams.com)", id: "CNSP-9455749", date: "December 2024", imagePath: "./certificates/cnsp.jpg" },
        { title: "Certified Cyber Security Analyst (C3SA)", issuer: "CyberWarFare Labs", id: "C3SA-2E0359D2", date: "April 2024", imagePath: "./certificates/c3sa.jpg" },
        { title: "Gajabaar Infosecurity Mentorship", issuer: "Gajabaar", id: "GB-2023001", date: "April 2024", imagePath: "./certificates/gajabaar.jpg" },
        { title: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group (PentestingExams.com)", id: "CAP-7967136", date: "October 2023", imagePath: "./certificates/cap.jpg" },
        { title: "AWS Academy Graduate — Cloud Foundations", issuer: "Amazon Web Services (AWS)", id: "AWS-CCF", date: "August 2023", imagePath: "./certificates/aws.jpg" },
    ],
    experiences: [
        { title: "Software Engineer I · Product Development", organization: "Smart Data Solutions", startDate: "July 2025", endDate: "Present", desc: "Building and hardening core product services — shipping features with security baked into the SDLC." },
        { title: "Full-stack Java Developer", organization: "Smart Data Solutions", startDate: "February 2025", endDate: "July 2025", desc: "Owned backend APIs and the surrounding web layer across the full delivery pipeline." },
        { title: "Java Software Engineer", organization: "UGRO Capital / Code Himalaya", startDate: "June 2024", endDate: "February 2025", desc: "Developed financial-grade Java services with an application-security mindset." },
        { title: "Junior Java Developer", organization: "Code Himalaya Pvt. Ltd", startDate: "May 2024", endDate: "February 2025", desc: "Grew from intern to engineer — Spring Boot services, reviews, and production support." },
        { title: "Java Developer Intern", organization: "Dakshya A.I", startDate: "July 2023", endDate: "October 2023", desc: "First professional deployment. Learned the craft inside a shipping team." },
    ],
    education: [
        { title: "Bachelors (Computer Engineering)", organization: "Tribhuvan University // IOE // WRC", status: "Deployed", batch: "2019 — 2024" },
        { title: "High School", organization: "Gandaki Boarding School (GBS)", status: "Deployed", batch: "2017 — 2019" },
        { title: "School", organization: "Pokhara Academy", status: "Deployed", batch: "2003 — 2016" },
    ],
    roles: [
        "Java / Spring Boot Engineer",
        "Application Security Engineer",
        "Android Developer",
        "Linux · Arch Wizard",
        "Reverse Engineer",
    ],
    marquee: ["JAVA", "SPRING BOOT", "APPSEC", "GHIDRA", "BURP SUITE", "POSTGRESQL", "KAFKA", "REDIS", "DOCKER", "ANDROID", "PYTHON", "REACT", "KOTLIN", "LINUX", "JADX", "CI/CD"],
});
