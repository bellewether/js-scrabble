var Scrabble = function() {};

var scoreChart = {
  1: ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"],
  2: ["d", "g"],
  3: ["b", "c", "m", "p"],
  4: ["f", "h", "v", "w", "y"],
  5: ["k"],
  8: ["j", "x"],
  10: ["q", "z"]
};

// YOUR CODE HERE
Scrabble.scoreThisWord = function(word) {
  var score = 0;
  var word = word.toLowerCase();

  for (var i = 0; i < word.length; i++) {
    for (var j in scoreChart) {
      if (scoreChart[j].includes(word[i])) {
        score = score + parseInt(j);
        break
      }
    }
  }

  // add 50 point bonus for using all 7 tiles
  if (word.length == 7) {
    score = score + 50;
  }

  return score;
};

// currently, in the event of a tie, function is returning the second highest scoring word and not the first
Scrabble.highestScoreFrom = function(arrayOfWords) {
  var maxScore = 0;
  var maxWords = [];
  var highestScoringWord = null;

  // find the highest score in an array of words
  for (var i = 0; i < arrayOfWords.length; i++) {
    var wordScore = this.scoreThisWord(arrayOfWords[i]);
    if (wordScore >= maxScore) {
      maxScore = wordScore;
    }
  }

  // collect highest scoring word(s) in an array
  for (var j = 0; j < arrayOfWords.length; j++) {
    var wScore = this.scoreThisWord(arrayOfWords[j]);
    if (wScore == maxScore) {
      maxWords.push(arrayOfWords[j]);
    }
  }

  // find the highest scoring word
  for (var k = 0; k < maxWords.length; k++) {
    var currentShortLength = 7;

    if (maxWords[k].length == 7) {
      highestScoringWord = maxWords[k];
      return highestScoringWord;
    } else if (maxWords[k].length < currentShortLength) {
      currentShortLength = maxWords[k].length;
      highestScoringWord = maxWords[k];
    }
  }

  // return the word in the array with the highest score
  return highestScoringWord;
};



// Player Constructor
var Player = function(name) {
  this.name = name;
  this.plays = []; // an array of words played by the player
  this.totalScore = 0;
};

// this function should add the input word to the plays array
Player.prototype.play = function(word) {
  if (this.hasWon() == false) {
    this.plays.push(word); // adds the word to the plays array
    this.totalScore += Scrabble.scoreThisWord(word);
  } else {
  return false;
  }
};

Player.prototype.hasWon = function() {
  if (this.totalScore >= 100) {
    return true;
  }
  return false;
};

Player.prototype.highestScoringWord = function() {
  return Scrabble.highestScoreFrom(this.plays);
};

// this function not working quite yet
Player.prototype.highestWordScore = function() {
  var highWord = this.highestScoringWord();
  var highScore = Scrabble.scoreThisWord(highWord);

  return highScore;
};

module.exports = Scrabble;
module.exports = Player;


// Random things I was using to test
var myWordScore = new Scrabble;
var aScore = Scrabble.scoreThisWord("QX");
var scoredThing = Scrabble.highestScoreFrom(["WORD", "XXX", "salamander", "JJJ"])
console.log(scoredThing);

var FootFoot = new Player("FootFoot");
FootFoot.play("XXX");
FootFoot.play("JJJ");
FootFoot.play("CAT");
console.log(FootFoot.plays);
console.log(FootFoot.totalScore);
console.log(FootFoot.highestScoringWord(FootFoot.plays))
console.log(FootFoot.highestWordScore)
