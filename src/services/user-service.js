const UserRepository = require('../repository/user-repository.js')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig.js')
const bcrypt = require('bcrypt')

class UserService{
    constructor(){
        this.userRepository = new UserRepository()
    }

    async create(data){
            try {
                const user = await this.userRepository.create(data)
                return user
            } catch (error) {
                console.log("Something went wrong in the service layer");
                throw error
                
            }
        }

    async signIn(email,plainpassword){
        try {
            // step 1 -> fetch the u   ser using email
            const user = await this.userRepository.getByEmail(email)
            // step 2 -> compare the incoming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainpassword,user.password)
            if(!passwordMatch){
                console.log("password doesn't match");
                throw {error:"Incorrect password"}
                
            }
            // if password match then create a token and send it to the user
            const newJWT = this.createToken({email:user.email,id:user.id})
            return newJWT

        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error
        }
    }

        createToken(user){
            try {
                const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'})
                return result
            } catch (error) {
                console.log("Somehting went erong in the token creation");
                throw error
                
            }
        }

        verifyToken(token){
            try {
                const response = jwt.verify(token,JWT_KEY)
                return response
            } catch (error) {
                console.log("Something went wrong in the token validation",error);
                throw error
                
            }
        }

        checkPassword(userInputPlainPassword,encryptedPassword){
            try {
                return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
            } catch (error) {
                console.log("Something went wrong in password comparision");
                throw error                
            }
        }

        async isAuthenticated(token){
            try {
                const response = this.verifyToken(token)
                if(!response){
                    throw {error : 'Invalid Token'}
                }
                const user = await this.userRepository.getById(response.id)
                if(!user){
                    throw {error: 'No user with the corresponding token exists'}
                }
                return user.id
            } catch (error) {
                console.log("Something went wrong in the Authentication");
                
            }
        }

        isAdmin(userId){
            try {
                return this.userRepository.isAdmin(userId)

            } catch (error) {
                console.log("Something went wrong in the repository layer");
                throw error
                
            }
        }

}

module.exports = UserService