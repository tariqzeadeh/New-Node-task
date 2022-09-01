import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};
export const generateRefreshToken = (user) => {
  try {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  } catch (e) {
    console.log(e);
  }
};
