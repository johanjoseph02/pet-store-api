import {Router} from "express";
import newuserRoute from "./new-user/routes";
import searchuserRoute from "./search-user/routes";
import showusersRoute from "./show-users/routes";
import updateuserRoute from "./update-user/routes";

export default (): Router => {
  const app = Router();
    
  app.use("/newuser", newuserRoute);
  app.use("/search", searchuserRoute);
  app.use("/showall", showusersRoute);
  app.use("/update", updateuserRoute);
  return app;
};