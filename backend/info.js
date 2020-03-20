const client = require ('./config/connection')

module.exports = client.count({index: 'admin',type: 'user'},function(err,resp,status) {  
    console.log("constituencies",resp);
  });

  // module.exports = client.search({q:"dd*",index: 'admin',type: 'user'},function(err,resp,status) {  
  //   resp.hits.hits.forEach(function(val) {
  //     console.log("User", val._source);
  //   })
   
  // });