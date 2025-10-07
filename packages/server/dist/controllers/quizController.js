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
exports.deleteQuiz = exports.updateQuiz = exports.addQuiz = exports.getQuiz = exports.getAllQuizs = void 0;
const models_1 = require("../models");
const apiResponse_1 = require("../utils/apiResponse");
const zod_1 = __importDefault(require("zod"));
const validations_1 = require("../validations");
const getAllQuizs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizs = yield models_1.quizModel.getAll();
        return (0, apiResponse_1.apiResponse)(res, quizs, "Quizs fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of every Quizs");
    }
});
exports.getAllQuizs = getAllQuizs;
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield models_1.quizModel.get(id);
        if (!quiz)
            return (0, apiResponse_1.apiResponse)(res, null, "Quiz not found", 404);
        return (0, apiResponse_1.apiResponse)(res, quiz, "Quiz fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the Quiz", 500);
    }
});
exports.getQuiz = getQuiz;
const addQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, difficulty } = validations_1.quizCreationValidation.parse(req.body);
        const { user } = res.locals;
        const [quiz] = yield models_1.quizModel.create({
            title,
            difficulty,
            authorId: user.id
        });
        return (0, apiResponse_1.apiResponse)(res, quiz, "Quiz was successfully created", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the creation of the Quizs", 500);
    }
});
exports.addQuiz = addQuiz;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, difficulty } = validations_1.quizCreationValidation.parse(req.body);
        const { user } = res.locals;
        yield models_1.quizModel.update(id, user.id, {
            title,
            difficulty,
            authorId: user.id
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Quiz was successfully updated", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the update of the Quizs", 500);
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = res.locals;
        yield models_1.quizModel.delete(id, user.id);
        return (0, apiResponse_1.apiResponse)(res, null, "Quiz was successfully deleted");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the deletion of the Quizs", 500);
    }
});
exports.deleteQuiz = deleteQuiz;
