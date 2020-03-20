const bcrypt =require('bcrypt')
var model=require('../models')


class authcontroller{
    
    async signup(signupname, signupemail, signuppassword){
        let hash = await bcrypt.hashSync(signuppassword, 10);
       return await model.user.create({
        name: signupname,
        email: signupemail,
        password: hash
        })
    }
    async login(loginname,loginpassword){
        let result=await model.user.findAll({
            where:{
                email:loginname
            }
            
        })
        return(result)
    }
}


module.exports = () => {
    return new authcontroller();
  };
  