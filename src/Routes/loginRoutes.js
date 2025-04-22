import express from "express";
import loginController from "../Controllers/loginController.js";
// import validateToken from '../middleware/validate-token.js'
const routes = express.Router();

routes.post('/', loginController.login)

export default routes