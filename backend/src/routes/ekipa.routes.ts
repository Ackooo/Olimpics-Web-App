import express from 'express';
import { EkipaController } from '../controllers/ekipa.controller';

const ekipaRouter = express.Router();

ekipaRouter.route('/unesiEkipu').post(
    (req, res)=>new EkipaController().unesiEkipu(req, res)
);
ekipaRouter.route('/dodajDisciplinu').post(
    (req, res)=>new EkipaController().dodajDisciplinu(req, res)
);
ekipaRouter.route('/dodajUcesnika').post(
    (req, res)=>new EkipaController().dodajUcesnika(req, res)
);
ekipaRouter.route('/dohvatiEkipePoNacionalnosti').post(
    (req, res)=>new EkipaController().dohvatiEkipePoNacionalnosti(req, res)
);
ekipaRouter.route('/prijavaTakmicenjeZemljaDisciplina').post(
    (req, res)=>new EkipaController().prijavaTakmicenjeZemljaDisciplina(req, res)
);
ekipaRouter.route('/dohvatiEkipuPoImenu').post(
    (req, res)=>new EkipaController().dohvatiEkipuPoImenu(req, res)
);


export default ekipaRouter;