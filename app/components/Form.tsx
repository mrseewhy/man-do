"use client";
import { useState } from "react";
import taskValidator from "@/lib/validator/task.validator";
import { createTaskAction } from "../../lib/actions/task.actions";

const Form = () => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{
    title?: string[];
    description?: string[];
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const taskData = {
      title: formData.title,
      description: formData.description,
    };
    const validatedData = taskValidator.safeParse(taskData);
    if (!validatedData.success) {
      setErrors(validatedData.error.flatten().fieldErrors);
      setPending(false);
      return;
    }

    try {
      await createTaskAction(validatedData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
      setErrors({});
      setFormData(initialFormData);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 "
          >
            Task Title:
          </label>
          <input
            value={formData.title}
            type="text"
            placeholder="Task Title"
            className="input input-bordered  w-full"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title[0]}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          >
            Task Description:
          </label>
          <textarea
            value={formData.description}
            placeholder="Task Description"
            className="textarea textarea-bordered w-full "
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description[0]}
            </span>
          )}
        </div>

        <button className="btn btn-primary" disabled={pending}>
          {pending ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default Form;
