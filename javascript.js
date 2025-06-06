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


