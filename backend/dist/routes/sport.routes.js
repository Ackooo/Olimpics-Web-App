"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sport_controller_1 = require("../controllers/sport.controller");
const sportRouter = express_1.default.Router();
sportRouter.route('/pretraziSport').get((req, res) => new sport_controller_1.SportController().pretraziSport(req, res));
sportRouter.route('/dohvatiSveSport').get((req, res) => new sport_controller_1.SportController().dohvatiSveSport(req, res));
sportRouter.route('/unesiSport').post((req, res) => new sport_controller_1.SportController().unesiSport(req, res));
exports.default = sportRouter;
//# sourceMappingURL=sport.routes.js.map