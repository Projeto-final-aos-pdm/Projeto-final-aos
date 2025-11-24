import cors from "cors";
import express from "express";
import env from "./env.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import router from "./routes/index.js";

const server = express();

server.use(cors());
server.use(express.json());

server.listen(env.PORT, () => {
  console.log("Server is running!!");
});

server.get("/", (req, res) => {
  res.send("Welcome the finnancial API!!");
});

// Rotas públicas (sem autenticação)
server.use("/auth", router.auth);

// Rotas protegidas (com autenticação global)
server.use("/user", authMiddleware, router.user);
server.use("/account", authMiddleware, router.account);
server.use("/transaction", authMiddleware, router.transaction);
server.use("/financial-goal", authMiddleware, router.financialGoal);
server.use("/category", authMiddleware, router.category);
server.use("/monthly-budget", authMiddleware, router.monthlyBudget);
