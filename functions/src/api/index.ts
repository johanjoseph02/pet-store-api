import {Router} from "express";
import newuserRoute from "./new-user/routes";
import searchuserRoute from "./search-user/routes";

export default (): Router => {
  const app = Router();
    
  app.use("/newuser", newuserRoute);
  app.use("/search", searchuserRoute);
  return app;
};