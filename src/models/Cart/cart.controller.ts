import { Request, Response } from 'express';
import Cart from './cart.model';
import { handleResponse } from '../../utils/ApiResponse';
import { TCartItem } from './cart.type';

// Get cart by user ID
export const getCartByUserId = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        handleResponse(res, 200, true, cart)
    } catch (err: unknown) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message });
    }
};

// Add to cart
export const addToCart = async (req: Request, res: Response) => {
    const cartItems: TCartItem[] = req.body; // Assuming req.body is an array of CartItem objects

    try {
        // Assuming cartItems contains multiple items to add to the cart
        for (const cartItem of cartItems) {
            const { _id, name, price, quantity } = cartItem;

            let cart = await Cart.findOne({ _id }); // Assuming _id uniquely identifies the cart or user

            if (!cart) {
                // If cart doesn't exist, create a new one
                cart = new Cart({ _id, items: [{ _id, name, price, quantity }] });
            } else {
                // If cart exists, check if item already exists
                const existingItem = cart.items.find(item => item._id === _id);

                if (existingItem) {
                    // If item exists, update quantity
                    existingItem.quantity += quantity;
                } else {
                    // If item doesn't exist, add it to the cart
                    cart.items.push({ _id, name, price, quantity });
                }
            }

            // Save the updated cart for each item
            await cart.save();
        }

        // Respond with success
        res.status(201).json({ message: 'Items added to cart successfully' });
    } catch (err: unknown) {
        if (err instanceof Error)
            res.status(400).json({ message: err.message });
    }
};

// Remove from cart
export const removeFromCart = async (req: Request, res: Response) => {
    const { userId, _id } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item._id === _id);
        await cart.save();
        res.json(cart);
        handleResponse(res, 200, true, cart)
    } catch (err: unknown) {
        if (err instanceof Error)
            res.status(400).json({ message: err.message });
    }
};
