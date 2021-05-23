const LadaBaseCommand = require('../LadaBaseCommand');

const ArkhamApi = require('../../services/ArkhamApi');

class RecargarCommand extends LadaBaseCommand {
	constructor(client) {
		super(client, {
			name: 'recargar',
			group: 'cartas',
			memberName: 'recargar',
			description: 'Recarga la base de datos interna desde ArkhamDB',
			//clientPermissions: ['ADMINISTRATOR']
			ownerOnly: true
		});

		this.api = new ArkhamApi();
	}

	async run(message) {
		try {
			let cards = await this.api.getCards();
			await this.cardService.replaceCards(cards);
			return message.say(`Se ha recargado la base de datos. Total de cartas cargadas: ${cards.length}`);
		} catch(err) {
			return message.say(`Hubo un error en la recarga de datos: ${err}`);
		};
	}
}

module.exports = RecargarCommand;
