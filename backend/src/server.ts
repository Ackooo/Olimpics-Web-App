import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import rekordRouter from './routes/rekord.routes';
import disciplinaRouter from './routes/disciplina.routes';
import zemljaRouter from './routes/zemlja.routes';
import ucesnikRouter from './routes/ucesnik.routes';
import sportRouter from './routes/sport.routes';
import takmicenjeRouter from './routes/takmicenje.routes';
import ekipaRouter from './routes/ekipa.routes';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/olimpijadaDB');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo uspesno otvorena konekcija')
});

const router = express.Router();
router.use('/korisnik', korisnikRouter)
router.use('/rekord', rekordRouter)
router.use('/rekordi', rekordRouter)
router.use('/disciplina', disciplinaRouter)
router.use('/zemlje', zemljaRouter)
router.use('/zemlja', zemljaRouter)
router.use('/ucesnik', ucesnikRouter)
router.use('/sport', sportRouter)
router.use('/takmicenje', takmicenjeRouter)
router.use('/ekipa', ekipaRouter)


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));