(() => {
    'use strict';

    const $ = (s) => document.querySelector(s);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------------
    // Content
    // ------------------------------------------------------------------
    const STATS = [
        { label: 'AMAZON', value: 400, suffix: '+', text: 'engineers use COTA, my LLM-powered test analyzer' },
        { label: 'FIRETV', value: 15, suffix: '%', text: 'fewer system ANRs & crashes across the device fleet' },
        { label: 'VOICE AI', value: 200, suffix: '+', text: 'concurrent interview sessions on my voice platform' },
        { label: 'LATENCY', value: 40, suffix: '%', text: 'lower end-to-end voice latency after the WebSocket rewrite' },
    ];

    const LEVELS = [
        {
            level: 3,
            current: true,
            role: 'Software Development Engineer',
            company: 'Amazon',
            location: 'Sunnyvale, CA',
            date: 'Sep 2025 – Present',
            bullets: [
                'Built <b>COTA (Code-Optimized Test Analyzer)</b> leveraging LLMs, Decision Trees, AWS SQS and RAG on Kendra to analyze code diffs and predict relevant test suites via call-graph analysis; adopted by <b>400+ engineers</b>, saving <b>2+ engineering days per release</b>.',
                'Developing a distributed <b>multi-agent ML infrastructure</b> on PyTorch, AWS SageMaker, DynamoDB and AWS Bedrock to host specialized AI agents (CTS validation and Code Upleveling) for the FireOS ecosystem with per-service auto-scaling.',
                'Optimized FireOS stability by diagnosing high-concurrency race conditions and IPC bottlenecks with low-level debugging tools, reducing system-level ANRs and crashes across the FireTV fleet by <b>15%</b>.',
            ],
            tags: ['LLMs', 'RAG', 'AWS Bedrock', 'SageMaker', 'PyTorch', 'DynamoDB', 'SQS'],
        },
        {
            level: 2,
            role: 'AI Engineer Intern',
            company: 'HireBest (AiAssitant.co)',
            location: 'San Jose, CA',
            date: 'Jun 2024 – Aug 2024',
            bullets: [
                'Built a distributed <b>Voice AI interview platform</b> with LLM-driven agents using Python, PyTorch, LangGraph and VectorDB on AWS ECS, handling <b>200+ concurrent sessions</b> and cutting recruiter screening from 30 minutes to <b>under 90 seconds</b>.',
                'Replaced HTTP polling with a WebSocket architecture (Socket.io), cutting end-to-end voice latency by <b>40%</b> with <b>sub-250ms</b> responses for human-like conversational pacing.',
                'Developed the recruiter platform with React, REST APIs, Docker and PostgreSQL for candidate management, scheduling, and storing transcripts, audio metadata and AI evaluations on AWS S3.',
            ],
            tags: ['Python', 'LangGraph', 'VectorDB', 'WebSockets', 'React', 'PostgreSQL', 'AWS ECS'],
        },
        {
            level: 1,
            role: 'Associate Software Development Engineer',
            company: 'ServiceNow',
            location: 'Hyderabad, TS',
            date: 'Sep 2022 – Aug 2023',
            bullets: [
                'Engineered a scalable <b>Microsoft 365 integration</b> with OAuth 2.0 and bidirectional user sync, connecting instances across multiple Microsoft tenants using JavaScript, REST APIs, SQL and proxy servers.',
                'Developed a high-throughput batch pipeline importing Microsoft Teams conversations into ServiceNow tickets, handling <b>500+ concurrent sync jobs</b> across <b>300+ enterprise deployments</b>.',
                'Built VA Push Notifications delivering real-time approval requests on an event-driven microservices architecture, with comprehensive end-to-end test suites.',
            ],
            tags: ['JavaScript', 'OAuth 2.0', 'REST APIs', 'SQL', 'Microservices'],
        },
    ];

    const PROJECTS = [
        {
            fruit: '🍒',
            kind: 'AI & MACHINE LEARNING',
            title: 'Mixture-of-Experts QA System',
            bullets: [
                'Trained 6 Small Language Models with PyTorch & Hugging Face on distinct domains, plus a gating network routing queries to the right expert — <b>90%+ accuracy</b>.',
                'Fast serving pipeline with FastAPI, Docker and Nginx; async low-latency inference on AWS EC2.',
            ],
            tags: ['PyTorch', 'FastAPI', 'Docker', 'AWS EC2', 'Hugging Face'],
        },
        {
            fruit: '🍓',
            kind: 'FULL-STACK & CLOUD',
            title: 'Real Estate Enquiry Platform',
            bullets: [
                'Property search by location and geo-spatial distance with React, Node.js and Express.',
                '<b>LLM-powered natural-language search</b> translating conversational queries into Elasticsearch filters. AWS EC2 + S3.',
            ],
            tags: ['React', 'Node.js', 'Elasticsearch', 'AWS S3'],
        },
        {
            fruit: '🍊',
            kind: 'DEVOPS & INFRA',
            title: 'Self-Hosted Cloud Infrastructure',
            bullets: [
                'Turned a physical machine into a self-hosted Linux cloud with Docker, an Nginx reverse proxy and SSH tunneling.',
                'CI/CD auto-deploys, Docker Compose orchestration, port forwarding and dynamic DNS.',
            ],
            tags: ['Linux', 'Docker Compose', 'Nginx', 'CI/CD'],
        },
    ];

    const SKILLS = [
        { name: 'LANGUAGES', color: 'red', items: ['C++', 'Java', 'Python', 'Go', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS'] },
        { name: 'FRAMEWORKS', color: 'pink', items: ['React', 'Node.js', 'Express', 'FastAPI', 'Flask', 'PyTorch', 'TensorFlow', 'LangGraph', 'Scikit-learn'] },
        { name: 'DATA & CLOUD', color: 'cyan', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Pinecone', 'VectorDB', 'AWS EC2', 'RDS', 'SageMaker', 'Bedrock', 'Gemini Vertex'] },
        { name: 'TOOLS', color: 'orange', items: ['Docker', 'Kubernetes', 'Jenkins', 'Kafka', 'Distributed Systems', 'Microservices', 'Agent Orchestration', 'GenAI'] },
    ];

    const chips = (list) => `<ul class="chips">${list.map((t) => `<li class="chip">${t}</li>`).join('')}</ul>`;
    const bullets = (list) => `<ul class="bullets">${list.map((b) => `<li>${b}</li>`).join('')}</ul>`;

    $('#stats').innerHTML = STATS.map((s) => `
        <div class="stat maze reveal pop">
            <div class="stat-label">${s.label}</div>
            <span class="stat-num" data-count="${s.value}" data-suffix="${s.suffix}">0</span>
            <p>${s.text}</p>
        </div>`).join('');

    $('#levels-list').innerHTML = LEVELS.map((l, i) => `
        <article class="level maze reveal ${i % 2 ? 'from-right' : ''}">
            <div class="level-tag pixel">LEVEL 0${l.level}${l.current ? '<span class="now">NOW</span>' : ''}</div>
            <div class="level-head"><h3>${l.role}</h3><span class="date">${l.date}</span></div>
            <p class="org"><b>${l.company}</b> · ${l.location}</p>
            ${bullets(l.bullets)}
            ${chips(l.tags)}
        </article>`).join('');

    $('#powerups-list').innerHTML = PROJECTS.map((p) => `
        <article class="powerup maze reveal pop">
            <div class="fruit" aria-hidden="true">${p.fruit}</div>
            <div class="kind">${p.kind}</div>
            <h3>${p.title}</h3>
            ${bullets(p.bullets)}
            ${chips(p.tags)}
        </article>`).join('');

    $('#inventory-list').innerHTML = SKILLS.map((g) => `
        <div class="inv maze reveal pop">
            <h3><span class="ghost-dot ${g.color}"></span>${g.name}</h3>
            ${chips(g.items)}
        </div>`).join('');

    // ------------------------------------------------------------------
    // Ghosts
    // ------------------------------------------------------------------
    const ghostSVG = (color) => `
        <div class="ghost-wrap">
            <svg class="ghost" viewBox="0 0 14 14" style="color:${color}">
                <path class="body" d="M1 14V6a6 6 0 0 1 12 0v8l-2-2-2 2-2-2-2 2-2-2-2 2z" stroke="#121212" stroke-width=".6"/>
                <circle cx="4.6" cy="6" r="1.7" fill="#fff"/><circle cx="9.4" cy="6" r="1.7" fill="#fff"/>
                <circle cx="4.9" cy="6.7" r=".85" fill="#121212"/><circle cx="9.7" cy="6.7" r=".85" fill="#121212"/>
            </svg>
        </div>`;

    const GHOST_COLORS = ['var(--red)', 'var(--pink)', 'var(--cyan)', 'var(--orange)'];
    const laneGhostBox = $('#lane-ghosts');
    laneGhostBox.innerHTML = GHOST_COLORS.map((c) => `<div class="lane-ghost">${ghostSVG(c)}</div>`).join('');
    const laneGhosts = [...laneGhostBox.children];
    const heroGhostBox = $('#hero-ghosts');
    heroGhostBox.innerHTML = GHOST_COLORS.map((c) => `<div class="hero-ghost">${ghostSVG(c)}</div>`).join('');
    const heroGhosts = [...heroGhostBox.children];

    // ------------------------------------------------------------------
    // Dots (lane + hero track)
    // ------------------------------------------------------------------
    const lane = $('#lane');
    const lanePac = $('#lane-pac');
    const heroTrack = $('#hero-track');
    const heroPac = $('#hero-pac');
    const heroPop = $('#hero-pop');
    let laneDots = [];
    let heroDots = [];

    function buildDots() {
        const laneH = lane.clientHeight;
        const sp = innerWidth < 760 ? 22 : 30;
        const n = Math.floor((laneH - 20) / sp);
        const box = $('#lane-dots');
        box.innerHTML = '';
        laneDots = [];
        for (let i = 1; i <= n; i++) {
            const el = document.createElement('div');
            el.className = 'lane-dot' + (i % 9 === 0 ? ' pellet' : '');
            const pos = i * sp;
            el.style.top = pos + 'px';
            box.appendChild(el);
            laneDots.push({ el, pos });
        }

        const trackW = heroTrack.clientWidth;
        const hs = innerWidth < 760 ? 26 : 36;
        const hn = Math.floor((trackW - 30) / hs);
        const hbox = $('#hero-dots');
        hbox.innerHTML = '';
        heroDots = [];
        for (let i = 1; i <= hn; i++) {
            const el = document.createElement('div');
            el.className = 'hero-dot' + (i === hn ? ' pellet' : '');
            const pos = i * hs;
            el.style.left = pos + 'px';
            hbox.appendChild(el);
            heroDots.push({ el, pos, pellet: i === hn, eaten: false });
        }
    }

    // ------------------------------------------------------------------
    // Score
    // ------------------------------------------------------------------
    const scoreEl = $('#score');
    let laneScore = 0;
    let autoScore = 0;
    const renderScore = () => (scoreEl.textContent = String(laneScore + autoScore).padStart(6, '0'));

    // ------------------------------------------------------------------
    // Hero: endless auto-play loop
    //   eat  → Pac-Man eats dots left to right, ghosts follow behind
    //   chase → power pellet eaten: ghosts turn blue, Pac-Man turns and eats them
    //   pause → short beat, dots respawn, repeat
    // ------------------------------------------------------------------
    const game = { x: 0, dir: 1, phase: 'eat', gx: [], combo: 0, pauseUntil: 0, last: 0, visible: true };

    function resetRound() {
        const hs = heroPac.offsetWidth;
        const gap = hs * 1.35;
        game.x = -hs;
        game.dir = 1;
        game.phase = 'eat';
        game.combo = 0;
        heroDots.forEach((d) => {
            d.eaten = false;
            d.el.classList.remove('eaten');
        });
        heroGhosts.forEach((g, i) => {
            game.gx[i] = game.x - (i + 1) * gap - hs;
            g.classList.remove('scared', 'gone');
        });
        drawHero();
    }

    function drawHero() {
        heroPac.style.transform = `translateX(${game.x}px) scaleX(${game.dir})`;
        heroGhosts.forEach((g, i) => (g.style.transform = `translateX(${game.gx[i]}px)`));
    }

    function popScore(points, x) {
        heroPop.textContent = points;
        heroPop.style.left = x + 'px';
        heroPop.classList.remove('show');
        void heroPop.offsetWidth;
        heroPop.classList.add('show');
    }

    function step(t) {
        const dt = Math.min(0.05, (t - (game.last || t)) / 1000);
        game.last = t;
        requestAnimationFrame(step);
        if (!game.visible) return;

        const tw = heroTrack.clientWidth;
        const hs = heroPac.offsetWidth;
        const speed = Math.max(120, tw / 7);

        if (game.phase === 'pause') {
            if (t >= game.pauseUntil) resetRound();
            return;
        }

        if (game.phase === 'eat') {
            game.x += speed * dt;
            const gap = hs * 1.35;
            heroGhosts.forEach((_, i) => (game.gx[i] = game.x - (i + 1) * gap - hs * 0.2));
            heroDots.forEach((d) => {
                if (d.eaten || d.pos > game.x + hs / 2) return;
                d.eaten = true;
                d.el.classList.add('eaten');
                autoScore += d.pellet ? 50 : 10;
                if (d.pellet) {
                    game.phase = 'chase';
                    game.dir = -1;
                    heroGhosts.forEach((g) => g.classList.add('scared'));
                }
            });
        } else if (game.phase === 'chase') {
            game.x -= speed * 1.35 * dt;
            let alive = 0;
            heroGhosts.forEach((g, i) => {
                if (g.classList.contains('gone')) return;
                game.gx[i] -= speed * 0.55 * dt;
                const gw = g.offsetWidth;
                if (game.x <= game.gx[i] + gw * 0.4) {
                    g.classList.add('gone');
                    game.combo++;
                    const pts = 100 * Math.pow(2, game.combo);
                    autoScore += pts;
                    popScore(pts, game.gx[i]);
                } else if (game.gx[i] < -gw) {
                    g.classList.add('gone');
                } else {
                    alive++;
                }
            });
            if (!alive || game.x < -hs) {
                game.phase = 'pause';
                game.pauseUntil = t + 900;
            }
        }

        drawHero();
        renderScore();
    }

    new IntersectionObserver(([en]) => (game.visible = en.isIntersecting)).observe(heroTrack);

    function update() {
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;

        // Vertical lane: Pac-Man heads down, ghosts chase from above.
        const laneH = lane.clientHeight;
        const ps = lanePac.offsetHeight;
        const y = p * (laneH - ps);
        lanePac.style.transform = `translate(-50%, ${y}px) rotate(90deg)`;
        let eaten = 0;
        laneDots.forEach((d) => {
            const e = d.pos < y + ps / 2;
            d.el.classList.toggle('eaten', e);
            if (e) eaten++;
        });
        const gap = innerWidth < 760 ? 30 : 46;
        laneGhosts.forEach((g, i) => {
            const gy = y - (i + 1) * gap - 6;
            g.style.transform = `translate(-50%, ${gy}px)`;
            g.style.opacity = gy < -4 ? 0 : 1;
        });

        laneScore = eaten * 10;
        renderScore();

        if (!reduced) {
            lanePac.classList.add('chomp');
            clearTimeout(chompTimer);
            chompTimer = setTimeout(() => lanePac.classList.remove('chomp'), 160);
        }
    }
    let chompTimer;

    let ticking = false;
    addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }, { passive: true });

    addEventListener('resize', () => {
        buildDots();
        resetRound();
        update();
    });

    // ------------------------------------------------------------------
    // Reveals, score counters, scared ghosts
    // ------------------------------------------------------------------
    function countUp(el) {
        const end = +el.dataset.count;
        const suf = el.dataset.suffix || '';
        if (reduced) {
            el.textContent = end + suf;
            return;
        }
        const t0 = performance.now();
        const tick = (t) => {
            const k = Math.min(1, (t - t0) / 1100);
            el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf;
            if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add('in');
            const num = en.target.querySelector('[data-count]');
            if (num) countUp(num);
            io.unobserve(en.target);
        });
    }, { threshold: 0.18 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    new IntersectionObserver((entries) => {
        entries.forEach((en) => document.body.classList.toggle('scared', en.isIntersecting));
    }, { threshold: 0.25 }).observe($('#powerups'));

    $('#print-btn').addEventListener('click', () => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        window.print();
    });

    // Fonts change layout widths; rebuild once they're ready.
    buildDots();
    resetRound();
    update();
    if (reduced) {
        game.x = 0;
        heroGhosts.forEach((g) => g.classList.add('gone'));
        drawHero();
    } else {
        requestAnimationFrame(step);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
        buildDots();
        if (!reduced) resetRound();
        update();
    });
})();
