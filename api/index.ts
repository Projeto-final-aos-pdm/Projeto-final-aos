import cors from "cors";
import express from "express";
import env from "./env.js";
import router from "./routes/index.js";

const server = express();

server.use(cors());
server.use(express.json());

server.listen(env.PORT, () => {
  console.log("Server is running!!");
});

server.get("/", (req, res) => {
  res.send("Hello");
});

server.use("/user", router.user);
server.use("/auth", router.auth);
server.use("/financial-goal", router.financialGoal);
server.use("/category", router.category);
server.use("/monthly-budget", router.monthlyBudget);
