"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Takmicenje = new Schema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    pol: {
        type: String
    },
    datPoc: {
        type: String
    },
    datKraj: {
        type: String
    },
    raspored: {
        type: Array
    },
    tip: {
        type: String
    },
    ekipe: {
        type: Array
    },
    delegat: {
        type: String
    },
    format: {
        type: String
    },
    formirano: {
        type: Number
    },
    uneto: {
        type: Number
    },
    forma: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Takmicenje', Takmicenje, 'takmicenje');
//# sourceMappingURL=takmicenje.js.map