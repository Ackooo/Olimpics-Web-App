import express from 'express';
import { RekordController } from '../controllers/rekord.contoller';


const rekordRouter = express.Router();

rekordRouter.route('/dohvatiRekorde').get(
    (req, res)=>new RekordController().dohvatiRekorde(req, res)
);

export default rekordRouter;