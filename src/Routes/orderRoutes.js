import express from "express";
import orderController from "../Controllers/orderController.js";
import validateToken from "../middleware/validateToken.js";
const routes = express.Router();


routes.use(validateToken.validate)
routes
    .get('/', orderController.getOrders)
    .get('/:status', orderController.getOrders);

routes.use(validateToken.avaliableTime)
routes
    .post('/', orderController.createOrder)
    .patch('/', orderController.updateOrder)

export default routes