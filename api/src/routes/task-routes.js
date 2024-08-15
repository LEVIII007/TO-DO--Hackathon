import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { taskValidator, validate } from "../utils/validator.js";
import {
  deleteSpecificTask,
  createNewTask,
  sendAllTasks,
  marksdDone,
} from "../controllers/tasks-controller.js";

//Protected API
const taskRoutes = Router();
taskRoutes.post(
  "/new",
  validate(taskValidator),
  verifyToken,
  createNewTask
);
taskRoutes.get("/all-tasks", verifyToken, sendAllTasks);
taskRoutes.delete("/delete", verifyToken, deleteSpecificTask);
taskRoutes.get("/create", verifyToken, createNewTask);
taskRoutes.put("/update", verifyToken, marksdDone);

export default taskRoutes;