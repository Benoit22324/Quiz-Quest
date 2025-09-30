"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteByQuizUser = exports.getNotesByQuiz = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const getNotesByQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId } = req.params;
        const notes = yield models_1.noteModel.getByQuiz(quizId);
        if (!notes)
            return (0, apiResponse_1.apiResponse)(res, null, "Notes not found", 404);
        return (0, apiResponse_1.apiResponse)(res, notes, "Quiz Notes fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the Quiz Notes", 500);
    }
});
exports.getNotesByQuiz = getNotesByQuiz;
const getNoteByQuizUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId, userId } = req.params;
        const note = yield models_1.noteModel.getByUserAndQuiz(quizId, userId);
        if (!note)
            return (0, apiResponse_1.apiResponse)(res, null, "Note not found", 404);
        return (0, apiResponse_1.apiResponse)(res, note, "User Note fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the User Note", 500);
    }
});
exports.getNoteByQuizUser = getNoteByQuizUser;
