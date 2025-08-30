import {Router} from "express"
import {getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute} from "../controller/routes.controller.js"

const routes = Router()

routes.get('/routes', getAllRoutes);
routes.get('/routes/:id', getRouteById);
routes.post('/routes', createRoute);
routes.put('/routes/:id', updateRoute);
routes.delete('/routes/:id', deleteRoute);


export default routes;
