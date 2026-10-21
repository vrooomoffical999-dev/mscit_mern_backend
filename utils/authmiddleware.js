import jwt "jsonwebtoken"
import secretKey from "../jwtconfig.js"

function authanticateToken (req,res,next) {
    const authHeader = req.header("Authorization")
    if(!authHeader) {
        return res.status(401).json({"message":"Authrazation is missing"})
    }

    const [bearer,token] = authHeader.split(" ")
    if(bearer != "Bearer" || !token) {
        return res.status(401).json({"message":"Invalid Token Formate"})
    }

    jwt.verify(token,secretKey,(err,user)=>{
        if(err) {
            return res.status(401).json({"message":"Invalid Token"})
        }

        req.user = user
        next()
        
    })
}