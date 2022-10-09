'use strict';

module.exports = class HttpJSONResponse {
	constructor(status, body) {
		this.statusCode = status;
		this.body = body;
		this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Credentials': true,
		};
	}

	getValue() {
		return {
			statusCode: this.statusCode,
			body: JSON.stringify(this.body),
			headers: this.headers,
		};
	}
};
