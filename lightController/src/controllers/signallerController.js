import express from 'express';
import connectedSignallersRegistry from '../repository/connectedSignallersRegistry';

export default {
findAll(req, res){
    try {
        const allSignallers = connectedSignallersRegistry.findAllSignallers();
        console.log(allSignallers)
        return res.status(200).send(allSignallers);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}
}
