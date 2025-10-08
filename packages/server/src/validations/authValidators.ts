import z from "zod";

export const authLoginValidation = z.object({
    email: z.string().trim()
        .email({ error: "Invalid Email" }),
    password: z.string().trim()
        .min(8, { error: "The password must contains at least 8 characters" })
        .regex(/[0-9]/, { error: "The password must contains at least 1 number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { error: "The password must contains at least 1 special character" })
})

export const authRegisterValidation = z.object({
    username: z.string().trim()
        .min(1, { error: "The username must contains at least 1 character" }),
    email: z.string().trim()
        .email({ error: "Invalid Email" }),
    password: z.string().trim()
        .min(8, { error: "The password must contains at least 8 characters" })
        .regex(/[0-9]/, { error: "The password must contains at least 1 number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { error: "The password must contains at least 1 special character" })
})