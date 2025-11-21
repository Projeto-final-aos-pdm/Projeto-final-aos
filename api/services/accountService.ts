import { eq, and } from "drizzle-orm";
import { database } from "../db/index.js";
import { accountTable } from "../db/schemas/account.js";
import { transactionTable } from "../db/schemas/transaction.js"; // Para deletar transações
import type { AccountDTO, UpdateAccountDTO } from "../dto/accountDTO.js";

/**
 * @param userId
 */
const getAllAccountsService = async (userId: string) => {
    return await database.query.accountTable.findMany({
        where: eq(accountTable.user_id, userId),
    });
};

/**
 * @param accountId 
 * @param userId 
 */
const getAccountByIdService = async (accountId: string, userId: string) => {
    return await database.query.accountTable.findFirst({
        where: and(
            eq(accountTable.id, accountId),
            eq(accountTable.user_id, userId)
        ),
    });
};

/**
 * @param data 
 * @param userId 
 */
const createAccountService = async (data: AccountDTO, userId: string) => {
    const newAccount = await database.insert(accountTable).values({
        ...data,
        user_id: userId,
    }).returning();
    
    return newAccount[0];
};

/**
 * @param accountId 
 * @param userId 
 * @param data 
 */
const updateAccountService = async (
    accountId: string,
    userId: string,
    data: UpdateAccountDTO
) => {
    return await database
        .update(accountTable)
        .set(data)
        .where(and( 
            eq(accountTable.id, accountId),
            eq(accountTable.user_id, userId)
        ))
        .returning();
};

/**
 * @param accountId 
 * @param userId 
 */
const deleteAccountService = async (accountId: string, userId: string) => {
    
    const account = await getAccountByIdService(accountId, userId);
    if (!account) {
        throw new Error("Conta não encontrada ou acesso negado.");
    }

    await database.delete(transactionTable).where(eq(transactionTable.account_id, accountId));

    return await database
        .delete(accountTable)
        .where(eq(accountTable.id, accountId))
        .returning();
};

export {
    getAllAccountsService,
    getAccountByIdService,
    createAccountService,
    updateAccountService,
    deleteAccountService,
};