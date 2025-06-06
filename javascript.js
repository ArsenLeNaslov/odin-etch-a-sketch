
// Shade Picker pop-up window 
  document.addEventListener('DOMContentLoaded', function() {
        const gifColorPicker = document.getElementById('gifColorPicker');
        const pickShade = document.getElementById('pickShade');
        if (gifColorPicker && pickShade) {
            gifColorPicker.addEventListener('click', function() {
                pickShade.click();
            });
        }
    });

// Start music on 1sr user's interaction
function startMusic1Interaction() {
    music.play().catch(() => {}); // Ignore errors if already playing
    window.removeEventListener('click', startMusic1Interaction);
}
window.addEventListener('click', startMusic1Interaction);

// Music Control Setup
const music = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggle-music");

if (toggleMusicBtn && music) {
    toggleMusicBtn.textContent = music.muted ? "🔇" : "🌌";

    toggleMusicBtn.addEventListener("click", () => {
        music.muted = !music.muted;
        toggleMusicBtn.textContent = music.muted ? "🔇" : "🌌";
    });
}


