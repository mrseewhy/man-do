import Table from "@/app/components/Table";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { getAllTasks } from "@/lib/data/dal/tasks";

const page = async () => {
  const tasks = await getAllTasks();
  return (
    <div className="flex flex-col gap-4 items-start justify-around w-full h-full">
      {tasks.length < 1 ? (
        <div className="flex  gap-4 p-4 items-baseline ">
          <h2 className="text-2xl font-bold mt-4 mb-6">
            {" "}
            No tasks found, create a new task
          </h2>
          <Link href="/create">
            <PencilLine className=" size-4 " />
          </Link>
        </div>
      ) : (
        <>
          <div className="flex  gap-4 p-4 items-baseline ">
            <h2 className="text-2xl font-bold mt-4 mb-6">
              {" "}
              This is a simple task table
            </h2>
            <Link href="/create">
              <PencilLine className=" size-4 " />
            </Link>
          </div>
          <div className="flex flex-col gap-4 items-center justify-around w-full h-full">
            <Table tasks={tasks} />
          </div>
        </>
      )}
    </div>
  );
};

export default page;
