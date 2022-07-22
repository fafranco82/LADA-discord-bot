const _ = require('lodash');

const CLASS_DATA = {
	guardian: {
		color: 0x2B80C5
	},
	seeker: {
		color: 0xFF8F3F
	},
	rogue: {
		color: 0x107116
	},
	mystic: {
		color: 0x5D5593
	},
	survivor: {
		color: 0xCC3038
	},
	neutral: {
		color: 0x808080
	}
};

const Icons = {
	action: '<:icon_action:846074090905141319>',
	agility: '<:icon_agility:846074090950754334>',
	auto_fail: '<:icon_auto_fail:846074090933977159>',
	combat: '<:icon_combat:846074091248943164>',
	cultist: '<:icon_cultist:846074090979852359>',
	elder_sign: '<:icon_elder_sign:846074091001872394>',
	elder_thing: '<:icon_elder_thing:846074091030839336>',
	free: '<:icon_free:846074091035164703>',
	guardian: '<:icon_guardian:846074091013406740>',
	health: '<:icon_health:846080794975928330>',
	intellect: '<:icon_intellect:846074091118395452>',
	mystic: '<:icon_mystic:846074091030577172>',
	per_investigator: '<:icon_per_investigator:846074091039359026>',
	reaction: '<:icon_reaction:846074091159945247>',
	rogue: '<:icon_rogue:846074090681794631>',
	sanity: '<:icon_sanity:846080794959020082>',
	seeker: '<:icon_seeker:846074091055087626>',
	skull: '<:icon_skull:846074091151687714>',
	survivor: '<:icon_survivor:846074091051024414>',
	tablet: '<:icon_tablet:846074091113807922>',
	wild: '<:icon_wild:846074091093229608>',
	willpower: '<:icon_willpower:846074091324833822>'
};

const iconsUrl = 'https://raw.githubusercontent.com/fafranco82/LADA-discord-bot/docker-node/assets';

function getCardEmbed(card) {
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
		statline += `\n${card.health} ${Icons.health} • ${card.sanity} ${Icons.sanity}`;
	} else {
		let icons = [];
		_.each(['willpower', 'intellect', 'combat', 'agility', 'wild'], name => {
			_.times(card['skill_'+name] || 0, () => icons.push(Icons[name]));
		});
		if(icons.length > 0) {
			statline = icons.join("");
		}
	}

	let fields = [];
	if(statline) fields.push({name: '\u200b', value: statline});
	fields.push({name: '\u200b', value: formatText(card.text)});
	if(card.flavor) fields.push({name: '\u200b', value: '*'+card.flavor+'*'});
	if(card.back_text) fields.push({name: '──────────────────────────────', value: formatText(card.back_text)});
	if(card.back_flavor) fields.push({name: '\u200b', value: '*'+card.back_flavor+'*'});

	let packNumber = card.code.substring(0, 2);
	if(packNumber === '60') packNumber = card.code.substring(0, 3);

	return {
		color: classData.color,
		title: title,
		url: card.url,
		description: description,
		thumbnail: {
			url: `${iconsUrl}/classes/${card.faction_code}.png`,
		},
		fields: fields,
		image: {
			url: `https://es.arkhamdb.com${card.imagesrc}`,
		},
		timestamp: new Date(),
		footer: {
			text: `${card.pack_name} #${card.position} • ${card.illustrator}`,
			icon_url: `${iconsUrl}/packs/${packNumber}.png`,
		},
	};
}

function getCardLineSummary(card) {
	let name = (card.subname) ? `${card.name} - ${card.subname}` : card.name;
	let icon = card.faction_code in Icons ? Icons[card.faction_code] : '      ';
	return `${icon} **__${name}__** (${card.pack_name} #${card.position}) *[${card.code}]*`;
}

function formatText(text) {
	return text
		.replace(/\[\[/g,'***')
		.replace(/\]\]/g,'***')
		.replace(/<\/?b>/g,'**')
		.replace(/<\/?i>/g, '*')
		.replace(/<\/?em>/g, '*')
		.replace(/\[(\w+)\]/g, (str, icon) => Icons[icon])
	;
}

module.exports = {
	Icons,
	getCardEmbed: getCardEmbed,
	getCardLineSummary: getCardLineSummary
};
