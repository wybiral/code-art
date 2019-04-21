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
    navigator.getUserMedia({video: true}, stream => {
        video.srcObject = stream;
        video.play();
        loop();
    }, () => {});
    // Flag for mirror image
    let mirror = false;
    // Loop forever
    const loop = () => {
        // Mirror image based on checkbox
        let x = 0;
        if (mirror) {
            x = canvas.width * -1;
            ctx.scale(-1, 1);
        }
        // Copy video to canvas
        ctx.drawImage(video, x, 0, canvas.width, canvas.height);
        // Set canvas to favicon
        favicon.setAttribute('href', canvas.toDataURL());
        // Loop
        setTimeout(loop, 100);
    };
    // Handle checkbox change event
    document.getElementById('mirror').addEventListener('change', e => mirror = e.target.checked);
};

