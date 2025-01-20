const express = require('express')
const router = express.Router()
const controller = require('../controllers/project.controller')

router.route('/create').post(controller.create)
router.route('/delete/:projectId').delete(controller.delete)
router.route('/list').get(controller.list)

module.exports = router