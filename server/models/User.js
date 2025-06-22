import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:['vendor', 'user','admin'], default:'user'}  ,
});


userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    this.password=await bcrypt.hash(this.password,8);
    next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports= mongoose.Model('User',userSchema);