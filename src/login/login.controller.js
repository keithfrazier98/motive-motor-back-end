const { default: knex } = require('knex')
const service = require('./login.service')

async function read (req, res, next){
    const {email} = req.params
    userExists = await service.read(email)
    
    if (userExists){
        res.status(200).json({data:userExists})
    } else {
        next({status:400, message: "Invalid email"})
    }
} 

async function create(req, res, next){
    console.log(req.body.data)
    const {first_name, last_name, email, password, theme_id } = req.body.data
    const newLogin = await service.createUserLogin(email, password)
    const user_id = newLogin[0].user_id
    const newUserPreferences = await service.addUserPreferences(user_id, theme_id)
    const newUserProfile = await service.createUserProfile(user_id, first_name, last_name)
    res.status(201).json({data: {login:newLogin, preferences:newUserPreferences, profile:newUserProfile}})
}

module.exports = {
    read, create
}