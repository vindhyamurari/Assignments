import express, { request } from "express";
import UserController from "../controllers/userController";

const UserRoute = () => {
  let userRouter = express.Router();
  const userController=new UserController()

  userRouter.post("/register", (request, response) => {
    userController.registerUser(request, response);
  });

  userRouter.post("/login", (request, response) => {
    userController.loginUser(request, response);
  });

  userRouter.patch("/bookmark/imdbID/:imdbID",userController.isAuthorized,(request, response) => {
    userController.bookMarkMovie(request, response);
  });


  return userRouter;
};

export default UserRoute;