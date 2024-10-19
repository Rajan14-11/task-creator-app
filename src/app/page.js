//this is server side rendered page where we can fetch the initialTasks from server using the client side component to render the ui.

import TaskManager from "./components/TaskManager";

let initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is the first task",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the second task",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the third task",
    priority: "low",
    completed: false,
  },
];

export default async function Home() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <TaskManager initialTasks={initialTasks} />;
    </div>
  );
}
