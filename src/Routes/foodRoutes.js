import express from "express";
import foodController from "../Controllers/foodController.js";
import validateToken from '../middleware/validateToken.js'
const routes = express.Router();

validateToken.validate
routes.get('/', foodController.get)
//validateToken.isAdminUser()
routes
    .post('/', foodController.create)
    .patch('/', foodController.update)
    .delete('/', foodController.remove)

export default routes