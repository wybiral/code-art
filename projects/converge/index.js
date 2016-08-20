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
        requestAnimationFrame(loop);
        integrate(bodies);
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
    for (var i = 0; i < n; i++) {
        let a = bodies[i];
        a.x0 = a.x;
        a.y0 = a.y;
        a.x += a.xv;
        a.y += a.yv;
    }
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
        r: 0,
        g: 0,
        b: 0
    };
}