import Form from "@/app/components/Form";

const Page = () => {
  return (
    <div className="flex flex-col gap-4 items-start justify-around w-full h-full py-6">
      <h1 className="text-2xl font-bold mt-4 mb-6">Create New Task</h1>
      <div className="w-full">
        <Form />
      </div>
    </div>
  );
};

export default Page;
