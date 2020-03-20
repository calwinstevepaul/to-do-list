var model=require('../models')
var Op = require("sequelize").Op;
const sgMail = require('@sendgrid/mail');
var client = require('../config/connection');

class taskcontroller{

    async addtask(name,description,done,userid,datetime ){
      return await model.lists.create({
          name: name,
          description: description,
          done: done,
          userId: userid,   
          datetime: datetime
        })
        .then(result=>{
          console.log("this response",result.dataValues.id)
            client.index({  
              index: 'admin',                    
              type: 'user',
              id:result.dataValues.id,
              body: result
            },function(err,resp,status) {
                console.log(resp)

            });
        })
    }
    async sendemail(name,description,userid,datetime){
      var email= await model.user.findAll({
        attributes:["email"],
        where:{id:userid}
        
      })

      console.log(email[0].email)

      sgMail.setApiKey(process.env.key);
      const msg = {
        to: email[0].email,
        from: 'calwinstevepaul@gmail.com',
        subject: 'To-Do-List Reminder',
        html: `
        <table border="1">
        <tr><th><b>Task Name:</b></th>  <th><b>Task Description:</b></th>  <th><b>Date:</b></th>  <th><b>Time:</b></th></tr>
        <tr> <th>${name}</th> <th>${description}</th> <th>${new Date(datetime).toLocaleDateString()}</th> <th>${new Date(datetime).toLocaleTimeString()}</th></tr>
        </table>
        `
      };
      sgMail.send(msg);
    }

    async updatetask(id){
        return await model.lists.update(
            {
              done: true
            },
            {
              where: { id:id }
            }
        )
    }
    async incompletedtask(id){
        return await model.lists.findAll({
            attributes: ["name", "description", "createdAt", "id", "datetime"],
            where: { done: false, datetime: { [Op.lte]: new Date() }, userId:id},          
            order: [["id", "DESC"]]
          });
    }
    async upcomingtask(id){
        return await model.lists.findAll({
            attributes: ["name", "description", "createdAt", "id", "datetime"],
            where: { done: false, datetime: { [Op.gte]: new Date() }, userId:id},          
            order: [["id", "DESC"]]
          });
    }
    async completedtask(id,pagesize,page){
        return await model.lists.findAll({
            attributes: ["name", "description", "createdAt", "id", "datetime"],
            where: { done: true,userId:id}, 
            limit: pagesize,
            offset:page * pagesize,         
            order: [["id", "DESC"]]
          });
    }
}

module.exports = ()=>{
    return new taskcontroller();
}