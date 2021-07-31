const router = require('express').Router()
const controller = require('./login.controller')

router.route('/:email').get(controller.read)

module.exports = router