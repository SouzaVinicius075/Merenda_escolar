import express from "express";
import deliveryController from "../Controllers/deliveryController.js";
// import validateToken from '../middleware/validate-token.js'
const routes = express.Router();
routes
    .get('/', deliveryController.getDelivery)
    .post('/', deliveryController.registerDelivery)

export default routes