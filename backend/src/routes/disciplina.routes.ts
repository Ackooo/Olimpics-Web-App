import express from 'express';
import { DisciplinaController } from '../controllers/disciplina.controller';

const disciplinaRouter = express.Router();

disciplinaRouter.route('/unesiDisciplinu').post(
    (req, res)=>new DisciplinaController().unesiDisciplinu(req, res)
    
);

disciplinaRouter.route('/dohvatiSveDiscipline').get(
    (req, res)=>new DisciplinaController().dohvatiSveDiscipline(req, res)
    
);

disciplinaRouter.route('/dohvatiSveDisciplineIme/').post(
    (req, res) => new DisciplinaController().dohvatiSveDisciplineIme(req, res)
    
);


// disciplinaRouter.get('/dohvatiSveDisciplineIme/:sport',  (req, res) => new DisciplinaController().dohvatiSveDisciplineIme(req, res))


export default disciplinaRouter;