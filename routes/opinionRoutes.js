const express = require('express')
const router = express.Router()
const OpinionController = require('../controllers/OpinionController')

// helper
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', OpinionController.showOpinions)
router.get('/dashboard', checkAuth, OpinionController.dashboard)
router.get('/add', checkAuth, OpinionController.addOpinion)
router.post('/add', checkAuth, OpinionController.addOpinionPost)
router.get('/edit/:id', checkAuth, OpinionController.editOpinion)
router.post('/edit', checkAuth, OpinionController.editOpinionPost)
router.post('/remove', checkAuth, OpinionController.removeOpinion)

module.exports = router