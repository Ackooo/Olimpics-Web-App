"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zemlja_controller_1 = require("../controllers/zemlja.controller");
const zemljaRouter = express_1.default.Router();
zemljaRouter.route('/dohvatiSveZemlje').get((req, res) => new zemlja_controller_1.ZemljeController().dohvatiSveZemlje(req, res));
zemljaRouter.route('/incZ').post((req, res) => new zemlja_controller_1.ZemljeController().incZ(req, res));
zemljaRouter.route('/incS').post((req, res) => new zemlja_controller_1.ZemljeController().incS(req, res));
zemljaRouter.route('/incB').post((req, res) => new zemlja_controller_1.ZemljeController().incB(req, res));
zemljaRouter.route('/incU').post((req, res) => new zemlja_controller_1.ZemljeController().incU(req, res));
exports.default = zemljaRouter;
//# sourceMappingURL=zemlja.routes.js.map