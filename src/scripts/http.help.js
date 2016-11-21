// Description:
//	Listens for commands to register a bot
//
// Commands:
//   hubot bot help - Displays all bot commands.
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

const REGEX = /http\s+help/i;
module.exports = (robot) => {

	// RegEx match
	robot.respond(REGEX, (res) => {
		robot.logger.debug(`${TAG}: bot.help - RegEx match - res.message.text=${res.message.text}.`);
		robot.logger.info(`${TAG}: Listing bot help...`);
		
		let help = `${robot.name} http seturl <BASE_URL> - Set the base URL for http method\n`;
		help += `${robot.name} http geturl - Shows the base URL\n`;
		help += `${robot.name} http get <PATH|URL> - Do a HTTP GET on the path or url\n`;
		
		res.reply(help);
	});
	
};