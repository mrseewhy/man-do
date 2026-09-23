"use server";

import { createTask, updateTask, deleteOne } from "../data/dal/tasks";
import { taskValidator } from "@/lib/validator/task.validator";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { flattenError } from "zod";
import type { ActionState } from "./action-state";

// Create action

export const createTaskAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const validated = taskValidator.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validated.success) {
    return {
      success: false,
      errors: flattenError(validated.error).fieldErrors,
    };
  }

  await createTask(validated.data);

  updateTag("tasks");
  redirect("/");
};

// Update action

export const updateTaskAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const publicId = String(formData.get("publicId") ?? "");

  const validated = taskValidator.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    completed: formData.get("completed") === "on",
  });

  if (!validated.success) {
    return {
      success: false,
      errors: flattenError(validated.error).fieldErrors,
    };
  }

  await updateTask(publicId, validated.data);

  updateTag("tasks");
  updateTag(`task:${publicId}`);
  redirect("/");
};

// Toggle completed action (called from the table checkbox)

export const toggleTaskAction = async (
  publicId: string,
  completed: boolean,
): Promise<void> => {
  await updateTask(publicId, { completed });
  updateTag("tasks");
  updateTag(`task:${publicId}`);
};

// Delete action (used by the delete page form)

export const deleteTaskAction = async (formData: FormData): Promise<void> => {
  const publicId = String(formData.get("publicId") ?? "");
  if (!publicId) return;

  await deleteOne(publicId);
  updateTag("tasks");
  updateTag(`task:${publicId}`);
  redirect("/");
};
