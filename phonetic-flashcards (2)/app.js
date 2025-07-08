document.addEventListener('DOMContentLoaded', () => {
    // Default flashcards from the provided data
    const defaultFlashcards = [
        {
            question: "What sound does /tʃ/ represent?",
            answer: "The voiceless postalveolar affricate, as in \"church.\""
        },
        {
            question: "What is the place and manner of articulation for /b/?",
            answer: "Place: Bilabial\nManner: Plosive (Stop)\nIt's a voiced bilabial plosive."
        },
        {
            question: "Which word contains the vowel /æ/?",
            answer: "\"Cat\" — IPA: /kæt/"
        },
        {
            question: "What is the voiced counterpart of /f/?",
            answer: "/v/ — /f/ = \"fine\", /v/ = \"vine\""
        },
        {
            question: "What sound does the symbol /ə/ represent?",
            answer: "The schwa — a mid-central, unstressed vowel, as in the first syllable of \"about\": /əˈbaʊt/"
        },
        {
            question: "Which IPA symbol represents the vowel in \"boot\"?",
            answer: "/uː/"
        },
        {
            question: "What kind of sound is /r/?",
            answer: "In most varieties of English, it's a voiced alveolar approximant, as in \"red.\""
        },
        {
            question: "What is the IPA transcription of the word \"thing\"?",
            answer: "/θɪŋ/"
        },
        {
            question: "Which sounds are nasal consonants?",
            answer: "/m/, /n/, and /ŋ/"
        }
    ];

    // Application state
    let flashcards = [...defaultFlashcards];
    let currentCardIndex = 0;
    let isFlipped = false;

    // DOM elements
    const flashcard = document.getElementById('flashcard');
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');
    const cardCounter = document.getElementById('cardCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const addCardBtn = document.getElementById('addCardBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Modal elements
    const addCardModal = document.getElementById('addCardModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModal = document.getElementById('closeModal');
    const cancelAdd = document.getElementById('cancelAdd');
    const saveCard = document.getElementById('saveCard');
    const newQuestion = document.getElementById('newQuestion');
    const newAnswer = document.getElementById('newAnswer');

    // Initialize the app
    function init() {
        displayCurrentCard();
        updateCardCounter();
        updateNavigationButtons();
        
        // Event listeners
        flashcard.addEventListener('click', flipCard);
        prevBtn.addEventListener('click', goToPrevious);
        nextBtn.addEventListener('click', goToNext);
        addCardBtn.addEventListener('click', showAddCardModal);
        shuffleBtn.addEventListener('click', shuffleCards);
        resetBtn.addEventListener('click', resetSession);
        
        // Modal event listeners
        closeModal.addEventListener('click', hideAddCardModal);
        cancelAdd.addEventListener('click', hideAddCardModal);
        saveCard.addEventListener('click', saveNewCard);
        modalBackdrop.addEventListener('click', hideAddCardModal);
        
        // Prevent modal from closing when clicking inside
        addCardModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Display current card
    function displayCurrentCard() {
        if (flashcards.length === 0) {
            questionText.textContent = "No flashcards available";
            answerText.textContent = "Add some flashcards to get started!";
            return;
        }

        const currentCard = flashcards[currentCardIndex];
        questionText.textContent = currentCard.question;
        answerText.textContent = currentCard.answer;
        
        // Reset flip state
        isFlipped = false;
        flashcard.classList.remove('flipped');
    }

    // Flip card
    function flipCard() {
        if (flashcards.length === 0) return;
        
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped', isFlipped);
    }

    // Navigation functions
    function goToPrevious() {
        if (flashcards.length === 0) return;
        
        currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
        displayCurrentCard();
        updateCardCounter();
        updateNavigationButtons();
    }

    function goToNext() {
        if (flashcards.length === 0) return;
        
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
        displayCurrentCard();
        updateCardCounter();
        updateNavigationButtons();
    }

    // Update card counter
    function updateCardCounter() {
        if (flashcards.length === 0) {
            cardCounter.textContent = "No cards";
            return;
        }
        
        cardCounter.textContent = `Card ${currentCardIndex + 1} of ${flashcards.length}`;
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        const hasCards = flashcards.length > 0;
        prevBtn.disabled = !hasCards;
        nextBtn.disabled = !hasCards;
    }

    // Shuffle cards
    function shuffleCards() {
        if (flashcards.length <= 1) return;
        
        // Fisher-Yates shuffle
        for (let i = flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
        }
        
        // Reset to first card after shuffle
        currentCardIndex = 0;
        displayCurrentCard();
        updateCardCounter();
    }

    // Reset session
    function resetSession() {
        if (confirm('Are you sure you want to reset? This will remove all custom flashcards.')) {
            flashcards = [...defaultFlashcards];
            currentCardIndex = 0;
            displayCurrentCard();
            updateCardCounter();
            updateNavigationButtons();
        }
    }

    // Modal functions
    function showAddCardModal() {
        addCardModal.classList.add('show');
        modalBackdrop.classList.add('show');
        newQuestion.focus();
    }

    function hideAddCardModal() {
        addCardModal.classList.remove('show');
        modalBackdrop.classList.remove('show');
        
        // Clear form
        newQuestion.value = '';
        newAnswer.value = '';
    }

    function saveNewCard() {
        const question = newQuestion.value.trim();
        const answer = newAnswer.value.trim();
        
        if (!question || !answer) {
            alert('Please fill in both question and answer fields.');
            return;
        }
        
        // Add new card to the deck
        flashcards.push({
            question: question,
            answer: answer
        });
        
        // Go to the new card
        currentCardIndex = flashcards.length - 1;
        displayCurrentCard();
        updateCardCounter();
        updateNavigationButtons();
        
        hideAddCardModal();
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (addCardModal.classList.contains('show')) {
            if (e.key === 'Escape') {
                hideAddCardModal();
            }
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            case ' ':
                e.preventDefault();
                flipCard();
                break;
            case 'Escape':
                if (isFlipped) {
                    flipCard();
                }
                break;
        }
    });

    // Initialize the application
    init();
});