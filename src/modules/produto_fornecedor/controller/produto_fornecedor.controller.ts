import { Controller } from "./../../../core/controller";
import { Produto_fornecedorService } from "./../service/produto_fornecedor.service";

export class Produto_fornecedorController extends Controller {
    
    protected service: Produto_fornecedorService = new Produto_fornecedorService;

}
