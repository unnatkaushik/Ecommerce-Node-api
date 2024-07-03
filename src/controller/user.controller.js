import ErrorHandler from "../utils/ErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.schema.js";
import { createActivationToken } from "../helpers/activationToken.js";
import { sendMail } from "../helpers/mailer.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are requiured", 400));
  }

  const { otpCode, activationToken } = createActivationToken(req.body);
  //const newUser = await User.create({ name, email, password, authCode });

  // if (!newUser) {
  //   return next(new ErrorHandler("Registration failed", 400));
  // }

  const data = { user: { name: req.body.name }, otpCode };
  await sendMail("unnat.shuban@gmail.com", "otp", "activationMail.ejs", data);
  return res.status(200).json(
    new ApiResponse(200, "Please check your email to activate your account", {
      user: activationToken,
    })
  );
});
