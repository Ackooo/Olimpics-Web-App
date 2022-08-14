import express from 'express';
import { UcesnikController } from '../controllers/ucesnik.controller';

const ucesnikRouter = express.Router();

ucesnikRouter.route('/pretraziUcesnike').post(
    (req, res)=>new UcesnikController().pretraziUcesnike(req, res)
);
ucesnikRouter.route('/unesiUcesnike').post(
    (req, res)=>new UcesnikController().unesiUcesnike(req, res)
);
ucesnikRouter.route('/dodajDisciplinu').post(
    (req, res)=>new UcesnikController().dodajDisciplinu(req, res)
);
ucesnikRouter.route('/dohvatiUcesnikePoNacionalnosti').post(
    (req, res)=>new UcesnikController().dohvatiUcesnikePoNacionalnosti(req, res)
);
ucesnikRouter.route('/dohvatiUcesnikePoZemljiDisciplini').post(
    (req, res)=>new UcesnikController().dohvatiUcesnikePoZemljiDisciplini(req, res)
);
ucesnikRouter.route('/prijavaTakmicenjeZemljaDisciplina').post(
    (req, res)=>new UcesnikController().prijavaTakmicenjeZemljaDisciplina(req, res)
);
ucesnikRouter.route('/dohvatiBrojUcesnika').post(
    (req, res)=>new UcesnikController().dohvatiBrojUcesnika(req, res)
);
ucesnikRouter.route('/dohvatiBrojUcesnikaSport').post(
    (req, res)=>new UcesnikController().dohvatiBrojUcesnikaSport(req, res)
);
ucesnikRouter.route('/pretraziUcesnikeDisciplina').post(
    (req, res)=>new UcesnikController().pretraziUcesnikeDisciplina(req, res)
);
ucesnikRouter.route('/incMedalje').post(
    (req, res)=>new UcesnikController().incMedalje(req, res)
);

export default ucesnikRouter;
