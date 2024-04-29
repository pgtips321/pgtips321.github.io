const questionContainerElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: 'An apple', correct: false },
            { text: 'Nothing', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'London', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Venus', correct: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic', correct: false },
            { text: 'Indian', correct: false },
            { text: 'Arctic', correct: false },
            { text: 'Pacific', correct: true }
        ]
    },
    {
        question: 'What will the estimated net worth of dilloningo be in 2025',
        answers: [
            { text: '3 potatoes', correct: false },
            { text: '200 pounds', correct: false },
            { text: '1000 pounds', correct: false },
            { text: '500 million pounds', correct: true }
        ]
    }
];

startGame();

function startGame() {
    score = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
    nextButton.classList.add('hide');
    nextButton.removeEventListener('click', handleNextButton);
    nextButton.addEventListener('click', handleNextButton);
}

function handleNextButton() {
    if (nextButton.innerText === 'Restart') {
        startGame();
    } else {
        currentQuestionIndex++;
        setNextQuestion();
    }
}

// Remaining functions stay the same

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainerElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        questionContainerElement.innerText = 'Your Level is: ' + score + '/' + questions.length;
        const linkButton = document.getElementById('link-btn');
        linkButton.classList.remove('hide'); // Show the link button
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
