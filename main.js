/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

//defualt level
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let container = document.querySelector(".container");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
getLastScore();
function getLastScore() {
  let span = document.createElement("span");
  span.innerHTML = `last score: ${localStorage.getItem("last-score")}`;
  span.className = "last-score";
  finishMessage.appendChild(span);
}
function updateLevel() {
  let parentDiv = document.createElement("div");
  parentDiv.className = "level-options";
  parentDiv.innerHTML = "Choose Difficulty";
  let levelsArray = ["Easy", "Normal", "Hard"];
  for (let i = 0; i < 3; i++) {
    let childDiv = document.createElement("div");
    childDiv.className = "level";
    childDiv.innerHTML = levelsArray[i];
    childDiv.addEventListener("click", (e) => {
      defaultLevelName = e.target.innerHTML;
      console.log(e.target.innerHTML);
      updateLevelOptions();
    });
    parentDiv.appendChild(childDiv);
  }
  container.appendChild(parentDiv);
  function updateLevelOptions() {
    //setting Level Name ,seconds ,score
    defaultLevelSeconds = lvls[defaultLevelName];

    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }
  updateLevelOptions();
}
updateLevel();

scoreTotal.innerHTML = words.length;

input.onpaste = function () {
  return false;
};

//start game
startButton.onclick = function () {
  this.remove();
  input.focus();
  generateWord();
};

function generateWord() {
  let idx = Math.floor(Math.random() * words.length);
  let randomWord = words[idx];
  //another methode to get index
  let index = words.indexOf(randomWord);
  words.splice(index, 1);
  // show randonm word
  theWord.innerHTML = randomWord;

  //empty upcoming words
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    const element = document.createElement("div");
    const text = document.createTextNode(words[i]);
    element.appendChild(text);
    upcomingWords.appendChild(element);
  }
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          generateWord();
        } else {
          endGame("Congrats");
        }
      } else {
        endGame("Game Over");
      }
    }
  }, 1000);
}
function endGame(message) {
  let span = document.createElement("span");
  if (message === "Congrats") {
    upcomingWords.remove();
    span.className = "good";
  } else {
    span.className = "bad";
  }
  let spanText = document.createTextNode(message);
  span.appendChild(spanText);
  finishMessage.appendChild(span);
  window.localStorage.setItem("last-score", scoreGot.innerHTML);
}

let myRequest = new XMLHttpRequest();
myRequest.open("GET", "https://api.github.com/users/elzerowebschool/repos");
myRequest.send();
// console.log(myRequest);

myRequest.onreadystatechange = function () {
  console.log(myRequest.status);
  console.log(myRequest.readyState);

  if (myRequest.status === 200 && this.readyState === 4) {
    console.log(myRequest.getResponseHeader("Content-Type"));
    let jsData = JSON.parse(myRequest.responseText);
    console.log(myRequest.responseText);
    console.log(jsData);
  }
};
