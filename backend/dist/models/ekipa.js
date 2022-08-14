"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ekipa = new Schema({
    naziv: {
        type: String
    },
    ucesnik: {
        type: Array
    },
    pol: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    umin: {
        type: Number
    },
    umax: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Ekipa', Ekipa, 'ekipa');
//# sourceMappingURL=ekipa.js.map