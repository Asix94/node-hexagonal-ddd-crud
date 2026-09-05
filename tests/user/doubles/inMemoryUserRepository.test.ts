/// <reference types="node" />

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { InMemoryUserRepository } from './inMemoryUserRepository.js';
import { UserId } from "../../../src/user/domain/userId.js";
import { Email } from "../../../src/user/domain/email.js";
import { User } from "../../../src/user/domain/user.js";

describe('inMemoryUserRepository', () => {
    it('saves a new user', async() => {
        const repository = new InMemoryUserRepository();

        const id = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        await repository.save(user);
        const currentUser = await repository.findById(user.getUserId());

        assert.ok(currentUser);
        assert.equal(user.getUserId().toString(), currentUser.getUserId().toString());
        assert.equal(user.getName(), currentUser.getName());
        assert.equal(user.getLastName(), currentUser.getLastName());
        assert.equal(user.getEmail().toString(), currentUser.getEmail().toString());
    });

    it('replaces an existing user with the same id', async() => {
        const repository = new InMemoryUserRepository();

        const id = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        await repository.save(user);

        const newName = 'Laura';
        const newLastName = 'Leon';
        const newEmail = Email.fromString('laura@example.com');

        const newUser = new User(id, newName, newLastName, newEmail);

        await repository.save(newUser);

        const currentUser = await repository.findById(user.getUserId());

       assert.ok(currentUser);
        assert.equal(user.getUserId().toString(), currentUser.getUserId().toString());
        assert.equal(newName, currentUser.getName());
        assert.equal(newLastName, currentUser.getLastName());
        assert.equal(newEmail.toString(), currentUser.getEmail().toString());
    });

    it('checks if a user exists by email', async() => {
        const repository = new InMemoryUserRepository();

        const id = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        await repository.save(user);

        let existsEmail = await repository.existsByEmail(email);

        assert.ok(existsEmail);

        const newEmail = Email.fromString('laura@example.com');
        existsEmail = await repository.existsByEmail(newEmail);

        assert.ok(!existsEmail);
    });

    it('finds a user by id', async() => {
        const repository = new InMemoryUserRepository();

        const id = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        await repository.save(user);
        const currentUser = await repository.findById(user.getUserId());

        assert.ok(currentUser);
        assert.equal(user.getUserId().toString(), currentUser.getUserId().toString());
        assert.equal(user.getName(), currentUser.getName());
        assert.equal(user.getLastName(), currentUser.getLastName());
        assert.equal(user.getEmail().toString(), currentUser.getEmail().toString());
    });

    it('returns null when user id does not exist', async() => {
        const repository = new InMemoryUserRepository();

        const idA = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const idB = UserId.fromString('bd0694f6-5b7f-4ac2-99df-299d5a0fb9ca');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(idA, name, lastName, email);

        await repository.save(user);
        const currentUser = await repository.findById(idB);

        assert.ok(!currentUser);
    });

    it('deletes an existing user', async() => {
        const repository = new InMemoryUserRepository();

        const id = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(id, name, lastName, email);

        await repository.save(user);
        let currentUser = await repository.findById(user.getUserId());

        assert.ok(currentUser);

        await repository.delete(currentUser.getUserId());

        currentUser = await repository.findById(user.getUserId());

        assert.ok(!currentUser);
        assert.equal(0, await repository.count());
        assert.ok(!(await repository.existsByEmail(email)));
    });

    it('does not delete another user when id does not exist', async() => {
        const repository = new InMemoryUserRepository();

        const idA = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const idB = UserId.fromString('bd0694f6-5b7f-4ac2-99df-299d5a0fb9ca');
        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = Email.fromString('carlos@example.com');

        const user = new User(idA, name, lastName, email);

        await repository.save(user);
        await repository.delete(idB);

        const currentUserA = await repository.findById(user.getUserId());
        const currentUserB = await repository.findById(idB);

        assert.ok(currentUserA);
        assert.ok(!currentUserB);
        assert.equal(1, await repository.count());
        assert.equal(email.toString(), currentUserA.getEmail().toString());
    });

    it('returns users ordered and paginated', async() => {
        const repository = new InMemoryUserRepository();

        const idA = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const nameA = 'Carlos';
        const lastNameA = 'Ramos';
        const emailA = Email.fromString('carlos@example.com');
        const userA = new User(idA, nameA, lastNameA, emailA);
        await repository.save(userA);

        const idB = UserId.fromString('bd0694f6-5b7f-4ac2-99df-299d5a0fb9ca');
        const nameB = 'Laura';
        const lastNameB = 'Leon';
        const emailB = Email.fromString('laura@example.com');
        const userB = new User(idB, nameB, lastNameB, emailB);
        await repository.save(userB);

        const idC = UserId.fromString('6cc4823a-481c-4e7d-a4ca-3c05e15469bd');
        const nameC = 'Carlos2';
        const lastNameC = 'Ramos2';
        const emailC = Email.fromString('carlos2@example.com');
        const userC = new User(idC, nameC, lastNameC, emailC);
        await repository.save(userC);

        const users = await repository.findAll(2, 0);

        assert.equal(2, users.length);

        assert.equal(userA.getUserId().toString(), users[0].getUserId().toString());
        assert.equal(userA.getName(), users[0].getName());
        assert.equal(userA.getLastName(), users[0].getLastName());
        assert.equal(userA.getEmail().toString(), users[0].getEmail().toString());

        assert.equal(userC.getUserId().toString(), users[1].getUserId().toString());
        assert.equal(userC.getName(), users[1].getName());
        assert.equal(userC.getLastName(), users[1].getLastName());
        assert.equal(userC.getEmail().toString(), users[1].getEmail().toString());
    });

    it('returns the second page of users', async() => {
        const repository = new InMemoryUserRepository();

        const idA = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const nameA = 'Carlos';
        const lastNameA = 'Ramos';
        const emailA = Email.fromString('carlos@example.com');
        const userA = new User(idA, nameA, lastNameA, emailA);
        await repository.save(userA);

        const idB = UserId.fromString('bd0694f6-5b7f-4ac2-99df-299d5a0fb9ca');
        const nameB = 'Laura';
        const lastNameB = 'Leon';
        const emailB = Email.fromString('laura@example.com');
        const userB = new User(idB, nameB, lastNameB, emailB);
        await repository.save(userB);

        const idC = UserId.fromString('6cc4823a-481c-4e7d-a4ca-3c05e15469bd');
        const nameC = 'Carlos2';
        const lastNameC = 'Ramos2';
        const emailC = Email.fromString('carlos2@example.com');
        const userC = new User(idC, nameC, lastNameC, emailC);
        await repository.save(userC);

        const users = await repository.findAll(1, 2);

        assert.equal(1, users.length);

        assert.equal(userB.getUserId().toString(), users[0].getUserId().toString());
        assert.equal(userB.getName(), users[0].getName());
        assert.equal(userB.getLastName(), users[0].getLastName());
        assert.equal(userB.getEmail().toString(), users[0].getEmail().toString());
    });

    it('counts the users', async() => {
        const repository = new InMemoryUserRepository();

        assert.equal(0, await repository.count());

        const idA = UserId.fromString('550e8400-e29b-41d4-a716-446655440000');
        const nameA = 'Carlos';
        const lastNameA = 'Ramos';
        const emailA = Email.fromString('carlos@example.com');
        const userA = new User(idA, nameA, lastNameA, emailA);
        await repository.save(userA);

        assert.equal(1, await repository.count());

        const idB = UserId.fromString('bd0694f6-5b7f-4ac2-99df-299d5a0fb9ca');
        const nameB = 'Laura';
        const lastNameB = 'Leon';
        const emailB = Email.fromString('laura@example.com');
        const userB = new User(idB, nameB, lastNameB, emailB);
        await repository.save(userB);

        assert.equal(2, await repository.count());

        const idC = UserId.fromString('bd0694f6-5b7f-4ac2-99df-299d5a0fb9ca');
        const nameC = 'Carlos';
        const lastNameC = 'Ramos';
        const emailC = Email.fromString('carlos2@example.com');
        const userC = new User(idC, nameC, lastNameC, emailC);
        await repository.save(userC);

        assert.equal(2, await repository.count());
    });
});