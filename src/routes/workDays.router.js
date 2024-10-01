import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, register, eliminate } from '../controllers/workDays.controller.js';

export default class WorkDaysRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAll);
        this.get('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getById);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.delete('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, eliminate);
    }
}