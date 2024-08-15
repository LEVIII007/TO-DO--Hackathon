import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = res.data;
  return data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = res.data;
  return data;
};

export const deletetask = async (taskId) => {
  const res = await axios.delete("/chat/delete", {
    data: { chatId }
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout chats");
  }
  const data = res.data;
  return data;
};

export const getUsertasks = async () => {
  const res = await axios.get("/chat/all-tasks");
  if (res.status !== 200) {
    throw new Error("Unable to get all chats");
  }
  const data = res.data;
  return data;
};

export const newtask = async (name) => {
  const res = await axios.post("/create", { name });
  if (res.status !== 200) {
    throw new Error("Unable to create new chat");
  }
  const data = res.data;
  return data;
};

export const updatetask = async (taskId) => {
    const res = await axios.put("/update", { taskId });
    if (res.status !== 200) {
        throw new Error("Unable to update chat");
    }
    const data = res.data;
    return data;
    };