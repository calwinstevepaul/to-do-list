var client = require('./config/connection.js');

module.exports = client.indices.create({  
  index: 'admin'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("create",resp);
  }
});

