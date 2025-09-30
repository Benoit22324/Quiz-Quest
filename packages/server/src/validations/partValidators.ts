import z from "zod";

export const partCreationValidation = z.object({
    question: z.string().trim()
        .min(1, { error: "The question must contains at least 1 character" }),
    answers: z.string().trim()
        .min(4, { error: "The answers must contains at least 4 characters" }),
    correctAnswer: z.string().trim()
        .min(1, { error: "The correct answer must contains at least 1 character" }),
    index: z.number()
})

export const partUpdateValidation = z.object({
    question: z.string().trim()
        .min(1, { error: "The question must contains at least 1 character" }),
    answers: z.string().trim()
        .min(4, { error: "The answers must contains at least 4 characters" }),
    correctAnswer: z.string().trim()
        .min(1, { error: "The correct answer must contains at least 1 character" }),
    index: z.number(),
    quizId: z.string().trim()
})