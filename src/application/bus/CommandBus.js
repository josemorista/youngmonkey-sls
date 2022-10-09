module.exports = class CommandBus {
	async publish(command) {
		throw new Error('Abstract method', command);
	}
	subscribe(commandObserver) {
		throw new Error('Abstract method', commandObserver);
	}
};
