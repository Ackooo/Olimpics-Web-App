import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';
const korisnikRouter = express.Router();

korisnikRouter.route('/login').post(
    (req, res)=>new KorisnikController().login(req, res)
);

korisnikRouter.route('/register').post(
    (req, res)=>new KorisnikController().register(req, res)
);

korisnikRouter.route('/promeniLozinku').post(
    (req, res)=>new KorisnikController().promeniLozinku(req,res)
)

korisnikRouter.route('/dohvatiSveKorisnike').get(
    (req, res)=>new KorisnikController().dohvatiSveKorisnike(req, res)
);

korisnikRouter.route('/odobriKorisnika').post(
    (req, res)=>new KorisnikController().odobriKorisnika(req,res)
)

korisnikRouter.route('/obrisiKorisnika').post(
    (req, res)=>new KorisnikController().obrisiKorisnika(req,res)
)
korisnikRouter.route('/delegatTakmicenje').post(
    (req, res)=>new KorisnikController().delegatTakmicenje(req,res)
)
korisnikRouter.route('/dohvatiSveDelegate').get(
    (req, res)=>new KorisnikController().dohvatiSveDelegate(req, res)
);

export default korisnikRouter;