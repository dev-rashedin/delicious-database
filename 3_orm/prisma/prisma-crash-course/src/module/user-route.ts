import prisma from "@/utils/prisma-client";
import { Request, Response } from "express";
import { asyncHandler } from "express-error-toolkit";
import { StatusCodes } from "http-status-toolkit";

const express = require('express');
const userRouter = express.Router();

// get all users
userRouter.get("/users", asyncHandler(async (_req: Request, res: Response) => {
 const users = await prisma.user.findMany()

 res.status(StatusCodes.OK).json({
   success: true,
   message: "Users fetched successfully",
   data: users
 })
}))

// get user by id
userRouter.get("/user/:id", asyncHandler(async (_req: Request, res: Response) => {
 const user = await prisma.user.findUnique({
   where: {
     id: 4
   }
 })

 res.status(StatusCodes.OK).json({
   success: true,
   message: "User fetched successfully",
   data: user
 })
}))


export default userRouter