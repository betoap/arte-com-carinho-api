import { Controller } from "./../../../core/controller";
import { OrcamentoService } from "./../service/orcamento.service";

export class OrcamentoController extends Controller {
    
    protected service: OrcamentoService = new OrcamentoService;

}
