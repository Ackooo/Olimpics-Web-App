import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Korisnik = new Schema(
{
    korIme:{
        type: String
    },
    lozinka:{
        type: String
    },
    ime:{
        type: String
    },
    prezime:{
        type: String
    },
    nacionalnost:{
        type: String
    },
    Eadresa:{
        type: String
    },
    tip:{
        type: String
    },
    odobren:{
        type: Number
    },
    brojd:{
        type:Number
    }

}
);

export default Mongoose.model('Korisnik', Korisnik, 'korisnik');