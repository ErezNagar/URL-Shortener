/*
* URL Shortener
* Datastore
*
* Copyright (c) 2015 Erez Nagar (erez.nagar@gmail.com)
* Licensed under the MIT license.
*/

/*
* The Datastore object
* 
* A Redis instance to store and map original and shortened URLs
*
* NOTE: Datastore persistency is not supported (yet :)).
*/
var Datastore = function(options){
	var isConnected = false;
	var redis = require("redis").createClient(options);

	var Redis = {
		datastore: "urls:",
		Error: {
			INVALID_URL_KEY: "InvalidURLKey",
		}
	};

	//Event handlers
	redis.on("error", function(err) {
	    console.log("Redis error: " + err);
	    isConnected = false;
	});
	redis.on("connect", function() {
	    console.log("Redis connected.");
	    isConnected = true;
	});
	redis.on("ready", function() {
	    console.log("Redis ready.");
	    isConnected = true;
	});
	redis.on("end", function () {
	    console.log("Redis connection ended.");
	    isConnected = false;
	});

	/**
	* As mentioned above, datastore persistency is not implemented.
	*
	*/

	/**
	* Increments and returns the next UID
	*/
	this.nextUID = function(callback){
		redis.hincrby(Redis.datastore, "uid", 1, function(err, count){
			callback(err, count);
		});
	};

	/**
	* Sets a new URL and its encoding in the datastore
	*
	* @param {string} [encoded]		The encoded URL.
	* @param {string} [source]		The source (origin) URL
	* @returns {number} 			The encoded URL in the callback parameter
	*/
	this.setURL = function(encoded, source, callback){
		redis.hset(Redis.datastore, encoded, source, function(err, res){
			callback(err, encoded);
			// callback(err, res);
		});
	};

	/**
	* Retrieves a URL from the datastore
	*
	* @param {string} [key]		The key (encoded URL) to be retrieved.
	*/
	this.getURL = function(key, callback){
		redis.hget(Redis.datastore, key, function(err, data){
			if (err){
				callback(err, null);
				return;
			}
			// reply is null when the key is missing
			else if (!data)
				callback(new Error(Redis.Error.INVALID_URL_KEY), null);
			else
				callback(null, data);
		});
	};

	this.quit = function(){
		redis.quit();
	};
};

module.exports = new Datastore();