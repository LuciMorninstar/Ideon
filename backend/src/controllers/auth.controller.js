import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../utils/redis.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
  );

  return { accessToken, refreshToken };
};

const storedRefreshTokenInRedis = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  );
};

const storeTokensInCookie = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.ENV_MODE === "production",
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.ENV_MODE === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      return next(err);
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const err = new Error("User with this email already exists!");
      err.statusCode = 400;
      return next(err);
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    newUser.password = undefined;

    const { accessToken, refreshToken } = await generateTokens(newUser._id);

    await storedRefreshTokenInRedis(newUser._id, refreshToken);

    storeTokensInCookie(res, accessToken, refreshToken);

    return res.status(201).json({
      success: true,
      messasge: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(`Error in the signUp controller`, error.message);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      return next(err);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const err = new Error("User with this email does not exist!");
      err.statusCode = 400;
      return next(err);
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
      const err = new Error("Invalid Credentials");
      err.statusCode = 400;
      return next(err);
    }

    const { accessToken, refreshToken } = await generateTokens(
      existingUser._id,
    );

    await storedRefreshTokenInRedis(existingUser._id, refreshToken);
    storeTokensInCookie(res, accessToken, refreshToken);

    existingUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      user: existingUser,
    });
  } catch (error) {
    console.log(`Error in the signIn controller ${error.message}`);
    return next(err);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET,
        );

        await redis.del(`refreshToken:${decoded.userId}`);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Refresh Token Expired");
        } else if (err.name === "JsonWebTokenError") {
          console.log("Invalid Refresh Token");
        } else {
          console.log("JWT error ", err.message);
        }
      }
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(`Error in the signOut controller: ${error.message}`);
    return next(error);
  }
};
