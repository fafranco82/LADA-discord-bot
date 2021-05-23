const axios = require('axios');
const logger = require('../logger');

class ArkhamApi {
	constructor() {
		this.endpoint = 'https://es.arkhamdb.com/api/public';
	}

	getData(url) {
		return axios.get(`${this.endpoint}${url}`).then(response => {
			if(response.status === 200) {
				return response.data;
			} else {
				throw new Error(`La API de ArkhamDB devolvió ${response.status} al pedir la ruta ${url}`);
			}
		}).catch(err => {
			logger.error(`Error getting cards from ArkhamDB: ${err}`);
			throw new Error(`Error getting cards from ArkhamDB`);
		});
	}

	getCards() {
		return this.getData(`/cards`);
	}
}

module.exports = ArkhamApi;
