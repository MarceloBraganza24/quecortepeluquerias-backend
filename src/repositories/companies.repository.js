import { Companies } from '../dao/factory.js';

export default class CompaniesRepository {
    constructor() {
        this.dao = new Companies();
    }
    getAll = async() => {
        const companies = await this.dao.getAll();
        return companies;
    }
    getById = async(id) => {
        const companyById = await this.dao.getById(id);
        return companyById;
    }
    save = async(company) => {
        const companySaved = await this.dao.save(company);
        return companySaved;
    }
    eliminate = async(id) => {
        const companyDeleted = await this.dao.eliminate(id);
        return companyDeleted;
    }
}
