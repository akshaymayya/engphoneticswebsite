// Updated app.js without sessionStorage and with event delegation

// Application state
let currentUser = null;
let currentCardIndex = 0;
let studyCards = [];
let isCardFlipped = false;
let studyProgress = 0;
let userCardsMemory = [];

// Preloaded cards data
const preloadedCards = [
    { id: 1, question: "What sound does /tʃ/ represent?", answer: "The voiceless postalveolar affricate, as in \"church.\"", type: "preloaded" },
    { id: 2, question: "What is the place and manner of articulation for /b/?", answer: "Place: Bilabial\nManner: Plosive (Stop)\nIt's a voiced bilabial plosive.", type: "preloaded" },
    { id: 3, question: "Which word contains the vowel /æ/?", answer: "\"Cat\" — IPA: /kæt/", type: "preloaded" },
    { id: 4, question: "What is the voiced counterpart of /f/?", answer: "/v/ — /f/ = \"fine\", /v/ = \"vine\"", type: "preloaded" },
    { id: 5, question: "What sound does the symbol /ə/ represent?", answer: "The schwa — a mid-central, unstressed vowel, as in the first syllable of \"about\": /əˈbaʊt/", type: "preloaded" },
    { id: 6, question: "Which IPA symbol represents the vowel in \"boot\"?", answer: "/uː/", type: "preloaded" },
    { id: 7, question: "What kind of sound is /r/?", answer: "In most varieties of English, it's a voiced alveolar approximant, as in \"red.\"", type: "preloaded" },
    { id: 8, question: "What is the IPA transcription of the word \"thing\"?", answer: "/θɪŋ/", type: "preloaded" },
    { id: 9, question: "Which sounds are nasal consonants?", answer: "/m/, /n/, and /ŋ/", type: "preloaded" }
];

// DOM elements
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const studyScreen = document.getElementById('studyScreen');
const addCardScreen = document.getElementById('addCardScreen');
const navbar = document.getElementById('navbar');
const userWelcome = document.getElementById('userWelcome');
const successToast = document.getElementById('successToast');
const toastMessage = document.getElementById('toastMessage');

// Navigation elements
const homeBtn = document.getElementById('homeBtn');
const addCardBtn = document.getElementById('addCardBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Dashboard elements
const totalCards = document.getElementById('totalCards');
const userCards = document.getElementById('userCards');
const studyProgressEl = document.getElementById('studyProgress');
const startStudyBtn = document.getElementById('startStudyBtn');
const reviewCardsBtn = document.getElementById('reviewCardsBtn');

// Study elements
const flashcard = document.getElementById('flashcard');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const currentCardNumber = document.getElementById('currentCardNumber');
const totalCardCount = document.getElementById('totalCardCount');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

// Add card elements
const addCardForm = document.getElementById('addCardForm');
const newQuestion = document.getElementById('newQuestion');
const newAnswer = document.getElementById('newAnswer');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const userCardsList = document.getElementById('userCardsList');

// Login form
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showScreen('loginScreen');
    updateDashboardStats();
});

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);

    // Navigation
    homeBtn.addEventListener('click', showDashboard);
    addCardBtn.addEventListener('click', () => showScreen('addCardScreen'));
    logoutBtn.addEventListener('click', handleLogout);

    // Dashboard
    startStudyBtn.addEventListener('click', startStudy);
    reviewCardsBtn.addEventListener('click', () => showScreen('addCardScreen'));

    // Study controls
    flashcard.addEventListener('click', flipCard);
    prevBtn.addEventListener('click', previousCard);
    nextBtn.addEventListener('click', nextCard);
    shuffleBtn.addEventListener('click', shuffleCards);

    // Add card form
    addCardForm.addEventListener('submit', handleAddCard);
    cancelAddBtn.addEventListener('click', showDashboard);

    // Delete card delegation
    userCardsList.addEventListener('click', (e) => {
        if (e.target.matches('.delete-btn')) {
            const id = Number(e.target.dataset.id);
            deleteUserCard(id);
        }
    });

    // Keyboard shortcuts in study mode
    document.addEventListener('keydown', (e) => {
        if (!studyScreen.classList.contains('active')) return;
        switch (e.key) {
            case ' ': // Space toggles flip
            case 'Enter':
                e.preventDefault();
                flipCard();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextCard();
                break;
            case 's':
            case 'S':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    shuffleCards();
                }
                break;
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return;

    currentUser = username;
    userCardsMemory = []; // reset user cards for new session
    usernameInput.value = '';
    showDashboard();
    showToast(`Welcome, ${currentUser}!`);
}

function handleLogout() {
    currentUser = null;
    userCardsMemory = [];
    showScreen('loginScreen');
    showToast('Logged out successfully');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'loginScreen') {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    if (screenId === 'addCardScreen') {
        renderUserCards();
    }
}

function showDashboard() {
    if (!currentUser) {
        showScreen('loginScreen');
        return;
    }
    userWelcome.textContent = `Welcome, ${currentUser}!`;
    userWelcome.classList.remove('hidden');
    showScreen('dashboardScreen');
    updateDashboardStats();
}

function updateDashboardStats() {
    const total = preloadedCards.length + userCardsMemory.length;
    totalCards.textContent = total;
    userCards.textContent = userCardsMemory.length;
    studyProgressEl.textContent = studyProgress + '%';
}

function startStudy() {
    studyCards = [...preloadedCards, ...userCardsMemory];
    if (studyCards.length === 0) {
        showToast('No cards to study!');
        return;
    }
    currentCardIndex = 0;
    studyProgress = 0;
    resetCard();
    updateStudyInterface();
    showScreen('studyScreen');
}

function updateStudyInterface() {
    const card = studyCards[currentCardIndex];
    questionText.textContent = card.question;
    answerText.textContent = card.answer;
    currentCardNumber.textContent = currentCardIndex + 1;
    totalCardCount.textContent = studyCards.length;

    const progress = Math.round(((currentCardIndex + 1) / studyCards.length) * 100);
    progressFill.style.width = progress + '%';
    studyProgress = progress;
    updateDashboardStats();

    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === studyCards.length - 1;
}

function flipCard() {
    isCardFlipped = !isCardFlipped;
    flashcard.classList.toggle('flipped', isCardFlipped);
}

function resetCard() {
    isCardFlipped = false;
    flashcard.classList.remove('flipped');
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        resetCard();
        updateStudyInterface();
    }
}

function nextCard() {
    if (currentCardIndex < studyCards.length - 1) {
        currentCardIndex++;
        resetCard();
        updateStudyInterface();
    }
}

function shuffleCards() {
    for (let i = studyCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [studyCards[i], studyCards[j]] = [studyCards[j], studyCards[i]];
    }
    currentCardIndex = 0;
    resetCard();
    updateStudyInterface();
    showToast('Cards shuffled');
}

function handleAddCard(e) {
    e.preventDefault();
    const question = newQuestion.value.trim();
    const answer = newAnswer.value.trim();
    if (!question || !answer) return;

    const newCard = { id: Date.now(), question, answer, type: 'user' };
    userCardsMemory.push(newCard);

    newQuestion.value = '';
    newAnswer.value = '';

    renderUserCards();
    updateDashboardStats();
    showToast('Card added!');
}

function deleteUserCard(id) {
    userCardsMemory = userCardsMemory.filter((c) => c.id !== id);
    renderUserCards();
    updateDashboardStats();
    showToast('Card deleted');
}

function renderUserCards() {
    if (userCardsMemory.length === 0) {
        userCardsList.innerHTML = '<p class="empty-state">No custom cards yet. Add your first card above!</p>';
        return;
    }

    userCardsList.innerHTML = userCardsMemory
        .map((c) => `
            <div class="user-card-item">
                <div class="user-card-question">${escapeHtml(c.question)}</div>
                <div class="user-card-answer">${escapeHtml(c.answer)}</div>
                <div class="user-card-actions">
                    <button class="delete-btn" data-id="${c.id}">Delete</button>
                </div>
            </div>
        `)
        .join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    toastMessage.textContent = message;
    successToast.classList.remove('hidden');
    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove('show');
        setTimeout(() => successToast.classList.add('hidden'), 300);
    }, 2500);
}