import { Suspense } from "react";
import { getOneTask } from "../../../../lib/data/dal/tasks";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ publicId: string }>;
};

// This component reads params and fetches from PostgreSQL.
async function TaskDetails({ params }: Props) {
  const { publicId } = await params;
  const task = await getOneTask(publicId);

  if (!task) notFound();

  return (
    <div className="flex flex-col justify-start">
      <h1 className="mb-4 text-2xl font-bold">{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}

// The page provides the Suspense boundary.
export default function TaskPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading task...</p>}>
      <TaskDetails params={params} />
    </Suspense>
  );
}
