// import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";


// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     console.log("generate chat started");
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered OR Token malfunctioned" });
//     // grab chats of user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });

//     // send all chats with new one to openAI API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     // get latest response
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });
//     // user.chats.push({content : chatResponse.data.choices[0].message, role : "assistant"});
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     console.log("generate chat done");
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };


export const sendAllTasks = async (  // send all tasks to the user
    req, res, next
  ) => {
    try {
      console.log("send tasks started");
  
      // User token check
      const user = await User.findById(res.locals.jwtData.id).populate('tasks');
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
  
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
  
      // Extract task details
      const taskSummaries = user.tasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed
      }));
  
      console.log("send tasks done");
      return res.status(200).json({ message: "OK", tasks: taskSummaries });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };

// export const getMessagesFromChat = async ( // send messages from a specific chat
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { chatId, chatName } = req.params;

//     // User token check
//     const user = await User.findById(res.locals.jwtData.id).populate('chats');
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }

//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }

//     // Find the specific chat by ID and name
//     const chat = user.chats.find(chat => chat._id.toString() === chatId && chat.name === chatName);
//     if (!chat) {
//       return res.status(404).send("Chat not found");
//     }

//     // Extract messages
//     const messages = chat.messages;

//     return res.status(200).json({ message: "OK", messages });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "ERROR", cause: error.message });
//   }
// };

// export const deleteChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("delete chats started");
//     //user token check
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     //@ts-ignore
//     user.chats = [];
//     await user.save();
//     console.log("delete chats done");
//     return res.status(200).json({ message: "OK" });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

export const deleteSpecificTask = async (req, res, next) => {
    try {
      const { taskId } = req.params;
  
      console.log("Delete specific task started");
  
      // User token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
  
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
  
      // Find the index of the specific task by ID
      const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);
      if (taskIndex === -1) {
        return res.status(404).send("Task not found");
      }
  
      // Remove the task from the user's tasks array
      user.tasks.splice(taskIndex, 1);
  
      // Save the updated user document
      await user.save();
  
      console.log("Delete specific task done");
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };
  
  
  

export const createNewTask = async (req, res, next) => {
    try {
      console.log(req.body.type);
      const { title, description, deadline } = req.body;
  
      console.log("Create new task started");
  
      // User token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
  
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
  
      // Create a new task object
      const newTask = {
        title: title,
        description: description,
        deadline : deadline,
        completed: false
      };
  
      // Add the new task to the user's tasks array
      user.tasks.push(newTask);
  
      // Save the updated user document
      await user.save();
  
      console.log("Create new task done");
      return res.status(200).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };
  


export const marksdDone = async (req, res, next) => {
    try {
        const { taskId } = req.body;
    
        console.log("Mark task as done started");
    
        // User token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
        }
    
        if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
        }
    
        // Find the specific task by ID
        const task = user.tasks.find(task => task._id.toString() === taskId);
        if (!task) {
        return res.status(404).send("Task not found");
        }
    
        // Mark the task as done
        task.completed = true;
    
        // Save the updated user document
        await user.save();
    
        console.log("Mark task as done done");
        return res.status(200).json({ message: "Task marked as done successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
    }





// see all tasks

// delete a specific task

// create a new task

// update a specific task : mark as done


