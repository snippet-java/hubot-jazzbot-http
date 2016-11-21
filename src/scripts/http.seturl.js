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

const SETURL = /http\s+seturl\s+(.*)/i;
module.exports = (robot) => {

	// RegEx match
	robot.respond(SETURL, (res) => {
		robot.logger.debug(`${TAG}: http.seturl - RegEx match - res.message.text=${res.message.text}.`);
		var key = "url";
		var value = res.match[1].trim();
		var userId = res.message.user.id;
		
		if (value.match(/^http(s|):\/\//i)) {
			var pref	= robot.brain.get(userId) || {};
			pref[key]	= value;
			robot.brain.set(userId, pref);
			res.reply(key + ' SET TO \"' + value + '" for ' + res.message.user.id);
		} else {
			res.reply("url " + value + " is invalid. Please try another url");
		}
	});
	
};