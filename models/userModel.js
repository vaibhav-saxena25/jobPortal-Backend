import mongoose from 'mongoose'; // Importing mongoose for schema definition
import validator from 'validator'; // Importing validator for email validation
import bcrypt from 'bcryptjs'; // Corrected the import for bcryptjs
import JWT from 'jsonwebtoken'; // Importing jsonwebtoken for token generation

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password length must be at least 6 characters'],
        secret:true
    },
    location: {
        type: String,
        default: 'India',
    },
}, { timestamps: true }); // Key is correct

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//token
userSchema.methods.createJWT = function () {
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
//compare password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

// Exporting the User model
export default mongoose.model('User', userSchema);
