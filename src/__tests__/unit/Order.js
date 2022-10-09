'use strict';

const { SERVICES_AVAILABLE } = require('../../constants');
const Client = require('../../domain/entities/Client');
const Order = require('../../domain/entities/Order');

let client;
describe('Order unit tests', () => {
	beforeAll(() => {
		client = new Client('client', 99999999);
	});

	it('Should not create order with missing client', () => {
		expect(() => {
			new Order(null);
		}).toThrow('Missing order client');
	});

	it('Should not create empty order', () => {
		expect(() => {
			new Order(client, null, null, null, []);
		}).toThrow('Empty order');
	});

	it('Should not create an order with invalid services', () => {
		expect(() => {
			new Order(client, null, null, null, ['A']);
		}).toThrow('Invalid service');
	});

	it('Should create an order with valid services', () => {
		const order = new Order(client, null, null, null, [SERVICES_AVAILABLE[0]]);
		expect(order instanceof Order).toBeTruthy();
	});
});
