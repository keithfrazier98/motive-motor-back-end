const service = require('./profiles.service')

async function read(req, res, next) {
    const user_id = req.query.user_id
    userProfile = await service.getUserData(user_id)

    res.status(200).json({data:userProfile})
}

module.exports = {
    read
}