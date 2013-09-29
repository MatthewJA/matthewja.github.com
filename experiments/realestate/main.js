// Overall layout variables
var width = 800;
var height = 500;

// Grid variables
var gridSize = 50; // 25, 20, 10 - must be common factor of width and height.
var gridAppearance = { // Background colour for grid squares depending on their type. Replace with images later.
	"road": "444444"
};

var grid = []; // Actual grid definition.
for (var y = 0; y < height/gridSize; y++) {
	var p = [];
	for (var x = 0; x < width/gridSize; x++) {
		p.push({"contents":null, "x":x, "y":y})
	};
	grid.push(p);
};

function randomInteger(min, max) {
	return Math.floor(Math.random()*(max-min) + min);
}

function updateGridDisplay(x, y) {
	$("#grid-" + x + "-" + y).remove();

	if (grid[y][x].contents != null) {
		var newDiv = $('<div/>', {
			id: 'grid-' + x + "-" + y,
			style: 'position:absolute; width:' + gridSize + 'px; height:' + gridSize + 'px; background-color:#' + gridAppearance[grid[y][x].contents]
		});
		newDiv.addClass("road");
		newDiv.css("top", y * gridSize + "px");
		newDiv.css("left", x * gridSize + "px");
		newDiv.appendTo('#viewer');
	}
}

function initialise() {
	// Set the road.
	// Road runs from a random x value less than 6, to a random length up to 10.
	// Random y value between 4 and 7.
	var roadMin = randomInteger(0, 6);
	var roadLength = randomInteger(5, 10);
	var roadMax = roadMin + roadLength;
	var roadYPos = randomInteger(4, 8);

	for (var x = roadMin; x <= roadMax; x++) {
		grid[roadYPos][x].contents = "road";
		updateGridDisplay(x, roadYPos);
		console.log("ok");
	};
};

$(document).ready(function() {
	initialise();
});
