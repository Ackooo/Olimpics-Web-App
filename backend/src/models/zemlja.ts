import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Zemlja = new Schema(
{
    zastava:{
        type: String
    },
    ime:{
        type: String
    },
    brojSportista:{
        type: Number
    },
    brojZ:{
        type: Number
    },
    brojS:{
        type: Number
    },
    brojB:{
        type: Number
    }

}
);

export default Mongoose.model('Zemlja', Zemlja, 'zemlja');