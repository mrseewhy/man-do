import "server-only";

import db from "../index";
import { tasksTable } from "../schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export type Task = {
  publicId: string;
  title: string;
  description: string;
  completed: boolean;
};

const taskColumns = {
  publicId: tasksTable.publicId,
  title: tasksTable.title,
  description: tasksTable.description,
  completed: tasksTable.completed,
};

// Get all tasks

const getAllTasks = async (): Promise<Task[]> => {
  "use cache";
  cacheTag("tasks");

  return db
    .select(taskColumns)
    .from(tasksTable)
    .orderBy(desc(tasksTable.createdAt));
};

// Get one task

const getOneTask = async (publicId: string): Promise<Task | undefined> => {
  "use cache";
  cacheTag("tasks", `task:${publicId}`);

  const [task] = await db
    .select(taskColumns)
    .from(tasksTable)
    .where(eq(tasksTable.publicId, publicId))
    .limit(1);

  return task;
};

// Create a new task

const createTask = async (taskData: Pick<Task, "title" | "description">) => {
  await db
    .insert(tasksTable)
    .values({ title: taskData.title, description: taskData.description });
};

// Update a task (fields are optional so callers can update any subset)

const updateTask = async (
  id: string,
  data: Partial<Pick<Task, "title" | "description" | "completed">>,
) => {
  await db.update(tasksTable).set(data).where(eq(tasksTable.publicId, id));
};

// Delete one task

const deleteOne = async (id: string) => {
  await db.delete(tasksTable).where(eq(tasksTable.publicId, id));
};

export { getAllTasks, getOneTask, createTask, updateTask, deleteOne };
