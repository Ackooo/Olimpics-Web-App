"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Disciplina = new Schema({
    naziv: {
        type: String
    },
    sport: {
        type: String
    },
    vrsta: {
        type: String
    },
    format: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Disciplina', Disciplina, 'disciplina');
//# sourceMappingURL=disciplina.js.map