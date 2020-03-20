var model=require('../models')

class admincontroller{
    async getdata(){
        let result=await model.lists.findAll({
            include:[
                {
                    model:model.user
                }
            ]
        })
        
        return(result)
    }
}    

module.exports = ()=>{
    return new admincontroller();
}