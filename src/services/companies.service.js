import CompaniesRepository from '../repositories/companies.repository.js';
import { CompanyByNameExists } from '../utils/custom.exceptions.js';

const companiesManager = new CompaniesRepository();

const getAll = async () => {
    const companies = await companiesManager.getAll();
    return companies;
}
const getById = async (id) => {
    const company = await companiesManager.getById(id);
    return company;
}
const register = async(company) => {
    const companies = await companiesManager.getAll();
    const companyByNameExists = companies.find(item => item.name === company.name)
    if(companyByNameExists) {
        throw new CompanyByNameExists('There is already a company with that name');
    }
    const result = await companiesManager.save(company);
    return result;
}
const eliminate = async (id) => {
    const company = await companiesManager.eliminate(id);
    return company;
}

export {
    getAll,
    getById,
    register,
    eliminate
}