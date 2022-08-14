"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const takmicenje_controller_1 = require("../controllers/takmicenje.controller");
const takmicenjeRouter = express_1.default.Router();
takmicenjeRouter.route('/unesiTakmicenje').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiTakmicenje(req, res));
takmicenjeRouter.route('/formirajTakmicenje').post((req, res) => new takmicenje_controller_1.takmicenjeController().formirajTakmicenje(req, res));
takmicenjeRouter.route('/dohvatiSveFormiranje').get((req, res) => new takmicenje_controller_1.takmicenjeController().dohvatiSveFormiranje(req, res));
takmicenjeRouter.route('/unesiEkipu').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiEkipu(req, res));
takmicenjeRouter.route('/odbaciEkipu').post((req, res) => new takmicenje_controller_1.takmicenjeController().odbaciEkipu(req, res));
takmicenjeRouter.route('/dohvatiSveDelegat').post((req, res) => new takmicenje_controller_1.takmicenjeController().dohvatiSveDelegat(req, res));
takmicenjeRouter.route('/unesiRaspored').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiRaspored(req, res));
takmicenjeRouter.route('/pokreniAlgoritam').post((req, res) => new takmicenje_controller_1.takmicenjeController().pokreniAlgoritam(req, res));
takmicenjeRouter.route('/unesiRezG').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiRezG(req, res));
takmicenjeRouter.route('/unesiRezQ').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiRezQ(req, res));
takmicenjeRouter.route('/unesiRezS').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiRezS(req, res));
takmicenjeRouter.route('/unesiRezF').post((req, res) => new takmicenje_controller_1.takmicenjeController().unesiRezF(req, res));
takmicenjeRouter.route('/promoteG').post((req, res) => new takmicenje_controller_1.takmicenjeController().promoteG(req, res));
takmicenjeRouter.route('/promoteQ').post((req, res) => new takmicenje_controller_1.takmicenjeController().promoteQ(req, res));
takmicenjeRouter.route('/promoteS').post((req, res) => new takmicenje_controller_1.takmicenjeController().promoteS(req, res));
takmicenjeRouter.route('/updateRezGrupaQ').post((req, res) => new takmicenje_controller_1.takmicenjeController().updateRezGrupaQ(req, res));
takmicenjeRouter.route('/updateRezQS').post((req, res) => new takmicenje_controller_1.takmicenjeController().updateRezQS(req, res));
takmicenjeRouter.route('/dohvatiTakmicenje').post((req, res) => new takmicenje_controller_1.takmicenjeController().dohvatiTakmicenje(req, res));
takmicenjeRouter.route('/takm10').post((req, res) => new takmicenje_controller_1.takmicenjeController().takm10(req, res));
exports.default = takmicenjeRouter;
//# sourceMappingURL=takmicenje.routes.js.map