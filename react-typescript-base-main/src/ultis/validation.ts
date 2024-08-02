import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6).max(200),
  price: z.number().min(0),
  description: z.string().optional(),
});
export const categorySchema = z.object({
  title: z.string().min(6).max(200),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(255),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(255),
  confirmPass: z.string().min(5).max(255),
});
