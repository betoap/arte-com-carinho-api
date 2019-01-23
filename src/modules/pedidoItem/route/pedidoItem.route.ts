import { Route } from "./../../../core/route";
import { PedidoItemController } from "./../controller/pedidoItem.controller";

class PedidoItemRoute extends Route {
    
    protected controller: PedidoItemController;

    constructor() {
        super();
        this.controller  = new PedidoItemController();
    }
}

module.exports = new PedidoItemRoute().routers();
