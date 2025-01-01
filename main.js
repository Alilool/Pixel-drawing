const grid = document.querySelector('.grid');
const color = document.getElementById('color');
const clear = document.getElementById('clear');
const erase = document.getElementById('erase');
const f_used_color = document.getElementById('f-usedColor');
const s_used_color = document.getElementById('s-usedColor');
const t_used_color = document.getElementById('t-usedColor');
const size = document.getElementById('size');

let f_used_color_value = "#ffffff";
let s_used_color_value = "#ffffff";
let t_used_color_value = "#ffffff";

let gridSize = 30;

function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

        // For mouse
        pixel.addEventListener('mousedown', () => {
            drawPixel(pixel);
        })
        pixel.addEventListener('mouseover', (e) => {
            if (e.buttons == 1) {
                drawPixel(pixel);
            }
        })

        // For mobile
        pixel.addEventListener('touchstart', () => {
            drawPixel(pixel);
        });
        pixel.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while drawing
            console.log(e);
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('pixel')) {
                drawPixel(element);
            }
        });
        grid.appendChild(pixel);
    }
}

function drawPixel(pixel) {
    pixel.style.backgroundColor = color.value;
}

clear.addEventListener('click', () => {
    createGrid();
})

erase.addEventListener('click', () => {
    color.value = '#ffffff';
})

f_used_color.addEventListener('click', () => {
    color.value = f_used_color_value;
})
s_used_color.addEventListener('click', () => {
    color.value = s_used_color_value;
})
t_used_color.addEventListener('click', () => {
    color.value = t_used_color_value;
})

color.addEventListener('change', () => {
    console.log("Color changed to:", color.value);

    // Shift the colors
    f_used_color_value = s_used_color_value;
    s_used_color_value = t_used_color_value;
    t_used_color_value = color.value;

    // Update the background of the used color elements
    f_used_color.style.backgroundColor = f_used_color_value;
    s_used_color.style.backgroundColor = s_used_color_value;
    t_used_color.style.backgroundColor = t_used_color_value;
});

size.addEventListener('input', () => {
    gridSize = size.value;
    createGrid();
})


createGrid();