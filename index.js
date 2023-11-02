const express=require ("express");
const dotenv= require ("dotenv");
dotenv.config();

const connect= require ("./utils/db");

const Queso= require("./models/queso.model");

const server= express();

connect();

server.use(express.json());
server.use(express.urlencoded({extended:false}));

const router= express.Router();

router.get("/quesos", async( req, res) =>{
    try {
        const quesos= await Queso.find();
        return res.status(200).json(quesos);
    } catch (error) {
        return res.status(400).json("Queso no encontrado");
    }
});
router.get("/quesos/:id", async (req, res) =>{
    try {
        const {id}= req.params;
        const queso= await Queso.findById(id);
        return res.status(200).json(queso);
    } catch (error) {
        return res.status(404).json("Queso no encontrado");
    }
});
router.post("/quesos", async (req, res)=>{
    try {
        const newQueso= new Queso(req.body);
        await newQueso.save();
        return res.status(201).json(newQueso);
    } catch (error) {
        return res.status(500).json("Error al crear un queso");
    }
});
router.delete("/quesos/:id", async (req,res) =>{
    try {
        const{id} =req.params;
        await Queso.findByIdAndDelete(id);
        return res.status(200).json("Queso borrado");
    } catch (error) {
        
    }
});
router.patch("/quesos/:id", async (req, res) =>{
    try {
        const {id}= req.params;
        const newQueso= new Queso (req.body);
        newQueso._id= id;
        await Queso.findByIdAndUpdate( id, newQueso);
        return res.status(200).json(newQueso);
    } catch (error) {
        return res.status(500).json("Error al modificar un queso")
    }
});
server.use("/", router);

const PORT= process.env.PORT;

server.listen (PORT, () =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});