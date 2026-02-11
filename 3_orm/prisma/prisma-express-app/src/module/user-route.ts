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

// update user by id
userRouter.put("/user/:id", asyncHandler(async (req: Request, res: Response) => {

  const id = req.params.id

 const user = await prisma.user.update({
   where: {
     id: Number(id)
   },
   data: {
     name: "Luna Lovegood",
     age: 20,
     isMarried: true,
     nationality: "Irish",
     email: "luna@hogwarts"
   }
 })

 res.status(StatusCodes.OK).json({
   success: true,
   message: "User updated successfully",
   data: user
 })
}))


export default userRouter