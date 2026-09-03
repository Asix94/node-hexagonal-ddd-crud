/// <reference types="node" />

import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Email } from '../../../src/user/domain/email.js';
import { InvalidEmail } from "../../../src/user/domain/exceptions/invalidEmail.js";

describe("Email", () => {
    it("testItNormalizesEmail", () => {
        const email = Email.fromString(' CARLOS@EXAMPLE.COM ');
        assert.equal(email.toString(), 'carlos@example.com');
    });

    it("testItRejectsInvalidEmail", () => {
        assert.throws(() => Email.fromString('esto-no-es-un-mail'), InvalidEmail);
    });

    it("testItRejectsBlankEmail", () => {
        assert.throws(
            () => Email.fromString(' '), 
            InvalidEmail
        );
    });

    it("testItEqualsEquivalentEmail", () => {
        const email = Email.fromString(' CARLOS@EXAMPLE.COM ');
        const newEmail = Email.fromString('carlos@example.com');

        const isEqual = email.equals(newEmail);
        assert.ok(isEqual);
    });

    it("testItDoesNotEqualDifferentEmail", () => {
        const email = Email.fromString(' LAURA@EXAMPLE.COM ');
        const newEmail = Email.fromString('carlos@example.com');

        const isEqual = email.equals(newEmail);
        assert.ok(!isEqual);
    });
});