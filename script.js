(() => {
    'use strict';

    const $ = (s) => document.querySelector(s);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------------
    // Content
    // ------------------------------------------------------------------

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
            score: '90%+ ACCURACY',
            visual: 'nn',
            kind: 'AI & Machine Learning',
            title: 'Mixture-of-Experts QA System',
            bullets: [
                'Trained <b>6 small language models</b> with PyTorch and Hugging Face Transformers, each on a distinct domain, plus a <b>gating network</b> that dynamically routes every query to the right expert — <b>90%+ accuracy</b> in tests.',
                'Built a fast model-serving pipeline with FastAPI, Docker and Nginx: containerized SLMs behind a low-latency, async inference layer deployed on AWS EC2.',
            ],
            tags: ['PyTorch', 'Hugging Face', 'FastAPI', 'Docker', 'Nginx', 'AWS EC2'],
        },
        {
            score: 'TALK TO SEARCH',
            visual: 'map',
            kind: 'Full-stack & Cloud',
            title: 'Real Estate Enquiry Platform',
            bullets: [
                'Full-stack platform for property search by user location and <b>geo-spatial distance</b>, built with React, Node.js and Express.',
                'An <b>LLM-powered natural-language interface</b> that translates conversational queries ("3-bed near downtown under 600k") into structured Elasticsearch filters. Deployed on AWS EC2 with S3 for property images.',
            ],
            tags: ['React', 'Node.js', 'Express', 'Elasticsearch', 'LLMs', 'AWS S3'],
        },
        {
            score: '100% SELF-HOSTED',
            visual: 'rack',
            kind: 'DevOps & Infrastructure',
            title: 'Self-Hosted Cloud Infrastructure',
            bullets: [
                'Repurposed a physical machine into a <b>self-hosted Linux cloud server</b> with Docker containers, an Nginx reverse proxy and SSH tunneling for secure remote access.',
                'Set up <b>CI/CD pipelines</b> for automatic deployment, Docker Compose service orchestration, port forwarding and dynamic DNS.',
            ],
            tags: ['Linux', 'Docker Compose', 'Nginx', 'CI/CD', 'SSH'],
        },
    ];

    // Strongest skills first in each row; `core` ones are highlighted.
    const SKILLS = [
        { name: 'Languages', color: 'red', core: ['Python', 'Java', 'C++'], items: ['Go', 'TypeScript', 'JavaScript', 'SQL'] },
        { name: 'AI / ML', color: 'pink', core: ['PyTorch', 'LLMs & RAG', 'LangGraph'], items: ['Agent orchestration', 'Hugging Face', 'TensorFlow', 'Scikit-learn'] },
        { name: 'Backend & Systems', color: 'cyan', core: ['Distributed systems', 'Microservices'], items: ['Node.js', 'FastAPI', 'Express', 'Flask', 'Kafka', 'REST', 'WebSockets'] },
        { name: 'Cloud', color: 'orange', core: ['AWS'], items: ['EC2', 'S3', 'SageMaker', 'Bedrock', 'DynamoDB', 'SQS', 'RDS', 'Gemini Vertex'] },
        { name: 'Databases', color: 'red', core: ['PostgreSQL'], items: ['MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Pinecone / VectorDB'] },
        { name: 'DevOps', color: 'pink', core: ['Docker'], items: ['Kubernetes', 'CI/CD', 'Jenkins', 'Linux', 'Nginx'] },
        { name: 'Frontend', color: 'cyan', core: ['React'], items: ['HTML / CSS'] },
    ];

    const chips = (list) => `<ul class="chips">${list.map((t) => `<li class="chip">${t}</li>`).join('')}</ul>`;
    const bullets = (list) => `<ul class="bullets">${list.map((b) => `<li>${b}</li>`).join('')}</ul>`;

    $('#levels-list').innerHTML = LEVELS.map((l, i) => `
        <article class="level maze reveal ${i % 2 ? 'from-right' : ''}">
            <div class="level-tag pixel">LEVEL 0${l.level}${l.current ? '<span class="now">NOW</span>' : ''}</div>
            <div class="level-head"><h3>${l.role}</h3><span class="date">${l.date}</span></div>
            <p class="org"><b>${l.company}</b> · ${l.location}</p>
            ${bullets(l.bullets)}
            ${chips(l.tags)}
        </article>`).join('');


    $('#inventory-list').innerHTML = SKILLS.map((g) => `
        <div class="skill-row reveal">
            <h3><span class="ghost-dot ${g.color}"></span>${g.name}</h3>
            <ul class="chips">
                ${g.core.map((t) => `<li class="chip core">${t}</li>`).join('')}
                ${g.items.map((t) => `<li class="chip">${t}</li>`).join('')}
            </ul>
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
    // Project visuals: one animated illustration per project
    // ------------------------------------------------------------------
    const EXPERTS = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 168, y: 20 + i * 26 }));

    const VISUALS = {
        // Neural net: query → gating router → one of 6 experts → answer
        nn: () => `
            <svg viewBox="0 0 240 190" class="nn">
                <line class="e e-in" x1="26" y1="85" x2="88" y2="85"/>
                ${EXPERTS.map((e, i) => `
                    <line class="e e-g" data-i="${i}" x1="88" y1="85" x2="${e.x}" y2="${e.y}"/>
                    <line class="e e-o" data-i="${i}" x1="${e.x}" y1="${e.y}" x2="220" y2="85"/>`).join('')}
                <g class="node n-in"><circle cx="26" cy="85" r="10"/><text x="26" y="89">Q</text></g>
                <g class="node n-gate"><circle cx="88" cy="85" r="15"/><text x="88" y="89">G</text></g>
                ${EXPERTS.map((e, i) => `<g class="node n-ex" data-i="${i}"><circle cx="${e.x}" cy="${e.y}" r="8"/></g>`).join('')}
                <g class="node n-out"><circle cx="220" cy="85" r="10"/><text x="220" y="89">A</text></g>
                <text class="cap" x="26" y="182">query</text>
                <text class="cap" x="88" y="182">router</text>
                <text class="cap" x="168" y="182">experts</text>
                <text class="cap" x="220" y="182">answer</text>
            </svg>`,

        // Map: natural-language query types in, matching pins light up
        map: () => {
            const blocks = [
                [14, 46, 50, 34], [72, 46, 44, 34], [124, 46, 54, 34], [186, 46, 40, 34],
                [14, 88, 36, 40], [58, 88, 58, 40], [186, 88, 40, 40],
                [14, 136, 62, 40], [84, 136, 32, 40], [124, 136, 102, 40],
            ];
            const pins = [[38, 70], [94, 72], [150, 66], [34, 120], [86, 118], [206, 112], [170, 162]];
            return `
            <svg viewBox="0 0 240 190" class="map">
                ${blocks.map(([x, y, w, h]) => `<rect class="block" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`).join('')}
                <rect class="park" x="124" y="88" width="54" height="40" rx="3"/>
                <path class="river" d="M-5 180 C 40 150, 70 186, 120 132 S 200 120, 250 84"/>
                ${pins.map(([x, y], i) => `
                    <g class="pin" data-i="${i}" transform="translate(${x} ${y})">
                        <g class="pin-inner"><path d="M0 0C-5-7-9-11-9-16a9 9 0 1 1 18 0c0 5-4 9-9 16z"/><circle cy="-16" r="3.2"/></g>
                    </g>`).join('')}
                <rect class="sbar" x="10" y="8" width="220" height="26" rx="13"/>
                <text class="sicon" x="24" y="25">⌕</text>
                <text class="stext" x="36" y="25"></text>
            </svg>`;
        },

        // Rack: request flows through nginx → app → db, terminal deploys
        rack: () => `
            <div class="rack">
                <span class="packet"></span>
                ${['nginx', 'app', 'postgres'].map((n, i) => `
                    <div class="unit"><span class="u-name">${n}</span>
                        <span class="leds"><i style="animation-delay:${i * 0.3}s"></i><i style="animation-delay:${i * 0.3 + 0.5}s"></i><i class="y" style="animation-delay:${i * 0.2 + 0.9}s"></i></span>
                    </div>`).join('')}
            </div>
            <div class="mini-term"><div class="mt-bar"><i></i><i></i><i></i></div><pre class="mt-out"></pre></div>`,
    };

    $('#powerups-list').innerHTML = PROJECTS.map((p, i) => `
        <article class="cart reveal ${i % 2 ? 'from-right' : ''}">
            <div class="cart-body">
                <p class="cart-kind">${p.kind}</p>
                <h3 class="cart-name">${p.title}</h3>
                ${bullets(p.bullets)}
                ${chips(p.tags)}
            </div>
            <div class="cart-screen" aria-hidden="true">
                <div class="viz viz-${p.visual}" data-visual="${p.visual}">${VISUALS[p.visual]()}</div>
                <div class="cart-label pixel">HIGH SCORE</div>
                <div class="cart-title pixel">${p.score}</div>
            </div>
        </article>`).join('');

    // Animation loops only tick while their card is on screen.
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const vizVisible = new WeakMap();
    const vizIO = new IntersectionObserver((entries) => entries.forEach((en) => vizVisible.set(en.target, en.isIntersecting)));
    async function whenVisible(el) {
        while (!vizVisible.get(el)) await sleep(400);
    }

    async function runNN(el) {
        const q = (s) => el.querySelectorAll(s);
        const set = (s, on) => q(s).forEach((n) => n.classList.toggle('on', on));
        let pick = 0;
        for (;;) {
            await whenVisible(el);
            pick = (pick + 1 + Math.floor(Math.random() * 5)) % 6;
            set('.on', false);
            set('.n-in, .e-in', true);
            await sleep(450);
            set('.n-gate', true);
            await sleep(450);
            set(`.e-g[data-i="${pick}"], .n-ex[data-i="${pick}"]`, true);
            await sleep(550);
            set(`.e-o[data-i="${pick}"], .n-out`, true);
            await sleep(1300);
        }
    }

    async function runMap(el) {
        const text = el.querySelector('.stext');
        const pins = [...el.querySelectorAll('.pin')];
        const QUERIES = [
            ['3-bed near downtown', [1, 2, 4]],
            ['condo under $600k', [0, 5]],
            ['house with a yard', [3, 6]],
        ];
        let k = 0;
        for (;;) {
            await whenVisible(el);
            const [query, hits] = QUERIES[k++ % QUERIES.length];
            pins.forEach((p) => p.classList.remove('hit', 'dim'));
            for (let n = 1; n <= query.length; n++) {
                text.textContent = query.slice(0, n) + '|';
                await sleep(55);
            }
            text.textContent = query;
            await sleep(250);
            pins.forEach((p, i) => p.classList.add(hits.includes(i) ? 'hit' : 'dim'));
            await sleep(2200);
            text.textContent = '';
        }
    }

    async function runRack(el) {
        const out = el.querySelector('.mt-out');
        const LINES = [
            ['$ git push origin main', 'cmd'],
            ['› ci: 42 tests passed ✓', 'ok'],
            ['› docker compose up -d', 'cmd'],
            ['› nginx: reloaded', ''],
            ['✓ deployed in 14s', 'ok'],
        ];
        for (;;) {
            await whenVisible(el);
            out.innerHTML = '';
            for (const [line, cls] of LINES) {
                const row = document.createElement('span');
                row.className = cls;
                out.appendChild(row);
                for (let n = 1; n <= line.length; n++) {
                    row.textContent = line.slice(0, n);
                    await sleep(cls === 'cmd' ? 40 : 12);
                }
                out.appendChild(document.createTextNode('\n'));
                await sleep(320);
            }
            await sleep(2000);
        }
    }

    document.querySelectorAll('.viz').forEach((el) => {
        const kind = el.dataset.visual;
        if (reduced) {
            // Static end-state for reduced motion.
            if (kind === 'nn') el.querySelectorAll('.n-in, .e-in, .n-gate, [data-i="2"], .n-out').forEach((n) => n.classList.add('on'));
            if (kind === 'map') {
                el.querySelector('.stext').textContent = '3-bed near downtown';
                el.querySelectorAll('.pin').forEach((p, i) => p.classList.add([1, 2, 4].includes(i) ? 'hit' : 'dim'));
            }
            if (kind === 'rack') el.querySelector('.mt-out').textContent = '$ docker compose up -d\n✓ deployed in 14s';
            return;
        }
        vizIO.observe(el);
        ({ nn: runNN, map: runMap, rack: runRack })[kind](el);
    });

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
        // Crosses the track in ~11s (min 80px/s on narrow screens).
        const speed = Math.max(80, tw / 11);

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

    document.querySelectorAll('[data-print]').forEach((b) =>
        b.addEventListener('click', () => {
            document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
            window.print();
        }),
    );

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
