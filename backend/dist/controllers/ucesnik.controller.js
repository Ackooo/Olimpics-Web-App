"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UcesnikController = void 0;
const ucesnik_1 = __importDefault(require("../models/ucesnik"));
class UcesnikController {
    constructor() {
        this.pretraziUcesnike = (req, res) => {
            let ime = req.body.ime;
            let zemlja = req.body.zemlja;
            let sport = req.body.sport;
            let disciplin = req.body.disciplina;
            let pol = req.body.pol;
            let osvajac = req.body.osvajac;
            let query = {};
            if (ime) {
                query.ime = ime;
            }
            if (zemlja) {
                query.zemlja = zemlja;
            }
            if (sport) {
                query.sport = sport;
            }
            if (disciplin) {
                query.disciplina = { $elemMatch: { naziv: disciplin } };
            }
            if (pol) {
                query.pol = pol;
            }
            if (osvajac) {
                query.medalja = {
                    $gt: 0
                };
            }
            ucesnik_1.default.find(query, (err, ucesnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(ucesnik);
            });
        };
        this.unesiUcesnike = (req, res) => {
            let ucesnik = new ucesnik_1.default(req.body);
            let ime = req.body.ime;
            ucesnik_1.default.findOne({ 'ime': ime }, (err, uc) => {
                if (err)
                    console.log(err);
                else {
                    if (uc) {
                        res.json({ poruka: 'ucPostoji' });
                    }
                    else {
                        ucesnik.save().then((uces) => {
                            res.status(200).json({ poruka: 'ucDodat' });
                        }).catch((err) => {
                            res.status(400).json({ poruka: err });
                        });
                    }
                }
            });
        };
        this.dodajDisciplinu = (req, res) => {
            let disciplin = req.body.disciplina;
            let ime = req.body.ime;
            let query = {};
            query.ime = ime;
            query.disciplina = { $elemMatch: { naziv: disciplin } };
            ucesnik_1.default.findOne({ 'ime': ime }, (err, uc) => {
                if (err)
                    console.log(err);
                else {
                    if (uc) {
                        ucesnik_1.default.findOne(query, (err, uc2) => {
                            if (err)
                                console.log(err);
                            else {
                                if (uc2) {
                                    res.json({ poruka: "vecima" });
                                }
                                else {
                                    let disc = {
                                        naziv: disciplin
                                    };
                                    ucesnik_1.default.collection.updateOne({ 'ime': ime }, { $push: { 'disciplina': disc } });
                                    res.json({ poruka: 'discDodata' });
                                }
                            }
                        });
                    }
                    else {
                        res.json({ poruka: 'ucNema' });
                    }
                }
            });
        };
        this.dohvatiUcesnikePoNacionalnosti = (req, res) => {
            let zemlja = req.body.zemlja;
            ucesnik_1.default.find({ 'zemlja': zemlja }, (err, uc) => {
                if (err)
                    console.log(err);
                else
                    res.json(uc);
            });
        };
        this.dohvatiUcesnikePoZemljiDisciplini = (req, res) => {
            let zemlja = req.body.zemlja;
            let disciplin = req.body.disciplina;
            let query = {};
            query.zemlja = zemlja;
            query.disciplina = { $elemMatch: { naziv: disciplin } };
            ucesnik_1.default.find(query, (err, uc) => {
                if (err)
                    console.log(err);
                else
                    res.json(uc);
            });
        };
        this.prijavaTakmicenjeZemljaDisciplina = (req, res) => {
            let zemlja = req.body.zemlja;
            let sport = req.body.sport;
            let disciplin = req.body.disciplina;
            let pol = req.body.pol;
            let query = {};
            query.zemlja = zemlja;
            query.sport = sport;
            query.pol = pol;
            query.disciplina = { $elemMatch: { naziv: disciplin } };
            ucesnik_1.default.find(query, (err, uc) => {
                if (err)
                    console.log(err);
                else
                    res.json(uc);
            });
        };
        this.dohvatiBrojUcesnika = (req, res) => {
            let zemlja = req.body.zemlja;
            ucesnik_1.default.countDocuments({ zemlja: zemlja }, (err, broj) => {
                if (err)
                    console.log(err);
                else
                    res.json(broj);
            });
        };
        this.dohvatiBrojUcesnikaSport = (req, res) => {
            let zemlja = req.body.zemlja;
            let sport = req.body.sport;
            ucesnik_1.default.countDocuments({ zemlja: zemlja, sport: sport }, (err, broj) => {
                if (err)
                    console.log(err);
                else
                    res.json(broj);
            });
        };
        this.pretraziUcesnikeDisciplina = (req, res) => {
            let zemlja = req.body.zemlja;
            let disciplin = req.body.disciplina;
            let query = {};
            query.zemlja = zemlja;
            query.disciplina = { $elemMatch: { naziv: disciplin } };
            ucesnik_1.default.find(query, (err, uc) => {
                if (err)
                    console.log(err);
                else
                    res.json(uc);
            });
        };
        this.incMedalje = (req, res) => {
            let ime = req.body.ime;
            ucesnik_1.default.findOneAndUpdate({ ime: ime }, { $inc: { medalja: 1 } }, (err, pod) => {
                if (err)
                    console.log(err);
                else {
                    if (pod)
                        res.json(pod);
                }
            });
        };
    }
}
exports.UcesnikController = UcesnikController;
//# sourceMappingURL=ucesnik.controller.js.map