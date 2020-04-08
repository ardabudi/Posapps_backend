const express = require('express')
const Route = express.Router()
const { buy, getHistory, recap, detailPurchase } = require('../controllers/purchase')

Route
	.post('/', buy)
	.get('/', getHistory)
	// .get('/', recap)
	.get('/:idBuyer', detailPurchase)

module.exports = Route