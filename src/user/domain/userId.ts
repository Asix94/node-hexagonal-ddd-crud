import { randomUUID } from "node:crypto";
import { invalidUserId } from "./exepctions/invalidUserId.js";

export class UserId {
    private constructor(private readonly value: string) {}

    public static generate(): UserId {
        return new UserId(randomUUID());
    }

    public static fromString(id: string): UserId
    {
        const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if(!uuidPattern.test(id)) {
            throw new invalidUserId();
        }

        return new UserId(id);

    }

    public toString(): string
    {
        return this.value;
    }
}