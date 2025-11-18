import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
} from "../controllers/accountController.js";

const router = Router();
router.use(authMiddleware);

router.route("/users/:userId/contas")
    .get(getAllAccounts)
    .post(createAccount);

router.route("/contas/:accountId")
    .get(getAccountById)
    .put(updateAccount)
    .delete(deleteAccount);

export default router;