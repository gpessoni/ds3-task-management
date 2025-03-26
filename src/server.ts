import express, { Request, Response } from "express";
import priorityRoutes from "./routes/priority.routes";


const app = express();
const port = 3000;

app.use(express.json());

app.use("/priorities", priorityRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
