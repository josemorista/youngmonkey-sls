module.exports = class CommandObserver {
	async notify(command) {
		throw new Error('Abstract method', command);
	}
};
