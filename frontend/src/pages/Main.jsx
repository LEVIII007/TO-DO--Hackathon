import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "../components/Header";
import Card from "../components/Card";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  deletetask,
  getUsertasks,
  newtask,
  updatetask,
} from "../helper/api-communicator";
import { useEffect, useState , useRef, useLayoutEffect} from "react";

const Task = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const theme = useTheme();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const deadlineRef = useRef(null);
  const [tasks, settasks] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading("Adding Task", { id: "addtask" });
    const title = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const deadline = deadlineRef.current?.value;
    if (nameRef.current) nameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (deadlineRef.current) deadlineRef.current.value = "";
    const newTask = { name: title, description: description, deadline: deadline };
    settasks((prev) => [...prev, newTask]);
    await newtask(newTask);
    toast.success("Task Added Successfully", { id: "addtask" });
  };

// useEffect(() => {
//   const fetchTasks = async () => {
//     try {
//       const tasks = await getUsertasks();
//       settasks(tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   fetchTasks();
// }, [tasks]);

const handleAddTask = async (newTask) => {
  try {
    const addedTask = await newtask(newTask);
    settasks((tasks) => [...newTasks, newTask]);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

useLayoutEffect(() => {
  if (auth?.isLoggedIn && auth.user) {
    toast.loading("Loading Tasks", { id: "loadtasks" });
    getUsertasks()
      .then((data) => {
        settasks([...data.tasks]);
        toast.success("Successfully loaded tasks", { id: "loadtasks" });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Loading Failed", { id: "loadtasks" });
      });
  }
}, [auth]);

useEffect(() => {
  if (!auth?.user) {
    return navigate("/login");
  }
}, [auth]);
  return (
    <Box width={"100%"} height={"100%"}>
        <Header />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <form onSubmit={handleSubmit} className="border p-4 rounded-md">
  <input
    type="text"
    placeholder="Task Name"
    ref={nameRef}
    value={newtask.name || ""}
    className="border p-2 mb-2 w-full"
  />
  <br />
  <input
    type="text"
    placeholder="Task Description"
    ref={descriptionRef}
    value={newtask.description || ""}
    className="border p-2 mb-2 w-full"
  />
  <br />
  <input
    type="text"
    placeholder="Task Deadline"
    ref={deadlineRef}
    value={newtask.deadline || ""}
    className="border p-2 mb-2 w-full"
  />
  <button type="submit" className="border p-2 mt-2 w-full bg-blue-500 text-white rounded-md">
    Add Task
  </button>
</form>

        {/* {tasks.map((task) => (
          <Card
            title={task.name}
            Description={task.description}
            Deadline={task.deadline}
          />
        ))} */}
        </Box>
        <Card
          title="Sample Task 1"
          Description="This is a sample task description."
          Deadline="2022-12-31"
        />
        <Card
          title="Sample Task 2"
          Description="This is another sample task description."
          Deadline="2022-11-30"
        />
        <Card
          title="Sample Task 3"
          Description="Yet another sample task description."
          Deadline="2022-10-31"
        />
    </Box>
  );
};

export default Task;




// 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