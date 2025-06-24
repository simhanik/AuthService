const express = require('express')
const bodyParser = require('body-parser')

const {PORT} = require('./config/serverConfig.js')
const {User} = require('./models')
const bcrypt = require('bcrypt')

const apiRoutes = require('./routes/index.js')

const app = express()

const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)
 
    app.listen(PORT, async ()=>{
        console.log("Server stated on on port:",PORT);

        const incomingPassword = 'var123'
        const user = await User.findByPk(3)
        const response = bcrypt.compareSync(incomingPassword,user.password)
        console.log(response);
        
        
    })
}

prepareAndStartServer()