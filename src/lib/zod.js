import { object, string, email, union } from "zod/v4";

const requiredMessage = "- This field is required";
const invalidEmail = "- Invalid email address";
const unmatchedPasswords = "- Passwords don't match";

export const signInSchema = object({
  username: union([
    string().min(1, requiredMessage).trim(),
    email(invalidEmail).min(1, requiredMessage).trim(),
  ]),
  password: string().min(1, requiredMessage).trim(),
});

export const signUpSchema = object({
  email: email(invalidEmail).min(1, requiredMessage).trim(),
  username: string().min(1, requiredMessage).trim(),
  password: string()
    .min(1, requiredMessage)
    .min(8, "- Must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "- Must contain at least 1 letter")
    .regex(/[0-9]/, "- Must contain at least 1 number")
    .trim(),
  confirmPassword: string().min(1, requiredMessage),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: unmatchedPasswords,
  path: ["confirmPassword"],
});
