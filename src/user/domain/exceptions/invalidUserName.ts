export class InvalidUserName extends Error {
    constructor() {
        super('invalid user name');

        this.name = 'InvalidUserName';
    }
}