import "server-only";

import db from "../index";
import { tasksTable } from "../schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

type TaskData = {
  title: string;
  description: string;
};

// Get all tasks

const getAllTasks = async () => {
  "use cache";
  cacheTag("tasks");

  return db
    .select({
      publicId: tasksTable.publicId,
      title: tasksTable.task,
      description: tasksTable.description,
      completed: tasksTable.completed,
    })
    .from(tasksTable)
    .orderBy(desc(tasksTable.createdAt));
};

export { getAllTasks };

//create a new task
const createTask = async (taskData: TaskData) => {
  await db
    .insert(tasksTable)
    .values({ task: taskData.title, description: taskData.description });
};

export { createTask };

//get one

const getOneTask = async (publicId: string) => {
  "use cache";
  cacheTag("one-task");
  const [task] = await db
    .select({
      publicId: tasksTable.publicId,
      title: tasksTable.task,
      description: tasksTable.description,
      completed: tasksTable.completed,
    })
    .from(tasksTable)
    .where(eq(tasksTable.publicId, publicId))
    .limit(1);

  return task;
};

export { getOneTask };
