const router = require("express").Router();
const bcrypt =require('bcrypt')
var jwt = require("jsonwebtoken");



class auth {

  constructor(authcontroller) {
    this.controller = authcontroller
    this.init();
  }

  init() {
    router.post("/signup",(req, res) => {
      const { signupname, signupemail, signuppassword } = req.body;
        this.controller.signup(
        signupname,
        signupemail,
        signuppassword
      ).then(result=>{
        res.send({ success: true,result})
      }       
      ).catch(err=>{
        res.status(200).json({ success:false, error:err.message });
      })  
    });

    router.post('/login',(req,res)=>{
      const {loginname,loginpassword}= req.body;
      this.controller.login(
        loginname,
        loginpassword
      ).then(result => {
        if (result.length == 0) {
          res.status(200).send("invalid user");
          console.log("invalid user");
        } else {
          var passwordDB = result[0].dataValues.password;
          bcrypt.compare(loginpassword, passwordDB, function(err, re) {
            if (re == true) {
              var token = jwt.sign(
                { name: result[0].dataValues.id },
                "calwin123",
                { expiresIn: 600 }
              );
  
              res.status(200).send({
                name: result[0].dataValues.name,
                id:result[0].dataValues.id,
                token: token,
                message: "login successful"
              });
  
              console.log("login successful");
            } else {
              res.status(200).send("wrong password");
              console.log("wrong password");
            }
          });
        }
      })
    })
  }

  getRouter() {
    return router;
  }
}

module.exports = controller => {
  return new auth(controller);
};
