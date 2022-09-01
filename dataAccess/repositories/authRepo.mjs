import jwt from "jsonwebtoken";
import { refreshTokenModel } from "../models";
import { usersRepo } from "./usersRepo.mjs";
import {
  hashPassword,
  generateAccessToken,
  validatePassword,
  generateRefreshToken,
  generateError,
} from "../../helpers";

export const authRepo = {
  SignUp: async (name, email, password, confirmPassword, role) => {
    if (password !== confirmPassword)
      generateError(400, "ConfirmPassword Not Matching The Password");

    const hashedPassword = await hashPassword(password);
    const result = await usersRepo.create(name, email, hashedPassword, role);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    await refreshTokenModel.create({ refreshToken: refreshToken });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: result,
    };
  },

  SignIn: async (email, password) => {
    const user = await usersRepo.getByEmail(email);
    if (!user) return generateError(404, "User Not Found, Check Your Email");
    if (!(await validatePassword(password, user.password)))
      return generateError(403, "Wrong Password");

    const loggedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(loggedUser);
    const refreshToken = generateRefreshToken(loggedUser);
    await refreshTokenModel.create({ refreshToken: refreshToken });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: loggedUser,
    };
  },

  refreshToken: async (token) => {
    const refreshToken = await refreshTokenModel.findOne({
      where: { refreshToken: token },
    });

    if (!refreshToken) return generateError(401, "Unauthorized");

    const result = await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return generateError(404, "Unauthorized, User Not Found");
        const currentUser = await usersRepo.get(user.id); // Getting the user data from database incase of updated information OR the user is deleted from the database.
        if (currentUser)
          return { token: generateAccessToken(currentUser.dataValues) };
        else return generateError(401, "Unauthorized");
      }
    );

    return result;
  },

  deleteRefreshToken: async (token) => {
    const refreshToken = await refreshTokenModel.findOne({
      where: { refreshToken: token },
    });

    if (refreshToken) await refreshToken.destroy();

    return {
      message: `User has been successfully Logged Out`,
    };
  },
};
