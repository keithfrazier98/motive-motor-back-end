const router = require('express').Router()
const controller = require('./profiles.controller')

router.route('/userdata').get(controller.read)

module.exports = router