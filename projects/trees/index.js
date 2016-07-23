// That's right... I'm using gobals... *gasp*
let width;
let height;
let canvas;
let ctx;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255,255,200)';
    ctx.fillRect(0, 0, width, height);
    mainLoop([create()]);
};

function mainLoop(particles) {
    let nextParticles = [];

    requestAnimationFrame(function() {
        mainLoop(nextParticles);
    });

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let i = 0, len = particles.length; i < len; i++) {
        renderParticle(particles[i]);
        updateParticle(particles[i], nextParticles);
    }

}

function renderParticle(p) {
}

function updateParticle(p, nextParticles) {
}

// A newborn branch. Isn't it cute?
function create() {
    return {
        x: Math.random() * width,
        y: height + 5,
        angle: -Math.PI / 2,
        radius: Math.random() * 20 + 20,
    };
}
