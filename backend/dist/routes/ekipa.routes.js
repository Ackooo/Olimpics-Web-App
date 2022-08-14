"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ekipa_controller_1 = require("../controllers/ekipa.controller");
const ekipaRouter = express_1.default.Router();
ekipaRouter.route('/unesiEkipu').post((req, res) => new ekipa_controller_1.EkipaController().unesiEkipu(req, res));
ekipaRouter.route('/dodajDisciplinu').post((req, res) => new ekipa_controller_1.EkipaController().dodajDisciplinu(req, res));
ekipaRouter.route('/dodajUcesnika').post((req, res) => new ekipa_controller_1.EkipaController().dodajUcesnika(req, res));
ekipaRouter.route('/dohvatiEkipePoNacionalnosti').post((req, res) => new ekipa_controller_1.EkipaController().dohvatiEkipePoNacionalnosti(req, res));
ekipaRouter.route('/prijavaTakmicenjeZemljaDisciplina').post((req, res) => new ekipa_controller_1.EkipaController().prijavaTakmicenjeZemljaDisciplina(req, res));
ekipaRouter.route('/dohvatiEkipuPoImenu').post((req, res) => new ekipa_controller_1.EkipaController().dohvatiEkipuPoImenu(req, res));
exports.default = ekipaRouter;
//# sourceMappingURL=ekipa.routes.js.map