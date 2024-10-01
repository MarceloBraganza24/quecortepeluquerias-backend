import ServicesRepository from '../repositories/services.repository.js';
import { ServicesByTitleExists } from '../utils/custom.exceptions.js';

const servicesManager = new ServicesRepository();

const getAll = async () => {
    const services = await servicesManager.getAll();
    return services;
}
const getById = async (id) => {
    const service = await servicesManager.getById(id);
    return service;
}
const register = async(service) => {
    const services = await servicesManager.getAll();
    const servicesByTitleExists = services.find(item => item.title == service.title && item.category == service.category)
    if(servicesByTitleExists) {
        throw new ServicesByTitleExists('There is already a service with that title');
    }
    const result = await servicesManager.save(service);
    return result;
}
const update = async (id, service) => {
    const serviceById = await servicesManager.getById(id);
    const services = await servicesManager.getAll();
    const servicesByTitleExists = services.find(item => item.title == service.title && item.category == serviceById.category)
    const obj = {
        ...serviceById,
        title: service.title,
        value: service.value
    }
    if(serviceById.title !== service.title || serviceById.value !== service.value) {
        if(servicesByTitleExists && (servicesByTitleExists._id.toString() !== serviceById._id.toString())) {
            throw new ServicesByTitleExists('There is already a service with that title');
        }
        const serviceUpdated = await servicesManager.update(id, obj);
        return serviceUpdated;
    }
}
const eliminate = async (id) => {
    const service = await servicesManager.eliminate(id);
    return service;
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}