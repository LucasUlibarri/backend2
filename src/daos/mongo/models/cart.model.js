import { Schema, SchemaTypes, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  user:{
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: true
  },
  products: [
    {
        title: String,
        price: Number,
        quantity: Number,
    },
  ],
  total: Number,
}, {vertsionKey: false});

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
