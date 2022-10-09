'use strict';

const HttpJSONResponse = require('../entities/HttpJSONResponse');
const MemCommandBus = require('../../../mem/bus/MemCommandBus');
const MemMembersRepository = require('../../../mem/repositories/MemMembersRepository');
const NotifyMembersObserver = require('../../../../observers/NotifyMembersObserver');
const PlaceOrderCommand = require('../../../../commands/PlaceOrderCommand');

const commandBus = new MemCommandBus();
commandBus.subscribe(new NotifyMembersObserver(new MemMembersRepository()));

module.exports.handle = async event => {
	const body = JSON.parse(event.body);
	const basicAuthToken = event.headers.authorization || event.headers.Authorization;
	if (!basicAuthToken || basicAuthToken !== process.env.BASIC_AUTH_TOKEN) {
		return new HttpJSONResponse(403).getValue();
	}
	try {
		await commandBus.publish(new PlaceOrderCommand(body));
	} catch (error) {
		return new HttpJSONResponse(400, { error: error.message }).getValue();
	}
	return new HttpJSONResponse(201).getValue();
};
