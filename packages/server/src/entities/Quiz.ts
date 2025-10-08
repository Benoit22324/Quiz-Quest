import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { quizs } from "../schemas";

export type Quiz = InferSelectModel<typeof quizs>;

export type NewQuiz = InferInsertModel<typeof quizs>;