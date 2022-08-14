import express from 'express';
import Rekord from '../models/rekord';

export class RekordController {
    dohvatiRekorde = (req: express.Request, res: express.Response) => {
        Rekord.find({}, (err, rekord) => {
            if (err) console.log(err);
            else {
                res.json(rekord);
            }
        })
    }
}


