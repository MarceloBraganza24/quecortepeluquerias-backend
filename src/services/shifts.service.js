import ShiftsRepository from '../repositories/shifts.repository.js';
import WorkDaysManagerRepository from '../repositories/workDays.repository.js';
import { ShiftByDateByScheduleExists,ScheduleNotExists, ShiftExists } from '../utils/custom.exceptions.js';

const shiftsManager = new ShiftsRepository();
const workDaysManager = new WorkDaysManagerRepository();

const getAll = async () => {
    const shifts = await shiftsManager.getAll();
    return shifts;
}
const getById = async (id) => {
    const shift = await shiftsManager.getById(id);
    return shift;
}
const save = async (hairdresser,first_name,last_name,service,email,date,schedule,price,cancelled,shift_datetime,currentUser) => {
    const shifts = await shiftsManager.getAll();
    const shiftByDateByScheduleExists = shifts.find(shift => shift.date == date && shift.schedule == schedule && shift.hairdresser == hairdresser)
    if(shiftByDateByScheduleExists) {
        throw new ShiftByDateByScheduleExists('There is already a shift with that date and time');
    }
    const shift = {
        hairdresser,
        first_name,
        last_name,
        service,
        email,
        date,
        schedule,
        price: price?price:'',
        cancelled: cancelled?cancelled:false,
        shift_datetime
    }
    const workDays = await workDaysManager.getAll();
    const workDaysByHairdresser = workDays.filter(workDay => workDay.hairdresser == shift.hairdresser)
    const dayDate = new Date(shift.date);
    const fechaUTC = new Date(dayDate);
    const fechaLocal = new Date(fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000);
    const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const diaDeLaSemanaElegido = diasDeLaSemana[fechaLocal.getDay()];
    const workDaysByDaySelected = workDaysByHairdresser.filter(workDay => workDay.work_day == diaDeLaSemanaElegido)
    const horariosDisponiblesSegunDiaSeleccionado = workDaysByDaySelected.map(workDay => workDay.schedule)
    const isExistsSchedule = horariosDisponiblesSegunDiaSeleccionado.includes(shift.schedule)
    if(!isExistsSchedule && (!currentUser || currentUser.role != 'admin')) {
        throw new ScheduleNotExists('The entered time does not exist');
    } else {
        const shiftSaved = await shiftsManager.save(shift);
        return shiftSaved;
    }
}

const update = async (id, shift) => {
    const shifts = await shiftsManager.getAll();
    const shiftOfBD = await shiftsManager.getById(id);
    const shiftByDateByScheduleExists = shifts.find(item => item.date === shift.date && item.schedule === shift.schedule && item.hairdresser === shift.hairdresser)
    if(shiftOfBD.hairdresser === shift.hairdresser && shiftOfBD.first_name === shift.first_name && shiftOfBD.last_name === shift.last_name && shiftOfBD.service === shift.service && shiftOfBD.email === shift.email && shiftOfBD.date === shift.date && shiftOfBD.schedule === shift.schedule) {
        throw new ShiftExists('There is already a shift with that data');
    }
    if(shiftOfBD.hairdresser !== shift.hairdresser || shiftOfBD.first_name !== shift.first_name || shiftOfBD.last_name !== shift.last_name || shiftOfBD.service !== shift.service || shiftOfBD.email !== shift.email || shiftOfBD.date !== shift.date || shiftOfBD.schedule !== shift.schedule) {
        if(shiftByDateByScheduleExists && (shiftByDateByScheduleExists._id.toString() !== shiftOfBD._id.toString())) {
            throw new ShiftByDateByScheduleExists('There is already a shift with that date and time');
        }
        const shiftUpdated = await shiftsManager.update(id, shift);
        return shiftUpdated;
    }
}

const eliminate = async (id) => {
    const shift = await shiftsManager.eliminate(id);
    return shift;
}

export {
    getAll,
    getById,
    save,
    update,
    eliminate
}