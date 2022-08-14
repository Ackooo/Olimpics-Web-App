import express from 'express';
import Disciplina from '../models/disciplina';


export class DisciplinaController {
    unesiDisciplinu = (req: express.Request, res: express.Response) => {
        let disciplina = new Disciplina(req.body);
        let naziv = req.body.naziv;
        let sport = req.body.sport;
        //let vrsta = req.body.vrsta;
       // let format = req.body.format;

        Disciplina.findOne({ 'naziv': naziv, 'sport': sport }, (err, dis) => {
            if (err) console.log(err);
            else {
                if (dis) {
                    res.json({ 'message': 'disciplinaPostoji' });
                } else {
                    disciplina.save().then((disciplina) => {
                        res.status(200).json({ 'message': 'disciplina dodata' })
                    }).catch((err) => {
                        res.status(400).json({ 'message': err });
                    })
                }
            }
        })
    }

    dohvatiSveDiscipline = (req: express.Request, res: express.Response) => {
        Disciplina.find({}, (err, disciplina) => {
            if (err) console.log(err);
            else {
                res.json(disciplina);
            }
        })
    }
    dohvatiSveDisciplineIme = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        
        Disciplina.find({'sport' : sport}, (err, disciplina) => {
            if (err) console.log(err);
            else {
                res.json(disciplina);
            }
        })
    }

}