import { Request, Response } from 'express';
import { handleResponse } from '../../utils/ApiResponse';
import Product from './product.model';


// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        handleResponse(res, 200, true, products);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {

            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        handleResponse(res, 200, true, product);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {

            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    const { name, price, category, stock, description, imageUrl } = req.body;
    const product = new Product({
        name, price, category, stock, description, imageUrl
    });

    try {
        const newProduct = await product.save();
        handleResponse(res, 201, true, newProduct);

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {

            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        handleResponse(res, 200, true, product);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {

            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {

            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
