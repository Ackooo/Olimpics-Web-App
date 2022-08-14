"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    constructor() {
        this.login = (req, res) => {
            let korIme = req.body.korIme;
            let lozinka = req.body.lozinka;
            // let tip = req.body.tip; //dodao
            korisnik_1.default.findOne({ 'korIme': korIme, 'lozinka': lozinka, 'odobren': 1 }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        //sta saljemo sa fronta
        this.register = (req, res) => {
            let korisnik = new korisnik_1.default(req.body);
            let korIme = req.body.korIme;
            let tip = req.body.tip;
            let nacionalnost = req.body.nacionalnost;
            korisnik_1.default.findOne({ 'korIme': korIme }, (err, korisnikI) => {
                if (err)
                    console.log(err);
                else {
                    if (korisnikI) {
                        res.json({ poruka: 'korisnikPostoji' });
                    }
                    else {
                        if (tip == 'vodja') {
                            korisnik_1.default.findOne({ 'tip': tip, 'nacionalnost': nacionalnost, 'odobren': 1 }, (err, korisnikv) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (korisnikv) {
                                        res.json({ poruka: 'vodjaNe' });
                                    }
                                    else {
                                        korisnik.save().then((korisnik) => {
                                            res.status(200).json({ poruka: 'vodjaDodat' });
                                        }).catch((err) => {
                                            res.status(400).json({ poruka: err });
                                        });
                                    }
                                }
                            });
                        }
                        else if (tip == 'organizator') {
                            korisnik_1.default.findOne({ 'tip': tip }, (err, korisniko) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (korisniko) {
                                        res.json({ poruka: 'orgNe' });
                                    }
                                    else {
                                        korisnik.save().then((korisnik) => {
                                            res.status(200).json({ poruka: 'orgDodat' });
                                        }).catch((err) => {
                                            res.status(400).json({ poruka: err });
                                        });
                                    }
                                }
                            });
                        }
                        else if (tip == 'delegat') {
                            korisnik.save().then((korisnik) => {
                                res.status(200).json({ poruka: 'delegatDodat' });
                            }).catch((err) => {
                                res.status(400).json({ poruka: err });
                            });
                        }
                        else {
                            res.json({ poruka: 'podNe' });
                        }
                    }
                }
            });
        };
        this.promeniLozinku = (req, res) => {
            let korIme = req.body.korIme;
            let lozinka = req.body.lozinka;
            let nova1 = req.body.nova1;
            korisnik_1.default.findOne({ 'korIme': korIme, 'lozinka': lozinka, 'odobren': 1 }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else {
                    if (korisnik) {
                        korisnik_1.default.collection.updateOne({ 'korIme': korIme, 'lozinka': lozinka, 'odobren': 1 }, { $set: { 'lozinka': nova1 } });
                        res.json({ poruka: 'ok' });
                    }
                    else {
                        res.json({ poruka: 'nijeok' });
                    }
                }
            });
        };
        this.dohvatiSveKorisnike = (req, res) => {
            korisnik_1.default.find({ 'odobren': 0 }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else {
                    res.json(korisnik);
                }
            });
        };
        this.odobriKorisnika = (req, res) => {
            let korIme = req.body.korIme;
            korisnik_1.default.collection.updateOne({ 'korIme': korIme }, { $set: { 'odobren': 1 } });
            res.json({ poruka: 'ok' });
        };
        this.obrisiKorisnika = (req, res) => {
            let korIme = req.body.korIme;
            korisnik_1.default.collection.deleteOne({ 'korIme': korIme });
            res.json({ poruka: 'ok' });
        };
        this.delegatTakmicenje = (req, res) => {
            let korIme = req.body.korIme;
            korisnik_1.default.collection.updateOne({ 'korIme': korIme }, { $inc: { 'brojd': 1 } });
            res.json({ poruka: 'ok' });
        };
        this.dohvatiSveDelegate = (req, res) => {
            korisnik_1.default.find({ 'tip': 'delegat', brojd: { $lt: 3 }, odobren: 1 }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else {
                    res.json(korisnik);
                }
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map