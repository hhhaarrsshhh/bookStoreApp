import User from "../modal/userModal.js";
import bcryptjs from "bcryptjs";

export const signup= async(req,res)=>{
    try
    {

        const {fullname,emailid,password}=req.body;
        
        const user = await User.findOne({emailid});
        if(user){
            return res.status(400).json({message:"User already exists"});

        }
        const hashedPassword=await bcryptjs.hash(password,10);

        const createdUser=new User({
           fullname: fullname,
           emailid: emailid,
            password: hashedPassword
        })
    await createdUser.save();
        res.status(200).json({message:"User created successfully",user:{
            _id:createdUser._id,
            fullname:createdUser.fullname,
            emailid:createdUser.emailid
        }});

}

catch(err)
{
    console.log(err);
    res.status(500).json({message:"Internal server error"});

}
};

export const login= async(req,res)=>{
    try{
        const {emailid,password}=req.body;
        const user=await User.findOne({emailid});
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }else{
            res.status(200).json({message:"Login successful",user:{
                _id:user._id,
                fullname:user.fullname,
                emailid:user.emailid
            }});

            
        }
 }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }


}