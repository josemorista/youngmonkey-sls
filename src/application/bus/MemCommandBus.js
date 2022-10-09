const CommandBus = require('./CommandBus');

module.exports = class MemCommandBus extends CommandBus {
	constructor() {
		super();
		this.observers = [];
	}

	subscribe(observer) {
		this.observers.push(observer);
	}

	async publish(command) {
		for (const observer of this.observers) {
			if (command.getName() === observer.getObservable()) await observer.notify(command);
		}
	}
};
