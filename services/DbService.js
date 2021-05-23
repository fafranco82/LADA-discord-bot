const monk = require('monk');

const loggger = require('../logger');

class DbService {
	constructor(dbInstance) {
		let db = dbInstance || monk('mongodb://mongo:27017/lada-bot');
		this.cards = db.get('cards');
	}

	getCards(criteria = {}) {
        return this.cards.find(criteria).catch(err => {
            logger.error(`Error fetching cards: ${err}`);

            throw new Error('Error fetching cards');
        });
    }

	replaceCards(cards) {
		return this.cards.remove({}).then(() => {
			this.cards.insert(cards);
		}).catch(err => {
			logger.error(`Error replacing cards: ${err}`);

			throw new Error(`Error replacing cards`);
		});
	}
}

module.exports = DbService;
