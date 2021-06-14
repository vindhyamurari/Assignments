import {users} from '../models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class UserController{
    
    userNameInUse=async (username:string,response:any)=> {
        try{
            const userWithUserName=await users.findOne({username})
            if(userWithUserName)
                return userWithUserName;
            return true;
        }
        catch(err){
            console.log('Error in userNameInUse',err.message)
            response.send(err.message)
        }
    }
    //POST register a new User
    registerUser=async (request:any,response:any) =>{
        try{
            let {username,name,email,password,phone,avatar}=request.body
            if(await this.userNameInUse(username,response)===true){
                await bcrypt.hash(password,10,async (err,hash)=>{
                    if(err){
                        console.log('Error in Hashing the Password',err.message)
                        return response.status(404).send({ success:false,message:'Error in Hashing the Password'});
                    }
                    password=hash
                    let newUser=new users()
                    newUser={username,name,email,password,phone,avatar}
                    try{
                        newUser=await users.create(newUser);
                        response.status(201).send(newUser);
                    }
                    catch{
                        return response.status(409).send({
                            success:false,
                            message:'Email in use...Try using other mail Id'
                        })
                    }
                    
                })
            }
            else{
                response.status(409).send({
                    success:false,
                    message:'Username already used....Please Try a new One'
                })
            }
        }
        catch(err){
            response.status(409).send({
                success:false,
                message:'Error in Register User'
            })
        }
        
    }
    //POST login a new User
    loginUser=async (request:any,response:any) =>{
        try{
            let {username,password}=request.body
            let userFound=await this.userNameInUse(username,response)
            if(userFound!==true){
                let match=await bcrypt.compare(password,userFound.password)
                if(match){
                    const token=jwt.sign({ userId: userFound._id }, `${process.env.jwt_key}`, { expiresIn: '5d' })
                    return response.json({success:true,message:'Login Succesfull',userFound,token});
                }
                else{
                    return response.status(401).json({success:false,message:'Incorrect Password'});
                }
            }
            else{
                return response.end(JSON.stringify({success:false,message:'User not Found Please Register'}));
            }
        }
        catch(err){
            console.log('Error in Login User',err)
        }
    }
    isAuthorized=async (request:any,response:any,next:Function)=>{
        try
         {
            if(request.headers && request.headers.authorization){
                const token=request.headers.authorization
                const decode:any=jwt.verify(token,`${process.env.jwt_key}`)
                const requestedUser=await users.findById(decode.userId)
                try {
                    if(!requestedUser){
                        return response.status(401).json({success:false,message:'Unauthorized Access'})
                    }
                    request.user=requestedUser
                    next()
                } catch (error) {
                    if(error.name==='JsonWebTokenError'){
                        return response.status(401).json({success:false,message:'Unauthorized Access'})
                    }
                    if(error.name==='TokenExpiredError'){
                        return response.status(403).json({success:false,message:'Session Expired Please Try Sign in Again'})
                    }
                    response.json({success:false,message:'Couldnt Sign In Try Again'})
                }
            }
            else{
                return response.json({success:false,message:'Token Not Sent'})
            }
        } catch (error) {
            console.log('Error in Authorization ',error.message)
            return response.json({success:false,message:'Unauthorized Access'})
        }
    }
    
    bookMarkMovie=async (request:any,response:any) =>{
        try{
            let userID=request.user._id;
            let imdbID=request.params.imdbID;
            let updatedUser=await users.findOneAndUpdate({_id:userID,bookmarks:{$ne:imdbID}},{$push:{bookmarks:imdbID}},{new:true});
            if(updatedUser)
                response.status(200).send({success:true,message:'Book Marked Successfully',updatedUser});
            else
                return response.status(200).send({success:false,message:'Already BookMarked'})
        }
        catch(err){
            response.status(404).send({success:false,message:err.message})
        }
    }
    
}

export default UserController;