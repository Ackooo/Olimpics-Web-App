import express from 'express';
import Ucesnik from '../models/ucesnik';

export class UcesnikController {

    pretraziUcesnike = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplin = req.body.disciplina;
        let pol = req.body.pol;
        let osvajac = req.body.osvajac;
        let query: any = {};
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
        Ucesnik.find(query,
            (err, ucesnik) => {
                if (err) console.log(err);
                else res.json(ucesnik);
            })
    }
    unesiUcesnike = (req: express.Request, res: express.Response) => {
        let ucesnik = new Ucesnik(req.body);
        let ime = req.body.ime;

        Ucesnik.findOne({ 'ime': ime }, (err, uc) => {
            if (err) console.log(err);
            else {
                if (uc) {
                    res.json({ poruka: 'ucPostoji' });
                } else {
                    ucesnik.save().then((uces) => {
                        res.status(200).json({ poruka: 'ucDodat' })
                    }).catch((err) => {
                        res.status(400).json({ poruka: err });
                    })
                }
            }
        })
    }
    dodajDisciplinu = (req: express.Request, res: express.Response) => {
        let disciplin = req.body.disciplina;
        let ime = req.body.ime;
        let query: any = {};
        query.ime = ime;
        query.disciplina = { $elemMatch: { naziv: disciplin } };

        Ucesnik.findOne({ 'ime': ime }, (err, uc) => {
            if (err) console.log(err);
            else {
                if (uc) {

                    Ucesnik.findOne(query, (err, uc2) => {
                        if (err) console.log(err);
                        else {
                            if (uc2) {
                                res.json({ poruka: "vecima" });
                            } else {
                                let disc = {
                                    naziv: disciplin
                                }
                                Ucesnik.collection.updateOne({ 'ime': ime }, { $push: { 'disciplina': disc } });
                                res.json({ poruka: 'discDodata' });
                            }
                        }
                    });
                } else {
                    res.json({ poruka: 'ucNema' });
                }
            }
        })
    }
    dohvatiUcesnikePoNacionalnosti = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;

        Ucesnik.find({ 'zemlja': zemlja }, (err, uc) => {
            if (err) console.log(err);
            else res.json(uc);
        })

    }
    dohvatiUcesnikePoZemljiDisciplini = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let disciplin = req.body.disciplina;
        let query: any = {};
        query.zemlja = zemlja;
        query.disciplina = { $elemMatch: { naziv: disciplin } };

        Ucesnik.find(query, (err, uc) => {
            if (err) console.log(err);
            else res.json(uc);
        })

    }

    prijavaTakmicenjeZemljaDisciplina = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplin = req.body.disciplina;
        let pol = req.body.pol;
        let query: any = {};
        query.zemlja = zemlja;
        query.sport = sport;
        query.pol = pol;
        query.disciplina = { $elemMatch: { naziv: disciplin } };

        Ucesnik.find(query, (err, uc) => {
            if (err) console.log(err);
            else res.json(uc);
        })

    }

    dohvatiBrojUcesnika = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;

        Ucesnik.countDocuments({ zemlja: zemlja }, (err, broj) => {
            if (err) console.log(err);
            else res.json(broj);
        })
    }
    dohvatiBrojUcesnikaSport = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;

        Ucesnik.countDocuments({ zemlja: zemlja, sport: sport }, (err, broj) => {
            if (err) console.log(err);
            else res.json(broj);
        })
    }
    pretraziUcesnikeDisciplina = (req: express.Request, res: express.Response) => {
        let zemlja = req.body.zemlja;
        let disciplin = req.body.disciplina;
        let query: any = {};
        query.zemlja = zemlja;
        query.disciplina = { $elemMatch: { naziv: disciplin } };

        Ucesnik.find(query, (err, uc) => {
            if (err) console.log(err);
            else res.json(uc);
        })

    }

    incMedalje = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        Ucesnik.findOneAndUpdate({ ime: ime }, { $inc: { medalja: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod)  res.json(pod);
            }
        })

    }
}