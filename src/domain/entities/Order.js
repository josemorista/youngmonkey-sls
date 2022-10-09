'use strict';
const { SERVICES_AVAILABLE } = require('../../constants');
module.exports = class Order {
	constructor(client, duration, briefing, reference, services) {
		this.client = client;
		this.services = services;
		this.duration = duration || null;
		this.reference = reference || null;
		this.briefing = briefing || null;
		this.#validateOrder();
	}

	#validateOrder() {
		['client', 'services'].forEach(required => {
			if (!this[required]) throw new Error(`Missing order ${required}`);
		});
		if (!this.services.length) throw new Error('Empty order');
		for (const service of this.services) {
			if (!SERVICES_AVAILABLE.includes(service)) throw new Error('Invalid service');
		}
	}
};
