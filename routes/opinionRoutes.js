const express = require('express')
const router = express.Router()
const OpinionController = require('../controllers/OpinionController')

router.get('/', OpinionController.showOpinions)

module.exports = router