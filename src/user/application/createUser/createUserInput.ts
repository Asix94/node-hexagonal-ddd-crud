export class CreateUserInput {
    public constructor(
        private readonly name: string,
        private readonly lastName: string,
        private readonly email: string
    ) {};

    public getName(): string
    {
        return this.name;
    }

    public getLastName(): string
    {
        return this.lastName;
    }

    public getEmail(): string
    {
        return this.email;
    }
}