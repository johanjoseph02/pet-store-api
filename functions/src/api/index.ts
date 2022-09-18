import {Router} from "express";
import newuserRoute from "./new-user/routes";

export default (): Router => {
  const app = Router();
    
  app.use("/newuser", newuserRoute);
  return app;
};