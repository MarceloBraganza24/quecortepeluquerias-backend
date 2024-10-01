import WorkDaysRepository from '../repositories/workDays.repository.js';
import { WorkDayExists } from '../utils/custom.exceptions.js';

const workDaysManager = new WorkDaysRepository();

const getAll = async () => {
    const workDays = await workDaysManager.getAll();
    return workDays;
}
const getById = async (id) => {
    const workDay = await workDaysManager.getById(id);
    return workDay;
}
const register = async(workDay) => {
    const workDays = await workDaysManager.getAll();
    const workDayExists = workDays.find(item => item.hairdresser == workDay.hairdresser && item.work_day == workDay.work_day && item.schedule == workDay.schedule)
    if(workDayExists) {
        throw new WorkDayExists('There is already a workDay with that data');
    }
    const result = await workDaysManager.save(workDay);
    return result;
}
const eliminate = async (id) => {
    const workDay = await workDaysManager.eliminate(id);
    return workDay;
}

export {
    getAll,
    getById,
    register,
    eliminate
}