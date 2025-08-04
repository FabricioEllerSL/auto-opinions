const Opinion = require('../models/Opinion')
const User = require('../models/User')

module.exports = class OpinionController{
    static async showOpinions(req, res){
        res.render('opinion/home')
    }

    static async dashboard(req, res){

        const userId = req.session.userid

        const user = await User.findOne({where:{id: userId}, include:Opinion, plain:true})

        const opinions = user.Opinions.map((result) => result.dataValues)

        console.log(opinions)

        res.render('opinion/dashboard', {opinions})
    }

    static addOpinion(req, res){
        res.render('opinion/create')
    }

    static async addOpinionPost(req, res){
        
        const opinion = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try{
            await Opinion.create(opinion)
    
            req.flash('message', 'Opinion successfully created!')
            req.session.save(() => {
                res.redirect('/opinion/dashboard')
            })
        } catch(err){
            console.log(`Error during create opinion: ${err}`)
        }


    }
}