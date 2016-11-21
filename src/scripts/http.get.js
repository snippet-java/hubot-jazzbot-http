// Description:
//	Listens for commands to initiate actions against Bluemix
//
// Author:
//	syahrul.aiman@my.ibm.com
//
/*
  * Licensed Materials - Property of IBM
  * (C) Copyright IBM Corp. 2016. All Rights Reserved.
  * US Government Users Restricted Rights - Use, duplication or
  * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
  */
'use strict';

const path = require('path');
const TAG = path.basename(__filename);

const GET = /http\s+get\s+(\S+)/i;
module.exports = (robot) => {

	// RegEx match
	robot.respond(GET, (res) => {
		robot.logger.debug(`${TAG}: http.get - RegEx match - res.message.text=${res.message.text}.`);
		var path = res.match[1].trim();
		var url = "";
		var userId = res.message.user.id;
		
		if (path.match(/^http(s|):\/\//))
			url = path;
		else {
			var key = "url";
			var pref	= robot.brain.get(userId) || {};
			var host	= pref[key] || "";
			if (host === "") {
				res.reply("url is not set for " + userId + ". Please set url and try again.");
				return;
			}
			host = host.replace(/\/$/, "");
			path = path.replace(/^\//, "");
			url = host + "/" + path;
		}
		res.http(url).get()( (err, httpres, body) => {
			if (err) {
				console.log("error:");
				console.log(err)
				res.reply("[http error on " + url + "]:\n" + err);
				return;
			}
			// limit response to only 100 characters
			res.reply("Response:\n\n" + body.substring(0,100));
		});
	});
	
};