export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    password?: string; // In a real app, this would be hashed or not stored on client
}
