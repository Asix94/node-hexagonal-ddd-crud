export class InvalidUserId extends Error {
    constructor() {
        super('Invalid user id');

        this.name = 'InvalidUserId';
    }
}