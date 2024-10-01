import HairdressersRepository from '../repositories/hairdressers.repository.js';
import { HairdresserByNameExists } from '../utils/custom.exceptions.js';

const hairdressersManager = new HairdressersRepository();

const getAll = async () => {
    const hairdressers = await hairdressersManager.getAll();
    return hairdressers;
}
const getById = async (id) => {
    const hairdresser = await hairdressersManager.getById(id);
    return hairdresser;
}
const register = async(hairdresser) => {
    const hairdressers = await hairdressersManager.getAll();
    const hairdresserByNameExists = hairdressers.find(item => item.name === hairdresser.name)
    if(hairdresserByNameExists) {
        throw new HairdresserByNameExists('There is already a hairdresser with that name');
    }
    const result = await hairdressersManager.save(hairdresser);
    return result;
}
const eliminate = async (id) => {
    const hairdresser = await hairdressersManager.eliminate(id);
    return hairdresser;
}

export {
    getAll,
    getById,
    register,
    eliminate
}