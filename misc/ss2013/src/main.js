function getParameter(varSearch) {
	// http://javascriptproductivity.blogspot.com.au/2013/02/get-url-variables-with-javascript.html
	var searchString = window.location.search.substring(1);
	var variableArray = searchString.split('&');
	for(var i = 0; i < variableArray.length; i++){
		var keyValuePair = variableArray[i].split('=');
		if(keyValuePair[0] == varSearch){
			return keyValuePair[1];
		}
	}
};

var queryString = "?";

// Pick three random frames.
var frameOptions = 8; // Number of the highest-numbered frame file.

for (var i = 1; i <= 3; i++) {
	var gp = getParameter("frame" + i);

	if (gp) {
		var frameID = parseInt(gp);
	} else {
		var frameID = Math.round(Math.random()*frameOptions);
	}

	var frame = document.createElement("img");
	frame.src = "./static/frames/" + frameID + ".png";

	document.querySelector("#panel-" + i + " .frame").appendChild(frame);

	queryString += "frame" + i + "=" + frameID + "&";
}

// Pick two random setup panels.
var setupOptions = 6; // Number of the highest-numbered setup panel file.

for (var i = 1; i <= 2; i++) {

	var gp = getParameter("panel" + i);

	if (gp) {
		var panelID = parseInt(gp);
	} else {
		var panelID = Math.round(Math.random()*setupOptions);
	}

	var panel = document.createElement("img");
	panel.src = "./static/panels/setup/" + panelID + ".png";

	document.querySelector("#panel-" + i + " .art").appendChild(panel);

	queryString += "panel" + i + "=" + panelID + "&";
}

// Pick a random final panel.
var finalOptions = 2; // Number of the highest-numbered final panel file.

var gp = getParameter("panel" + 3);

if (gp) {
	var finalID = parseInt(gp);
} else {
	var finalID = Math.round(Math.random()*finalOptions);
}

var finalPanel = document.createElement("img");
finalPanel.src = "./static/panels/punchline/" + finalID + ".png";

document.querySelector("#panel-" + 3 + " .art").appendChild(finalPanel);

// Pick two random texts.
var textOptions = 12; // Number of the highest-numbered text file.

for (var i = 1; i <= 2; i++) {
	var gp = getParameter("text" + i);

	if (gp) {
		var textID = parseInt(gp);
	} else {
		var textID = Math.round(Math.random()*textOptions);
	}

	var text = document.createElement("img");
	text.src = "./static/text/" + textID + ".png";

	document.querySelector("#panel-" + i + " .text").appendChild(text);

	queryString += "text" + i + "=" + textID + "&";
}

queryString += "panel3" + "=" + finalID;

// Set the URL.
window.history.pushState({}, "", queryString);