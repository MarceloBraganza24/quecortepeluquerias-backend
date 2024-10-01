import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, register, eliminate } from '../controllers/hairdressers.controller.js';

export default class HairdressersRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAll);
        this.get('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getById);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.delete('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, eliminate);
    }
}