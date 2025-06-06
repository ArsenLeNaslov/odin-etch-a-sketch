// Grid Setup: initialise grid and select all main control elements
function createGrid(numCubes) {
    for (let i = 0; i < numCubes; i++) {
        const row = document.createElement('div');
        row.classList.add('row', 'pixel');
        for (let j = 0; j < numCubes; j++) {
            const col = document.createElement('div');
            col.classList.add('col', 'pixel');
            row.appendChild(col);
        }
        grid.appendChild(row);
    }
}

// 2. State Variables: flags and colour variables for drawing modes
const grid = document.querySelector('#grid');
const shadeControl = document.querySelector('#shadeControl');
const inputRes = document.querySelector('#inputRes');

// 3. Initial Grid Creation and Event Listeners
//    Create initial grid and set up main event listeners for drawing
const xValRes = document.querySelector('#xValRes');
const yValRes = document.querySelector('#yValRes');
const controlKey = document.querySelector('#controlKey');
const eraser = document.getElementById('eraser');
const rainbowEffect = document.getElementById('rainbowEffect');
const brightShading = document.getElementById('brightShading');

// 4. Color Picker Change Handler: update pixel colour when Shade Picker's value changes
let rainbowEffectFlag = false;
let pixelColor = pickShade ? pickShade.value : '#000000';
let brightShadingFlag = false;
let previousPixelColor = '';

// 5. Clear Button Handler: Clear all pixels in the Grid
if (inputRes && grid) {
    createGrid(inputRes.value);
    let pixels = document.querySelectorAll('.col');
    grid.addEventListener('mousedown', shadeOnMousedown);
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseenter', shadeOnHoverWithLeftButtonDown);
    });

    pickShade && pickShade.addEventListener('input', e => {
        pixelColor = pickShade.value;
    });

    clear && clear.addEventListener('click', (e) => {
        const pixels = document.querySelectorAll('.col');
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = '';
            pixel.style.opacity = '';
        });
    });

// 6. Input Resolution Handler: update grid size and 
//    reapply event listeners when resolution changes
   inputRes.addEventListener('input', (e) => {
        grid.innerHTML = '';
        xValRes.textContent = inputRes.value;
        yValRes.textContent = inputRes.value;
        createGrid(inputRes.value);
        const pixels = document.querySelectorAll('.col');
        if (eraser.textContent === 'Eraser') {
            grid.addEventListener('mousedown', shadeOnMousedown);
            grid.removeEventListener('mousedown', eraseOnMousedown);
            pixels.forEach(pixel => {
                pixel.addEventListener('mouseenter', shadeOnHoverWithLeftButtonDown);
                pixel.removeEventListener('mouseenter', eraseOnHoverWithLeftButtonDown);
            });
        } else {
            grid.removeEventListener('mousedown', shadeOnMousedown);
            grid.addEventListener('mousedown', eraseOnMousedown);
            pixels.forEach(pixel => {
                pixel.removeEventListener('mouseenter', shadeOnHoverWithLeftButtonDown);
                pixel.addEventListener('mouseenter', eraseOnHoverWithLeftButtonDown);
            });
        }
    }); 

//7. Eraser Toggle Handler: toggles between Eraser and Draw modes on 3rd Button
eraser && eraser.addEventListener('click', e => {
    const pixels = document.querySelectorAll('.col');
    eraser.classList.toggle('active-control');
    if (eraser.textContent === 'Eraser') {
        eraser.textContent = 'Draw';
        grid.removeEventListener('mousedown', shadeOnMousedown);
        grid.addEventListener('mousedown', eraseOnMousedown);
        grid.classList.add('cursor-crosshair');
        pixels.forEach(pixel => {
            pixel.removeEventListener('mouseenter', shadeOnHoverWithLeftButtonDown);
            pixel.addEventListener('mouseenter', eraseOnHoverWithLeftButtonDown);
        });
        } else {
            eraser.textContent = 'Eraser';
            grid.removeEventListener('mousedown', eraseOnMousedown);
            grid.addEventListener('mousedown', shadeOnMousedown);
            grid.classList.remove('cursor-crosshair');
            pixels.forEach(pixel => {
                pixel.removeEventListener('mouseenter', eraseOnHoverWithLeftButtonDown);
                pixel.addEventListener('mouseenter', shadeOnHoverWithLeftButtonDown);
            });
        }
    });

// 8. Rainbow Effect Toggle Handler: toggles rainbow (random color) drawing mode
   rainbowEffect && rainbowEffect.addEventListener('click', e => {
        if (brightShadingFlag) {
            brightShadingFlag = false;
            brightShading.classList.remove('active-control');
            brightShading.textContent = 'Bright Shading Off';
        }
        rainbowEffectFlag = !rainbowEffectFlag;
        rainbowEffect.classList.toggle('active-control');
        if (!rainbowEffectFlag) {
            rainbowEffect.textContent = 'Rainbow Effect Off';
            pixelColor = pickShade.value;
        } else {
            rainbowEffect.textContent = 'Rainbow Effect On';
        }
    });

// 9. Bright Shading Toggle Handler: toggles light shading mode
    brightShading && brightShading.addEventListener('click', e => {
        if (rainbowEffectFlag) {
            rainbowEffectFlag = false;
            rainbowEffect.classList.remove('active-control');
            rainbowEffect.textContent = 'Rainbow Effect Off';
            pixelColor = pickShade.value;
        }
        brightShadingFlag = !brightShadingFlag;
        brightShading.classList.toggle('active-control');
        if (brightShadingFlag) {
            brightShading.textContent = 'Bright Shading On';
        } else {
            brightShading.textContent = 'Bright Shading Off';
        }
    });
}

// 10. Drawing & Erasing Event Handlers: functions for drawing, shading, and erasing pixels
function shadeOnMousedown(e) {
    if (e.button === 0) {
        const pixelElem = e.target;
        e.preventDefault();
        if (rainbowEffectFlag) {
            setRandomPixelColor();
        } else if (brightShadingFlag) {
            if (pixelElem.style.opacity === '') {
                pixelElem.style.opacity = 0.1;
            } else {
                let opacity = +pixelElem.style.opacity;
                if (opacity < 1) {
                    opacity = opacity + 0.1;
                    pixelElem.style.opacity = opacity;
                }
            }
        }
        setPixelFillColor(pixelElem, pixelColor);
    }
}

function shadeOnHoverWithLeftButtonDown(e) {
    if (e.buttons === 1) {
        const pixelElem = e.target;
        if (rainbowEffectFlag) {
            setRandomPixelColor();
        } else if (brightShadingFlag) {
            if (pixelElem.style.opacity === '') {
                pixelElem.style.opacity = 0.1;
            } else {
                let opacity = +pixelElem.style.opacity;
                if (opacity < 1) {
                    opacity = opacity + 0.1;
                    pixelElem.style.opacity = opacity;
                }
            }
        }
        setPixelFillColor(pixelElem, pixelColor);
    }
}

function eraseOnMousedown(e) {
    if (e.button === 0) e.preventDefault();
    erasePixel(e.target);
}

function eraseOnHoverWithLeftButtonDown(e) {
    if (e.buttons === 1) {
        erasePixel(e.target);
    }
}

function erasePixel(pixelElem) {
    pixelElem.style.backgroundColor = '';
    pixelElem.style.opacity = '';
}

// 11. Pixel Color & Random Color Functions: helper functions 
//     to set pixel color and generate random colors
function setPixelFillColor(pixelElem, fillColor) {
    pixelElem.style.backgroundColor = fillColor;
}

function setPixelFillColor(pixelElem, fillColor) {
    pixelElem.style.backgroundColor = fillColor;
}

function setRandomPixelColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    pixelColor = `rgb(${r}, ${g}, ${b})`;
}

// 12. Shade Picker pop-up window 
  document.addEventListener('DOMContentLoaded', function() {
        const gifColorPicker = document.getElementById('gifColorPicker');
        const pickShade = document.getElementById('pickShade');
        if (gifColorPicker && pickShade) {
            gifColorPicker.addEventListener('click', function() {
                pickShade.click();
            });
        }
    });

// 13. Start music on 1sr user's interaction
function startMusic1Interaction() {
    music.play().catch(() => {}); // Ignore errors if already playing
    window.removeEventListener('click', startMusic1Interaction);
}
window.addEventListener('click', startMusic1Interaction);

// 14. Music Control Setup
const music = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggle-music");

if (toggleMusicBtn && music) {
    toggleMusicBtn.textContent = music.muted ? "🔇" : "🌌";

    toggleMusicBtn.addEventListener("click", () => {
        music.muted = !music.muted;
        toggleMusicBtn.textContent = music.muted ? "🔇" : "🌌";
    });
}


