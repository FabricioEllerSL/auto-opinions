const express = require('express')
const router = express.Router()
const OpinionController = require('../controllers/OpinionController')

// helper
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', OpinionController.showOpinions)
router.get('/dashboard', checkAuth, OpinionController.dashboard)

module.exports = router