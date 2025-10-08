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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.addNote = exports.getNoteByQuizUser = exports.getNotesByQuiz = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const validations_1 = require("../validations");
const zod_1 = __importDefault(require("zod"));
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
        const { quizId } = req.params;
        const { user } = res.locals;
        const note = yield models_1.noteModel.getByUserAndQuiz(quizId, user.id);
        if (!note)
            return (0, apiResponse_1.apiResponse)(res, null, "Note not found", 404);
        return (0, apiResponse_1.apiResponse)(res, note, "User Note fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the User Note", 500);
    }
});
exports.getNoteByQuizUser = getNoteByQuizUser;
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId } = req.params;
        const { note } = validations_1.noteCreationValidation.parse(req.body);
        const { user } = res.locals;
        yield models_1.noteModel.create({
            note,
            userId: user.id,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Note was created successfully", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the creation of the Note", 500);
    }
});
exports.addNote = addNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { note, quizId } = validations_1.noteUpdateValidation.parse(req.body);
        const { user } = res.locals;
        yield models_1.noteModel.update(id, user.id, {
            note,
            userId: user.id,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Note was updated successfully", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the update of the Note", 500);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield models_1.noteModel.delete(id);
        return (0, apiResponse_1.apiResponse)(res, null, "Note was deleted successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the deletion of the Note", 500);
    }
});
exports.deleteNote = deleteNote;
