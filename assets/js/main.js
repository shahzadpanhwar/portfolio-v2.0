window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    setTimeout(()=>{

        loader.classList.add("hidden");

    },1000);

});

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 20;
        const rotateX = -(y - rect.height / 2) / 20;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});

function animateCounter(id, end, suffix = "") {

    const el = document.getElementById(id);

    if (!el) return;

    let start = 0;

    const speed = 25;

    const timer = setInterval(() => {

        start++;

        el.textContent = start + suffix;

        if (start >= end) {

            clearInterval(timer);

        }

    }, speed);

}

window.addEventListener("load", () => {

    animateCounter("projects-count", 10, "+");

    animateCounter("tech-count", 7, "+");

});

const orb = document.querySelector(".ai-button");

document.addEventListener("mousemove", (e) => {

    if (!orb) return;

    const rect = orb.getBoundingClientRect();

    const orbX = rect.left + rect.width / 2;
    const orbY = rect.top + rect.height / 2;

    const dx = e.clientX - orbX;
    const dy = e.clientY - orbY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 180) {

        orb.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px) scale(1.08)`;

    } else {

        orb.style.transform = "translate(0,0)";

    }

});