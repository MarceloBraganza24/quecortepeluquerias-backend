import { hairdressersModel } from "../dbManagers/models/hairdressers.model.js";

export default class Hairdressers {
    constructor() {
        console.log('Working with hairdressers DB');        
    }
    getAll = async() => {
        const hairdressers = await hairdressersModel.find().lean();
        return hairdressers;
    }
    getById = async(id) => {
        const hairdresserById = await hairdressersModel.findOne({ _id: id }).lean();
        return hairdresserById;
    }
    save = async(hairdresser) => {
        const hairdressersaved = await hairdressersModel.create(hairdresser);
        return hairdressersaved;
    }
    eliminate = async(id) => {
        const hairdresserDeleted = await hairdressersModel.findByIdAndDelete(id);
        return hairdresserDeleted;
    }
}