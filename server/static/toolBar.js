const canvas = document.querySelector('#editorContainer #canvas-wrapper canvas');

canvas.style.width = "100%";
canvas.style.height = "100%"

const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 20;
let startX;
let startY;


const draw = (e) => {

    if (!isPainting || !canvas.style.backgroundImage) {
        return;
    }

    const { x, y } = getMousePos(canvas, e);


    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
}

document.querySelector("#clearButton").addEventListener("click", () => {
    // Clearning the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

document.querySelector("#rangeInput")
    .addEventListener("change", e => {
        lineWidth = e.target.value;
        pen.style.width = lineWidth / 2 + 'px';
        pen.style.height = lineWidth / 2 + 'px';
    })

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

/*document.querySelector(".downloadButton")
    .addEventListener("click", e => {
        e.preventDefault();
        const a = document.createElement("a")
        a.download = "image.png"
        a.href = document.querySelector('canvas').toDataURL();
        a.click()
    })*/