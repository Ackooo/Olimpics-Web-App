"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/login').post((req, res) => new korisnik_controller_1.KorisnikController().login(req, res));
korisnikRouter.route('/register').post((req, res) => new korisnik_controller_1.KorisnikController().register(req, res));
korisnikRouter.route('/promeniLozinku').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
korisnikRouter.route('/dohvatiSveKorisnike').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiSveKorisnike(req, res));
korisnikRouter.route('/odobriKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().odobriKorisnika(req, res));
korisnikRouter.route('/obrisiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().obrisiKorisnika(req, res));
korisnikRouter.route('/delegatTakmicenje').post((req, res) => new korisnik_controller_1.KorisnikController().delegatTakmicenje(req, res));
korisnikRouter.route('/dohvatiSveDelegate').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiSveDelegate(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map