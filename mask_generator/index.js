const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 20;
let startX;
let startY;

const pen = document.createElement("div");
const canvas_wrapper = document.querySelector('.canvas-wrapper');
canvas_wrapper.style.position = 'relative';

pen.style.position = 'absolute';
pen.style.width = lineWidth/2 + 'px';
pen.style.height = lineWidth/2 + 'px';
pen.style.backgroundColor = '#000';
pen.style.borderRadius = '100%';
pen.style.transition = "all .05s ease";
canvas_wrapper.appendChild(pen);

const draw = (e) => {

    const { x, y } = getMousePos(canvas, e);

    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    pen.style.top = ((y / scaleY) - lineWidth / 2) + 'px';
    pen.style.left = ((x / scaleX) - lineWidth / 2) + 'px';


    if (!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
}

document.querySelector(".clearButton").addEventListener("click", () => {
    // Clearning the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

document.querySelector("#rangeInput")
    .addEventListener("change", e => {
        lineWidth = e.target.value;
        pen.style.width = lineWidth + 'px';
        pen.style.height = lineWidth + 'px';
    })

pen.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

pen.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseout', () => {
    console.log("tets")
});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

document.querySelector(".downloadButton")
    .addEventListener("click", e => {
        e.preventDefault();
        const a = document.createElement("a")
        a.download = "image.png"
        a.href = document.querySelector('canvas').toDataURL();
        a.click()
    })