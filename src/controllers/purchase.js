const models = require('../models/purchase')
const helpers = require('../helpers')
const uniqid = require("uniqid")
const moment = require('moment')

module.exports = {
	buy: async (req, res) => {
		try {
			const buy = req.body
			if (buy === undefined || buy === '') return console.log('Tidak ada data')

			var a = 0
			const idBuyer = uniqid();
			// console.log(req.body)
			await buy.products.map(e => {
				const data = {
					idBuyer: idBuyer,
					productId: e.productId,
					stock: e.quantity,

					// productId: e.id,
					// stock: e.qty
				}
				const date = {
					date_added: new Date()
				}
				models.buy(data, a, date)
				a++
			})

			helpers.response(res, 200, 'thanks')
		} catch (error) {
			console.log(error)
			helpers.customErrorResponse(404, 'your request not found')
		}
	},

	getHistory: async (request, response) => {
		try {
			const date = new Date()
			const start = request.query.start || date
			const end = request.query.end || date
			const startDate = moment(new Date(start)).format('YYYY-MM-DD')
			const endDate = moment(new Date(end)).format('YYYY-MM-DD')
			const result = await models.getHistory(startDate, endDate)
			response.json(result)
		} catch (error) {
			console.log(error)
		}
	},
	
	recap: async (req, res) => {
		try {
			const result = await models.recap();
			helpers.response(res, 200, result);
		} catch (error) {
			console.log(error);
			helpers.customErrorResponse(404, "your request not found");
		}
	},
	detailPurchase: async (req, res) => {
		try {
			const idBuyer = req.params.idBuyer;
			const result = await models.detailPurchase(idBuyer);
			helpers.response(res, 200, result);
		} catch (error) {
			console.log(error);
			helpers.customErrorResponse(404, "your request not found");
		}
	},
	lastWeek: async (req, res) => {
		try {
			const result = await models.lastWeekRecap();
			helpers.response(res, 200, result);
		} catch (error) {
			console.log(error);
			helpers.customErrorResponse(404, "your request not found");
		}
	}
}