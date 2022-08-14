import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Ekipa = new Schema(
{
    naziv:{
        type: String
    },
    ucesnik:{
        type: Array
    },
    pol:{
        type: String
    },
    sport:{
        type: String
    },
    disciplina:{
        type: String
    },
    nacionalnost:{
        type: String
    },
    umin:{
        type:Number
    },
    umax:{
        type:Number
    }

}
);

export default Mongoose.model('Ekipa', Ekipa, 'ekipa');
