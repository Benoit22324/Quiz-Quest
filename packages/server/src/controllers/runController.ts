import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { runModel } from "../models";
import { runCreationValidation } from "../validations";
import z from "zod";

export const getRunsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const runs = await runModel.getByUser(userId);
        if (!runs) return apiResponse(res, null, "User runs not found", 404);

        return apiResponse(res, runs, "User runs fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the User runs", 500);
    }
}

export const addRun = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { result } = runCreationValidation.parse(req.body);
        const { user } = res.locals;

        await runModel.create({
            result,
            userId: user.id,
            quizId
        })

        return apiResponse(res, null, "User run was created successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the creation of the User run", 500);
    }
}

export const deleteRun = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await runModel.delete(id);

        return apiResponse(res, null, "User run was deleted successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the deletion of the User run", 500);
    }
}