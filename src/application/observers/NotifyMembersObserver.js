'use strict';

const fetch = require('node-fetch');
const CommandObserver = require('./CommandObserver');
const { COMMANDS } = require('../../constants');

module.exports = class NotifyMembersObserver extends CommandObserver {
	constructor(membersRepository) {
		super();
		this.membersRepository = membersRepository;
	}

	getObservable() {
		return COMMANDS.PLACE_ORDER;
	}

	getParameters(order, member) {}

	async notify(command) {
		const order = await command.getPayload();
		const members = await this.membersRepository.all();
		Promise.all(members.map(member => fetch()));
	}
};
