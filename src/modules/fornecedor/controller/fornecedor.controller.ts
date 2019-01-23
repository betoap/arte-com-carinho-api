import { Controller } from "./../../../core/controller";
import { FornecedorService } from "./../service/fornecedor.service";

export class FornecedorController extends Controller {
    
    protected service: FornecedorService = new FornecedorService;

}
