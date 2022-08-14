"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
    korIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    Eadresa: {
        type: String
    },
    tip: {
        type: String
    },
    odobren: {
        type: Number
    },
    brojd: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Korisnik', Korisnik, 'korisnik');
//# sourceMappingURL=korisnik.js.map