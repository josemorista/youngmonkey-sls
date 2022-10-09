'use strict';

module.exports.handle = async event => {
	console.log(event.body, event.headers);
	return {
		statusCode: 201,
	};
};
