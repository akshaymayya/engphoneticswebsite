// FlashCard Learning App
document.addEventListener('DOMContentLoaded', function() {
    // Pre-loaded flashcards data
    const preloadedFlashcards = [
        {
            id: 1,
            question: "What is 7 × 8?",
            answer: "56",
            category: "Mathematics"
        },
        {
            id: 2,
            question: "What is the chemical symbol for water?",
            answer: "H₂O",
            category: "Science"
        },
        {
            id: 3,
            question: "What is the capital of France?",
            answer: "Paris",
            category: "Geography"
        },
        {
            id: 4,
            question: "In what year did World War II end?",
            answer: "1945",
            category: "History"
        },
        {
            id: 5,
            question: "What does 'Bonjour' mean in English?",
            answer: "Hello",
            category: "Language"
        },
        {
            id: 6,
            question: "Who wrote 'Romeo and Juliet'?",
            answer: "William Shakespeare",
            category: "Literature"
        },
        {
            id: 7,
            question: "What is the largest planet in our solar system?",
            answer: "Jupiter",
            category: "Science"
        },
        {
            id: 8,
            question: "What is 15% of 200?",
            answer: "30",
            category: "Mathematics"
        },
        {
            id: 9,
            question: "Which Amendment to the U.S. Constitution had to do with women getting the right to vote?",
            answer: "19th Amendment",
            category: "History"
        },
        {
            id: 10,
            question: "What is the past tense of 'run'?",
            answer: "Ran",
            category: "Language"
        }
    ];

    // Application state
    let flashcards = [...preloadedFlashcards];
    let currentCardIndex = 0;
    let isFlipped = false;
    let nextCardId = 11;

    // DOM elements
    const elements = {
        // Views
        studyView: document.getElementById('studyView'),
        addCardForm: document.getElementById('addCardForm'),
        
        // Flashcard
        flashcard: document.getElementById('flashcard'),
        questionText: document.getElementById('questionText'),
        answerText: document.getElementById('answerText'),
        
        // Controls
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        addCardBtn: document.getElementById('addCardBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        
        // Info
        cardCounter: document.getElementById('cardCounter'),
        cardCategory: document.getElementById('cardCategory'),
        
        // Form
        newCardForm: document.getElementById('newCardForm'),
        newQuestion: document.getElementById('newQuestion'),
        newAnswer: document.getElementById('newAnswer'),
        newCategory: document.getElementById('newCategory')
    };

    // Initialize the application
    function init() {
        setupEventListeners();
        if (flashcards.length > 0) {
            updateCard();
            updateControls();
        }
        showWelcomeMessage();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Card flip - ensure single event listener
        if (elements.flashcard) {
            elements.flashcard.removeEventListener('click', flipCard); // Remove any existing
            elements.flashcard.addEventListener('click', flipCard);
        }
        
        // Navigation
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                previousCard();
            });
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                nextCard();
            });
        }
        
        // View switching
        if (elements.addCardBtn) {
            elements.addCardBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showAddCardForm();
            });
        }
        
        if (elements.cancelBtn) {
            elements.cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showStudyView();
            });
        }
        
        // Form submission
        if (elements.newCardForm) {
            elements.newCardForm.addEventListener('submit', function(e) {
                addNewCard(e);
            });
        }
        
        // Keyboard support
        document.addEventListener('keydown', handleKeyPress);
        
        // Add extra functionality buttons
        addExtraButtons();
    }

    // Update current card display
    function updateCard() {
        if (!flashcards || flashcards.length === 0) {
            elements.questionText.textContent = "No flashcards available. Add some to get started!";
            elements.answerText.textContent = "Click 'Add Flashcard' to create your first card.";
            elements.cardCategory.textContent = "";
            return;
        }

        // Ensure currentCardIndex is within bounds
        if (currentCardIndex >= flashcards.length) {
            currentCardIndex = flashcards.length - 1;
        }
        if (currentCardIndex < 0) {
            currentCardIndex = 0;
        }

        const currentCard = flashcards[currentCardIndex];
        if (currentCard) {
            elements.questionText.textContent = currentCard.question;
            elements.answerText.textContent = currentCard.answer;
            elements.cardCategory.textContent = currentCard.category;
        }
        
        // Reset flip state
        isFlipped = false;
        elements.flashcard.classList.remove('flipped');
    }

    // Update navigation controls
    function updateControls() {
        if (flashcards.length === 0) {
            elements.cardCounter.textContent = "0 / 0";
            elements.prevBtn.disabled = true;
            elements.nextBtn.disabled = true;
            return;
        }

        elements.cardCounter.textContent = `${currentCardIndex + 1} / ${flashcards.length}`;
        
        // Enable/disable navigation buttons
        elements.prevBtn.disabled = currentCardIndex === 0;
        elements.nextBtn.disabled = currentCardIndex === flashcards.length - 1;
        
        // Update button opacity for visual feedback
        elements.prevBtn.style.opacity = currentCardIndex === 0 ? '0.5' : '1';
        elements.nextBtn.style.opacity = currentCardIndex === flashcards.length - 1 ? '0.5' : '1';
    }

    // Flip the current card
    function flipCard(e) {
        if (e) e.preventDefault();
        if (flashcards.length === 0) return;
        
        isFlipped = !isFlipped;
        
        // Force reflow to ensure animation works
        elements.flashcard.offsetHeight;
        
        if (isFlipped) {
            elements.flashcard.classList.add('flipped');
        } else {
            elements.flashcard.classList.remove('flipped');
        }
        
        // Track stats
        studyStats.totalFlips++;
        studyStats.cardsStudied.add(currentCardIndex);
    }

    // Navigate to previous card
    function previousCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCard();
            updateControls();
        }
    }

    // Navigate to next card
    function nextCard() {
        if (currentCardIndex < flashcards.length - 1) {
            currentCardIndex++;
            updateCard();
            updateControls();
        }
    }

    // Show add card form
    function showAddCardForm() {
        elements.studyView.style.display = 'none';
        elements.addCardForm.style.display = 'block';
        
        // Focus on first input
        setTimeout(() => {
            elements.newQuestion.focus();
        }, 100);
    }

    // Show study view
    function showStudyView() {
        elements.addCardForm.style.display = 'none';
        elements.studyView.style.display = 'block';
        
        // Clear form
        elements.newCardForm.reset();
        
        // Update display
        updateCard();
        updateControls();
    }

    // Add a new flashcard
    function addNewCard(event) {
        event.preventDefault();
        
        const question = elements.newQuestion.value.trim();
        const answer = elements.newAnswer.value.trim();
        const category = elements.newCategory.value;
        
        if (!question || !answer) {
            showNotification('Please fill in both question and answer fields.', 'error');
            return;
        }
        
        // Create new card
        const newCard = {
            id: nextCardId++,
            question: question,
            answer: answer,
            category: category
        };
        
        // Add to flashcards array
        flashcards.push(newCard);
        
        // Update display - go to the new card
        currentCardIndex = flashcards.length - 1;
        
        // Show success message
        showNotification('Flashcard added successfully!', 'success');
        
        // Return to study view
        showStudyView();
    }

    // Handle keyboard navigation
    function handleKeyPress(event) {
        // Only handle keys when in study view
        if (elements.studyView.style.display === 'none') return;
        
        switch(event.key) {
            case ' ':
            case 'Enter':
                event.preventDefault();
                flipCard();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                previousCard();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextCard();
                break;
            case 'Escape':
                if (elements.addCardForm.style.display === 'block') {
                    showStudyView();
                }
                break;
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Style the notification
        const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Shuffle flashcards
    function shuffleCards() {
        if (flashcards.length <= 1) return;
        
        for (let i = flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
        }
        currentCardIndex = 0;
        updateCard();
        updateControls();
        showNotification('Cards shuffled!', 'info');
    }

    // Progress tracking
    let studyStats = {
        cardsStudied: new Set(),
        sessionStart: Date.now(),
        totalFlips: 0
    };

    // Add extra buttons functionality
    function addExtraButtons() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        
        // Add shuffle button
        const shuffleBtn = document.createElement('button');
        shuffleBtn.className = 'btn btn--secondary btn--sm';
        shuffleBtn.textContent = '🔀 Shuffle';
        shuffleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            shuffleCards();
        });
        nav.appendChild(shuffleBtn);

        // Add stats button
        const statsBtn = document.createElement('button');
        statsBtn.className = 'btn btn--outline btn--sm';
        statsBtn.textContent = '📊 Stats';
        statsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showStats();
        });
        nav.appendChild(statsBtn);
    }

    // Show stats
    function showStats() {
        const sessionTime = Math.floor((Date.now() - studyStats.sessionStart) / 1000 / 60);
        const cardsStudied = studyStats.cardsStudied.size;
        const totalCards = flashcards.length;
        
        const statsMessage = `Session Stats:\n• Cards studied: ${cardsStudied}/${totalCards}\n• Total flips: ${studyStats.totalFlips}\n• Session time: ${sessionTime} minutes`;
        
        showNotification(statsMessage, 'info');
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    elements.flashcard.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    elements.flashcard.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // Only process horizontal swipes
        if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
            if (diffX > 0) {
                // Swiped left - next card
                nextCard();
            } else {
                // Swiped right - previous card
                previousCard();
            }
        }
    }

    // Show welcome message
    function showWelcomeMessage() {
        setTimeout(() => {
            showNotification('Welcome to FlashCard Learning! Click cards to flip them.', 'info');
        }, 1000);
    }

    // Initialize the application
    init();
});