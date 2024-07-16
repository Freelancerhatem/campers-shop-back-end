import { Response } from "express";

interface ApiResponse<T> {
    success: boolean;
    status: number;
    data?: T;
    error?: string;
}

export function handleResponse<T>(res: Response, status: number, success: boolean, data?: T, error?: string) {
    const response: ApiResponse<T> = {
        success,
        status,
        data,
        error
    };

    res.status(status).json(response);
}