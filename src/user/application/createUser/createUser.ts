import { Email } from "../../domain/email.js";
import { EmailAlreadyInUse } from "../../domain/exceptions/emailAlreadyInUse.js";
import { UserRepository } from "../../domain/repositories/userRepository.js";
import { User } from "../../domain/user.js";
import { UserId } from "../../domain/userId.js";
import { CreateUserInput } from "./createUserInput.js";

export class CreateUser {
    public constructor(private userRepository: UserRepository) {}

    public async __invoke(createUserInput: CreateUserInput): Promise<UserId>
    {
        const id = UserId.generate();
        const email = Email.fromString(createUserInput.getEmail());

        const user = new User(id, createUserInput.getName(), createUserInput.getLastName(), email);

        const existThisEmail = await this.userRepository.existsByEmail(user.getEmail());
        if(existThisEmail) {
            throw new EmailAlreadyInUse();
        }

        await this.userRepository.save(user);

        return id;
    }
}