'use strict';

const Client = require('../../domain/entities/Client');

describe('Client unit tests', () => {
	it('Should not create client with missing required info', () => {
		[
			{ missing: 'name', params: [undefined, 999999999] },
			{ missing: 'contactPhone', params: ['name', undefined] },
		].forEach(({ missing, params }) => {
			expect(() => {
				new Client(params[0], params[1]);
			}).toThrow(`Missing client ${missing}`);
		});
	});
});
