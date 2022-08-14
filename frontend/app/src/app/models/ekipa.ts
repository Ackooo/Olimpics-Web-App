import { Disciplina } from "./disciplina";
import { Ucesnik } from "./ucesnik";

export class Ekipa{
    naziv: String;
    ucesnik: Ucesnik[];
    pol: String;
    sport: String;
    disciplina: String;
    nacionalnost: String;
    umin:Number;
    umax:Number;
}