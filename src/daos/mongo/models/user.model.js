import { Schema, SchemaTypes, model } from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
    firtname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN", "PREMIUM", "GUEST"],
    },
    cart: {
        type: SchemaTypes.ObjectId,
        ref: "carts",
    },
    }, { versionKey: false, timestamps: true });    

const userModel = model(userCollection, userSchema);

export default userModel;
