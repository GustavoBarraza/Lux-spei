import {Router} from "express"
import {getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute} from "../controller/routes.controller.js"

<<<<<<< HEAD
const routes = Router();


routes.get('/get', getAllRoutes);
routes.get('/get/:id',getRouteById);
routes.post('/post', createRoute);
routes.put('/put/:id',updateRoute);
routes.delete('/delete/:id',deleteRoute);

export default routes;
=======
const routes = Router()


routes.get('/get', getAllRoutes);
routes.get('/get:id',getRouteById);
routes.post('/post', createRoute);
routes.put('/put:id',updateRoute);
routes.delete('/delete:id',deleteRoute);

export default routes;
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478
