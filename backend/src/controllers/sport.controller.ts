import express from 'express';
import Sport from '../models/sport';

export class SportController {

    pretraziSport = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Sport.find({ 'naziv': naziv }, (err, sport) => {
            if (err) console.log(err);
            else {
                res.json(sport);
            }
        })
    }

    dohvatiSveSport = (req: express.Request, res: express.Response) => {


        Sport.find({}, (err, sport) => {
            if (err) console.log(err);
            else {
                res.json(sport);
            }
        })
    }



    unesiSport = (req: express.Request, res: express.Response) => {
        let sport = new Sport(req.body);
        let naziv = req.body.naziv;

        Sport.findOne({ 'naziv': naziv }, (err, sp) => {
            if (err) console.log(err);
            else {
                if (sp) {
                    res.json({ poruka: 'sportPostoji' });
                } else {
                    sport.save().then((sport) => {
                        res.status(200).json({ poruka: 'sportDodat' })
                    }).catch((err) => {
                        res.status(400).json({ poruka: err });
                    })
                }
            }
        })
    }
}