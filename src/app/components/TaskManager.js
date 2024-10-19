"use client";

import { useEffect, useState } from "react";

export default function TaskManager({ initialTasks }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks") == null
      ? initialTasks
      : JSON?.parse(localStorage.getItem("tasks"))
  );

  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {

     if (editingTaskId !== null) {
       // If editing, update the task
       setTasks(
         tasks.map((task) =>
           task.id === editingTaskId ? { ...task, ...newTask } : task
         )
       );
       setEditingTaskId(null); // Reset editing state
     } else {
       // Otherwise, add a new task
       const newTaskWithId = {
         ...newTask,
         id: new Date().getTime().toString(),
         completed: false,
       };
       setTasks([...tasks, newTaskWithId]);
     }
     // Reset task input fields
     setNewTask({ title: "", description: "", priority: "low" });
  };

  const deleteTask = (id) => {
    let updatedtasks = tasks.filter((elem) => {
      return elem.id !== id;
    });
    setTasks(updatedtasks);
  };

  const updateTask = (id) => {
   let task = tasks.find((task)=>task.id===id)
   setNewTask(task)
   setEditingTaskId(id)

  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((elem) => {
        if (elem.id === id) {
          return { ...elem, completed: !elem.completed };
        } else {
          return { ...elem };
        }
      })
    );
  };

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  return (
    <div className="bg-slate-100 lg:w-3/4 md:w-full mx-auto">
      <section>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>

          {/* Form to Add Task */}
          <div className="mb-6">
            <input
              className="block w-full p-2 mb-2 border border-gray-300 rounded"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Task title"
            />
            <textarea
              className="block w-full p-2 mb-2 border border-gray-300 rounded"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Task description"
            />
            <select
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={addTask}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingTaskId?'Update': 'Add'} Task
            </button>
          </div>

          <ul className="space-y-4">
            {tasks
              ?.sort(
                (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
              )
              ?.map((task) => (
                <li
                  key={task.id}
                  className={`p-4 border rounded ${
                    task.priority === "high"
                      ? "bg-red-100"
                      : task.priority === "medium"
                      ? "bg-yellow-100"
                      : "bg-green-100"
                  }`}
                >
                  <h3 className="text-xl font-semibold">
                    {task.title}{" "}
                    <span className="text-sm">({task.priority})</span>
                  </h3>
                  <p className="text-gray-700">{task.description}</p>
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => toggleCompletion(task.id)}
                      className={`mr-2 p-2 rounded ${
                        task.completed ? "bg-yellow-400" : "bg-green-500"
                      } text-white`}
                    >
                      {task.completed ? "Unmark" : "Mark"} as Completed
                    </button>
                    <button
                      onClick={() => updateTask(task.id)}
                      className="p-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
