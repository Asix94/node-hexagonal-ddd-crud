export class invalidUserId extends Error {
    constructor() {
        super("Invalid user id");

        this.name = "invalidUserId"
    }
}