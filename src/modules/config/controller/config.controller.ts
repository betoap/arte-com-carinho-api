import { Controller } from "./../../../core/controller";
import { ConfigService } from "./../service/config.service";

export class ConfigController extends Controller {
    
    protected service: ConfigService = new ConfigService;

}
