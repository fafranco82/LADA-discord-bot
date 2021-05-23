const { ArgumentType } = require('discord.js-commando');

const nearley = require("nearley");
const grammar = require("../grammars/criteria.js");

class SearchTermsArgumentType extends ArgumentType {
	constructor(client) {
		super(client, 'terms');
	}

	parseValue(value) {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed(value.trim());
		return parser.results[0];
	}

	validate(value) {
		return !!this.parseValue(value);
	}

	parse(value) {
		return this.parseValue(value);
	}
}

module.exports = SearchTermsArgumentType;
