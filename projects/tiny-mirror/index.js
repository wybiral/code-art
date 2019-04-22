// Handle FF
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;

window.onload = () => {
    // Create favicon link element
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = '../../images/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(favicon);
    // Create hidden canvas
    const w = 32;
    const h = 32;
    const canvas = document.createElement('canvas');
    canvas.style = 'display: none';
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);
    // Grab canvas context
    const ctx = canvas.getContext('2d');
    // Create hidden video element
    const video = document.createElement('video');
    video.style = 'display: none';
    video.width = canvas.width;
    video.height = canvas.height;
    document.body.appendChild(video);
    // Assign user media to video and start loop
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        video.play();
        loop();
    });
    // Flag for mirror image
    let mirror = false;
    // Loop forever
    const loop = () => {
        // save transform
        ctx.save();
        // Mirror image based on checkbox
        if (mirror) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        // Copy video to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // restore transform
        ctx.restore();
        // Set canvas to favicon
        favicon.setAttribute('href', canvas.toDataURL());
        // Loop
        setTimeout(loop, 100);
    };
    // Handle checkbox change event
    document.getElementById('mirror').addEventListener('change', e => {
        mirror = e.target.checked;
    });
};

