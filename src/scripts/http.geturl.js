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

const GETURL = /http\s+geturl/i;
module.exports = (robot) => {

	// RegEx match
	robot.respond(GETURL, (res) => {
		robot.logger.debug(`${TAG}: http.geturl - RegEx match - res.message.text=${res.message.text}.`);
		
		var key		= "url";
		var userId	= res.message.user.id;
		
		var pref	= robot.brain.get(userId) || {};
		var value	= pref[key] || "";
		if (value === "")
			res.reply('url IS NOT SET for ' + res.message.user.id);
		else
			res.reply('url IS \"' + value + '" for ' + res.message.user.id);
	});
	
};