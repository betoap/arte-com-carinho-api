import { Controller } from "./../../../core/controller";
import { PedidoItemService } from "./../service/pedidoItem.service";

export class PedidoItemController extends Controller {
    
    protected service: PedidoItemService = new PedidoItemService;

}
