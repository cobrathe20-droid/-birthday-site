/**
 * ==========================================================================
 * HAPPY BIRTHDAY PYAARI DIDI — PRECISION MICRO-PARTICLE STARDUST ENGINE 3.0
 * Features:
 * - 2,200 Precision Micro-Particles (pinpoint stardust dots, 1.2px - 1.8px)
 * - Deep velvet obsidian background — ZERO blinding glare / no blurry bloom
 * - Rich luxury palette: Royal 1M Gold, Vivid Rose Pink, Champagne, Fuchsia, Lavender
 * - Kinetic Typography Morphing: "HAPPY" -> "BIRTHDAY" -> "PYAARI DIDI" -> "1M QUEEN"
 * - Smart Responsive Typography Layout (Auto-scaled & stacked for crystal clarity)
 * - Living Micro-Flutter (subtle ±0.45px vibration keeping letters razor-sharp)
 * - Interactive 2-Step Cheeky Loader (pauses at "Wait... Annu Didi?", clicks to reveal)
 * - Clean visual 1M Queen creator tribute card
 * - Genuine brotherly heartfelt letter
 * - Web Audio procedural synthesizer (lofi chords + chimes + fanfare)
 * ==========================================================================
 */

// --- Configuration ---
const CONFIG = {
    swirlDuration: 1400,
    morphDuration: 1000,
    holdDuration: 2200,
    pyaariHoldDuration: 3100,
    disperseDuration: 550,
    // Deep, saturated jewel tones (high contrast against black velvet, NO blinding white wash)
    palette: [
        '#ffd700', // Royal 1M Champagne Gold
        '#ffb703', // Warm Sunlight Gold
        '#ff2a6d', // Vivid Electric Rose
        '#ff758c', // Soft Petal Pink
        '#e056fd', // Radiant Fuchsia
        '#c084fc', // Cosmic Lavender
        '#f59e0b', // Glowing Amber
        '#ffffff'  // Occasional Diamond Stardust (subtle glimmer)
    ]
};

const PARTICLE_STATES = {
    IDLE: -1,
    SWIRL: 0,
    FORM_HAPPY: 1,
    FORM_BIRTHDAY: 2,
    FORM_PYAARI_DIDI: 3,
    FORM_QUEEN: 4,
    FINALE_CANVAS: 5
};

const QUOTES = {
    [PARTICLE_STATES.SWIRL]: "Whispering a magical wish to the stars... ✨",
    [PARTICLE_STATES.FORM_HAPPY]: "May your special day be filled with pure happiness! 💖",
    [PARTICLE_STATES.FORM_BIRTHDAY]: "Celebrating the most amazing Pyaari Didi 🎂",
    [PARTICLE_STATES.FORM_PYAARI_DIDI]: "Not just Annu Didi... Sabse Pyaari Didi! 🌸👑",
    [PARTICLE_STATES.FORM_QUEEN]: "1M Queen 👑 • Always radiant & inspiring! 💫",
    [PARTICLE_STATES.FINALE_CANVAS]: "You bring so much joy to everyone ✨ Keep shining always! 🌟"
};

let currentParticleState = PARTICLE_STATES.IDLE;
let stateStartTime = 0;
let stateSubPhase = 'morphing'; // 'morphing', 'holding', 'dispersing'
let subPhaseStartTime = 0;
let currentChapterIndex = 0;

// --- High Performance Canvas Setup ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
let width = window.innerWidth;
let height = window.innerHeight;
let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
    clearPointsCache();
    if (currentParticleState >= PARTICLE_STATES.FORM_HAPPY && currentParticleState <= PARTICLE_STATES.FORM_QUEEN) {
        buildTargetPointsForState(currentParticleState, false);
    }
}
window.addEventListener('resize', resize);

// --- Crisp Micro-Dot Sprite Generator ---
// Tiny 4px - 6px pinpoint circular grains (Anti-aliased, saturated color, NO white radial wash)
const microDotSpriteCache = {};
function getMicroDotSprite(color, size = 1.5) {
    const key = `${color}_${size.toFixed(1)}`;
    if (microDotSpriteCache[key]) return microDotSpriteCache[key];

    const sCanvas = document.createElement('canvas');
    const sCtx = sCanvas.getContext('2d');
    const dim = Math.max(6, Math.ceil(size * 3.4));
    sCanvas.width = dim;
    sCanvas.height = dim;
    const center = dim / 2;
    const radius = size * 0.55;

    // Solid core with anti-aliased edge feathering
    const grad = sCtx.createRadialGradient(center, center, radius * 0.35, center, center, radius * 1.35);
    grad.addColorStop(0, color);
    grad.addColorStop(0.7, color);
    grad.addColorStop(1, 'transparent');

    sCtx.fillStyle = grad;
    sCtx.beginPath();
    sCtx.arc(center, center, radius * 1.35, 0, Math.PI * 2);
    sCtx.fill();

    microDotSpriteCache[key] = {
        canvas: sCanvas,
        halfDim: dim / 2
    };
    return microDotSpriteCache[key];
}

// --- Procedural Acoustic Grand Piano Synthesizer ---
// Physically modeled acoustic piano with wooden soundboard resonance, hammer strike, and harmonics
class BirthdaySynthesizer {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.activeTimeouts = [];
        this.ambientTimer = null;
        this.ambientIndex = 0;
        this.pianoScale = [
            261.63, // C4
            293.66, // D4
            329.63, // E4
            349.23, // F4
            392.00, // G4
            440.00, // A4
            493.88, // B4
            523.25, // C5
            587.33, // D5
            659.25, // E5
            783.99  // G5
        ];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    start() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.clearAllPendingNotes();
        this.playIntroArpeggio();
        this.playHappyBirthdayPyaariDidi();
    }

    stop() {
        this.isPlaying = false;
        this.clearAllPendingNotes();
        if (this.ambientTimer) clearTimeout(this.ambientTimer);
    }

    clearAllPendingNotes() {
        this.activeTimeouts.forEach(id => clearTimeout(id));
        this.activeTimeouts = [];
    }

    schedule(fn, delay) {
        if (!this.isPlaying) return;
        const id = setTimeout(() => {
            if (this.isPlaying) fn();
        }, delay);
        this.activeTimeouts.push(id);
    }

    /**
     * Acoustic Grand Piano Note Synthesis:
     * - Fundamental String Triangle (wooden warmth)
     * - 2nd Harmonic Octave (piano body ring)
     * - 3rd Harmonic (hammer transient strike)
     * - Dynamic Lowpass Filter (simulating piano soundboard resonance)
     * - Realistic hammer percussive envelope (0.006s attack, exponential decay)
     */
    playPianoNote(freq, duration = 1.9, velocity = 0.08) {
        if (!this.ctx || !this.isPlaying) return;
        try {
            const now = this.ctx.currentTime;

            // 1. Fundamental string oscillator
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(freq, now);

            gain1.gain.setValueAtTime(0.0001, now);
            gain1.gain.linearRampToValueAtTime(velocity, now + 0.007);
            gain1.gain.exponentialRampToValueAtTime(velocity * 0.42, now + 0.24);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            // 2. 2nd Harmonic (Octave overtone)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(freq * 2, now);

            gain2.gain.setValueAtTime(0.0001, now);
            gain2.gain.linearRampToValueAtTime(velocity * 0.32, now + 0.005);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.62);

            // 3. 3rd Harmonic (Hammer strike click & brilliance)
            const osc3 = this.ctx.createOscillator();
            const gain3 = this.ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(freq * 3, now);

            gain3.gain.setValueAtTime(0.0001, now);
            gain3.gain.linearRampToValueAtTime(velocity * 0.12, now + 0.004);
            gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

            // Soundboard Acoustic Lowpass Filter
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(Math.min(3600, freq * 4.2), now);
            filter.frequency.exponentialRampToValueAtTime(Math.max(620, freq * 1.6), now + duration);

            osc1.connect(gain1);
            osc2.connect(gain2);
            osc3.connect(gain3);

            gain1.connect(filter);
            gain2.connect(filter);
            gain3.connect(filter);

            filter.connect(this.ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc3.start(now);

            osc1.stop(now + duration + 0.05);
            osc2.stop(now + duration + 0.05);
            osc3.stop(now + duration + 0.05);
        } catch (e) { }
    }

    playChime(freq, gain = 0.07) {
        this.playPianoNote(freq, 1.2, gain);
    }

    playInteractiveHarp(normY = 0.5) {
        if (!this.ctx) return;
        const noteIdx = Math.floor((1 - normY) * (this.pianoScale.length - 1));
        const safeIdx = Math.max(0, Math.min(this.pianoScale.length - 1, noteIdx));
        const freq = this.pianoScale[safeIdx];
        this.playPianoNote(freq, 1.4, 0.08);
    }

    playIntroArpeggio() {
        // Delicate opening piano flourish: C3 -> G3 -> C4 -> E4 -> G4 -> C5
        const intro = [
            { f: 130.81, wait: 0, d: 2.2, v: 0.06 },   // C3
            { f: 196.00, wait: 220, d: 2.0, v: 0.06 }, // G3
            { f: 261.63, wait: 440, d: 1.8, v: 0.07 }, // C4
            { f: 329.63, wait: 660, d: 1.8, v: 0.07 }, // E4
            { f: 392.00, wait: 880, d: 2.0, v: 0.08 }, // G4
            { f: 523.25, wait: 1100, d: 2.4, v: 0.09 } // C5
        ];
        intro.forEach(n => {
            this.schedule(() => this.playPianoNote(n.f, n.d, n.v), n.wait);
        });
    }

    /**
     * FULL "HAPPY BIRTHDAY PYAARI DIDI" PIANO MASTERPIECE
     * In synchronization with the 4 Particle States:
     * - Phrase 1: "Happy Birthday to you" (sync with "HAPPY")
     * - Phrase 2: "Happy Birthday to you" (sync with "BIRTHDAY")
     * - Phrase 3: "Happy Birthday Dear Pyaari Didi..." (sync with "PYAARI DIDI" climax)
     * - Phrase 4: "Happy Birthday to you!" (sync with "1M QUEEN")
     */
    playHappyBirthdayPyaariDidi() {
        const offset = 1400; // Starts right as "HAPPY" assembles

        const melody = [
            // --- PHRASE 1: "Hap-py Birth-day to you" (1.4s to 4.5s) ---
            { f: 261.63, wait: offset + 0, d: 1.2, v: 0.085 },    // C4 - Hap-
            { f: 261.63, wait: offset + 380, d: 1.2, v: 0.085 },  // C4 - -py
            { f: 293.66, wait: offset + 760, d: 1.5, v: 0.090 },  // D4 - Birth-
            { f: 261.63, wait: offset + 1350, d: 1.5, v: 0.090 }, // C4 - -day
            { f: 349.23, wait: offset + 1950, d: 1.5, v: 0.095 }, // F4 - to
            { f: 329.63, wait: offset + 2550, d: 2.2, v: 0.095 }, // E4 - you~
            // Bass Harmony (C Major)
            { f: 130.81, wait: offset + 0, d: 2.8, v: 0.045 },    // C3
            { f: 196.00, wait: offset + 1950, d: 2.5, v: 0.045 }, // G3

            // --- PHRASE 2: "Hap-py Birth-day to you" (4.6s to 7.7s) ---
            { f: 261.63, wait: offset + 3300, d: 1.2, v: 0.085 }, // C4 - Hap-
            { f: 261.63, wait: offset + 3680, d: 1.2, v: 0.085 }, // C4 - -py
            { f: 293.66, wait: offset + 4060, d: 1.5, v: 0.090 }, // D4 - Birth-
            { f: 261.63, wait: offset + 4650, d: 1.5, v: 0.090 }, // C4 - -day
            { f: 392.00, wait: offset + 5250, d: 1.5, v: 0.095 }, // G4 - to
            { f: 349.23, wait: offset + 5850, d: 2.2, v: 0.095 }, // F4 - you~
            // Bass Harmony (G Major -> F Major)
            { f: 146.83, wait: offset + 3300, d: 2.8, v: 0.045 }, // D3
            { f: 174.61, wait: offset + 5250, d: 2.5, v: 0.045 }, // F3

            // --- PHRASE 3: THE HEARTFELT CLIMAX: "Hap-py Birth-day Dear Pyaa-ri Di-di..." 💖👑 (7.8s to 12.0s) ---
            { f: 261.63, wait: offset + 6650, d: 1.2, v: 0.090 }, // C4 - Hap-
            { f: 261.63, wait: offset + 7030, d: 1.2, v: 0.090 }, // C4 - -py
            { f: 523.25, wait: offset + 7410, d: 2.0, v: 0.110 }, // C5 - Birth- (High emotional octave leap!)
            { f: 440.00, wait: offset + 8150, d: 1.8, v: 0.098 }, // A4 - -day
            { f: 349.23, wait: offset + 8850, d: 1.6, v: 0.095 }, // F4 - Dear / Me-
            { f: 329.63, wait: offset + 9450, d: 1.6, v: 0.095 }, // E4 - -ri
            { f: 293.66, wait: offset + 10050, d: 2.4, v: 0.100 },// D4 - Pyaa-ri Di-di~ 🌸
            // Rich Bass & Chords (F Major & D Minor warmth)
            { f: 174.61, wait: offset + 6650, d: 3.0, v: 0.050 }, // F3
            { f: 220.00, wait: offset + 7410, d: 2.5, v: 0.045 }, // A3
            { f: 146.83, wait: offset + 9450, d: 2.8, v: 0.048 }, // D3

            // --- PHRASE 4: "Hap-py Birth-day to you!" (12.1s to 15.6s) ---
            { f: 466.16, wait: offset + 11050, d: 1.3, v: 0.095 },// Bb4 - Hap-
            { f: 466.16, wait: offset + 11430, d: 1.3, v: 0.095 },// Bb4 - -py
            { f: 440.00, wait: offset + 11810, d: 1.5, v: 0.095 },// A4 - Birth-
            { f: 349.23, wait: offset + 12400, d: 1.5, v: 0.095 },// F4 - -day
            { f: 392.00, wait: offset + 13000, d: 1.6, v: 0.100 },// G4 - to
            { f: 349.23, wait: offset + 13600, d: 3.2, v: 0.110 },// F4 - you! 💖 (Grand sustained final chord)
            // Grand Finishing Piano Chord: F2 + C3 + F3 + A3 + C4
            { f: 87.31, wait: offset + 13600, d: 3.5, v: 0.060 },  // F2
            { f: 130.81, wait: offset + 13600, d: 3.5, v: 0.050 }, // C3
            { f: 174.61, wait: offset + 13600, d: 3.5, v: 0.050 }, // F3
            { f: 220.00, wait: offset + 13600, d: 3.5, v: 0.050 }  // A3
        ];

        melody.forEach(n => {
            this.schedule(() => this.playPianoNote(n.f, n.d, n.v), n.wait);
        });

        // After the main song finishes, start gentle soothing piano ambient chords
        this.schedule(() => {
            this.startAmbientPianoFlow();
        }, offset + 17200);
    }

    startAmbientPianoFlow() {
        if (!this.isPlaying) return;

        // Rich, relaxing ambient piano progressions (Fmaj7 -> Cmaj9 -> Dm7 -> Gsus4)
        const progressions = [
            [174.61, 220.00, 261.63, 329.63], // Fmaj7
            [130.81, 196.00, 246.94, 293.66], // Cmaj9
            [146.83, 174.61, 220.00, 261.63], // Dm7
            [98.00, 146.83, 196.00, 246.94]   // G7
        ];

        const chord = progressions[this.ambientIndex % progressions.length];
        this.ambientIndex++;

        // Gentle arpeggio style
        chord.forEach((freq, idx) => {
            this.schedule(() => {
                this.playPianoNote(freq, 3.2, 0.035);
            }, idx * 180);
        });

        // If after 4 ambient chords, repeat the "Happy Birthday Pyaari Didi" melody gently
        if (this.ambientIndex % 8 === 0) {
            this.ambientTimer = setTimeout(() => {
                if (this.isPlaying) this.playHappyBirthdayPyaariDidi();
            }, 4200);
        } else {
            this.ambientTimer = setTimeout(() => {
                if (this.isPlaying) this.startAmbientPianoFlow();
            }, 3800);
        }
    }

    playCelebrationFanfare() {
        if (!this.ctx) return;
        const notes = [
            { f: 523.25, d: 1.0, v: 0.09 }, // C5
            { f: 659.25, d: 1.0, v: 0.09 }, // E5
            { f: 783.99, d: 1.2, v: 0.10 }, // G5
            { f: 1046.50, d: 2.2, v: 0.12 } // C6
        ];
        notes.forEach((n, idx) => {
            setTimeout(() => {
                this.playPianoNote(n.f, n.d, n.v);
            }, idx * 110);
        });
    }
}

const audioSynth = new BirthdaySynthesizer();

// --- Interactive Sparks & Micro-Fireworks ---
class FireworkSpark {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.alpha = 1;
        this.size = 1.5;
        this.color = '#ffd700';
        this.decay = 0.025;
    }

    init(x, y, color, vx, vy, decay = 0.025, size = 1.5) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.decay = decay;
        this.size = size;
        this.alpha = 1.0;
        this.active = true;
    }

    update() {
        if (!this.active) return;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy = this.vy * 0.96 + 0.06;
        this.alpha -= this.decay;
        if (this.alpha <= 0) {
            this.active = false;
        }
    }

    draw(context) {
        if (!this.active || this.alpha <= 0.02) return;
        context.save();
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}

const fireworksPool = [];
for (let i = 0; i < 150; i++) {
    fireworksPool.push(new FireworkSpark());
}

function spawnHeartFirework(x, y, count = 20) {
    const palette = CONFIG.palette;
    let spawned = 0;

    for (let i = 0; i < fireworksPool.length && spawned < count; i++) {
        const spark = fireworksPool[i];
        if (!spark.active) {
            const angle = (spawned / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
            const speed = 2.5 + Math.random() * 4.0;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const color = palette[Math.floor(Math.random() * palette.length)];
            const size = 1.2 + Math.random() * 1.4;
            const decay = 0.022 + Math.random() * 0.018;

            spark.init(x, y, color, vx, vy, decay, size);
            spawned++;
        }
    }
}

// --- Floating Petals (Soft, delicate background atmosphere) ---
class FloatingPetal {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 80;
        this.size = 4 + Math.random() * 5;
        this.speedY = 0.6 + Math.random() * 0.8;
        this.speedX = 0.2 + Math.random() * 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.color = ['#ff2a6d', '#ffd700', '#ff758c', '#e056fd'][Math.floor(Math.random() * 4)];
        this.alpha = 0.18 + Math.random() * 0.22;
        this.wobbleSpeed = 0.002 + Math.random() * 0.002;
    }
    update(now) {
        this.y += this.speedY;
        this.x += Math.sin(now * this.wobbleSpeed) * this.speedX;
        this.angle += this.rotSpeed;
        if (this.y > height + 25) this.reset();
    }
    draw(context) {
        context.save();
        context.globalAlpha = this.alpha;
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.fillStyle = this.color;
        context.beginPath();
        context.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}

const floatingPetals = [];
for (let i = 0; i < 12; i++) {
    floatingPetals.push(new FloatingPetal());
}

// --- Precision Micro-Particle Class ---
class MicroParticle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.targetX = width / 2;
        this.targetY = height / 2;
        this.size = 1.5;
        this.color = '#ffd700';
        this.sprite = null;
        this.alpha = 0.9;
        this.active = true;
        this.phase = Math.random() * Math.PI * 2;
    }

    setTarget(tx, ty, color, size = 1.5, giveBurst = true) {
        this.targetX = tx;
        this.targetY = ty;
        this.color = color;
        this.size = size;
        this.sprite = getMicroDotSprite(color, size);
        this.active = true;

        if (giveBurst) {
            // Controlled organic impulse so stardust smoothly streams between shapes
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.8 + Math.random() * 3.8;
            this.vx += Math.cos(angle) * speed;
            this.vy += Math.sin(angle) * speed;
        }
    }

    spawnSwirlVortex() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.min(width, height) * (0.35 + Math.random() * 0.4);
        this.targetX = width / 2 + Math.cos(angle) * radius;
        this.targetY = height / 2 + Math.sin(angle) * radius;
        this.x = width / 2 + Math.cos(angle + 1.2) * (radius * 1.5);
        this.y = height / 2 + Math.sin(angle + 1.2) * (radius * 1.5);
        this.color = CONFIG.palette[Math.floor(Math.random() * CONFIG.palette.length)];
        this.size = 1.3 + Math.random() * 0.5;
        this.sprite = getMicroDotSprite(this.color, this.size);
        this.active = true;
        this.alpha = 0.85;
    }

    explodeOutward() {
        const cx = width / 2;
        const cy = height / 2;
        const angle = Math.atan2(this.y - cy, this.x - cx) + (Math.random() - 0.5) * 0.4;
        const force = 3.5 + Math.random() * 5.0;
        this.vx = Math.cos(angle) * force;
        this.vy = Math.sin(angle) * force;
    }

    update(now, heartBeatScale = 1.0) {
        if (!this.active) return;

        if (stateSubPhase === 'morphing') {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 35) {
                // Stream toward target position
                this.vx = this.vx * 0.90 + (dx / dist) * 1.8;
                this.vy = this.vy * 0.90 + (dy / dist) * 1.8;
            } else {
                // Settle smoothly into place
                this.vx = this.vx * 0.68 + dx * 0.20;
                this.vy = this.vy * 0.68 + dy * 0.20;
            }

            this.x += this.vx;
            this.y += this.vy;
            this.alpha = Math.min(0.95, this.alpha + 0.05);
        } else if (stateSubPhase === 'holding') {
            // LIVING MICRO-FLUTTER: subtle breathing of ±0.45px (Letters stay razor-sharp and legible!)
            const flutterX = Math.sin(now * 0.0032 + this.phase) * 0.45;
            const flutterY = Math.cos(now * 0.0042 + this.phase) * 0.45;

            const cx = width / 2;
            const cy = height / 2;
            const finalTx = cx + (this.targetX - cx) * heartBeatScale + flutterX;
            const finalTy = cy + (this.targetY - cy) * heartBeatScale + flutterY;

            this.vx = this.vx * 0.50 + (finalTx - this.x) * 0.25;
            this.vy = this.vy * 0.50 + (finalTy - this.y) * 0.25;

            this.x += this.vx;
            this.y += this.vy;
            this.alpha = 0.92;
        } else if (stateSubPhase === 'dispersing') {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 1.03;
            this.vy *= 1.03;
            this.alpha *= 0.93;
        }
    }

    draw(context) {
        if (!this.active || this.alpha <= 0.04 || !this.sprite) return;
        context.globalAlpha = this.alpha;
        context.drawImage(
            this.sprite.canvas,
            this.x - this.sprite.halfDim,
            this.y - this.sprite.halfDim
        );
    }
}

// Total 2,200 High-Density Micro-Particles for crystal-clear stardust typography
const MAX_MICRO_PARTICLES = 2200;
const particles = [];
for (let i = 0; i < MAX_MICRO_PARTICLES; i++) {
    particles.push(new MicroParticle());
}

const pointsCache = {};
function clearPointsCache() {
    for (let key in pointsCache) delete pointsCache[key];
}

/**
 * Precision Typography Point Extraction Logic:
 * - Automatically scales text to fit gracefully on both mobile & desktop
 * - Stacks multi-word phrases (e.g. "PYAARI DIDI") into 2 lines for giant, readable, majestic letters
 * - Samples pixels on a fine 2.0px grid
 * - Distributes 2,200 pinpoint micro-particles evenly across letter strokes
 */
function sampleTextMicroPoints(lines, targetCount = MAX_MICRO_PARTICLES) {
    const cacheKey = `${lines.join('_')}_${width}_${height}`;
    if (pointsCache[cacheKey]) return pointsCache[cacheKey];

    const rCanvas = document.createElement('canvas');
    const rCtx = rCanvas.getContext('2d');
    rCanvas.width = width;
    rCanvas.height = height;

    const fontFam = "'Montserrat', 'Outfit', sans-serif";
    const isStacked = lines.length > 1;

    // Responsive font calculation
    const maxW = width * 0.84;
    let fontSize = isStacked
        ? Math.min(width * 0.16, height * 0.17, 145)
        : Math.min(width * 0.17, height * 0.26, 210);

    // Adjust font size so all lines fit horizontally with comfortable margin
    rCtx.font = `900 ${fontSize}px ${fontFam}`;
    for (const line of lines) {
        const w = rCtx.measureText(line).width;
        if (w > maxW) {
            fontSize *= (maxW / w);
            rCtx.font = `900 ${fontSize}px ${fontFam}`;
        }
    }

    const lineHeight = fontSize * 1.16;
    const totalBlockH = lineHeight * lines.length;
    const startY = (height - totalBlockH) / 2 + lineHeight * 0.5;

    rCtx.clearRect(0, 0, width, height);
    rCtx.font = `900 ${fontSize}px ${fontFam}`;
    rCtx.textAlign = 'center';
    rCtx.textBaseline = 'middle';
    rCtx.fillStyle = '#ffffff';

    lines.forEach((line, idx) => {
        rCtx.fillText(line, width / 2, startY + idx * lineHeight);
    });

    // Scan pixel data on a fine 2px micro-grid
    const imgData = rCtx.getImageData(0, 0, width, height).data;
    const coords = [];
    const step = 2;

    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            const idx = (y * width + x) * 4 + 3;
            if (imgData[idx] > 110) {
                coords.push({
                    x: x + (Math.random() - 0.5) * 0.6,
                    y: y + (Math.random() - 0.5) * 0.6
                });
            }
        }
    }

    if (coords.length === 0) return [];

    const result = [];
    const palette = CONFIG.palette;
    for (let i = 0; i < targetCount; i++) {
        const sIdx = Math.floor((i / targetCount) * coords.length);
        const pt = coords[sIdx];
        const color = palette[i % palette.length];
        const size = 1.3 + (i % 3) * 0.25; // 1.3px to 1.8px micro-dot
        result.push({
            x: pt.x,
            y: pt.y,
            color: color,
            size: size
        });
    }

    pointsCache[cacheKey] = result;
    return result;
}

function buildTargetPointsForState(state, giveBurst = true) {
    let points = [];

    if (state === PARTICLE_STATES.FORM_HAPPY) {
        points = sampleTextMicroPoints(['HAPPY']);
    } else if (state === PARTICLE_STATES.FORM_BIRTHDAY) {
        points = sampleTextMicroPoints(['BIRTHDAY']);
    } else if (state === PARTICLE_STATES.FORM_PYAARI_DIDI) {
        // Stacking "PYAARI" on line 1 and "DIDI" on line 2 gives massive, crystal-clear readability
        points = sampleTextMicroPoints(['PYAARI', 'DIDI']);
    } else if (state === PARTICLE_STATES.FORM_QUEEN) {
        points = sampleTextMicroPoints(['1M QUEEN']);
    } else if (state === PARTICLE_STATES.FINALE_CANVAS) {
        points = [];
    }

    if (points.length === 0) return;

    const total = Math.min(points.length, MAX_MICRO_PARTICLES);
    for (let i = 0; i < total; i++) {
        const pt = points[i];
        particles[i].setTarget(pt.x, pt.y, pt.color, pt.size, giveBurst);
    }
}

// Quote Ribbon UI
const quoteRibbon = document.getElementById('romanticQuote');
const quoteText = document.getElementById('quoteText');

function updateQuoteForState(state) {
    if (!quoteRibbon || !quoteText) return;
    const text = QUOTES[state];
    if (text) {
        quoteRibbon.classList.remove('hidden');
        quoteText.textContent = text;
    } else {
        quoteRibbon.classList.add('hidden');
    }
}

function switchParticleState(newState) {
    currentParticleState = newState;
    stateStartTime = performance.now();
    subPhaseStartTime = stateStartTime;
    stateSubPhase = 'morphing';

    updateQuoteForState(newState);

    if (newState === PARTICLE_STATES.SWIRL) {
        for (let i = 0; i < particles.length; i++) {
            particles[i].spawnSwirlVortex();
        }
    } else if (newState >= PARTICLE_STATES.FORM_HAPPY && newState <= PARTICLE_STATES.FORM_QUEEN) {
        buildTargetPointsForState(newState, true);
    } else if (newState === PARTICLE_STATES.FINALE_CANVAS) {
        audioSynth.playCelebrationFanfare();
        for (let i = 0; i < particles.length; i++) {
            particles[i].explodeOutward();
        }
        spawnHeartFirework(width / 2, height * 0.45, 30);
        setTimeout(() => {
            goToChapter(1);
        }, 1100);
    }
}

// --- Main Canvas Animation Loop ---
function animate(now) {
    requestAnimationFrame(animate);

    // High-contrast clean clear: preserves velvet deep black (#07040d) & eliminates blinding haze buildup
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(7, 4, 13, 0.76)';
    ctx.fillRect(0, 0, width, height);

    // 1. Floating Petals
    for (let i = 0; i < floatingPetals.length; i++) {
        floatingPetals[i].update(now);
        floatingPetals[i].draw(ctx);
    }

    // 2. Fireworks Sparks
    for (let i = 0; i < fireworksPool.length; i++) {
        if (fireworksPool[i].active) {
            fireworksPool[i].update();
            fireworksPool[i].draw(ctx);
        }
    }

    // When chapter DOM card is open, skip micro-particle typography updates
    if (currentChapterIndex >= 1) return;

    const beatPhase = (now % 1200) / 1200 * Math.PI * 2;
    const heartBeatScale = 1.0 + (Math.pow(Math.sin(beatPhase), 16) * 0.035);
    const timeInState = now - stateStartTime;

    // 1. Opening Swirl State
    if (currentParticleState === PARTICLE_STATES.SWIRL) {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(now, 1.0);
            particles[i].draw(ctx);
        }

        if (timeInState > CONFIG.swirlDuration) {
            switchParticleState(PARTICLE_STATES.FORM_HAPPY);
        }
    }
    // 2. Micro-Particle Typography ("HAPPY", "BIRTHDAY", "PYAARI DIDI", "1M QUEEN")
    else if (currentParticleState >= PARTICLE_STATES.FORM_HAPPY && currentParticleState <= PARTICLE_STATES.FORM_QUEEN) {
        const timeInSubPhase = now - subPhaseStartTime;
        const currentHoldDuration = currentParticleState === PARTICLE_STATES.FORM_PYAARI_DIDI
            ? CONFIG.pyaariHoldDuration
            : CONFIG.holdDuration;

        if (stateSubPhase === 'morphing') {
            if (timeInSubPhase > CONFIG.morphDuration) {
                stateSubPhase = 'holding';
                subPhaseStartTime = now;
            }
        } else if (stateSubPhase === 'holding') {
            if (timeInSubPhase > currentHoldDuration) {
                stateSubPhase = 'dispersing';
                subPhaseStartTime = now;
                for (let i = 0; i < particles.length; i++) {
                    particles[i].explodeOutward();
                }
            }
        } else if (stateSubPhase === 'dispersing') {
            if (timeInSubPhase > CONFIG.disperseDuration) {
                switchParticleState(currentParticleState + 1);
            }
        }

        // Render crisp pinpoint micro-particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(now, heartBeatScale);
            particles[i].draw(ctx);
        }
    }
}

// --- CHAPTER NAVIGATION MANAGER ---
const journeyNav = document.getElementById('journeyNav');
const chaptersContainer = document.getElementById('chaptersContainer');
const chapterElements = [
    null,
    document.getElementById('chapterCreator'),
    document.getElementById('chapterMemories'),
    document.getElementById('chapterCake'),
    document.getElementById('chapterLetter'),
    document.getElementById('chapterFinale')
];

function goToChapter(index) {
    currentChapterIndex = index;

    // Update Navigation Pills
    document.querySelectorAll('.nav-step').forEach(step => {
        const stepIdx = parseInt(step.getAttribute('data-chapter'), 10);
        if (stepIdx === index) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    if (index === 0) {
        // Return to Particle Experience
        if (chaptersContainer) chaptersContainer.classList.add('hidden');
        chapterElements.forEach(el => el && el.classList.add('hidden'));
        audioSynth.start();
        switchParticleState(PARTICLE_STATES.SWIRL);
    } else {
        // Open Specific Story Chapter
        if (chaptersContainer) chaptersContainer.classList.remove('hidden');
        chapterElements.forEach((el, idx) => {
            if (!el) return;
            if (idx === index) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });

        if (quoteRibbon) quoteRibbon.classList.add('hidden');

        // Fanfare sound on chapter change
        audioSynth.playChime(523.25 + index * 65, 0.08);
        spawnHeartFirework(width / 2, height * 0.35, 18);
    }
}

document.querySelectorAll('.nav-step').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = parseInt(btn.getAttribute('data-chapter'), 10);
        goToChapter(target);
    });
});

document.querySelectorAll('.next-chapter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = parseInt(btn.getAttribute('data-target'), 10);
        goToChapter(target);
    });
});

// --- CHEEKY LOADING SCREEN (2-STEP INTERACTIVE PAUSE & REVEAL) ---
const startOverlay = document.getElementById('startOverlay');
const cheekyHeading = document.getElementById('cheekyHeading');
const cheekySubtext = document.getElementById('cheekySubtext');
const loaderBarWrap = document.getElementById('loaderBarWrap');
const loaderBarFill = document.getElementById('loaderBarFill');
const loaderPercent = document.getElementById('loaderPercent');
const btnCheekyNext = document.getElementById('btnCheekyNext');
const startPromptPill = document.getElementById('startPromptPill');

let loaderPhase = 1; // 1: Initial progress -> 2: Paused at "Wait... Annu Didi?" -> 3: Revealed Pyaari Didi & 100% ready

function runCheekyLoader() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (progress > 45) progress = 45;

        loaderBarFill.style.width = `${progress}%`;
        loaderPercent.textContent = `${progress}%`;

        // At 45%, PAUSE and show the interactive "Wait... Annu Didi?" button
        if (progress >= 45) {
            clearInterval(interval);
            loaderPhase = 2; // Paused state

            cheekyHeading.textContent = "Wait... 'Annu Didi'? 🤔";
            cheekySubtext.textContent = "Ek second ruko... kuch to gadbad hai!";
            cheekyHeading.classList.remove('highlight-pyaari');

            if (loaderPercent) loaderPercent.style.display = 'none';
            if (btnCheekyNext) btnCheekyNext.classList.remove('hidden');
        }
    }, 36);
}

function handleCheekyStepClick() {
    if (loaderPhase === 2) {
        // User clicked "Wait... 'Annu Didi'?" button!
        loaderPhase = 3;

        if (btnCheekyNext) btnCheekyNext.classList.add('hidden');

        // Reveal with glowing script font, celebratory chime & sparkles
        cheekyHeading.textContent = "No no... Pyaari Didi for you! 💖🌸👑";
        cheekySubtext.textContent = "Ab hui na sahi baat! ✨ Unlocking celebration...";
        cheekyHeading.classList.add('highlight-pyaari');

        audioSynth.playChime(783.99, 0.1);
        spawnHeartFirework(width / 2, height * 0.45, 22);

        // Animate remaining progress from 45% to 100%
        let progress = 45;
        const completeInterval = setInterval(() => {
            progress += 3;
            if (progress > 100) progress = 100;

            loaderBarFill.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(completeInterval);
                loaderPhase = 4; // 100% Ready

                if (loaderBarWrap) loaderBarWrap.style.display = 'none';
                if (startPromptPill) startPromptPill.classList.remove('hidden');
            }
        }, 25);
    } else if (loaderPhase === 4) {
        startCelebration();
    }
}

function startCelebration() {
    startOverlay.classList.add('hidden');
    journeyNav.classList.remove('hidden');
    audioSynth.start();
    switchParticleState(PARTICLE_STATES.SWIRL);

    const tapHint = document.getElementById('tapHint');
    setTimeout(() => {
        if (tapHint) tapHint.style.opacity = '0';
    }, 6000);
}

if (btnCheekyNext) {
    btnCheekyNext.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCheekyStepClick();
    });
}

if (startPromptPill) {
    startPromptPill.addEventListener('click', (e) => {
        e.stopPropagation();
        startCelebration();
    });
}

startOverlay.addEventListener('click', () => {
    if (loaderPhase === 2) {
        handleCheekyStepClick();
    } else if (loaderPhase === 4) {
        startCelebration();
    }
});

// --- POLAROID FILTER SWITCHER & LIGHTBOX ---
document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterType = pill.getAttribute('data-filter');
        document.querySelectorAll('.polaroid-img').forEach(img => {
            img.className = `polaroid-img filter-${filterType}`;
        });
    });
});

const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.polaroid-card').forEach(card => {
    card.addEventListener('click', () => {
        const src = card.getAttribute('data-lightbox');
        const cap = card.getAttribute('data-caption');
        lightboxImg.src = src;
        lightboxCaption.textContent = cap;
        lightboxModal.classList.remove('hidden');
        audioSynth.playChime(659.25, 0.08);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.add('hidden');
    });
}
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
            lightboxModal.classList.add('hidden');
        }
    });
}

// --- CHAPTER 3: CAKE CANDLE BLOW ---
const candleFlame = document.getElementById('candleFlame');
const candleSmoke = document.getElementById('candleSmoke');
const btnBlowCandle = document.getElementById('btnBlowCandle');
const cakeInteractive = document.getElementById('cakeInteractive');
const wishGrantedBanner = document.getElementById('wishGrantedBanner');
const cakeInstruction = document.getElementById('cakeInstruction');
let candleBlown = false;

function blowOutCandle() {
    if (candleBlown) return;
    candleBlown = true;

    candleFlame.classList.add('blown');
    candleSmoke.classList.add('active');

    if (cakeInstruction) {
        cakeInstruction.textContent = "🕯️ Candle Blown! Wish Sent To The Stars! 🌟";
    }

    if (btnBlowCandle) {
        btnBlowCandle.style.display = 'none';
    }

    triggerMegaFireworks();
    audioSynth.playCelebrationFanfare();

    setTimeout(() => {
        wishGrantedBanner.classList.remove('hidden');
    }, 1000);
}

if (btnBlowCandle) {
    btnBlowCandle.addEventListener('click', blowOutCandle);
}
if (cakeInteractive) {
    cakeInteractive.addEventListener('click', blowOutCandle);
}

// --- CHAPTER 4: WAX SEAL ENVELOPE OPENING ---
const envelopeSeal = document.getElementById('envelopeSeal');
const letterEnvelope = document.getElementById('letterEnvelope');
const letterPaper = document.getElementById('letterPaper');

function openLetterEnvelope() {
    if (letterEnvelope) {
        letterEnvelope.style.transform = 'scale(0.8) translateY(-30px)';
        letterEnvelope.style.opacity = '0';
        setTimeout(() => {
            letterEnvelope.style.display = 'none';
            if (letterPaper) letterPaper.classList.remove('hidden');
            spawnHeartFirework(width / 2, height * 0.4, 25);
            audioSynth.playCelebrationFanfare();
        }, 300);
    }
}

if (envelopeSeal) {
    envelopeSeal.addEventListener('click', openLetterEnvelope);
}
if (letterEnvelope) {
    letterEnvelope.addEventListener('click', openLetterEnvelope);
}

// --- CHAPTER 5: FINALE ACTIONS ---
const btnFinaleConfetti = document.getElementById('btnFinaleConfetti');
const btnReplayAll = document.getElementById('btnReplayAll');

function triggerMegaFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const rx = width * (0.15 + Math.random() * 0.7);
            const ry = height * (0.15 + Math.random() * 0.5);
            spawnHeartFirework(rx, ry, 24);
            audioSynth.playInteractiveHarp(ry / height);
        }, i * 200);
    }
}

if (btnFinaleConfetti) {
    btnFinaleConfetti.addEventListener('click', triggerMegaFireworks);
}
if (btnReplayAll) {
    btnReplayAll.addEventListener('click', () => {
        candleBlown = false;
        if (candleFlame) candleFlame.classList.remove('blown');
        if (candleSmoke) candleSmoke.classList.remove('active');
        if (wishGrantedBanner) wishGrantedBanner.classList.add('hidden');
        if (btnBlowCandle) btnBlowCandle.style.display = 'inline-block';
        if (letterEnvelope) {
            letterEnvelope.style.display = 'flex';
            letterEnvelope.style.transform = 'none';
            letterEnvelope.style.opacity = '1';
        }
        if (letterPaper) letterPaper.classList.add('hidden');
        goToChapter(0);
    });
}

// --- TOP CONTROLS ---
const btnMusic = document.getElementById('btnMusic');
const btnConfetti = document.getElementById('btnConfetti');
const btnRestart = document.getElementById('btnRestart');
const btnFullscreen = document.getElementById('btnFullscreen');

if (btnMusic) {
    btnMusic.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audioSynth.isPlaying) {
            audioSynth.stop();
            btnMusic.innerHTML = '<span class="icon">🔇</span><span class="btn-label">Muted</span>';
        } else {
            audioSynth.start();
            btnMusic.innerHTML = '<span class="icon">🎵</span><span class="btn-label">Music</span>';
        }
    });
}

if (btnConfetti) {
    btnConfetti.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerMegaFireworks();
    });
}

if (btnRestart) {
    btnRestart.addEventListener('click', (e) => {
        e.stopPropagation();
        goToChapter(0);
    });
}

if (btnFullscreen) {
    btnFullscreen.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    });
}

// --- KEYBOARD CONTROLS ---
window.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        if (btnMusic) btnMusic.click();
    } else if (e.key === 'c' || e.key === 'C') {
        triggerMegaFireworks();
    } else if (e.key === 'f' || e.key === 'F') {
        if (btnFullscreen) btnFullscreen.click();
    } else if (e.key === 'r' || e.key === 'R') {
        goToChapter(0);
    } else if (e.key === 'ArrowRight') {
        const next = Math.min(5, currentChapterIndex + 1);
        goToChapter(next);
    } else if (e.key === 'ArrowLeft') {
        const prev = Math.max(0, currentChapterIndex - 1);
        goToChapter(prev);
    }
});

// --- INTERACTIVE TOUCH & CLICK STARDUST ---
function handleTouchFirework(x, y) {
    spawnHeartFirework(x, y, 16);
    audioSynth.playInteractiveHarp(y / height);
}

let lastMoveTime = 0;
window.addEventListener('click', (e) => {
    if (e.target.closest('.top-controls') ||
        e.target.closest('.journey-nav') ||
        e.target.closest('.overlay') ||
        e.target.closest('button') ||
        e.target.closest('.polaroid-card') ||
        e.target.closest('.envelope') ||
        e.target.closest('.cake-container') ||
        e.target.closest('.lightbox-content')) {
        return;
    }
    handleTouchFirework(e.clientX, e.clientY);
});

window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastMoveTime > 120) {
        if (e.target.closest('.chapter-card') || e.target.closest('.overlay')) return;
        spawnHeartFirework(e.clientX, e.clientY, 2);
        lastMoveTime = now;
    }
});

window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (e.target.closest('.top-controls') ||
            e.target.closest('.journey-nav') ||
            e.target.closest('.overlay') ||
            e.target.closest('button') ||
            e.target.closest('.polaroid-card') ||
            e.target.closest('.envelope') ||
            e.target.closest('.cake-container')) {
            return;
        }
        handleTouchFirework(touch.clientX, touch.clientY);
    }
}, { passive: true });

// --- START ENGINE ---
if (document.fonts) {
    document.fonts.ready.then(() => {
        resize();
        requestAnimationFrame(animate);
        runCheekyLoader();
    });
} else {
    resize();
    requestAnimationFrame(animate);
    runCheekyLoader();
}
