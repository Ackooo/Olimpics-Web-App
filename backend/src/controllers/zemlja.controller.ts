import express from 'express';
import Zemlja from '../models/zemlja';

export class ZemljeController {

    dohvatiSveZemlje = (req: express.Request, res: express.Response) => {
        Zemlja.find({}, (err, zemlja) => {
            if (err) console.log(err);
            else {
                res.json(zemlja);
            }
        })
    }
    incZ = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        Zemlja.findOneAndUpdate({ ime: ime }, { $inc: { brojZ: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else{
                if(pod) res.json({ poruka: 'ok' });
            }
        })
    }
    incS = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        Zemlja.findOneAndUpdate({ ime: ime }, { $inc: { brojS: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else{
                if(pod) res.json({ poruka: 'ok' });
            }
        })
    }
    incB = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        Zemlja.findOneAndUpdate({ ime: ime }, { $inc: { brojB: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else{
                if(pod) res.json({ poruka: 'ok' });
            }
        })
    }
    incU = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        Zemlja.findOneAndUpdate({ ime: ime }, { $inc: { brojSportista: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else{
                if(pod) res.json({ poruka: 'ok' });
            }
        })
    }


}