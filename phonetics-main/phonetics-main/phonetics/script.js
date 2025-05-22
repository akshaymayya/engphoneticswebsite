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
