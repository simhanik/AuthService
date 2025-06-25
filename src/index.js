const express = require('express')
const bodyParser = require('body-parser')

const UserService = require('./services/user-service.js')

const {PORT,DB_SYNC} = require('./config/serverConfig.js')
// const {User} = require('./models')
// const bcrypt = require('bcrypt')

//const UserRepository = require('./repository/user-repository.js')

const db = require('./models/index')
//const {User,Role} = require('./models/index')

const apiRoutes = require('./routes/index.js')

const app = express()

const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)
 
    app.listen(PORT, async ()=>{
        console.log("Server stated on on port:",PORT);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }

        // const repo = new UserRepository()
        // const response = await repo.getById(1)
        // console.log(response);
        

        // const incomingPassword = 'var123'
        // const user = await User.findByPk(3)
        // const response = bcrypt.compareSync(incomingPassword,user.password)
        // console.log(response);
        
        // const service = new UserService()
        // const newToken = service.createToken({email:'nikhil@admin.com'})
        // console.log("New token is ", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2hpbEBhZG1pbi5jb20iLCJpYXQiOjE3NTA3NzI4MzksImV4cCI6MTc1MDc3NjQzOX0.W9puCsbWvNV8fUi4MWnD4FQaP745_aRoeMxxGZ4c_AE'
        // const response = service.verifyToken(token)
        // console.log(response);
        
        /**Giving roles to the user */
        // const u1 = await User.findByPk(1)
        // const r1 = await Role.findByPk(2)

        // const response = await u1.getRoles()
        // console.log(response);
        
        // u1.addRole(r1)
    })
}

prepareAndStartServer()