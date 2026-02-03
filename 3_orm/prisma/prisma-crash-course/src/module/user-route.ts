import prisma from "@/utils/prisma-client";
import { Request, Response } from "express";
import { asyncHandler } from "express-error-toolkit";
import { StatusCodes } from "http-status-toolkit";

const express = require('express');
const userRouter = express.Router();

// get all users
userRouter.get("/users", asyncHandler(async (_req: Request, res: Response) => {
 const users = await prisma.user.findMany()

 if(!users.length) {
    res.status(StatusCodes.NOT_FOUND).json({
     success: false,
     message: "No users found",
     data: []
   })
 }

 res.status(StatusCodes.OK).json({
   success: true,
   message: "Users fetched successfully !!!",
   data: users
 })
}))

// get married user
userRouter.get("/married-users", asyncHandler(async (_req: Request, res: Response) => {
 const users = await prisma.user.findMany({
   where: {
     OR : [
       {
         isMarried: true
       },
       {
        age: {
          gte: 18
        }
       }
     ]
   }
 })

 if(!users.length) {
    res.status(StatusCodes.NOT_FOUND).json({
     success: false,
     message: "No married users found",
     data: []
   })
 }

 res.status(StatusCodes.OK).json({
   success: true,
   message: "Users fetched successfully",
   data: users
 })
}))




export default userRouter