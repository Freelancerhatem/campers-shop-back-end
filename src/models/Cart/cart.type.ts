import { Schema } from "mongoose";

export interface TCartItem {
    _id: Schema.Types.ObjectId,
    name: string;
    price: number;
    quantity: number;
    stock?: number;
    imageUrl?: string;
}
export interface TCart {
    userId?: Schema.Types.ObjectId,
    items: TCartItem[]
}

