import { Email } from "./email.js";
import { UserId } from "./userId.js";
import { InvalidUserName } from "./exceptions/invalidUserName.js";
import { InvalidUserLastName } from "./exceptions/invalidUserLastName.js";

export class User {
    public constructor(
        private readonly userId: UserId,
        private name: string,
        private lastName: string,
        private email: Email
    ) {
        this.setFullName(name, lastName);
    }

    public getUserId(): UserId
    {
        return this.userId;
    }

    public getName(): string
    {
        return this.name;
    }

    public getLastName(): string
    {
        return this.lastName;
    }

    public getEmail(): Email
    {
        return this.email;
    }

    public changeFullName(name: string, lastName: string): void
    {
        this.setFullName(name, lastName);
    }

    private setFullName(name: string, lastName: string): void
    {
        name = name.trim();
        lastName = lastName.trim();

        if(name === '') {
            throw new InvalidUserName();
        }

        if(lastName === '') {
            throw new InvalidUserLastName();
        }

        this.name = name;
        this.lastName = lastName;
    }

    public changeEmail(email: Email): void
    {
        this.email = email;
    }
}