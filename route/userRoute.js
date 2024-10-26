import express from 'express';
import { loginUser,registerUser } from "../Controller/UserController.js";
const userRouter=express.Router();
userRouter.post('/adduser',registerUser);
userRouter.post('/getuser',loginUser);
export default userRouter;
