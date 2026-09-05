/// <reference types="node" />

import { strict as assert } from "node:assert";
import { describe, it } from 'node:test';

import { InMemoryUserRepository } from "../../doubles/inMemoryUserRepository.js";
import { CreateUser } from '../../../../src/user/application/createUser/createUser.js';
import { CreateUserInput } from '../../../../src/user/application/createUser/createUserInput.js';
import { Email } from '../../../../src/user/domain/email.js';
import { UserId } from "../../../../src/user/domain/userId.js";
import { EmailAlreadyInUse } from "../../../../src/user/domain/exceptions/emailAlreadyInUse.js";
import { InvalidUserName } from "../../../../src/user/domain/exceptions/invalidUserName.js";

describe('createUser', () => {
    it('creates a user', async () => {
        const repository = new InMemoryUserRepository();
        const useCase = new CreateUser(repository);

        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = 'carlos@example.com';

        const createUserInput = new CreateUserInput(name, lastName, email);

        const id = await useCase.__invoke(createUserInput);
        const savedUser = await repository.findById(id);

        assert.ok(id instanceof UserId);
        assert.equal(1, await repository.count());
        assert.ok(await repository.existsByEmail(Email.fromString(email)));

        assert.ok(savedUser);
        assert.equal(id.toString(), savedUser.getUserId().toString());
        assert.equal(name, savedUser.getName());
        assert.equal(lastName, savedUser.getLastName());
        assert.equal(Email.fromString(email).toString(), savedUser.getEmail().toString());
    });

    it('testItRejectsDuplicateEmail', async() => {
        const repository = new InMemoryUserRepository();
        const useCase = new CreateUser(repository);

        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = 'carlos@example.com';

        const createUserInput = new CreateUserInput(name, lastName, email);
        await useCase.__invoke(createUserInput);

        await assert.rejects(
            () => useCase.__invoke(createUserInput),
            EmailAlreadyInUse
        );

        assert.equal(1, await repository.count());
        assert.ok(await repository.existsByEmail(Email.fromString(email)));
    });

    it('validates the user before checking duplicate email', async () => {
        const repository = new InMemoryUserRepository();
        const useCase = new CreateUser(repository);

        const name = 'Carlos';
        const lastName = 'Ramos';
        const email = 'carlos@example.com';

        let createUserInput = new CreateUserInput(name, lastName, email);
        await useCase.__invoke(createUserInput);

        const newName = '';
        createUserInput = new CreateUserInput(newName, lastName, email);

        await assert.rejects(
            () => useCase.__invoke(createUserInput),
            InvalidUserName
        );

        assert.equal(1, await repository.count());
        assert.ok(await repository.existsByEmail(Email.fromString(email)));
    });
});