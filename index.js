const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Keyv = require('keyv');
const KeyvProvider = require('commando-provider-keyv');
const logger = require('./logger');

const ArkhamApi = require('./services/ArkhamApi');
const DbService = require('./services/DbService');

let arkhamApi = new ArkhamApi();
let dbService = new DbService();

const client = new CommandoClient({
    commandPrefix: '!',
    owner: '238197460185513984'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['cartas', 'Comandos relacionados con cartas']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerTypesIn(path.join(__dirname, 'types'))
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', async () => {
	/*
	logger.debug(`Iniciando pre-carga de cartas desde ArkhamDB...`);
	let cards = await arkhamApi.getCards();
	await cardService.replaceCards(cards);
	logger.debug(`Pre-carga terminada`);
	*/
    logger.info(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('ser Dios con Docker');
});

client.on('guildMemberAdd', async (member) => {
	let channel = member.guild.systemChannel;
	let roleNames = ['Junior', 'Senior', 'Mayor', 'Supremo'];

	//asignar uno al entrar
	let autoRoleName = roleNames[Math.floor((Math.random()*roleNames.length))];
	let autoRole = channel.guild.roles.cache.find(role => role.name == autoRoleName);
	await member.roles.add(autoRole);

	let role = member.roles.cache.find(role => roleNames.includes(role.name));

	await channel.send({
		embed: {
			color: role.hexColor,
			title: `Un nuevo archivero ${role.name} se ha unido a la investigación`,
			description: `¡Dad una buena bienvenida a ${member.user}!`,
			thumbnail: {
				url: member.user.displayAvatarURL()
			}
		}
	});
	logger.info(`Ha entrado un nuevo archivero ${role.name}: ${member.user.username}`);
});

client.on('error', (err) => {
    logger.error(err);
});

client.setProvider(new KeyvProvider(new Keyv('mongodb://mongo:27017/lada-bot', {
    namespace: 'settings'
})));

client.login('ODQxMzgzNDg1OTY4MjIwMTkw.YJl9bw.TrTIMn1VtzVeZM9cHp6IzaHsA1E');