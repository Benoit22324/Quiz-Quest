import z from "zod";

export const commentCreationValidation = z.object({
    content: z.string().trim()
        .min(1, { error: "The content must contains at least 1 character" })
})

export const commentUpdateValidation = z.object({
    content: z.string().trim()
        .min(1, { error: "The content must contains at least 1 character" }),
    quizId: z.string().trim()
})