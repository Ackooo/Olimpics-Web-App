"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ucesnik_controller_1 = require("../controllers/ucesnik.controller");
const ucesnikRouter = express_1.default.Router();
ucesnikRouter.route('/pretraziUcesnike').post((req, res) => new ucesnik_controller_1.UcesnikController().pretraziUcesnike(req, res));
ucesnikRouter.route('/unesiUcesnike').post((req, res) => new ucesnik_controller_1.UcesnikController().unesiUcesnike(req, res));
ucesnikRouter.route('/dodajDisciplinu').post((req, res) => new ucesnik_controller_1.UcesnikController().dodajDisciplinu(req, res));
ucesnikRouter.route('/dohvatiUcesnikePoNacionalnosti').post((req, res) => new ucesnik_controller_1.UcesnikController().dohvatiUcesnikePoNacionalnosti(req, res));
ucesnikRouter.route('/dohvatiUcesnikePoZemljiDisciplini').post((req, res) => new ucesnik_controller_1.UcesnikController().dohvatiUcesnikePoZemljiDisciplini(req, res));
ucesnikRouter.route('/prijavaTakmicenjeZemljaDisciplina').post((req, res) => new ucesnik_controller_1.UcesnikController().prijavaTakmicenjeZemljaDisciplina(req, res));
ucesnikRouter.route('/dohvatiBrojUcesnika').post((req, res) => new ucesnik_controller_1.UcesnikController().dohvatiBrojUcesnika(req, res));
ucesnikRouter.route('/dohvatiBrojUcesnikaSport').post((req, res) => new ucesnik_controller_1.UcesnikController().dohvatiBrojUcesnikaSport(req, res));
ucesnikRouter.route('/pretraziUcesnikeDisciplina').post((req, res) => new ucesnik_controller_1.UcesnikController().pretraziUcesnikeDisciplina(req, res));
ucesnikRouter.route('/incMedalje').post((req, res) => new ucesnik_controller_1.UcesnikController().incMedalje(req, res));
exports.default = ucesnikRouter;
//# sourceMappingURL=ucesnik.routes.js.map