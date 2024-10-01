import { Hairdressers } from '../dao/factory.js';

export default class HairdressersRepository {
    constructor() {
        this.dao = new Hairdressers();
    }
    getAll = async() => {
        const hairdressers = await this.dao.getAll();
        return hairdressers;
    }
    getById = async(hid) => {
        const hairdresserById = await this.dao.getById(hid);
        return hairdresserById;
    }
    save = async(hairdresser) => {
        const hairdresserSaved = await this.dao.save(hairdresser);
        return hairdresserSaved;
    }
    eliminate = async(id) => {
        const hairdresserDeleted = await this.dao.eliminate(id);
        return hairdresserDeleted;
    }
}

