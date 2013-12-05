/* The MIT License (MIT)

 * Copyright (c) 2013 MatthewJA

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * DO NOT HOTLINK. If you want to use this script, copy it to your site
 * or download it to your server. This file is liable to be changed or
 * deleted at any time.
 */

var pigeonUrl = "http://i53.photobucket.com/albums/g55/Cheshire_Cat_123/pigeon_zpsb150cef3.gif"; // Image of the pigeon.
var pigeonWidth = 68; // Width of the pigeon image.
var pigeonHeight = 66; // Height of the pigeon image.
var numberOfPigeons = 10; // How many pigeons you want.
var speed = 1; // How fast the pigeons move.

var pigeons = [];
var width = $(window).width();
var height = $(window).height();

function movePigeons() {
	width = $(window).width();
	height = $(window).height();
	for (var i = 0; i < pigeons.length; i++) {
		var p = $(pigeons[i].img).position();
		var top = p.top + pigeons[i].vy*speed;
		var left = p.left + pigeons[i].vx*speed;
		if (top < $(window).scrollTop()) {
			pigeons[i].vy = -pigeons[i].vy;
			top = $(window).scrollTop();
		} else if (top + pigeonHeight >= height+$(window).scrollTop()) {
			pigeons[i].vy = -pigeons[i].vy;
			top = height + $(window).scrollTop() - pigeonHeight + pigeons[i].vy*speed;
		}
		if (left < 0) {
			pigeons[i].vx = -pigeons[i].vx;
			left = 0;
		} else if (left + pigeonWidth + 32 >= width) {
			pigeons[i].vx = -pigeons[i].vx;
			left = width - 32 - pigeonWidth + pigeons[i].vx*speed;
		}
		if (pigeons[i].dancing === true) {
			pigeons[i].theta += 0.08;
			var w = Math.abs(Math.sin(pigeons[i].theta))*pigeonWidth + pigeonWidth;
			$(pigeons[i].img).css("width", "" + w + "px");
			if (pigeons[i].theta%(Math.PI) < 0.1) {
				pigeons[i].vx = -pigeons[i].vx;
				if (pigeons[i].vx > 0) {
					pigeons[i].img.setAttribute("style", 'position:absolute; -moz-transform: scaleX(-1); -o-transform: scaleX(-1); -webkit-transform: scaleX(-1); transform: scaleX(-1); filter: FlipH; -ms-filter: "FlipH";');
				} else {
					pigeons[i].img.setAttribute("style", 'position:absolute;');
				}
			}
		}
		$(pigeons[i].img).css("top", "" + top + "px");
		$(pigeons[i].img).css("left", "" + left + "px");
	};
};

for (var i = 0; i < numberOfPigeons; i++) {
	var p = document.createElement("img");
	p.setAttribute("src", pigeonUrl);
	var x = Math.random()*(width-pigeonWidth-32);
	var y = Math.random()*(height-pigeonHeight);
	p.setAttribute("style", "position:absolute;top:" + y + "px;left:" + x + "px;");
	p.setAttribute("class", "flyingpigeon");
	document.getElementsByTagName("body")[0].appendChild(p);

	var vx = Math.random()*2-1;
	var vy = Math.random()*2-1;
	var pigeon = {
		'x':x,
		'y':y,
		'vx':vx,
		'vy':vy,
		'img':p,
		'dancing':false,
		'theta':0
	}
	pigeons.push(pigeon);
};

console.log("coo coo");

setInterval(function() {movePigeons();}, 10);

$(".flyingpigeon").click(function() {
	var s = document.createElement("audio");
	var g = document.createElement("source");
	g.setAttribute("src", "dance.mp3");
	g.setAttribute("type", "audio/mpeg");
	s.appendChild(g);
	document.getElementsByTagName("body")[0].appendChild(s);
	s.play();
	for (var i = 0; i < pigeons.length; i++) {
		pigeons[i].dancing = true;
	};
	console.log("COO COO");
})