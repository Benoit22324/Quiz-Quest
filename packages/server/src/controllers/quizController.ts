import { Request, Response } from "express";
import { quizModel } from "../models";
import { apiResponse } from "../utils/apiResponse";
import z from "zod";
import { quizCreationValidation } from "../validations";

export const getAllQuizs = async (req: Request, res: Response) => {
    try {
        const quizs = await quizModel.getAll();

        return apiResponse(res, quizs, "Quizs fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of every Quizs");
    }
}

export const getQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const quiz = await quizModel.get(id);
        if (!quiz) return apiResponse(res, null, "Quiz not found", 404);

        return apiResponse(res, quiz, "Quiz fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the Quiz", 500);
    }
}

export const addQuiz = async (req: Request, res: Response) => {
    try {
        const { title, difficulty } = quizCreationValidation.parse(req.body);
        const { user } = res.locals;

        const [quiz] = await quizModel.create({
            title,
            difficulty,
            authorId: user.id
        })

        return apiResponse(res, quiz, "Quiz was successfully created", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the creation of the Quizs", 500);
    }
}

export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, difficulty } = quizCreationValidation.parse(req.body);
        const { user } = res.locals;

        await quizModel.update(id, user.id, {
            title,
            difficulty,
            authorId: user.id
        })

        return apiResponse(res, null, "Quiz was successfully updated", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the update of the Quizs", 500);
    }
}

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;

        await quizModel.delete(id, user.id);

        return apiResponse(res, null, "Quiz was successfully deleted");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the deletion of the Quizs", 500);
    }
}