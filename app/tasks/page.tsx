import Link from "next/link";
import CreateTask from "./CreateTask";

async function getTasks() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/tasks/records?page=1&perPage=5",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <div>
      <h1>Tasks</h1>
      {tasks?.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}

      <CreateTask />
    </div>
  );
}

function TaskCard({ task }: any) {
  const { id, task_name, task_created_date, task_due_date, task_description } =
    task || {};

  return (
    <Link href={`/tasks/${id}`}>
      <div>
        <h1>{task_name}</h1>
        <p>{task_created_date}</p>
        <p>{task_description}</p>
        <p>{task_due_date}</p>
      </div>
    </Link>
  );
}
