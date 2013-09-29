var width = 800;
var height = 500;

var gridSize = 50; // 25, 20, 10 - must be common factor of width and height.

var grid = []
for (var y = 0; y < height/gridSize; y++) {
	var p = [];
	for (var x = 0; x < width/gridSize; x++) {
		p.push({"contents":null, "x":x, "y":y})
	};
	grid.push(p);
};

function updateGridDisplay(x, y) {
	$("#grid-" + x + "-" + y).remove();

	if (grid[y][x].contents == "road") {
		var newDiv = $('<div/>', {
			id: 'grid-' + x + "-" + y,
			style: 'position:absolute; width:' + gridSize + 'px; height:' + gridSize + 'px; background-color:#444444;'
		});
		newDiv.addClass("road");
		newDiv.css("top", y * gridSize + "px");
		newDiv.css("left", x * gridSize + "px");
		newDiv.appendTo('#viewer');
	}
}

function initialise() {
	// Set the road.
	// Road runs from x = 3 to x = 10 and at y = 5.
	for (var x = 3; x <= 10; x++) {
		grid[5][x].contents = "road";
		updateGridDisplay(x, 5);
		console.log("ok");
	};
};

$(document).ready(function() {
	initialise();
});
