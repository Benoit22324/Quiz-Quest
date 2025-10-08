import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { runs } from "../schemas";

export type Run = InferSelectModel<typeof runs>;

export type NewRun = InferInsertModel<typeof runs>;