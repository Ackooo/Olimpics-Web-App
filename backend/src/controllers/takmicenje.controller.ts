import express from 'express';
import Takmicenje from '../models/takmicenje';

export class takmicenjeController {
    unesiTakmicenje = (req: express.Request, res: express.Response) => {
        let takmicenje = new Takmicenje(req.body);
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.findOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, (err, tak) => {
            if (err) console.log(err);
            else {
                if (tak) {
                    res.json({ poruka: 'takmPostoji' });
                } else {
                    takmicenje.save().then((takm) => {
                        res.status(200).json({ poruka: 'takmDodato' })
                    }).catch((err) => {
                        res.status(400).json({ poruka: err });
                    })
                }
            }
        })
    }

    formirajTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, { $set: { 'formirano': 1 } });
        res.json({ poruka: 'ok' });
    }
    takm10 = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Takmicenje.collection.updateOne({ 'sport': sport, 'disciplina': disciplina, 'pol': pol }, { $set: { uneto: 10 } });
        res.json({ poruka: 'ok' });
    }

    dohvatiSveFormiranje = (req: express.Request, res: express.Response) => {
        Takmicenje.find({ 'formirano': 0 }, (err, takm) => {
            if (err) console.log(err);
            else {
                res.json(takm);
            }
        })
    }
    dohvatiSveDelegat = (req: express.Request, res: express.Response) => {
        let delegat = req.body.delegat;

        Takmicenje.find({ delegat: delegat, formirano: 1, uneto: { $lt: 10 } }, (err, takm) => {
            if (err) console.log(err);
            else {
                res.json(takm);
            }
        })
    }

    unesiEkipu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let form = req.body.form;
        let uneto;
        let brojId = req.body.brojId;
        console.log("brojId")
        console.log(brojId)

        if (form == "g") uneto = 0;
        if (form == "qf") uneto = 5;
        if (form == "sf") uneto = 6;
        if (form == "f") uneto = 7;

        let ek = {
            id: brojId,
            ime: ime,
            rezultat: 0,
            razlika: 0,
            grupa: "",
            uneto: uneto,
            finalno: ""
        }

        Takmicenje.findOne({ sport: sport, disciplina: disciplina, pol: pol, ekipe: { $elemMatch: { ime: ime } } }, (err, ekp) => {
            if (err) console.log(err);
            else {
                if (ekp) {
                    res.json({ poruka: "ekVecDodata" });
                } else {
                    Takmicenje.collection.updateOne({ sport: sport, disciplina: disciplina, pol: pol }, { $push: { ekipe: ek } });
                    res.json({ poruka: 'ekipaDodata' });
                }
            }
        })




    }

    odbaciEkipu = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let ime = req.body.ime;

        let query: any = {};
        query.sport = sport;
        query.disciplina = disciplina;
        query.pol = pol;
        query.ekipe = { $elemMatch: { ime: ime } };

        Takmicenje.findOneAndUpdate(query, { $pull: { ekipe: { ime: ime } } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) { res.json({ poruka: "ok" }); console.log("jeste") } else console.log("greskaOdbacilo");
            }
        })
    }
    unesiRaspored = (req: express.Request, res: express.Response) => {
        let format = req.body.format;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let lokacija = req.body.lokacija;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let query: any = {};
        query.raspored = { $elemMatch: { datum: datum, lokacija: lokacija, vreme:vreme } };


        Takmicenje.findOne(query, (err, tak) => {
            if (err) console.log(err);
            else {
                if (tak) {
                    res.json({ poruka: "vecima" });
                } else {
                    let query2: any = {};
                    query2.sport = sport;
                    query2.disciplina = disciplina;
                    query2.pol = pol;
                    query2.raspored = { $elemMatch: { format: format } };


                    Takmicenje.findOne(query2, (err, tak2) => {
                        if (err) console.log(err);
                        else {
                            if (tak2) {
                                res.json({ poruka: "vecpopunio" });
                            } else {
                                let ras = {
                                    format: format,
                                    datum: datum,
                                    vreme: vreme,
                                    lokacija: lokacija
                                }
                                Takmicenje.collection.updateOne({ sport: sport, disciplina: disciplina, pol: pol }, { $push: { 'raspored': ras } });
                                res.json({ poruka: 'rasDodat' });
                            }
                        }
                    })
                }
            }
        })
    }
    unesiRezG = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let uneto = req.body.uneto;

        let nizIme = req.body.nizIme;
        let nizRez = req.body.nizRez;

        let bod = [];
        let razl = [];

        //   if (nizRez[0] > nizRez[1]) { bod.push(2); bod.push(1); razl.push(nizRez[0] - nizRez[1]); razl.push(nizRez[1] - nizRez[0]); };
        //    console.log(nizRez[0], nizRez[1], bod[0], bod[1], bod[2], razl[0], razl[1], razl[2])

        if (nizRez[0] > nizRez[1]) { bod.push(2); bod.push(1); razl.push(nizRez[0] - nizRez[1]); razl.push(nizRez[1] - nizRez[0]); } else { bod.push(1); bod.push(2); razl.push(nizRez[0] - nizRez[1]); razl.push(nizRez[2] - nizRez[1]); };
        if (nizRez[2] > nizRez[3]) { bod.push(2); bod.push(1); razl.push(nizRez[2] - nizRez[3]); razl.push(nizRez[3] - nizRez[2]); } else { bod.push(1); bod.push(2); razl.push(nizRez[2] - nizRez[3]); razl.push(nizRez[4] - nizRez[3]); };
        if (nizRez[4] > nizRez[5]) { bod.push(2); bod.push(1); razl.push(nizRez[4] - nizRez[5]); razl.push(nizRez[5] - nizRez[4]); } else { bod.push(1); bod.push(2); razl.push(nizRez[4] - nizRez[5]); razl.push(nizRez[6] - nizRez[5]); };
        if (nizRez[6] > nizRez[7]) { bod.push(2); bod.push(1); razl.push(nizRez[6] - nizRez[7]); razl.push(nizRez[7] - nizRez[6]); } else { bod.push(1); bod.push(2); razl.push(nizRez[6] - nizRez[7]); razl.push(nizRez[8] - nizRez[7]); };
        if (nizRez[8] > nizRez[9]) { bod.push(2); bod.push(1); razl.push(nizRez[8] - nizRez[9]); razl.push(nizRez[9] - nizRez[8]); } else { bod.push(1); bod.push(2); razl.push(nizRez[8] - nizRez[9]); razl.push(nizRez[10] - nizRez[9]); };
        if (nizRez[10] > nizRez[11]) { bod.push(2); bod.push(1); razl.push(nizRez[10] - nizRez[11]); razl.push(nizRez[11] - nizRez[10]); } else { bod.push(1); bod.push(2); razl.push(nizRez[10] - nizRez[11]); razl.push(nizRez[12] - nizRez[11]); };

        let k = 12;

        while (k--) {
            let query: any = {};
            query.sport = sport;
            query.disciplina = disciplina;
            query.pol = pol;
            query.ekipe = { $elemMatch: { ime: nizIme[k] } };
            let rez = parseInt(nizRez[k]);

            Takmicenje.findOneAndUpdate(query, { $inc: { "ekipe.$.rezultat": bod[k], "ekipe.$.razlika": razl[k] } }, (err, pod) => {
                if (err) console.log(err);
                else {
                    //  if (pod) console.log(pod); //else console.log("nis");
                }
            })
        }
        //end while
        Takmicenje.findOneAndUpdate({ sport: sport, disciplina: disciplina, pol: pol }, { $inc: { uneto: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) {

                }; //else console.log("nis");
            }
        })


        if (uneto == 4) {
            res.json({ poruka: "ok4" });
            // console.log("uslo")
        }





    }
    promoteG = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let nizIme = req.body.nizIme;
        let nizIme2 = req.body.nizIme2;

        //console.log(sport, disciplina, pol, nizIme);

        let niz = ["qf1", "qf2", "qf3", "qf4", "qf4", "qf3", "qf2", "qf1"];
        let k = 8;
        while (k--) {
            let query: any = {};
            query.sport = sport;
            query.disciplina = disciplina;
            query.pol = pol;
            query.ekipe = { $elemMatch: { ime: nizIme[k] } };

            Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.grupa": niz[k], "ekipe.$.rezultat": 0, "ekipe.$.razlika": 0 } }, (err, tak) => {
                if (err) console.log(err);
                else {
                    if (tak) {
                        // console.log("proslo")
                        // res.json({ poruka: "ok" });
                    } else console.log("nije proslo");
                }

            });
        }
        res.json({ poruka: "ok" });

    }
    updateRezGrupaQ = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let query: any = {};
        query.sport = sport;
        query.disciplina = disciplina;
        query.pol = pol;
        query.ekipe = { $elemMatch: { grupa: "g1" } };

        let query2: any = {};
        query2.sport = sport;
        query2.disciplina = disciplina;
        query2.pol = pol;
        query2.ekipe = { $elemMatch: { grupa: "g2" } };

        //{ $pull: { $or: [{ "ekipe.$.grupa": "g1" }, { "ekipe.$.grupa": "g2" }] }}

        // console.log(sport, disciplina, pol);

        Takmicenje.findOneAndUpdate(query, { $pull: { ekipe: { grupa: "g1" } } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) {
                    Takmicenje.findOneAndUpdate(query2, { $pull: { ekipe: { grupa: "g2" } } }, (err, pod) => {
                        if (err) console.log(err); else {
                            if (pod) {
                                // console.log("uspelo");
                                res.json({ poruka: "ok" });
                            } else console.log("nije");
                        }

                    })


                } else console.log("nije");
            }
        })
    }
    dohvatiTakmicenje = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.findOne({ sport: sport, disciplina: disciplina, pol: pol }, (err, tak) => {
            if (err) console.log(err);
            else {
                if (tak) {
                    res.json(tak);
                } else {
                    // console.log("unesiRezG greska")
                }
            }
        })

    }
    unesiRezQ = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let uneto = req.body.uneto;

        let nizIme = req.body.nizIme;
        let nizRez = req.body.nizRez;

        console.log(sport, disciplina, pol, nizIme, nizRez)

        let maxqf1;
        let maxqf2;
        let maxqf3;
        let maxqf4;

        if (nizRez[0] > nizRez[1]) { maxqf1 = nizIme[0] } else { maxqf1 = nizIme[1] };
        if (nizRez[2] > nizRez[3]) { maxqf2 = nizIme[2] } else { maxqf2 = nizIme[3] };
        if (nizRez[4] > nizRez[5]) { maxqf3 = nizIme[4] } else { maxqf3 = nizIme[5] };
        if (nizRez[6] > nizRez[7]) { maxqf4 = nizIme[6] } else { maxqf4 = nizIme[7] };

        let k = 8;
        while (k--) {
            let query: any = {};
            query.sport = sport;
            query.disciplina = disciplina;
            query.pol = pol;
            query.ekipe = { $elemMatch: { ime: nizIme[k] } };
            let rez = parseInt(nizRez[k]);

            Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.rezultat": rez } }, (err, pod) => {
                if (err) console.log(err);
                else {
                    if (pod) console.log("Q0"); else console.log("nQ0");
                }
            })
        }
        //end while


        Takmicenje.findOneAndUpdate({ sport: sport, disciplina: disciplina, pol: pol }, { $inc: { uneto: 1 } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) console.log("Q6"); else console.log("nQ6");
            }
        })

        res.json({ poruka: "ok", maxqf1: maxqf1, maxqf2: maxqf2, maxqf3: maxqf3, maxqf4: maxqf4 });

    }
    promoteQ = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let maxqf1 = req.body.maxqf1;
        let maxqf2 = req.body.maxqf2;
        let maxqf3 = req.body.maxqf3;
        let maxqf4 = req.body.maxqf4;

        //4 idu dalje
        let query2: any = {};
        query2.sport = sport;
        query2.disciplina = disciplina;
        query2.pol = pol;
        query2.ekipe = { $elemMatch: { ime: maxqf1 } };

        Takmicenje.findOneAndUpdate(query2, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "sf1" } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) {
                    console.log("Q1");
                    let query3: any = {};
                    query3.sport = sport;
                    query3.disciplina = disciplina;
                    query3.pol = pol;
                    query3.ekipe = { $elemMatch: { ime: maxqf2 } };

                    Takmicenje.findOneAndUpdate(query3, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "sf1" } }, (err, pod) => {
                        if (err) console.log(err);
                        else {
                            if (pod) {
                                console.log("Q2");


                                let query4: any = {};
                                query4.sport = sport;
                                query4.disciplina = disciplina;
                                query4.pol = pol;
                                query4.ekipe = { $elemMatch: { ime: maxqf3 } };

                                Takmicenje.findOneAndUpdate(query4, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "sf2" } }, (err, pod) => {
                                    if (err) console.log(err);
                                    else {
                                        if (pod) {
                                            console.log("Q3");


                                            let query5: any = {};
                                            query5.sport = sport;
                                            query5.disciplina = disciplina;
                                            query5.pol = pol;
                                            query5.ekipe = { $elemMatch: { ime: maxqf4 } };

                                            Takmicenje.findOneAndUpdate(query5, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "sf2" } }, (err, pod) => {
                                                if (err) console.log(err);
                                                else {
                                                    if (pod) {
                                                        console.log("Q4");

                                                        res.json({ poruka: "ok" });

                                                    } else console.log("nQ4");
                                                }
                                            })
                                        } else console.log("nQ3");
                                    }
                                })
                            } else console.log("nQ2");
                        }
                    })


                } else console.log("nQ1");
            }
        })





    }
    updateRezQS = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let query: any = {};
        query.sport = sport;
        query.disciplina = disciplina;
        query.pol = pol;
        query.ekipe = { $elemMatch: { grupa: "qf1" } };

        let query2: any = {};
        query2.sport = sport;
        query2.disciplina = disciplina;
        query2.pol = pol;
        query2.ekipe = { $elemMatch: { grupa: "qf2" } };

        let query3: any = {};
        query3.sport = sport;
        query3.disciplina = disciplina;
        query3.pol = pol;
        query3.ekipe = { $elemMatch: { grupa: "qf3" } };

        let query4: any = {};
        query4.sport = sport;
        query4.disciplina = disciplina;
        query4.pol = pol;
        query4.ekipe = { $elemMatch: { grupa: "qf4" } };

        Takmicenje.findOneAndUpdate(query, { $pull: { ekipe: { grupa: "qf1" } } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) {
                    Takmicenje.findOneAndUpdate(query2, { $pull: { ekipe: { grupa: "qf2" } } }, (err, pod) => {
                        if (err) console.log(err); else {
                            if (pod) {
                                Takmicenje.findOneAndUpdate(query3, { $pull: { ekipe: { grupa: "qf3" } } }, (err, pod) => {
                                    if (err) console.log(err); else {
                                        if (pod) {
                                            Takmicenje.findOneAndUpdate(query4, { $pull: { ekipe: { grupa: "qf4" } } }, (err, pod) => {
                                                if (err) console.log(err); else {
                                                    if (pod) res.json({ poruka: "ok" }); else console.log("nije4");

                                                }
                                            })
                                        } else console.log("nije3");
                                    }
                                })
                            } else console.log("nije2");
                        }

                    })
                } else console.log("nije1");
            }
        })
    }
    unesiRezS = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let uneto = req.body.uneto;

        let nizIme = req.body.nizIme;
        let nizRez = req.body.nizRez;

        let maxqf1;
        let maxqf2;
        let minqf1;
        let minqf2;

        if (nizRez[0] > nizRez[1]) { maxqf1 = nizIme[0]; minqf1 = nizIme[1] } else { maxqf1 = nizIme[1]; minqf1 = nizIme[0] };
        if (nizRez[2] > nizRez[3]) { maxqf2 = nizIme[2]; minqf2 = nizIme[3] } else { maxqf2 = nizIme[3]; minqf2 = nizIme[2] };

        let k = 4;
        while (k--) {
            let query: any = {};
            query.sport = sport;
            query.disciplina = disciplina;
            query.pol = pol;
            query.ekipe = { $elemMatch: { ime: nizIme[k] } };
            let rez = parseInt(nizRez[k]);



            Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.rezultat": rez } }, (err, pod) => {
                if (err) console.log(err);
                else {
                    //   if (pod) console.log(pod); else console.log("nis");
                }
            })
        }
        //end while
        Takmicenje.findOneAndUpdate({ sport: sport, disciplina: disciplina, pol: pol }, { $set: { uneto: 7 } }, (err, pod) => {
            if (err) console.log(err);
            else {
                // if (pod) console.log(pod); else console.log("nis");
            }
        })
        res.json({ poruka: "ok", maxqf1: maxqf1, maxqf2: maxqf2, minqf1: minqf1, minqf2: minqf2 });
    }
    promoteS = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let maxqf1 = req.body.maxqf1;
        let maxqf2 = req.body.maxqf2;
        let minqf1 = req.body.minqf1;
        let minqf2 = req.body.minqf2;


        let query2: any = {};
        query2.sport = sport;
        query2.disciplina = disciplina;
        query2.pol = pol;
        query2.ekipe = { $elemMatch: { ime: maxqf1 } };

        Takmicenje.findOneAndUpdate(query2, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "f" } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) console.log("S1"); else console.log("nS1");
            }
        })

        let query3: any = {};
        query3.sport = sport;
        query3.disciplina = disciplina;
        query3.pol = pol;
        query3.ekipe = { $elemMatch: { ime: maxqf2 } };

        Takmicenje.findOneAndUpdate(query3, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "f" } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) console.log("S2"); else console.log("nS2");
            }
        })

        let query4: any = {};
        query4.sport = sport;
        query4.disciplina = disciplina;
        query4.pol = pol;
        query4.ekipe = { $elemMatch: { ime: minqf1 } };

        Takmicenje.findOneAndUpdate(query4, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "3f" } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) console.log("S3"); else console.log("nS3");
            }
        })

        let query5: any = {};
        query5.sport = sport;
        query5.disciplina = disciplina;
        query5.pol = pol;
        query5.ekipe = { $elemMatch: { ime: minqf2 } };

        Takmicenje.findOneAndUpdate(query5, { $set: { "ekipe.$.rezultat": 0, "ekipe.$.grupa": "3f" } }, (err, pod) => {
            if (err) console.log(err);
            else {
                if (pod) console.log("S4"); else console.log("nS4");
            }
        })
        res.json({ poruka: "ok" });
    }
    unesiRezF = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let uneto = req.body.uneto;
        let e1 = req.body.e1;
        let r1 = req.body.r1;
        let query: any = {};
        let query2: any = {};
        let query3: any = {};
        query.sport = sport;
        query.disciplina = disciplina;
        query.pol = pol;
        query.ekipe = { $elemMatch: { ime: e1 } };
        query2.sport = sport;
        query2.disciplina = disciplina;
        query2.pol = pol;
        query2.ekipe = { $elemMatch: { ime: e1, finalno: "" } };
        query3.sport = sport;
        query3.disciplina = disciplina;
        query3.pol = pol;
        query3.ekipe = { $elemMatch: { finalno: "" } };

        Takmicenje.findOne(query3, (err, takm) => {
            if (err) console.log(err);
            else {
                if (takm) {
                    Takmicenje.findOne(query2, (err, tak) => {
                        if (err) console.log(err);
                        else {
                            if (tak) {
                                Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.finalno": r1 } }, (err, pod) => {
                                    if (err) console.log(err);
                                    else {
                                        if (pod) res.json({ poruka: "ok" }); else console.log("nis");
                                    }
                                })
                            }
                            else {
                                res.json({ poruka: 'vecUneto' });
                            }
                        }
                    })
                } else {
                    res.json({ poruka: 'gotovo' });
                }
            }
        })
    }
    pokreniAlgoritam = (req: express.Request, res: express.Response) => {
        let format = req.body.format;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        console.log(format, sport, disciplina, pol);
        if (format == 'g') {
            let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            let ranNums = [];
            let i = nums.length;
            let j = 0;
            while (i--) {
                j = Math.floor(Math.random() * (i + 1));
                ranNums.push(nums[j]);
                nums.splice(j, 1);
            }
            let k = 12;
            while (k--) {
                let l = ranNums[k];
                let z = l % 2;
                let query: any = {};
                query.sport = sport;
                query.disciplina = disciplina;
                query.pol = pol;
                //query.ekipe = { $elemMatch: { id: k } };
                query.ekipe = { $elemMatch: { grupa: "" } };
                if (z == 1) {
                    Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.grupa": "g1" } }, (err, pod) => {
                        if (err) console.log(err);
                        else {
                            // if (pod) console.log(pod); else console.log("nis");
                        }
                    })
                } else if (z == 0) {
                    Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.grupa": "g2" } }, (err, pod) => {
                        if (err) console.log(err);
                        else {
                            //   if (pod) console.log(pod); else console.log("nis");
                        }
                    })
                }
                //res.json({ poruka: 'rasDodat' });
            }
        }
        if (format == 'qf') {
            let nums = ['qf1', 'qf1', 'qf2', 'qf2', 'qf3', 'qf3', 'qf4', 'qf4'];
            let ranNums = [];
            let i = nums.length;
            let j = 0;
            while (i--) {
                j = Math.floor(Math.random() * (i + 1));
                ranNums.push(nums[j]);
                nums.splice(j, 1);
            }
            let k = 8;
            while (k--) {
                let l = ranNums[k];
                let query: any = {};
                query.sport = sport;
                query.disciplina = disciplina;
                query.pol = pol;
                query.ekipe = { $elemMatch: { id: k } };

                Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.grupa": l } }, (err, pod) => {
                    if (err) console.log(err);
                    else {
                        // if (pod) console.log(pod); else console.log("nis");
                    }
                })
                //res.json({ poruka: 'rasDodat' });
            }
        }
        if (format == 'sf') {
            let nums = ['sf1', 'sf1', 'sf2', 'sf2'];
            let ranNums = [];
            let i = nums.length;
            let j = 0;
            while (i--) {
                j = Math.floor(Math.random() * (i + 1));
                ranNums.push(nums[j]);
                nums.splice(j, 1);
            }
            let k = 4;
            while (k--) {
                let l = ranNums[k];
                let query: any = {};
                query.sport = sport;
                query.disciplina = disciplina;
                query.pol = pol;
                query.ekipe = { $elemMatch: { id: k } };

                Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.grupa": l } }, (err, pod) => {
                    if (err) console.log(err);
                    else {
                        // if (pod) console.log(pod); else console.log("nis");
                    }
                })
                //res.json({ poruka: 'rasDodat' });
            }
        }
        if (format == 'f') {
            let k = 8;
            while (k--) {
                let query: any = {};
                query.sport = sport;
                query.disciplina = disciplina;
                query.pol = pol;
                query.ekipe = { $elemMatch: { id: k } };

                Takmicenje.findOneAndUpdate(query, { $set: { "ekipe.$.grupa": "f" } }, (err, pod) => {
                    if (err) console.log(err);
                    else {
                        // if (pod) console.log(pod); else console.log("nis");
                    }
                })
                //res.json({ poruka: 'rasDodat' });
            }
        }
    }

}

