import {Router} from "express";

const userRoute = Router();

import userController from "../controller/userController.js";

// GET
userRoute.get('/users',userController.getAll);
userRoute.get('/users/:id',userController.getById);
userRoute.get('/search',userController.search)

//POST
userRoute.post('/user',userController.add);

//PUT
userRoute.put('/users/:id',userController.update);

//DELETE
userRoute.delete('/users/:id',userController.delete);


export default userRoute;