'use strict'

const User = use('App/Models/User');
const Token = use('App/Models/Token');

class AuthController {
    async register({request, auth, response}) {
        // const username = request.input("username")
        // const email = request.input("email")
        // const password = request.input("password")
        
        const {username, email, password} = request.post()  
    
        //const result = await Disease.create({description, author, indication, followup, example, bibliography, observation})

        // let user = new User()
        // user.username = username
        // user.email = email
        // user.password = password

        const user = await User.create({username, email, password}) // user.save()
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
        // let ret = await auth.attempt(username, password)
        // return response.json(ret)
        
    }

    async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            return response.json({"access_token": accessToken})
          }
        }
        catch (e) {
          return response.status(401).json({message: 'Invalid username password'})
        }
    }

    async user({params, request, auth, response}) {
        try {
            let user = await auth.getUser()
            return response.json({"user": user});
        }
        catch (e) {
          return response.status(401).json({message: 'Invalid username password'})
        }
    }

    async logout({request, auth, response}) {
        try {
            const token = auth.getAuthHeader()
            
            await Token.query().where('token', token)
            .update({ is_revoked: true })
            return response.json({"message": 'Token revoked'});
        }
        catch (e) {
          return response.status(500).json({message: 'Error: '+e.message})
        }
    }

}

module.exports = AuthController
