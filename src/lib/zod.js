import { object, string, email, union } from "zod/v4";

const requiredMessage = "- This field is required";
const invalidEmail = "- Invalid email address";

export const signInSchema = object({
  username: union([
    string().min(1, requiredMessage).trim(),
    email(invalidEmail).min(1, requiredMessage).trim(),
  ]),
  password: string().min(1, requiredMessage).trim(),
});

export const signUpSchema = object({
  email: email(invalidEmail).min(1, requiredMessage).trim(),
  password: string()
    .min(1, requiredMessage)
    .min(8, "- Must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "- Must contain at least 1 letter")
    .regex(/[0-9]/, "- Must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "- Must contain at least 1 special character")
    .trim(),
});
