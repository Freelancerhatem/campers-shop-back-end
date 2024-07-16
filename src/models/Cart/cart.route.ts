import { Router } from 'express';
import {
    getCartByUserId,
    addToCart,
    removeFromCart
} from '../Cart/cart.controller';

const router = Router();

router.route('/:userId')
    .get(getCartByUserId);

router.route('/')
    .post(addToCart)
    .delete(removeFromCart);

export default router;
