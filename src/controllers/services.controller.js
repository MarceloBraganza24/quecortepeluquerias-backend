import * as servicesService from '../services/services.service.js';
import { ServicesByTitleExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const services = await servicesService.getAll();
        res.sendSuccess(services);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { sid } = req.params;            
        const service = await servicesService.getById(sid);
        res.sendSuccess(service);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { title, value, category } = req.body;
        if(!title || !value || !category) return res.sendClientError('incomplete values');
        const registeredService = await servicesService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredService);
    } catch (error) {
        if(error instanceof ServicesByTitleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const update = async (req, res) => {
    try {
        const sid = req.params.sid;
        const service = {
            title: req.body.title,
            value: req.body.value
        }
        const serviceUpdated = await servicesService.update(sid, service)
        res.sendSuccess(serviceUpdated);
    } catch (error) {
        if(error instanceof ServicesByTitleExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const sid = req.params.sid;            
        const service = await servicesService.eliminate(sid);
        res.sendSuccess(service);
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