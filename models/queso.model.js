const mongoose= require ("mongoose");

const QuesoShema= new mongoose.Schema(
    {
        nombre:{type: String, required: true},
        tipo_de_leche:{type: String, required: true},
        curacion:{type:String, required:true},
        zona_geografica:{type: String, required:true}
    },
    {
        timestamps:true,
    }
);

const Queso= mongoose.model("queso", QuesoShema);

module.exports= Queso;