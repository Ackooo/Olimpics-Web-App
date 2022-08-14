"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RekordController = void 0;
const rekord_1 = __importDefault(require("../models/rekord"));
class RekordController {
    constructor() {
        this.dohvatiRekorde = (req, res) => {
            rekord_1.default.find({}, (err, rekord) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rekord);
                }
            });
        };
    }
}
exports.RekordController = RekordController;
//# sourceMappingURL=rekord.contoller.js.map