import express from 'express';
import { takmicenjeController } from '../controllers/takmicenje.controller';

const takmicenjeRouter = express.Router();

takmicenjeRouter.route('/unesiTakmicenje').post(
    (req, res)=>new takmicenjeController().unesiTakmicenje(req, res)
);
takmicenjeRouter.route('/formirajTakmicenje').post(
    (req, res)=>new takmicenjeController().formirajTakmicenje(req, res)
);
takmicenjeRouter.route('/dohvatiSveFormiranje').get(
    (req, res)=>new takmicenjeController().dohvatiSveFormiranje(req, res)
);
takmicenjeRouter.route('/unesiEkipu').post(
    (req, res)=>new takmicenjeController().unesiEkipu(req, res)
);
takmicenjeRouter.route('/odbaciEkipu').post(
    (req, res)=>new takmicenjeController().odbaciEkipu(req, res)
);
takmicenjeRouter.route('/dohvatiSveDelegat').post(
    (req, res)=>new takmicenjeController().dohvatiSveDelegat(req, res)
);
takmicenjeRouter.route('/unesiRaspored').post(
    (req, res)=>new takmicenjeController().unesiRaspored(req, res)
);
takmicenjeRouter.route('/pokreniAlgoritam').post(
    (req, res)=>new takmicenjeController().pokreniAlgoritam(req, res)
);
takmicenjeRouter.route('/unesiRezG').post(
    (req, res)=>new takmicenjeController().unesiRezG(req, res)
);
takmicenjeRouter.route('/unesiRezQ').post(
    (req, res)=>new takmicenjeController().unesiRezQ(req, res)
);
takmicenjeRouter.route('/unesiRezS').post(
    (req, res)=>new takmicenjeController().unesiRezS(req, res)
);
takmicenjeRouter.route('/unesiRezF').post(
    (req, res)=>new takmicenjeController().unesiRezF(req, res)
);
takmicenjeRouter.route('/promoteG').post(
    (req, res)=>new takmicenjeController().promoteG(req, res)
);
takmicenjeRouter.route('/promoteQ').post(
    (req, res)=>new takmicenjeController().promoteQ(req, res)
);
takmicenjeRouter.route('/promoteS').post(
    (req, res)=>new takmicenjeController().promoteS(req, res)
);
takmicenjeRouter.route('/updateRezGrupaQ').post(
    (req, res)=>new takmicenjeController().updateRezGrupaQ(req, res)
);
takmicenjeRouter.route('/updateRezQS').post(
    (req, res)=>new takmicenjeController().updateRezQS(req, res)
);
takmicenjeRouter.route('/dohvatiTakmicenje').post(
    (req, res)=>new takmicenjeController().dohvatiTakmicenje(req, res)
);
takmicenjeRouter.route('/takm10').post(
    (req, res)=>new takmicenjeController().takm10(req, res)
);



export default takmicenjeRouter;


