import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { runs } from "../schemas";
import { NewRun } from "../entities";

export const runModel = {
    getByUser: (userId: string) => {
        try {
            return db.query.runs.findMany({
                where: eq(runs.userId, userId),
                columns: {
                    id: true,
                    result: true,
                    createdAt: true
                },
                with: {
                    quiz: {
                        columns: {
                            id: true,
                            title: true,
                            difficulty: true
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
                    }
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of every Runs: ${err.message}`);
            return []
        }
    },

    create: (run: NewRun) => {
        try {
            return db.insert(runs).values(run)
        } catch(err: any) {
            console.error(`Error during the insert of the Run: ${err.message}`);
            throw new Error("The Run couldn't be created");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(runs).where(
                eq(runs.id, id)
            )
        } catch(err: any) {
            console.error(`Error during the deletion of the Run: ${err.message}`);
            throw new Error("The Run couldn't be deleted");
        }
    }
}