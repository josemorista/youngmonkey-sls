module.exports = class Client {
	constructor(name, contactPhone) {
		this.name = name;
		this.contactPhone = contactPhone;
		this.#validateClient();
	}

	#validateClient() {
		['name', 'contactPhone'].forEach(required => {
			if (!this[required]) throw new Error(`Missing client ${required}`);
		});
	}
};
