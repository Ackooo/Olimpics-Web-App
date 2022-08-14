"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaController = void 0;
const disciplina_1 = __importDefault(require("../models/disciplina"));
class DisciplinaController {
    constructor() {
        this.unesiDisciplinu = (req, res) => {
            let disciplina = new disciplina_1.default(req.body);
            let naziv = req.body.naziv;
            let sport = req.body.sport;
            //let vrsta = req.body.vrsta;
            // let format = req.body.format;
            disciplina_1.default.findOne({ 'naziv': naziv, 'sport': sport }, (err, dis) => {
                if (err)
                    console.log(err);
                else {
                    if (dis) {
                        res.json({ 'message': 'disciplinaPostoji' });
                    }
                    else {
                        disciplina.save().then((disciplina) => {
                            res.status(200).json({ 'message': 'disciplina dodata' });
                        }).catch((err) => {
                            res.status(400).json({ 'message': err });
                        });
                    }
                }
            });
        };
        this.dohvatiSveDiscipline = (req, res) => {
            disciplina_1.default.find({}, (err, disciplina) => {
                if (err)
                    console.log(err);
                else {
                    res.json(disciplina);
                }
            });
        };
        this.dohvatiSveDisciplineIme = (req, res) => {
            let sport = req.body.sport;
            disciplina_1.default.find({ 'sport': sport }, (err, disciplina) => {
                if (err)
                    console.log(err);
                else {
                    res.json(disciplina);
                }
            });
        };
    }
}
exports.DisciplinaController = DisciplinaController;
//# sourceMappingURL=disciplina.controller.js.map