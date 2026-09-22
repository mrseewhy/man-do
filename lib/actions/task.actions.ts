"use server";

import { createTask } from "../data/dal/tasks";
import taskValidator from "@/lib/validator/task.validator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type TaskData = {
  title: string;
  description: string;
};

//create action

export const createTaskAction = async (taskData: TaskData) => {
  const validated = taskValidator.safeParse(taskData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  await createTask(validated.data);

  revalidatePath("/");
  redirect("/");
  return {
    success: true,
    errors: {},
  };
};
