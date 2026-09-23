import * as z from "zod";

export const taskValidator = z.object({
  title: z
    .string("Enter a title")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string("Enter a description")
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must be at most 200 characters long"),
  completed: z.boolean().optional(),
});

export type TaskInput = z.infer<typeof taskValidator>;
