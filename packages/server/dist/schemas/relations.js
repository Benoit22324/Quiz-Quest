"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRelations = exports.runRelations = exports.partRelations = exports.commentRelations = exports.quizRelations = exports.userRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require("./");
exports.userRelations = (0, drizzle_orm_1.relations)(_1.users, ({ many }) => ({
    quizs: many(_1.quizs),
    comments: many(_1.comments),
    runs: many(_1.runs),
    notes: many(_1.notes)
}));
exports.quizRelations = (0, drizzle_orm_1.relations)(_1.quizs, ({ one, many }) => ({
    user: one(_1.users, {
        fields: [_1.quizs.authorId],
        references: [_1.users.id]
    }),
    parts: many(_1.parts),
    comments: many(_1.comments),
    runs: many(_1.runs),
    notes: many(_1.notes)
}));
exports.commentRelations = (0, drizzle_orm_1.relations)(_1.comments, ({ one }) => ({
    user: one(_1.users, {
        fields: [_1.comments.authorId],
        references: [_1.users.id]
    }),
    quiz: one(_1.quizs, {
        fields: [_1.comments.quizId],
        references: [_1.quizs.id]
    })
}));
exports.partRelations = (0, drizzle_orm_1.relations)(_1.parts, ({ one }) => ({
    quiz: one(_1.quizs, {
        fields: [_1.parts.quizId],
        references: [_1.quizs.id]
    })
}));
exports.runRelations = (0, drizzle_orm_1.relations)(_1.runs, ({ one }) => ({
    user: one(_1.users, {
        fields: [_1.runs.userId],
        references: [_1.users.id]
    }),
    quiz: one(_1.quizs, {
        fields: [_1.runs.quizId],
        references: [_1.quizs.id]
    })
}));
exports.noteRelations = (0, drizzle_orm_1.relations)(_1.notes, ({ one }) => ({
    user: one(_1.users, {
        fields: [_1.notes.userId],
        references: [_1.users.id]
    }),
    quiz: one(_1.quizs, {
        fields: [_1.notes.quizId],
        references: [_1.quizs.id]
    })
}));
