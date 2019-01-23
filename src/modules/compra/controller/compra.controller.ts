import { Controller } from "./../../../core/controller";
import { CompraService } from "./../service/compra.service";

export class CompraController extends Controller {
    
    protected service: CompraService = new CompraService;

}
