import { Controller } from "./../../../core/controller";
import { PersonalizadoService } from "./../service/personalizado.service";

export class PersonalizadoController extends Controller {
    
    protected service: PersonalizadoService = new PersonalizadoService;

}
