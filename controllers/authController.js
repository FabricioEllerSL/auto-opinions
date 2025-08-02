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

        const { name, email, password, confirmPassword } = req.body

        // password match validation

        if(password != confirmPassword){
            req.flash("message", "Password and Confirmation don't match!!!")
            res.render('auth/register')
            return
        }

        // check if user exists

        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists){
            req.flash("message", "Email already in use!!!")
            res.render('auth/register')
            return
        }

        // creating passwds

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name, email, password: hashedPassword
        }

        try{

            // init session
            const createdUser = await User.create(user)
            req.session.userid = createdUser.id
            req.flash("message", "User successfully registered")
            req.session.save(() => {
                res.redirect('/opinion')
            })

        } catch(err){
            console.log(`Error during create user: ${err}`)
        }
        

    }
    static async loginPost(req, res){

    }
}