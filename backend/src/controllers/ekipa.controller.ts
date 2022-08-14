import express from 'express';
import Ekipa from '../models/ekipa';

export class EkipaController {

    unesiEkipu = (req: express.Request, res: express.Response) => {
        let ekipa = new Ekipa(req.body);
        let naziv = req.body.naziv;
        console.log(ekipa)
        Ekipa.findOne({ 'naziv': naziv }, (err, ek) => {
            if (err) console.log(err);
            else {
                if (ek) {
                    res.json({ poruka: 'ekPostoji' });
                } else {
                    ekipa.save().then((ekipa) => {
                        res.status(200).json({ poruka: 'ekDodata' })
                    }).catch((err) => {
                        res.status(400).json({ poruka: err });
                    })
                }
            }
        })
    }

    dodajDisciplinu = (req: express.Request, res: express.Response) => {
        let disciplina = req.body.disciplina;
        let naziv = req.body.naziv;

        Ekipa.findOne({ 'naziv': naziv }, (err, ek) => {
            if (err) console.log(err);
            else {
                if (ek) {
                    let disc = {
                        disciplina: disciplina
                    }
                    Ekipa.collection.updateOne({ 'naziv': naziv }, { $push: { 'disciplina': disc } });
                    res.json({ poruka: 'discDodata' });
                } else {
                    res.json({ poruka: 'ekNema' });
                }
            }
        })
    }

    dodajUcesnika = (req: express.Request, res: express.Response) => {
        let ucesni = req.body.ucesnik;
        let naziv = req.body.naziv;
        let query: any = {};
        query.naziv = naziv;
        query.ucesnik = { $elemMatch: { 'ime': ucesni } };

        Ekipa.findOne({ 'naziv': naziv }, (err, ek) => {
            if (err) console.log(err);
            else {
                if (ek) {

                    Ekipa.findOne(query, (err, ek2) => {
                        if (err) console.log(err); else {
                            if (ek2) {
                                res.json({ poruka: "vecima" });
                            } else {
                                let disc = {
                                    ime: ucesni
                                }
                                Ekipa.collection.updateOne({ 'naziv': naziv }, { $push: { 'ucesnik': disc } });
                                res.json({ poruka: 'ucesDodat' });
                            }
                        }
                    });
                } else {
                    res.json({ poruka: 'ekNema' });
                }
            }
        }
        )
    }

    dohvatiEkipePoNacionalnosti = (req: express.Request, res: express.Response) => {
        let nacionalnost = req.body.nacionalnost;
        Ekipa.find({ 'nacionalnost': nacionalnost }, (err, nac) => {
            if (err) console.log(err);
            else res.json(nac);
        })

    }

    dohvatiEkipuPoImenu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        Ekipa.findOne({ naziv: naziv }, (err, ek) => {
            if (err) console.log(err);
            else {
                if(ek){
                   
                    res.json({nac:ek, poruka:'ok'});
                }else{
                    res.json({ poruka: 'ekNema' });
                }
            }
               
        })

    }

    prijavaTakmicenjeZemljaDisciplina = (req: express.Request, res: express.Response) => {
        let nacionalnost = req.body.nacionalnost;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Ekipa.find({ nacionalnost: nacionalnost, sport: sport, disciplina: disciplina, pol: pol/*, ekipe:{$size:{$gt:umin}}*/ }, (err, pr) => {
            if (err) console.log(err);

            else {
                res.json(pr);
            }



        })
    }
}