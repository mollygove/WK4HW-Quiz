//Link elements by ID
var startButton = document.querySelector("#startButton");
var timerEl = document.querySelector('#timer');

var questionEl = document.querySelector('#question');
var b1El = document.querySelector('#b1');
var b2El = document.querySelector('#b2');
var b3El = document.querySelector('#b3');

var introEl = document.querySelector("#intro");
var quizEl = document.querySelector("#quiz");

//Questions and Answers
var questions = [
    {
        question: "_____ is the standard markup language for Web pages",
        q1: "Javascript",
        q2: "HTML",
        q3: "CSS",
        answer: "HTML"
    },
    {
        question: "HTML Tags are:",
        q1: "<a>",
        q2: "<button>",
        q3: "All of the Above",
        answer: "All of the Above"
    },
    {
        question: "Global event attributes are added to HTML elements to define event actions.",
        q1: "True",
        q2: "False",
        q3: "not this one",
        answer: "True"
    },
    {
        question: "href specifies the title of a page.",
        q1: "not this one",
        q2: "False",
        q3: "True",
        answer: "False"
    },
    {
        question: "<body> defines the document's body.",
        q1: "True",
        q2: "False",
        q3: "not this one",
        answer: "True"
    },
    {
        question: "CSS is the language we use to style an HTML document.",
        q1: "True",
        q2: "not this one",
        q3: "False",
        answer: "True"
    },
    {   question: "HTML describes how CSS elements should be displayed.",
        q1: "True",
        q2: "False",
        q3: "not this one",
        answer: "False"
    },
    {   question: "border-style property specifies what kind of border to display.",
        q1: "not this one",
        q2: "False",
        q3: "True",
        answer: "True"
    },
    {   question: "A pseudo-class is used to define a special state of a property.",
        q1: "True",
        q2: "False",
        q3: "not this one",
        answer: "False"
    },
    {   question: "JavaScript is the world's most popular programming language.",
        q1: "not this one",
        q2: "False",
        q3: "True",
        answer: "True"
    },
    {   question: "JavaScript can change the style of an HTML element.",
        q1: "True",
        q2: "not this one",
        q3: "False",
        answer: "True"
    },
    {   question: "Single line comments start with / in JavaScript.",
        q1: "True",
        q2: "not this one",
        q3: "False",
        answer: "False"
    },
    {   question: "The external JavaScript file must contain the <script> tag.",
        q1: "True",
        q2: "False",
        q3: "not this one",
        answer: "False"
    },
    {   question: "JavaScript is the same as Java.",
        q1: "True",
        q2: "False",
        q3: "not this one",
        answer: "False"
    }];

//Initial variables
var userScore;
var secondsLeft = 90;
var questionIndex = 0;
var timeInt;

//Start the timer
function startTimer() {
    timeInt = setInterval(
        function () {
            secondsLeft--;
            timerEl.textContent = `Timer: ${secondsLeft}`;
            if (secondsLeft === 0) {
                userScore = 0;
                clearInterval(timeInt);
                timerEl.textContent = " ";
                alert("Times Up!");
                userScore = 0;
                enterHiSc();
            }
        }, 1000);
};

//Start the game 
startButton.addEventListener("click", startQuiz);
function startQuiz() {
    userScore = 0;
    startTimer();
    introEl.setAttribute("style", "display: none");
    quizEl.setAttribute("style", "display: block");
    loadQuestions();
};

//Load the questions based on the index
function loadQuestions() {
    questionEl.textContent = questions[questionIndex].question;
    b1El.textContent = `${questions[questionIndex].q1}`;
    b2El.textContent = `${questions[questionIndex].q2}`;
    b3El.textContent = `${questions[questionIndex].q3}`;
    b4El.textContent = `${questions[questionIndex].q4}`;
};

//Validate the users choices
var wrongEl = document.querySelector("#wrong");
quizEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches(".quizB")) {
        var check = element.innerText;
        if (check === questions[questionIndex].answer) {
            secondsLeft = secondsLeft + 5;
            alert("Correct!");
            wrongEl.textContent = " ";
            //Run through the questions
            var qLength = questions.length - 1;
            if (questionIndex < qLength) {
                questionIndex++;
                loadQuestions();
            } else {
                //Ran through all the questions - finish
                alert("All Done!");
                userScore = secondsLeft;
                clearInterval(timeInt);
                timerEl.textContent = " ";
                enterHiSc();
            }
        } else {
            secondsLeft = secondsLeft - 5;
            wrongEl.textContent = "Incorrect -5 seconds";
            if (secondsLeft <= 0) {
                userScore = 0;
                clearInterval(timeInt);
                timerEl.textContent = " ";
                alert("Ran out of time!");
                enterHiSc();
            }
        }
    }
});

//Just to see if I could do it, made the elements in JS for the enter high score part.
var mainEl = document.querySelector('main');
var sectionEl = document.createElement("section");
var h1El = document.createElement("h1");
var h2El = document.createElement("h2");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var buttonEl = document.createElement("button");

function enterHiSc() {
    quizEl.setAttribute("style", "display: none");

    mainEl.appendChild(sectionEl);
    sectionEl.appendChild(h1El);
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(labelEl);
    sectionEl.appendChild(inputEl);
    sectionEl.appendChild(buttonEl);

    sectionEl.setAttribute("class", "sectionEl");
    h1El.setAttribute("class", "h1El");
    h2El.setAttribute("class", "h2El");
    labelEl.setAttribute("class", "labelEl");
    inputEl.setAttribute("class", "inputEl");
    inputEl.setAttribute("placeholder", "...");
    buttonEl.setAttribute("class", "buttonEl");

    h1El.textContent = "Thanks for playing!";
    h2El.textContent = `Your score is ${userScore}.`;
    labelEl.textContent = "Please enter your initials: ";
    buttonEl.textContent = "Post";

    //Save values to array
    buttonEl.addEventListener("click", function (event) {
        event.preventDefault();
        var highScore =JSON.parse(localStorage.getItem("highScores")) || [];

        var highScores = {
            name: inputEl.value.trim(),
            score: userScore
        };

        highScore.push(highScores);

        localStorage.setItem("scores", JSON.stringify(highScore));
    });
};
