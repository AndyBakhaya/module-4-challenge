// 

var questions = [
    {
        question: "What does JavaScript see everything as?",
        choices: ["String", "Object", "Variable", "Chicken"],
        correctChoice: 1
    },{
        question: "Where do you link your JS file to HTML?",
        choices: ["Bottom ", "Top", "I Don't Know", "In the Middle"],
        correctChoice: 0
    },{
        question: "What comes before .getElementbyId?",
        choices: ["=", "function", "()", "document"],
        correctChoice: 3
    }, {
        question: "Which of the following would I use for a 'click' function?",
        choices: [".quereySelector", ".preventDefault", ".addEventListener", "A Mouse"],
        correctChoice: 2
    }

];

// 

var currentQuestion = 0;
var timeLeft = 60; 
var timerInterval;

// 

var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startQuiz);

// 
function startQuiz() {
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    displayQuestion();
    startTimer();
}

//

function displayQuestion() {
    var questionDiv = document.getElementById("question");
    var choicesDiv = document.getElementById("choices");
    questionDiv.textContent = questions[currentQuestion].question;
    choicesDiv.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = questions[currentQuestion].choices[i];
        choiceButton.addEventListener("click", () => selectChoice(i));
        choicesDiv.appendChild(document.createElement("br"));
        choicesDiv.appendChild(choiceButton);
    }
}

// 

function startTimer() {
    var timerInterval = setInterval(function() {
        var timeSpan = document.getElementById("time");
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft=0;
            quizDone();
        } else {
            timeSpan.textContent = timeLeft;
        }
    }, 1000); 
}

//

function selectChoice(choiceIndex) {
    var userAnswer = choiceIndex;
    var correctAnswer = questions[currentQuestion].correctChoice;
    if (userAnswer === correctAnswer) {
    } else {
        timeLeft -= 10;
    }
    displayNextQuestion();
}

function displayNextQuestion() {
    currentQuestion++;
    var choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        quizDone();
    }
}

// 

function quizDone() {
    clearInterval(timerInterval);
    document.getElementById("quizPage").style.display = "none";
    var resultPage = document.getElementById("resultPage");
    resultPage.style.display = "block";
    var highScoreSpan = document.getElementById("highScore");
    highScoreSpan.textContent = "High Score: " + timeLeft + " seconds";
    var restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", restartQuiz);
    var submitButton = document.getElementById("nameSubmitButton");
    submitButton.addEventListener("click", submitScore);
}

// 

function submitScore() {
    var userNameInput = document.getElementById("userName").value;
    var previousScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    
    previousScores.push({ name: userNameInput, score: timeLeft });
    
    localStorage.setItem("quizScores", JSON.stringify(previousScores));
    displaySubmittedScore(userNameInput, timeLeft);
}

// 

function displaySubmittedScore(userName, score) {
    var submittedScoresDiv = document.getElementById("submittedScores");
    var scoreElement = document.createElement("p");
    scoreElement.textContent = userName + ": " + score + " seconds";
    submittedScoresDiv.appendChild(scoreElement);
}

// 

function restartQuiz() {
    document.getElementById("resultPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    currentQuestion = 0;
    timeLeft = 60;
    displayQuestion();
    startTimer();
}