import express from "express";
import userController from "../Controllers/userController.js";
const routes = express.Router();

routes
.post("/", userController.createUser)
.delete('/', userController.SwitchUserStatus)
.get('/', userController.getUser)
.patch('/', userController.updateUser)

export default routes;