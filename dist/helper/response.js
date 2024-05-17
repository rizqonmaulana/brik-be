"use strict";
// response.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
function successResponse(message, data) {
    return {
        success: true,
        message,
        data,
    };
}
exports.successResponse = successResponse;
function errorResponse(message, error) {
    return {
        success: false,
        message,
        error,
    };
}
exports.errorResponse = errorResponse;
