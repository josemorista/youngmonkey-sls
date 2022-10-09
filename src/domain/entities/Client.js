module.exports = class Client {
	constructor(name, contactPhone, enterprise) {
		this.name = name;
		this.contactPhone = contactPhone;
		this.enterprise = enterprise;
		this.#validateClient();
	}

	#validateClient() {
		['name', 'contactPhone'].forEach(required => {
			if (!this[required]) throw new Error(`Missing client ${required}`);
		});
	}
};
