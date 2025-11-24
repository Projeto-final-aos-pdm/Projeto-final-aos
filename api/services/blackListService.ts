import { eq } from "drizzle-orm";
import { database } from "../db";
import { blackListTable } from "../db/schemas";
import type { BlackListDTO } from "../dto/blackListDTO";

const getTokenByJWTTokenService = async (JWTToken: string) => {
  return await database.query.blackListTable.findFirst({
    where: eq(blackListTable.token, JWTToken),
  });
};

const addTokenFromBlackListService = async (data: BlackListDTO) => {
  return await database.insert(blackListTable).values(data).returning();
};

export { addTokenFromBlackListService, getTokenByJWTTokenService };

