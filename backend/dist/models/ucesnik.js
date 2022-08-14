"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ucesnik = new Schema({
    ime: {
        type: String
    },
    zemlja: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: Array
    },
    pol: {
        type: String
    },
    medalja: {
        type: Number
    },
});
exports.default = mongoose_1.default.model('Ucesnik', Ucesnik, 'ucesnik');
//# sourceMappingURL=ucesnik.js.map