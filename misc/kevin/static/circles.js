/*
	Plot circles on a map of Virginia, which display information when you mouseover them.
*/

//// OBJECTS ////

// Circle

function Circle(x, y) {
	// Position, as a percentage of width and height.
	this.x = x;
	this.y = y;

	// Radius
	this.r = 20;
}

//// GLOBALS ////

// Dimensions of the map, in pixels.
var mapWidth = 600;
var mapHeight = 267;

// Holds all the circles to be plotted.
var circles = [
	new Circle(0.9, 0.9),
	new Circle(0.5, 0.5)
];

// Holds all of the divs corresponding to circles.
// Generated in createDivs.
var circleDivs = [];

//// FUNCTIONS ////

function main() {
	// Create divs of the circles and plot them onto the map.
	createDivs();
}

function createDivs() {
	var map = document.getElementById("map");

	// For each circle, make a new div and append it to the map.
	for (var c = 0; c < circles.length; c++) {
		// Fetch the circle from the list of circles.
		var circle = circles[c];

		// Make a div for the circle.
		var circleDiv = document.createElement("div");
		circleDiv.className = "circle";

		// Position the circle.
		circleDiv.style.position = "absolute";
		circleDiv.style.left = (circle.x * mapWidth)+"px";
		circleDiv.style.top = (circle.y * mapHeight)+"px";
		circleDiv.style.width = circle.r * 2 + "px";
		circleDiv.style.height = circle.r * 2 + "px";

		// Put the div into the circleDivs array and then add it to the document.
		circleDivs.push(circleDiv);
		map.appendChild(circleDiv);
	};
}

//// MAIN ////

window.onload = main();