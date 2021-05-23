const _ = require('lodash');
const Discord = require('discord.js');
const nearley = require("nearley");
const grammar = require("../../grammars/criteria.js");
const LadaBaseCommand = require('../LadaBaseCommand');

const CLASS_DATA = {
	guardian: {
		color: 0x2B80C5,
		img: 'hNmga2A'
	},
	seeker: {
		color: 0xFF8F3F,
		img: 'pitD03v'
	},
	rogue: {
		color: 0x107116,
		img: 'amIxXcC'
	},
	mystic: {
		color: 0x5D5593,
		img: '9OrTheA'
	},
	survivor: {
		color: 0xCC3038,
		img: '6wJXYop'
	},
	neutral: {
		color: 0x808080,
		img: 'c4t6GCy'
	}
};

const Icons = {
	wild:'<:wild:846023252655996929>',
	willpower:'<:willpower:846023253029421087>',
	intellect:'<:intellect:846023253046067220>',
	combat:'<:combat:846023253045936188>',
	agility:'<:agility:846023252958248990>'
};

class BuscarCommand extends LadaBaseCommand {
	constructor(client) {
		super(client, {
			name: 'buscar',
			group: 'cartas',
			memberName: 'buscar',
			description: 'Busca cartas en la API de Arkham DB',
			details: `Y esto son los detalles`,
			format: 'formato',
			examples: ['un ejemplo', 'otro ejemplo'],
			argsType: 'single'
		});
	}

	async run(message, searchStr) {
		try {
			//let criteria = this.getCriteria(searchStr);
			//let cards = await this.dbService.getCards(criteria);
			//let cards = await this.dbService.getCards({code: '05005'}); //Rita Young
			//let cards = await this.dbService.getCards({code: '05013'}); // Hoja del crepúsculo
			let codes = ['05005', '05013', '05023', '05025', '05030', '05034'];
			let cards = await this.dbService.getCards({code: {$in: codes}}); // As de espadas
			_.each(cards, card => {
				message.embed(this.getCardEmbed(card));
			});

			/*
			if(cards.length === 0) {
				message.reply('Lo siento, ninguna carta cumple con tus criterios de búsqueda');
			} else if(cards.length === 1) {
				message.reply('Has encontrado una carta:', {embed: this.getCardEmbed(cards[0])});
			} else {
				message.reply(`Has encontrado ${cards.length} con tus criterios de búsqueda`)
			}*/
		} catch (err) {
			message.reply(`${err}`);
		}
	}

	getCriteria(searchStr) {
		try {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
			parser.feed(searchStr.trim());
			return parser.results[0];
		} catch (err) {
			let lines = [];
			lines.push('Lo siento, existe un error en tus opciones de búsqueda. El error de sintaxis se encuentra aquí:');
			lines.push('```');
			lines.push(searchStr);
			lines.push(_.repeat(' ', err.offset)+'^'+_.repeat(' ', searchStr.length-err.offset-1));
			lines.push('```');
			throw new Error(lines.join("\n"));
		}
	}

	getCardEmbed(card) {
		let classData = CLASS_DATA[card.faction_code];

		let title = card.subname ? `${card.name} (${card.subname})` : card.name;
		
		let typeDef = `${card.slot ? `${card.type_name} - ${card.slot}` : card.type_name}. ${card.faction_name}.`;
		if(card.xp) typeDef += ` Nivel ${card.xp}.`;
		if(card.cost) typeDef += ` Coste ${card.cost}.`;

		let traits = card.traits.slice(0, -1).split('. ').join('    •   ');

		let description = `**${typeDef}**\n*${traits}*`;

		let statline = null;

		if(card.type_code === 'investigator') {
			statline = _(['willpower', 'intellect', 'combat', 'agility']).map(skill => {
				return `${card['skill_'+skill]} ${Icons[skill]}`;
			}).join(' • ');
			statline += `\nSalud: ${card.health}. Cordura: ${card.sanity}.`;
		} else {
			let icons = [];
			_.each(['willpower', 'intellect', 'combat', 'agility', 'wild'], name => {
				_.times(card['skill_'+name] || 0, () => icons.push(Icons[name]));
			});
			if(icons.length > 0) {
				statline = `Iconos: ${icons.join("")}`;
			}
		}

		let fields = [];
		if(statline) fields.push({name: '\u200b', value: statline});
		fields.push({name: '\u200b', value: this.formatText(card.text)});
		if(card.flavor) fields.push({name: '\u200b', value: '*'+card.flavor+'*'});


		return {
			color: classData.color,
			title: title,
			url: card.url,
			description: description,
			thumbnail: {
				url: `https://i.imgur.com/${classData.img}.png`,
			},
			fields: fields,
			image: {
				url: `https://es.arkhamdb.com${card.imagesrc}`,
			},
			timestamp: new Date(),
			footer: {
				text: `${card.pack_name} #${card.position}`,
				icon_url: 'https://i.imgur.com/Ed4GuhO.png',
			},
		};
	}

	formatText(text) {
		return text
			.replace(/<\/?b>/g,'**')
			.replace(/<\/?i>/g, '*')
			.replace(/<\/?em>/g, '*')
			.replace(/\[(\w+)\]/g, (str, icon) => Icons[icon])
		;
	}
}

module.exports = BuscarCommand;
