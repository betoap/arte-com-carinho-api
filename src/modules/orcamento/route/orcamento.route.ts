import { Route } from "./../../../core/route";
import { OrcamentoController } from "./../controller/orcamento.controller";

class OrcamentoRoute extends Route {
    
    protected controller: OrcamentoController;

    constructor() {
        super();
        this.controller  = new OrcamentoController();
    }
}

module.exports = new OrcamentoRoute().routers();
