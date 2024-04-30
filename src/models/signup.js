import mongoose from 'mongoose';
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const signupSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        unique:true
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
});

signupSchema.pre("save", async function(next){
    const user = this;

    if(!user.isModified("password"))
    {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(user.password, salt);
        user.password = hash_pass;
    } catch (error) {
        console.log(error);
    }
});

export const SignupModel = mongoose.models.Signup || mongoose.model("Signup", signupSchema);