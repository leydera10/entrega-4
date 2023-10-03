import { Router } from "express";
import { uploader } from "../controllers/multer.js";

const router = Router();

let products = [];

router.get("/", (req,res) => {
    res.send({status: "success", playload: products})
})

router.post("/upload", uploader.single("file"), (req,res)=> {

    if (!req.file) {
        return res.status(400).send({ status: "error", error: "no se pudo guardar la img"});
    }
    let prod = req.body;
    prod.profile = req.file.path;
    products.push(prod);
    res.send({ status: "success", message: "Imagen guardada"}) ;
})

export default router;