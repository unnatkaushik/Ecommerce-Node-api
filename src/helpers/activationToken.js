import jwt from "jsonwebtoken";

const createActivationToken = (email) => {
  const otpCode = Math.floor(1000 + Math.random() * 9999).toString();
  const activationToken = jwt.sign({ email, otpCode }, process.env.OTP_SECRET, {
    expiresIn: "1d",
  });
  return { activationToken, otpCode };
};

export { createActivationToken };
