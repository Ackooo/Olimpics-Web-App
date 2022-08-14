import express from 'express';
import { ZemljeController } from '../controllers/zemlja.controller';

const zemljaRouter = express.Router();

zemljaRouter.route('/dohvatiSveZemlje').get(
    (req, res)=>new ZemljeController().dohvatiSveZemlje(req, res)
);
zemljaRouter.route('/incZ').post(
    (req, res)=>new ZemljeController().incZ(req, res)
);
zemljaRouter.route('/incS').post(
    (req, res)=>new ZemljeController().incS(req, res)
);
zemljaRouter.route('/incB').post(
    (req, res)=>new ZemljeController().incB(req, res)
);
zemljaRouter.route('/incU').post(
    (req, res)=>new ZemljeController().incU(req, res)
);


export default zemljaRouter;

