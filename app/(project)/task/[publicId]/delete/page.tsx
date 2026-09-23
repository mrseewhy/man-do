import Link from "next/link";
import { getOneTask } from "@/lib/data/dal/tasks";
import { notFound } from "next/navigation";
import { deleteTaskAction } from "@/lib/actions/task.actions";

type Props = {
  params: Promise<{ publicId: string }>;
};

const Page = async ({ params }: Props) => {
  const { publicId } = await params;
  const task = await getOneTask(publicId);

  if (!task) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">
        Do you want to delete this item{" "}
        <span className="text-red-600">{task.title}</span>?
      </h2>
      <p>This action cannot be reversed</p>
      <div className="flex flex-row gap-4">
        <Link className="btn btn-sm btn-accent" href="/">
          Go Back Home
        </Link>
        <form action={deleteTaskAction}>
          <input type="hidden" name="publicId" value={publicId} />
          <button type="submit" className="btn btn-sm btn-error">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
