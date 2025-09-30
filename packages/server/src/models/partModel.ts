import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { parts } from "../schemas";
import { NewPart } from "../entities";

export const partModel = {
    getByQuiz: (id: string) => {
        try {
            return db.query.parts.findMany({
                where: eq(parts.quizId, id),
                columns: {
                    id: true,
                    question: true,
                    quizIndex: true
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of every Quiz Parts: ${err.message}`);
            return []
        }
    },

    get: (id: string, index: number) => {
        try {
            return db.query.parts.findFirst({
                where: and(
                    eq(parts.quizIndex, index),
                    eq(parts.quizId, id)
                ),
                columns: {
                    id: true,
                    question: true,
                    answers: true,
                    correctAnswer: true
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be fetched");
        }
    },

    create: (part: NewPart) => {
        try {
            return db.insert(parts).values(part)
        } catch(err: any) {
            console.error(`Error during the insert of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be created");
        }
    },

    update: (id: string, quizId: string, part: NewPart) => {
        try {
            return db.update(parts).set(part).where(
                and(
                    eq(parts.id, id),
                    eq(parts.quizId, quizId)
                )
            )
        } catch(err: any) {
            console.error(`Error during the update of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be updated");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(parts).where(
                eq(parts.id, id)
            )
        } catch(err: any) {
            console.error(`Error during the deletion of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be deleted");
        }
    }
}