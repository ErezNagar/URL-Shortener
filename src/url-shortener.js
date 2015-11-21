/*
* URL Shortener
*
* Copyright (c) 2015 Erez Nagar (erez.nagar@gmail.com)
* Licensed under the MIT license.
*/

var URLShortener = function(options){
	var codec = require("./url-codec.js");
	var datastore = require("./datastore.js");

	var Shortener = {
		urlPattern: /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
		Error: {
			INVALID_URL: "InvalidURL",
		}
	};

	/**
	* Shortens a URL
	*
	* @param {string} [url]		The URL to be shortened
	* @returns {string} 		The encoded (shortened) representation of the URL as a callback parameter.
	*/
	this.shorten = function(url, callback){
		if (typeof url !== "string" || !url.match(Shortener.urlPattern)){
			callback(new Error(Shortener.Error.INVALID_URL), null);
			return;
		}
		
		datastore.nextUID(function(err, uid){
			if (err){
				callback(err, null);
				return;
			}

			datastore.setURL(codec.encode(uid), url, function(err, res){
				if (err){
					callback(err, null);
					return;
				}
				callback(null, res);
			});
		});
	};

	/**
	* Retrieves a shortened URL
	*
	* @param {string} [key]		The encoded representation of the URL to be retrieved.
	* @returns {string} 		The source (original) URL.
	*/
	this.solve = function(key, callback){
		datastore.getURL(key, function(err, res){
			callback(err, res);
		});
	};
};

// var shortener = new URLShortener();
module.exports = new URLShortener();