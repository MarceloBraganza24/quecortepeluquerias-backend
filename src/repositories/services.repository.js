import { Services } from '../dao/factory.js';

export default class ServicesRepository {
    constructor() {
        this.dao = new Services();
    }
    getAll = async() => {
        const services = await this.dao.getAll();
        return services;
    }
    getById = async(hid) => {
        const serviceById = await this.dao.getById(hid);
        return serviceById;
    }
    save = async(service) => {
        const serviceSaved = await this.dao.save(service);
        return serviceSaved;
    }
    update = async(id, serviceToUpdate) => {
        const serviceUpdated = await this.dao.update(id, serviceToUpdate);
        return serviceUpdated;
    }
    eliminate = async(id) => {
        const serviceDeleted = await this.dao.eliminate(id);
        return serviceDeleted;
    }
}

