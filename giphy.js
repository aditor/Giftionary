var fetchUrl = require("fetch").fetchUrl;

function parseGiphyResponse(text, callback) {
    var query = text.replace(" ", "+");
    var apiCallUrl = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + query;
    fetchUrl(apiCallUrl, function(error, meta, body) {
	
	var imageUrl = JSON.parse(body.toString()).data.image_url;
	callback(imageUrl);
    });
}

exports.parseGiphyResponse = parseGiphyResponse;
