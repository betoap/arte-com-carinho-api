import { Route } from "./../../../core/route";
import { ConfigController } from "./../controller/config.controller";

class ConfigRoute extends Route {
    
    protected controller: ConfigController;

    constructor() {
        super();
        this.controller  = new ConfigController();
    }
}

module.exports = new ConfigRoute().routers();
