const _ = require('lodash');
const Discord = require('discord.js');
const nearley = require("nearley");
const grammar = require("../../grammars/criteria.js");
const LadaBaseCommand = require('../LadaBaseCommand');

const { getCardEmbed, getCardLineSummary } = require('../../utils/CardDisplay');

const details = `
Los criterios consisten en una clave, un operador y un valor, con el formato \`<clave>:<operador>:<valor>\`.

Las claves de búsqueda posibles son:
\`\`\`
• id     ID o código de la carta en ArkhamDB (p.e.: 01001)
• ds     Si la carta es de doble cara
• ex     Si la carta es excepcional
• c      Código de clase: guardian, seeker, ...
• f      Texto de ambientación
• h      Salud
• i      Ilustrador
• u      Si la carta es única
• my     Si la carta es miriada
• n      Nombre de la carta
• p      Código del pack donde vino la carta (p.ej: core, dwl, ...)
• pe     Si la carta es permanente
• pos    Posición de la carta dentro de su pack
• s      Cordura
• agi    Agilidad de un Investigador o Iconos de Agilidad en una carta
• com    Combate de un Investigador o Iconos de Combate en una carta
• int    Intelecto de un Investigador o Iconos de Intelecto en una carta
• wild   Iconos Comodín en una carta
• will   Voluntad de un Investigador o Iconos de Voluntad en una carta
• sl     Hueco que ocupa el Apoyo
• sn     Subnombre
• x      Texto de reglas
• k      Rasgos
• t      Código del tipo de carta: investigator, asset, event, skill...
\`\`\`

Los operadores posibles son:
\`\`\`
• :      …es igual a…
• !      …no es igual a…
• ~      …contiene a…
• >      …es mayor que…
• >:     …es mayor o igual que…
• <      …es menor que…
• <:     …es menor o igual que…
\`\`\`
`;
/*
\`\`\`
• id            ID o código de la carta en ArkhamDB (p.e.: 01001)
• ds            Si la carta es de doble cara o no
• ex            Si la carta es excepcional o no
• c             Código de clase: guardian, seeker, rogue, mystic, survivor, neutral
• f             Texto de ambientación
• h             Salud
• i             Ilustrador
• u             Si la carta es única o no
• my            Si la carta es miriada o no
• n             Nombre de la carta
• p             Código del pack donde vino la carta (p.ej: core, dwl, ...)
• pe            Si la carta es permanente o no
• pos           Posición de la carta dentro de su pack
• s             Cordura
• agi           Agilidad de un Investigador o Iconos de Agilidad en una carta
• com           Combate de un Investigador o Iconos de Combate en una carta
• int           Intelecto de un Investigador o Iconos de Intelecto en una carta
• wild          Iconos Comodín en una carta
• will          Voluntad de un Investigador o Iconos de Voluntad en una carta
• sl            Hueco que ocupa el Apoyo
• sn            Subnombre
• x             Texto de reglas
• k             Rasgos
• t             Código del tipo de carta: investigator, asset, event, skill...
\`\`\`

Los operadores posibles son:
\`\`\`
• :             El campo es igual al valor
• !             El campo no es igual al valor
• ~             El campo contiene el valor
• >             El campo es mayor estricto que el valor
• >:            El campo es mayor o igual que el valor
• <             El campo es menor estricto que el valor
• <:            El campo es menor o igual que el valor
\`\`\`
`;
*/

class BuscarCommand extends LadaBaseCommand {
	constructor(client) {
		super(client, {
			name: 'buscar',
			group: 'cartas',
			memberName: 'buscar',
			description: 'Busca cartas en la API de Arkham DB',
			details: details,
			format: '<criterio1> [<criterio2> ... <criterioN>]',
			examples: [
				'`!buscar agi>:3 p:core` • busca cartas de la Caja Básica con Agilidad mayor o igual que 3',
				'`!buscar com>:3 p:core|dwl` • busca cartas de la Caja Básica o de El legado de Dunwich con Agilidad mayor o igual que 3',
				'`!buscar int>:1 t!investigator` • busca cartas que no sean Investigadores con 1 o más iconos de Intelector',
			],
			argsType: 'single'
		});
	}

	async run(message, searchStr) {
		try {
			let criteria = this.getCriteria(searchStr);
			let cards = await this.dbService.getCards(criteria);
			
			if(cards.length === 0) {
				message.reply('Lo siento, ninguna carta cumple con tus criterios de búsqueda');
			} else if(cards.length === 1) {
				message.reply('Has encontrado una carta:', {embed: getCardEmbed(cards[0])});
			} else if(cards.length > 1 && cards.length < 20) {
				message.reply(`Has encontrado ${cards.length} cartas con tus criterios de búsqueda:\n\n• ${cards.map(getCardLineSummary).join('\n• ')}`);
			} else {
				message.reply(`Has encontrado ${cards.length} cartas con tus criterios de búsqueda. Por favor, afine la búsqueda ya que son demasiadas para mostrar los resultados.`);
			}
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
}

module.exports = BuscarCommand;
