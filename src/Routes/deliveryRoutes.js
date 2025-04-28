import express from "express";
import deliveryController from "../Controllers/deliveryController.js";
 import validateToken from '../middleware/validateToken.js'
const routes = express.Router();
routes.use(validateToken.validate)
routes
    .get('/', deliveryController.getDelivery)
    .post('/', deliveryController.registerDelivery)

export default routes