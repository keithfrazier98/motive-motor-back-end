const router = require('express').Router()

router.route('/').get((req,res,next) => {
    res.status(200).json({data:"connected"})
})

module.exports = router