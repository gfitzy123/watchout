// start slingin' some d3 here.

var gameOptions = {
  height: window.innerHeight,
  width: window.innerWidth,
  enemies: 30,
  padding: 20
}

var numberOfenemies = gameOptions.enemies

// Create a difficulty level that affects the speed of enemies moving on board
var userInput = prompt("Please choose Easy, Medium, or Hard.")

var difficultyLevel = function() {
	var interval = 0
	if (userInput.toUpperCase() === 'EASY') {
			interval = 2500
	}	else if (userInput.toUpperCase() === 'MEDIUM') {
				interval = 1200
 		}	else if (userInput.toUpperCase() === 'HARD') {
					interval = 500
 				}		return interval
}


//Create SVG board, called gameBoard

var gameBoard = svg = d3.select('.container')
.append("svg:svg")
.attr('width', gameOptions.width)
.attr('height', gameOptions.height)
.style('background-color', 'red')

//Create a function that creates an array based on the amount of enemies given in gameOptions
var createEnemies = function(num) {
  var arrayOfenemies = [];
  for(var i = 0; i < num; i++){
    arrayOfenemies.push(1);
  }
  return arrayOfenemies;
}

// Use that array to append enemies on gameBoard, in random spaces

var enemies = svg.selectAll("enemies")
.data(createEnemies(gameOptions.enemies))
.enter().append("circle")
.attr("cx", function () {
  return (Math.random() * gameOptions.width);
})
.attr("cy", function () {
  return (Math.random() * gameOptions.height);
})
.attr("r", function () {
  return 10;
})
.attr("fill","blue");

// Create a function that changes the position of all enemies on the board

var changeEnemyPositions = function () {
  enemies
  .transition()
  .attr("cx", function () {
    return (Math.random() * gameOptions.width);
  })
  .attr("cy", function () {
    return (Math.random() * gameOptions.height);
  })
  .attr("r", function () {
    return 10;
  })
  .attr("fill","blue");
}

//Create a function that changes enemy positions based on a interval given in difficulty level

var moveEnemies = function (interval) {
  setInterval(function() { changeEnemyPositions() }, interval);
}

moveEnemies(difficultyLevel());







