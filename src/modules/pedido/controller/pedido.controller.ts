import { Controller } from "./../../../core/controller";
import { PedidoService } from "./../service/pedido.service";

export class PedidoController extends Controller {
    
    protected service: PedidoService = new PedidoService;

}
