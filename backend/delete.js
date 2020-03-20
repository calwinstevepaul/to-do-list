var client =require('./config/connection');

module.exports = client.indices.delete({index: 'admin'},function(err,resp,status) {  
    console.log("delete",resp);
  });


 