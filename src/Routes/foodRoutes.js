import express from "express";
import foodController from "../Controllers/foodController.js";
 import validateToken from '../middleware/validateToken.js'
const routes = express.Router();

routes
    .get('/', foodController.get)
    .post('/', foodController.create)

export default routes