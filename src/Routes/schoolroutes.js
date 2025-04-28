import express from "express";
import schoolController from "../Controllers/schoolController.js";
import validateToken from "../middleware/validateToken.js";
const routes = express.Router();
routes.use(validateToken.validate)
routes
.get('/', schoolController.getSchool)
.post('/', schoolController.createSchool)
.get('/dashboard', schoolController.schoolDashboard)

export default routes