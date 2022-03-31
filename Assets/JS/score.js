var olEl = document.querySelector("#nameScore");
var highScoresList = [];

console.log(highScoresList);

function renderScore(highScoresList) {
  olEl.innerHTML = "";

  for (var i = 0; i < highScoresList.length; i++) {
    var highS = highScoresList[i];
    var liEl = document.createElement("li");
    liEl.textContent = `${highS.name} ${highS.score}`;
    liEl.setAttribute("data-index", i);
    olEl.appendChild(liEl);
  }
}

function init() {
  var highScores = JSON.parse(localStorage.getItem("highScores"));
//   if (highScores !== null) {
//     highScoreList = highScores;
//   }
  console.log(highScores);
  renderScore(highScores);
}

init();
