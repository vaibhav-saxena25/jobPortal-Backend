import JWT from 'jsonwebtoken';

const userAuth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
   
    if(!authHeader || !authHeader.startsWith('Bearer')){
        next('Auth failed');
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = JWT.verify(token,process.env.JWT_SECRET);
        req.user = {userId:payload.userId}
        next();
    }catch(err){
        next('Auth failed');
    }
}

export default userAuth;