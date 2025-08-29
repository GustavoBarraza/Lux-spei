import {Router} from "express"
import {getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute} from "../controller/routes.controller.js"

const routes = Router();


routes.get('/get', getAllRoutes);
routes.get('/get/:id',getRouteById);
routes.post('/post', createRoute);
routes.put('/put/:id',updateRoute);
routes.delete('/delete/:id',deleteRoute);

export default routes;
