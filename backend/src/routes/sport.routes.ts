import express from 'express';
import { SportController } from '../controllers/sport.controller';
const sportRouter = express.Router();

sportRouter.route('/pretraziSport').get(
    (req, res)=>new SportController().pretraziSport(req, res)
)

sportRouter.route('/dohvatiSveSport').get(
    (req, res)=>new SportController().dohvatiSveSport(req, res)
)

sportRouter.route('/unesiSport').post(
    (req, res)=>new SportController().unesiSport(req, res)
)


export default sportRouter;