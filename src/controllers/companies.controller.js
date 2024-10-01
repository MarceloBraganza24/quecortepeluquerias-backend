import * as companiesService from '../services/companies.service.js';
import { CompanyByNameExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const companies = await companiesService.getAll();
        res.sendSuccess(companies);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { cid } = req.params;            
        const company = await companiesService.getById(cid);
        res.sendSuccess(company);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) return res.sendClientError('incomplete values');
        const registeredCompany = await companiesService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredCompany);
    } catch (error) {
        if(error instanceof CompanyByNameExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const cid = req.params.pid;            
        const company = await companiesService.eliminate(cid);
        res.sendSuccess(company);
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