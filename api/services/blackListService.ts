import { eq } from "drizzle-orm";
import { database } from "../db/index.js";
import { blackListTable } from "../db/schemas/index.js";
import type { BlackListDTO } from "../dto/blackListDTO.js";

const getTokenByJWTTokenService = async (JWTToken: string) => {
  return await database.query.blackListTable.findFirst({
    where: eq(blackListTable.token, JWTToken),
  });
};

const addTokenFromBlackListService = async (data: BlackListDTO) => {
  return await database.insert(blackListTable).values(data).returning();
};

export { addTokenFromBlackListService, getTokenByJWTTokenService };

