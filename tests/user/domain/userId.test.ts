import assert from "node:assert";
import { describe, it } from "node:test";

import { invalidUserId } from "../../../src/user/domain/exepctions/invalidUserId.js";
import { UserId } from "../../../src/user/domain/userId.js";

describe("UserId", () => {
    it("creates a UserId from a valid UUID", () => {
        const uuid = "550e8400-e29b-41d4-a716-446655440000";

        const userId = UserId.fromString(uuid);

        assert.equal(userId.toString(), uuid);
    });

    it("rejects an invalid UUID", () => {
        assert.throws(() => UserId.fromString("invalid-uuid"), invalidUserId);
    });

    it("generates a UUID version 4", () => {
        const userId = UserId.generate();

        assert.match(
            userId.toString(),
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        );
    });
});