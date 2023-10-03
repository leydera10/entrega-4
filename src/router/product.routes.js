import { Router } from "express";
import { productsModel } from "../models/products.model.js";

const router =  Router();

router.get('/', async (req, res) => {
    try {
        let products = await productsModel.find();
        res.send({ result: "success", payload: products});
    } catch (error) {
        console.log(error);
    }

});

router.post('/', async (req, res) => {
    let { description, img, Price, Stock} = req.body;
    if (!description || !img ||!Price ||!Stock) {
        res.send({status: "error", error: "Missing body parms"});
    }
    let result = await productsModel.create({ user, products})
    res.send({result:"succes", payload: result});
});

router.put('/:id_prod', async (req, res) => {
    let { id_prod} = req.params;

    let productsToReplace = req.body;
    if (!productsToReplace.description || !productsToReplace.img || !productsToReplace.Price || !productsToReplace.Stock ) {
        res.send({status: "error", error: "Missing body parms"});
    }
    let result = await messageModel.updateOne({ _id: id_prod}, productsToReplace)
    res.send({result:"succes", payload: result})
});


router.delete('/:id_prod', async (req, res) => {
    let { id_prod } = req.params; // Obtén el ID del producto desde req.params
    let result = await productsModel.deleteOne({ _id: id_prod });

    if (result.deletedCount === 1) {
        res.send({ result: "success", message: "Product deleted successfully" });
    } else {
        res.status(404).send({ result: "error", message: "Product not found" });
    }
});


export default router