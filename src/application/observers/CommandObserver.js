module.exports = class CommandObserver {
	getObservable() {}
	async notify(command) {
		throw new Error('Abstract method', command);
	}
};
