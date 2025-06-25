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

    })
}

prepareAndStartServer()