const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = (Math.random() - 0.5) * 0.22;
        this.vy = (Math.random() - 0.5) * 0.22;

        this.size = 2;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#58A6FF";
        ctx.fillStyle = "rgba(255,255,255,.75)";

        ctx.fill();

    }

}

for (let i = 0; i < 140; i++) {

    particles.push(new Particle());

}

function connect() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {

                ctx.beginPath();

                ctx.strokeStyle = `rgba(120,190,255,${1-distance/140})`;

                ctx.lineWidth = 1.3;

                ctx.moveTo(particles[a].x, particles[a].y);

                ctx.lineTo(particles[b].x, particles[b].y);

                ctx.stroke();

            }

        }

    }

}

function mouseLines() {

    if (!mouse.x) return;

    particles.forEach(p => {

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {

            ctx.beginPath();

            ctx.strokeStyle = `rgba(255,255,255,${1-dist/180})`;

            ctx.moveTo(mouse.x, mouse.y);

            ctx.lineTo(p.x, p.y);

            ctx.stroke();

        }

    });

}

function animate() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.update();

        p.draw();

    });

    connect();

    mouseLines();

    requestAnimationFrame(animate);

}

animate();