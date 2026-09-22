import Link from "next/link";

type Task = {
  publicId: string;
  title: string;
  description: string;
  completed: boolean;
};

type TableProps = {
  tasks: Task[];
};

const Table = ({ tasks }: TableProps) => {
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-12 text-center">Completed</th>
              <th className="w-1/3">Task</th>
              <th className="w-1/3">Description</th>
              <th className="w-1/4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.publicId} className="hover">
                <th className="w-12 text-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={task.completed}
                  />
                </th>

                <td className="w-1/3">
                  <div className="font-bold">{task.title}</div>
                </td>

                <td className="w-1/3">{task.description}</td>

                <td className="w-1/4">
                  <div className="flex gap-2">
                    <Link
                      href={`task/${task.publicId}`}
                      className="btn btn-outline btn-sm"
                    >
                      View
                    </Link>
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button className="btn btn-error btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
