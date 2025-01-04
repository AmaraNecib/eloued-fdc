import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    bio: z.optional(z.string().max(300)),
    studentId: z
      .string({
        required_error: "Your student ID is required",
      })
      .regex(
        /^([1-2][0-9])\1[0-9]{8}$/,
        "Invalid student ID format. It should be like '212139078211' (no spaces).",
      ),
    userName: z.optional(z.string()),
    faculty: z.optional(z.string()),
    birthday: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "The minimum required number of characters is 6",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  studentId: z
    .string({
      required_error: "Your student ID is required",
    })
    .regex(
      /^([1-2][0-9])\1[0-9]{8}$/,
      "Invalid student ID format. It should be like '212139078211' (no spaces).",
    ),
  password: z.string().min(6, {
    message: "The minimum required number of characters is 6",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const UpdateUserSchema = z.object({
  name: z.optional(z.string()),
  role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.OWNER]),
});

export const ContactFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(2).max(500),
});

export const EventSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(500),
  imageUrl: z.string().url(),
  status: z.string().min(2).max(20),
  location: z.string().min(2).max(100),
  startDate: z.date(),
  endDate: z.date(),
});
