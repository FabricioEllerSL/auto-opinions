const Opinion = require('../models/Opinion')
const User = require('../models/User')

module.exports = class OpinionController{
    static async showOpinions(req, res){
        res.render('opinion/home')
    }

    static async dashboard(req, res){
        res.render('opinion/dashboard')
    }
}