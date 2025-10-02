import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { quizs } from "../schemas";
import { NewQuiz } from "../entities";

export const quizModel = {
    getAll: () => {
        try {
            return db.query.quizs.findMany({
                columns: {
                    id: true,
                    title: true,
                    difficulty: true,
                    createdAt: true
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    notes: {
                        columns: {
                            id: true,
                            note: true
                        }
                    }
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of every Quizs: ${err.message}`);
            return []
        }
    },

    get: (id: string) => {
        try {
            return db.query.quizs.findFirst({
                where: eq(quizs.id, id),
                columns: {
                    id: true,
                    title: true,
                    difficulty: true,
                    createdAt: true
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    comments: {
                        columns: {
                            id: true,
                            content: true
                        },
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    },
                    notes: {
                        columns: {
                            id: true,
                            note: true
                        }
                    }
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be fetched");
        }
    },

    create: (quiz: NewQuiz) => {
        try {
            return db.insert(quizs).values(quiz)
        } catch(err: any) {
            console.error(`Error during the insert of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be created");
        }
    },

    update: (id: string, authorId: string, quiz: NewQuiz) => {
        try {
            return db.update(quizs).set(quiz).where(
                and(
                    eq(quizs.id, id),
                    eq(quizs.authorId, authorId)
                )
            )
        } catch(err: any) {
            console.error(`Error during the update of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be updated");
        }
    },

    delete: (id: string, authorId: string) => {
        try {
            return db.delete(quizs).where(
                and(
                    eq(quizs.id, id),
                    eq(quizs.authorId, authorId)
                )
            )
        } catch(err: any) {
            console.error(`Error during the deletion of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be deleted");
        }
    }
}