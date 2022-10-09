'use strict';
module.exports = class Order {
	constructor(client, kind, duration, briefing, reference) {
		this.kind = kind;
		this.duration = duration;
		this.briefing = briefing || null;
		this.reference = reference;
		this.client = client;
	}
};
