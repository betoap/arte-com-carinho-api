import { Route } from "./../../../core/route";
import { ClienteController } from "./../controller/cliente.controller";

class ClienteRoute extends Route {
    
    protected controller: ClienteController;

    constructor() {
        super();
        this.controller  = new ClienteController();
    }
}

module.exports = new ClienteRoute().routers();
