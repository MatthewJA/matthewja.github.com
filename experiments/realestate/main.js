// Overall layout variables
var width = 800;
var height = 500;

// Grid variables
var gridSize = 50; // 50, 25, 20, 10 - should be common factor of width and height.

// Arrays of things we have already, for later reference.
var roads = [];
var houses = [];

var grid = []; // Actual grid definition.

// Game info
var money = 100000;

function randomInteger(min, max) {
	return Math.floor(Math.random()*(max-min) + min);
}

function makeGridDiv(x, y, w, h, type) {
	var newDiv = $('<div/>', {
		id: 'grid-' + x + "-" + y,
		style: 'position:absolute; width:' + w + 'px; height:' + h + 'px;'
	});
	newDiv.attr('class', "viewer-" + type);
	newDiv.css("top", y * gridSize + "px");
	newDiv.css("left", x * gridSize + "px");
	newDiv.appendTo('#viewer');
}

function updateGridDisplay(x, y) {
	grid[y][x].reprDiv.attr('class', "viewer-" + grid[y][x].contents)
}

function addHouse(x, y) {
	grid[y][x].contents = "house";
	houses.push(grid[y][x]);
	updateGridDisplay(x, y);
}

function addRoad(x, y) {
	grid[y][x].contents = "road";
	roads.push(grid[y][x]);
	updateGridDisplay(x, y);
}

function initialise() {
	// Make the grid.
	for (var y = 0; y < height/gridSize; y++) {
		var p = [];
		for (var x = 0; x < width/gridSize; x++) {
			var newDiv = makeGridDiv(x, y, gridSize, gridSize, "grass");
			p.push({"contents":"grass", "x":x, "y":y, reprDiv:$("#grid-" + x + "-" + y)});
		};
		grid.push(p);
	};

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
	
	// Pick a road and add a house above it.
	// Five times!
	for (var i = 0; i < 5; i++) {
		while (true) { // Is it obvious I am a Python programmer
			var roadNum = randomInteger(0, roads.length);
			if (roads[roadNum].y != 0) {
				if (grid[roads[roadNum].y-1][roads[roadNum].x].contents == "grass") {
					addHouse(roads[roadNum].x, roads[roadNum].y-1);
					break;
				}
			}
		};
	};
};

$(document).ready(function() {
	initialise();
});
