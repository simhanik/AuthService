const express = require('express')

const UserController = require('../../controllers/user-controller.js')
const {AuthRequestValidators} = require('../../middlewares/index.js')

const router = express.Router()

router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
)

router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
)

module.exports = router