/*
* URLCodec
*
* Copyright (c) 2015 Erez Nagar (erez.nagar@gmail.com)
* Licensed under the MIT license.
*/

/*
* URLCodec object
* 
* Encodes/decodes non-negative numbers to/from a base 62 strings
*/
var URLCodec = function(){
	var ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var base = ALPHABET.length;

	/**
	* Encodes a URL's UID to an ALPHABET string
	*
	* @param {number} [uid]		A UID number to be encoded.
	* @returns {string} 		The encoded UID as an ALPHABET string.
	*/
	this.encode = function(uid){
		var encoded = "";

		if (uid == 0)
			return ALPHABET[0];


		while (uid > 0){
			encoded = ALPHABET.charAt(uid % base) + encoded;
			uid = Math.floor(uid / base);
		}
		return encoded;
	};

	/**
	* Decodes a URL from ALPHABET to its UID
	*
	* @param {string} [url]		The URL to be decoded.
	* @returns {number} 		The decoded UID.
	*/
	this.decode = function(url){
		if (typeof url !== "string")
			return "";

		var pos = 1;
		var uid = 0;
		for (var i = url.length - 1; i > -1 ; i--){
			if (ALPHABET.indexOf(url.charAt(i)) == -1)
				return -1;

			uid += ALPHABET.indexOf(url.charAt(i)) * pos;
			pos *= base;
			
		}
		return uid;
	};
};

module.exports = new URLCodec();