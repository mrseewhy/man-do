import Link from "next/link";
import { getOneTask } from "@/lib/data/dal/tasks";
import EditForm from "@/app/components/EditForm";
import { notFound } from "next/navigation";

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
        Do you want to edit this item{" "}
        <span className="text-red-600">{task.title}</span>?
      </h2>
      <EditForm task={task} />
      <div className="flex flex-row gap-4">
        <Link className="btn btn-sm btn-accent" href="/">
          Go Back Home
        </Link>
        <Link className="btn btn-sm btn-error" href={`/task/${publicId}/delete`}>
          Delete
        </Link>
      </div>
    </div>
  );
};

export default Page;
