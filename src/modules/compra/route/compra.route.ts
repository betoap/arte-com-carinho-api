import { Route } from "./../../../core/route";
import { CompraController } from "./../controller/compra.controller";

class CompraRoute extends Route {
    
    protected controller: CompraController;

    constructor() {
        super();
        this.controller  = new CompraController();
    }
}

module.exports = new CompraRoute().routers();
