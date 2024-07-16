
export interface TUser {
    id: string;
    password: string;
    role: 'admin' | 'normal' | '';
}