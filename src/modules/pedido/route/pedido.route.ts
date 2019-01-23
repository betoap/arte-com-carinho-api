import { Route } from "./../../../core/route";
import { PedidoController } from "./../controller/pedido.controller";

class PedidoRoute extends Route {
    
    protected controller: PedidoController;

    constructor() {
        super();
        this.controller  = new PedidoController();
    }
}

module.exports = new PedidoRoute().routers();
