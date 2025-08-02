const Opinion = require('../models/Opinion')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }
    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        

    }
    static async loginPost(req, res){

    }
}