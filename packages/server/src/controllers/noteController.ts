import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { noteModel } from "../models";
import { noteCreationValidation, noteUpdateValidation } from "../validations";
import z from "zod";

export const getNotesByQuiz = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;

        const notes = await noteModel.getByQuiz(quizId);
        if (!notes) return apiResponse(res, null, "Notes not found", 404);

        return apiResponse(res, notes, "Quiz Notes fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the Quiz Notes", 500);
    }
}

export const getNoteByQuizUser = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { user } = res.locals;

        const note = await noteModel.getByUserAndQuiz(quizId, user.id);
        if (!note) return apiResponse(res, null, "Note not found", 404);

        return apiResponse(res, note, "User Note fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the User Note", 500);
    }
}

export const addNote = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { note } = noteCreationValidation.parse(req.body);
        const { user } = res.locals;

        await noteModel.create({
            note,
            userId: user.id,
            quizId
        })

        return apiResponse(res, null, "Note was created successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the creation of the Note", 500);
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { note, quizId } = noteUpdateValidation.parse(req.body);
        const { user } = res.locals;

        await noteModel.update(id, user.id, {
            note,
            userId: user.id,
            quizId
        })

        return apiResponse(res, null, "Note was updated successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the update of the Note", 500);
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await noteModel.delete(id);

        return apiResponse(res, null, "Note was deleted successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the deletion of the Note", 500);
    }
}