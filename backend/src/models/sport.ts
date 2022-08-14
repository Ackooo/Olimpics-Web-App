import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

let Sport = new Schema(
{
    naziv:{
        type: String
    }


}
);

export default Mongoose.model('Sport', Sport, 'sport');