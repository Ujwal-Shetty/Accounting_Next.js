import { z } from "zod"

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")

export const SignUpSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export const CreateCompanySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    gstNumber: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    financialYearStart: z.number().int().min(1).max(12).default(4),
})

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export const ResetPasswordSchema = z
    .object({
        token: z.string().min(1, "Reset token is required"),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const ChangePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: passwordSchema,
        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password must be different from current password",
        path: ["newPassword"],
    })

export const InviteUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["OWNER", "ADMIN", "ACCOUNTANT", "STAFF"]),
    companyId: z.string().uuid("Invalid company ID"),
})

export const AcceptInviteSchema = z
    .object({
        token: z.string().min(1, "Invitation token is required"),
        name: z.string().min(2, "Name must be at least 2 characters"),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

// Inferred TypeScript types for use in server actions and components
export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>
export type InviteUserInput = z.infer<typeof InviteUserSchema>
export type AcceptInviteInput = z.infer<typeof AcceptInviteSchema>