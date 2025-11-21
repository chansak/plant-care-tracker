import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // Mock initial users
    private initialUsers: User[] = [
        {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
            password: 'password123'
        },
        {
            id: '2',
            email: 'user@example.com',
            name: 'Regular User',
            role: 'user',
            password: 'password123'
        }
    ];

    users = signal<User[]>(this.initialUsers);

    constructor() {
        // Load from local storage if available
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            this.users.set(JSON.parse(storedUsers));
        } else {
            this.saveUsers();
        }
    }

    getUsers(): User[] {
        return this.users();
    }

    getUserByEmail(email: string): User | undefined {
        return this.users().find(u => u.email === email);
    }

    addUser(user: Omit<User, 'id'>): void {
        const newUser: User = {
            ...user,
            id: crypto.randomUUID()
        };
        this.users.update(users => [...users, newUser]);
        this.saveUsers();
    }

    updateUser(updatedUser: User): void {
        this.users.update(users =>
            users.map(u => u.id === updatedUser.id ? updatedUser : u)
        );
        this.saveUsers();
    }

    deleteUser(id: string): void {
        this.users.update(users => users.filter(u => u.id !== id));
        this.saveUsers();
    }

    private saveUsers(): void {
        localStorage.setItem('users', JSON.stringify(this.users()));
    }
}
