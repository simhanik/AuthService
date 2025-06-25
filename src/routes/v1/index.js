const express = require('express')

const UserController = require('../../controllers/user-controller.js')
const {AuthRequestValidators, AdminRequestValidators} = require('../../middlewares/index.js')
const {validateIsADmin} = require('../../middlewares/index.js')

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

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

router.get('/dummy',(req,res) => {
    return res.status(200).json({message:'OK'})
})

router.get(
    '/isAdmin',
    AdminRequestValidators.validateIsADmin,
    UserController.isAdmin
)

module.exports = router