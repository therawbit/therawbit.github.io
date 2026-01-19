/**
 * 1. CONFIG & DATA
 */
const CONFIG = Object.freeze({
    FONT_SIZE: 14,
    INTERVAL: 60, // Slightly slower for that retro terminal feel
    MATRIX_COLOR: "#0891b2",
    MATRIX_BG: "rgba(1, 2, 4, 0.15)",
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
 * 2. FLICKER-FREE MATRIX
 */
const initKernelRain = () => {
    const canvas = document.getElementById('kernel-canvas');
    if (!canvas) return;

    // Use alpha: false to prevent background bleeding flickering
    const ctx = canvas.getContext('2d', { alpha: false });
    let width, height, columns, drops;

    const setup = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / CONFIG.FONT_SIZE);
        drops = new Int32Array(columns).fill(1);

        // Initial black fill to prevent white flash on load
        ctx.fillStyle = "#010204";
        ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
        ctx.fillStyle = CONFIG.MATRIX_BG;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = CONFIG.MATRIX_COLOR;
        ctx.font = `${CONFIG.FONT_SIZE - 2}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = Math.random() > 0.5 ? "0" : "1";
            ctx.fillText(char, i * CONFIG.FONT_SIZE, drops[i] * CONFIG.FONT_SIZE);

            if (drops[i] * CONFIG.FONT_SIZE > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };

    let lastTime = 0;
    const animate = (time) => {
        if (time - lastTime > CONFIG.INTERVAL) {
            draw();
            lastTime = time;
        }
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', setup, { passive: true });
    setup();
    requestAnimationFrame(animate);
};

/**
 * 3. UI RENDERING (Optimized for no-flicker)
 */
const renderUI = () => {
    const rack = document.getElementById('project-rack');
    const certGrid = document.getElementById('cert-grid');
     const exps = document.getElementById('exp');
     const edu = document.getElementById('education-card');
    const circuitSvg = `
        <svg class="circuit-container" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <g class="circuit-path" fill="none" stroke="currentColor">
                <path d="M10 10 H60 L80 30 H120 L140 10 H190 M10 140 H70 L90 120 H110 L130 140 H190 M30 0 V40 L50 60 V90 L30 110 V150 M170 0 V40 L150 60 V90 L170 110 V150" />
            </g>
        </svg>`;


    // Generate HTML strings
    const projectsHTML = DATA.projects.map(p => `
        <div class="module-card">
            ${circuitSvg}
            <div class="relative z-10 flex justify-between items-start">
                <div class="w-full"> 
                    <p class="text-center mono text-[10px] text-cyan-600 tracking-[0.2em] uppercase font-bold">${p.type}</p>
                    <h3 class="text-center w-full text-xl font-black text-white italic group-hover:text-cyan-400 mt-1">${p.name}</h3>
                </div>
                <a href="${p.github}" target="_blank"><i data-lucide="github" class="github-icon-large"></i></a>
            </div>
            <div class="relative z-10 mt-4">
                <p class="text-center text-slate-500 text-[12px] leading-relaxed mb-3 text-justify">${p.desc}</p>
                <div class="flex justify-between items-center border-t border-cyan-900/20 pt-2">
                    <span class="mono text-[10px] text-cyan-700 font-bold tracking-widest">${p.tech}</span>
                </div>
            </div>
        </div>`).join('');

const certsHTML = DATA.certs.map(c => `
    <div class="cert-card group border border-cyan-500 p-4 hover:bg-cyan-500/5 cursor-pointer" onclick="openModal('${c.imagePath}')">
        <div class="flex justify-between items-start mb-6">
            <i data-lucide="shield-check" class="text-cyan-500 w-5 h-5"></i>
            <span class="mono text-[10px] text-slate-300">${c.id}</span>
        </div>
        <h4 class="text-white font-bold text-sm tracking-tight mb-1 uppercase group-hover:text-cyan-400">${c.title}</h4>
        <p class="mono text-[12px] text-slate-300 mb-2">${c.issuer}</p>
        <p class="mono text-[12px] text-slate-300 mb-6">${c.date}</p>  
        <div class="flex items-center gap-2 text-[10px] text-cyan-400/50 mono font-bold">
            <i data-lucide="eye" class="w-3 h-3"></i> CLICK_TO_VIEW_CREDENTIAL
        </div>
    </div>`).join('');

    const experienceHTML = DATA.experiences.map((ex, i) => {return`
        <div class="log-entry relative pl-12">
            <div class="absolute left-0 top-0 text-cyan-900 mono text-xl font-bold italic">${i}</div>
            <div class="absolute left-4 top-2 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent">
            </div>
            <h4 class="text-2xl font-bold text-white uppercase tracking-tighter">${ex.title}</h4>
            <h2 class="text-cyan-500 text-l mono"> ${ex.organization}</h2>
            <p class="text-slate-400 mono text-[12px] mb-4">${ex.startDate} - ${ex.endDate}</p>
            <p class="text-slate-600 max-w-xl">${ex.desc}</p>
        </div>`
    }).join('');

    const educationHTML = DATA.education.map((edu, i) => {return `
        <div class="edu-node p-8 border border-cyan-900/30 bg-cyan-950/5 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                        <i data-lucide="graduation-cap" class="w-24 h-24"></i>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <div class="h-12 w-1 bg-cyan-500"></div>
                        <div>
                            <h3 class="text-white font-black text-xl tracking-tighter">${edu.title}</h3>
                            <p class="momnt no text-l text-cyan-600">${edu.organization}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 mono text-[11px] text-slate-400">
                        <span>[ STATUS: ${edu.status} ]</span>
                        <span>[ BATCH: ${edu.batch} ]</span>
                    </div>
                </div>
        `
    }).join('');
        
    

   
    

    // Batch DOM updates using RequestAnimationFrame to prevent layout thrashing
    requestAnimationFrame(() => {
        if (rack) rack.innerHTML = projectsHTML;
        if (certGrid) certGrid.innerHTML = certsHTML;
        exps.innerHTML = experienceHTML;
        edu.innerHTML = educationHTML;
        lucide.createIcons();
    });
};
// Mobile Menu Toggle logic
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    
    // Change icon between Menu and X if you want
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons(); // Re-render Lucide icons
});

// Close menu when a link is clicked
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navLinks.classList.add('hidden');
            navLinks.classList.remove('flex');
            menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
});

/* --- MODAL LOGIC --- */
// 1. Create Modal Element once
const modalHtml = `
    <div id="cert-modal" onclick="closeModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
            <span class="modal-close mono">[ ESC / CLICK OUTSIDE TO CLOSE ]</span>
            <img id="modal-img" src="" alt="Certificate" style="display: block; max-width: 100%; max-height: 80vh;">
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHtml);

// 2. Open/Close Functions
window.openModal = (imgSrc) => {
    if(!imgSrc || imgSrc === 'undefined') return;
    const modal = document.getElementById('cert-modal');
    const img = document.getElementById('modal-img');
        img.onload = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };
    
    img.src = imgSrc;
};

window.closeModal = () => {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });
// Start everything immediately
initKernelRain();
renderUI();