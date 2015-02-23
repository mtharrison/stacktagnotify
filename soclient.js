// Load modules

var Zlib = require('zlib');
var Http = require('http');
var Url = require('url');
var Path = require('path');


// Delcare internals

var internals = {
	api: {
		proto: 'http',
		host: 'api.stackexchange.com',
		version: '2.2'
	}
};


exports.get = function (facet, options, callback) {

	var url = internals.buildURL(facet, options);

	internals.makeRequest(url, function (err, payload) {

		if (err) {
			return callback(err, null);
		}
		
		internals.gunzipJSON(payload, function (err, data) {

			if (err) {
				return callback(err, null);
			}

			callback(null, data);
		});
	});

};


internals.makeRequest = function (url, callback) {

	var req = Http.get(url, function (res) {

		var buffers = [];

		res.on('data', function (buffer) {

			buffers.push(buffer);
		});

		res.on('end', function () {

			var payload = Buffer.concat(buffers);
			callback(null, payload);
		});
	});

	req.on('error', function(e) {
		callback(e, null);
	});
};


internals.gunzipJSON = function (payload, callback) {

	Zlib.gunzip(payload, function (err, buffer) {

		if (err) {
			return callback(err, null);
		}

		var str = buffer.toString();

		try {
			var data = JSON.parse(str);
		} catch(e) {
			return callback(e, null);
		}

		callback(err, data);
	});
};


internals.buildURL = function (facet, options) {

	return Url.format({
		protocol: internals.api.proto,
		host: internals.api.host,
		pathname: Path.join(internals.api.version, facet),
		query: options
	});
};