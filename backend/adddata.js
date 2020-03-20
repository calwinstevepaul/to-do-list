var client = require('./config/connection');
const controller = require('./controller/admindetails')()
async function init(){
    var data =await controller.getdata()
            console.log(data)
            
            

            data.forEach(item =>{
                client.index({  
                    index: 'admin',                    
                    type: 'user',
                    id:item.id,
                    body: item
                },function(err,resp,status) {
                    console.log(resp)

                });
            })
}

init()