import express from "express";
import userController from "../Controllers/userController.js";
// import validateToken from '../middleware/validate-token.js'
const routes = express.Router();

routes
.post("/", userController.createUser)
.patch('/',userController.inactiveUser)
;

//routes.use(validateToken.validate)
/*routes
    .patch("/", userController.updateUser)
    .delete("/", userController.deleteUser)
*/

export default routes;