import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

let Ucesnik = new Schema(
    {
        ime: {
            type: String
        },
        zemlja: {
            type: String
        },
        sport: {
            type: String
        },
        disciplina: {
            type: Array
        },
        pol: {
            type: String
        },
        medalja: {
            type: Number
        },



    }
);

export default Mongoose.model('Ucesnik', Ucesnik, 'ucesnik');