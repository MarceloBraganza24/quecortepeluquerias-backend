import { workDaysModel } from "../dbManagers/models/workDays.model.js";

export default class WorkDays {
    constructor() {
        console.log('Working with workDays DB');        
    }
    getAll = async() => {
        const workDays = await workDaysModel.find().lean();
        return workDays;
    }
    getById = async(id) => {
        const workDayById = await workDaysModel.findOne({ _id: id }).lean();
        return workDayById;
    }
    save = async(workDay) => {
        const workDaySaved = await workDaysModel.create(workDay);
        return workDaySaved;
    }
    eliminate = async(id) => {
        const workDayDeleted = await workDaysModel.findByIdAndDelete(id);
        return workDayDeleted;
    }
}