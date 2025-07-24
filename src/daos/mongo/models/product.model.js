import { Schema, model } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({
  title: String,
  description: String,
  codebar: String,
  price: Number,
  status: {
    type: Boolean,
    default: true,
  },
  stock: Number,
  category: String,
  thumbnail: [String],
}, {versionKey: false});

const productModel = model(productCollection, productSchema);

export default productModel;
