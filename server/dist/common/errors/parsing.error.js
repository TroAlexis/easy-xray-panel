"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingError = void 0;
class ParsingError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ParsingError';
    }
}
exports.ParsingError = ParsingError;
//# sourceMappingURL=parsing.error.js.map