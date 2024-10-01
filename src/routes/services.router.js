import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, register,update, eliminate } from '../controllers/services.controller.js';

export default class ServicesRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAll);
        this.get('/:sid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getById);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.put('/:sid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, update);
        this.delete('/:sid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, eliminate);
    }
}