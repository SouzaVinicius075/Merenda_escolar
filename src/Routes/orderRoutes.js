import express from "express";
import orderController from "../Controllers/orderController.js";
const routes = express.Router();

routes
    .get('/', orderController.getOrders)
    .post('/', orderController.createOrder)

export default routes