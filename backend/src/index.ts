import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import transactionRoutes from "./routes/transaction.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
