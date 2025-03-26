import express, { Request, Response } from "express";
import cors from "cors";
import priorityRoutes from "./routes/priority.routes";
import tagsRoutes from "./routes/tag.routes"
import userRoutes from "./routes/user.routes"
import taskRoutes from "./routes/task.routes"


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/priorities", priorityRoutes);
app.use("/tags", tagsRoutes)
app.use("/users", userRoutes)
app.use("/tasks", taskRoutes)

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
