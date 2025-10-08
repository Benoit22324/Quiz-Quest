import z from "zod";

export const userCreationValidation = z.object({
    username: z.string().trim()
        .min(3, { error: "The username must contains 3 characters" }),
    email: z.string().trim()
        .email({ error: "Invalid Email" }),
    password: z.string().trim()
        .min(8, { error: "The password must contains at least 8 characters" })
        .regex(/[0-9]/, { error: "The password must contains at least 1 number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { error: "The password must contains at least 1 special character" })
})