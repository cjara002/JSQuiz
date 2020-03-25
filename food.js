var questions = [
  new Question("What kind of food do you like?", [
    "French",
    "Indian",
    "Japanese",
    "Mexican",
    "Chinese"
  ]),
  new Question("What is your budget per meal?", [
    "0.00-5.00",
    "5.00-10.00",
    "10.00-15.00",
    "15.00-20.00",
    "20.00+"
  ]),
  new Question("What is your zipcode?", []),
  new Question("How many miles do you want to go?", [])
];

//I am getting question, chioces, and the answer
function Question(text, choices) {
  console.log("function Question:", text, choices);
  this.text = text;
  this.choices = choices;
}

function Quiz(questions) {
  console.log("function Quiz:", questions);
  this.questions = questions;
  this.questionIndex = 0;
  this.results = [];
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function() {
  return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function(answer) {
  console.log("guess:", answer);
  //here is where th console log get read. What sets this function off?
  this.questionIndex++;
  this.results.push(answer);
  // window.clearInterval(timer);
};

function submitAnswer() {
  var collectAnswer = document.getElementById("answerText").value;
  quiz.guess(collectAnswer);
  populate();
}

var quiz = new Quiz(questions);

// let time = true;

let timeLeft = 10;

//this populate starts the whole process? Should it not be on the top then? Unless everything before is used to define what will be used below.
populate(timeLeft);

function populate() {
  if (quiz.isEnded()) {
    showResults();
  } else {
    //show question
    var element = document.getElementById("questionHeader");
    element.innerHTML = quiz.getQuestionIndex().text;
    //show chioces
    var choices = quiz.getQuestionIndex().choices;
    // put if right here
    if (choices.length > 0) {
      for (let i = 0; i < choices.length; i++) {
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        guess("input" + i, choices[i]);
      }
      if (10 <= timeLeft) {
        // makeAlert(timeLeft);
        showProgress();
      } else {
        clearTimer();
      }
    } else {
      var textbox =
        ' <div class="input-group-prepend" id="questionTextBox"> <textarea class="form-control" id="answerText" placeholder="Write text here.." aria-label="With textarea"></textarea> </div>';
      var elementText = document.getElementById("questionTextBox");
      elementText.outerHTML = textbox;
      showProgress();
    }
  }
}

//==================Progess bar Start =============================//
function showProgress() {
  // debugger;
  var progressBar = document.getElementById("myProgress");
  var progressLi = progressBar.getElementsByClassName("list");
  for (let i = 0; i < progressLi.length; i++) {
    const progress = progressLi[i];
    if (progress.className === "list") {
      return progress.addEventListener("click", handleActive(progress));
    }
  }
}

function handleActive(progress) {
  console.log("handleActive:", progress);
  // debugger;
  var current = progress;
  current = current.classList.add("active");
}

//==================Progess bar end =============================//
function guess(id, guess) {
  //this is where I should focus on
  //   debugger;
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
    if (0 < timeLeft < 10) {
      clearTimer();
    }
    // window.clearTimer(timer)
  };
}

function showResults() {
  debugger;
  const results = quiz.results;
  const questions = quiz.questions;
  let displayToUser = [];
  for(let i = 0; i < results.length; i++){
    for(let j = 0; j < questions.length; j++){
     let response = questions[j].text + " " + results[i];
     displayToUser.push(response)
     break;
    }
  }
  console.log("showResults:", results);
  console.log("showQuestions:", questions);
  console.log("displayToUser:", displayToUser);
  var gameOverHtml = "<h1> You did it!<h1>";
  gameOverHtml += "<h2 id='score'> Look at your results below. <h2>" + results;
  var element = document.getElementById("endGame");
  //hide elements
  document.getElementById("answerHold").style.display = "none";
  document.getElementById("myProgress").style.display = "none";
  element.innerHTML = gameOverHtml;
}

function makeAlert() {
  if (-1 < quiz.questionIndex && quiz.questionIndex <= 1) {
    // let timeLeft = 10;
    return (timer = setInterval(function() {
      document.getElementById("countdown").innerHTML =
        timeLeft + " " + "seconds remaining";
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearTimer(timer);
        // let timeLeft = 10;
        document.getElementById("countdown").innerHTML = "Next Question..";
        let noAnswer = "No answer selected.";
        quiz.guess(noAnswer);
        populate();
      }
    }, 1000));
  } else {
    let element = document.getElementById("countdown");
    element.style.display = "none";
  }
}

function clearTimer(timer) {
  //   debugger;
  clearInterval(timer);
  // timeLeft = false;
}
