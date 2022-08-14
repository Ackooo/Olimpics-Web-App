"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rekord = new Schema({
    godina: {
        type: Number
    },
    mesto: {
        type: String
    },
    disciplina: {
        type: String
    },
    takmicar: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    vrednost: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Rekord', Rekord, 'rekordi');
//# sourceMappingURL=rekord.js.map