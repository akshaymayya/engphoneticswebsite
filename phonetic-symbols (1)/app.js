// Phonetic symbol data
const phoneticData = {
  descriptions: {
    "/p/": "Voiceless bilabial plosive (both lips). Example: 'p' in 'pat'.",
    "/b/": "Voiced bilabial plosive (both lips). Example: 'b' in 'bat'.",
    "/t/": "Voiceless alveolar plosive (tongue on alveolar ridge). Example: 't' in 'top'.",
    "/d/": "Voiced alveolar plosive. Example: 'd' in 'dog'.",
    "/ʧ/": "Voiceless postalveolar affricate. Example: 'ch' in 'cheese'.",
    "/ʤ/": "Voiced postalveolar affricate. Example: 'j' in 'judge'.",
    "/k/": "Voiceless velar plosive (back of tongue). Example: 'k' in 'kite'.",
    "/g/": "Voiced velar plosive. Example: 'g' in 'go'.",
    "/f/": "Voiceless labiodental fricative (lower lip touches teeth). Example: 'f' in 'fish'.",
    "/v/": "Voiced labiodental fricative. Example: 'v' in 'van'.",
    "/θ/": "Voiceless dental fricative. Example: 'th' in 'think'.",
    "/ð/": "Voiced dental fricative. Example: 'th' in 'there'.",
    "/s/": "Voiceless alveolar fricative. Example: 's' in 'sun'.",
    "/z/": "Voiced alveolar fricative. Example: 'z' in 'zebra'.",
    "/ʃ/": "Voiceless postalveolar fricative. Example: 'sh' in 'shoe'.",
    "/ʒ/": "Voiced postalveolar fricative. Example: 's' in 'measure'.",
    "/m/": "Bilabial nasal. Example: 'm' in 'man'.",
    "/n/": "Alveolar nasal. Example: 'n' in 'net'.",
    "/ŋ/": "Velar nasal. Example: 'ng' in 'sing'.",
    "/h/": "Voiceless glottal fricative. Example: 'h' in 'house'.",
    "/l/": "Alveolar lateral approximant. Example: 'l' in 'love'.",
    "/r/": "Post-alveolar approximant. Example: 'r' in 'red'.",
    "/w/": "Bilabial glide. Example: 'w' in 'water'.",
    "/j/": "Palatal glide. Example: 'y' in 'yes'.",
    "/i:/": "Close front unrounded vowel. Example: 'ee' in 'see'.",
    "/ɪ/": "Near-close near-front unrounded vowel. Example: 'i' in 'bit'.",
    "/ʊ/": "Near-close near-back rounded vowel. Example: 'oo' in 'book'.",
    "/u:/": "Close back rounded vowel. Example: 'oo' in 'goose'.",
    "/e/": "Close-mid front unrounded vowel. Example: 'e' in 'met'.",
    "/ə/": "Schwa, mid central vowel. Example: 'a' in 'sofa'.",
    "/ɜ:/": "Open-mid central unrounded vowel. Example: 'ir' in 'bird'.",
    "/ɔ:/": "Open-mid back rounded vowel. Example: 'aw' in 'law'.",
    "/æ/": "Near-open front unrounded vowel. Example: 'a' in 'cat'.",
    "/ʌ/": "Open-mid back unrounded vowel. Example: 'u' in 'cup'.",
    "/ɑ:/": "Open back unrounded vowel. Example: 'a' in 'father'.",
    "/ɒ/": "Open back rounded vowel. Example: 'o' in 'lot'.",
    "/ɪə/": "Diphthong, near-close front to mid central. Example: 'ear' in 'here'.",
    "/eɪ/": "Diphthong, close-mid front to close front. Example: 'ai' in 'face'.",
    "/ʊə/": "Diphthong, near-close back to mid central. Example: 'ure' in 'cure'.",
    "/ɔɪ/": "Diphthong, open-mid back to close front. Example: 'oy' in 'boy'.",
    "/eə/": "Diphthong, close-mid front to mid central. Example: 'air' in 'hair'.",
    "/aɪ/": "Diphthong, open front to close front. Example: 'i' in 'price'.",
    "/aʊ/": "Diphthong, open front to near-close back. Example: 'ou' in 'mouth'.",
    "/əʊ/": "Diphthong, mid central to close back. Example: 'o' in 'go'."
  },
  audioFiles: {
    "/p/": "sounds/p.wav",
    "/b/": "sounds/b.mp3",
    "/t/": "sounds/t.wav",
    "/d/": "sounds/d.wav",
    "/ʧ/": "sounds/ʧ.wav",
    "/ʤ/": "sounds/ʤ.wav",
    "/k/": "sounds/k.wav",
    "/g/": "sounds/g.wav",
    "/f/": "sounds/f.wav",
    "/v/": "sounds/v.mp3",
    "/θ/": "sounds/θ.wav",
    "/ð/": "sounds/ð.mp3",
    "/s/": "sounds/s.wav",
    "/z/": "sounds/z.wav",
    "/ʃ/": "sounds/ʃ.wav",
    "/ʒ/": "sounds/ʒ.wav",
    "/m/": "sounds/m.wav",
    "/n/": "sounds/n.wav",
    "/ŋ/": "sounds/ŋ.wav",
    "/h/": "sounds/h.wav",
    "/l/": "sounds/l.mp3",
    "/r/": "sounds/r.wav",
    "/w/": "sounds/w.wav",
    "/j/": "sounds/j.wav",
    "/i:/": "sounds/i monothongs.mp3",
    "/ɪ/": "sounds/ɪ.wav",
    "/ʊ/": "sounds/ʊ.wav",
    "/u:/": "sounds/long u monothongs.wav",
    "/e/": "sounds/e.mp3",
    "/ə/": "sounds/ə.mp3",
    "/ɜ:/": "sounds/ɜ monothonhgs.mp3",
    "/ɔ:/": "sounds/ɔ monothongs.mp3",
    "/æ/": "sounds/æ.mp3",
    "/ʌ/": "sounds/ʌ.mp3",
    "/ɑ:/": "sounds/ɑ monothonhgs.mp3",
    "/ɒ/": "sounds/ɒ.mp3",
    "/ɪə/": "sounds/ɪə.mp3",
    "/eɪ/": "sounds/eɪ.mp3",
    "/ʊə/": "sounds/ʊə.mp3",
    "/ɔɪ/": "sounds/ɔɪ.mp3",
    "/eə/": "sounds/eə.mp3",
    "/aɪ/": "sounds/aɪ.mp3",
    "/aʊ/": "sounds/aʊ.mp3",
    "/əʊ/": "sounds/əʊ.mp3"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const symbolBoxes = document.querySelectorAll('.symbol-box');
  const symbolTitle = document.getElementById('symbol-title');
  const symbolDescription = document.getElementById('symbol-description');
  const symbolAudio = document.getElementById('symbol-audio');
  const audioSource = document.getElementById('audio-source');
  const tooltip = document.getElementById('tooltip');

  // Add event listeners to all symbol boxes
  symbolBoxes.forEach(box => {
    // Handle hover for tooltip
    box.addEventListener('mouseenter', showTooltip);
    box.addEventListener('mousemove', moveTooltip);
    box.addEventListener('mouseleave', hideTooltip);
    
    // Handle click for info display and audio
    box.addEventListener('click', handleSymbolClick);
    
    // Add ripple effect on click
    box.addEventListener('mousedown', createRippleEffect);
  });

  // Tooltip functions
  function showTooltip(e) {
    const symbol = e.target.dataset.symbol;
    const description = phoneticData.descriptions[symbol] || 'No description available';
    
    tooltip.textContent = description;
    tooltip.classList.add('show');
    moveTooltip(e);
  }

  function moveTooltip(e) {
    const x = e.clientX;
    const y = e.clientY;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const windowWidth = window.innerWidth;
    
    // Adjust tooltip position to ensure it stays within viewport
    let posX = x + 15; // Offset from cursor
    let posY = y + 15;
    
    // Prevent tooltip from going off the right edge
    if (posX + tooltipWidth > windowWidth - 20) {
      posX = x - tooltipWidth - 15;
    }
    
    // Prevent tooltip from going off the bottom
    if (posY + tooltipHeight > window.innerHeight - 20) {
      posY = y - tooltipHeight - 15;
    }
    
    tooltip.style.left = `${posX}px`;
    tooltip.style.top = `${posY}px`;
  }

  function hideTooltip() {
    tooltip.classList.remove('show');
  }

  // Handle symbol click
  function handleSymbolClick(e) {
    const symbol = e.target.dataset.symbol;
    const description = phoneticData.descriptions[symbol] || 'No description available';
    const audioPath = phoneticData.audioFiles[symbol];
    
    // Update info box
    symbolTitle.textContent = symbol;
    symbolDescription.textContent = description;
    
    // Handle audio
    if (audioPath) {
      audioSource.src = audioPath;
      symbolAudio.style.display = 'block';
      
      // Reset and load new audio
      symbolAudio.load();
      
      // Play with error handling
      symbolAudio.play().catch(error => {
        console.error('Audio playback failed:', error);
        symbolAudio.style.display = 'none';
      });
    } else {
      symbolAudio.style.display = 'none';
    }
  }

  // Create ripple effect
  function createRippleEffect(event) {
    const button = event.currentTarget;
    
    // Remove any existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    // Create new ripple
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Set ripple position relative to click
    const buttonRect = button.getBoundingClientRect();
    const diameter = Math.max(buttonRect.width, buttonRect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - buttonRect.left - radius}px`;
    ripple.style.top = `${event.clientY - buttonRect.top - radius}px`;
    
    // Add ripple to button
    button.appendChild(ripple);
    
    // Remove ripple after animation completes
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

  // Initialize info box with default content
  symbolTitle.textContent = 'Select a phonetic symbol';
  symbolDescription.textContent = 'Click on any symbol to view details and hear pronunciation.';
});