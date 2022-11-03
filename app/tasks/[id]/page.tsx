import Error from "./error";
import ErrorBoundary from "next";

async function getTask(taskId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/tasks/records/${taskId}`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = await res.json();
  return data;
}

export default async function TaskPage({ params }: any) {
  const task = await getTask(params.id);
  console.log(task);
  return (
    <div>
      <h1>Task Details</h1>
      <p>{task?.task_name}</p>
    </div>
  );
}
