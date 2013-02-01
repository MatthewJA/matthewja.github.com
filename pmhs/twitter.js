function parseUsername(text) {
    return text.replace(
    	/[@]+[A-Za-z0-9-_]+/g,
    	function(u) {
	        var username = u.replace("@","")
	        return u.link("http://twitter.com/"+username);
    	}
    );
};

function parseHashtags(text) {
    return text.replace(
    	/[#]+[A-Za-z0-9-_]+/g,
    	function(u) {
	        var hashtag = u.replace("#","")
	        return u.link('http://twitter.com/search?q=%23' + hashtag);
    	}
    );
};

function parseDate(text) {
    var v=text.split(' ');
    return Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC");
}

function loadTweets(user, num) {
	var url = 'https://api.twitter.com/1/statuses/user_timeline/' + user + '.json?callback=?&count=' + num;
	$.getJSON(
		url, function(data) {
			console.log(data);
			// make table
			var table = "";
			for (var i = 0; i < num; i++) {
				var tweet = data[i];
				var text = parseHashtags(parseUsername(tweet.text));
				// now that the tweet is dealt with, we need to fix up the date
				var dateInUTC = parseDate(tweet.created_at);
				// how long ago was it?
				var currentDateInUTC = new Date();
				var dateDifference = currentDateInUTC - dateInUTC;
				// dateDifference is time in seconds since the tweet
				// if this is >= 48 hours, show "x days ago"
				// if this is < 48 and >= 2 hours, show "x hours ago"
				// else, show "x minutes ago"
				var dateOut = "";
				if (dateDifference >= 172800000) { // 48 hours
					dateOut = Math.floor(dateDifference/1000/60/60/24) + " days ago"; // back to days
				} else if (dateDifference >= 7200000) { // 2 hours
					dateOut = Math.floor(dateDifference/1000/60/60) + " hours ago"; // back to hours
				} else if (dateDifference >= 120000) { // 2 minutes
					dateOut = Math.floor(dateDifference/1000/60) + " minutes ago"; // back to minutes
				} else {
					dateOut = "1 minute ago";
				}

				table += "<tr><td>" + text + "</td><td>" + dateOut + "</td></tr>"
			};
			// put table into the html
			$("#twitterstream").html(table);
		}
	);
}

$(document).ready(
	function() {
		loadTweets("portmac_hs", 2)
	}
);