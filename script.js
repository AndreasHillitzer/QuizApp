let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right answer": 3
    },
    {
        "question": "Was ist ein Byte?",
        "answer_1": "Teil der Hardware",
        "answer_2": "Eine Maßeinheit für Datenmengen",
        "answer_3": "Programmiersprache",
        "answer_4": "Ein Bildbearbeitungsprogramm",
        "right answer": 2
    },
    {
        "question": "Was bedeutet die Abkürzung IT?",
        "answer_1": "Informationstechnologie",
        "answer_2": "Informatik und Technik",
        "answer_3": "Intelligenztest",
        "answer_4": "Integrationstaktik",
        "right answer": 1
    },
    {
        "question": "Was bedeutet Open-Source?",
        "answer_1": "Als Open Source wird Software bezeichnet, deren Quelltext eingesehen, geändert und verwendet werden kann",
        "answer_2": "Als Open Source wird Software bezeichnet, die gratis angeboten wird",
        "answer_3": "Als Open Source wird Fake-Software bezeichnet",
        "answer_4": "Als Open Source wird veraltete Software bezeichnet",
        "right answer": 1
    },
    {
        "question": "Was ist Phishing?",
        "answer_1": "Beim Phishing werden wichtige Daten mittels eines Trojaners von einem Computer gelöscht.",
        "answer_2": "Phishing war das erste PC-Game, das 1961 vom Studenten Steve Russell entwickelt wurde.",
        "answer_3": "Phishig bezeichnet die Komprimierung einer großen Datenmenge.",
        "answer_4": "Phishing ist der Versand gefälschter E-Mails, die Nutzer*innen dazu verleiten sollen, sensible Daten preiszugeben.",
        "right answer": 4
    },
    {
        "question": "Was ist SQL?",
        "answer_1": "Eine Datenbanksprache",
        "answer_2": "Eine Gewinn-Lotterie",
        "answer_3": "Es ist die Abkürzung für Simple Question Logic und beschreibt ein Computerprogramm",
        "answer_4": "Ein Dateiformat für Vektorgrafiken",
        "right answer": 1
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('amount-questions').innerHTML = questions.length;    
    showQuestion();
}


function showQuestion() {

    if(gameIsOver()) {
        showEndScreen();
    } else { 
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function answer(selection) {
    let question = questions[currentQuestion]; 
    let selectedQuestionNumber = selection.slice(-1); 
    let idOfRightAnswer = `answer_${question['right answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber)) { 
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == question['right answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons()
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-img').src= 'img/pencil.jpg'        
    document.getElementById('question-body').style = '';
    document.getElementById('end-screen').style = 'display: none';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function showEndScreen() {
            document.getElementById('end-screen').style = '';
            document.getElementById('question-body').style = 'display: none';    
            document.getElementById('all-questions').innerHTML = questions.length;
            document.getElementById('amount-of-righ-questions').innerHTML = rightQuestions;
            document.getElementById('header-img').src= 'img/trophy.png'
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];    
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}