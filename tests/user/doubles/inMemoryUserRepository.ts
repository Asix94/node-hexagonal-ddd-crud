import { UserRepository } from '../../../src/user/domain/repositories/userRepository.js';
import { Email } from '../../../src/user/domain/email.js';
import { User } from '../../../src/user/domain/user.js';
import { UserId } from '../../../src/user/domain/userId.js';

export class InMemoryUserRepository implements UserRepository {

    private users: User[] = [];

    public async existsByEmail(email: Email): Promise<boolean>
    {
        const user = this.users.find(userEmail => userEmail.getEmail().equals(email));

        if(user) {
            return true;
        }

        return false;
    }

    public async save(user: User): Promise<void>
    {
        const userId = user.getUserId().toString();

        const userIndex = this.users.findIndex(
            (currentUser) => currentUser.getUserId().toString() === userId,
        );

        if(userIndex === -1) {
            this.users.push(user);
            return;
        }

        this.users[userIndex] = user;
    }

    public async findById(userId: UserId): Promise<User | null>
    {
        const user = this.users.find(user => user.getUserId().toString() === userId.toString());

        if(user) {
            return user;
        }

        return null;
    }

    public async delete(userId: UserId): Promise<void>
    {
        const userIndex = this.users.findIndex(
            (currentUser) => currentUser.getUserId().toString() === userId.toString(),
        );

        if(userIndex === -1) {
            return;
        }

        this.users.splice(userIndex, 1);
    }

    public async findAll(limit: number, offset: number): Promise<User[]>
    {
        const users = [... this.users];

        users.sort((userA, userB) => 
            userA.getUserId().toString().localeCompare(userB.getUserId().toString())
        );

        return users.slice(offset, offset + limit);
    }

    public async count(): Promise<number>
    {
        return this.users.length;
    }
}