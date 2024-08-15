import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline : { type: String, required: true },
    completed: { type: Boolean, required: true },
});


// User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],  // Array of chats
});



const User = mongoose.model("User", UserSchema);
const task = mongoose.model("task", taskSchema);

export { User, task };
