// Overall layout variables
var width = 800;
var height = 500;

// Grid variables
var gridSize = 50; // 25, 20, 10 - must be common factor of width and height.
var gridAppearance = { // Background colour for grid squares depending on their type. Replace with images later.
	"road": "444444"
};

// Arrays of things we have already, for later reference.
var roads = [];

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

function addRoad(x, y) {
	grid[y][x].contents = "road";
	roads.push(grid[y][x]);
	updateGridDisplay(x, y);
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
		addRoad(x, roadYPos);
	};

	// Pick a random road square and branch the road.
	// We can branch in any direction and we'll keep going until we hit the edge of the view.
	var branchNum = randomInteger(0, roads.length);
	var branchX = roads[branchNum].x;
	if (randomInteger(0, 2) == 1) {
		for (var y = roads[branchNum].y; y < height/gridSize; y++) {
			addRoad(branchX, y);
		};
	} else {
		for (var y = roads[branchNum].y; y >= 0; y--) {
			addRoad(branchX, y);
		};
	}
};

$(document).ready(function() {
	initialise();
});
