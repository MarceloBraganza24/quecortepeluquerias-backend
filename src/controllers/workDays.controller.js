import * as workDaysService from '../services/workDays.service.js';
import { WorkDayExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const workDays = await workDaysService.getAll();
        res.sendSuccess(workDays);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { wid } = req.params;            
        const workDay = await workDaysService.getById(wid);
        res.sendSuccess(workDay);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { hairdresser,work_day,schedule } = req.body;
        if(!hairdresser || !work_day || !schedule) return res.sendClientError('incomplete values');
        const registeredWorkDay = await workDaysService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredWorkDay);
    } catch (error) {
        if(error instanceof WorkDayExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const wid = req.params.pid;            
        const workDay = await workDaysService.eliminate(wid);
        res.sendSuccess(workDay);
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