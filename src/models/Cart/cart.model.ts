import { Schema, model } from 'mongoose';
import { TCartItem, TCart } from '../Cart/cart.type'; // Adjust import path based on your project structure

// Define schema for cart item
const cartItemSchema = new Schema<TCartItem>({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    stock: { type: Number },
    imageUrl: { type: String }
});

// Define schema for cart
const cartSchema = new Schema<TCart>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [cartItemSchema]
});

const Cart = model<TCart>('Cart', cartSchema);
export default Cart;
