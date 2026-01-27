import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["user","admin","delivery"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },

    // ! for email verification
    emailVerificationToken:{
        type:String
    },
    emailVerificationTokenExpire:{
        type:Date
    },

    // ! for reset password
    passwordVerificationToken:{
        type:String
    },
    passwordVerificationTokenExpire:{
        type:Date
    }
    
},
{
    timestamps:true,

    toJSON:{
        transform(doc,ret){
            delete ret.password,
            delete ret.__v;
            ret.id=ret._id;
            delete ret._id;

        }
    },
    toObject:{
        transform(doc,ret){
            delete ret.password;
            delete ret.__v;
            ret.id=ret._id;
            delete ret._id
            
        }
    }
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.comparePassword=async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const userModel=new mongoose.model("User",userSchema);

export default userModel;