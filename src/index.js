const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());
const posts = require('./initialData');
// console.log(posts);
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

let count = 0;
const fun = () =>{
    setInterval(()=>{count = 0},30000);

}
let firstMax;
const increaseCount = () =>{
    count = count+1;
}

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
let startTime =     
app.get("/api/posts",(req,res)=>{
    
    if(req.query.max){
        if(count === 0){ 
            increaseCount();
            fun();
            if(req.query.max >= 21){
                firstMax = 10;
                res.send(posts.slice(0,10));
                
            }else{
                firstMax = req.query.max;
                res.send(posts.slice(0,req.query.max));
                
            }       
        }
        else if(count >= 4){
            res.status(429).send({message: "Exceed Number of API Calls"});
        }else{
            let maxVal = Math.min(firstMax,req.query.max);
            increaseCount();
            res.send(posts.slice(0,maxVal));
        }
    }else{
        res.send(posts.slice(0,10));
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
