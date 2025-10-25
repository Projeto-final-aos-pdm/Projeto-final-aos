import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { userTable } from "../db/schemas/user.js";
import type { UserDTO } from "../dto/userDTO.js";

const getAllUsersService = async () => {
    return await database.query.userTable.findMany();
};

const getUserByIdService = async (userId: string) => {
    return await database.query.userTable.findFirst({
        where: eq(userTable.id, userId),
    });
};

const createUserService = async (data: UserDTO) => {
    return await database.insert(userTable).values(data).returning();
};

const updateUserByIdService = async (
    userId: string,
    data: Partial<UserDTO>
) => {
    return await database
        .update(userTable)
        .set(data)
        .where(eq(userTable.id, userId));
};

const deleteUserByIdService = async (userId: string) => {
    return await database.delete(userTable).where(eq(userTable.id, userId));
};

export {
    createUserService,
    deleteUserByIdService,
    getAllUsersService,
    getUserByIdService,
    updateUserByIdService,
};