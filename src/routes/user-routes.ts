import { Router } from "express";

import { ControllerUser } from "@/controller/user-controller";

const routerUser = Router();
const controllerUser = new ControllerUser();

routerUser.get("/", controllerUser.index);
routerUser.post("/", controllerUser.criaUser);
routerUser.get("/:id", controllerUser.pegaUserPorId);
routerUser.put("/:id", controllerUser.editaUser);
routerUser.delete("/:id", controllerUser.deletaUser);

export { routerUser };
