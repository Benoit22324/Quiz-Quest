"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partUpdateValidation = exports.partCreationValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.partCreationValidation = zod_1.default.object({
    question: zod_1.default.string().trim()
        .min(1, { error: "The question must contains at least 1 character" }),
    answers: zod_1.default.string().trim()
        .min(4, { error: "The answers must contains at least 4 characters" }),
    correctAnswer: zod_1.default.string().trim()
        .min(1, { error: "The correct answer must contains at least 1 character" }),
    index: zod_1.default.number()
});
exports.partUpdateValidation = zod_1.default.object({
    question: zod_1.default.string().trim()
        .min(1, { error: "The question must contains at least 1 character" }),
    answers: zod_1.default.string().trim()
        .min(4, { error: "The answers must contains at least 4 characters" }),
    correctAnswer: zod_1.default.string().trim()
        .min(1, { error: "The correct answer must contains at least 1 character" }),
    index: zod_1.default.number(),
    quizId: zod_1.default.string().trim()
});
