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

module.exports = {
    read
}