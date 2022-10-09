'use strict';

const CommandObserver = require('./CommandObserver');
const { COMMANDS } = require('../../constants');

module.exports = class NotifyMembersObserver extends CommandObserver {
	getObservable() {
		return COMMANDS.PLACE_ORDER;
	}

	async notify(command) {
		console.log(command);
	}
};
