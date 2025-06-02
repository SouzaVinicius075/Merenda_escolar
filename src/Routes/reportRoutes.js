import express from "express";
import validateToken from "../middleware/validateToken.js";
import reportController from "../Controllers/reportController.js";
const routes = express.Router();


routes.use(validateToken.validate)
routes
    .post('/general', reportController.getTotalGeneral)
    .post('/detailed', reportController.getDetailed)


export default routes