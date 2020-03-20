const router = require('express').Router()
const jwt = require('jsonwebtoken')


class task{
    constructor(taskcontroller) {
    this.controller = taskcontroller
    this.init();    
    }

    init(){
       
        router.post("/addtask", (req, res) => {
            let { name, description, done, token, datetime, userid } = req.body;
            jwt.verify(token, "calwin123", (err, decode) => {
              if (err) {
                res.send("err");
              } else {
                // console.log("-------", name, description, done, token, datetime, userid);
                this.controller.addtask(
                    name,
                    description, 
                    done,
                    userid,
                    datetime
                ).then(result=>{
                    
                    this.controller.sendemail(
                    name,
                    description, 
                    userid,
                    datetime
                    )
                    res.send(result)
                }) 
              }
            });


        });

        router.post("/update", (req, res) => {
            let {id} = req.body;
            this.controller.updatetask(
                id
            ).then(result => {
                res.send(result);
              });
        });

        router.post("/display",async(req,res)=>{
            console.log(req.body);
            let {id,pagesize,page} =req.body;
            let responce =[];
            let incompleted= await this.controller.incompletedtask(
                id
            )
            responce.push(incompleted)
            let upcoming= await this.controller.upcomingtask(
                id
            )
            responce.push(upcoming)
            let completed= await this.controller.completedtask(
                id,
                pagesize,
                page
            )
            responce.push(completed)
            
            res.send(responce)

        })

          
        
    }


    getRouter(){
        return router;
    }
}   

module.exports = controller =>{
    return new task(controller);

}