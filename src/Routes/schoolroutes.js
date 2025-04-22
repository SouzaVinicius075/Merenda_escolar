import express from "express";
import schoolController from "../Controllers/schoolController.js";
const routes = express.Router();

routes
.get('/', schoolController.getSchool)
.post('/', schoolController.createSchool)

export default routes