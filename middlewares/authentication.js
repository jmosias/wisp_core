import jwt from "jsonwebtoken";
import { throwUnauthenticatedError } from "./errorHandling.js";

export const authenticate = async (request, response, next) => {
  try {
    const tokenCookie = request.cookies["jwt"];
    if (!tokenCookie) {
      throwUnauthenticatedError();
    }

    const claims = jwt.verify(tokenCookie, process.env.SECRET_TOKEN);
    if (!claims) {
      throwUnauthenticatedError();
    }

    request.user = claims;
    next();
  } catch (error) {
    next(error);
  }
};
