import { object, union, string, email, iso, array } from "zod/v4";

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
  bio: string().trim(),
  skillsToLearn: array(object({ id: string(), name: string() }))
    .min(1, requiredMessage)
    .optional(),
  skillsToTeach: array(object({ id: string(), name: string() }))
    .min(1, requiredMessage)
    .optional(),
});
