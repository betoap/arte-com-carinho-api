import { Route } from "./../../../core/route";
import { PersonalizadoController } from "./../controller/personalizado.controller";

class PersonalizadoRoute extends Route {
    
    protected controller: PersonalizadoController;

    constructor() {
        super();
        this.controller  = new PersonalizadoController();
    }
}

module.exports = new PersonalizadoRoute().routers();
