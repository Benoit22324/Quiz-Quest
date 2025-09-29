import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { parts } from "../schemas";

export type Part = InferSelectModel<typeof parts>;

export type NewPart = InferInsertModel<typeof parts>;