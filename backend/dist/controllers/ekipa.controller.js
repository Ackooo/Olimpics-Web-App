"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkipaController = void 0;
const ekipa_1 = __importDefault(require("../models/ekipa"));
class EkipaController {
    constructor() {
        this.unesiEkipu = (req, res) => {
            let ekipa = new ekipa_1.default(req.body);
            let naziv = req.body.naziv;
            console.log(ekipa);
            ekipa_1.default.findOne({ 'naziv': naziv }, (err, ek) => {
                if (err)
                    console.log(err);
                else {
                    if (ek) {
                        res.json({ poruka: 'ekPostoji' });
                    }
                    else {
                        ekipa.save().then((ekipa) => {
                            res.status(200).json({ poruka: 'ekDodata' });
                        }).catch((err) => {
                            res.status(400).json({ poruka: err });
                        });
                    }
                }
            });
        };
        this.dodajDisciplinu = (req, res) => {
            let disciplina = req.body.disciplina;
            let naziv = req.body.naziv;
            ekipa_1.default.findOne({ 'naziv': naziv }, (err, ek) => {
                if (err)
                    console.log(err);
                else {
                    if (ek) {
                        let disc = {
                            disciplina: disciplina
                        };
                        ekipa_1.default.collection.updateOne({ 'naziv': naziv }, { $push: { 'disciplina': disc } });
                        res.json({ poruka: 'discDodata' });
                    }
                    else {
                        res.json({ poruka: 'ekNema' });
                    }
                }
            });
        };
        this.dodajUcesnika = (req, res) => {
            let ucesni = req.body.ucesnik;
            let naziv = req.body.naziv;
            let query = {};
            query.naziv = naziv;
            query.ucesnik = { $elemMatch: { 'ime': ucesni } };
            ekipa_1.default.findOne({ 'naziv': naziv }, (err, ek) => {
                if (err)
                    console.log(err);
                else {
                    if (ek) {
                        ekipa_1.default.findOne(query, (err, ek2) => {
                            if (err)
                                console.log(err);
                            else {
                                if (ek2) {
                                    res.json({ poruka: "vecima" });
                                }
                                else {
                                    let disc = {
                                        ime: ucesni
                                    };
                                    ekipa_1.default.collection.updateOne({ 'naziv': naziv }, { $push: { 'ucesnik': disc } });
                                    res.json({ poruka: 'ucesDodat' });
                                }
                            }
                        });
                    }
                    else {
                        res.json({ poruka: 'ekNema' });
                    }
                }
            });
        };
        this.dohvatiEkipePoNacionalnosti = (req, res) => {
            let nacionalnost = req.body.nacionalnost;
            ekipa_1.default.find({ 'nacionalnost': nacionalnost }, (err, nac) => {
                if (err)
                    console.log(err);
                else
                    res.json(nac);
            });
        };
        this.dohvatiEkipuPoImenu = (req, res) => {
            let naziv = req.body.naziv;
            ekipa_1.default.findOne({ naziv: naziv }, (err, ek) => {
                if (err)
                    console.log(err);
                else {
                    if (ek) {
                        res.json({ nac: ek, poruka: 'ok' });
                    }
                    else {
                        res.json({ poruka: 'ekNema' });
                    }
                }
            });
        };
        this.prijavaTakmicenjeZemljaDisciplina = (req, res) => {
            let nacionalnost = req.body.nacionalnost;
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            ekipa_1.default.find({ nacionalnost: nacionalnost, sport: sport, disciplina: disciplina, pol: pol /*, ekipe:{$size:{$gt:umin}}*/ }, (err, pr) => {
                if (err)
                    console.log(err);
                else {
                    res.json(pr);
                }
            });
        };
    }
}
exports.EkipaController = EkipaController;
//# sourceMappingURL=ekipa.controller.js.map