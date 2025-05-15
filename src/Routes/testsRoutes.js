import express from "express";
import testController from "../Controllers/testController.js";
const routes = express.Router()

routes.get('/', testController.create)

export default routes