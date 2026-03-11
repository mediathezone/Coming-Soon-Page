const canvas = document.getElementById("pagebg");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let tick = 0;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawBase() {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#0d7582");
    bg.addColorStop(0.28, "#17653c");
    bg.addColorStop(0.58, "#061312");
    bg.addColorStop(1, "#000000");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        0,
        width * 0.5,
        height * 0.25,
        Math.max(width, height) * 0.38
    );
    glow.addColorStop(0, "rgba(70,255,100,0.16)");
    glow.addColorStop(0.3, "rgba(70,255,100,0.07)");
    glow.addColorStop(0.7, "rgba(0,0,0,0)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
}

function drawWave(options) {
    const {
        y,
        amplitude,
        wavelength,
        speed,
        lineWidth,
        color,
        blur,
        phase
    } = options;

    ctx.save();
    ctx.beginPath();

    for (let x = 0; x <= width; x += 3) {
        const waveY =
            y +
            Math.sin((x / wavelength) + tick * speed + phase) * amplitude +
            Math.sin((x / (wavelength * 0.55)) + tick * speed * 1.35 + phase) * (amplitude * 0.35);

        if (x === 0) {
            ctx.moveTo(x, waveY);
        } else {
            ctx.lineTo(x, waveY);
        }
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.restore();
}

function drawMist() {
    const mist = ctx.createLinearGradient(0, height * 0.48, 0, height);
    mist.addColorStop(0, "rgba(0,255,140,0.02)");
    mist.addColorStop(0.25, "rgba(0,255,140,0.05)");
    mist.addColorStop(0.6, "rgba(0,0,0,0.12)");
    mist.addColorStop(1, "rgba(0,0,0,0.7)");

    ctx.fillStyle = mist;
    ctx.fillRect(0, height * 0.45, width, height * 0.55);
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    drawBase();
    drawMist();

    drawWave({
        y: height * 0.56,
        amplitude: 10,
        wavelength: 170,
        speed: 0.010,
        lineWidth: 1.5,
        color: "rgba(0,255,190,0.18)",
        blur: 8,
        phase: 0
    });

    drawWave({
        y: height * 0.60,
        amplitude: 16,
        wavelength: 220,
        speed: 0.008,
        lineWidth: 2,
        color: "rgba(0,255,120,0.14)",
        blur: 10,
        phase: 1.2
    });

    drawWave({
        y: height * 0.66,
        amplitude: 24,
        wavelength: 280,
        speed: 0.006,
        lineWidth: 2.2,
        color: "rgba(0,200,255,0.12)",
        blur: 12,
        phase: 2.1
    });

    drawWave({
        y: height * 0.73,
        amplitude: 34,
        wavelength: 340,
        speed: 0.0045,
        lineWidth: 2.5,
        color: "rgba(0,255,120,0.08)",
        blur: 16,
        phase: 0.7
    });

    tick += 1;
    requestAnimationFrame(animate);
}

animate();