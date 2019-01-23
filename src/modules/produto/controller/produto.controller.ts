import { Controller } from "./../../../core/controller";
import { ProdutoService } from "./../service/produto.service";

export class ProdutoController extends Controller {
    
    protected service: ProdutoService = new ProdutoService;

}
