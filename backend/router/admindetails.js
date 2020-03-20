const router = require("express").Router();
var client = require('../config/connection');

class admin{
    constructor(admincontroller){
        this.controller=admincontroller;
        this.init()
    }

    init(){
        router.post('/data',async (req,res)=>{
            var {search,pagesize,page}= req.body
            let from = pagesize*page
           client.search({index: 'admin',type: 'user',size:`${pagesize}`,from:`${from}`,body:{
               "query":{
                   "query_string": {"fields" : ["name", "description", "user.name","user.email"], "query" : "*"+search+"*"}
               }
           }},function(err,resp,status) {  
            if(err){
                console.log(err)
            }    
            console.log(resp.hits.hits)
            res.send(resp.hits.hits)  
          
               
              });
            
        })

        router.post('/suggestions',async (req,res)=>{
            var {search}= req.body
            
           client.search({index: 'admin',type: 'user',
           body:{
               "query":{
                   "query_string": {"fields" : ["name"], "query" : `${search}*`}
                // "match": { "name" : `${search}*`}
            }
            }},function(err,resp,status) {  
            if(err){
                console.log(err)
            }    
            console.log(resp.hits.hits)
            res.send(resp.hits.hits)  
          
               
              });
            
        })
        
    }
    getRouter(){
        return router;
    }
}   
module.exports = controller =>{
    return new admin(controller);

}