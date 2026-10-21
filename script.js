(() => {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const isMobile = () => matchMedia('(max-width: 760px)').matches;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ------------------------------------------------------------------
    // Content
    // ------------------------------------------------------------------
    const DATA = {
        name: 'Sriram Anumandla',
        role: 'Software Development Engineer · AI Engineer',
        location: 'Sunnyvale, CA',
        links: {
            github: 'https://github.com/asriram07',
            linkedin: 'https://www.linkedin.com/in/sriram-anumandla/',
            classic: 'https://asriram07.github.io/MyPortfolio/',
        },
        experience: [
            {
                id: 'amazon',
                company: 'Amazon',
                role: 'Software Development Engineer',
                date: 'Sep 2025 – Present',
                location: 'Sunnyvale, CA',
                bullets: [
                    'Built <span class="hl">COTA (Code-Optimized Test Analyzer)</span> leveraging LLMs, Decision Trees, AWS SQS and RAG on Kendra to analyze code diffs and predict relevant test suites via call graph analysis; adopted by <span class="hl">400+ engineers</span>, saving <span class="hl">2+ engineering days per release</span>.',
                    'Developing a distributed <span class="hl">multi-agent ML infrastructure</span> on PyTorch, AWS SageMaker, DynamoDB, and AWS Bedrock, to host specialized AI agents (CTS validation and Code Upleveling) for the FireOS ecosystem with per-service auto-scaling.',
                    'Optimized FireOS stability by diagnosing high-concurrency race conditions and IPC bottlenecks using low-level debugging tools, reducing system-level ANRs and crashes across the FireTV device fleet by <span class="hl">15%</span>.',
                ],
                tags: ['LLMs', 'RAG', 'AWS Bedrock', 'SageMaker', 'PyTorch', 'DynamoDB', 'SQS', 'Kendra'],
            },
            {
                id: 'hirebest',
                company: 'HireBest',
                companyFull: 'HireBest (AiAssitant.co)',
                role: 'AI Engineer Intern',
                date: 'Jun 2024 – Aug 2024',
                location: 'San Jose, CA',
                bullets: [
                    'Built a distributed <span class="hl">Voice AI interview platform</span> with LLM-driven agents using Python, PyTorch, LangGraph, VectorDB deployed on AWS ECS, handling <span class="hl">200+ concurrent sessions</span> and reducing recruiter screening time from 30 minutes to <span class="hl">under 90 seconds</span>.',
                    'Replaced HTTP polling with a WebSocket architecture (Socket.io), cutting end-to-end voice latency by <span class="hl">40%</span> and enabling real-time bidirectional communication for human-like conversational pacing with <span class="hl">sub-250ms</span> response times.',
                    'Developed a recruiter platform with React frontend, REST APIs, Docker and PostgreSQL backend for candidate management, interview scheduling, and storing transcripts, audio metadata, and AI-generated evaluations on AWS S3.',
                ],
                tags: ['Python', 'LangGraph', 'VectorDB', 'WebSockets', 'React', 'PostgreSQL', 'Docker', 'AWS ECS'],
            },
            {
                id: 'servicenow',
                company: 'ServiceNow',
                role: 'Associate Software Development Engineer',
                date: 'Sep 2022 – Aug 2023',
                location: 'Hyderabad, TS',
                bullets: [
                    'Engineered a scalable ServiceNow <span class="hl">Microsoft 365 integration</span> with OAuth 2.0 and bidirectional user data sync, connecting instances across multiple Microsoft tenants using JavaScript, REST APIs, SQL and proxy servers.',
                    'Developed a high-throughput batch synchronization pipeline to import Microsoft Teams conversations into associated ServiceNow tickets, handling <span class="hl">500+ concurrent sync jobs</span> across <span class="hl">300+ enterprise deployments</span>.',
                    'Built VA Push Notifications delivering real-time ServiceNow approval requests on an event-driven microservices architecture with API pagination, and wrote comprehensive end-to-end test suites ensuring reliable enterprise deployments.',
                ],
                tags: ['JavaScript', 'OAuth 2.0', 'REST APIs', 'SQL', 'Microservices', 'Event-driven'],
            },
        ],
        projects: [
            {
                id: 'moe-qa',
                title: 'Mixture-of-Experts QA System',
                category: 'AI & Machine Learning',
                glyph: 'MoE',
                bullets: [
                    'Trained 6 Small Language Models with PyTorch and Hugging Face Transformers on distinct domains, plus a gating network that dynamically routes queries to experts — <span class="hl">90%+ accuracy</span> in tests.',
                    'Engineered a fast model-serving pipeline via FastAPI, Docker and Nginx with a low-latency async inference layer, deployed on AWS EC2.',
                ],
                tech: ['PyTorch', 'FastAPI', 'Docker', 'AWS EC2', 'Hugging Face'],
            },
            {
                id: 'real-estate',
                title: 'Real Estate Enquiry Platform',
                category: 'Full-Stack & Cloud',
                glyph: 'RE',
                bullets: [
                    'Full-stack platform for property search by user location and geo-spatial distance using React, Node.js and Express.',
                    'LLM-powered natural-language query interface translating conversational queries into structured Elasticsearch filters. Deployed on AWS EC2 with S3 for images.',
                ],
                tech: ['React', 'Node.js', 'Express', 'Elasticsearch', 'AWS S3'],
            },
            {
                id: 'homelab',
                title: 'Self-Hosted Cloud Infrastructure',
                category: 'DevOps & Infrastructure',
                glyph: 'OPS',
                bullets: [
                    'Repurposed a physical machine as a self-hosted Linux cloud server with Docker, an Nginx reverse proxy and SSH tunneling for secure remote access.',
                    'CI/CD pipelines for automatic deployment, Docker Compose orchestration, port forwarding and dynamic DNS.',
                ],
                tech: ['Linux', 'Docker Compose', 'Nginx', 'CI/CD'],
            },
        ],
        skills: [
            { group: 'languages', items: ['C++', 'Java 8', 'Python', 'Go', 'TypeScript', 'JavaScript', 'HTML/CSS', 'SQL'] },
            { group: 'frameworks', items: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'PyTorch', 'TensorFlow', 'LangGraph', 'Scikit-learn'] },
            { group: 'data-and-cloud', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Pinecone', 'VectorDB', 'AWS EC2', 'AWS RDS', 'SageMaker', 'Bedrock', 'Gemini Vertex'] },
            { group: 'tools-and-concepts', items: ['Docker', 'Kubernetes', 'Jenkins', 'Kafka', 'Distributed Systems', 'Microservices', 'Agent Orchestration', 'GenAI'] },
        ],
        education: {
            degree: 'Master of Science in Computer Science',
            school: 'Florida State University',
            date: 'Sep 2023 – May 2025',
            gpa: '3.8',
        },
    };

    const plain = (html) => html.replace(/<[^>]+>/g, '');

    // ------------------------------------------------------------------
    // Apps
    // ------------------------------------------------------------------
    const APPS = {
        about: { title: 'about_me.app', label: 'About', glyph: 'SA', g: ['#7cf5c4', '#3aa0ff'], w: 580, h: 560, render: renderAbout },
        experience: { title: 'experience — 3 roles', label: 'Experience', glyph: 'XP', g: ['#8b7bff', '#ff6b9e'], w: 780, h: 540, pad: false, render: renderExperience },
        projects: { title: '~/projects', label: 'Projects', glyph: '{ }', g: ['#ffb86b', '#ff6b9e'], w: 860, h: 560, render: renderProjects },
        skills: { title: 'skills.pkg', label: 'Skills', glyph: '</>', g: ['#6bc8ff', '#8b7bff'], w: 640, h: 520, render: renderSkills },
        education: { title: 'education', label: 'Education', glyph: 'MS', g: ['#f5e663', '#7cf5c4'], w: 540, h: 290, render: renderEducation },
        resume: { title: 'resume.pdf — recruiter mode', label: 'Résumé', glyph: 'CV', g: ['#ffffff', '#c9ccd6'], w: 760, h: 640, pad: false, render: renderResume },
        terminal: { title: 'sriram@os: ~ — zsh', label: 'Terminal', glyph: '>_', dark: true, w: 620, h: 430, pad: false, render: renderTerminal },
        contact: { title: 'contact', label: 'Contact', glyph: '@', g: ['#ff6b9e', '#ffb86b'], w: 460, h: 380, render: renderContact },
    };
    const APP_ORDER = ['about', 'experience', 'projects', 'skills', 'education', 'resume', 'terminal', 'contact'];

    const iconHTML = (app, extra = '') =>
        `<span class="app-icon ${app.dark ? 'dark' : ''} ${extra}" style="${app.g ? `--g1:${app.g[0]};--g2:${app.g[1]}` : ''}">${esc(app.glyph)}</span>`;

    function renderAbout(body) {
        body.innerHTML = `
        <div class="about">
            <div class="about-head">
                <div class="avatar">SA</div>
                <div>
                    <h1 class="glitch" data-text="${DATA.name}">${DATA.name}</h1>
                    <p class="role">SDE @ Amazon · AI Engineer</p>
                    <p class="loc">${DATA.location} · <span class="status-dot"></span> open to opportunities</p>
                </div>
            </div>
            <p class="about-lead">
                I build <span class="hl">scalable distributed systems</span> and <span class="hl">intelligent AI solutions</span> —
                from LLM-powered developer tooling used by hundreds of Amazon engineers to real-time voice AI
                handling hundreds of concurrent sessions. MS CS from Florida State.
            </p>
            <div class="stats">
                <div class="stat"><b data-count="400" data-suffix="+">0</b><span>engineers using COTA at Amazon</span></div>
                <div class="stat"><b data-count="15" data-suffix="%">0</b><span>fewer FireTV ANRs &amp; crashes</span></div>
                <div class="stat"><b data-count="200" data-suffix="+">0</b><span>concurrent voice-AI sessions</span></div>
                <div class="stat"><b data-count="40" data-suffix="%">0</b><span>lower end-to-end voice latency</span></div>
            </div>
            <div class="about-actions">
                <button class="btn primary" data-open="experience">Experience →</button>
                <button class="btn" data-open="projects">Projects</button>
                <button class="btn" data-open="resume">Recruiter mode (CV)</button>
            </div>
            <p class="tip">psst — open the <a data-open="terminal">terminal</a> and type <code>help</code>, or hit <kbd>${isMac ? '⌘' : 'Ctrl'} K</kbd>.</p>
        </div>`;
        $$('[data-count]', body).forEach(countUp);
    }

    function countUp(el) {
        const end = +el.dataset.count;
        const suf = el.dataset.suffix || '';
        if (reduced) {
            el.textContent = end + suf;
            return;
        }
        const t0 = performance.now();
        const dur = 1300;
        const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    function renderExperience(body) {
        body.innerHTML = `
        <div class="xp">
            <aside class="xp-list">
                ${DATA.experience.map((x, i) => `
                    <button class="xp-tab" data-i="${i}">
                        <span class="xp-co">${x.company}</span>
                        <span class="xp-date">${x.date}</span>
                    </button>`).join('')}
            </aside>
            <div class="xp-detail"></div>
        </div>`;
        const detail = $('.xp-detail', body);
        const show = (i) => {
            const x = DATA.experience[i];
            detail.innerHTML = `
                <div class="eyebrow">${x.date}</div>
                <h2>${x.role}</h2>
                <p class="xp-meta"><b>${x.companyFull || x.company}</b> · ${x.location}</p>
                <ul class="bullets">${x.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
                <ul class="tags">${x.tags.map((t) => `<li class="tag">${t}</li>`).join('')}</ul>`;
            $$('.xp-tab', body).forEach((b, j) => b.classList.toggle('active', i === j));
            detail.scrollTop = 0;
            detail.classList.remove('fade');
            void detail.offsetWidth;
            detail.classList.add('fade');
        };
        $$('.xp-tab', body).forEach((b) => b.addEventListener('click', () => show(+b.dataset.i)));
        show(0);
        return {
            select(id) {
                const i = DATA.experience.findIndex((x) => x.id === id);
                if (i >= 0) show(i);
            },
        };
    }

    function renderProjects(body) {
        body.innerHTML = `
        <div class="finder-bar"><span class="path">~/projects</span><span>${DATA.projects.length} items</span></div>
        <div class="proj-grid">
            ${DATA.projects.map((p, i) => `
            <article class="proj">
                <div class="proj-head">
                    <span class="app-icon" style="--g1:${['#ffb86b', '#6bc8ff', '#7cf5c4'][i % 3]};--g2:${['#ff6b9e', '#8b7bff', '#3aa0ff'][i % 3]}">${p.glyph}</span>
                    <div><div class="eyebrow">${p.category}</div><h3>${p.title}</h3></div>
                </div>
                <ul class="bullets">${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
                <ul class="tags">${p.tech.map((t) => `<li class="tag">${t}</li>`).join('')}</ul>
            </article>`).join('')}
        </div>`;
        if (reduced) return;
        $$('.proj', body).forEach((card) => {
            card.addEventListener('pointermove', (e) => {
                if (e.pointerType !== 'mouse') return;
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                card.style.setProperty('--ry', `${(px - 0.5) * 8}deg`);
                card.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
                card.style.setProperty('--px', `${px * 100}%`);
                card.style.setProperty('--py', `${py * 100}%`);
            });
            card.addEventListener('pointerleave', () => {
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
            });
        });
    }

    function renderSkills(body) {
        const total = DATA.skills.reduce((n, g) => n + g.items.length, 0);
        body.innerHTML = `
        <input class="skill-search" type="text" placeholder="grep skills… (try: aws, py, docker)" aria-label="Filter skills">
        ${DATA.skills.map((g) => `
            <div class="skill-group">
                <h3>${g.group}/ <span>(${g.items.length})</span></h3>
                <ul class="tags">${g.items.map((s) => `<li class="tag">${s}</li>`).join('')}</ul>
            </div>`).join('')}
        <p class="tip">${total} packages installed · 0 vulnerabilities</p>`;
        const input = $('.skill-search', body);
        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            $$('.tag', body).forEach((t) => t.classList.toggle('dim', !!q && !t.textContent.toLowerCase().includes(q)));
        });
    }

    function renderEducation(body) {
        const e = DATA.education;
        body.innerHTML = `
        <div class="edu">
            <div>
                <div class="eyebrow">${e.date}</div>
                <h2>${e.degree}</h2>
                <p class="school">${e.school}</p>
            </div>
            <div class="gpa"><b>${e.gpa}</b><span>GPA / 4.0</span></div>
        </div>`;
    }

    function renderContact(body) {
        body.innerHTML = `
        <div class="eyebrow">say hi</div>
        <p class="about-lead" style="margin-top:8px">Hiring for backend, distributed systems or applied-AI roles? I'd love to chat.</p>
        <div class="contact-list">
            <a class="contact-link" href="${DATA.links.linkedin}" target="_blank" rel="noopener noreferrer">
                <span class="app-icon" style="--g1:#6bc8ff;--g2:#3a6bff">in</span>
                <div>LinkedIn<small>/in/sriram-anumandla</small></div><span class="arrow">↗</span>
            </a>
            <a class="contact-link" href="${DATA.links.github}" target="_blank" rel="noopener noreferrer">
                <span class="app-icon dark">gh</span>
                <div>GitHub<small>@asriram07</small></div><span class="arrow">↗</span>
            </a>
            <a class="contact-link" href="${DATA.links.classic}">
                <span class="app-icon" style="--g1:#c9ccd6;--g2:#8a90a3">v1</span>
                <div>Classic portfolio<small>the calmer version</small></div><span class="arrow">↗</span>
            </a>
        </div>`;
    }

    function resumeHTML() {
        const d = DATA;
        return `
        <article class="paper">
            <h1>${d.name}</h1>
            <p class="p-sub">${d.role} · ${d.location}</p>
            <p class="p-links">
                <a href="${d.links.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/in/sriram-anumandla</a> ·
                <a href="${d.links.github}" target="_blank" rel="noopener noreferrer">github.com/asriram07</a>
            </p>
            <h2>Experience</h2>
            ${d.experience.map((x) => `
            <div class="p-item">
                <div class="p-row"><b>${x.role}</b><span>${x.date}</span></div>
                <div class="p-org">${x.companyFull || x.company} — ${x.location}</div>
                <ul>${x.bullets.map((b) => `<li>${plain(b)}</li>`).join('')}</ul>
            </div>`).join('')}
            <h2>Projects</h2>
            ${d.projects.map((p) => `
            <div class="p-item">
                <div class="p-row"><b>${p.title}</b><span>${p.tech.join(', ')}</span></div>
                <ul>${p.bullets.map((b) => `<li>${plain(b)}</li>`).join('')}</ul>
            </div>`).join('')}
            <h2>Skills</h2>
            <div class="p-skills">
                ${d.skills.map((g) => `<div><b>${g.group.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}:</b> ${g.items.join(', ')}</div>`).join('')}
            </div>
            <h2>Education</h2>
            <div class="p-item">
                <div class="p-row"><b>${d.education.degree}</b><span>${d.education.date}</span></div>
                <div class="p-org">${d.education.school} — GPA ${d.education.gpa}/4</div>
            </div>
        </article>`;
    }

    function renderResume(body) {
        body.innerHTML = `
        <div class="paper-wrap">
            <div class="paper-tools">
                <span>The no-nonsense version. Everything on one page.</span>
                <button class="btn primary" data-action="print">Save as PDF</button>
            </div>
            ${resumeHTML()}
        </div>`;
        $('[data-action="print"]', body).addEventListener('click', () => {
            $('#print-root').innerHTML = resumeHTML();
            window.print();
        });
    }

    // ------------------------------------------------------------------
    // Terminal
    // ------------------------------------------------------------------
    const file = (content) => ({ type: 'file', content });
    const dir = (children) => ({ type: 'dir', children });

    const xpText = (x) =>
        `<span class="t-acc">${x.role}</span> @ <b>${x.companyFull || x.company}</b>  <span class="t-mut">${x.date} · ${x.location}</span>\n` +
        x.bullets.map((b) => `  <span class="t-acc">▸</span> ${plain(b)}`).join('\n') +
        `\n  <span class="t-pur">${x.tags.join(' · ')}</span>`;

    const projText = (p) =>
        `<span class="t-warn"># ${p.title}</span>  <span class="t-mut">(${p.category})</span>\n` +
        p.bullets.map((b) => `  <span class="t-acc">▸</span> ${plain(b)}`).join('\n') +
        `\n  <span class="t-pur">${p.tech.join(' · ')}</span>`;

    const FS = dir({
        'about.txt': file(() => `${DATA.name} — ${DATA.role}\nBased in ${DATA.location}. Builds distributed systems and AI that ships.\nCurrently: SDE @ Amazon (FireOS, multi-agent ML infra, COTA).`),
        experience: dir(Object.fromEntries(DATA.experience.map((x) => [`${x.id}.txt`, file(() => xpText(x))]))),
        projects: dir(Object.fromEntries(DATA.projects.map((p) => [`${p.id}.md`, file(() => projText(p))]))),
        'skills.txt': file(() => DATA.skills.map((g) => `<span class="t-blue">${g.group.padEnd(20)}</span>${g.items.join(', ')}`).join('\n')),
        'education.txt': file(() => `${DATA.education.degree}\n${DATA.education.school} · ${DATA.education.date} · GPA ${DATA.education.gpa}/4`),
        'contact.txt': file(() => `LinkedIn  <a class="t-link" href="${DATA.links.linkedin}" target="_blank" rel="noopener noreferrer">${DATA.links.linkedin}</a>\nGitHub    <a class="t-link" href="${DATA.links.github}" target="_blank" rel="noopener noreferrer">${DATA.links.github}</a>`),
        '.secret': file(() => `<span class="t-warn">You found it.</span> Recruiters who read hidden files get a priority reply.\nTry: <span class="t-cmd" data-run="sudo hire-me">sudo hire-me</span>`),
    });

    function resolve(path, cwd) {
        const parts = path.startsWith('~') || path.startsWith('/') ? [] : [...cwd];
        path.replace(/^~\/?|^\//, '').split('/').filter(Boolean).forEach((p) => {
            if (p === '.') return;
            if (p === '..') parts.pop();
            else parts.push(p);
        });
        let node = FS;
        for (const p of parts) {
            if (node.type !== 'dir' || !node.children[p]) return null;
            node = node.children[p];
        }
        return { node, parts };
    }

    const THEMES = [
        ['#7cf5c4', '#8b7bff', '#ff6b9e'],
        ['#ff6b9e', '#ffb86b', '#8b7bff'],
        ['#6bc8ff', '#b18cff', '#7cf5c4'],
        ['#f5e663', '#ff7a59', '#6bc8ff'],
    ];
    let themeIdx = 0;
    function cycleTheme() {
        themeIdx = (themeIdx + 1) % THEMES.length;
        const [a, b, c] = THEMES[themeIdx];
        const root = document.documentElement.style;
        root.setProperty('--accent', a);
        root.setProperty('--accent2', b);
        root.setProperty('--pink', c);
        return themeIdx;
    }

    function renderTerminal(body) {
        body.innerHTML = `
        <div class="term">
            <div class="term-out" aria-live="polite"></div>
            <form class="term-line">
                <label class="prompt" for=""></label>
                <input class="term-input" aria-label="Terminal input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
            </form>
        </div>`;
        const term = $('.term', body);
        const out = $('.term-out', body);
        const form = $('.term-line', body);
        const input = $('.term-input', body);
        const promptEl = $('.prompt', body);
        let cwd = [];
        const hist = [];
        let hi = 0;

        const promptStr = () => `<span class="t-acc">sriram@os</span>:<span class="t-blue">~${cwd.length ? '/' + cwd.join('/') : ''}</span>$`;
        const setPrompt = () => (promptEl.innerHTML = promptStr());
        const print = (html = '') => {
            const row = document.createElement('div');
            row.className = 't-row';
            row.innerHTML = html;
            out.appendChild(row);
        };
        const scroll = () => (term.scrollTop = term.scrollHeight);
        const cmd = (c) => `<span class="t-cmd" data-run="${c}">${c}</span>`;

        const neofetch = () => {
            const logo = [
                '      ◆◆◆◆◆      ',
                '    ◆◆     ◆◆    ',
                '   ◆◆  S A  ◆◆   ',
                '    ◆◆     ◆◆    ',
                '      ◆◆◆◆◆      ',
            ].join('\n');
            const info = [
                `<span class="t-acc">sriram</span>@<span class="t-acc">os</span>`,
                '<span class="t-mut">-----------------</span>',
                `<span class="t-blue">OS</span>        SriramOS 2.0 (portfolio edition)`,
                `<span class="t-blue">Host</span>      Amazon · ${DATA.location}`,
                `<span class="t-blue">Role</span>      Software Development Engineer`,
                `<span class="t-blue">Uptime</span>    shipping code since 2022`,
                `<span class="t-blue">Shell</span>     zsh + LLM agents`,
                `<span class="t-blue">Langs</span>     C++ · Java · Python · Go · TypeScript`,
                `<span class="t-blue">Cloud</span>     AWS (EC2, RDS, SageMaker, Bedrock)`,
                `<span class="t-blue">Edu</span>       MS CS @ Florida State · GPA ${DATA.education.gpa}`,
                `<span class="swatches">${['--accent', '--accent2', '--pink', '--warn', '--blue'].map((v) => `<i style="background:var(${v})"></i>`).join('')}</span>`,
            ].join('\n');
            print(`<div class="neofetch"><pre>${logo}</pre><div>${info}</div></div>`);
        };

        const COMMANDS = {
            help: () => {
                const rows = [
                    ['whoami', 'who is this guy'],
                    ['neofetch', 'system info, but make it a résumé'],
                    ['experience', 'work history (also: cat experience/amazon.txt)'],
                    ['projects', 'things I built'],
                    ['skills', 'the tech stack'],
                    ['education', 'degrees'],
                    ['contact', 'how to reach me'],
                    ['resume', 'open the recruiter-friendly CV'],
                    ['ls · cd · cat · pwd', 'poke around the filesystem'],
                    ['open &lt;app&gt;', 'open any window (about, projects, …)'],
                    ['theme', 'cycle the accent colors'],
                    ['clear', 'clear the screen'],
                ];
                print(rows.map(([c, d]) => `  ${c.includes('&') || c.includes('·') ? `<span class="t-acc">${c}</span>` : cmd(c)}${' '.repeat(Math.max(2, 22 - plain(c).replace(/&lt;|&gt;/g, '.').length))}<span class="t-mut">${d}</span>`).join('\n'));
                print(`<span class="t-mut">  …and a few secrets. ↑/↓ history, Tab to autocomplete.</span>`);
            },
            whoami: () => print(`<span class="t-acc">${DATA.name}</span> — ${DATA.role}\nCurrently building LLM dev-tools &amp; multi-agent ML infra at Amazon. Previously voice AI @ HireBest, integrations @ ServiceNow.`),
            neofetch,
            about: () => {
                print(FS.children['about.txt'].content());
                openApp('about');
            },
            experience: (args) => {
                const x = DATA.experience.find((e) => e.id === (args[0] || '').toLowerCase());
                (x ? [x] : DATA.experience).forEach((e) => print(xpText(e) + '\n'));
                openApp('experience', x ? { select: x.id } : {});
            },
            projects: () => {
                DATA.projects.forEach((p) => print(projText(p) + '\n'));
                openApp('projects');
            },
            skills: () => {
                print(FS.children['skills.txt'].content());
                openApp('skills');
            },
            education: () => print(FS.children['education.txt'].content()),
            contact: () => {
                print(FS.children['contact.txt'].content());
                openApp('contact');
            },
            resume: () => {
                print('Opening recruiter mode… <span class="t-mut">(tip: "Save as PDF" is in the top right)</span>');
                openApp('resume');
            },
            ls: (args) => {
                const flags = args.filter((a) => a.startsWith('-')).join('');
                const target = args.find((a) => !a.startsWith('-')) || '.';
                const r = resolve(target, cwd);
                if (!r) return print(`<span class="t-err">ls: ${esc(target)}: No such file or directory</span>`);
                if (r.node.type === 'file') return print(esc(target));
                const names = Object.keys(r.node.children).filter((n) => flags.includes('a') || !n.startsWith('.'));
                print(names.map((n) => (r.node.children[n].type === 'dir' ? `<span class="t-blue">${n}/</span>` : n)).join('   '));
            },
            cd: (args) => {
                const r = resolve(args[0] || '~', cwd);
                if (!r) return print(`<span class="t-err">cd: no such file or directory: ${esc(args[0])}</span>`);
                if (r.node.type !== 'dir') return print(`<span class="t-err">cd: not a directory: ${esc(args[0])}</span>`);
                cwd = r.parts;
            },
            pwd: () => print(`/home/sriram${cwd.length ? '/' + cwd.join('/') : ''}`),
            cat: (args) => {
                if (!args.length) return print('<span class="t-err">cat: missing file operand</span>');
                args.forEach((a) => {
                    const r = resolve(a, cwd);
                    if (!r) print(`<span class="t-err">cat: ${esc(a)}: No such file or directory</span>`);
                    else if (r.node.type === 'dir') print(`<span class="t-err">cat: ${esc(a)}: Is a directory</span>`);
                    else print(r.node.content());
                });
            },
            open: (args) => {
                const id = (args[0] || '').toLowerCase().replace(/\.app$/, '');
                if (openApp(id)) print(`<span class="t-mut">opening ${esc(id)}…</span>`);
                else print(`<span class="t-err">open: unknown app "${esc(id)}".</span> try: ${APP_ORDER.join(', ')}`);
            },
            github: () => {
                window.open(DATA.links.github, '_blank', 'noopener');
                print('<span class="t-mut">opening github…</span>');
            },
            linkedin: () => {
                window.open(DATA.links.linkedin, '_blank', 'noopener');
                print('<span class="t-mut">opening linkedin…</span>');
            },
            theme: () => {
                const i = cycleTheme();
                print(`<span class="t-acc">theme ${i + 1}/${THEMES.length} applied.</span> run again for more.`);
            },
            matrix: () => {
                if (!matrix()) print('<span class="t-mut">reduced motion is on — skipping the matrix.</span>');
                else print('<span class="t-acc">wake up, recruiter…</span> <span class="t-mut">(click or press any key to exit)</span>');
            },
            sudo: (args) => {
                if (args.join(' ') === 'hire-me') {
                    print('<span class="t-acc">[sudo] permission granted ✔</span>\nInitiating hiring sequence… opening contact.');
                    openApp('contact');
                } else {
                    print(`<span class="t-err">sriram is not in the sudoers file.</span> This incident will be reported.\n<span class="t-mut">(hint: there is exactly one thing you can sudo)</span>`);
                }
            },
            rm: (args) => {
                if (args.includes('-rf')) print('<span class="t-err">nice try.</span> production is protected by code review.');
                else print('<span class="t-err">rm: permission denied</span>');
            },
            echo: (args) => print(esc(args.join(' '))),
            date: () => print(new Date().toString()),
            history: () => print(hist.map((h, i) => `  ${String(i + 1).padStart(3)}  ${esc(h)}`).join('\n')),
            clear: () => (out.innerHTML = ''),
            exit: () => closeApp('terminal'),
            vim: () => print('<span class="t-mut">you would never get out. trust me.</span>'),
            hello: () => print('hi there 👋 — type ' + cmd('whoami') + ' to get started.'),
        };
        COMMANDS.hi = COMMANDS.hello;
        COMMANDS.cv = COMMANDS.resume;
        COMMANDS.work = COMMANDS.experience;

        function run(line) {
            if (!line) return;
            const [name, ...args] = line.split(/\s+/);
            const fn = COMMANDS[name.toLowerCase()];
            if (fn) fn(args);
            else print(`<span class="t-err">zsh: command not found: ${esc(name)}</span>  <span class="t-mut">— try</span> ${cmd('help')}`);
        }

        function exec(line) {
            print(`${promptStr()} ${esc(line)}`);
            if (line.trim()) hist.push(line);
            hi = hist.length;
            run(line.trim());
            setPrompt();
            scroll();
        }

        function complete() {
            const val = input.value;
            const parts = val.split(/\s+/);
            let matches;
            if (parts.length === 1) {
                matches = Object.keys(COMMANDS).filter((c) => c.startsWith(parts[0].toLowerCase()));
            } else if (parts[0] === 'open') {
                matches = APP_ORDER.filter((a) => a.startsWith(parts[parts.length - 1]));
            } else {
                const last = parts[parts.length - 1];
                const dirPart = last.includes('/') ? last.slice(0, last.lastIndexOf('/') + 1) : '';
                const namePart = last.slice(dirPart.length);
                const r = resolve(dirPart || '.', cwd);
                if (!r || r.node.type !== 'dir') return;
                matches = Object.keys(r.node.children)
                    .filter((n) => n.startsWith(namePart) && (namePart.startsWith('.') || !n.startsWith('.')))
                    .map((n) => dirPart + n + (r.node.children[n].type === 'dir' ? '/' : ''));
            }
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                input.value = parts.join(' ') + (matches[0].endsWith('/') ? '' : ' ');
            } else if (matches.length > 1) {
                print(`${promptStr()} ${esc(val)}`);
                print(matches.join('   '));
                scroll();
            }
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const v = input.value;
            input.value = '';
            exec(v);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (hi > 0) input.value = hist[--hi];
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                hi = Math.min(hist.length, hi + 1);
                input.value = hist[hi] || '';
            } else if (e.key === 'Tab') {
                e.preventDefault();
                complete();
            } else if (e.key === 'l' && e.ctrlKey) {
                e.preventDefault();
                out.innerHTML = '';
            } else if (e.key === 'c' && e.ctrlKey && !window.getSelection().toString()) {
                print(`${promptStr()} ${esc(input.value)}^C`);
                input.value = '';
                scroll();
            }
        });

        term.addEventListener('click', (e) => {
            const runEl = e.target.closest('[data-run]');
            if (runEl) {
                exec(runEl.dataset.run);
                input.focus({ preventScroll: true });
                return;
            }
            if (!e.target.closest('a') && !window.getSelection().toString()) input.focus({ preventScroll: true });
        });

        neofetch();
        print(`Welcome to SriramOS. Type ${cmd('help')} to see what I can do — or click any <span class="t-acc">green</span> command.\n`);
        setPrompt();

        return {
            focus: () => {
                if (!isMobile()) input.focus({ preventScroll: true });
            },
        };
    }

    // ------------------------------------------------------------------
    // Window manager
    // ------------------------------------------------------------------
    const layer = $('#windows');
    const wins = {};
    let z = 10;
    let cascade = 0;

    function openApp(id, opts = {}) {
        const app = APPS[id];
        if (!app) return false;
        let w = wins[id];
        if (w) {
            w.classList.remove('minimized');
            focusWin(w);
            if (opts.select && w.api && w.api.select) w.api.select(opts.select);
            if (w.api && w.api.focus) w.api.focus();
            return true;
        }

        w = document.createElement('section');
        w.className = 'window';
        w.dataset.app = id;
        w.setAttribute('role', 'dialog');
        w.setAttribute('aria-label', app.label);
        w.innerHTML = `
            <header class="titlebar">
                <div class="traffic">
                    <button class="tl close" aria-label="Close"></button>
                    <button class="tl min" aria-label="Minimize"></button>
                    <button class="tl max" aria-label="Maximize"></button>
                </div>
                <div class="win-title">${esc(app.title)}</div>
                <div class="win-spacer"></div>
            </header>
            <div class="win-body${app.pad === false ? ' no-pad' : ''}"></div>`;

        const vw = innerWidth;
        const vh = innerHeight;
        const top0 = 44;
        const bottom0 = 100;
        const W = Math.min(app.w, vw - 32);
        const H = Math.min(app.h, vh - top0 - bottom0);
        const off = ((cascade++ % 5) - 2) * 28;
        const x = opts.x ?? Math.round((vw - W) / 2 + off);
        const y = opts.y ?? Math.round(top0 + (vh - top0 - bottom0 - H) / 2 + off * 0.6);
        Object.assign(w.style, {
            width: W + 'px',
            height: H + 'px',
            left: clamp(x, 8, Math.max(8, vw - W - 8)) + 'px',
            top: clamp(y, top0, Math.max(top0, vh - H - bottom0)) + 'px',
        });

        layer.appendChild(w);
        w.api = app.render($('.win-body', w), opts) || null;
        if (opts.select && w.api && w.api.select) w.api.select(opts.select);
        wins[id] = w;

        $('.tl.close', w).addEventListener('click', () => closeApp(id));
        $('.tl.min', w).addEventListener('click', () => minimizeApp(id));
        $('.tl.max', w).addEventListener('click', () => w.classList.toggle('maximized'));
        w.addEventListener('pointerdown', () => focusWin(w));
        makeDraggable(w);

        focusWin(w);
        if (w.api && w.api.focus) w.api.focus();
        updateDock();
        return true;
    }

    function closeApp(id) {
        const w = wins[id];
        if (!w) return;
        delete wins[id];
        w.classList.add('closing');
        setTimeout(() => w.remove(), 200);
        updateDock();
        focusTopmost();
    }

    function minimizeApp(id) {
        const w = wins[id];
        if (!w) return;
        w.classList.add('minimized');
        w.classList.remove('focused');
        focusTopmost();
    }

    function focusWin(w) {
        if (w.classList.contains('focused') && +w.style.zIndex === z) return;
        w.style.zIndex = ++z;
        Object.values(wins).forEach((o) => o.classList.toggle('focused', o === w));
    }

    function focusTopmost() {
        const top = Object.values(wins)
            .filter((w) => !w.classList.contains('minimized'))
            .sort((a, b) => b.style.zIndex - a.style.zIndex)[0];
        if (top) focusWin(top);
    }

    function makeDraggable(w) {
        const bar = $('.titlebar', w);
        bar.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 || e.target.closest('button') || w.classList.contains('maximized') || isMobile()) return;
            const sx = e.clientX;
            const sy = e.clientY;
            const ox = w.offsetLeft;
            const oy = w.offsetTop;
            bar.setPointerCapture(e.pointerId);
            w.classList.add('dragging');
            const move = (ev) => {
                const nx = clamp(ox + ev.clientX - sx, 120 - w.offsetWidth, innerWidth - 120);
                const ny = clamp(oy + ev.clientY - sy, 34, innerHeight - 60);
                w.style.left = nx + 'px';
                w.style.top = ny + 'px';
            };
            const up = () => {
                bar.removeEventListener('pointermove', move);
                bar.removeEventListener('pointerup', up);
                bar.removeEventListener('pointercancel', up);
                w.classList.remove('dragging');
            };
            bar.addEventListener('pointermove', move);
            bar.addEventListener('pointerup', up);
            bar.addEventListener('pointercancel', up);
        });
        bar.addEventListener('dblclick', (e) => {
            if (!e.target.closest('button') && !isMobile()) w.classList.toggle('maximized');
        });
    }

    // ------------------------------------------------------------------
    // Desktop icons + dock
    // ------------------------------------------------------------------
    const DESK_NAMES = {
        about: 'about_me', experience: 'experience', projects: 'projects', skills: 'skills.pkg',
        education: 'education', resume: 'resume.pdf', terminal: 'terminal', contact: 'contact',
    };
    $('#desktop-icons').innerHTML = APP_ORDER.map((id) => `
        <button class="desk-icon" data-open="${id}">${iconHTML(APPS[id])}<span>${DESK_NAMES[id]}</span></button>`).join('');

    const dock = $('#dock');
    dock.innerHTML =
        APP_ORDER.map((id) => `
            <button class="dock-item" data-open="${id}" aria-label="${APPS[id].label}">
                <span class="dock-label">${APPS[id].label}</span>${iconHTML(APPS[id])}<span class="dock-dot"></span>
            </button>`).join('') +
        `<span class="dock-sep"></span>
         <a class="dock-item" href="${DATA.links.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <span class="dock-label">GitHub ↗</span><span class="app-icon dark">gh</span><span class="dock-dot"></span>
         </a>
         <a class="dock-item" href="${DATA.links.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <span class="dock-label">LinkedIn ↗</span><span class="app-icon" style="--g1:#6bc8ff;--g2:#3a6bff">in</span><span class="dock-dot"></span>
         </a>`;

    function updateDock() {
        $$('.dock-item[data-open]', dock).forEach((el) => el.classList.toggle('open', !!wins[el.dataset.open]));
    }

    if (!reduced) {
        const items = $$('.dock-item', dock);
        dock.addEventListener('mousemove', (e) => {
            if (isMobile()) return;
            items.forEach((it) => {
                const r = it.getBoundingClientRect();
                const d = Math.abs(e.clientX - (r.left + r.width / 2));
                it.style.setProperty('--s', (1 + Math.max(0, 1 - d / 150) * 0.5).toFixed(3));
            });
        });
        dock.addEventListener('mouseleave', () => items.forEach((it) => it.style.setProperty('--s', '1')));
    }

    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-open]');
        if (!t) return;
        e.preventDefault();
        openApp(t.dataset.open, t.dataset.select ? { select: t.dataset.select } : {});
    });

    // ------------------------------------------------------------------
    // Spotlight (⌘K)
    // ------------------------------------------------------------------
    const spot = $('#spotlight');
    const spotInput = $('#spot-input');
    const spotList = $('#spot-list');
    let spotItems = [];
    let spotIdx = 0;

    const ACTIONS = [
        ...APP_ORDER.map((id) => ({ label: APPS[id].label, hint: 'app', icon: iconHTML(APPS[id]), run: () => openApp(id) })),
        ...DATA.experience.map((x) => ({ label: `${x.company} — ${x.role}`, hint: 'experience', icon: iconHTML(APPS.experience), run: () => openApp('experience', { select: x.id }) })),
        { label: 'Save résumé as PDF', hint: 'action', icon: iconHTML(APPS.resume), run: () => { $('#print-root').innerHTML = resumeHTML(); window.print(); } },
        { label: 'Switch accent theme', hint: 'action', icon: '<span class="app-icon">◐</span>', run: cycleTheme },
        { label: 'Matrix mode', hint: 'secret', icon: '<span class="app-icon dark">01</span>', run: () => matrix() },
        { label: 'GitHub', hint: 'link ↗', icon: '<span class="app-icon dark">gh</span>', run: () => window.open(DATA.links.github, '_blank', 'noopener') },
        { label: 'LinkedIn', hint: 'link ↗', icon: '<span class="app-icon" style="--g1:#6bc8ff;--g2:#3a6bff">in</span>', run: () => window.open(DATA.links.linkedin, '_blank', 'noopener') },
        { label: 'Classic portfolio', hint: 'link', icon: '<span class="app-icon" style="--g1:#c9ccd6;--g2:#8a90a3">v1</span>', run: () => (location.href = DATA.links.classic) },
    ];

    function renderSpot() {
        const q = spotInput.value.trim().toLowerCase();
        spotItems = ACTIONS.filter((a) => !q || a.label.toLowerCase().includes(q) || a.hint.includes(q));
        spotIdx = clamp(spotIdx, 0, Math.max(0, spotItems.length - 1));
        spotList.innerHTML = spotItems.length
            ? spotItems.map((a, i) => `<li data-i="${i}" class="${i === spotIdx ? 'active' : ''}">${a.icon}<span>${esc(a.label)}</span><small>${a.hint}</small></li>`).join('')
            : '<li style="color:var(--muted);cursor:default">No results — try "projects" or "amazon"</li>';
        const active = $('li.active', spotList);
        if (active) active.scrollIntoView({ block: 'nearest' });
    }

    function openSpot() {
        spot.hidden = false;
        spotInput.value = '';
        spotIdx = 0;
        renderSpot();
        spotInput.focus();
    }

    function closeSpot() {
        spot.hidden = true;
    }

    function runSpot(i) {
        const a = spotItems[i];
        if (!a) return;
        closeSpot();
        a.run();
    }

    spotInput.addEventListener('input', () => {
        spotIdx = 0;
        renderSpot();
    });
    spotInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            spotIdx = (spotIdx + 1) % Math.max(1, spotItems.length);
            renderSpot();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            spotIdx = (spotIdx - 1 + spotItems.length) % Math.max(1, spotItems.length);
            renderSpot();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            runSpot(spotIdx);
        }
    });
    spotList.addEventListener('click', (e) => {
        const li = e.target.closest('li[data-i]');
        if (li) runSpot(+li.dataset.i);
    });
    spot.addEventListener('click', (e) => {
        if (e.target === spot) closeSpot();
    });
    $('#spotlight-btn').addEventListener('click', openSpot);
    $('#kbd-hint').textContent = isMac ? '⌘K' : 'Ctrl K';

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            spot.hidden ? openSpot() : closeSpot();
        } else if (e.key === 'Escape' && !spot.hidden) {
            closeSpot();
        }
    });

    // ------------------------------------------------------------------
    // Matrix easter egg
    // ------------------------------------------------------------------
    function matrix(ms = 6000) {
        if (reduced) return false;
        const c = document.createElement('canvas');
        c.className = 'matrix';
        document.body.appendChild(c);
        const ctx = c.getContext('2d');
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const w = innerWidth;
        const h = innerHeight;
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        ctx.scale(dpr, dpr);
        const fs = 16;
        const drops = Array.from({ length: Math.ceil(w / fs) }, () => Math.random() * -40);
        const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789PYTORCHAWSLLMRAGGO{}<>/'.split('');
        const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#7cf5c4';
        const start = performance.now();
        let last = 0;
        let raf;
        let stopped = false;

        ctx.fillStyle = '#06070b';
        ctx.fillRect(0, 0, w, h);

        const frame = (t) => {
            if (t - last > 45) {
                last = t;
                ctx.fillStyle = 'rgba(6, 7, 11, 0.14)';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = color;
                ctx.font = `${fs}px "JetBrains Mono", monospace`;
                drops.forEach((y, i) => {
                    ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, y * fs);
                    drops[i] = y * fs > h && Math.random() > 0.97 ? 0 : y + 1;
                });
            }
            if (t - start < ms) raf = requestAnimationFrame(frame);
            else stop();
        };
        const stop = () => {
            if (stopped) return;
            stopped = true;
            cancelAnimationFrame(raf);
            removeEventListener('keydown', stop);
            c.classList.add('out');
            setTimeout(() => c.remove(), 500);
        };
        c.addEventListener('click', stop);
        setTimeout(() => addEventListener('keydown', stop), 0);
        raf = requestAnimationFrame(frame);
        return true;
    }

    // ------------------------------------------------------------------
    // Clock + wallpaper spotlight
    // ------------------------------------------------------------------
    const clockEl = $('#clock');
    function tickClock() {
        const d = new Date();
        const date = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
        clockEl.textContent = isMobile() ? time : `${date}  ${time}`;
    }
    tickClock();
    setInterval(tickClock, 15000);

    const wall = $('#wallpaper');
    let pending = false;
    addEventListener('pointermove', (e) => {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
            wall.style.setProperty('--mx', e.clientX + 'px');
            wall.style.setProperty('--my', e.clientY + 'px');
            pending = false;
        });
    });

    // ------------------------------------------------------------------
    // Boot sequence
    // ------------------------------------------------------------------
    const OK = '<span class="ok">[  OK  ]</span>';
    const BOOT = [
        '<span class="dim">SriramOS BIOS v2.0 — (c) Sriram Anumandla</span>',
        '<span class="dim">CPU: 1x human core @ caffeinated GHz</span>',
        `${OK} Mounted /education  (MS CS · Florida State · GPA 3.8)`,
        `${OK} Mounted /experience (amazon, hirebest, servicenow)`,
        `${OK} Loaded modules: pytorch langgraph bedrock sagemaker kafka`,
        `${OK} Started distributed-systems.service`,
        `${OK} Spawned AI agents [6/6 experts online]`,
        `${OK} Reached target: <span class="ok">recruiter-impressed.target</span>`,
        '',
        'Welcome, visitor.',
    ];

    function boot(done) {
        const el = $('#boot');
        let seen = false;
        try {
            seen = sessionStorage.getItem('sos-booted') === '1';
        } catch (_) { /* storage unavailable */ }
        if (seen || reduced) {
            el.remove();
            done();
            return;
        }
        const log = $('#boot-log');
        let i = 0;
        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            try {
                sessionStorage.setItem('sos-booted', '1');
            } catch (_) { /* storage unavailable */ }
            removeEventListener('keydown', finish);
            el.classList.add('out');
            setTimeout(() => el.remove(), 600);
            done();
        };
        addEventListener('keydown', finish);
        el.addEventListener('click', finish);
        const step = () => {
            if (finished) return;
            if (i < BOOT.length) {
                log.insertAdjacentHTML('beforeend', BOOT[i++] + '\n');
                setTimeout(step, 120 + Math.random() * 140);
            } else {
                setTimeout(finish, 500);
            }
        };
        step();
    }

    boot(() => {
        const vw = innerWidth;
        if (vw >= 1180) {
            const total = 580 + 24 + 560;
            const sx = Math.max(116, Math.round((vw - total) / 2));
            openApp('terminal', { x: sx + 604, y: 150 });
            openApp('about', { x: sx, y: 60 });
        } else {
            openApp('about');
        }
    });
})();
