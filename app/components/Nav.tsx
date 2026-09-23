import { PencilSparkles } from "lucide-react";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <PencilSparkles />
        <h1 className="text-xl font-bold">Man-Do</h1>
      </div>
      <div>
        <ul className="flex gap-4 mt-2">
          <li>
            <Link href="/" className="text-sm text-gray-600">
              All Tasks
            </Link>
          </li>
          <li>
            <Link href="/create" className="text-sm text-gray-600">
              Create new Task
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
