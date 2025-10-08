import z from "zod";

export const noteCreationValidation = z.object({
    note: z.number()
})

export const noteUpdateValidation = z.object({
    note: z.number(),
    quizId: z.string().trim()
})