let http=require('http');
let url=require('url');
 require('dotenv').config();
let routes={
    // "GET":()=>{
    //     console.log("Get Method")
        
    // },
    // "POST":()=>{
    //     console.log("Post method")
       
    // }
    "GET":{
        "/":(req,res,params)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(`Get method and / ${params.query.name} and ${params.query.age}`)
        },
        "/home":(req,res,params)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(`Get method and /home ${params.query.name} and ${params.query.age}`)
        }
    },
    "POST":{
        "/":(req,res,params)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(`Post method and / ${params.query.name} and ${params.query.age}`)
        },
        "/about":(req,res,params)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(`Post method and /about ${params.query.name} and ${params.query.age}`)
        }
    },

        "NA":(req,res,params)=>{
            res.writeHead(404);
            res.end("404 ERROR!");
        }


}
let method=(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
//    if(req.method=="GET"){
//     res.end('Get method');
//    }
//    else{
//        res.end('Post method')
//    }
    // routes[req.method]();
    // console.log(req.url)
    let reqmethod=req.method;
    let params=url.parse(req.url,true);
    let resolveRoute=routes[reqmethod][params.pathname];
   if(resolveRoute ==null && resolveRoute ==undefined){
    routes["NA"](req,res,params);
      
   }
   else{
    resolveRoute(req,res,params)  
   }
}
let server=http.createServer(method)
    

server.listen(process.env.PORT,()=>{
    console.log(`Server is running in port ${process.env.PORT} `)
})