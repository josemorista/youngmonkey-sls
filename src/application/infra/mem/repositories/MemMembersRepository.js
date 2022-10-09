'use strict';

const MembersRepository = require('../../../repositories/MembersRepository');
const Member = require('../../../../domain/entities/Member');

module.exports = class MemMembersRepository extends MembersRepository {
	constructor() {
		super();
		this.members = [
			new Member('Diego', process.env.MEMBER_DIEGO_PHONE),
			new Member('Raul', process.env.MEMBER_RAUL_PHONE),
		];
	}

	all() {
		return this.members;
	}
};
