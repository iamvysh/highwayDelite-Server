import express from "express";
import User from "../Model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Helpers/sendMail";
import Otp from "../Model/otpSchema";

export const RegisterUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { firstName, lastName, password, contactMode, email } = req.body;
  const user = await User.findOne({ email: email, isVerified: false });
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  const date = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!user) {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      contactMode: contactMode,
      email: email,
    });
    await newUser.save();

    const otpModel = new Otp({ email: email, otp: otpCode, expireAt: date });
    await otpModel.save();

    await sendEmail(email, otpCode, firstName);

    return res.status(201).json({
      message: "please check your mail for  OTP",
      data:email
    });
  }

  const otpModel = new Otp({ email: email, otp: otpCode, expireAt: date });
  await otpModel.save();
  await sendEmail(user.email, otpCode, user.firstName ?? "");

  return res.status(201).json({
    message:
      "account has already registered,please check your email for login otp",
  });
};

export const verifyUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, otpCode } = req.body;

  console.log(email,otpCode);
  

  const otp = await Otp.findOne({ email: email, otp: otpCode });
  if (!otp) {
    res.status(403).json({
      message: "incorrect otp",
    });
  }
  const user = await User.findOneAndUpdate(
    { email: email },
    { $set: { isVerified: true } },
    { new: true }
  );

  if (user) {
    return res.status(200).json({
      message: "otp validation success",
    });
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body;

  

  const user = await User.findOne({ email, isVerified: true });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.email || !user.password) {
    return res
      .status(500)
      .json({ message: "Internal server error (missing user data)" });
  }

  const comparePassword = await bcrypt.compare(password, user?.password);

  if (!comparePassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const secret = process.env.SECRET_KEY_USER || "";
  const token = jwt.sign({ userId: user.email }, secret, { expiresIn: "72h" });

  return res.status(200).json({
    message: "Login successful",
    data: token,
  });
};
