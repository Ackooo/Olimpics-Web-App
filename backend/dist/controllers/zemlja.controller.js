"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZemljeController = void 0;
const zemlja_1 = __importDefault(require("../models/zemlja"));
class ZemljeController {
    constructor() {
        this.dohvatiSveZemlje = (req, res) => {
            zemlja_1.default.find({}, (err, zemlja) => {
                if (err)
                    console.log(err);
                else {
                    res.json(zemlja);
                }
            });
        };
        this.incZ = (req, res) => {
            let ime = req.body.ime;
            zemlja_1.default.findOneAndUpdate({ ime: ime }, { $inc: { brojZ: 1 } }, (err, pod) => {
                if (err)
                    console.log(err);
                else {
                    if (pod)
                        res.json({ poruka: 'ok' });
                }
            });
        };
        this.incS = (req, res) => {
            let ime = req.body.ime;
            zemlja_1.default.findOneAndUpdate({ ime: ime }, { $inc: { brojS: 1 } }, (err, pod) => {
                if (err)
                    console.log(err);
                else {
                    if (pod)
                        res.json({ poruka: 'ok' });
                }
            });
        };
        this.incB = (req, res) => {
            let ime = req.body.ime;
            zemlja_1.default.findOneAndUpdate({ ime: ime }, { $inc: { brojB: 1 } }, (err, pod) => {
                if (err)
                    console.log(err);
                else {
                    if (pod)
                        res.json({ poruka: 'ok' });
                }
            });
        };
        this.incU = (req, res) => {
            let ime = req.body.ime;
            zemlja_1.default.findOneAndUpdate({ ime: ime }, { $inc: { brojSportista: 1 } }, (err, pod) => {
                if (err)
                    console.log(err);
                else {
                    if (pod)
                        res.json({ poruka: 'ok' });
                }
            });
        };
    }
}
exports.ZemljeController = ZemljeController;
//# sourceMappingURL=zemlja.controller.js.map