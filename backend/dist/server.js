"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const rekord_routes_1 = __importDefault(require("./routes/rekord.routes"));
const disciplina_routes_1 = __importDefault(require("./routes/disciplina.routes"));
const zemlja_routes_1 = __importDefault(require("./routes/zemlja.routes"));
const ucesnik_routes_1 = __importDefault(require("./routes/ucesnik.routes"));
const sport_routes_1 = __importDefault(require("./routes/sport.routes"));
const takmicenje_routes_1 = __importDefault(require("./routes/takmicenje.routes"));
const ekipa_routes_1 = __importDefault(require("./routes/ekipa.routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/olimpijadaDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo uspesno otvorena konekcija');
});
const router = express_1.default.Router();
router.use('/korisnik', korisnik_routes_1.default);
router.use('/rekord', rekord_routes_1.default);
router.use('/rekordi', rekord_routes_1.default);
router.use('/disciplina', disciplina_routes_1.default);
router.use('/zemlje', zemlja_routes_1.default);
router.use('/zemlja', zemlja_routes_1.default);
router.use('/ucesnik', ucesnik_routes_1.default);
router.use('/sport', sport_routes_1.default);
router.use('/takmicenje', takmicenje_routes_1.default);
router.use('/ekipa', ekipa_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map