import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const SignUpSchema = z.object({
  firstName: z.string().min(2, {
    message: "FirstName must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  cpassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters.",
  }),
});
export const OTPFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export const EmailSchema = z.object({
  email: z.string().email(),
});
export const ForgetSchema = z.object({
  password: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters.",
  }),
});

export const EmailConfirmSchema = z.object({
  email: z.string().email(),
});

export const ResetPassSchema = z.object({
  currentpass: z.string().min(6, {
    message: "Current Password must be at least 6 characters.",
  }),

  newpass: z.string().min(6, {
    message: "New Password must be at least 6 characters.",
  }),
  retypepass: z.string().min(6, {
    message: "Retyped Password must be at least 6 characters.",
  }),
});
export const welcomeSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  gender: z.enum(["Male", "Female", "Non_Binary", "Not Specified"], {
    errorMap: () => ({
      message: "Gender must be one of Male, Female, or Not Specified.",
    }),
  }),
  university: z.string().min(1, {
    message: "University must be at least 2 characters.",
  }),
  enrollDate: z.string().min(2, {
    message: "Enroll Date must be at least 2 characters.",
  }),
  graduationDate: z.string().min(2, {
    message: "Graduation Date must be at least 2 characters.",
  }),
  department_id: z.number().min(1)
});

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().default(""),

  gender: z.string().min(2, {
    message: "Gender must be Selected",
  }),
  ethics: z.string().min(2, {
    message: "Ethics must be Selected",
  }),
  religion: z.string().min(2, {
    message: "Religion must be Selected",
  }),
  university: z.string().min(2, {
    message: "University must be Selected",
  }),
  currentLocation: z.string().min(2, {
    message: "Current Location must be at least 2 characters.",
  }),
  yearOfEntry: z.number().min(2, {
    message: "Year of Entry must be at least 2 characters.",
  }),
  yearOfGraduation: z.number().min(2, {
    message: "Graduation Date must be at least 2 characters.",
  }),
  bio: z.string().min(2, {
    message: "Bio must be at least 2 characters.",
  }),
});

export const settingSchema = z.object({
  fullname: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "University must be at least 2 characters.",
  }),
  emailNotification: z.boolean().default(false).optional(),
  phoneNotification: z.boolean().default(false).optional()
});
