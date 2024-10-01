import { companiesModel } from "../dbManagers/models/companies.model.js";

export default class Companies {
    constructor() {
        console.log('Working with companies DB');        
    }
    getAll = async() => {
        const companies = await companiesModel.find().lean();
        return companies;
    }
    getById = async(id) => {
        const companyById = await companiesModel.findOne({ _id: id }).lean();
        return companyById;
    }
    save = async(company) => {
        const companieSaved = await companiesModel.create(company);
        return companieSaved;
    }
    eliminate = async(id) => {
        const companyDeleted = await companiesModel.findByIdAndDelete(id);
        return companyDeleted;
    }
}