import { Email } from "../email.js";
import { User } from "../user.js";
import { UserId } from "../userId.js";

export interface UserRepository {
    existsByEmail(email: Email): Promise<boolean>;
    save(user: User): Promise<void>;
    findById(userId: UserId): Promise<User | null>;
    delete(userId: UserId): Promise<void>;
    findAll(limit: number, offset: number): Promise<User[]>;
    count(): Promise<number>;
}