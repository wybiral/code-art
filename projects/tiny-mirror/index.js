// Handle FF
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;

document.addEventListener('DOMContentLoaded', () => {
    const w = 32;
    const h = 32;

    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = '../../images/favicon.ico';
    document.head.appendChild(favicon);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const video = document.createElement('video');
    video.width = w;
    video.height = h;
    video.autoplay = true;

    const mirrorCheckbox = document.getElementById('mirror');

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    startCamera().then(() => {
        document.body.appendChild(video);
        document.body.appendChild(canvas);
        loop();
    });

    let mirror = false;

    function loop() {
        ctx.clearRect(0, 0, w, h);

        if (mirror) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(video, -w, 0, w, h);
            ctx.restore();
        } else {
            ctx.drawImage(video, 0, 0, w, h);
        }

        favicon.setAttribute('href', canvas.toDataURL('image/png'));

        requestAnimationFrame(loop);
    }

    mirrorCheckbox.addEventListener('change', (e) => {
        mirror = e.target.checked;
    });
});
