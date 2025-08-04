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

        let emptyOpinions = false

        if(opinions.length === 0){
            emptyOpinions = true
        }

        res.render('opinion/dashboard', {opinions, emptyOpinions})
    }

    static addOpinion(req, res){
        res.render('opinion/create')
    }

    static async editOpinion(req, res){

        const opinionId = req.params.id
        
        const opinion = await Opinion.findOne({where: {id:opinionId}, raw:true})

        res.render('opinion/edit', {opinion})
    }

    static async editOpinionPost(req, res){
        
        const opinionId = req.body.id

        const opinion = {
            title: req.body.title
        }

        try{
            await Opinion.update(opinion, {where: {id:opinionId}})
            req.session.save(()=>{
                res.redirect('/opinion/dashboard')
            })
        } catch(err){
            console.log(`Error during edit opinion: ${err}`)
        }
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

    static async removeOpinion(req, res){
        const id = req.body.id
        const userId = req.session.userid

        try{
            await Opinion.destroy({where: {id: id, UserId: userId}})
            req.flash('message', 'Opinion Successfully deleted!')
            req.session.save(() => {
                res.redirect('/opinion/dashboard')
            })
        } catch(err){
            console.log(`Error during delete opinion: ${err}`)
        }
    }
}