import express from 'express';
import Korisnik from '../models/korisnik';

export class KorisnikController {
    login = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;
        let lozinka = req.body.lozinka;
        // let tip = req.body.tip; //dodao

        Korisnik.findOne({ 'korIme': korIme, 'lozinka': lozinka, 'odobren': 1 },
            (err, korisnik) => {
                if (err) console.log(err);
                else res.json(korisnik);
            })

    }
    //sta saljemo sa fronta
    register = (req: express.Request, res: express.Response) => {
        let korisnik = new Korisnik(req.body);
        let korIme = req.body.korIme;
        let tip = req.body.tip;
        let nacionalnost = req.body.nacionalnost;

        Korisnik.findOne({ 'korIme': korIme }, (err, korisnikI) => {
            if (err) console.log(err);
            else {
                if (korisnikI) {
                    res.json({ poruka: 'korisnikPostoji' });
                } else {
                    if (tip == 'vodja') {
                        Korisnik.findOne({ 'tip': tip, 'nacionalnost': nacionalnost, 'odobren': 1 }, (err, korisnikv) => {
                            if (err) console.log(err);
                            else {
                                if (korisnikv) {
                                    res.json({ poruka: 'vodjaNe' });
                                } else {
                                    korisnik.save().then((korisnik) => {
                                        res.status(200).json({ poruka: 'vodjaDodat' })
                                    }).catch((err) => {
                                        res.status(400).json({ poruka: err });
                                    })
                                }
                            }
                        })
                    } else if (tip == 'organizator') {
                        Korisnik.findOne({ 'tip': tip }, (err, korisniko) => {
                            if (err) console.log(err);
                            else {
                                if (korisniko) {
                                    res.json({ poruka: 'orgNe' });
                                } else {
                                    korisnik.save().then((korisnik) => {
                                        res.status(200).json({ poruka: 'orgDodat' });
                                    }).catch((err) => {
                                        res.status(400).json({ poruka: err });
                                    })
                                }
                            }
                        })
                    } else if (tip == 'delegat') {
                        korisnik.save().then((korisnik) => {
                            res.status(200).json({ poruka: 'delegatDodat' })
                        }).catch((err) => {
                            res.status(400).json({ poruka: err });
                        })
                    } else { res.json({ poruka: 'podNe' }); }
                }
            }
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;
        let lozinka = req.body.lozinka;
        let nova1 = req.body.nova1;

        Korisnik.findOne({ 'korIme': korIme, 'lozinka': lozinka, 'odobren': 1 },
            (err, korisnik) => {
                if (err) console.log(err);
                else {
                    if (korisnik) {
                        Korisnik.collection.updateOne(
                            { 'korIme': korIme, 'lozinka': lozinka, 'odobren': 1 },
                            { $set: { 'lozinka': nova1 } }
                        );
                        res.json({ poruka: 'ok' });
                    } else { res.json({ poruka: 'nijeok' }); }
                }
            })
    }

    dohvatiSveKorisnike = (req: express.Request, res: express.Response) => {
        Korisnik.find({ 'odobren': 0 }, (err, korisnik) => {
            if (err) console.log(err);
            else {
                res.json(korisnik);
            }
        })
    }

    odobriKorisnika = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;

        Korisnik.collection.updateOne({ 'korIme': korIme }, { $set: { 'odobren': 1 } });
        res.json({ poruka: 'ok' })
    }

    obrisiKorisnika = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;

        Korisnik.collection.deleteOne({ 'korIme': korIme });
        res.json({ poruka: 'ok' })
    }
    delegatTakmicenje = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;

        Korisnik.collection.updateOne({ 'korIme': korIme }, { $inc: { 'brojd': 1 } });
        res.json({ poruka: 'ok' })
    }
    dohvatiSveDelegate = (req: express.Request, res: express.Response) => {
        Korisnik.find({ 'tip': 'delegat', brojd: { $lt: 3 }, odobren:1 }, (err, korisnik) => {
            if (err) console.log(err);
            else {
                res.json(korisnik);
            }
        })
    }


}

