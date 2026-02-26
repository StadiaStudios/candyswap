/**
 * sound.js - Modular Sound Controller for CandySwap
 */

const sfxMove = new Audio('assets/sfx/move.mp3');
const sfxCombo = new Audio('assets/sfx/combo.mp3');
const sfxPause = new Audio('assets/sfx/pause.mp3');
const sfxBomb = new Audio('assets/sfx/bomb.mp3'); 
const bgm = new Audio('assets/sfx/bgm.mp3');

bgm.loop = true;
bgm.volume = 0.6;

let bgmStarted = false;

function tryStartBGM() {
    if (!bgmStarted) {
        bgm.play().then(() => {
            bgmStarted = true;
        }).catch(() => {});
    }
}

function playSound(type) {
    let sound = null;
    switch(type) {
        case 'move': sound = sfxMove; break;
        case 'combo': sound = sfxCombo; break;
        case 'pause': sound = sfxPause; break;
        case 'bomb': sound = sfxBomb; break;
    }
    
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.warn("Audio playback failed:", e));
    }
}

window.playSound = playSound;
window.tryStartBGM = tryStartBGM;