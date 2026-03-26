import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL 
if (!mongodbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
}
//“To avoid multiple MongoDB connections in serverless environments like Next.js, I implemented a global caching mechanism that reuses an existing connection instead of creating a new one on every request.”
//we cant do mongoose.connect as in js ...ts run on edge ...we will store connection in cache and will not make existing connectiona again
//global object can be accessed from anywhere in typescript
let cached=global.mongooseConn
if(!cached){
    cached=global.mongooseConn={conn:null,promise:null}
}

const connectToDB=async()=>{
    if(cached.conn){
        return cached.conn    
    }
    if(!cached.promise){
        cached.promise=mongoose.connect(mongodbUrl).then(c=>c.connection)
    }
try{
    const conn=await cached.promise
    return conn
}catch(error){
    console.log(error)
     throw error
}    

}
export default connectToDB