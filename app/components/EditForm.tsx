"use client";

import { useActionState } from "react";
import { updateTaskAction } from "@/lib/actions/task.actions";
import { initialActionState } from "@/lib/actions/action-state";
import type { Task } from "@/lib/data/dal/tasks";

const EditForm = ({ task }: { task: Task }) => {
  const [state, formAction, pending] = useActionState(
    updateTaskAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <input type="hidden" name="publicId" value={task.publicId} />

      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Task Title"
          defaultValue={task.title}
          className="input input-bordered w-full"
          aria-invalid={!!state.errors?.title}
        />
        {state.errors?.title && (
          <span className="text-sm text-red-500">{state.errors.title[0]}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Task Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Task Description"
          defaultValue={task.description}
          className="textarea textarea-bordered w-full"
          aria-invalid={!!state.errors?.description}
        ></textarea>
        {state.errors?.description && (
          <span className="text-sm text-red-500">
            {state.errors.description[0]}
          </span>
        )}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="completed"
          defaultChecked={task.completed}
          className="checkbox"
        />
        Completed
      </label>

      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Updating..." : "Update Task"}
      </button>
    </form>
  );
};

export default EditForm;
