import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Rekord = new Schema(
{
    godina:{
        type: Number
    },
    mesto:{
        type: String
    },
    disciplina:{
        type: String
    },
    takmicar:{
        type: String
    },
    nacionalnost:{
        type: String
    },
    vrednost:{
        type: String
    }

}
);

export default Mongoose.model('Rekord', Rekord, 'rekordi');