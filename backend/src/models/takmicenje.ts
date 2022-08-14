import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Takmicenje = new Schema(
{
    sport:{
        type: String
    },
    disciplina:{
        type: String
    },
    pol:{
        type: String
    },
    datPoc:{
        type: String
    },
    datKraj:{
        type: String
    },
    raspored:{
        type:Array
    },
    tip:{
        type: String
    },
    ekipe:{
        type: Array
    },
    delegat:{
        type: String
    },
    format:{
        type: String
    },
    formirano:{
        type: Number
    },
    uneto:{
        type: Number
    },
    forma:{
        type:String
    }

}
);

export default Mongoose.model('Takmicenje', Takmicenje, 'takmicenje');
