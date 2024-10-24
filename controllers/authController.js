import userModel from "../models/userModel.js"; // Updated the naming convention
export const registerController = async (req, res,next) => {
  
    const { name, email, password } = req.body;
    // Validation
    if (!name) {
      next("name is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required");
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email }); // Corrected the typo
    if (existingUser) {
      next("email already exist please login");
    }
    // Create new user
    const user = await userModel.create({ name, email, password });
    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: 'User created successfully',
      user:{
        name:user.name,
        lastName:user.lastName,
        email:user.email,
        location:user.location

      },
      token
    });

};

export const loginController = async(req,res,next)=>{
  const {email,password}=req.body;
  if(!email || !password){
    next("email and password are required");
  }
  const user = await userModel.findOne({email}).select("+password");
  if(!user){
    next("Invalid username or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    next('Invalid username or password');
  }
  user.password = undefined;
  const token = user.createJWT();
  return res.status(200).json({
    success:true,
    message:'Login succesfully',
    user,
    token
  })

}
