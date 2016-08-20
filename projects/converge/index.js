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
};

function create() {
    const r = Math.random() * 50 + 300,
    const a = Math.random() * Math.PI * 2;
    const x = 350 + Math.cos(a) * r;
    const y = 350 + Math.sin(a) * r;
    return {
        x: x,
        y: y,
        xv: Math.random() * 0.02 - 0.01,
        yv: Math.random() * 0.02 - 0.01,
        mass: 0.01,
        r: 0,
        g: 0,
        b: 0
    };
}