import { Route } from "./../../../core/route";
import { LancamentoController } from "./../controller/lancamento.controller";

class LancamentoRoute extends Route {
    
    protected controller: LancamentoController;

    constructor() {
        super();
        this.controller  = new LancamentoController();
    }
}

module.exports = new LancamentoRoute().routers();
