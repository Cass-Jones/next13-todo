"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const router = useRouter();

  const [taskName, setTaskName] = useState("");
  const [taskCreatedDate, setTaskCreatedDate] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const createTask = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: taskName,
        task_created_date: taskCreatedDate,
        task_due_date: taskDueDate,
        task_description: taskDescription,
      }),
    });

    setTaskName("");
    setTaskCreatedDate("");
    setTaskDueDate("");
    setTaskDescription("");

    router.refresh();
  };

  return (
    <form onSubmit={createTask}>
      <h3>Create a new task</h3>
      <label htmlFor="taskName"></label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <button type="submit" value="Create Task">
        Create Task{" "}
      </button>
    </form>
  );
}
