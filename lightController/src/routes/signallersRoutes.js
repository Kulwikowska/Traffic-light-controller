import express from 'express';
import { Router } from 'express';
import signallerController from '../controllers/signallerController';

export default () => {
    const api = Router();
    api.get("/", signallerController.findAll);
    return api;
}