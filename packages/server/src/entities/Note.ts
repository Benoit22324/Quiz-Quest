import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { notes } from "../schemas";

export type Note = InferSelectModel<typeof notes>;

export type NewNote = InferInsertModel<typeof notes>;