import { Route } from "./../../../core/route";
import { FornecedorController } from "./../controller/fornecedor.controller";

class FornecedorRoute extends Route {
    
    protected controller: FornecedorController;

    constructor() {
        super();
        this.controller  = new FornecedorController();
    }
}

module.exports = new FornecedorRoute().routers();
