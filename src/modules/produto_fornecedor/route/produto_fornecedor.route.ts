import { Route } from "./../../../core/route";
import { Produto_fornecedorController } from "./../controller/produto_fornecedor.controller";

class Produto_fornecedorRoute extends Route {
    
    protected controller: Produto_fornecedorController;

    constructor() {
        super();
        this.controller  = new Produto_fornecedorController();
    }
}

module.exports = new Produto_fornecedorRoute().routers();
