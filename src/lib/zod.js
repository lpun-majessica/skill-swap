import { object, string, email, date } from "zod/v4";

const requiredMessage = "- This field is required";
const invalidEmail = "- Invalid email address";
const invalidDate = "- Invalid date";

export const signInSchema = object({
  email: email(invalidEmail).min(1, requiredMessage).trim(),
});

export const updateUserSchema = object({
  username: string().min(1, requiredMessage).trim(),
  job: string().trim(),
  fullname: string().min(1, requiredMessage).max(50, "- Name too long"),
  dob: date(invalidDate)
    .min(new Date("1900-01-01"), { error: "- Too old!" })
    .max(new Date(), { error: "Too young!" })
    .optional(),
  bio: string().optional(),
});
