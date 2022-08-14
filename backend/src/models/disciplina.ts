import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Disciplina = new Schema(
{
    naziv:{
        type: String
    },
    sport:{
        type: String
    },
    vrsta:{
        type: String
    },
    format:{
        type: String
    }   

}
);

export default Mongoose.model('Disciplina', Disciplina, 'disciplina');