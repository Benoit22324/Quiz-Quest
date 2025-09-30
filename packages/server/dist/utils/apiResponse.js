"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (response, data, message, status = 200) => {
    response.status(status).send({
        message,
        data
    });
};
exports.apiResponse = apiResponse;
