const router = require('express').Router()
const controller = require('./login.controller')

router.route('/:email').get(controller.read)
router.route('/new').post(controller.create)

module.exports = router