const express=require("express")
const URLRouter=require("./routes/url")
const {connectMongoDb} =require("./connection")
const url=require("./model/user")
const app=express()
const PORT=8001;


connectMongoDb("mongodb://127.0.0.1:27017/URL-SHORTNER").then(()=>{
    console.log("MongoDb connected")
})

app.use(express.json())

app.use("/url",URLRouter)

app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{timestamp: Date.now()}
        }
    })
    res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>{
    console.log("Server started")
})