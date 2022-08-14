"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportController = void 0;
const sport_1 = __importDefault(require("../models/sport"));
class SportController {
    constructor() {
        this.pretraziSport = (req, res) => {
            let naziv = req.body.naziv;
            sport_1.default.find({ 'naziv': naziv }, (err, sport) => {
                if (err)
                    console.log(err);
                else {
                    res.json(sport);
                }
            });
        };
        this.dohvatiSveSport = (req, res) => {
            sport_1.default.find({}, (err, sport) => {
                if (err)
                    console.log(err);
                else {
                    res.json(sport);
                }
            });
        };
        this.unesiSport = (req, res) => {
            let sport = new sport_1.default(req.body);
            let naziv = req.body.naziv;
            sport_1.default.findOne({ 'naziv': naziv }, (err, sp) => {
                if (err)
                    console.log(err);
                else {
                    if (sp) {
                        res.json({ poruka: 'sportPostoji' });
                    }
                    else {
                        sport.save().then((sport) => {
                            res.status(200).json({ poruka: 'sportDodat' });
                        }).catch((err) => {
                            res.status(400).json({ poruka: err });
                        });
                    }
                }
            });
        };
    }
}
exports.SportController = SportController;
//# sourceMappingURL=sport.controller.js.map