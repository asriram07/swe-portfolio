(() => {
    'use strict';

    const $ = (s) => document.querySelector(s);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------------
    // Content
    // ------------------------------------------------------------------
    const WORK = [
        {
            date: '2025 — Now',
            role: 'Software Development Engineer',
            company: 'Amazon',
            location: 'Sunnyvale, CA',
            current: true,
            points: [
                'Built <strong>COTA (Code-Optimized Test Analyzer)</strong> using LLMs, decision trees, AWS SQS and RAG on Kendra to analyze code diffs and predict relevant test suites via call-graph analysis. Adopted by <strong>400+ engineers</strong>, saving 2+ engineering days per release.',
                'Developing a distributed <strong>multi-agent ML infrastructure</strong> on PyTorch, SageMaker, DynamoDB and Bedrock, hosting specialized AI agents (CTS validation, code upleveling) for FireOS with per-service auto-scaling.',
                'Diagnosed high-concurrency race conditions and IPC bottlenecks in FireOS, reducing system-level ANRs and crashes across the FireTV fleet by <strong>15%</strong>.',
            ],
            stack: 'LLMs · RAG · AWS Bedrock · SageMaker · PyTorch · DynamoDB · SQS',
        },
        {
            date: '2024',
            role: 'AI Engineer Intern',
            company: 'HireBest',
            location: 'San Jose, CA',
            points: [
                'Built a distributed <strong>voice-AI interview platform</strong> with LLM-driven agents (Python, LangGraph, VectorDB on AWS ECS), handling <strong>200+ concurrent sessions</strong> and cutting recruiter screening from 30 minutes to under 90 seconds.',
                'Replaced HTTP polling with a WebSocket architecture, cutting end-to-end voice latency by <strong>40%</strong> with sub-250ms responses.',
                'Developed the recruiter platform with React, REST APIs, Docker and PostgreSQL, storing transcripts and AI evaluations on S3.',
            ],
            stack: 'Python · LangGraph · VectorDB · WebSockets · React · PostgreSQL · AWS ECS',
        },
        {
            date: '2022 — 2023',
            role: 'Associate Software Development Engineer',
            company: 'ServiceNow',
            location: 'Hyderabad, India',
            points: [
                'Engineered a scalable <strong>Microsoft 365 integration</strong> with OAuth 2.0 and bidirectional user sync across multiple Microsoft tenants.',
                'Built a high-throughput batch pipeline importing Teams conversations into tickets, handling <strong>500+ concurrent sync jobs</strong> across 300+ enterprise deployments.',
                'Shipped real-time approval push notifications on an event-driven microservices architecture, with end-to-end test suites.',
            ],
            stack: 'JavaScript · OAuth 2.0 · REST · SQL · Microservices',
        },
    ];

    const PROJECTS = [
        {
            meta: 'AI / ML',
            title: 'Mixture-of-Experts QA',
            desc: 'Six small language models trained on distinct domains, with a gating network that routes each query to the right expert — <strong>90%+ accuracy</strong>. Served through an async FastAPI + Nginx inference layer on EC2.',
            stack: 'PyTorch · Hugging Face · FastAPI · Docker · AWS EC2',
        },
        {
            meta: 'Full-stack',
            title: 'Real Estate Enquiry Platform',
            desc: 'Location-aware property search with an <strong>LLM natural-language interface</strong> that turns conversational queries into structured Elasticsearch filters.',
            stack: 'React · Node.js · Express · Elasticsearch · AWS S3',
        },
        {
            meta: 'Infrastructure',
            title: 'Self-Hosted Cloud',
            desc: 'A physical machine turned into a personal cloud: Docker services behind an Nginx reverse proxy, SSH tunneling, CI/CD auto-deploys and dynamic DNS.',
            stack: 'Linux · Docker Compose · Nginx · CI/CD',
        },
    ];

    const SKILLS = [
        ['Languages', 'Python, Java, C++, Go, TypeScript, JavaScript, SQL'],
        ['AI / ML', 'PyTorch, TensorFlow, LangGraph, Scikit-learn, RAG, Agent orchestration'],
        ['Backend', 'Node.js, Express, FastAPI, Flask, Kafka, Microservices, Distributed systems'],
        ['Cloud & data', 'AWS (EC2, RDS, SageMaker, Bedrock), PostgreSQL, MySQL, MongoDB, Redis, Pinecone'],
        ['Tooling', 'Docker, Kubernetes, Jenkins, React'],
    ];

    $('#work-list').innerHTML = WORK.map((w) => `
        <article class="row reveal">
            <div class="row-meta">${w.date}</div>
            <div>
                <h3 class="row-title">${w.role}${w.current ? '<span class="badge">Current</span>' : ''}</h3>
                <p class="row-org"><b>${w.company}</b> · ${w.location}</p>
                <ul class="points">${w.points.map((p) => `<li>${p}</li>`).join('')}</ul>
                <p class="stack">${w.stack}</p>
            </div>
        </article>`).join('');

    $('#project-list').innerHTML = PROJECTS.map((p) => `
        <article class="row reveal">
            <div class="row-meta">${p.meta}</div>
            <div>
                <h3 class="row-title">${p.title}</h3>
                <p class="points" style="display:block">${p.desc}</p>
                <p class="stack">${p.stack}</p>
            </div>
        </article>`).join('');

    $('#skill-list').innerHTML = SKILLS.map(([k, v]) => `
        <div class="skill reveal"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

    // ------------------------------------------------------------------
    // Scroll reveal + count-up
    // ------------------------------------------------------------------
    function countUp(el) {
        const end = +el.dataset.count;
        if (reduced) {
            el.textContent = end;
            return;
        }
        const t0 = performance.now();
        const tick = (t) => {
            const k = Math.min(1, (t - t0) / 1600);
            el.textContent = Math.round(end * (1 - Math.pow(1 - k, 4)));
            if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    // Stagger siblings that enter together.
    document.querySelectorAll('.stats, .skills').forEach((group) => {
        [...group.querySelectorAll('.reveal')].forEach((el, i) => el.style.setProperty('--d', `${i * 0.08}s`));
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add('in');
            en.target.querySelectorAll('[data-count]').forEach(countUp);
            io.unobserve(en.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // ------------------------------------------------------------------
    // Progress bar, nav border, active link
    // ------------------------------------------------------------------
    const progress = $('#progress');
    const nav = $('#nav');
    const links = [...document.querySelectorAll('.nav-links a')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href')));

    function onScroll() {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        nav.classList.toggle('scrolled', scrollY > 10);
        let current = -1;
        sections.forEach((s, i) => {
            if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = i;
        });
        links.forEach((a, i) => a.classList.toggle('active', i === current));
    }

    let ticking = false;
    addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            onScroll();
            ticking = false;
        });
    }, { passive: true });
    onScroll();

    $('#print-btn').addEventListener('click', () => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        window.print();
    });
})();
