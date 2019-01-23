import { Controller } from "./../../../core/controller";
import { ClienteService } from "./../service/cliente.service";

export class ClienteController extends Controller {
    
    protected service: ClienteService = new ClienteService;

}
