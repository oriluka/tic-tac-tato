// ==== works for the first element
// var ticTac = document.getElementById("1")
// ticTac.addEventListener("click", changeToX)

// function changeToX() {
//   document.getElementById("1").innerHTML = 'x';
// }
// =================
const isClient = typeof window !== 'undefined';
let app;
if (typeof window !== 'undefined') {
  app = require('app.js')
}

// on dom load, run build board function
globalThis.addEventListener('DOMContentLoaded', (event) => {
  // will prob add a p1 and p2 input here
  counterAndButtons()
  board()
})

// build the board
const board = () => {
  // create the div that holds the board
  var gameBoard = document.createElement("table")
  gameBoard.setAttribute("align", "center");
  gameBoard.setAttribute("id", "board");
  gameBoard.setAttribute("border", "1");
  // create rows using for loops
  for (var i = 0; i < 3; i ++) {
    var gameRow = document.createElement("tr")
    gameRow.setAttribute("id", `${i}`)
    gameBoard.appendChild(gameRow);

    // for loop to make columns
    for (var j = 0; j < 3; j ++) {
      gameColumn = document.createElement("td");
      gameColumn.setAttribute("id", `${i + '' + j}`)
      gameColumn.setAttribute("class", "tictac");
      gameColumn.setAttribute("width", 120);
      gameColumn.setAttribute("height", 120);
      gameColumn.setAttribute("align", "center");
      gameColumn.setAttribute("valign", "center");

      gameColumn.addEventListener("click", toggle);
      gameRow.appendChild(gameColumn);
      //var binded = document.getElementById(`${i + '-' + j}`)
      //console.log('Binded ' + binded)
    }
  }
  var body = document.getElementById('game')
  body.append(gameBoard)
}

const counterAndButtons = () => {
  counter = document.getElementById("counterbuttons")
  counter.setAttribute("align", "center");
  xname = document.createElement("span");
  xname.setAttribute("id", "teamnames");
  xname.innerHTML = "X - Score "
  counter.appendChild(xname);

  counterx = document.createElement("span");
  counterx.setAttribute("id", "xwins");
  counterx.innerHTML = BoardObject.xwins;
  counter.appendChild(counterx);

  counterspace = document.createElement("span");
  counterspace.innerHTML = "  ----  ";
  counter.appendChild(counterspace)

  oname = document.createElement("span")
  oname.setAttribute("id", "teamnames");
  oname.innerHTML = "O - Score "
  counter.appendChild(oname);

  countero = document.createElement("span");
  countero.setAttribute("id", "owins");
  countero.innerHTML = BoardObject.owins;
  counter.appendChild(countero);
}

var BoardObject = {
  actualBoard: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  turnCounter: 0,
  xwins: 0,
  owins: 0
};


const toggle = function(e) {

  var turn;

  if (BoardObject.turnCounter % 2 === 0) {
    turn = 'X';
  } else {
    turn = 'O';
  }

  var index1 = e.target.id[0];
  var index2 = e.target.id[1];

  // change board piece
  if (BoardObject.actualBoard[index1][index2] === 'X' || BoardObject.actualBoard[index1][index2] === 'O') {
    console.log('can\t do that')
  } else {
    BoardObject.actualBoard[index1][index2] = turn;
    BoardObject.turnCounter ++;
    changeDisplay(e, turn);

    if (BoardObject.turnCounter >= 5) {
      winnerCheck(turn);
    }
  }
};

const changeDisplay = function(e, turn) {
  //change display gets e.toElement.innerHTML = change
  e.toElement.innerHTML = turn;
  //console.log(JSON.stringify(BoardObject.actualBoard))
}

const changeScore = function(letter) {
  if (letter === 'X') {
    var newScore = document.getElementById("xwins");
    newScore.innerHTML = BoardObject.xwins;
  }
  if (letter === 'O') {
    var newScore = document.getElementById("owins")
    newScore.innerHTML = BoardObject.owins;
  }
}


const displayWinButton = function(letter) {

  if (letter === 'X') {
    BoardObject.xwins++;
  }
  if (letter === 'O') {
    BoardObject.owins++
  }
  changeScore(letter);
  var endgame = document.createElement("div")
  endgame.setAttribute("id", "endgame")

  if (!letter) {
    var tie = document.createElement("h3")
    tie.setAttribute("align", "center")
    tie.innerHTML = "Tie!"
    endgame.appendChild(tie);
  } else {
    var winner = document.createElement("h3")
    winner.setAttribute("align", "center")
    winner.innerHTML = `Nice! ${letter} won!`
    endgame.appendChild(winner)
  }

  var newGame = document.createElement("button");
  newGame.setAttribute("align", "center");
  newGame.setAttribute("id", "newgame");
  newGame.innerHTML = "Start a new game?"
  newGame.onclick = startNewGame;
  endgame.appendChild(newGame)

  var buttonplace = document.getElementById("announcements")
  buttonplace.setAttribute("align", "center")
  buttonplace.appendChild(endgame)


}


const startNewGame = function(letter) {


  document.getElementById("board").remove();
  document.getElementById("endgame").remove();
  board();
  // reset board object
  BoardObject.actualBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  BoardObject.turnCounter = 0;

}

const winnerCheck = function(letter) {
  // check diagonal
  if (BoardObject.actualBoard[1][1] === letter) {
    if (BoardObject.actualBoard[0][0] === letter && BoardObject.actualBoard[2][2] === letter) {
      displayWinButton(letter)
      //startNewGame(letter);

    }
    if (BoardObject.actualBoard[0][2] === letter && BoardObject.actualBoard[2][0] === letter) {
      displayWinButton(letter)
      //startNewGame(letter);

    }
  }

  // Check rows
  for (var i = 0; i < 3; i ++) {
    var winner = true;
    for (var j = 0; j < 3; j ++) {
      if (BoardObject.actualBoard[i][j] !== letter) {
        winner = false;
      }
    }
    if (winner) {
      displayWinButton(letter)
      //startNewGame(letter);
    }
  }

  for (var i = 0; i < 3; i++) {
    var winner = true;
    for (var j = 0; j < 3; j++) {
      if (BoardObject.actualBoard[j][i] !== letter) {
        winner = false;
      }
    }
    if (winner) {
      displayWinButton(letter)
      //startNewGame(letter);
    }
  }

  if (BoardObject.turnCounter === 9) {
    console.log('tie!')
    displayWinButton()
    //startNewGame();
  }
}



