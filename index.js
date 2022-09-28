const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 1;
let startX;
let startY;

toolbar.addEventListener('click', i => {
    if (i.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', i => {
    if(i.target.id === 'lineWidth') {
        lineWidth = i.target.value;
    }
});

const draw = (i) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(i.clientX - canvasOffsetX, i.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (i) => {
    isPainting = true;
    startX = i.clientX;
    startY = i.clientY;
});

canvas.addEventListener('mouseup', i => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
