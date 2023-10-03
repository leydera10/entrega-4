import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    description: { type: String, max:100, required: true},
    img: { type: String, max:100, required: true},
    Price: { type: Number, required: true},
    Stock: { type: Number, required: true}
});

export const productsModel = mongoose.model(productsCollection,productsSchema);