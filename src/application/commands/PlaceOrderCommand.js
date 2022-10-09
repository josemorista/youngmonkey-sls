'use strict';

const { COMMANDS } = require('../../constants');
const Client = require('../../domain/entities/Client');
const Order = require('../../domain/entities/Order');
const Command = require('./Command');

module.exports = class PlaceOrderCommand extends Command {
	constructor({ clientName, contactPhone, enterprise, duration, reference, briefing, services }) {
		super();
		this.payload = new Order(new Client(clientName, contactPhone, enterprise), duration, briefing, reference, services);
	}

	getName() {
		return COMMANDS.PLACE_ORDER;
	}

	async getPayload() {
		return this.payload;
	}
};
