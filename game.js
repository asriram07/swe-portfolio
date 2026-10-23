// Optional 30-second Pac-Man mini game. The dots are Sriram's skills;
// the ghosts are classic engineering villains.
(() => {
    'use strict';

    // # wall · . dot · o power pellet · P start · (space) empty
    const MAP = [
        '###################',
        '#o.......#.......o#',
        '#.##.###.#.###.##.#',
        '#.................#',
        '#.##.#.#####.#.##.#',
        '#....#...#...#....#',
        '####.###.#.###.####',
        '#.......   .......#',
        '####.#.#####.#.####',
        '#........#........#',
        '#.##.###.#.###.##.#',
        '#o.#.....P.....#.o#',
        '##.#.#.#####.#.#.##',
        '#....#...#...#....#',
        '###################',
    ];
    const W = MAP[0].length;
    const H = MAP.length;

    const SKILLS = [
        'Python', 'Java', 'C++', 'PyTorch', 'LLMs & RAG', 'LangGraph', 'AWS', 'Distributed systems',
        'Microservices', 'Docker', 'Kafka', 'PostgreSQL', '400+ engineers', '90%+ accuracy',
        '15% fewer crashes', '40% lower latency',
    ];

    const GHOSTS = [
        { name: 'BUGS', color: '#ff3b30', msg: 'Bug squashed!', home: [9, 7] },
        { name: 'DEADLINES', color: '#ff6fc0', msg: 'Deadline crushed!', home: [8, 7] },
        { name: 'MERGE CONFLICTS', color: '#00b8d4', msg: 'Conflict resolved!', home: [10, 7] },
        { name: 'SCOPE CREEP', color: '#ff9a1f', msg: 'Scope contained!', home: [9, 7] },
    ];

    const ROUND_SECONDS = 30;
    const FRIGHT_SECONDS = 6;
    const PAC_SPEED = 4.8;
    const GHOST_SPEED = 3.4;
    const FRIGHT_SPEED = 2.3;
    const GHOST_RAMP = 0.012; // extra ghost speed per second elapsed
    const DIRS = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
    };
    const KEYS = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
    };
    const PIXEL_FONT = '"Press Start 2P", monospace';

    const $ = (id) => document.getElementById(id);
    const modal = $('game');
    const canvas = $('g-canvas');
    const ctx = canvas.getContext('2d');
    const stage = canvas.parentElement;
    const startScreen = $('g-start');
    const endScreen = $('g-end');
    const hud = { score: $('g-score'), time: $('g-time'), best: $('g-best'), lives: $('g-lives') };

    let T = 24; // tile size in CSS px
    let s = null; // game state
    let raf = 0;
    let last = 0;
    let opener = null;

    const isWall = (x, y) => y < 0 || y >= H || x < 0 || x >= W || MAP[y][x] === '#';
    const key = (x, y) => `${x},${y}`;
    const isOpposite = (a, b) => a && b && a.x === -b.x && a.y === -b.y;

    function loadBest() {
        try {
            return +localStorage.getItem('sa-maze-best') || 0;
        } catch (_) {
            return 0;
        }
    }

    function saveBest(v) {
        try {
            localStorage.setItem('sa-maze-best', String(v));
        } catch (_) { /* storage unavailable */ }
    }

    // ------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------
    function newState() {
        const dots = new Map();
        let start = { x: 9, y: 11 };
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                const ch = MAP[y][x];
                if (ch === '.') dots.set(key(x, y), { type: 'dot' });
                else if (ch === 'o') dots.set(key(x, y), { type: 'pellet' });
                else if (ch === 'P') start = { x, y };
            }
        }

        // Scatter the skills across dots that aren't right next to the start.
        const spots = [...dots.entries()]
            .filter(([k, d]) => {
                const [x, y] = k.split(',').map(Number);
                return d.type === 'dot' && Math.abs(x - start.x) + Math.abs(y - start.y) > 3;
            })
            .sort(() => Math.random() - 0.5);
        SKILLS.forEach((label, i) => {
            if (spots[i]) spots[i][1] = Object.assign(spots[i][1], { type: 'skill', label });
        });

        return {
            dots,
            start,
            pac: { x: start.x, y: start.y, dir: DIRS.left, next: DIRS.left, speed: PAC_SPEED },
            ghosts: GHOSTS.map((g, i) => ({
                ...g, x: g.home[0], y: g.home[1], dir: null, frightened: false, wait: 1 + i * 1.6,
            })),
            score: 0,
            time: ROUND_SECONDS,
            lives: 3,
            fright: 0,
            combo: 0,
            collected: [],
            floats: [],
            hitPause: 0,
            caughtBy: null,
            mouth: 0,
            running: false,
        };
    }

    function resetPositions() {
        s.pac.x = s.start.x;
        s.pac.y = s.start.y;
        s.pac.dir = DIRS.left;
        s.pac.next = DIRS.left;
        s.ghosts.forEach((g, i) => {
            g.x = g.home[0];
            g.y = g.home[1];
            g.dir = null;
            g.frightened = false;
            g.wait = 0.6 + i * 1.2;
        });
        s.fright = 0;
    }

    // ------------------------------------------------------------------
    // Movement on the tile grid (positions are in tile units)
    // ------------------------------------------------------------------
    function move(e, speed, dt, choose) {
        let remaining = speed * dt;
        let guard = 8;
        while (remaining > 1e-9 && guard--) {
            const cx = Math.round(e.x);
            const cy = Math.round(e.y);
            const atCenter = Math.abs(e.x - cx) < 1e-6 && Math.abs(e.y - cy) < 1e-6;
            if (atCenter) {
                e.x = cx;
                e.y = cy;
                choose(e, cx, cy);
                if (!e.dir || isWall(cx + e.dir.x, cy + e.dir.y)) return;
            }
            const tx = atCenter ? cx + e.dir.x : e.dir.x > 0 ? Math.ceil(e.x) : e.dir.x < 0 ? Math.floor(e.x) : e.x;
            const ty = atCenter ? cy + e.dir.y : e.dir.y > 0 ? Math.ceil(e.y) : e.dir.y < 0 ? Math.floor(e.y) : e.y;
            const d = Math.abs(tx - e.x) + Math.abs(ty - e.y);
            if (d <= remaining) {
                e.x = tx;
                e.y = ty;
                remaining -= d;
            } else {
                e.x += e.dir.x * remaining;
                e.y += e.dir.y * remaining;
                remaining = 0;
            }
        }
    }

    function choosePac(e, cx, cy) {
        if (e.next && !isWall(cx + e.next.x, cy + e.next.y)) e.dir = e.next;
    }

    function chooseGhost(g, cx, cy) {
        const opts = Object.values(DIRS).filter((d) => !isWall(cx + d.x, cy + d.y));
        const forward = opts.length > 1 ? opts.filter((d) => !isOpposite(d, g.dir)) : opts;
        const dist = (d) => (cx + d.x - s.pac.x) ** 2 + (cy + d.y - s.pac.y) ** 2;
        if (Math.random() < (g.frightened ? 0.5 : 0.3)) {
            g.dir = forward[(Math.random() * forward.length) | 0];
        } else {
            // Chase normally; run away when frightened.
            forward.sort((a, b) => (g.frightened ? dist(b) - dist(a) : dist(a) - dist(b)));
            g.dir = forward[0];
        }
    }

    // ------------------------------------------------------------------
    // Update
    // ------------------------------------------------------------------
    function addFloat(text, x, y, color = '#ffd400') {
        s.floats.push({ text, x, y, t: 1.1, color });
    }

    function update(dt) {
        s.floats.forEach((f) => {
            f.t -= dt;
            f.y -= dt * 1.1;
        });
        s.floats = s.floats.filter((f) => f.t > 0);

        if (s.hitPause > 0) {
            s.hitPause -= dt;
            if (s.hitPause <= 0) {
                if (s.lives <= 0) return end('caught');
                resetPositions();
            }
            return;
        }

        s.time -= dt;
        if (s.time <= 0) {
            s.time = 0;
            return end('time');
        }
        s.mouth += dt * 14;

        // Pac-Man can reverse instantly mid-tile.
        if (isOpposite(s.pac.next, s.pac.dir)) s.pac.dir = s.pac.next;
        move(s.pac, PAC_SPEED, dt, choosePac);

        const k = key(Math.round(s.pac.x), Math.round(s.pac.y));
        const dot = s.dots.get(k);
        if (dot) {
            s.dots.delete(k);
            if (dot.type === 'dot') s.score += 10;
            if (dot.type === 'skill') {
                s.score += 100;
                s.collected.push(dot.label);
                addFloat(`${dot.label} ✓`, s.pac.x, s.pac.y - 0.6);
            }
            if (dot.type === 'pellet') {
                s.score += 50;
                s.fright = FRIGHT_SECONDS;
                s.combo = 0;
                s.ghosts.forEach((g) => {
                    if (g.wait > 0) return;
                    g.frightened = true;
                    if (g.dir) g.dir = { x: -g.dir.x, y: -g.dir.y };
                });
                addFloat('POWER UP!', s.pac.x, s.pac.y - 0.6, '#9aa3ff');
            }
            if (!s.dots.size) {
                s.score += Math.ceil(s.time) * 20;
                return end('clear');
            }
        }

        if (s.fright > 0) {
            s.fright -= dt;
            if (s.fright <= 0) s.ghosts.forEach((g) => (g.frightened = false));
        }

        for (const g of s.ghosts) {
            if (g.wait > 0) {
                g.wait -= dt;
                continue;
            }
            move(g, g.frightened ? FRIGHT_SPEED : GHOST_SPEED + (ROUND_SECONDS - s.time) * GHOST_RAMP, dt, chooseGhost);

            if (Math.abs(g.x - s.pac.x) + Math.abs(g.y - s.pac.y) < 0.7) {
                if (g.frightened) {
                    s.combo++;
                    const pts = 100 * 2 ** s.combo;
                    s.score += pts;
                    addFloat(`${g.msg} +${pts}`, g.x, g.y - 0.6, '#ffffff');
                    g.x = g.home[0];
                    g.y = g.home[1];
                    g.dir = null;
                    g.frightened = false;
                    g.wait = 2;
                } else {
                    s.lives--;
                    s.caughtBy = g.name;
                    s.hitPause = 1;
                    addFloat(`Caught by ${g.name}!`, s.pac.x, s.pac.y - 0.6, '#ff3b30');
                    break;
                }
            }
        }
    }

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------
    function drawWalls() {
        ctx.strokeStyle = '#2340ff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                if (!isWall(x, y)) continue;
                const px = x * T;
                const py = y * T;
                const inset = T * 0.18;
                // Outline only the wall edges that face open space.
                if (y > 0 && !isWall(x, y - 1)) {
                    ctx.moveTo(px, py + inset);
                    ctx.lineTo(px + T, py + inset);
                }
                if (y < H - 1 && !isWall(x, y + 1)) {
                    ctx.moveTo(px, py + T - inset);
                    ctx.lineTo(px + T, py + T - inset);
                }
                if (x > 0 && !isWall(x - 1, y)) {
                    ctx.moveTo(px + inset, py);
                    ctx.lineTo(px + inset, py + T);
                }
                if (x < W - 1 && !isWall(x + 1, y)) {
                    ctx.moveTo(px + T - inset, py);
                    ctx.lineTo(px + T - inset, py + T);
                }
            }
        }
        ctx.stroke();
    }

    function drawGhost(g, t) {
        const cx = (g.x + 0.5) * T;
        const cy = (g.y + 0.5) * T;
        const r = T * 0.42;
        const flashing = g.frightened && s.fright < 2 && Math.floor(t * 6) % 2 === 0;
        ctx.fillStyle = g.frightened ? (flashing ? '#ffffff' : '#2340ff') : g.color;
        ctx.beginPath();
        ctx.arc(cx, cy - r * 0.15, r, Math.PI, 0);
        const base = cy + r * 0.85;
        ctx.lineTo(cx + r, base);
        const waves = 3;
        for (let i = 0; i < waves; i++) {
            const x1 = cx + r - ((i + 0.5) * 2 * r) / waves;
            const x2 = cx + r - ((i + 1) * 2 * r) / waves;
            ctx.lineTo(x1, base - r * 0.25);
            ctx.lineTo(x2, base);
        }
        ctx.closePath();
        ctx.fill();

        // Eyes look where the ghost is heading.
        const dx = (g.dir ? g.dir.x : 0) * r * 0.15;
        const dy = (g.dir ? g.dir.y : 0) * r * 0.15;
        [-0.35, 0.35].forEach((o) => {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(cx + o * r, cy - r * 0.2, r * 0.26, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = g.frightened ? '#fff' : '#1a1a6e';
            ctx.beginPath();
            ctx.arc(cx + o * r + dx, cy - r * 0.2 + dy, r * 0.13, 0, Math.PI * 2);
            ctx.fill();
        });

        if (g.wait <= 0) {
            ctx.font = `${Math.max(6, T * 0.26)}px ${PIXEL_FONT}`;
            ctx.textAlign = 'center';
            ctx.fillStyle = g.frightened ? '#9aa3ff' : g.color;
            ctx.fillText(g.name, cx, cy - r * 1.35);
        }
    }

    function render(t) {
        const w = W * T;
        const h = H * T;
        ctx.fillStyle = '#0a0a12';
        ctx.fillRect(0, 0, w, h);
        drawWalls();

        // Dots
        const pulse = 0.75 + Math.sin(t * 6) * 0.25;
        s.dots.forEach((d, k) => {
            const [x, y] = k.split(',').map(Number);
            const cx = (x + 0.5) * T;
            const cy = (y + 0.5) * T;
            if (d.type === 'dot') {
                ctx.fillStyle = '#f4e7c3';
                ctx.fillRect(cx - T * 0.07, cy - T * 0.07, T * 0.14, T * 0.14);
            } else if (d.type === 'skill') {
                ctx.fillStyle = '#ffd400';
                ctx.shadowColor = '#ffd400';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(cx, cy, T * 0.16, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = '#f4e7c3';
                ctx.beginPath();
                ctx.arc(cx, cy, T * 0.28 * pulse, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Pac-Man
        const p = s.pac;
        const mouth = (Math.abs(Math.sin(s.mouth)) * 0.7 + 0.05) * (Math.PI / 4);
        const ang = Math.atan2(p.dir.y, p.dir.x);
        const blink = s.hitPause > 0 && Math.floor(t * 10) % 2 === 0;
        if (!blink) {
            ctx.fillStyle = '#ffd400';
            ctx.beginPath();
            ctx.moveTo((p.x + 0.5) * T, (p.y + 0.5) * T);
            ctx.arc((p.x + 0.5) * T, (p.y + 0.5) * T, T * 0.44, ang + mouth, ang + Math.PI * 2 - mouth);
            ctx.closePath();
            ctx.fill();
        }

        s.ghosts.forEach((g) => drawGhost(g, t));

        // Floating labels
        ctx.textAlign = 'center';
        ctx.font = `${Math.max(7, T * 0.32)}px ${PIXEL_FONT}`;
        s.floats.forEach((f) => {
            ctx.globalAlpha = Math.min(1, f.t * 2);
            const fx = Math.min(Math.max((f.x + 0.5) * T, T * 3), w - T * 3);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#0a0a12';
            ctx.strokeText(f.text, fx, (f.y + 0.5) * T);
            ctx.fillStyle = f.color;
            ctx.fillText(f.text, fx, (f.y + 0.5) * T);
        });
        ctx.globalAlpha = 1;
    }

    function renderHud() {
        hud.score.textContent = s.score;
        hud.time.textContent = Math.ceil(s.time);
        hud.lives.innerHTML = '<i></i>'.repeat(Math.max(0, s.lives));
    }

    // ------------------------------------------------------------------
    // Loop + lifecycle
    // ------------------------------------------------------------------
    function frame(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (s.running) update(dt);
        render(now / 1000);
        renderHud();
        if (s.running) raf = requestAnimationFrame(frame);
    }

    function sizeCanvas() {
        const avail = Math.min(stage.clientWidth, 600);
        T = Math.max(14, Math.floor(avail / W));
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.style.width = `${T * W}px`;
        canvas.style.height = `${T * H}px`;
        canvas.width = T * W * dpr;
        canvas.height = T * H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (s) render(performance.now() / 1000);
    }

    function begin() {
        s = newState();
        s.running = true;
        startScreen.hidden = true;
        endScreen.hidden = true;
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
    }

    function end() {
        s.running = false;
        const best = Math.max(loadBest(), s.score);
        const isRecord = s.score > 0 && s.score >= best;
        saveBest(best);
        hud.best.textContent = best;

        $('g-end-score').textContent = `${s.score.toLocaleString()}${isRecord ? ' ★' : ''}`;
        endScreen.hidden = false;
        renderHud();
        $('g-about').focus({ preventScroll: true });
    }

    function open(e) {
        opener = e && e.currentTarget;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        hud.best.textContent = loadBest();
        s = newState();
        startScreen.hidden = false;
        endScreen.hidden = true;
        sizeCanvas();
        renderHud();
        $('g-go').focus({ preventScroll: true });
    }

    function close() {
        cancelAnimationFrame(raf);
        if (s) s.running = false;
        modal.hidden = true;
        document.body.style.overflow = '';
        if (opener) opener.focus({ preventScroll: true });
    }

    function steer(name) {
        if (s && s.running && DIRS[name]) s.pac.next = DIRS[name];
    }

    // ------------------------------------------------------------------
    // Input
    // ------------------------------------------------------------------
    document.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', open));
    $('g-close').addEventListener('click', close);
    $('g-go').addEventListener('click', begin);
    $('g-resume').addEventListener('click', () => {
        close();
        $('print-btn').click();
    });
    $('g-about').addEventListener('click', () => {
        close();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    addEventListener('keydown', (e) => {
        if (modal.hidden) return;
        if (e.key === 'Escape') return close();
        const dir = KEYS[e.key] || KEYS[e.key.toLowerCase()];
        if (dir) {
            e.preventDefault();
            if (!s.running && !startScreen.hidden) begin();
            steer(dir);
        }
    });

    let touch = null;
    canvas.addEventListener('touchstart', (e) => {
        const t = e.changedTouches[0];
        touch = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
        if (!touch) return;
        e.preventDefault();
        const t = e.changedTouches[0];
        const dx = t.clientX - touch.x;
        const dy = t.clientY - touch.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
        steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
        touch = { x: t.clientX, y: t.clientY };
    }, { passive: false });
    canvas.addEventListener('touchend', () => (touch = null));

    document.querySelectorAll('#dpad [data-dir]').forEach((b) =>
        b.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            steer(b.dataset.dir);
        }),
    );

    addEventListener('resize', () => {
        if (!modal.hidden) sizeCanvas();
    });

    // Pause the round if the tab is hidden; resume cleanly.
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && s && s.running) last = performance.now();
    });
})();
