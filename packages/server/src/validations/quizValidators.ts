import z from "zod";

export const quizCreationValidation = z.object({
    title: z.string().trim()
        .min(1, { error: "The title must contains at least 1 character" })
        .max(100, { error: "The title shouldn't have more than 100 characters" }),
    difficulty: z.string().trim()
        .min(1, { error: "The difficulty must contains at least 1 character" })
        .max(60, { error: "The difficulty shouldn't have more than 60 characters" })
})