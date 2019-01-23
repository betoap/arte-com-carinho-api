import { Controller } from "./../../../core/controller";
import { LancamentoService } from "./../service/lancamento.service";

export class LancamentoController extends Controller {
    
    protected service: LancamentoService = new LancamentoService;

}
