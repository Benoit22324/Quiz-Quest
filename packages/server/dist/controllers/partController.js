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
exports.deleteQuizPart = exports.updateQuizPart = exports.addQuizPart = exports.getQuizPart = exports.getPartsByQuiz = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const zod_1 = __importDefault(require("zod"));
const validations_1 = require("../validations");
const getPartsByQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId } = req.params;
        const parts = yield models_1.partModel.getByQuiz(quizId);
        if (!parts)
            return (0, apiResponse_1.apiResponse)(res, null, "Quiz parts not found", 404);
        return (0, apiResponse_1.apiResponse)(res, parts, "Quiz parts fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the Quiz parts", 500);
    }
});
exports.getPartsByQuiz = getPartsByQuiz;
const getQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, index } = req.params;
        const part = yield models_1.partModel.get(id, parseInt(index));
        if (!part)
            return (0, apiResponse_1.apiResponse)(res, null, "Quiz part not found", 404);
        return (0, apiResponse_1.apiResponse)(res, part, "Quiz part fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the Quiz Part", 500);
    }
});
exports.getQuizPart = getQuizPart;
const addQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId } = req.params;
        const { question, answers, correctAnswer, index } = validations_1.partCreationValidation.parse(req.body);
        yield models_1.partModel.create({
            question,
            answers,
            correctAnswer,
            quizIndex: index,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Quiz part was created successfully", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the creation of the Quiz Part", 500);
    }
});
exports.addQuizPart = addQuizPart;
const updateQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { question, answers, correctAnswer, index, quizId } = validations_1.partUpdateValidation.parse(req.body);
        yield models_1.partModel.update(id, quizId, {
            question,
            answers,
            correctAnswer,
            quizIndex: index,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Quiz part was updated successfully", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the update of the Quiz Part", 500);
    }
});
exports.updateQuizPart = updateQuizPart;
const deleteQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield models_1.partModel.delete(id);
        return (0, apiResponse_1.apiResponse)(res, null, "Quiz part was deleted successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the deletion of the Quiz Part", 500);
    }
});
exports.deleteQuizPart = deleteQuizPart;
