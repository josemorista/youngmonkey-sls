'use strict';

const { SERVICES_AVAILABLE } = require('../../constants');
const Order = require('../../domain/entities/Order');
const Client = require('../../domain/entities/Client');

const PlaceOrderCommand = require('../../application/commands/PlaceOrderCommand');
const MemCommandBus = require('../../application/bus/MemCommandBus');
const NotifyMembersObserver = require('../../application/observers/NotifyMembersObserver');
const MemMembersRepository = require('../../application/infra/mem/repositories/MemMembersRepository');

const input = {
	clientName: 'client',
	contactPhone: 99999999,
	enterprise: 'Enterprise',
	duration: '0-1 minuto',
	reference: 'https://link.com',
	briefing: 'Briefing',
	services: [SERVICES_AVAILABLE[0]],
};

const expectedOrder = new Order(
	new Client(input.clientName, input.contactPhone, input.enterprise),
	input.duration,
	input.briefing,
	input.reference,
	input.services
);

describe('Place Order-integration', () => {
	it('Should call registered observers with correct payload', async () => {
		const commandBus = new MemCommandBus();
		const membersRepository = new MemMembersRepository();
		const notifyMembersObserver = new NotifyMembersObserver(membersRepository);
		notifyMembersObserver.notify = jest.fn();
		commandBus.subscribe(notifyMembersObserver);
		const command = new PlaceOrderCommand(input);
		expect(await command.getPayload()).toMatchObject(expectedOrder);
		await commandBus.publish(command);
		expect(notifyMembersObserver.notify).toHaveBeenCalled();
	});
});
