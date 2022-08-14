"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const disciplina_controller_1 = require("../controllers/disciplina.controller");
const disciplinaRouter = express_1.default.Router();
disciplinaRouter.route('/unesiDisciplinu').post((req, res) => new disciplina_controller_1.DisciplinaController().unesiDisciplinu(req, res));
disciplinaRouter.route('/dohvatiSveDiscipline').get((req, res) => new disciplina_controller_1.DisciplinaController().dohvatiSveDiscipline(req, res));
disciplinaRouter.route('/dohvatiSveDisciplineIme/').post((req, res) => new disciplina_controller_1.DisciplinaController().dohvatiSveDisciplineIme(req, res));
// disciplinaRouter.get('/dohvatiSveDisciplineIme/:sport',  (req, res) => new DisciplinaController().dohvatiSveDisciplineIme(req, res))
exports.default = disciplinaRouter;
//# sourceMappingURL=disciplina.routes.js.map