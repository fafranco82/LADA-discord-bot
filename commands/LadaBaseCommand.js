const { Command } = require('discord.js-commando');
const DbService = require('../services/DbService');

class LadaBaseCommand extends Command {
	constructor(client, options) {
		super(client, options);

		this.dbService = new DbService();
	}
}

module.exports = LadaBaseCommand;
