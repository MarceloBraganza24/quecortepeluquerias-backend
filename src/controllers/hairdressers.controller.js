import * as hairdressersService from '../services/hairdressers.service.js';
import { HairdresserByNameExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const hairdressers = await hairdressersService.getAll();
        res.sendSuccess(hairdressers);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { hid } = req.params;            
        const hairdresser = await hairdressersService.getById(hid);
        res.sendSuccess(hairdresser);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) return res.sendClientError('incomplete values');
        const registeredHairdresser = await hairdressersService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredHairdresser);
    } catch (error) {
        if(error instanceof HairdresserByNameExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const hid = req.params.pid;            
        const hairdresser = await hairdressersService.eliminate(hid);
        res.sendSuccess(hairdresser);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    register,
    eliminate
}