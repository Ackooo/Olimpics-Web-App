"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rekord_contoller_1 = require("../controllers/rekord.contoller");
const rekordRouter = express_1.default.Router();
rekordRouter.route('/dohvatiRekorde').get((req, res) => new rekord_contoller_1.RekordController().dohvatiRekorde(req, res));
exports.default = rekordRouter;
//# sourceMappingURL=rekord.routes.js.map