import express from "express";
import orderController from "../Controllers/orderController.js";
import validateToken from "../middleware/validateToken.js";
const routes = express.Router();


//routes.use(validateToken.validate)
routes
    .get('/', orderController.getOrders)
    .post('/', orderController.createOrder)

export default routes