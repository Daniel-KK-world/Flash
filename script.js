document.addEventListener('DOMContentLoaded', function() {
  // Load flashcards from localStorage or initialize with default data
  let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "2 + 2?", answer: "4" },
    { question: "What language is used in web styling?", answer: "CSS" }
  ];
  
  let currentIndex = 0;
  const questionText = document.getElementById('questionText');
  const answerText = document.getElementById('answerText');
  const flashcard = document.getElementById('flashcard');
  const progressBar = document.querySelector('.progress-bar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const addCardBtn = document.getElementById('addCardBtn');
  const saveCardBtn = document.getElementById('saveCardBtn');
  const questionInput = document.getElementById('questionInput');
  const answerInput = document.getElementById('answerInput');
  const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));

  // Initialize the app
  updateCard();
  updateProgress();

  // Event listeners
  flashcard.addEventListener('click', flipCard);
  prevBtn.addEventListener('click', showPreviousCard);
  nextBtn.addEventListener('click', showNextCard);
  addCardBtn.addEventListener('click', showAddCardModal);
  saveCardBtn.addEventListener('click', saveNewCard);

  function flipCard() {
    flashcard.classList.toggle('flipped');
  }

  function updateCard() {
    if (flashcards.length === 0) {
      questionText.textContent = "No cards available";
      answerText.textContent = "Add some flashcards!";
      return;
    }
    
    const currentCard = flashcards[currentIndex];
    questionText.textContent = currentCard.question;
    answerText.textContent = currentCard.answer;
    
    // Always reset to showing question when changing cards
    if (flashcard.classList.contains('flipped')) {
      flashcard.classList.remove('flipped');
    }
  }

  function updateProgress() {
    if (flashcards.length === 0) {
      progressBar.style.width = '0%';
      return;
    }
    const progress = ((currentIndex + 1) / flashcards.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function showPreviousCard() {
    if (flashcards.length === 0) return;
    
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    updateCard();
    updateProgress();
  }

  function showNextCard() {
    if (flashcards.length === 0) return;
    
    currentIndex = (currentIndex + 1) % flashcards.length;
    updateCard();
    updateProgress();
  }

  function showAddCardModal() {
    questionInput.value = '';
    answerInput.value = '';
    cardModal.show();
  }

  function saveNewCard() {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    
    if (question && answer) {
      flashcards.push({ question, answer });
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
      currentIndex = flashcards.length - 1;
      updateCard();
      updateProgress();
      cardModal.hide();
    } else {
      alert('Please enter both question and answer');
    }
  }

  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      showPreviousCard();
    } else if (e.key === 'ArrowRight') {
      showNextCard();
    } else if (e.key === ' ') {
      flipCard();
    }
  });
});