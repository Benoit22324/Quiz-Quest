import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { commentModel } from "../models";
import z from "zod";
import { commentCreationValidation, commentUpdateValidation } from "../validations";

export const getCommentsByQuiz = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;

        const comments = await commentModel.getByQuiz(quizId);
        if (!comments) return apiResponse(res, null, "Quiz comments not found", 404);

        return apiResponse(res, comments, "Quiz comments fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of every Quiz comments", 500);
    }
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { content } = commentCreationValidation.parse(req.body);
        const { user } = res.locals;

        await commentModel.create({
            content,
            authorId: user.id,
            quizId
        })

        return apiResponse(res, null, "Comment was created successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the creation of the Comment", 500);
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content, quizId } = commentUpdateValidation.parse(req.body);
        const { user } = res.locals;

        await commentModel.update(id, user.id, {
            content,
            authorId: user.id,
            quizId
        })

        return apiResponse(res, null, "Comment was updated successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the update of the Comment", 500);
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await commentModel.delete(id);

        return apiResponse(res, null, "Comment was deleted successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the deletion of the Comment", 500);
    }
}