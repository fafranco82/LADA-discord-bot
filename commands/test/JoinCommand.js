const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Canvas = require('canvas');

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 100;

	do {
		context.font = `${fontSize -= 5}px sans-serif`;
	} while (context.measureText(text).width > canvas.width);

	return context.font;
};

class JoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			group: 'test',
			description: 'Simula que se ha unido un usuario',
			memberName: 'join',
			args: [
				{
					key: 'saludado',
					prompt: 'A quien saludar',
					type: 'member',
				}
			]
		});
	}

	async run(message, {saludado}) {
		const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');

		let member = saludado || message.member;
		let roleNames = ['Junior', 'Senior', 'Mayor', 'Supremo'];
		let role = member.roles.cache.find(role => roleNames.includes(role.name));

		const background = await Canvas.loadImage('./wallpaper.jpg');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		context.strokeStyle = '#000000';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		/*
		context.font = '50px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
		*/

		//let saludo = `¡Bienvenido al servidor, ${member.displayName}!`;
		let saludo = `¡Bienvenido al servidor, ${member.displayName}!`;
		context.font = applyText(canvas, saludo);
		context.fillStyle = '#ffffff';
		let textWidth = context.measureText(saludo).width;
		context.fillText(saludo, (canvas.width/2) - (textWidth / 2), 50);

		/*
		context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 25, 25, 200, 200);
		*/

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

		const embed = {
			color: role.hexColor,
			title: `Un nuevo archivero ${role.name} se ha unido a la investigación`,
			description: `¡Dad una buena bienvenida a ${member.user}!`,
			image: {
				url: 'attachment://welcome-image.png'
			},
			thumbnail: {
				url: member.user.displayAvatarURL()
			}
		};

		message.say({files: [attachment], embed: embed});
	}
}

module.exports = JoinCommand;
