import { Schema, SchemaTypes, model } from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    },
    purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
    products: [
        {
            product: {
                type: SchemaTypes.ObjectId,
                ref: "products",
                required: true,
            },
            price: Number,
            quantity: Number,
        }, 
    ],
});

const ticketModel = model(ticketCollection, ticketSchema);

export default ticketModel;
