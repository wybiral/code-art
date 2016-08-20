window.onload = function() {
    const width = 700;
    const height = 700;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, width, height);
    let bodies = [];
    for (let i = 0; i < 2000; i++) {
        bodies.push(create());
    }
    start(ctx, bodies);
};

function start(ctx, bodies) {
    function loop() {
        const avgDistance = integrate(bodies);
        if (avgDistance > 5) {
            requestAnimationFrame(loop);
        }
        for (var i = 0; i < bodies.length; i++) {
            var a = bodies[i];
            ctx.strokeStyle = 'rgba(' + a.r + ', ' + a.g + ', ' + a.b + ', 0.1)';
            ctx.beginPath();
            ctx.moveTo(a.x0, a.y0);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
        }
    }
    loop();
}

function integrate(bodies) {
    const n = bodies.length;
    let totalDistance = 0.0;
    for (let i = 0; i < n; i++) {
        let a = bodies[i];
        for (let j = i + 1; j < n; j++) {
            let b = bodies[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const af = b.mass / d;
            const bf = a.mass / d;
            if (d > 0.01) {
                a.xv -= (dx / d) * af;
                a.yv -= (dy / d) * af;
                b.xv += (dx / d) * bf;
                b.yv += (dy / d) * bf;
            }
            totalDistance += d;
        }
    }
    for (let i = 0; i < n; i++) {
        let a = bodies[i];
        a.x0 = a.x;
        a.y0 = a.y;
        a.x += a.xv;
        a.y += a.yv;
        a.xv *= 0.95;
        a.yv *= 0.95;
    }
    return totalDistance / (n * n);
}

function create() {
    const r = Math.random() * 50 + 300;
    const a = Math.random() * Math.PI * 2;
    const x = 350 + Math.cos(a) * r;
    const y = 350 + Math.sin(a) * r;
    return {
        x: x,
        y: y,
        xv: Math.random() * 0.2 - 0.1,
        yv: Math.random() * 0.2 - 0.1,
        mass: 0.01,
        r: 0 | (x / 700) * 255,
        g: 0 | (1 - ((x + y) / 1400)) * 255,
        b: 0 | (y / 700) * 255
    };
}