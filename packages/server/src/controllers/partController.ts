import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { partModel } from "../models";
import z from "zod";
import { partCreationValidation, partUpdateValidation } from "../validations";

export const getPartsByQuiz = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;

        const parts = await partModel.getByQuiz(quizId);
        if (!parts) return apiResponse(res, null, "Quiz parts not found", 404);

        return apiResponse(res, parts, "Quiz parts fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the Quiz parts", 500);
    }
}

export const getQuizPart = async (req: Request, res: Response) => {
    try {
        const { id, index } = req.params;

        const part = await partModel.get(id, parseInt(index));
        if (!part) return apiResponse(res, null, "Quiz part not found", 404);

        return apiResponse(res, part, "Quiz part fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the Quiz Part", 500);
    }
}

export const addQuizPart = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { question, answers, correctAnswer, index } = partCreationValidation.parse(req.body);

        await partModel.create({
            question,
            answers,
            correctAnswer,
            quizIndex: index,
            quizId
        })

        return apiResponse(res, null, "Quiz part was created successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the creation of the Quiz Part", 500);
    }
}

export const updateQuizPart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { question, answers, correctAnswer, index, quizId } = partUpdateValidation.parse(req.body);

        await partModel.update(id, quizId, {
            question,
            answers,
            correctAnswer,
            quizIndex: index,
            quizId
        })

        return apiResponse(res, null, "Quiz part was updated successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the update of the Quiz Part", 500);
    }
}

export const deleteQuizPart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await partModel.delete(id);

        return apiResponse(res, null, "Quiz part was deleted successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the deletion of the Quiz Part", 500);
    }
}