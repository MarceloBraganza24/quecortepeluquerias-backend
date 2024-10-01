import { WorkDays } from '../dao/factory.js';

export default class WorkDaysRepository {
    constructor() {
        this.dao = new WorkDays();
    }
    getAll = async() => {
        const workDays = await this.dao.getAll();
        return workDays;
    }
    getById = async(hid) => {
        const workDayById = await this.dao.getById(hid);
        return workDayById;
    }
    save = async(workDay) => {
        const workDaySaved = await this.dao.save(workDay);
        return workDaySaved;
    }
    eliminate = async(id) => {
        const workDayDeleted = await this.dao.eliminate(id);
        return workDayDeleted;
    }
}
