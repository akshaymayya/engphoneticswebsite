document.addEventListener('DOMContentLoaded', function() {
    // Default flashcards data
    const defaultCards = [
        {
            question: "What sound does /tʃ/ represent?",
            answer: "The voiceless postalveolar affricate, as in \"church.\""
        },
        {
            question: "What is the place and manner of articulation for /b/?",
            answer: "Place: Bilabial, Manner: Plosive (Stop). It's a voiced bilabial plosive."
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
    let cards = [...defaultCards];
    let currentCardIndex = 0;
    let isFlipped = false;

    // DOM elements
    const flashcard = document.getElementById('flashcard');
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');
    const currentCardSpan = document.getElementById('currentCard');
    const totalCardsSpan = document.getElementById('totalCards');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const addCardBtn = document.getElementById('addCardBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const addCardForm = document.getElementById('addCardForm');
    const newQuestionInput = document.getElementById('newQuestion');
    const newAnswerInput = document.getElementById('newAnswer');
    const cancelBtn = document.getElementById('cancelBtn');

    // Initialize the application
    function init() {
        updateCard();
        updateProgressIndicator();
        updateNavigationButtons();
        
        // Add event listeners
        flashcard.addEventListener('click', flipCard);
        prevBtn.addEventListener('click', goToPreviousCard);
        nextBtn.addEventListener('click', goToNextCard);
        addCardBtn.addEventListener('click', openAddCardModal);
        modalClose.addEventListener('click', closeAddCardModal);
        cancelBtn.addEventListener('click', closeAddCardModal);
        addCardForm.addEventListener('submit', handleAddCard);
        modalOverlay.addEventListener('click', handleModalOverlayClick);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyPress);
    }

    // Update the current card display
    function updateCard() {
        const card = cards[currentCardIndex];
        questionText.textContent = card.question;
        answerText.textContent = card.answer;
        
        // Reset flip state
        isFlipped = false;
        flashcard.classList.remove('flipped');
    }

    // Update progress indicator
    function updateProgressIndicator() {
        currentCardSpan.textContent = currentCardIndex + 1;
        totalCardsSpan.textContent = cards.length;
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevBtn.disabled = currentCardIndex === 0;
        nextBtn.disabled = currentCardIndex === cards.length - 1;
    }

    // Flip card functionality
    function flipCard() {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped', isFlipped);
    }

    // Navigation functions
    function goToPreviousCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCard();
            updateProgressIndicator();
            updateNavigationButtons();
        }
    }

    function goToNextCard() {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
            updateCard();
            updateProgressIndicator();
            updateNavigationButtons();
        }
    }

    // Modal functions
    function openAddCardModal() {
        modalOverlay.classList.add('active');
        newQuestionInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeAddCardModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        addCardForm.reset();
    }

    function handleModalOverlayClick(event) {
        if (event.target === modalOverlay) {
            closeAddCardModal();
        }
    }

    // Handle adding new card
    function handleAddCard(event) {
        event.preventDefault();
        
        const question = newQuestionInput.value.trim();
        const answer = newAnswerInput.value.trim();
        
        if (question && answer) {
            // Add new card to the collection
            const newCard = {
                question: question,
                answer: answer
            };
            
            cards.push(newCard);
            
            // Update UI
            updateProgressIndicator();
            updateNavigationButtons();
            
            // Close modal
            closeAddCardModal();
            
            // Show success feedback
            showSuccessMessage('Card added successfully!');
            
            // Optional: Navigate to the new card
            currentCardIndex = cards.length - 1;
            updateCard();
            updateProgressIndicator();
            updateNavigationButtons();
        }
    }

    // Show success message
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4caf50, #2e7d32);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
            z-index: 1001;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        // Animate in
        setTimeout(() => {
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 300);
        }, 3000);
    }

    // Keyboard navigation
    function handleKeyPress(event) {
        // Only handle if modal is not open
        if (!modalOverlay.classList.contains('active')) {
            switch(event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    goToPreviousCard();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    goToNextCard();
                    break;
                case ' ':
                case 'Enter':
                    event.preventDefault();
                    flipCard();
                    break;
                case 'Escape':
                    event.preventDefault();
                    // Reset flip state
                    isFlipped = false;
                    flashcard.classList.remove('flipped');
                    break;
            }
        } else {
            // Handle modal keyboard events
            if (event.key === 'Escape') {
                closeAddCardModal();
            }
        }
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    flashcard.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    flashcard.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Only handle horizontal swipes that are longer than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            event.preventDefault();
            
            if (deltaX > 0) {
                // Swipe right - previous card
                goToPreviousCard();
            } else {
                // Swipe left - next card
                goToNextCard();
            }
        }
    }, { passive: false });

    // Add some visual feedback for button interactions
    function addButtonFeedback() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Initialize the application
    init();
    addButtonFeedback();
});