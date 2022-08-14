import { EkipaT } from "./ekipaT";
import { Raspored } from "./raspored";

export class Takmicenje{
    sport: String;
    disciplina: String;
    pol: String;
    datPoc: String;
    datKraj: String;
    lokacija: String;
    raspored: Array<Raspored>;
    tip: String;
    ekipe: Array<EkipaT>;
    delegat: String;
    format:String;
    formirano: Number;
    uneto:Number;
    forma:String;
}