import * as pricesService from '../services/prices.service.js';
import { PriceAlreadyExists, PriceByTitleExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const prices = await pricesService.getAll();
        res.sendSuccess(prices);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { pid } = req.params;            
        const price = await pricesService.getById(pid);
        res.sendSuccess(price);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { title, value } = req.body;
        if(!title || !value) return res.sendClientError('incomplete values');
        const registeredPrice = await pricesService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredPrice);
    } catch (error) {
        if(error instanceof PriceByTitleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const update = async (req, res) => {
    try {
        const pid = req.params.pid;
        const priceOfToUpdate = {
            title: req.body.title,
            value: req.body.value,
        }
        const priceUpdated = await pricesService.update(pid, priceOfToUpdate)
        res.sendSuccess(priceUpdated);
    } catch (error) {
        if(error instanceof PriceAlreadyExists || error instanceof PriceByTitleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const pid = req.params.pid;            
        const price = await pricesService.eliminate(pid);
        res.sendSuccess(price);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}