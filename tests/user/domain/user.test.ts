/// <reference types="node" />

import { strict as assert } from "node:assert";
import { describe, it } from 'node:test';

import { UserId } from '../../../src/user/domain/userId.js'
import { Email } from '../../../src/user/domain/email.js';
import { User } from '../../../src/user/domain/user.js'
import { InvalidUserName } from '../../../src/user/domain/exceptions/invalidUserName.js';
import { InvalidUserLastName } from '../../../src/user/domain/exceptions/invalidUserLastName.js';

describe('User', () => {
    it('testItCreatesValidUser', () => {
        const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        assert.equal(id.toString(), user.getUserId().toString());
        assert.equal(name, user.getName());
        assert.equal(lastName, user.getLastName());
        assert.equal(email.toString(), user.getEmail().toString());
    });

    it('testItTrimsNameAndLastName', () => {
        const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
        const name = ' Carlos ';
        const lastName = ' Ramos ';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        assert.equal('Carlos', user.getName());
        assert.equal('Ramos', user.getLastName());
    });

    it('testItRejectsBlankName', () => {
        assert.throws(() => {
            const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
            const name = ' ';
            const lastName = 'Ramos';
            const email = Email.fromString('carlos@example.com');

            const user = new User(id, name, lastName, email);
        }, InvalidUserName)
    });

    it('testItRejectsBlankLastName', () => {
        assert.throws(() => {
            const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
            const name = 'Carlos';
            const lastName = ' ';
            const email = Email.fromString('carlos@example.com');

            const user = new User(id, name, lastName, email);
        }, InvalidUserLastName)
    });

    it('testItChangesFullName', () => {
        const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        const newName = ' Laura ';
        const newLastName = ' Leon ';

        user.changeFullName(newName, newLastName);

        assert.equal('Laura', user.getName());
        assert.equal('Leon', user.getLastName());
    });

    it('testItKeepsFullNameWhenNameIsInvalid', () => {
        const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        const newName = ' ';
        const newLastName = ' Leon ';

        assert.throws(() => {
            user.changeFullName(newName, newLastName);
        }, InvalidUserName);

        assert.equal(name, user.getName());
        assert.equal(lastName, user.getLastName());
    });

    it('testItKeepsFullNameWhenLastNameIsInvalid', () => {
        const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        const newName = ' Laura ';
        const newLastName = ' ';

        assert.throws(() => {
            user.changeFullName(newName, newLastName);
        }, InvalidUserLastName);

        assert.equal(name, user.getName());
        assert.equal(lastName, user.getLastName());
    });

    it('testItChangesEmail', () => {
        const id = UserId.fromString('5f1ad145-048e-4919-a8cc-7f4decb410d4');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        const newEmail = Email.fromString('laura@example.com');

        user.changeEmail(newEmail);

        assert.equal(
            newEmail.toString(),
            user.getEmail().toString()
        );
    });
});