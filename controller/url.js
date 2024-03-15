const shortid=require("shortid")
const URL =require("../model/user")

async function handleGenerateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(404).json({error:"url not found"})
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    }) 
    res.json({id: shortID}) 

}

module.exports={
    handleGenerateNewShortUrl
}