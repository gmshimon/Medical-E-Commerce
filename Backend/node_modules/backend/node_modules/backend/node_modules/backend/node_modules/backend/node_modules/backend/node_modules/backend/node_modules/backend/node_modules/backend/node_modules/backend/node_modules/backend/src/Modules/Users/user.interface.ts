export type Role = 'super admin' | 'admin' | 'user';

export type IUser = {
    name: string;
    email: string;
    password: string;
    photo: string;
    role: Role
}