<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, initializing phonetic symbols...");
    
    const symbolBoxes = document.querySelectorAll(".symbol-box");
    const symbolTitle = document.getElementById("symbol-title");
    const symbolDescription = document.getElementById("symbol-description");
    const audioElement = document.getElementById("symbol-audio");
    const audioSource = document.getElementById("audio-source");

    // Check if all elements exist
    if (!symbolTitle || !symbolDescription || !audioElement || !audioSource) {
        console.error("Some required HTML elements not found!");
        return;
    }

    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.cssText = `
        position: absolute;
        background-color: #251e1e;
        color: #ffffff;
        padding: 10px;
        border-radius: 6px;
        z-index: 1000;
        max-width: 250px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        font-size: 0.9em;
        pointer-events: none;
        border: 1px solid #f39c12;
        text-align: center;
        display: none;
    `;
    document.body.appendChild(tooltip);

    // Your descriptions (keep as they are)
    const descriptions = {
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
    };

    // Your audio files (keep as they are)
    const audioFiles = {
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
    };

    // Add event listeners to symbol boxes
    symbolBoxes.forEach((box, index) => {
        console.log(`Adding listeners to symbol ${index + 1}: ${box.innerText}`);
        
        // Hover: show tooltip
        box.addEventListener("mouseenter", (event) => {
            const symbol = box.innerText;
            const description = descriptions[symbol];
            
            if (description) {
                tooltip.innerText = description;
                tooltip.style.display = "block";
                
                // Position tooltip below the hovered symbol
                const rect = box.getBoundingClientRect();
                tooltip.style.left = Math.max(0, rect.left + window.scrollX) + "px";
                tooltip.style.top = (rect.bottom + window.scrollY + 8) + "px";
                
                console.log(`Showing tooltip for ${symbol}`);
            }
        });

        // Mouseleave: hide tooltip
        box.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });

        // Click: play audio and show info
        box.addEventListener("click", async () => {
            const symbol = box.innerText;
            console.log(`Clicked symbol: ${symbol}`);
            
            // Update info box
            symbolTitle.innerText = symbol;
            symbolDescription.innerText = descriptions[symbol] || "No description available";
            
            // Try to play audio
            const audioFile = audioFiles[symbol];
            if (audioFile) {
                try {
                    audioSource.src = audioFile;
                    audioElement.load();
                    audioElement.style.display = "block";
                    
                    // Attempt to play audio
                    await audioElement.play();
                    console.log(`Playing audio: ${audioFile}`);
                } catch (error) {
                    console.error(`Audio play failed for ${symbol}:`, error);
                    console.log("Audio file path:", audioFile);
                    
                    // Show user-friendly message
                    alert(`Audio file not found or cannot play: ${audioFile}\nPlease check if the file exists in the sounds folder.`);
                }
            } else {
                console.error(`No audio file defined for symbol: ${symbol}`);
            }
        });
    });

    console.log("Phonetic symbols initialized successfully!");
});
=======
document.addEventListener("DOMContentLoaded", () => {
    const symbolBoxes = document.querySelectorAll(".symbol-box");

    //  elements for displaying information
    const symbolTitle = document.getElementById("symbol-title");
    const symbolDescription = document.getElementById("symbol-description");
    const audioElement = document.getElementById("symbol-audio");
    const audioSource = document.getElementById("audio-source");

    //  examples for each phoneme
    const descriptions = {
        "/p/": "Voiceless bilabial plosive (both lips). Example: 'p' in 'pat'.",
        "/b/": "Voiced bilabial plosive (both lips). Example: 'b' in 'bat'.",
        "/t/": "Voiceless alveolar plosive (tongue on alveolar ridge). Example: 't' in 'top'.",
        "/d/": "Voiced alveolar plosive. Example: 'd' in 'dog'.",
        "/ʧ/": "Voiceless postalveolar affricate. Example: 'ch' in 'cheese'.",  // error
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
    };

    // Audio files
    const audioFiles = {
        "/p/": "sounds/p.wav",
        "/b/": "sounds/b.mp3",
        "/t/": "sounds/t.wav",
        "/d/": "sounds/d.wav",
        "/ʧ/": "sounds/ʧ.wav",  // w
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
        "/əʊ/": "sounds/əʊ.mp3",
    };

    // event listeners to symbol boxes
    symbolBoxes.forEach((box) => {
        box.addEventListener("click", () => {
            const symbol = box.innerText;
            symbolTitle.innerText = symbol;
            symbolDescription.innerText = descriptions[symbol];
            audioSource.src = audioFiles[symbol];
            audioElement.load();
            audioElement.style.display = "block";
        });
    });
});
>>>>>>> 75883fbdb5cdb1e9037d0483b01a39c5dc00374e
