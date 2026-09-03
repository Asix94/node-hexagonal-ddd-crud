import { InvalidEmail } from './exceptions/invalidEmail.js'

export class Email {
    private constructor(private readonly value: string) {}

    public static fromString(email: string): Email 
    {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        email = email.trim().toLowerCase();

        if(!emailPattern.test(email)) {
            throw new InvalidEmail();
        };

        return new Email(email);
    }

    public toString(): string 
    {
        return this.value;
    }

    public equals(email: Email): boolean
    {
        return this.value === email.toString();
    }
}