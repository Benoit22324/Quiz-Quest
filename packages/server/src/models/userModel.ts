import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { users } from "../schemas";
import { NewUser } from "../entities";

export const userModel = {
    getAll: () => {
        try {
            return db.query.users.findMany({
                columns: {
                    id: true,
                    username: true,
                    createdAt: true,
                    admin: true
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of every User: ${err.message}`);
            return []
        }
    },

    get: (id: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true,
                    email: true,
                    admin: true,
                    createdAt: true
                },
                with: {
                    runs: {
                        columns: {
                            id: true,
                            result: true
                        }
                    }
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of the User: ${err.message}`);
            throw new Error("The User couldn't be fetched");
        }
    },

    findCredentials: (email: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.email, email)
            })
        } catch(err: any) {
            console.error(`Error during the fetch of the User: ${err.message}`);
            throw new Error("The User couldn't be fetched");
        }
    },

    create: (user: NewUser) => {
        try {
            return db.insert(users).values(user).returning({
                id: users.id
            })
        } catch(err: any) {
            console.error(`Error during the insert of the User: ${err.message}`);
            throw new Error("The User couldn't be created");
        }
    },

    update: (id: string, user: NewUser) => {
        try {
            return db.update(users).set(user).where(
                eq(users.id, id)
            )
        } catch(err: any) {
            console.error(`Error during the update of the User: ${err.message}`);
            throw new Error("The User couldn't be updated");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(users).where(
                eq(users.id, id)
            )
        } catch(err: any) {
            console.error(`Error during the deletion of the User: ${err.message}`);
            throw new Error("The User couldn't be deleted");
        }
    }
}