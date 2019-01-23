import { Route } from "./../../../core/route";
import { ProdutoController } from "./../controller/produto.controller";

class ProdutoRoute extends Route {
    
    protected controller: ProdutoController;

    constructor() {
        super();
        this.controller  = new ProdutoController();
    }
}

module.exports = new ProdutoRoute().routers();
