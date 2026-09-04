export class InvalidUserLastName extends Error {
    constructor() {
        super('Invalid user lastName');

        this.name = 'InvalidUserLastName';
    }
}