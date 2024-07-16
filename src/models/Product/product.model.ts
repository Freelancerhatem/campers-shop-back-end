import { model, Schema } from "mongoose";
import { TProduct } from "./product.type";

const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true,
});

const Product = model<TProduct>('Product', productSchema)
export default Product