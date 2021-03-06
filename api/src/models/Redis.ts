import { createClient } from "redis";
import { idGenerator } from "../utils";
import { mongoIdValidator, redisUrl } from "../constantes";
import { Session } from "../types";

const RedisClient = createClient({
    url: redisUrl,
});

RedisClient.on("error", (err) => console.log("Redis Client Error", err));

const timeToLive = 1_800; // 30mins

export async function createUserSession(user: Session): Promise<string | null> {
    try {
        const id = idGenerator();
        await RedisClient.set(id, JSON.stringify({ ...user, CreatedAt: undefined }));
        await RedisClient.expire(id, timeToLive);
        return id;
    } catch (err) {
        console.error(err);
        return null;
    }
}
export async function updateUserSession(id: string, user: Session) {
    if (!mongoIdValidator.test(id)) {
        throw new Error("Invalid Id");
    }
    const doesNotExist = !(await RedisClient.get(id).catch(console.error));
    if (doesNotExist) {
        return false;
    }
    try {
        await RedisClient.set(id, JSON.stringify(user));
        await RedisClient.expire(id, timeToLive);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function deleteUserSession(id: string) {
    if (!mongoIdValidator.test(id)) {
        throw new Error("Invalid Id");
    }
    return RedisClient.del(id).catch((err) => {
        console.error(err);
        return null;
    });
}

export async function readUserSession(id: string) {
    if (!mongoIdValidator.test(id)) {
        throw new Error("Invalid Id");
    }
    const res = await RedisClient.get(id).catch(console.error);
    if (!res) return null;
    try {
        RedisClient.expire(id, timeToLive).catch(console.error);
        return JSON.parse(res);
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default RedisClient;