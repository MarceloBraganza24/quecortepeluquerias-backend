import { servicesModel } from "../dbManagers/models/services.model.js";

export default class Services {
    constructor() {
        console.log('Working with services DB');        
    }
    getAll = async() => {
        const services = await servicesModel.find().lean();
        return services;
    }
    getById = async(id) => {
        const serviceById = await servicesModel.findOne({ _id: id }).lean();
        return serviceById;
    }
    save = async(service) => {
        const serviceSaved = await servicesModel.create(service);
        return serviceSaved;
    }
    update = async(id, serviceToUpdated) => {
        const serviceUpdated = await servicesModel.findByIdAndUpdate(id, serviceToUpdated);
        return serviceUpdated;
    }
    eliminate = async(id) => {
        const serviceDeleted = await servicesModel.findByIdAndDelete(id);
        return serviceDeleted;
    }
}