import express, { json } from "express";
import { router } from "./routes";
import { MiddlewareUser } from "./middleware";

const app = express();
app.use(json());
app.use(MiddlewareUser.validateEditTask);
app.use(MiddlewareUser.validadeUser);
app.use(router);

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
