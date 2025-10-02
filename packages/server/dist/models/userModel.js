"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
exports.userModel = {
    getAll: () => {
        try {
            return pool_1.db.query.users.findMany({
                columns: {
                    id: true,
                    username: true,
                    createdAt: true,
                    admin: true
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of every User: ${err.message}`);
            return [];
        }
    },
    get: (id) => {
        try {
            return pool_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.users.id, id),
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
            });
        }
        catch (err) {
            console.error(`Error during the fetch of the User: ${err.message}`);
            throw new Error("The User couldn't be fetched");
        }
    },
    findCredentials: (email) => {
        try {
            return pool_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.users.email, email)
            });
        }
        catch (err) {
            console.error(`Error during the fetch of the User: ${err.message}`);
            throw new Error("The User couldn't be fetched");
        }
    },
    create: (user) => {
        try {
            return pool_1.db.insert(schemas_1.users).values(user).returning({
                id: schemas_1.users.id
            });
        }
        catch (err) {
            console.error(`Error during the insert of the User: ${err.message}`);
            throw new Error("The User couldn't be created");
        }
    },
    update: (id, user) => {
        try {
            return pool_1.db.update(schemas_1.users).set(user).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
        }
        catch (err) {
            console.error(`Error during the update of the User: ${err.message}`);
            throw new Error("The User couldn't be updated");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.users).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
        }
        catch (err) {
            console.error(`Error during the deletion of the User: ${err.message}`);
            throw new Error("The User couldn't be deleted");
        }
    }
};
