'use strict';
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
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

	#getParameters(order, member) {
		return [
			{
				type: 'text',
				text: member.name,
			},
			{
				type: 'text',
				text: order.client.name,
			},
			{
				type: 'text',
				text: order.client.enterprise || '_',
			},
			{
				type: 'text',
				text: order.services.join(', '),
			},
			{
				type: 'text',
				text: order.duration || '_',
			},
			{
				type: 'text',
				text: order.reference || '_',
			},
			{
				type: 'text',
				text: order.client.contactPhone,
			},
			{
				type: 'text',
				text: order.briefing || '_',
			},
		];
	}

	async notify(command) {
		const order = await command.getPayload();
		const members = await this.membersRepository.all();
		console.info('[ORDER]:', JSON.stringify(order));
		const responses = await Promise.allSettled(
			members.map(member =>
				fetch(`https://graph.facebook.com/v14.0/${process.env.WHATSAPP_SENDER_ID}/messages`, {
					method: 'POST',
					body: JSON.stringify({
						messaging_product: 'whatsapp',
						to: member.phone,
						type: 'template',
						template: {
							name: 'alerta_msg_form',
							language: {
								code: 'pt_BR',
							},
							components: [
								{
									type: 'body',
									parameters: this.#getParameters(order, member),
								},
							],
						},
					}),
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
					},
				}).then(response => response.json())
			)
		);
		responses.forEach(response => {
			if (response.status === 'rejected') {
				console.error(JSON.stringify(response.value));
			}
		});
	}
};
