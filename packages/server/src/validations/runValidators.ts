import z from "zod";

export const runCreationValidation = z.object({
    result: z.number()
})