/**
 * 1. CONFIG & DATA (Original Data Restored)
 */
const CONFIG = Object.freeze({
    FONT_SIZE: 14,
    INTERVAL: 64,
    MATRIX_COLOR: "#FA927F",
    MATRIX_BG: "rgba(5, 5, 5, 0.2)",
});

const DATA = {
    projects: [
        { name: "Secware", type: "SYS_SEC", desc: "A sophisticated desktop application designed to watch for changes in a selected folder. It detects the occurrence of any Windows executables, disassembles the sample, and feeds it to a pre-trained machine learning model for classification and notify the user.", tech: "Python / Bash", github: "https://github.com/therawbit/secware" },
        { name: "Query-Us", type: "SYS_DEV", desc: "Backend API for a Discussion Forum Application made using Spring Boot and PostgreSQL.The features include the ability to ask questions and post answers, perform a full text search using tags and text, upvoting system, and question views count.", tech: "Spring Boot / React", github: "https://github.com/therawbit/QueryUs" },
        { name: "Hyprland config", type: "SYS_ETC", desc: "A Arch Linux configuration designed to automate the configuration of a Hyprland-based desktop environment", tech: "Bash / Lua / Config", github: "https://github.com/therawbit/dotfiles" },
        { name: "Budget On", type: "SYS_APK", desc: "Full Stack expense tracker application created using Java. Backend is built using the Spring-Boot and front end is a native Android application.", tech:"Spring Boot / Android", github: "https://github.com/therawbit/Budget-On"},
        { name: "iOrder", type: "SYS_APK", desc: "Android application created as a project for KU Hackfest 2022. It can be implemented by restaurant to allow their customers to order their foods with their own device by scanning the QR code placed at the table.", tech: "Java / Andriod", github: "https://github.com/therawbit/iOrder"},
        { name: "YT-MP3", type: "SYS_DEV", desc: "A command line utility built on Python to download youtube videos as mp3 file. It is capable of downloading either a Single video or the whole Playlist based on the link you provide.", tech:"Python", github:"https://github.com/therawbit/YT-Mp3" },
    ],
    certs: [
        { title: "Certified Network Security Practitioner", issuer: "The SecOps Group ( Creators of PentestingExams.com )", id: "9455749", date: "December 2024", link:"#", imagePath: "./certificates/cnsp.jpg"},
        { title: "Certified Cyber Security Analyst (C3SA)", issuer: "CyberWarFare Labs", id: "2e0359d2", date: "April 2024", link:"#", imagePath: "./certificates/c3sa.jpg"},
        { title: "Gajabaar Infosecurity Mentorship", issuer: "Gajabaar", id: "GB2023001", date: "April 2024",link: "#", imagePath: "./certificates/gajabaar.jpg"},
        { title: "Certified AppSec Practitioner ( CAP )", issuer: "The SecOps Group ( Creators of PentestingExams.com )", id: "7967136", date: "October 2023" , imagePath: "./certificates/cap.jpg"},
        { title: "AWS Academy Graduate - AWS Academy Cloud Foundations", issuer: "Amazon Web Services (AWS)", id: "", date: "August 2023", imagePath: "./certificates/aws.jpg"}
    ],
    experiences: [
        { title: "Software Engineer I ● Product Development", organization: "Smart Data Solutions", startDate: "July 2025", endDate: "Present", desc: "" },
        { title: "Full-stack Java Developer", organization: "Smart Data Solutions", startDate: "February 2025", endDate: "July 2025" ,desc :""},
        { title: "Java Software Engineer", organization: "UGRO Capital / Code Himalaya ", startDate: "June 2024", endDate: "February 2025", desc:""},
        { title: "Junior Java Developer", organization: "Code Himalaya Pvt. Ltd", startDate: "May 2024", endDate: "February 2025", desc:""},
        { title: "Java Developer Intern", organization: "Dakshya A.I", startDate: "July 2023", endDate: "October 2023", desc:""},

    ],
    education:[
        { title:"Bachelors ( Computer Engineering ) ", organization:"Tribhuvan University // IOE // WRC", status:"Deployed", batch:"2019-2024"},
        { title:"High School", organization:"Gandaki Boarding School ( GBS )", status:"Deployed", batch:"2017-2019"},
        { title:"School", organization:"Pokhara Academy", status:"Deployed", batch:"2003-2016"}
   
    ]
};

/**
 * 2. KERNEL MATRIX EFFECT
 */
const initKernelRain = () => {
    const canvas = document.getElementById('kernel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let width, height, columns, drops;
    const setup = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / CONFIG.FONT_SIZE);
        drops = new Int32Array(columns).fill(1);
    };
    const draw = () => {
        ctx.fillStyle = CONFIG.MATRIX_BG;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = CONFIG.MATRIX_COLOR;
        ctx.font = `${CONFIG.FONT_SIZE - 2}px monospace`;
        for (let i = 0; i < drops.length; i++) {
            const char = Math.random() > 0.5 ? "0" : "1";
            ctx.fillText(char, i * CONFIG.FONT_SIZE, drops[i] * CONFIG.FONT_SIZE);
            if (drops[i] * CONFIG.FONT_SIZE > height && Math.random() > 0.98) drops[i] = 0;
            drops[i]++;
        }
    };
    let lastTime = 0;
    const animate = (time) => {
        if (time - lastTime > CONFIG.INTERVAL) { draw(); lastTime = time; }
        requestAnimationFrame(animate);
    };
    window.addEventListener('resize', setup);
    setup();
    requestAnimationFrame(animate);
};

/**
 * 3. UI RENDERING (Hierarchy Preserved)
 */
const renderUI = () => {
    const circuitSvg = `<svg class="circuit-container" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"><g class="circuit-path" fill="none" stroke="currentColor"><path d="M10 10 H60 L80 30 H120 L140 10 H190 M10 140 H70 L90 120 H110 L130 140 H190 M30 0 V40 L50 60 V90 L30 110 V150 M170 0 V40 L150 60 V90 L170 110 V150" /></g></svg>`;

    document.getElementById('project-rack').innerHTML = DATA.projects.map(p => `
        <div class="module-card reveal">
            ${circuitSvg}
            <div class="relative z-10 flex justify-between items-start">
                <div>
                    <p class="mono text-[0.75rem] text-[#FA927F] font-bold uppercase opacity-60">${p.type}</p>
                    <h3 class="text-xl font-bold text-white mt-1 italic">${p.name}</h3>
                </div>
                <a href="${p.github}" target="_blank"><i data-lucide="github" class="github-icon-large"></i></a>
            </div>
            <p class="relative z-10 project-desc mt-4 mb-4 text-justify line-clamp-3">${p.desc}</p>
            <div class="relative z-10 border-t border-white/5 pt-3">
                <span class="mono text-[0.75rem] text-[#fdb3a7] font-bold uppercase">${p.tech}</span>
            </div>
        </div>`).join('');

    document.getElementById('cert-grid').innerHTML = DATA.certs.map(c => `
        <div class="cert-card reveal group" onclick="openModal('${c.imagePath}')">
            <div class="flex justify-between items-start mb-6">
                <div class="p-2 bg-[#FA927F]/5 border border-[#FA927F]/10 rounded-sm"><i data-lucide="shield-check" class="text-[#FA927F] w-4 h-4"></i></div>
                <span class="mono text-[0.6rem] text-slate-500 font-bold">${c.id}</span>
            </div>
            <h4 class="text-white font-bold text-sm mb-2 uppercase group-hover:text-[#FA927F] transition-colors">${c.title}</h4>
            <div class="space-y-1 mb-6">
                <p class="mono text-[0.8rem] text-slate-400 font-medium">${c.issuer}</p>
                <p class="mono text-[0.75rem] text-slate-600 italic">${c.date}</p>
            </div>
            <div class="flex items-center gap-2 text-[0.75rem] text-[#fdb3a7] mono font-black tracking-widest opacity-60">
                <i data-lucide="eye" class="w-3 h-3"></i> VERIFY_CREDENTIAL
            </div>
        </div>`).join('');

    document.getElementById('exp').innerHTML = DATA.experiences.map((ex, i) => `
        <div class="reveal relative pl-16 pb-12 border-l border-white/5 last:border-0">
            <div class="absolute -left-[1px] top-0 w-px h-24 bg-gradient-to-b from-[#FA927F] to-transparent"></div>
            <div class="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#FA927F] shadow-[0_0_12px_#FA927F]"></div>
            <span class="absolute left-6 top-0 log-entry-number mono">${String(i).padStart(2, '0')}</span>
            <div class="pt-8">
                <h4 class="text-2xl font-black text-white uppercase tracking-tighter mb-1">${ex.title}</h4>
                <p class="text-[#FA927F] mono text-sm font-bold mb-3 uppercase tracking-widest">${ex.organization}</p>
                <p class="text-slate-500 mono text-[0.8rem] mb-4 font-bold tracking-tight">[ ${ex.startDate} — ${ex.endDate} ]</p>
                <p class="exp-desc max-w-2xl">${ex.desc}</p>
            </div>
        </div>`).join('');

    document.getElementById('education-card').innerHTML = DATA.education.map(edu => `
        <div class="reveal p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group hover:border-[#FA927F]/30 transition-all duration-500">
            <div class="flex items-center gap-5 mb-6">
                <div class="h-10 w-1 bg-[#FA927F] shadow-[0_0_0.75rem_rgba(250,146,127,0.5)]"></div>
                <div>
                    <h3 class="text-white font-bold text-lg uppercase tracking-tight">${edu.title}</h3>
                    <p class="mono text-xs text-[#fdb3a7] font-bold opacity-80 uppercase">${edu.organization}</p>
                </div>
            </div>
            <div class="flex gap-6 mono text-[0.75rem] text-slate-500 font-bold tracking-widest uppercase">
                <span>STATUS: ${edu.status}</span>
                <span>BATCH: ${edu.batch}</span>
            </div>
        </div>`).join('');

    lucide.createIcons();
    initRevealObserver();
};

/**
 * 4. HAMBURGER MENU FIX & MODAL
 */
/**
 * 4. HAMBURGER MENU FIX & MODAL
 */
const initInteractions = () => {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navLinks.classList.toggle('mobile-active');
            
            if (isActive) {
                navLinks.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; 
            } else {
                navLinks.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(l => {
            l.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                navLinks.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu if clicking outside the nav area
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('mobile-active') && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                navLinks.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    const modalHtml = `<div id="cert-modal" onclick="closeModal()"><div class="modal-content" onclick="event.stopPropagation()"><span class="modal-close mono">[ CLICK_OUTSIDE_TO_EXIT ]</span><img id="modal-img" src="" alt="Certificate" class="block max-w-full max-h-[80vh] object-contain"></div></div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

// Global Helpers
window.openModal = (imgSrc) => {
    const modal = document.getElementById('cert-modal');
    document.getElementById('modal-img').src = imgSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
};
window.closeModal = () => {
    document.getElementById('cert-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
};

const initRevealObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = "1"; entry.target.style.transform = "translateY(0)"; } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = "0"; el.style.transform = "translateY(30px)"; el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', () => { initKernelRain(); initInteractions(); renderUI(); });