import { Router } from "express";
import { messageModel } from "../models/messages.model.js";

const router =  Router();

router.get('/', async (req, res) => {
    try {
        let message = await messageModel.find();
        res.send({ result: "success", payload: message});
    } catch (error) {
        console.log(error);
    }

});

router.post('/', async (req, res) => {
    let { user, message} = req.body;
    if (!user || !message) {
        res.send({status: "error", error: "Missing body parms"});
    }
    let result = await messageModel.create({ user, message})
    res.send({result:"succes", payload: result});
});

router.put('/:id_msg', async (req, res) => {
    let { id_msg} = req.params;

    let messageToReplace = req.body;
    if (!messageToReplace.user|| !messageToReplace.message ) {
        res.send({status: "error", error: "Missing body parms"});
    }
    let result = await messageModel.updateOne({ _id: id_msg}, messageToReplace)
    res.send({result:"succes", payload: result})
});


router.delete('/:id_msg', async (req, res) => {
    let { id_msg } = req.params; 
    let result = await messageModel.deleteOne({ _id: id_msg });

    if (result.deletedCount === 1) {
        res.send({ result: "success", message: "Message deleted successfully" });
    } else {
        res.status(404).send({ result: "error", message: "Message not found" });
    }
});


export default router